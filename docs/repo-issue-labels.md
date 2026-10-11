# Repo Issue Labels

Label taxonomy for `Rel1cx/eslint-react` issues and pull requests.

## Design Principles

1. **Lowercase + kebab-case + colon categories** — Aligns with Next.js, React, and Visual Studio Code conventions. Exception: `special` markers keep GitHub's default names (spaces, no prefix) so they integrate with GitHub features like the "good first issue" newcomer surfacing.
2. **Color semantics by category** — Similar categories share similar hues; no two labels share the same color.
3. **De-state-machine** — Issue closure means resolution. Urgency and release tracking are handled by **Milestones**, not labels.
4. **Three-dimensional coverage** — Every open issue should be classifiable by `type` × `area` × `status` (`area` is optional for `type: meta`).

## Label Catalog

### `type:` — Nature of the issue

| Label            | Color     | Description                                      |
| ---------------- | --------- | ------------------------------------------------ |
| `type: bug`      | `#D73A4A` | Something isn't working                          |
| `type: feature`  | `#A2EEEF` | New feature or enhancement (including new rules) |
| `type: docs`     | `#0075CA` | Improvements to documentation                    |
| `type: refactor` | `#BFDADC` | Code refactoring without behavior change         |
| `type: upstream` | `#F9D0C4` | Caused by or waiting on upstream                 |
| `type: meta`     | `#EDEDED` | Repository process, tooling, or governance       |

### `area:` — Scope / affected package

| Label                           | Color     | Description                                    |
| ------------------------------- | --------- | ---------------------------------------------- |
| `area: react-x`                 | `#5319E7` | Rules in eslint-plugin-react-x                 |
| `area: react-jsx`               | `#1D76DB` | Rules in eslint-plugin-react-jsx               |
| `area: react-rsc`               | `#1F6FEB` | Rules in eslint-plugin-react-rsc               |
| `area: react-dom`               | `#6E49CB` | Rules in eslint-plugin-react-dom               |
| `area: react-web-api`           | `#0969DA` | Rules in eslint-plugin-react-web-api           |
| `area: react-naming-convention` | `#0550AE` | Rules in eslint-plugin-react-naming-convention |
| `area: react-debug`             | `#8250DF` | Rules in eslint-plugin-react-debug             |
| `area: website`                 | `#B4E9FF` | Documentation website                          |

Note: `area:` labels currently cover only a subset of the repo. There are no dedicated labels for the meta `eslint-plugin` or any `packages/*`; use the closest match until new labels are added.

### `status:` — Maintainer workflow state

| Label                 | Color     | Description                              |
| --------------------- | --------- | ---------------------------------------- |
| `status: triage`      | `#FBCA04` | Needs initial review / classification    |
| `status: in-progress` | `#FFA500` | Currently being worked on                |
| `status: blocked`     | `#B60205` | Blocked by dependency or external factor |

An issue that no longer carries `status: triage` is implicitly accepted.

### `special:` — One-off markers

| Label              | Color     | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `good first issue` | `#7057FF` | Good for newcomers                 |
| `pr welcome`       | `#2E8B57` | Community contributions welcome    |
| `breaking change`  | `#FF0000` | Breaking change for next major     |
| `duplicate`        | `#CCCCCC` | Duplicate of existing issue        |
| `wontfix`          | `#FFFFFF` | Out of scope or won't be addressed |

## Label Application Decision Tree

When triaging an open issue:

```
1. What is the nature?          → type: (required)
2. Which package does it hit?   → area: (required, except type: meta)
3. What is the workflow state?  → status: (required while open)
4. Any special markers?         → special: (optional)

Urgency and target release → Milestone, not a label.
```

When closing an issue:

```
1. Remove all status: labels
2. If duplicate → add duplicate, reference the original issue
3. If out of scope → add wontfix with an explanatory comment
4. Mark the fix version via Milestone (not a label)
```

## Notes

Dependabot applies its default labels (`dependencies`, `github_actions`) on its own PRs; these are not part of the curated taxonomy above. The repo also has a `javascript` label not covered by the taxonomy.
