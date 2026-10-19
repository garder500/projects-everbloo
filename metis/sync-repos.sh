#!/usr/bin/env bash
# Clone les repos manquants et met à jour (fast-forward only) ceux déjà présents.
# Usage: ./sync-repos.sh [--clone-only]
set -u
cd "$(dirname "$0")"

BASE="git@gitlab.com:GroupeAdnenis/metis-connect"
REPOS=(api-aerial api-dashboard api-car api-hotel api-rail front-dashboard front-reservation)
CLONE_ONLY=0
[ "${1:-}" = "--clone-only" ] && CLONE_ONLY=1

fail=0
for r in "${REPOS[@]}"; do
  if [ ! -e "$r/.git" ]; then
    if [ -d "$r" ] && [ -n "$(ls -A "$r")" ]; then
      echo "⚠ $r: dossier non vide sans .git, ignoré"; fail=1; continue
    fi
    echo "⬇ $r: clone"
    git clone "$BASE/$r.git" "$r" || { echo "✗ $r: clone échoué"; fail=1; }
    continue
  fi
  [ "$CLONE_ONLY" = 1 ] && { echo "· $r: présent"; continue; }
  branch=$(git -C "$r" symbolic-ref --short -q HEAD) || { echo "⚠ $r: HEAD détachée, ignoré"; continue; }
  if [ -n "$(git -C "$r" status --porcelain --untracked-files=no)" ]; then
    echo "⚠ $r ($branch): modifications locales, pull ignoré (fetch seulement)"
    git -C "$r" fetch --prune --quiet || fail=1
    continue
  fi
  echo "⟳ $r ($branch): pull --ff-only"
  git -C "$r" pull --ff-only --prune || { echo "✗ $r: pull impossible (branche sans upstream ou divergente)"; fail=1; }
done
exit $fail
