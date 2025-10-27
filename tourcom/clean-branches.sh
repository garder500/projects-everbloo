#!/bin/bash

# Configuration des répertoires
DIRECTORIES="./api-adhesion/src ./front-adhesion/src"
DIRECTORIES_MOBILE="./api-tourcom-mobile/src ./api-tourcom-users/src"

# Commandes communes
GIT_PULL="git pull origin development"
GIT_PULL_API="git pull origin dev"
NPM_INSTALL="npm install --legacy-peer-deps"
BUILD="npm run prebuild"

# Nettoyage des branches
echo "Nettoyage des branches..."
INITIAL_DIR=$(pwd)
for dir in $DIRECTORIES; do
    repo_dir=$(dirname $dir)
    repo_name=$(basename $repo_dir)
    if [[ $repo_name == api-adhesion ]]; then
        url="https://gitlab-oxidized.as51985.net/tourcom/${repo_name}.git"
    else
        url="https://gitlab-oxidized.as51985.net/tourcom/${repo_name}.git"
    fi
    echo "Traitement de $dir..."
    if [ -d "$repo_dir/.git" ]; then
        cd $dir && \
        git fetch --prune && \
        git branch --merged | grep -vE '(^\*|main|master|development)' | xargs -r git branch -d && \
        git remote prune origin && \
        $GIT_PULL && \
        $NPM_INSTALL && \
        cd $INITIAL_DIR
    else
        echo "Clonage du dépôt $repo_name..."
        git clone $url $repo_dir && \
        cd $dir && \
        git fetch --prune && \
        git branch --merged | grep -vE '(^\*|main|master|development)' | xargs -r git branch -d && \
        git remote prune origin && \
        $GIT_PULL && \
        $NPM_INSTALL && \
        cd $INITIAL_DIR
    fi
done
for dir in $DIRECTORIES_MOBILE; do
    repo_dir=$(dirname $dir)
    repo_name=$(basename $repo_dir)
    url="https://gitlab-oxidized.as51985.net/dev-adenis/${repo_name}.git"
    echo "Traitement de $dir..."
    if [ -d "$repo_dir/.git" ]; then
        cd $dir && \
        git fetch --prune && \
        git branch --merged | grep -vE '(^\*|main|master|development)' | xargs -r git branch -d && \
        git remote prune origin && \
        $GIT_PULL_API && \
        $NPM_INSTALL && \
        $BUILD && \
        cd $INITIAL_DIR
    else
        echo "Clonage du dépôt $repo_name..."
        git clone $url $repo_dir && \
        cd $dir && \
        git fetch --prune && \
        git branch --merged | grep -vE '(^\*|main|master|development)' | xargs -r git branch -d && \
        git remote prune origin && \
        $GIT_PULL_API && \
        $NPM_INSTALL && \
        $BUILD && \
        cd $INITIAL_DIR
    fi
done
