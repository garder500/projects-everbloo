---
description: "Use when editing supplier integration code in api-aerial: controllers/services/utils per airline, Oras routing, XML/SOAP payload transforms, global.controller multi-provider shopping, and OCN notification handling."
applyTo: "api-aerial/src/**"
---

# API Aerial — Intégrations Fournisseurs

Ce fichier décrit les patterns d'intégration avec les transporteurs aériens (GDS, NDC, API directes) dans `api-aerial/src/`.

> Pour la matrice des fonctionnalités par fournisseur, voir [introspection.md](../../introspection.md).
> Pour les détails d'architecture globale, voir [GEMINI.md](../../GEMINI.md).

## Structure par fournisseur

Chaque fournisseur est organisé en **3 couches** dans des dossiers distincts :

| Couche | Exemple | Rôle |
|--------|---------|------|
| Controllers | `controllers/TURKISH_AIRLINES/` | Point d'entrée HTTP : valide, transforme, appelle le service |
| Services | `services/TURKISH_AIRLINES/global.service.js` | Appels HTTP/Axios vers l'API fournisseur |
| Utils | `utils/TURKISHA/` | Transformation de payloads, mapping XML↔JSON, normalisation |

Fournisseurs actifs et leurs dossiers :

| Code Oras | Dossier contrôleur | Dossier service | Dossier utils | Compagnies |
|-----------|-------------------|-----------------|---------------|------------|
| AFKL | `controllers/AFKL/` | `services/AFKL/` | `utils/AFKL/` | AF, KL |
| SABRE/SABRENDC | `controllers/SABRE/` | `services/SABRE/` | `utils/SABRE/` | LH, UA, SN, LX, OS, GDS… |
| AMADEUS | `controllers/AMADEUS/` | `services/AMADEUS/` | (via global) | GDS |
| TURKISH_AIRLINES | `controllers/TURKISH_AIRLINES/` | `services/TURKISH_AIRLINES/` | `utils/TURKISHA/` | TK |
| TRANSAVIA | `controllers/TRANSAVIA/` | `services/TRANSAVIA/` | `utils/TRANSAVIA/` | TO, HV |
| GOKYTE | `controllers/GOKYTE/` | `services/GOKYTE/` | `utils/GOKYTE/` | U2, FR, 6E, V7… |
| IBERIA | `controllers/IBERIA/` | `services/IBERIA/` | `utils/IBERIA/` | IB |
| ACCELYA | `controllers/ACCELYA/` | `services/ACCELYA/` | — | A3, OA |
| EK | `controllers/EK/` | `services/EK/` | `utils/EK/` | EK |
| BA | — | — | `utils/BA/` | BA |

## Convention des contrôleurs

### Base controller (CRUD générique)

Le fichier `controllers/base.controller.js` exporte une **factory function** :

```js
module.exports = (serviceName) => ({
  Controller: class {
    static async create(req, res, next) { /* appelle services/<serviceName>.service.js */ }
    static async read(req, res, next) { /* … */ }
    static async update(req, res, next) { /* … */ }
    static async delete(req, res, next) { /* … */ }
  }
})
```

- Les messages de succès/échec sont en français.
- Les erreurs sont propagées au middleware via `next(error)`.
- Utiliser `GeneralError` (de `helpers/errors`) pour les erreurs métier avec statut HTTP.

### Contrôleurs métier spécifiques

- Héritent du `Controller` de base : `const { Controller } = require('../base.controller')('clients')`.
- Implémentent des méthodes statiques pour chaque endpoint (ex: `airShoppingRQ`, `orderCreateRQ`, `OrderChangeNotifRQ`).
- **Pattern `setupRoute`** : chaque fichier exporte `setupRoute: (app) => { app.post("/endpoint", handler); return app; }`.
- Les OCN (Order Change Notification) utilisent `express-xml-bodyparser` (middleware inclus dans le routeur).

### Contrôleur global multi-fournisseur

- `controllers/global.controller.js` centralise le routage shopping pour tous les fournisseurs.
- Utilise la constante `Oras` pour mapper les codes compagnies (AF, KL, TK, TO…) vers les dossiers fournisseurs.
- Gère les timeouts (env. `SHOPPING_PROVIDER_TIMEOUT_MS`), la normalisation des réponses vides (`NonResultStructure`).
- Supporte `verifyFlight` avec des timeouts séparés.

## Convention des services

Chaque fournisseur a un `global.service.js` (dans `services/<SUPPLIER>/`) qui :

- Utilise **Axios** pour les appels HTTP vers l'API du transporteur.
- Envoie des logs RQ/RS vers Nextcloud via `sendFileToNextcloud()`.
- Utilise une configuration centralisée (ex: `config/afConfig.js` pour AFKL, `config/sabreConfig.js` pour SABRE).
- Retourne les données brutes (XML string ou JSON) pour traitement dans le contrôleur/utilitaire.

## Convention des utilitaires

Les `utils/<SUPPLIER>/` contiennent des **fonctions pures** de transformation :

- **Sous-dossiers par domaine** : `order/`, `offer/`, `seat/`, `shopping/`, `service/`.
- **`_methods/`** : opérations unitaires réutilisables (split, refresh, requestAccessibility…).
- **Logging** : via `utils/useCases.utils.js` (`logXml`, `logJson`).
- **Normalisation** : utiliser `ensureArray` (depuis `utils/dossier.utils.js`) pour les champs pouvant être singleton ou tableau.
- **Conversion XML↔JSON** : via `utils/global.utils.js` (`convertXmlToJson`), ou `xml-js` (`xml2json`, `json2xml`).

### Cas particulier : Sabre

Le dossier `utils/SABRE/` est le plus complexe :
- Orchestrations GDS et NDC : shopping, booking, ticketing, exchange, refund, seat map.
- Sous-dossier `_methods/` : opérations unitaires.
- Tests dans `__tests__/*.test.js` avec le test runner natif Node.
- Voir `.github/instructions/sabre-ticketing-exchange-guards.instructions.md` pour les gardes à respecter.
- Voir `.github/skills/sabre-payload-transforms/SKILL.md` pour les transformations SOAP/XML et REST/JSON.

## Enregistrement des routes

Dans `app.js`, les routes sont enregistrées manuellement :

```js
app.use(`/TK/ocn`, basicAuthTK, require(`./controllers/TURKISH_AIRLINES/ocn.controller.js`)(express(), GeneralError));
app.use("/SABRE/ens", basicAuthSabre, require(`./controllers/SABRE/ocn.controller.js`)(express(), GeneralError));
```

- Chaque route fournisseur a son propre middleware `basicAuth<SUPPLIER>`.
- Les middlewares globaux (Sentry, CORS, body-parser) sont ajoutés avant les routes.

## SOAP/XML et OCN

- Les webhooks SOAP (Order Change Notification) utilisent `express-xml-bodyparser`.
- Les contrôleurs OCN doivent répondre immédiatement avec un accusé de réception XML (IATA_Acknowledgement), puis traiter la notification en arrière-plan.
- La gestion des namespaces XML est critique : vérifier les préfixes (`ns2:`, `ns3:`) et les formats camelCase/snake_case.
- Voir `controllers/TURKISH_AIRLINES/ocn.controller.js` pour un exemple complet avec namespace fallback.

## Tests

| Type | Commande |
|------|----------|
| Tests Mocha/Chai | `npm run test:windows` (depuis `src/`) |
| Tests unitaires SABRE | `node --test utils/SABRE/__tests__/*.test.js` |

- Les tests Mocha/Chai se trouvent dans `test/`.
- Les tests d'utilitaires SABRE utilisent le test runner natif Node.js.

## Liens utiles

| Documentation | Contenu |
|---------------|---------|
| [introspection.md](../../introspection.md) | Matrice des fonctionnalités par fournisseur |
| [GEMINI.md](../../GEMINI.md) | Architecture globale et descriptions de workflows |
| `.github/instructions/sabre-ticketing-exchange-guards.instructions.md` | Gardes pour ticketing/exchange Sabre |
| `.github/skills/sabre-payload-transforms/SKILL.md` | Transformations de payloads Sabre |
| `.github/instructions/sequelize-model-migration.instructions.md` | Conventions modèles/migrations |
