#!/bin/sh

msg=${@:-update $(date)}

git add .
git commit -am "$msg"
if [[ $? -eq 0 ]]; then
  git push -u
fi
