#!/usr/bin/env bash

# exit on error
set -o errexit

yarn
./node_modules/.bin/tsc
yarn build
yarn typeorm migration:run -d dist/data-source
