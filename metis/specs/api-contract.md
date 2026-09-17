# Contrat technique — Revue de code 22/07 — MR !2162 (branche `jeremy-met2-2229`)

Sous-module : `api-aerial` (`C:\Users\user\Code\everbloo\metis\api-aerial`)
Artefact d'orchestration : base contractuelle des tests (TDD) puis de l'implémentation.
Aucun fichier de code n'est modifié par ce document ; seuls `specs/api-contract.md` et `specs/acceptance.md` sont créés.

---

## 1) Contexte & périmètre

La MR ajoute le parseur BA `OrderReshopRS <Reprice/>` (`repricedOrder.js`), le routing
`orderReshopService.createResponse`/`handleRequest`, `repriceBookingRS` + `getPriceComparison`
(`reshopping.js`), `getReshopDetails` IB, la récupération BA (`formatOrder.utils.js`), la création
de dossier BA (`createDossier.js`), `dossier.utils.js`, `reprice.utils.js`, les payloads
`buildPriceChangePayload` BA/IB et 4 suites node:test (21 tests verts aujourd'hui).

Le tree de travail contient déjà le correctif non commité de R1 dans
`src/utils/IBERIA/order/orderReshop.utils.js` (bloc `NoPriceChangeInd` restauré, lignes ~641-651,
sur le chemin ReshopOffers, avant `response.priceChanged = true`). Ce correctif est acté par le
contrat (il ne doit pas être régressé).

Périmètre contractuel : R1..R5 (revue) et M1..M6 (mineurs). Chaque item précise la signature,
les entrées/sorties exactes et les exemples. Les invariants transverses sont en §3, les critères
d'acceptation testables en §4, les dépendances externes en §5.

---

## 2) Contrats par item

### R1 — [Bloquant, Iberia] `getReshopDetails` : réponse IB « pas de différentiel »

Fichier : `src/utils/IBERIA/order/orderReshop.utils.js`

Signature : `getReshopDetails(jsonRS) -> object` (inchangée).

Trois chemins, dans l'ordre :

- **(a) Chemin `<Reprice/>` sans ReshopOffers** — garde existante ligne ~426, conservée telle
  quelle : `const hasReshopOffers = Boolean(rsBody?.ReshopOffers?.ReshopOffer);`
  `if (rsBody.NoPriceChangeInd && !hasReshopOffers) { response.noPriceChange = true;
  response.priceChanged = false; response.requiresAcceptance = false; return response; }`
  → **early return avant tout parsing RepricedOffer/amount.**

- **(b) Chemin ReshopOffers (retarification/modification)** — le bloc restauré (lignes ~646-651)
  doit être maintenu APRÈS le calcul de `conditions`/`bagages`/`secureSegments` et AVANT
  `response.priceChanged = true` (ligne ~653) et avant le calcul d'`amount`/`paxPriceDetails`
  (lignes ~656-681) :
  `if (rsBody.NoPriceChangeInd) { response.noPriceChange = true; response.priceChanged = false;
  response.requiresAcceptance = false; return response; }`
  Sémantique du flag : présence de l'élément (truthy). Formes attendues :
  `<NoPriceChangeInd/>` → `{}` (xml-js compact, vérifié) et `<NoPriceChangeInd>true</NoPriceChangeInd>`
  → `{ _text: "true" }`. Les deux doivent déclencher le retour.
  Sortie sur ce chemin :
  ```json
  { "noPriceChange": true, "priceChanged": false, "requiresAcceptance": false,
    "amount": 0, "paxPriceDetails": [], "currency": "<RS>", "responseID": "<RS>",
    "conditions": [...], "bagages": [...] }
  ```
  `conditions`/`bagages` restent calculés comme aujourd'hui (code exécuté avant la garde) ;
  `amount` reste à la valeur initiale `0`, `paxPriceDetails` reste `[]` ; le
  `ReshopDifferential` n'est JAMAIS lu sur ce chemin (aucune facturation à tort).

- **(c) Chemin `RepricedOffer`** — comportement existant conservé : `amount` = somme des
  `TotalPriceDetail.TotalAmount.SimpleCurrencyPrice._text` des items ; `currency` = Code de la
  devise RS (pas de hard fallback "EUR") ; `priceChanged` = `Math.abs(new-old) > 1e-6`.

Contrat de sortie commun (champs présents sur tous les chemins succès) :
`noPriceChange`, `priceChanged`, `requiresAcceptance`, `amount`, `currency`, `responseID`,
`conditions`, `bagages`, `paxPriceDetails`.

Note : le champ `priceComparison` n'est PAS au contrat de sortie de la branche IB RepricedOffer
(voir M4 — bloc mort supprimé).

---

### R2 — [BA, avant merge] `repricedOrderRS` : multi-pax, résolution de noms, propagation `paxs`

#### R2.1 — Un RepricedOfferItem multi-pax produit UN item par passager (miroir de `getPriceComparison`)

Fichier : `src/utils/BA/orderReshop/repricedOrder.js`

`getPriceComparison` (`reshopping.js` ~l.661-719) divise `oldAmount`/`newAmount` par le nombre de
références passager et émet un item par `paxRef`. `repricedOrderRS` doit faire le miroir sur la
branche `RepricedOffer` (au lieu de ne retenir que `[0]` de `PassengerRefs._text.split(" ")`) :

Scénario de référence (testable) :
- Entrée : 1 `RepricedOfferItem`, `FareDetail.PassengerRefs._text = "T1 T2"`,
  `TotalPriceDetail.TotalAmount.SimpleCurrencyPrice._text = "500.00"`,
  `OriginalOrderItem.TotalPriceDetail... = "400.00"`, Code devise "EUR".
- Sortie `priceComparison.items` :
  ```json
  [ { "paxRef": "T1", "oldAmount": 200, "newAmount": 250, "difference": 50 },
    { "paxRef": "T2", "oldAmount": 200, "newAmount": 250, "difference": 50 } ]
  ```
  `priceComparison.oldPrice = 400`, `newPrice = 500`, `difference = 100` ; `amount = "500.00"` ;
  `priceChanged = true`, `requiresAcceptance = true`.
- Item sans `PassengerRefs` : item unique `{ paxRef: "PAX_<index+1>", ... }` (comportement actuel).

#### R2.2 — Résolution NDC → METIS (positionnelle), sans casser le chemin IB

Fichiers : `repricedOrder.js` + `src/utils/pricing/reprice.utils.js`

Problème : `buildPriceComparison` indexe `paxById` sur `pax.id` METIS ; le paxRef sorti du parseur
est une référence NDC ("T1"). Deux niveaux de résolution :

1. **`repricedOrderRS`** : nouvelle signature
   `repricedOrderRS(jsonRS, { paxs } = {})` — `paxs` = liste METIS issue de `body.paxs`
   (items `{ id, ptc, individualInfo }`).
   Mapping positionnel : les références NDC apparaissent dans l'ordre des items expansés ;
   elles sont mises en correspondance avec `paxs` **dans le même ordre**. Si
   `Array.isArray(paxs) && paxs.length === items.length` → remplacer `item.paxRef` par
   `paxs[i].id` (METIS) pour chaque index `i`. Sinon (paxs absent, vide ou longueur différente =
   désalignement) → conserver la référence NDC. Le mapping ne modifie PAS les montants (déjà
   divisés en R2.1).

2. **`buildPriceComparison`** : fallback positionnel. Dans la branche `items.length > 0`,
   si `paxById[paxRef]` est absent ET que `items.length === paxs.length`, résoudre le nom via
   `paxs[index]` :
   `paxName = getPaxDisplayName(paxs[index], fallback)`.
   La branche `else` (items vides, `paxAmountLookup`) est INCHANGÉE : le chemin IB
   (`buildPriceChangePayload` IB, `src/controllers/IBERIA/order.controller.js` ~l.75-103)
   n'envoie PAS `items` — uniquement `paxAmountLookup` — et ne doit pas être impacté.

#### R2.3 — Propagation de `paxs` dans la chaîne

- `src/utils/BA/orderReshopService.js` : `createResponse({ reshopJson, action, flightIndex, paxs } = {})`
  — le cas `"repriceOrder"` appelle `repricedOrderRS(reshopJson, { paxs })`.
- `src/utils/BA/orderChangeService.js` `handleRequest` : passer `paxs: body.paxs` aux appels
  `orderReshopService.createResponse({ reshopJson, action: "repriceOrder" })` (l.~239) et
  `{ reshopJson, action: "reprice" }` (l.~291).
- `orderReshopService.handleRequest` (route BA) : passer `paxs: req.body.paxs` à `createResponse`
  (l.~110).
- Les cas `"confirm"`/`"reshop"`/`"refund"` ignorent `paxs` (rien à propager).

---

### R3 — [BA, avant merge, dépendance externe] Harnais de fixtures OrderReshopRS BA <Reprice/>

Aucun OrderReshopRS BA <Reprice/> réel n'existe dans le repo (fixtures écrites à la main).

Contrat du harnais :
- Répertoire : `src/utils/__tests__/fixtures/BA/`
- `README.md` dans ce répertoire décrivant la forme attendue : réponse `OrderReshopRS/Response`
  IATA EDIST 17.2 (basée XSD IATA + échantillons IB), avec `ReShoppingResponseID/ResponseID`,
  et soit `NoPriceChangeInd`, soit `RepricedOffer/RepricedOfferItem` avec
  `FareDetail.PassengerRefs`, `TotalPriceDetail.TotalAmount.SimpleCurrencyPrice`
  (`_text` + `_attributes.Code`), `OriginalOrderItem.TotalPriceDetail`.
- Un test qui charge `BA_orderReshopRS_reprice_nochange.xml` OU `..._nochange.json`, et
  `BA_orderReshopRS_reprice_changed.xml` OU `..._changed.json`, **S'ILS EXISTENT** ; sinon
  `t.skip` (échec silencieux interdit, skip explicite avec message).
- Le harnais ne remplace pas les tests unitaires existants (`repricedOrderRS.test.js`) : il les
  complète quand les échantillons réels sont déposés.

**R3 reste une dépendance externe bloquante tant que les échantillons réels ne sont pas déposés**
(blocage à lever par le porteur de la MR, pas par l'implémentation).

---

### R4 — [BA, confirmé intentionnel] `flightIndex` normalisé

Fichiers : `orderReshopService.js` (createResponse) + `reshopping.js` (`repriceBookingRS` ~l.727)

- `createResponse` action `"reprice"` : injecter `reshopJson.flightIndex = flightIndex` seulement
  si `flightIndex !== undefined` ET normalisable en entier `>= 0`
  (ex. `Number.isInteger(Number(flightIndex)) && Number(flightIndex) >= 0`). Sinon : ne PAS
  injecter.
- `repriceBookingRS` sélectionne
  `ensureArray(offerItem.AddOfferItem)[jsonRS.flightIndex ?? 0] ?? ensureArray(...)[0]`
  (comportement existant, conservé) : le `flightIndex` choisit le FareComponent (conditions
  tarifaires de l'OD sélectionné).
- Sans `flightIndex` → repli sur `0` (comportement historique). À documenter (voir §5 :
  mise à jour de la description de la MR).

---

### R5 — [BA, contrat HTTP] `orderReshopService.handleRequest` : erreurs → HTTP 200

Fichier : `src/utils/BA/orderReshopService.js`

Le front (`axios.ts`) rejette les statuts hors 2xx et l'adapter n'a pas de try/catch ⇒ le catch
doit revenir à HTTP 200.

- **Catch global** : `return res.json({ message: "orderReshopRS", value: { error:
  { statusText: error?.statusText ?? "Internal server error",
    description: error?.message ?? "Internal server error" } } })` — statut HTTP **200** (le
  `res.status(500)` actuel est remplacé).
- **Erreur SOAP** (pas de `Success`) : inchangé — HTTP 200 + `value.error` avec
  `statusText = Errors.Error._attributes.Code`, `description = Errors.Error._text`.
- Corps de réponse succès inchangé : `{ message: "orderReshopRS", value: <response> }`.
- Invariant transverse : toute réponse d'erreur de ce service est `{ message, value: { error:
  { statusText, description } } }` en HTTP 200.

---

### M1 — [BA] `formatOrder` : mapper `tstDeadline` depuis `PriceGuaranteeTimeLimitDateTime`

Fichier : `src/utils/BA/retrieve/formatOrder.utils.js`

L'objet `Order` produit par `formatOrder` doit en plus exposer :
```js
tstDeadline:
  ensureArray(BA_XML.Order.OrderItems.OrderItem)[0].TimeLimits
    ?.PriceGuaranteeTimeLimit?._attributes?.Timestamp ?? null,
```
(même source que `PriceGuaranteeTimeLimitDateTime`, l.29-33).

Pourquoi : `formatRetrieve` (BA) construit `{ Order: formatOrder(response), ... }` ; ce JSON est
consommé par `saveAfterRetreive`/`forceRetrieve` (`dossier.utils.js`), qui lisent
`dataRS?.Order?.tstDeadline` (l.1087/3792/9777) pour rafraîchir la TTL de garantie sur
retrieve/Actualiser BA. Sans ce mapping, `tstDeadline` est `undefined` → `null`.

---

### M2 — [BA] `repriceBookingRS` : cardinalité de `PriceGuaranteeTimeLimitDateTime`

Fichier : `src/utils/BA/orderReshop/reshopping.js` (~l.783-785)

Remplacer :
```js
priceGuaranteeTimeLimit: rsBody?.ReshopOffers?.ReshopOffer?.PriceGuaranteeTimeLimitDateTime?._text ?? null
```
par :
```js
priceGuaranteeTimeLimit:
  ensureArray(rsBody?.ReshopOffers?.ReshopOffer)[0]?.PriceGuaranteeTimeLimitDateTime?._text ?? null
```
(`ensureArray` gère la cardinalité — `ReshopOffer` peut être un tableau ; `[0]` comme la ligne
juste au-dessus pour `offerItem`).

---

### M3 — [BA] `dossier.utils.js` : `tstDeadline` "" → null

Fichier : `src/utils/dossier.utils.js` — les 3 occurrences (l.1087, l.3792, l.9777) :
`tstDeadline: dataRS?.Order?.tstDeadline ?? null` → `tstDeadline: dataRS?.Order?.tstDeadline || null`.

Justification : `tstDeadline` est une colonne `DataTypes.DATE` du modèle `Pnr`
(`src/models/pnr.js` l.259-262) ; `PnrService.create` (l.9-10) ne fait pas de `removeEmptyKeys`
→ une chaîne vide `""` doit devenir `null` avant persistance.

Test associé : `src/utils/__tests__/baCreateDossier.tstDeadline.test.js` — mettre à jour le regex
l.25 : `tstDeadline:\s*dataRS\?\.Order\?\.tstDeadline\s*\?\?\s*null` →
`tstDeadline:\s*dataRS\?\.Order\?\.tstDeadline\s*\|\|\s*null`.

---

### M4 — [IB] Supprimer le bloc `priceComparison` mort de la branche RepricedOffer

Fichier : `src/utils/IBERIA/order/orderReshop.utils.js` (~l.486-500)

Supprimer le bloc `response.priceComparison = { oldPrice, newPrice, currency, items }`.
Justification : `buildPriceChangePayload` IB (`src/controllers/IBERIA/order.controller.js`
~l.75-103) ne lit que `detailsResponse.currency`, `.amount`, `.paxPriceDetails`, `.responseID` —
jamais `.priceComparison`.

Tests : adapter `src/utils/__tests__/getReshopDetails.repricedOffer.test.js` — retirer les
assertions `result.priceComparison.*` (l.63-65, l.84-85, l.107). Le reste des assertions
(amount, flags, currency, Errors) est inchangé.

---

### M5 — Câblage des tests (package.json)

Fichier : `api-aerial/src/package.json` — ajouter dans `scripts` :

- `test:regression:ba` : `repricedOrderRS.test.js` + `baCreateDossier.tstDeadline.test.js`
- `test:regression:ib` : `getReshopDetails.repricedOffer.test.js` + `ibAcceptRepricedOrder.uc08.test.js`
- `test:unit` : les tests node:test de `src/utils/__tests__/*.test.js`

Contrainte poste (sandbox Windows) : `node --test` doit être lancé avec
`--test-isolation=none` (le spawn par fichier est bloqué) et des **chemins absolus ou un seul
glob** (pas de multi-globs). Exemple de forme attendue :
`node --test-isolation=none --test "src/utils/__tests__/*.test.js"`.
La forme exacte (quoting/cmd vs sh) est laissée à l'implémentation, la contrainte
`--test-isolation=none` + glob unique est contractuelle.

---

### M6 — Écart §12 connu et accepté (documentation)

La devise est prise de la réponse compagnie (RS) et non du point de vente
(`agenceInfo.devise` / `resolveAgencyCurrency`) dans `repricedOrderRS` et la branche IB
`RepricedOffer` — cohérent avec l'existant `repriceBookingRS`. Non corrigé dans cette itération :
**documenter** dans la MR (pas de changement de code).

---

## 3) Invariants transverses

- **Shape `value.error`** : toute erreur exposée au front par `orderReshopService` est
  `{ message, value: { error: { statusText, description } } }`, HTTP 200 (R5).
- **Flags de prix** : `noPriceChange = !priceChanged` ; `requiresAcceptance = priceChanged` ;
  seuil `PRICE_CHANGE_EPSILON = 0.000001` (BA `repricedOrder.js` et IB `getReshopDetails`).
- **BA "no change"** : `amount: "0.00"` (string) ; **IB "no change"** : `amount: 0` (number) —
  les deux SANS lecture de différentiel.
- **Division par passager** : montants divisés par le nombre de références de l'item
  (`passengerRefs.length || 1`) — identique dans `getPriceComparison` (BA ReshopOffers) et
  `repricedOrderRS` (BA RepricedOffer), et dans `paxPriceDetails` IB (l.661 : `/paxsInItem.length`).
- **Mapping NDC → METIS positionnel** : ordre d'apparition des refs ↔ ordre de `paxs` ;
  conservé tel quel en cas d'absence ou de désalignement (R2.2).
- **Cardinalité `ensureArray`** : tout nœud susceptible d'être un tableau est lu via
  `ensureArray(...)[0]` (M2).
- **Devise** : prise de la RS (Code `SimpleCurrencyPrice`) ; `null` si absente, pas de hard
  fallback "EUR" dans les parseurs (M6).

---

## 4) Critères d'acceptation (testables)

Voir `specs/acceptance.md` pour le tableau AC-1..AC-24 avec statut initial PENDING.

| # | Item | Critère testable |
|---|------|------------------|
| AC-1 | R1(a) | `getReshopDetails` : `NoPriceChangeInd` + aucun `ReshopOffers` → retour immédiat avec `noPriceChange:true, priceChanged:false, requiresAcceptance:false, amount:0` ; aucun parsing RepricedOffer. |
| AC-2 | R1(b) | `getReshopDetails` : `ReshopOffers` présent + `NoPriceChangeInd` (formes `{}` et `{_text:"true"}`) → `noPriceChange:true, priceChanged:false, requiresAcceptance:false, amount:0, paxPriceDetails:[]` ; `ReshopDifferential` non lu. |
| AC-3 | R1(b) | `getReshopDetails` : `ReshopOffers` sans `NoPriceChangeInd` → comportement existant conservé (`priceChanged:true`, `amount` = somme `ReshopDifferential`). |
| AC-4 | R1(c) | `getReshopDetails` : `RepricedOffer` → `amount` = somme des items ; champs de sortie `noPriceChange, priceChanged, requiresAcceptance, amount, currency, responseID, conditions, bagages, paxPriceDetails` présents. |
| AC-5 | R1(a) | La garde l.~426 `&& !hasReshopOffers` reste en place : `NoPriceChangeInd` + `ReshopOffers` présent ne fait PAS d'early-return en l.426. |
| AC-6 | R2.1 | `repricedOrderRS` : 1 item multi-pax "T1 T2" 400→500 ⇒ items `[{T1,200,250,50},{T2,200,250,50}]`, oldPrice 400, newPrice 500, difference 100, amount "500.00", priceChanged/requiresAcceptance true. |
| AC-7 | R2.1 | `repricedOrderRS` : item mono-pax → 1 item, montants non divisés (régression). |
| AC-8 | R2.2 | `repricedOrderRS(jsonRS, { paxs })` avec `paxs.length === items.length` → `paxRef` remplacé par `paxs[i].id` (positionnel). |
| AC-9 | R2.2 | `repricedOrderRS` sans `paxs` ou longueur désalignée → références NDC conservées. |
| AC-10 | R2.2 | `buildPriceComparison` : `paxById[paxRef]` absent ET `items.length === paxs.length` → `paxName` résolu via `paxs[index]`. |
| AC-11 | R2.2 | Chemin IB intact : `buildPriceChangePayload` IB n'envoie pas `items` (uniquement `paxAmountLookup`) ; `buildPriceComparison` continue de résoudre via `paxById`. |
| AC-12 | R2.3 | Propagation : `orderChangeService.handleRequest` → `createResponse({ ..., paxs: body.paxs })` ; `orderReshopService.createResponse` forward `paxs` → `repricedOrderRS` ; route BA `handleRequest` forward `req.body.paxs`. |
| AC-13 | R3 | Harnais présent : `src/utils/__tests__/fixtures/BA/README.md` + test chargeant les fixtures `nochange`/`changed` (xml|json) si existantes, `t.skip` sinon. |
| AC-14 | R3 | R3 documenté comme dépendance externe bloquante tant que les échantillons réels ne sont pas déposés (critère de suivi, pas de code). |
| AC-15 | R4 | `createResponse` action "reprice" : `flightIndex` "1"/1 → injecté comme entier ≥ 0 ; `"abc"`/NaN/undefined → non injecté. |
| AC-16 | R4 | `repriceBookingRS` : sélection `AddOfferItem[jsonRS.flightIndex ?? 0]` avec repli `[0]` (hors bornes / absent). |
| AC-17 | R5 | `orderReshopService.handleRequest` catch → HTTP 200, body exact `{ message:"orderReshopRS", value:{ error:{ statusText, description } } }` avec fallbacks "Internal server error". |
| AC-18 | R5 | Erreur SOAP (pas de `Success`) → HTTP 200 + `value.error` (Code/_text) — inchangé. |
| AC-19 | M1 | `formatOrder` : `Order.tstDeadline` = Timestamp `TimeLimits.PriceGuaranteeTimeLimit` (1er OrderItem) ; `null` si absent. |
| AC-20 | M2 | `repriceBookingRS` : `priceGuaranteeTimeLimit` lu via `ensureArray(ReshopOffer)[0].PriceGuaranteeTimeLimitDateTime._text ?? null` (cas tableau OK). |
| AC-21 | M3 | Les 3 occurrences `tstDeadline` de `dossier.utils.js` passent à `|| null` ; regex du test `baCreateDossier.tstDeadline.test.js` mis à jour. |
| AC-22 | M4 | Branche IB RepricedOffer sans `priceComparison` ; `getReshopDetails.repricedOffer.test.js` sans assertion `priceComparison` ; payload IB toujours vert. |
| AC-23 | M5 | `package.json` expose `test:regression:ba`, `test:regression:ib`, `test:unit` ; `test:unit` couvre les tests node:test de `src/utils/__tests__` ; contraintes `--test-isolation=none` + glob unique/chemins absolus. |
| AC-24 | M6 | Écart §12 documenté dans la MR (devise RS vs POS) ; aucun changement de code requis (critère de documentation). |

---

## 5) Dépendances externes

1. **R3** : dépôt d'échantillons BA réels `OrderReshopRS <Reprice/>` (nochange + changed) dans
   `src/utils/__tests__/fixtures/BA/` — bloquant tant que non fourni par le porteur de la MR /
   l'équipe BA.
2. **R4** : mise à jour de la description de la MR pour documenter le comportement `flightIndex`
   (sélection du FareComponent de l'OD ; défaut `0`).
3. **M6** : documentation de l'écart §12 (devise RS vs POS) dans la MR.

---

## 6) Signature

- **Date** : 22/07 (revue traitée) — contrat établi le jour de la revue.
- **Rôle** : Architecte (subagent_architect) — contrat technique signé, base des phases TDD puis
  Code de l'orchestration Metis.
- **Périmètre de validation** : les critères AC-1..AC-24 ci-dessus, suivis dans
  `specs/acceptance.md`.
