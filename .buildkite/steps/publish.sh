#!/bin/bash

set -euo pipefail

mkdir ~/.ssh
echo -e "Host github.com\n\tStrictHostKeyChecking no\n" > ~/.ssh/config

yarn build && \
yarn semantic-release

echo "Publish complete"
