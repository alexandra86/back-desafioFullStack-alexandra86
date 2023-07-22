#!/usr/bin/env bash
export PATH=./node_modules/.bin:$PATH

# exit on error
set -o errexit

yarn
yarn build
yarn typeorm migration:run -d dist/data-source