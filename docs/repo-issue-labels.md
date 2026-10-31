# Repo Issue Labels

Label taxonomy for `Rel1cx/eslint-react` issues and pull requests.

## Principles

- Use lowercase, kebab-case, and colon-separated categories. Keep GitHub's default names for `special` markers.
- Give every label a unique color, using similar hues for related categories.
- Classify open issues with `type:` and `status:`; add `special:` markers when needed.
- Closing an issue means resolution. Use **Milestones**, not labels, for urgency and release tracking.

## Label Catalog

### `type:` — Nature of the issue

| Label            | Color     | Description                                      |
| ---------------- | --------- | ------------------------------------------------ |
| `type: bug`      | `#D73A4A` | Something isn't working                          |
| `type: feature`  | `#A2EEEF` | New feature or enhancement (including new rules) |
| `type: docs`     | `#0075CA` | Documentation improvements                       |
| `type: refactor` | `#BFDADC` | Refactoring without behavior changes             |
| `type: upstream` | `#F9D0C4` | Caused by or waiting on upstream                 |
| `type: meta`     | `#EDEDED` | Repository process, tooling, or governance       |

### `status:` — Maintainer workflow state

| Label                 | Color     | Description                              |
| --------------------- | --------- | ---------------------------------------- |
| `status: triage`      | `#FBCA04` | Needs initial review                     |
| `status: in-progress` | `#FFA500` | Currently being worked on                |
| `status: blocked`     | `#B60205` | Blocked by dependency or external factor |

Removing `status: triage` implies acceptance.

### `special:` — One-off markers

| Label              | Color     | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `good first issue` | `#7057FF` | Good for newcomers                 |
| `pr welcome`       | `#2E8B57` | Community contributions welcome    |
| `breaking change`  | `#FF0000` | Breaking change for next major     |
| `duplicate`        | `#CCCCCC` | Duplicate of existing issue        |
| `wontfix`          | `#FFFFFF` | Out of scope or won't be addressed |

## Workflow

When triaging, add the required `type:` and `status:` labels, plus any applicable `special:` markers.

When closing an issue:

1. Remove all `status:` labels.
2. For duplicates, add `duplicate` and reference the original issue. For out-of-scope issues, add `wontfix` with an explanation.
3. Record the fix version in a Milestone.

## Other Labels

Dependabot adds `dependencies` and `github_actions` to its own PRs. These labels and `javascript` are outside this taxonomy.
