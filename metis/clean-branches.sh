#!/usr/bin/env bash

set -o pipefail

# Configuration des répertoires
DIRECTORIES="api-aerial api-dashboard api-car api-hotel api-rail front-dashboard front-reservation"

# Commandes communes
GIT_PULL="git pull origin development"
NPM_INSTALL="npm install --legacy-peer-deps"

# Nettoyage des branches
echo "Nettoyage des branches..."
for dir in $DIRECTORIES; do
    echo "Traitement de $dir..."
    repo_dir="$dir"
    repo_name=$(basename "$repo_dir")
    url="git@gitlab.com:GroupeAdnenis/metis-connect/${repo_name}.git"

    if [ -e "$repo_dir/.git" ]; then
        echo "Mise à jour du dépôt existant dans $repo_dir"
    else
        echo "Clonage du dépôt $repo_name..."
        git clone "$url" "$repo_dir" || { echo "Echec du clonage de $repo_name"; continue; }
    fi

    if ! git -C "$repo_dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        echo "$repo_dir n'est pas un dépôt Git valide, ignoré"
        continue
    fi

    if [ -n "$(git -C "$repo_dir" status --porcelain)" ]; then
        echo "Dépôt $repo_name contient des modifications locales, ignoré par sécurité"
        continue
    fi

    # Toutes les commandes git sont exécutées à la racine du dépôt, jamais dans src/
    if ! git -C "$repo_dir" fetch --prune; then
        echo "Échec de la récupération des mises à jour pour $repo_name"
        continue
    fi

    git -C "$repo_dir" branch --merged \
        | grep -vE '(^\*|main|master|development)' \
        | xargs -r git -C "$repo_dir" branch -d
    git -C "$repo_dir" remote prune origin
    if ! (cd "$repo_dir" && $GIT_PULL); then
        echo "Échec de la mise à jour de $repo_name"
        continue
    fi

    # L'installation des dépendances reste dans src/ si le package.json y est présent
    if [ -f "src/package.json" ]; then
        (cd src && $NPM_INSTALL)
    elif [ -f "package.json" ]; then
        $NPM_INSTALL
    else
        echo "Aucun package.json trouvé pour $repo_name, npm install ignoré"
    fi

done
