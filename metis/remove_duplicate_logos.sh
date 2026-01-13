#!/usr/bin/env bash
set -euo pipefail

# Delete every PNG in TARGET_DIR that is byte-identical to 7V.png (keeps the reference file).
# Override TARGET_DIR via env if needed.
TARGET_DIR=${TARGET_DIR:-front-reservation/src/public/images/logos}
REFERENCE=%26T.png

ref_path="${TARGET_DIR}/${REFERENCE}"
if [[ ! -f "$ref_path" ]]; then
  echo "Reference file not found: $ref_path" >&2
  exit 1
fi

ref_hash=$(sha256sum "$ref_path" | awk '{print $1}')

echo "Reference hash: $ref_hash"

while IFS= read -r -d '' file; do
  hash=$(sha256sum "$file" | awk '{print $1}')
  if [[ "$hash" == "$ref_hash" ]]; then
    echo "Deleting duplicate: $file"
    rm "$file"
  fi
done < <(find "$TARGET_DIR" -type f -name '*.png' ! -name "$REFERENCE" -print0)

echo "Done."
