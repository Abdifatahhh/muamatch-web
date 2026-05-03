#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DEFAULT_USER="Abdifatahhh"
printf 'GitHub username [%s]: ' "$DEFAULT_USER"
read -r GH_USER
GH_USER="${GH_USER:-$DEFAULT_USER}"

read -rs -p "Paste Personal Access Token (hidden, then Enter): " GH_TOKEN
echo ""

if [[ -z "${GH_TOKEN}" ]]; then
  echo "Geen token ingevoerd." >&2
  exit 1
fi

CLEAN_URL="https://github.com/Abdifatahhh/muamatch-web.git"
TMP_URL="https://${GH_USER}:${GH_TOKEN}@github.com/Abdifatahhh/muamatch-web.git"

restore_remote() {
  git remote set-url origin "$CLEAN_URL"
}

trap restore_remote EXIT

git remote set-url origin "$TMP_URL"
git push -u origin main

trap - EXIT
restore_remote

echo ""
echo "Klaar: main staat op GitHub. Remote-URL is weer zonder token."
