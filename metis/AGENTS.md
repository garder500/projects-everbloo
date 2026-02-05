# Repository Guidelines

## Project Structure & Module Organization
This repository is a coordinator for the Metis system and mainly hosts configuration plus Git submodules. The main application code lives in sub-repositories:
- `api-aerial/`, `api-dashboard/`: backend APIs (Node/Express)
- `front-dashboard/`, `front-reservation/`: frontend apps (Nuxt 3)
- `debug-cli/`: local CLI utilities
- `pixi.toml`, `devenv.*`: dev environment tooling

Each submodule has its own `src/` directory containing `package.json`, source code, and tests. Run app-specific commands from inside those `src/` folders.

## Build, Test, and Development Commands
Use Pixi to manage common tasks:
- `pixi run setup`: installs global tooling (`bun`, `@google/gemini-cli`, `concurrently`).
- `pixi run up`: starts all services with labeled logs via `concurrently`.
- `pixi run clean`: runs `clean-branches.sh`.

Subproject examples (from inside `api-aerial/src`, etc.):
- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build` (frontends) / `npm run start` (APIs)

## Coding Style & Naming Conventions
- JavaScript/TypeScript style is enforced in each subproject via ESLint/Prettier (see subproject configs).
- Follow existing naming and folder conventions within each submodule (e.g., `src/controllers`, `src/services`, `src/models`).

## Testing Guidelines
- APIs typically use Mocha/Chai; frontends use Playwright (notably `front-reservation`).
- Test commands are defined in each submodule’s `package.json` (run from `src/`).
- Name tests to match the subproject conventions and co-locate with existing test structure.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits (e.g., `feat:`, `fix:`, `chore:`).
- PRs should include a clear summary, testing notes (commands run), and screenshots for UI changes.

## Configuration & Environment Tips
- Backend env files live in `src/.environment/`.
- Frontend env files live in `src/.environments/`.
- Submodules must be initialized after clone with `git submodule update --init --recursive`.
