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
        cd "$src_dir" && \
        git fetch --prune && \
        git branch --merged | grep -vE '(^\*|main|master|development)' | xargs -r git branch -d && \
        git remote prune origin && \
        $GIT_PULL && \
        $NPM_INSTALL && \
        cd "$INITIAL_DIR"
    else
        echo "Clonage du dépôt $repo_name..."
        git clone "$url" "$repo_dir" && \
        cd "$src_dir" && \
        git fetch --prune && \
        git branch --merged | grep -vE '(^\*|main|master|development)' | xargs -r git branch -d && \
        git remote prune origin && \
        $GIT_PULL && \
        $NPM_INSTALL && \
        cd "$INITIAL_DIR"
    fi
done
