# Everbloo - Metis Projects

This repository manages multiple related projects using [devenv](https://devenv.sh/). It allows you to easily clone, update, and run the entire stack.

## Prerequisites

- **MacOS** or **WSL2** (for Windows users).
- **Nix**: Follow the [Nix installation guide](https://devenv.sh/getting-started/#1-install-nix).
- **devenv**: Follow the [devenv installation guide](https://devenv.sh/getting-started/#2-install-devenv).

## Setup

1. **Navigate to the project directory**:
   ```bash
   cd metis
   ```

2. **Clone and Install dependencies**:
   This command will clone all necessary repositories (`api-aerial`, `api-dashboard`, etc.) and run `npm install`.
   ```bash
   devenv run pull
   ```
   *Alternatively, if you are already in a nix shell, you can run `make pull`.*

## Running the Projects

To start all services (APIs and Frontends) simultaneously:

```bash
devenv up
```

This will start:
- `api-aerial`
- `api-dashboard`
- `front-reservation`
- `front-dashboard`

## Maintenance

To clean up merged local git branches and update all repositories to the latest `development` branch:

```bash
devenv run clean
```

## Troubleshooting

- Ensure your SSH keys are configured for GitLab, as the projects are cloned via SSH.
- If a process fails to start, check the logs in the `devenv up` output.