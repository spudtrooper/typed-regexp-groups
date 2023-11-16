#!/bin/sh

scripts=$(dirname "$0")
root=$(realpath "$scripts/..")

pushd $root
yarn build && node dist/cli/index.js
popd
