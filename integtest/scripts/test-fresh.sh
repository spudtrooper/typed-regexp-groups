#!/bin/sh

set -e

root=$(pwd)

get_version() {
  local package_json_file=$root/node_modules/typed-regexp-groups/package.json
  local version=$(cat $package_json_file | jq -r '.version')
  echo $version
}

before_version=$(get_version)
rm -rf node_modules
yarn install
after_version=$(get_version)
yarn jest

echo "before_version: $before_version"
echo "after_version: $after_version"