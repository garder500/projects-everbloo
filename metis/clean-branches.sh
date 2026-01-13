#!/bin/bash

# Configuration des répertoires
DIRECTORIES="api-aerial api-dashboard front-dashboard front-reservation"

# Commandes communes
GIT_PULL="git pull origin development"
NPM_INSTALL="npm install --legacy-peer-deps"

# Nettoyage des branches
echo "Nettoyage des branches..."
INITIAL_DIR=$(pwd)
for dir in $DIRECTORIES; do
    echo "Traitement de $dir..."
    repo_dir="$dir"
    src_dir="$dir/src"
    repo_name=$(basename "$repo_dir")
    url="git@gitlab.com:GroupeAdnenis/metis-connect/${repo_name}.git"

    if [ -d "$repo_dir/.git" ]; then
        echo "Mise à jour du dépôt existant dans $repo_dir"
    else
        echo "Clonage du dépôt $repo_name..."
        git clone "$url" "$repo_dir" || { echo "Echec du clonage de $repo_name"; continue; }
    fi

    # Toutes les commandes git sont exécutées à la racine du dépôt, jamais dans src/
    cd "$repo_dir" || { echo "Impossible d'accéder à $repo_dir"; cd "$INITIAL_DIR"; continue; }
    git fetch --prune && \
    git branch --merged | grep -vE '(^\*|main|master|development)' | xargs -r git branch -d && \
    git remote prune origin && \
    $GIT_PULL

    # L'installation des dépendances reste dans src/ si le package.json y est présent
    if [ -f "$src_dir/package.json" ]; then
        cd "$src_dir" && $NPM_INSTALL && cd "$repo_dir"
    elif [ -f "$repo_dir/package.json" ]; then
        $NPM_INSTALL
    else
        echo "Aucun package.json trouvé pour $repo_name, npm install ignoré"
    fi

    cd "$INITIAL_DIR"
done
