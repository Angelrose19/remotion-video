#!/bin/bash
# Usage: ./render.sh <props-file.json> [output-name]
#
# Example:
#   ./render.sh props/export-tutorial.json export-tutorial

PROPS_FILE="${1:?Usage: ./render.sh <props-file.json> [output-name]}"
OUTPUT_NAME="${2:-tutorial-output}"

npx remotion render Tutorial \
  --props="$(cat "$PROPS_FILE")" \
  --output="out/${OUTPUT_NAME}.mp4" \
  --codec=h264
