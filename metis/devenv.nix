{ pkgs, lib, config, inputs, ... }:

{
  env.GREET = "devenv";

  packages = [
    pkgs.git
    pkgs.gnumake
  ];

  languages.javascript = {
    enable = true;
    npm.enable = true;
    bun.enable = true;
    corepack.enable = true;
  };

  # 1. Define it as a helper script
  # Now you can run "devenv run clean" manually when you need it.
  scripts.clean.exec = "make clean-branches";

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