#!/bin/bash

pnpm docs:readme
git add -f ../README.md
git commit --amend --no-edit --no-verify
