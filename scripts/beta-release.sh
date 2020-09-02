#!/bin/bash

git fetch --prune --unshallow
git config --local user.email "matt@mattriley.me"
git config --local user.name "Matt Riley"
git checkout develop
echo "Checking branch against previous release branch - $(npm view . version)"
if [[ ! -z $(git diff origin/release/$(npm view . version)) ]]; then
  echo "Installing deps"
  npm ci --silent
  echo "Running release script"
  npm run release -- --prerelease beta
  echo "checking out release branch - $(npm view . version)"
  git checkout -b "release/$(npm view . version)"
  git remote set-url origin https://${GITHUB_ACTOR}:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
  git push --follow-tags origin "release/$(npm view . version)"
  exit 0
else
  exit 1
fi
