#!/bin/bash

set -euo pipefail

mkdir ~/.ssh
echo -e "Host github.com\n\tStrictHostKeyChecking no\n" > ~/.ssh/config

git config user.email "development.team@seedrs.com"
git config user.name "seedrs.bot"

git checkout fix-pipline-publish-step

yarn build && \
yarn semantic-release

echo "Publish complete"
