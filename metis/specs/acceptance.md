# Acceptance — Revue 22/07 — MR !2162 (branche `jeremy-met2-2229`)

Tableau des critères d'acceptation issus de `specs/api-contract.md`.
Statuts : `PENDING` (initial) → `PASS` (tests verts) / `FAIL` (tests rouges) / `BLOCKED` (dépendance externe).
En phase VALIDATION, les statuts terminaux sont `PASSED` / `OPEN` (voir « Rapport de validation » ci-dessous).

| # | Item | Critère testable | Statut |
|---|------|------------------|--------|
| AC-1 | R1(a) | `getReshopDetails` : `NoPriceChangeInd` + aucun `ReshopOffers` → retour immédiat avec `noPriceChange:true, priceChanged:false, requiresAcceptance:false, amount:0` ; aucun parsing RepricedOffer. | PASSED |
| AC-2 | R1(b) | `getReshopDetails` : `ReshopOffers` présent + `NoPriceChangeInd` (formes `{}` et `{_text:"true"}`) → `noPriceChange:true, priceChanged:false, requiresAcceptance:false, amount:0, paxPriceDetails:[]` ; `ReshopDifferential` non lu. | PASSED |
| AC-3 | R1(b) | `getReshopDetails` : `ReshopOffers` sans `NoPriceChangeInd` → comportement existant conservé (`priceChanged:true`, `amount` = somme `ReshopDifferential`). | PASSED |
| AC-4 | R1(c) | `getReshopDetails` : `RepricedOffer` → `amount` = somme des items ; champs de sortie `noPriceChange, priceChanged, requiresAcceptance, amount, currency, responseID, conditions, bagages, paxPriceDetails` présents. | PASSED |
| AC-5 | R1(a) | La garde l.~426 `&& !hasReshopOffers` reste en place : `NoPriceChangeInd` + `ReshopOffers` présent ne fait PAS d'early-return en l.426. | PASSED |
| AC-6 | R2.1 | `repricedOrderRS` : 1 item multi-pax "T1 T2" 400→500 ⇒ items `[{T1,200,250,50},{T2,200,250,50}]`, oldPrice 400, newPrice 500, difference 100, amount "500.00", priceChanged/requiresAcceptance true. | PASSED |
| AC-7 | R2.1 | `repricedOrderRS` : item mono-pax → 1 item, montants non divisés (régression). | PASSED |
| AC-8 | R2.2 | `repricedOrderRS(jsonRS, { paxs })` avec `paxs.length === items.length` → `paxRef` remplacé par `paxs[i].id` (positionnel). | PASSED |
| AC-9 | R2.2 | `repricedOrderRS` sans `paxs` ou longueur désalignée → références NDC conservées. | PASSED |
| AC-10 | R2.2 | `buildPriceComparison` : `paxById[paxRef]` absent ET `items.length === paxs.length` → `paxName` résolu via `paxs[index]`. | PASSED |
| AC-11 | R2.2 | Chemin IB intact : `buildPriceChangePayload` IB n'envoie pas `items` (uniquement `paxAmountLookup`) ; `buildPriceComparison` continue de résoudre via `paxById`. | PASSED |
| AC-12 | R2.3 | Propagation : `orderChangeService.handleRequest` → `createResponse({ ..., paxs: body.paxs })` ; `orderReshopService.createResponse` forward `paxs` → `repricedOrderRS` ; route BA `handleRequest` forward `req.body.paxs`. | PASSED |
| AC-13 | R3 | Harnais présent : `src/utils/__tests__/fixtures/BA/README.md` + test chargeant les fixtures `nochange`/`changed` (xml|json) si existantes, `t.skip` sinon. | OPEN |
| AC-14 | R3 | R3 documenté comme dépendance externe bloquante tant que les échantillons réels ne sont pas déposés (critère de suivi, pas de code). | OPEN |
| AC-15 | R4 | `createResponse` action "reprice" : `flightIndex` "1"/1 → injecté comme entier ≥ 0 ; `"abc"`/NaN/undefined → non injecté. | PASSED |
| AC-16 | R4 | `repriceBookingRS` : sélection `AddOfferItem[jsonRS.flightIndex ?? 0]` avec repli `[0]` (hors bornes / absent). | PASSED |
| AC-17 | R5 | `orderReshopService.handleRequest` catch → HTTP 200, body exact `{ message:"orderReshopRS", value:{ error:{ statusText, description } } }` avec fallbacks "Internal server error". | PASSED |
| AC-18 | R5 | Erreur SOAP (pas de `Success`) → HTTP 200 + `value.error` (Code/_text) — inchangé. | PASSED |
| AC-19 | M1 | `formatOrder` : `Order.tstDeadline` = Timestamp `TimeLimits.PriceGuaranteeTimeLimit` (1er OrderItem) ; `null` si absent. | PASSED |
| AC-20 | M2 | `repriceBookingRS` : `priceGuaranteeTimeLimit` lu via `ensureArray(ReshopOffer)[0].PriceGuaranteeTimeLimitDateTime._text ?? null` (cas tableau OK). | PASSED |
| AC-21 | M3 | Les 3 occurrences `tstDeadline` de `dossier.utils.js` passent à `|| null` ; regex du test `baCreateDossier.tstDeadline.test.js` mis à jour. | PASSED |
| AC-22 | M4 | Branche IB RepricedOffer sans `priceComparison` ; `getReshopDetails.repricedOffer.test.js` sans assertion `priceComparison` ; payload IB toujours vert. | PASSED |
| AC-23 | M5 | `package.json` expose `test:regression:ba`, `test:regression:ib`, `test:unit` ; `test:unit` couvre les tests node:test de `src/utils/__tests__` ; contraintes `--test-isolation=none` + glob unique/chemins absolus. | PASSED |
| AC-24 | M6 | Écart §12 documenté dans la MR (devise RS vs POS) ; aucun changement de code requis (critère de documentation). | PASSED |

---

## Blocages externes

- **R3** : aucun échantillon BA `OrderReshopRS <Reprice/>` réel déposé → AC-13/AC-14 restent
  **OPEN** : le harnais existe (`fixtures/BA/README.md` + `baRepricedOrder.realSamples.test.js`)
  et skippe tant que `BA_orderReshopRS_reprice_nochange.json` / `..._changed.json` ne sont pas
  déposés (2 tests skip sur les 79 du périmètre — vérifié en validation). Dépôt requis avant merge.
- **R4** : mise à jour de la description de la MR à faire (comportement `flightIndex`, défaut 0) —
  **note ouverte** (le comportement AC-15/AC-16 est, lui, implémenté et testé).
- **M6** : écart §12 (devise RS vs POS) **documenté** — consigné au §9.7 de `specs/ui-contract.md`
  (divergence 7 : `currency` hard-fallback "EUR" chemin IB (a) vs `"<RS>"` annoncé) + note MR.
  Aucun changement de code requis.

---

## Signature

- **Date** : 22/07 — contrat signé (revue de code MR !2162).
- **Rôle** : Architecte (subagent_architect).
- **Engagements** : les critères AC-1..AC-24 servent de grille de validation des phases TDD
  (tests rouges) puis Code (tests verts) ; statut mis à jour par le tester à chaque phase.

---

## Critères UI (designer — contrat consommateur, `specs/ui-contract.md`)

Testables par lecture des adapters `front-reservation` (lecture seule) et, le cas échéant, par un
test backend de l'item correspondant (colonne « Appui backend »). Statuts : `PENDING` (initial) →
`PASSED` / `OPEN` / `NON CONFORME` (phase VALIDATION — preuve fichier:ligne).

| # | Invariant | Critère testable (lecture front + appui backend) | Statut | Preuve (front → backend/test) |
|---|-----------|--------------------------------------------------|--------|-------------------------------|
| AC-U1 | (a) IB | `IberiaAdapter.ts:1406` : `status===2 && !reshopDetailsResponse.noPriceChange` gate l'attachement de `paymentInfo` ⇒ R1 doit garantir `noPriceChange:true` + `amount:0` sur les chemins no-change (appui backend : AC-1/AC-2). | PASSED | `IberiaAdapter.ts:1406` → `orderReshop.utils.js:426-431` (R1a), `:484` (RepricedOffer `noPriceChange=!priceChanged`), `:634-639` (R1b) ; `getReshopDetails.noPriceChange.test.js:82-103,163-176` |
| AC-U2 | (a) BA | `BritishAirawaysAdapter.ts:1753` : gate `status===2 && Number(amount)>0` — le front BA ne lit PAS `noPriceChange` ⇒ le backend doit garantir `amount:"0.00"` (string) quand `noPriceChange` (appui backend : test `repricedOrderRS` no-change → `amount:"0.00"`). | PASSED | `BritishAirawaysAdapter.ts:1670,1753` → `repricedOrder.js:46` (`amount:"0.00"` sur NoPriceChangeInd). Assertion unitaire **verrouillée** : `repricedOrderRS.test.js:63,78` (`amount === "0.00"` sur les deux formes de NoPriceChangeInd). |
| AC-U3 | (b) | Un item par passager, montants répartis : popup `PriceChangeConfirmDialog.vue:105-129` rend une ligne par `items[i]` ⇒ R2.1 doit produire N items pour N `PassengerRefs` avec division par `passengerRefs.length` (appui backend : AC-6/AC-7). | PASSED | `PriceChangeConfirmDialog.vue:111` (`v-for="(item, index) in priceData.items"`) → `repricedOrder.js:71-118` (flatMap par ref, `paxCount`) ; `repricedOrderRS.test.js:325-378` |
| AC-U4 | (c) | `paxName` résolu backend : le payload final (`buildPriceComparison`) n'emporte PAS `paxRef`, donc le fallback `getTravelerName` (BA l.52, BaseAdapter l.171-177) est inopérant ⇒ R2.2 doit résoudre `paxName` via `paxs[index]` quand aligné (appui backend : AC-10). | PASSED | `BaseAdapter.ts:171-177`, `BritishAirawaysAdapter.ts:52` → `reprice.utils.js:135-142` (fallback positionnel `backendItems.length === passengers.length`) ; `reprice.utils.test.js:245-296` |
| AC-U5 | (d) | `flightIndex` consommé : `BritishAirawaysAdapter.ts:184` l'envoie ; `repriceBookingRS` doit sélectionner `AddOfferItem[flightIndex ?? 0]` avec repli `[0]` (appui backend : AC-15/AC-16). | PASSED | `BritishAirawaysAdapter.ts:184` → `orderReshopService.js:64-68` (normalisation entier ≥ 0) + `reshopping.js:726-731` (`[jsonRS.flightIndex ?? 0] ?? [0]`) ; `repricedOrderRS.test.js:493-542` |
| AC-U6 | R5 | `BritishAirawaysAdapter.ts:205-212` destructure `{ data: { value } }` SANS try/catch et `axios.ts:53-56` rejette hors 2xx ⇒ `orderReshopService.handleRequest` doit répondre HTTP 200 avec `value.error { statusText, description }` (appui backend : AC-17/AC-18). | PASSED | `BritishAirawaysAdapter.ts:205-212`, `axios.ts:53-56` → `orderReshopService.js:128-142` (catch → `res.json` 200 + fallbacks "Internal server error") ; `orderReshopService.contract.test.js:12-67` |
| AC-U7 | M4 | Grep `priceComparison` dans `IberiaAdapter.ts` + `TransaviaAdapter.ts` : 0 lecteur ⇒ suppression du bloc mort IB (orderReshop.utils.js ~l.486-500) sans impact front (appui backend : AC-22). | PASSED | Grep front : **0 match** dans `IberiaAdapter.ts`/`TransaviaAdapter.ts` (38 matchs, tous BA/BaseAdapter/Emirates/emitCard/functions.utils) → `orderReshop.utils.js:486-488` (commentaire M4, pas d'émission) ; `getReshopDetails.repricedOffer.test.js:65,85,107` (`priceComparison === undefined`) |
| AC-U8 | unités mineures | Popup `formatPrice` divise par 10^decimals ; `normalizePriceComparison` (BA l.38-72, BaseAdapter l.168-201) ne convertit pas ⇒ le payload final `priceComparison` doit rester en **unités mineures** (appui backend : test `buildPriceComparison` → `oldPrice/newPrice/oldAmount/...` entiers en cents). | PASSED | `priceChangeConfirmDialog.utils.ts:11` (`amount / 10 ** decimals`) → `reprice.utils.js:32-35` (`toMinorUnit`) + `:149-151` ; `reprice.utils.test.js:158-160,261-275` (20000/25000/5000) |
| AC-U9 | IB champs annexes | `IberiaAdapter.ts:1361` lit `warnings.forEach` (status!==1) et `:1757` lit `secureSegments`/`remarks` ⇒ ces champs doivent rester remplis sur les chemins no-change R1(a)/(b) (remplissage avant les gardes ; appui backend : assertions AC-1/AC-2 étendues à `warnings` rempli + `secureSegments`/`remarks` présents). | PASSED | `IberiaAdapter.ts:1360-1361,1757` → `orderReshop.utils.js:419-421` (warnings avant garde R1a), `:611-627` (conditions + secureSegments avant garde R1b `:634`) ; `getReshopDetails.noPriceChange.test.js:94-99` |
| AC-U10 | BA shape reprice | `BritishAirawaysAdapter.ts:1870` destructure `conditions`/`bagages`/`secureSegments`/`remarks` de la réponse `orderReshopRQ` action `reprice` ⇒ `repriceBookingRS` doit exposer `conditions` et `bagages` (constat : `secureSegments`/`remarks` absents aujourd'hui → vigilance, hors périmètre MR). | PASSED | `BritishAirawaysAdapter.ts:1867-1883` → `reshopping.js:740-753` (`conditions`), `:734,781` (`bagages`) ; `secureSegments`/`remarks` **non produits** → `undefined` — hors périmètre MR (vigilance, ui-contract §4.1/§9) |

---

## Rapport de validation

- **Date** : 17/08/2026 — phase VALIDATION de la revue du 22/07, MR !2162 (api-aerial,
  branche `jeremy-met2-2229`).
- **Rôle** : Designer (subagent_designer) — vérification du contrat d'interface backend ⇄
  `front-reservation` (lecture seule, aucun fichier front modifié).

### Résultat des suites (vérifié en session)

`node v25.6.1` — `node --test --test-isolation=none` sur les **9 fichiers node:test du périmètre**
(`getReshopDetails.noPriceChange`, `getReshopDetails.repricedOffer`, `ibAcceptRepricedOrder.uc08`,
`repricedOrderRS`, `reprice.utils`, `orderReshopService.contract`, `baRetrieve.tstDeadline`,
`baCreateDossier.tstDeadline`, `baRepricedOrder.realSamples`) :

- **79 tests — 77 pass / 2 skip / 0 échec** (les 2 skips = R3, échantillons BA réels absents).

### Couverture des fichiers clés (vérifiée en session, `--experimental-test-coverage`)

| Fichier | % lignes | Note |
|---|---|---|
| `src/utils/BA/orderReshop/repricedOrder.js` | **100.00 %** | branches 95.56 %, fonctions 100 % |
| `src/utils/pricing/reprice.utils.js` | **98.77 %** | lignes 25-26 (cache `Intl`) et 64 (fallback parseFloatSafe) non couvertes |

### Lint — limitation pré-existante

`src/.eslintrc` extends **`airbnb-base`** + plugin **`promise`**, mais `eslint-config-airbnb-base`
et `eslint-plugin-promise` sont **absents de `node_modules`** → ESLint 8.57.1 échoue dès la
résolution de config (« ESLint couldn't find the config "airbnb-base" to extend from »).
Aucun fichier du périmètre MR n'est lintable localement — limitation d'environnement **antérieure
à la MR**, hors périmètre (les fichiers du MR suivent le style airbnb-base à la main).

### Statut final par groupe de critères

| Groupe | Critères | Statut |
|---|---|---|
| R1 (chemins no-change IB) | AC-1..AC-5 | **5/5 PASSED** |
| R2 (repricedOrderRS multi-pax, mapping paxs, propagation) | AC-6..AC-12 | **7/7 PASSED** |
| R3 (calibration BA réelle) | AC-13..AC-14 | **2/2 OPEN** — harnais prêt, échantillons réels à déposer avant merge |
| R4 (flightIndex) | AC-15..AC-16 | **2/2 PASSED** (note ouverte : mise à jour texte MR) |
| R5 (HTTP 200 + value.error) | AC-17..AC-18 | **2/2 PASSED** |
| M1..M6 | AC-19..AC-24 | **6/6 PASSED** |
| Critères UI consommateur | AC-U1..AC-U10 | **10/10 PASSED** (2 divergences résiduelles documentées) |

### Preuves AC-U (synthèse)

Voir colonne « Preuve » du tableau AC-U ci-dessus — chaque critère est adossé à une lecture front
(fichier:ligne) et à un appui backend (code + test node:test, tous verts).

### Divergences résiduelles

1. ~~Gate BA par `Number(amount) > 0`~~ — **résolue** : assertions `amount === "0.00"` ajoutées aux
   deux tests no-change de `repricedOrderRS.test.js` (l.63, l.78) en plus de la garantie code
   (`repricedOrder.js:46`). Le front BA ne lit pas `noPriceChange` ; la garantie est désormais
   verrouillée par test unitaire ET par le harnais R3.
2. ~~`handleRequest` route BA ne forward pas `req.body.paxs`~~ — **résolue** :
   `orderReshopService.js:122` transmet désormais `paxs: req.body.paxs` à `createResponse`
   (complète AC-12 ; sans impact fonctionnel pour l'action `reprice`, qui ne consomme pas `paxs`).
3. **Catch `orderChangeRQ` toujours HTTP 500** (`orderChangeService.js:494-505`) alors que
   `validateIssuancePrice`/`issueOrder` n'ont pas de try/catch : hors périmètre R5, à harmoniser
   plus tard (déjà consigné ui-contract §9.6).
4. **`secureSegments`/`remarks` absents du shape `repriceBookingRS`** (action `reprice`) :
   destructures à `undefined` par `BritishAirawaysAdapter.ts:1870` — hors périmètre MR (vigilance
   maintenue, ui-contract §4.1).

### Confirmation M4

**Aucun lecteur front ne consomme le `priceComparison` IB supprimé** : grep `priceComparison` sur
`front-reservation/app` → 0 match dans `IberiaAdapter.ts` et `TransaviaAdapter.ts` ; les 38 matchs
restants sont tous sur les chemins BA (`BritishAirawaysAdapter`, `BaseAdapter`), Emirates,
`emitCard.vue` et une variable locale sans rapport dans `functions.utils.ts`. La branche IB
RepricedOffer n'émet plus le champ (`orderReshop.utils.js:486-488`) et les tests
`getReshopDetails.repricedOffer.test.js` assèrent `priceComparison === undefined`. **Sûr côté
consommateur.**

---

## Signature designer (contrat UI consommateur)

- **Date** : 22/07 — contrat d'interface consommateur signé (revue de code MR !2162).
- **Rôle** : Designer (subagent_designer) — `specs/ui-contract.md`.
- **Engagements** : les critères AC-U1..AC-U10 servent de grille de vérification côté
  consommateur (lecture des adapters `front-reservation`, aucun fichier front modifié) ; statut
  mis à jour par le tester à chaque phase. Les divergences contractuelles sont consignées au §9
  de `specs/ui-contract.md`.

- **Validation (17/08/2026)** : AC-U1..AC-U10 vérifiés contre le code implémenté et les
  consommateurs front (voir Rapport de validation) — **10/10 PASSED**, aucun fichier front modifié.
