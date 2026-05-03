#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
PORT="${VERIFY_PORT:-39876}"

npm run build
npm run start -- -p "$PORT" >/tmp/mua-verify-start.log 2>&1 &
PID=$!

cleanup() {
  kill "$PID" 2>/dev/null || true
}
trap cleanup EXIT

sleep 4

fail() {
  echo "verify-site: FAILED ($1)"
  tail -40 /tmp/mua-verify-start.log || true
  exit 1
}

code_en=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/en") || fail "curl /en"
[[ "$code_en" == "200" ]] || fail "/en HTTP $code_en"

code_nl=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/nl") || fail "curl /nl"
[[ "$code_nl" == "200" ]] || fail "/nl HTTP $code_nl"

code_root=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/") || fail "curl /"
[[ "$code_root" == "307" ]] || fail "/ HTTP $code_root (expected 307)"

for path in termsconditions privacypolicy cookiemessage; do
  c_en=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/en/${path}") || fail "curl /en/${path}"
  [[ "$c_en" == "200" ]] || fail "/en/${path} HTTP $c_en"
  c_nl=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/nl/${path}") || fail "curl /nl/${path}"
  [[ "$c_nl" == "200" ]] || fail "/nl/${path} HTTP $c_nl"
done

echo "verify-site: OK (/en $code_en, /nl $code_nl, / -> $code_root, legal pages 200)"
