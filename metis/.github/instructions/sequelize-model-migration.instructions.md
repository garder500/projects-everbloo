---
description: "Use when creating or editing Sequelize models, migrations, or database schema changes in api-aerial or api-dashboard."
applyTo: "api-*/src/models/**,api-*/src/migrations/**"
---

# Sequelize Model & Migration Conventions

## Models
- Export a factory function: `module.exports = (sequelize, DataTypes) => { ... }`.
- Extend `Model` class with `static associate(models)` for relationships.
- Use `Model.init({ fields }, { sequelize, modelName, tableName, timestamps: true })`.
- `modelName`: PascalCase (`LegalPerson`). `tableName`: snake_case plural (`legal_persons`).
- Foreign keys: snake_case in DB columns (`legal_person_id`), camelCase in `as` aliases (`legalPerson`).
- Define both relationship directions (`hasMany` + `belongsTo`).

## Migrations
- Filename: `YYYYMMDDHHmmss-description-kebab-case.js`.
  - `create-table-name` for new tables.
  - `add-column-to-table` for additions.
  - `modify-column-name`, `optimize-*`, `fix-*` for changes.
- Add JSDoc type: `/** @type {import('sequelize-cli').Migration} */`.
- Always implement both `async up()` and `async down()` (reversible).
- Use `describeTable` or `tableExists` checks for idempotent migrations.
- Add `comment` on new columns to explain purpose.
- Name indexes explicitly with `idx_` prefix for debuggability.
- Null-safe unique indexes: `where: { column: { [Sequelize.Op.ne]: null } }`.

## Config
- `.sequelizerc` points to `config/config.js`, `models/`, `migrations/`.
- Run from `<submodule>/src/`: `npx sequelize-cli db:migrate`.
