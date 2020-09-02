#!/bin/bash

git fetch --prune --unshallow
git config --local user.email "matt@mattriley.me"
git config --local user.name "Matt Riley"
git checkout develop
CURRENT_PACKAGE_VERSION="$(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')"
echo "Checking branch against previous release branch - $(npm view . version)"
if [[ ! -z $(git diff origin/release/$(npm view . version)) ]]; then
  echo "Installing deps"
  npm ci --silent
  echo "Running release script"
  npm run release -- --prerelease beta
  NEW_PACKAGE_VERSION="$(grep -m1 version | awk -F: '{print $2}' | sed 's/[, ]//g')"
  echo "checking out release branch - $NEW_PACKAGE_VERSION"
  git checkout -b "release/$NEW_PACKAGE_VERSION"
  git remote set-url origin https://${GITHUB_ACTOR}:${GH_TOKEN}@github.com/${GITHUB_REPOSITORY}.git
  git push --follow-tags origin "release/$NEW_PACKAGE_VERSION"
  echo "Publishing version $NEW_PACKAGE_VERSION"
  npm publish --tag beta
  exit 0
else
  exit 1
fi
