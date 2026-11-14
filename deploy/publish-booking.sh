#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf '%s\n' \
    'Usage: bash deploy/publish-booking.sh [SSH_TARGET]' \
    'Default SSH target: hetznerCO' \
    'SSH_TARGET must be an existing SSH alias, hostname, or user@hostname.'
}

die() {
  printf 'Error: %s\n' "$*" >&2
  exit 1
}

if [[ $# -gt 1 ]]; then
  usage >&2
  exit 1
fi
if [[ "${1:-}" == '-h' || "${1:-}" == '--help' ]]; then
  usage
  exit 0
fi

readonly BOOKING_SSH_TARGET="${1:-hetznerCO}"
if [[ ! "$BOOKING_SSH_TARGET" =~ ^([A-Za-z0-9_][A-Za-z0-9_.-]*@)?[A-Za-z0-9][A-Za-z0-9_.-]*$ ]]; then
  die 'Invalid SSH target. Use an alias or user@hostname; configure ports in SSH config.'
fi

BOOKING_SCRIPT_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly BOOKING_SCRIPT_DIR
BOOKING_REPO_ROOT="$(cd "$BOOKING_SCRIPT_DIR/.." && pwd -P)"
readonly BOOKING_REPO_ROOT
readonly BOOKING_REMOTE_ROOT='/var/www/connorodea.com/html'
readonly BOOKING_PUBLIC_URL='https://connorodea.com/book'
readonly BOOKING_SCHEDULER_URL='https://calendly.com/connorodea/30min'
readonly BOOKING_SSH_COMMAND='ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15'

for tool in node npm ssh rsync curl mktemp; do
  command -v "$tool" >/dev/null 2>&1 || die "Required tool is missing: $tool"
done

node -e '
  const [major, minor] = process.versions.node.split(".").map(Number);
  if (major < 20 || (major === 20 && minor < 9)) {
    console.error(`Node.js 20.9 or newer is required; found ${process.versions.node}.`);
    process.exit(1);
  }
' || die 'Install a supported Node.js version before publishing.'

cd "$BOOKING_REPO_ROOT"
[[ -f package.json && -f package-lock.json ]] || die 'The repository root or lockfile is missing.'

printf '\nChecking existing SSH access and document root on %s...\n' "$BOOKING_SSH_TARGET"
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15 \
  "$BOOKING_SSH_TARGET" \
  "test -d '$BOOKING_REMOTE_ROOT' && test -w '$BOOKING_REMOTE_ROOT' && test -x '$BOOKING_REMOTE_ROOT'" \
  || die 'SSH access failed, or the existing document root is missing or not writable. Nothing was uploaded.'

printf '\nInstalling locked dependencies and building the complete site...\n'
npm ci || die 'Dependency installation failed. Nothing was uploaded.'
npm run build || die 'The site build failed. Nothing was uploaded.'

node - "$BOOKING_SCHEDULER_URL" <<'NODE'
const fs = require('node:fs');
const schedulerUrl = process.argv[2];
const homepage = fs.readFileSync('out/index.html', 'utf8');
const booking = fs.readFileSync('out/book/index.html', 'utf8');
for (const [name, html] of [['homepage', homepage], ['booking page', booking]]) {
  if (!/<!doctype html>/i.test(html) || !/<\/html>/i.test(html)) {
    throw new Error(`The exported ${name} is not a complete HTML document.`);
  }
}
if (!fs.statSync('out/_next').isDirectory()) throw new Error('Built assets are missing.');
if (!homepage.includes('href="/book/"')) throw new Error('The homepage booking link is missing.');
if (!booking.includes(`href="${schedulerUrl}"`)) throw new Error('The verified booking destination is missing.');
if (!booking.includes('href="https://connorodea.com/book/"')) throw new Error('The canonical booking URL is missing.');
console.log('Verified the complete export and booking destination.');
NODE

printf '\nUploading assets first...\n'
rsync --recursive --times --compress --delay-updates \
  --rsh="$BOOKING_SSH_COMMAND" \
  out/_next/ "$BOOKING_SSH_TARGET:$BOOKING_REMOTE_ROOT/_next/" \
  || die 'Asset upload failed. HTML upload was not started.'

printf '\nPublishing the complete static export...\n'
rsync --recursive --times --compress --delay-updates --exclude='/_next/' \
  --rsh="$BOOKING_SSH_COMMAND" \
  out/ "$BOOKING_SSH_TARGET:$BOOKING_REMOTE_ROOT/" \
  || die 'Site upload failed. Publishing was not verified; rerun after resolving the error.'

BOOKING_VERIFY_DIR="$(mktemp -d "${TMPDIR:-/tmp}/connorodea-booking.XXXXXX")"
readonly BOOKING_VERIFY_DIR
cleanup() {
  rm -rf "$BOOKING_VERIFY_DIR"
}
trap cleanup EXIT

printf '\nChecking the public booking page...\n'
curl --fail --silent --show-error --location --compressed \
  --proto '=https' --proto-redir '=https' \
  --header 'Cache-Control: no-cache' \
  --connect-timeout 15 --max-time 60 --retry 2 --retry-delay 2 \
  --output "$BOOKING_VERIFY_DIR/book.html" \
  --write-out '%{url_effective}\n%{http_code}\n' \
  "$BOOKING_PUBLIC_URL" > "$BOOKING_VERIFY_DIR/response.txt" \
  || die 'Upload finished, but the public booking page could not be verified.'

node - "$BOOKING_VERIFY_DIR" "$BOOKING_SCHEDULER_URL" <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const [directory, schedulerUrl] = process.argv.slice(2);
const [effectiveUrl, status] = fs.readFileSync(path.join(directory, 'response.txt'), 'utf8').trim().split('\n');
const url = new URL(effectiveUrl);
if (status !== '200' || !['https://connorodea.com/book', 'https://connorodea.com/book/'].includes(url.href)) {
  throw new Error(`Unexpected public response: ${status} ${effectiveUrl}`);
}
const published = fs.readFileSync(path.join(directory, 'book.html'));
const built = fs.readFileSync('out/book/index.html');
if (!published.equals(built)) throw new Error('The public page does not match the exported booking page.');
if (!published.toString('utf8').includes(`href="${schedulerUrl}"`)) {
  throw new Error('The public page does not contain the verified booking destination.');
}
console.log(`Verified HTTP 200 and the published booking page at ${effectiveUrl}`);
NODE

printf '\nPublished and verified: %s\n' "$BOOKING_PUBLIC_URL"
