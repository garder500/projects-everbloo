# Metis Project Context

## Overview
Metis is a monorepo project composed of multiple services for an aerial and dashboard management system. It integrates backend APIs and frontend applications, managed together via shell scripts and `devenv`.

### Project Structure
The repository is divided into four main sub-projects:

*   **`api-aerial`**: Backend API service for aerial operations.
*   **`api-dashboard`**: Backend API service for the dashboard.
*   **`front-dashboard`**: Frontend application for the dashboard (Nuxt 3).
*   **`front-reservation`**: Frontend application for reservations (Nuxt 3).

## Architecture & Tech Stack

### Backend (`api-aerial` & `api-dashboard`)
*   **Framework**: Node.js with Express.js.
*   **ORM**: Sequelize (supports MySQL, Postgres, etc.).
*   **Architecture**: MVCS (Model-View-Controller-Service).
*   **Authentication**: Keycloak.
*   **Documentation**: Swagger/OpenAPI.
*   **Key Directories**:
    *   `src/.environment/`: Environment configuration files.
    *   `src/controllers/`: Request handlers.
    *   `src/services/`: Business logic.
    *   `src/models/`: Database models (Sequelize).
    *   `src/migrations/`: Database migrations.

### Frontend (`front-dashboard` & `front-reservation`)
*   **Framework**: Nuxt 3 (Vue 3).
*   **UI Library**: Vuetify 3.
*   **State Management**: Pinia.
*   **Testing**: Playwright (in `front-reservation`).
*   **Key Directories**:
    *   `src/.environments/`: Environment configuration files (Note: plural `s` here, singular in API).
    *   `src/pages/`: Application routes.
    *   `src/components/`: Reusable Vue components.
    *   `src/stores/`: Pinia stores.

## Development Workflow

### Setup & Management
*   **Dependencies**: The project uses `devenv` for environment management.
*   **Git Management**: `clean-branches.sh` is used to manage branches and update sub-repositories.

### Building and Running
Each sub-project has its own `src` directory containing the `package.json` and source code. You must typically navigate into `src` to run commands.

**Common Commands (run inside `src/`):**

*   **Install Dependencies**: `npm install`
*   **Development Server**: `npm run dev`
    *   APIs typically run on `localhost:8080`.
    *   Frontends typically run on `localhost:3000` or `5000`.
*   **Linting**: `npm run lint`
*   **Production Build**: `npm run start` (APIs) or `npm run build` (Frontends).

### Database Management (APIs)
*   **Migration**: `npm run sequelize:aerial:migrate` (or similar, check `package.json` scripts).
*   **Seeding**: `npm run sequelize:aerial:seed:all`.

### Environment Configuration
*   **Backend**: `.env` files located in `src/.environment/`.
*   **Frontend**: `.env` files located in `src/.environments/`.

## Conventions
*   **Code Style**: ESLint, Prettier, and Husky are used to enforce code quality.
*   **Commit Messages**: Follow Conventional Commits (enforced by Commitizen/Commitlint).
*   **Testing**: Mocha/Chai for APIs, Playwright for `front-reservation`.

## Important Notes
*   **Directory Nesting**: Most operational commands need to be run from within the `src` subdirectory of each project, not the project root.
*   **Legacy Node**: The APIs mention Node v16.13.0 in their documentation. Ensure compatibility if using newer versions.
