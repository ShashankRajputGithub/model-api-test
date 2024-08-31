#!/usr/bin/env bash
set -e
npm test
node reporter.js
exec "$@"