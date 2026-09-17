# Contrat d'interface (UI / consommateur) — Revue 22/07 — MR !2162 (branche `jeremy-met2-2229`)

Rôle : **Designer (subagent_designer)** — ce document est le contrat du **côté consommateur**
(la « forme exacte des réponses API lues par le front »).
Consommateur : `front-reservation` (dépôt voisin, **lecture seule — aucun fichier modifié**).
Référence backend : `specs/api-contract.md` (R1..R5, M1..M6) et `specs/acceptance.md` (AC-1..AC-24).

---

## 1) Méthode

Vérification champ par champ des consommateurs réels dans `front-reservation` :

| Consommateur | Fichier / lignes | Champ(s) lu(s) |
|---|---|---|
| reshopDetails IB | `app/utils/adapters/IberiaAdapter.ts` l.144-200 | destructure `{ data: { value: response } }` (l.189-195) ; `response.Errors` (`{ description }`) l.197-198 |
| (même endpoint IB) | `IberiaAdapter.ts` l.1212-1299 | `response?.error` (l.1220) ; `response.ResponseID` (l.1292) ; stocke `response` entier |
| reshopOrder IB | `IberiaAdapter.ts` l.1350-1461 | `Errors[].description` l.1354-1357 ; destructure `{ amount, warnings, paxPriceDetails, ... }` l.1358 ; `warnings.forEach` l.1360-1361 ; **gate `status===2 && !reshopDetailsResponse.noPriceChange`** l.1406 (attache `paymentInfo`) |
| getReshopOffer IB | `IberiaAdapter.ts` l.1754-1770 | `resp.Errors` ; destructure `{ conditions, bagages, secureSegments, remarks }` l.1757 |
| normalizePriceComparison BA | `app/utils/adapters/BritishAirawaysAdapter.ts` l.38-72 | `priceComparison.items[] → { paxName, oldAmount, newAmount, difference }` ; fallback `item.paxName \|\| getTravelerName(item.paxRef) \|\| item.paxRef \|\| "PAX n"` ; `currency \|\| "EUR"` |
| reshopDetails BA | `BritishAirawaysAdapter.ts` l.158-213 | destructure `{ data: { value: response } }` **SANS try/catch** (l.205-212) ; envoie `action: "reprice"`, `paxs`, **`flightIndex`** (l.184) |
| validateIssuancePrice BA | `BritishAirawaysAdapter.ts` l.869-882 | `responseData?.value?.error` → throw ; sinon `normalizePriceValidationResult(responseData, data)` |
| normalizePriceValidationResult BA | `BritishAirawaysAdapter.ts` l.830-867 | `responseData.priceComparison` ; `responseID ?? responseId ?? ResponseID ?? fallback.responseId` ; `priceChanged` (bool ou diff≠0) ; `requiresAcceptance` ; `noPriceChange` (bool ou !priceChanged) ; `acceptData ?? fallbackData` |
| issueOrder BA | `BritishAirawaysAdapter.ts` l.884-921 | **FLAT** `responseData?.priceChanged && responseData?.requiresAcceptance` (l.908) → `_repriceInfo { priceComparison, acceptData }` ; succès → `responseData?.value` |
| acceptRepricedOffer BA | `BritishAirawaysAdapter.ts` l.923-936 | destructure `{ data: { value: response } }` ; `finalResponse?.error` (emitCard l.178) |
| reshopOrder BA | `BritishAirawaysAdapter.ts` l.1669-1792 | destructure `{ amount, ... }` l.1670 ; **gate `status===2 && Number(amount) > 0`** l.1753 (attache `paymentInfo` — ne lit PAS `noPriceChange`) |
| getReshopOffer BA | `BritishAirawaysAdapter.ts` l.1866-1887 | `resp.Errors` (l.1869) ; destructure `{ conditions, bagages, secureSegments, remarks }` l.1870 |
| responseID (action reshop) | `BritishAirawaysAdapter.ts` l.1539 | `setReshopResponseID(response.ResponseID)` — **PascalCase** |
| axios | `app/utils/axios.ts` l.53-56 | rejet hors 2xx avec `error.response.data` (pas de mapping) |
| popup | `app/components/folder/emitCard/emitCard.vue` l.164-227 | `response._repriceInfo.priceComparison` (l.167) ; `validationResult.noPriceChange \|\| !validationResult.priceChanged` (l.200) ; `priceChangeDialogRef.show(validationResult.priceComparison)` (l.204) |
| popup rendu | `app/components/folder/PriceChangeConfirmDialog.vue` l.16-129 + `priceChangeConfirmDialog.utils.ts` l.1-16 | totaux `oldPrice/newPrice/difference/currency` ; **une ligne par `items[i]`** (paxName/oldAmount/newAmount) ; `formatPrice` **divise par 10^decimals** → unités mineures |
| BaseAdapter (partagé) | `app/utils/adapters/BaseAdapter.ts` l.139-201, 913-996 | types PriceComparison/PriceValidationResult ; normalizePriceComparison (l.168-201, fallback dossier_has_traveler par `paxRef`) ; validateIssuancePrice (l.948-961, `value?.error` puis champs top-level) ; issueOrder (l.963-996, FLAT) |
| TransaviaAdapter (pattern) | `app/utils/adapters/TransaviaAdapter.ts` l.1300 | gate `status===2 && !reshopDetailsResponse.noPriceChange` (identique IB) |

---

## 2) Shape générique `{ message, value }` et erreurs (R5)

Toute réponse d'`orderReshopService` (route BA `POST /aerial/BA/order/orderReshopRQ`) :

- Succès : `{ message: "orderReshopRS", value: <response> }` — le front lit `data.value`.
- Erreur (SOAP ou catch) : `{ message: "orderReshopRS", value: { error: { statusText, description } } }`, **HTTP 200** (R5).

Exigence consommateur : l'adapter BA `reshopDetails` destructure `{ data: { value: response } }`
**sans try/catch ni garde** (BritishAirawaysAdapter.ts l.205-212) et `axios.ts` rejette hors 2xx
→ **tout statut ≠ 200 est une promesse rejetée non gérée** (crash silencieux dans
`reshopOrder`/`getReshopOffer`). Le passage du catch en HTTP 200 (R5) est donc une exigence
d'interface bloquante, pas seulement une convention.

---

## 3) IB — réponse `getReshopDetails` (POST `/aerial/IBERIA/order/orderReshopRQ`)

Champs réellement lus par le front (IberiaAdapter.ts) :

| Champ | Lu à | Contrat api (R1) |
|---|---|---|
| `Errors[]` (`{ description, statusText, code? }`) | l.197, l.1354 | (sortie erreur SOAP, hors R1) |
| `ResponseID` (PascalCase) | l.1292 | ✅ (R1 : `responseID` — voir divergence §9-5) |
| `error` (objet `{ statusText, description }`) | l.1220, l.1307 | ✅ (shape `value.error`, HTTP 200 côté IBERIA) |
| `amount` | l.1358 → `paymentInfo.amount` (l.1408) | ✅ (0 si no-change) |
| `warnings` (tableau de strings) | l.1360-1361 (`warnings.forEach`) | ⚠️ **absent de la liste R1** — voir divergence §9-1 |
| `paxPriceDetails` | l.1358 → renvoyé dans le body orderChangeRQ (l.1374) | ✅ |
| `noPriceChange` | l.1406 (gate paymentInfo) | ✅ (R1(a)/(b)) |
| `priceChanged`, `requiresAcceptance` | (relus via BaseAdapter sur orderChangeRQ) | ✅ |
| `conditions`, `bagages`, `secureSegments`, `remarks` | l.1757 (getReshopOffer) | ⚠️ `secureSegments`/`remarks` absents de la liste R1 — voir §9-1 |

**Contrat de sortie succès (chemin no-change inclus)** :
```json
{ "noPriceChange": true, "priceChanged": false, "requiresAcceptance": false,
  "amount": 0, "paxPriceDetails": [], "currency": "<RS>", "responseID": "<RS>",
  "conditions": [...], "bagages": [...], "secureSegments": [...], "remarks": [...],
  "warnings": [...] }
```
Sur les deux chemins no-change (R1(a) early-return et R1(b) bloc restauré), `warnings` doit
rester rempli (il l'est : remplissage avant la garde, `orderReshop.utils.js` l.419-421) et
`conditions`/`bagages`/`secureSegments` calculés avant le retour R1(b) (conditions l.517-632,
secureSegments l.635-639, garde l.646).

---

## 4) BA — réponses `orderReshopRQ`

### 4.1 Action `reprice` → `repriceBookingRS` (consommé par `reshopDetails`/`reshopOrder`/`getReshopOffer`)

Champs lus : `amount` (l.1670 → gate l.1753), `conditions`, `bagages`, `secureSegments`,
`remarks` (l.1870), `Errors` (l.1869 — convention IB, jamais présent pour BA), `noPriceChange`
(non lu par `reshopOrder`, cf. divergence §9-2).
Sortie actuelle backend : `{ conditions, bagages, amount, currency, responseID,
priceGuaranteeTimeLimit, noPriceChange, hasRepricedOffer, priceChanged, requiresAcceptance,
priceComparison }` (`reshopping.js` l.775-791). `priceComparison` (unités majeures) n'est **pas
lu** par le front sur ce chemin ; `secureSegments`/`remarks` **ne sont pas produits** → `undefined`
(vigilance, hors périmètre MR).

### 4.2 Action `repriceOrder` → `repricedOrderRS` (intermédiaire backend, jamais consommé directement par le front)

Sortie (après R2) : `{ conditions, bagages, amount: "500.00", currency, responseID,
noPriceChange, hasRepricedOffer, priceChanged, requiresAcceptance, priceComparison:
{ oldPrice, newPrice, difference, currency, items: [{ paxRef, oldAmount, newAmount, difference }] } }`
— **unités majeures** (ex. R2.1 : 200/250/50). Ce shape alimente `buildPriceComparison`
(`reprice.utils.js`), qui produit le shape consommé (voir §5/§6).

---

## 5) BA/IB — payload de validation émission (`orderChangeRQ` process `issuance`)

Réponses consommées par `validateIssuancePrice` (BA l.869-882, BaseAdapter l.948-961) et
`issueOrder` (BA l.884-921, BaseAdapter l.963-996) sur
`POST /aerial/{BA|IBERIA}/order/orderChangeRQ` :

- **Succès validation (`validateOnly`)** : corps **FLAT** — `{ message: "priceValidation",
  priceChanged, requiresAcceptance, noPriceChange, responseID, priceComparison, acceptData }`
  (spread du payload ; BA `orderChangeService.js` l.302-307 / l.324-329 ; IB `order.controller.js`
  l.439-444 / l.461-466). Le front lit les champs **en top-level** (jamais sous `value`).
- **Changement de prix** : `{ message: "priceChangeRequired", ...même payload }` — lu FLAT par
  `issueOrder` (`responseData?.priceChanged && responseData?.requiresAcceptance`).
- **Erreurs** : `{ message: "orderChangeRS", value: { error: { statusText, description } } }`
  (HTTP 200) — lu via `responseData?.value?.error` (throw) ; le catch BA reste **HTTP 500**
  (`orderChangeService.js` l.494-505, hors R5 — divergence §9-6).
- **Acceptation** : `POST /aerial/BA/order/acceptRepricedOfferAndIssue` → `{ message,
  value: { error? } }`, lu `finalResponse?.error` (emitCard l.178).

---

## 6) `priceComparison` — contrat exact consommé par la popup

Shape final (celui de la popup) produit par `buildPriceComparison` (`reprice.utils.js`
l.105-183) puis `buildPriceValidationPayload` (l.192-220) :

```json
{ "oldPrice": 40000, "newPrice": 50000, "difference": 10000, "currency": "EUR",
  "items": [ { "paxName": "DUPONT JEAN", "oldAmount": 20000, "newAmount": 25000, "difference": 5000 } ] }
```

Invariants de shape :
- **Unités mineures (cents)** : `toMinorUnit` (l.140-142) ; le front ne convertit **rien**
  (`parseNumber`/`normalizeNumber`) et `formatPrice` divise par `10^decimals`
  (priceChangeConfirmDialog.utils.ts l.11). Toute évolution vers les unités majeures afficherait ×100.
- **Items sans `paxRef`** : le mapping l.138-143 ne forward pas `paxRef` → `paxName` backend est
  la **seule** source de noms réels ; les fallbacks front `getTravelerName(item.paxRef)`
  (BA l.52, BaseAdapter l.171-177) sont inopérants en pratique (§9-4).
- **Un item par passager** : la popup rend `v-for="(item, index) in priceData.items"`
  (PriceChangeConfirmDialog.vue l.111) — une ligne par item, montants **répartis** (R2.1).
  Un seul item pour N passagers ⇒ une seule ligne + montants faux (bug historique `[0]`).

---

## 7) Invariants UI critiques

- **(a) `noPriceChange === true` sur dossier émis (status 2) ⇒ AUCUN `paymentInfo` attaché.**
  - IB / Transavia : gate par drapeau — `status === 2 && !reshopDetailsResponse.noPriceChange`
    (IberiaAdapter.ts l.1406, TransaviaAdapter.ts l.1300). Garanti par R1 (flags + `amount: 0`).
  - BA : gate par montant — `status === 2 && Number(amount) > 0` (BritishAirawaysAdapter.ts
    l.1753). **Le front BA ne lit pas `noPriceChange` ici** : la garantie repose sur
    `amount: "0.00"` (string) quand no-change (api-contract §3). À tenir fermement.
- **(b) `priceComparison.items` : UN item par passager, montants répartis** (R2.1 miroir de
  `getPriceComparison` ; division par `passengerRefs.length || 1`). Sinon la popup affiche une
  ligne unique et des montants faux.
- **(c) `paxName` résolus côté backend.** Le front ne retombe sur les vrais noms que si
  `item.paxName` est absent **ET** `paxRef` est un paxId METIS (`getTravelerName`,
  BritishAirawaysAdapter.ts l.29-36) — or le payload final ne contient pas `paxRef` (§6) :
  la résolution positionnelle R2.2 (`paxs[index]`) est donc la garantie de noms corrects.
- **(d) `flightIndex` envoyé par le front (BritishAirawaysAdapter.ts l.184) doit sélectionner le
  FareComponent de l'OD choisi** (R4 : `ensureArray(AddOfferItem)[flightIndex ?? 0]` avec repli
  `[0]`). Sans cela, les conditions tarifaires affichées sont celles d'un autre OD.

---

## 8) M4 — suppression du bloc `priceComparison` mort côté IB

Grep `priceComparison` dans `front-reservation/app` : **aucun match dans `IberiaAdapter.ts` ni
`TransaviaAdapter.ts`** (38 matchs au total, tous dans BritishAirawaysAdapter, BaseAdapter,
EmiratesAdapter, `functions.utils.ts` et emitCard.vue — aucun sur le chemin IB). Le bloc mort de
la branche IB RepricedOffer (orderReshop.utils.js l.486-500) n'a **aucun lecteur front** :
M4 est sûr côté consommateur.

---

## 9) Divergences contractuelles / points de vigilance

1. **api-contract R1 omet `warnings`, `secureSegments`, `remarks`**, pourtant lus par le front
   IB (l.1360-1361 et l.1757). L'implémentation les remplit avant les gardes no-change (OK
   aujourd'hui), mais le contrat doit les inscrire pour verrouiller l'ordre du bloc restauré R1(b)
   (si la garde passait avant leur calcul → `warnings.forEach` sur `undefined` = crash IB).
2. **Gate BA par `amount` et non par `noPriceChange`** (l.1753) : si un jour
   `TotalPrice.SimpleCurrencyPrice._text` était non nul malgré `NoPriceChangeInd`, le front BA
   attacherait un `paymentInfo` à tort. La garantie « BA no-change ⇒ `amount: "0.00"` » doit être
   maintenue (et idéalement testée en backend).
3. **Double shape `priceComparison`** : `repricedOrderRS`/`getPriceComparison` = unités majeures
   (ex. R2.1 : 200/250/50) ; payload final `buildPriceComparison` = unités mineures
   (20000/25000/5000). L'exemple R2.1 du contrat API décrit le shape intermédiaire, pas celui
   consommé par la popup — à expliciter pour ne pas faire « corriger » le mauvais étage.
4. **`items` sans `paxRef` dans le payload final** : le fallback front `getTravelerName` est mort
   ; en cas de désalignement `paxs` (R2.2 « conserver la référence »), la popup affichera
   `"PAX n"` — UX dégradée acceptable, à documenter, mais ne pas supprimer la résolution R2.2.
5. **Casse `responseID`** : action reshop → `ResponseID` (PascalCase, reshopping.js l.423, lu
   BritishAirawaysAdapter.ts l.1539) ; actions reprice/repriceOrder → `responseID` (camelCase,
   l.782 / repricedOrder.js). Le front tolère les trois casings dans
   `normalizePriceValidationResult` (l.835-840) ✓ — à préserver.
6. **Incohérence de statuts HTTP BA** : `orderReshopService` (R5) → 200 même en erreur, mais le
   catch de `orderChangeService.handleRequest` reste **HTTP 500** (orderChangeService.js
   l.494-505) alors que `validateIssuancePrice`/`issueOrder` n'ont pas de try/catch (seul
   `emitCard.startRetarificationFlow` l.191-227 rattrape → toast générique). Hors périmètre R5,
   à harmoniser plus tard.
7. **IB chemin (a) : `currency` hard-fallback "EUR"** (orderReshop.utils.js l.406-408) alors que
   le contrat R1(a) annonce `"<RS>"` (et que le chemin (c) renvoie `null`). Le front IB ne lit pas
   `currency` dans `reshopOrder` → impact nul, mais écart contrat/code à corriger côté doc.

---

## 10) Signature

- **Date** : 22/07 — contrat d'interface (côté consommateur) établi le jour de la revue.
- **Rôle** : Designer (subagent_designer) — `specs/ui-contract.md` signé.
- **Périmètre** : formes consommées par `front-reservation` (aucun fichier front modifié) ;
  critères UI associés : **AC-U1..AC-U10** dans `specs/acceptance.md`.
