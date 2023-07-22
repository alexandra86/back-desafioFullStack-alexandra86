#!/usr/bin/env bash

# exit on error
set -o errexit

yarn global add typescript
yarn
yarn build
yarn typeorm migration:run -d dist/data-source
