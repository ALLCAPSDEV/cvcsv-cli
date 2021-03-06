#!/bin/bash

git fetch --prune --unshallow
git config --local user.email "matt@mattriley.me"
git config --local user.name "Matt Riley"
git checkout master

if [[ ! -z $(git diff origin/develop) ]]; then
    git merge develop
    npm ci --silent
    npm run release
    git remote set-url origin https://${GITHUB_ACTOR}:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
    git push --follow-tags origin master
    git checkout -b "release/$(npm view . version)"
    git push origin "release/$(npm view . version)"
    exit 0
else
    exit 1
fi
