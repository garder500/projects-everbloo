#!/usr/bin/env bash
# Usage: ./dev-env.sh minio-up | minio-down | env
#   minio-up   : démarre MinIO (docker ou podman), 1 bucket par repo
#   minio-down : arrête MinIO (les données sont conservées dans le volume)
#   env        : génère src/.environment/.env.local dans api-{aerial,car,rail,hotel}
set -eu
cd "$(dirname "$0")"

ENDPOINT="http://localhost:9000"
USER_="${MINIO_ROOT_USER:-minioadmin}"
PASS_="${MINIO_ROOT_PASSWORD:-minioadmin}"

compose() {
  if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then docker compose "$@"
  elif command -v podman >/dev/null 2>&1; then podman compose "$@"
  else echo "docker/podman introuvable" >&2; exit 1; fi
}

# .env.local est lu par dotenv-flow (hors NODE_ENV=test) et écrase .env sans toucher aux fichiers versionnés.
write_env() { # repo + variables de bucket
  local repo="$1"; shift
  local dir="$repo/src/.environment"
  [ -d "$dir" ] || { echo "⚠ $repo: $dir absent, ignoré"; return; }
  {
    echo "# Généré par ./dev-env.sh env — MinIO local, ne pas commiter"
    echo "S3_ENDPOINT=$ENDPOINT"
    echo "AWS_ACCESS_KEY=$USER_"
    echo "AWS_SECRET_KEY=$PASS_"
    for v in "$@"; do
      case "$v" in *=*) echo "$v" ;; *) echo "$v=$repo" ;; esac   # VAR=valeur littérale, sinon VAR=<bucket du repo>
    done
  } > "$dir/.env.local"
  # Évite de polluer le git status du repo
  local ex; ex="$(git -C "$repo" rev-parse --absolute-git-dir)/info/exclude"
  grep -qxF 'src/.environment/.env.local' "$ex" 2>/dev/null || echo 'src/.environment/.env.local' >> "$ex"
  echo "✓ $repo: $dir/.env.local"
}

case "${1:-}" in
  minio-up)   compose up -d --wait minio
              echo "MinIO: $ENDPOINT (console http://localhost:9001, $USER_/$PASS_)" ;;
  minio-down) compose down ;;
  env)
    write_env api-aerial NEXTCLOUD=true LOGS_AIRLINES_S3_BUCKET URL_LOGO URL_HISTORY_JSON OBT_FILES
    write_env api-car    LOGS_CAR URL_LOGO URL_HISTORY_JSON
    write_env api-rail   LOGS_RAIL OBT_FILES URL_LOGO URL_HISTORY_JSON
    write_env api-hotel  LOGS_HOTEL LOGS_STATIC_DATA OBT_FILES URL_LOGO URL_HISTORY_JSON ;;
  *) echo "Usage: $0 minio-up|minio-down|env" >&2; exit 2 ;;
esac
