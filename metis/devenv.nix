{ pkgs, lib, config, inputs, ... }:

{
  env.GREET = "devenv";

  packages = [
    pkgs.git
    pkgs.gnumake
    pkgs.gemini-cli
  ];

  languages.javascript = {
    enable = true;
    npm.enable = true;
    bun.enable = true;
    corepack.enable = true;
  };

  # 1. Helper scripts (alignés avec pixi.toml)
  scripts = {
    # Run manually with: devenv run clean
    clean.exec = ./clean-branches.sh;

    # Parité avec `pixi run setup`
    setup.exec = "npm install -g bun @google/gemini-cli concurrently";

    # Parité avec `pixi run info`
    info.exec = "git --version && echo To clean branches, run: devenv run clean";

    # Parité avec `pixi run scalar`
    scalar.exec = "cd ./api-aerial/src/docs && npx --yes @scalar/cli document serve openapi.yaml --watch --port 8088";

    # Parité avec `pixi run scalar-build`
    scalar-build.exec = "cd ./api-aerial/src/docs && npx --yes @scalar/cli document validate openapi.yaml && node -e \"require('node:fs').copyFileSync('redoc.html', 'redoc-static.html')\"";

    # Parité avec `pixi run sdk-generate`
    sdk-generate.exec = "cd ./api-aerial/src/docs && node -e \"require('node:fs').rmSync('../../../sdk/typescript-fetch', { recursive: true, force: true })\" && npx --yes @openapitools/openapi-generator-cli generate -i openapi.yaml -g typescript-fetch -o ../../../sdk/typescript-fetch --skip-validate-spec --global-property apiDocs=false,modelDocs=false";
  };
  # 2. Processes (The "devenv up" part)
  # REMOVED the "init-project &&" chain. 
  # You don't want to clean git branches just to start a server.
  processes = {
    aerial-api.exec    = "cd ./api-aerial/src && npm run dev";
    dashboard-api.exec = "cd ./api-dashboard/src && npm run dev";
    front-resa.exec    = "cd ./front-reservation/src && npm run dev";
    dashboard.exec     = "cd ./front-dashboard/src && npm run dev";
  };

  enterShell = ''
    git --version
    echo "To clean branches, run: devenv run clean"
  '';

  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';
}
