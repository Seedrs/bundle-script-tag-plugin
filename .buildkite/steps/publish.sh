#!/bin/bash

set -euo pipefail

yarn build && \
yarn semantic-release

echo "Publish complete"
