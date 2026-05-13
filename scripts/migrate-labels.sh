#!/usr/bin/env bash
#
# migrate-labels.sh — Bulk-create, migrate, and clean up GitHub issue labels
#                     for the eslint-react repository.
#
# Usage:
#   ./scripts/migrate-labels.sh create   # Create all new labels
#   ./scripts/migrate-labels.sh migrate  # Remap labels on open issues
#   ./scripts/migrate-labels.sh cleanup  # Delete obsolete old labels (interactive)
#
# Requirements: bash 4+ (for associative arrays), gh CLI, jq

set -euo pipefail

if [ "${BASH_VERSINFO[0]}" -lt 4 ]; then
  echo "Error: This script requires bash 4+ for associative array support." >&2
  echo "Current version: $BASH_VERSION" >&2
  exit 1
fi

REPO="Rel1cx/eslint-react"
GH_LABEL_LIMIT="100"
GH_ISSUE_LIMIT="500"

# ------------------------------------------------------------------------------
# Helper: ensure a label exists with the correct name, color, and description.
#
# GitHub labels are case-insensitive but case-preserving. If an old label
# exists with a different case (e.g. "Type: Bug" vs "type: bug"), we rename
# it in place so that all associated issues/PRs are updated automatically.
# ------------------------------------------------------------------------------
ensure_label() {
  local name="$1" color="$2" desc="$3"
  local output rc=0

  output=$(gh label create -R "$REPO" "$name" --color "$color" --description "$desc" 2>&1) || rc=$?

  if [ $rc -eq 0 ]; then
    echo "  [ok] Created label '$name'"
    return 0
  fi

  # Handle case-insensitive duplicates: rename the existing label in place.
  if grep -qi "already exists" <<< "$output"; then
    local all_labels existing_name
    all_labels=$(gh label list -R "$REPO" --json name --limit "$GH_LABEL_LIMIT")
    # -F = fixed string, -x = whole line, -i = case-insensitive
    existing_name=$(echo "$all_labels" | jq -r '.[].name' | grep -Fxi "$name" | head -n1)

    if [ -n "$existing_name" ] && [ "$existing_name" != "$name" ]; then
      echo "  [rename] '$existing_name' → '$name'"
      gh label edit -R "$REPO" "$existing_name" --name "$name" --color "$color" --description "$desc"
      echo "  [ok] Renamed and updated '$name'"
    elif [ -n "$existing_name" ]; then
      echo "  [skip] Label '$name' already exists"
    else
      echo "  [skip] Label '$name' already exists (could not locate existing name)"
    fi
    return 0
  fi

  echo "  [fail] $output" >&2
  return 1
}

# ------------------------------------------------------------------------------
# Command: create — Bulk-create the new label taxonomy
# ------------------------------------------------------------------------------
cmd_create() {
  echo "Creating new labels on $REPO ..."

  # type:
  ensure_label "type: bug"           "D73A4A"  "Something isn't working"
  ensure_label "type: feature"       "A2EEEF"  "New feature or enhancement"
  ensure_label "type: new-rule"      "FEF2C0"  "Introduce a new ESLint rule"
  ensure_label "type: docs"          "0075CA"  "Improvements to documentation"
  ensure_label "type: refactor"      "BFDADC"  "Code refactoring without behavior change"
  ensure_label "type: upstream"      "F9D0C4"  "Caused by or waiting on upstream"
  ensure_label "type: dependencies"  "0366D6"  "Dependency updates"

  # area:
  ensure_label "area: react-x"   "5319E7"  "Rules in eslint-plugin-react-x"
  ensure_label "area: react-dom" "6E49CB"  "Rules in eslint-plugin-react-dom"
  ensure_label "area: react-jsx" "1D76DB"  "Rules in eslint-plugin-react-jsx"
  ensure_label "area: core"      "0052CC"  "Core / shared utilities"
  ensure_label "area: compiler"  "C5DEF5"  "React Compiler SPEC alignment"
  ensure_label "area: website"   "B4E9FF"  "Documentation website"

  # status:
  ensure_label "status: triage"         "5319E7"  "Needs initial review / classification"
  ensure_label "status: accepted"       "0E8A16"  "Accepted, waiting for implementation"
  ensure_label "status: in-progress"    "FFA500"  "Currently being worked on"
  ensure_label "status: blocked"        "B60205"  "Blocked by dependency or external factor"
  ensure_label "status: waiting-author" "959DA5"  "Waiting for reply from the issue author"

  # priority:
  ensure_label "priority: critical" "B60205"  "Regression or crash; fix immediately"
  ensure_label "priority: high"     "D93F0B"  "Major impact; schedule next release"
  ensure_label "priority: medium"   "FBCA04"  "Normal priority"
  ensure_label "priority: low"      "0E8A16"  "Nice to have"

  # special:
  ensure_label "good first issue"   "7057FF"  "Good for newcomers"
  ensure_label "pr welcome"         "2E8B57"  "Community contributions welcome"
  ensure_label "breaking change"    "FF0000"  "Breaking change for next major"
  ensure_label "duplicate"          "CCCCCC"  "Duplicate of existing issue"
  ensure_label "wontfix"            "FFFFFF"  "Out of scope or won't be addressed"

  echo "Done creating labels."
}

# ------------------------------------------------------------------------------
# Helper: verify that all target labels exist before migration
# ------------------------------------------------------------------------------
verify_labels_exist() {
  local -a required=(
    "type: bug" "type: feature" "type: new-rule" "type: docs"
    "type: refactor" "type: upstream" "type: dependencies"
    "area: react-x" "area: react-dom" "area: react-jsx" "area: core"
    "area: compiler" "area: website"
    "status: triage" "status: accepted" "status: in-progress"
    "status: blocked" "status: waiting-author"
    "priority: critical" "priority: high" "priority: medium" "priority: low"
    "good first issue" "pr welcome" "breaking change" "duplicate" "wontfix"
  )

  echo "Verifying that all target labels exist on $REPO ..."
  local -a missing=()
  local all_labels
  all_labels=$(gh label list -R "$REPO" --json name --limit "$GH_LABEL_LIMIT" | jq -r '.[].name')

  for lbl in "${required[@]}"; do
    if ! grep -qx "$lbl" <<< "$all_labels"; then
      missing+=("$lbl")
    fi
  done

  if [ ${#missing[@]} -gt 0 ]; then
    echo ""
    echo "Error: The following target labels are missing:" >&2
    for lbl in "${missing[@]}"; do
      echo "  - $lbl" >&2
    done
    echo "" >&2
    echo "Please run '$0 create' first to create all new labels." >&2
    exit 1
  fi

  echo "All target labels verified."
}

# ------------------------------------------------------------------------------
# Command: migrate — Rewrite labels on all open issues
# ------------------------------------------------------------------------------
cmd_migrate() {
  verify_labels_exist

  echo "Fetching open issues from $REPO ..."

  local tmpfile
  tmpfile=$(mktemp)

  # Use REST API instead of GraphQL (gh issue list) to avoid EOF errors
  # on large or complex queries. --paginate handles multi-page results.
  # NOTE: GitHub's /issues endpoint includes PRs; we filter them out via jq.
  gh api "repos/$REPO/issues?state=open&per_page=100" --paginate | jq '[.[] | select(.pull_request | not)]' > "$tmpfile"

  local count
  count=$(jq 'length' "$tmpfile")
  echo "Found $count open issue(s). Starting migration ..."

  # Associative array: old_label -> new_label
  declare -A MAP=(
    ["Type: Bug"]="type: bug"
    ["Type: Enhancement"]="type: feature"
    ["Type: Feature"]="type: feature"
    ["Type: New Plugin"]="type: feature"
    ["Type: New Recipe"]="type: feature"
    ["Type: New Rule"]="type: new-rule"
    ["Type: Documentation"]="type: docs"
    ["Type: Refactor"]="type: refactor"
    ["Type: Upstream"]="type: upstream"
    ["Type: Dependencies"]="type: dependencies"
    ["dependencies"]="type: dependencies"
    ["Status: Triaging"]="status: triage"
    ["Status: Accepted"]="status: accepted"
    ["Status: In Progress"]="status: in-progress"
    ["Status: On Hold"]="status: blocked"
    ["Status: Awaiting Response"]="status: waiting-author"
    ["PR Welcome"]="pr welcome"
    ["Status: Help Wanted"]="pr welcome"
    ["Good First Issue"]="good first issue"
    ["Duplicate"]="duplicate"
    ["Wontfix"]="wontfix"
  )

  local migrated=0

  while IFS= read -r issue; do
    local number
    number=$(echo "$issue" | jq -r '.number')

    local labels_json
    labels_json=$(echo "$issue" | jq -c '.labels')

    local -a add_labels=()
    local -a remove_labels=()

    while IFS= read -r label_name; do
      if [[ -n "${MAP[$label_name]+x}" ]]; then
        add_labels+=("${MAP[$label_name]}")
        remove_labels+=("$label_name")
      fi
    done < <(echo "$labels_json" | jq -r '.[].name')

    if [ ${#add_labels[@]} -eq 0 ]; then
      continue
    fi

    echo "  Issue #$number: ${remove_labels[*]} → ${add_labels[*]}"

    # Build gh issue edit arguments
    local -a edit_args=()
    for lbl in "${add_labels[@]}"; do
      edit_args+=("--add-label" "$lbl")
    done
    for lbl in "${remove_labels[@]}"; do
      edit_args+=("--remove-label" "$lbl")
    done

    if gh issue edit -R "$REPO" "$number" "${edit_args[@]}" 2>/dev/null; then
      echo "    [ok] Updated"
      migrated=$((migrated + 1))
    else
      echo "    [fail] Update failed for issue #$number. Skipping." >&2
    fi
  done < <(jq -c '.[]' "$tmpfile")

  rm -f "$tmpfile"
  echo "Migration complete. $migrated issue(s) updated."
}

# ------------------------------------------------------------------------------
# Command: cleanup — Delete obsolete old labels (interactive)
# ------------------------------------------------------------------------------
cmd_cleanup() {
  local -a OLD_LABELS=(
    "Type: Bug"
    "Type: Enhancement"
    "Type: Feature"
    "Type: New Plugin"
    "Type: New Recipe"
    "Type: New Rule"
    "Type: Documentation"
    "Type: Refactor"
    "Type: Upstream"
    "Type: Dependencies"
    "dependencies"
    "Status: Triaging"
    "Status: Accepted"
    "Status: In Progress"
    "Status: On Hold"
    "Status: Awaiting Response"
    "Status: Help Wanted"
    "Status: Resolved"
    "PR Welcome"
    "Good First Issue"
    "Duplicate"
    "Wontfix"
    "javascript"
  )

  # Status: Released is intentionally excluded because it is attached to
  # ~154 closed issues. Removing it would rewrite history. Use Milestones
  # going forward and delete this label manually later if desired.

  echo "The following obsolete labels will be DELETED from $REPO:"
  for lbl in "${OLD_LABELS[@]}"; do
    echo "  - $lbl"
  done
  echo ""
  echo "NOTE: 'Status: Released' is preserved (154 closed issues)."
  echo "      Delete it manually after migrating release tracking to Milestones."
  echo ""
  if ! read -rp "Type 'delete' to confirm: " confirm; then
    echo ""
    echo "Aborted (EOF)."
    exit 0
  fi

  if [ "$confirm" != "delete" ]; then
    echo "Aborted."
    exit 0
  fi

  for lbl in "${OLD_LABELS[@]}"; do
    if gh label list -R "$REPO" --json name --limit "$GH_LABEL_LIMIT" | jq -r '.[].name' | grep -qx "$lbl"; then
      gh label delete -R "$REPO" "$lbl" --yes
      echo "  [deleted] $lbl"
    else
      echo "  [skip] $lbl does not exist"
    fi
  done

  echo "Cleanup complete."
}

# ------------------------------------------------------------------------------
# Main dispatcher
# ------------------------------------------------------------------------------
case "${1:-}" in
  create)
    cmd_create
    ;;
  migrate)
    cmd_migrate
    ;;
  cleanup)
    cmd_cleanup
    ;;
  *)
    echo "Usage: $0 {create|migrate|cleanup}"
    echo ""
    echo "  create   — Create the new label taxonomy on the repository"
    echo "  migrate  — Remap old labels to new ones on all open issues"
    echo "  cleanup  — Delete obsolete old labels (interactive confirmation)"
    exit 1
    ;;
esac
