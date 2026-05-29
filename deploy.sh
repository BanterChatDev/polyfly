#!/usr/bin/env bash
set -euo pipefail

latest="$(git tag --list 'v*' --sort=-v:refname | head -n1)"
if [ -z "$latest" ]; then
  next="v0.1.0"
else
  IFS='.' read -r major minor patch <<< "${latest#v}"
  patch=$((patch + 1))
  next="v${major}.${minor}.${patch}"
fi

echo "Current tag: ${latest:-none}  ->  new tag: ${next}"
read -r -p "Commit message: " msg
if [ -z "$msg" ]; then
  echo "Aborted: empty commit message." >&2
  exit 1
fi

git add -A
git commit -m "$msg"
git tag "$next"
git push
git push origin "$next"
echo "Deployed ${next}"