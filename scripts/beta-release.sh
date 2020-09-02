#!/bin/bash

git fetch --prune --unshallow
git config --local user.email "matt@mattriley.me"
git config --local user.name "Matt Riley"
git checkout develop
if [[ ! -z $(git diff origin/release/$(npm view . version)) ]]; then
  git push origin --delete release/$(npm view . version)
  npm ci --silent
  npm run release -- --prerelease beta
  git checkout -b release/$(npm view . version)
  git remote set-url origin https://${GITHUB_ACTOR}:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
  git push --follow-tags origin release/$(npm view . version)
  exit 0
else
  exit 1
fi
