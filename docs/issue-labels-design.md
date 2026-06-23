# Issue Labels Design

Label taxonomy for `Rel1cx/eslint-react` issues and pull requests.

## Design Principles

1. **Lowercase + kebab-case + colon categories** — Aligns with Next.js, React, and Visual Studio Code conventions.
2. **Color semantics by category** — Similar categories share similar hues.
3. **De-state-machine** — Issue closure means resolution. Release tracking is handled by **Milestones**, not labels.
4. **Four-dimensional coverage** — Every open issue should be classifiable by `type` × `area` × `status` × `priority`.

## Label Catalog

### `type:` — Nature of the issue

| Label                | Color     | Description                              |
| -------------------- | --------- | ---------------------------------------- |
| `type: bug`          | `#D73A4A` | Something isn't working                  |
| `type: feature`      | `#A2EEEF` | New feature or enhancement               |
| `type: new-rule`     | `#FEF2C0` | Introduce a new ESLint rule              |
| `type: docs`         | `#0075CA` | Improvements to documentation            |
| `type: refactor`     | `#BFDADC` | Code refactoring without behavior change |
| `type: upstream`     | `#F9D0C4` | Caused by or waiting on upstream         |
| `type: dependencies` | `#0366D6` | Dependency updates                       |

`type: feature` merges the old `Type: Feature`, `Type: Enhancement`, `Type: New Plugin`, and `Type: New Recipe` labels. `type: new-rule` is kept standalone because it is the most frequent request type.

### `area:` — Scope / affected package

| Label             | Color     | Description                      |
| ----------------- | --------- | -------------------------------- |
| `area: react-x`   | `#5319E7` | Rules in eslint-plugin-react-x   |
| `area: react-dom` | `#6E49CB` | Rules in eslint-plugin-react-dom |
| `area: react-jsx` | `#1D76DB` | Rules in eslint-plugin-react-jsx |
| `area: core`      | `#0052CC` | Core / shared utilities          |
| `area: compiler`  | `#C5DEF5` | React Compiler SPEC alignment    |
| `area: website`   | `#B4E9FF` | Documentation website            |

### `status:` — Maintainer workflow state

| Label                    | Color     | Description                              |
| ------------------------ | --------- | ---------------------------------------- |
| `status: triage`         | `#5319E7` | Needs initial review / classification    |
| `status: accepted`       | `#0E8A16` | Accepted, waiting for implementation     |
| `status: in-progress`    | `#FFA500` | Currently being worked on                |
| `status: blocked`        | `#B60205` | Blocked by dependency or external factor |
| `status: waiting-author` | `#959DA5` | Waiting for reply from the issue author  |

The old `Status: *` family is condensed: `Status: Released` and `Status: Resolved` move to Milestones; `Status: On Hold` and `Status: Awaiting Response` merge into `status: blocked` and `status: waiting-author`; `Status: Help Wanted` becomes `pr welcome` under `special:`.

### `priority:` — Urgency

| Label                | Color     | Description                          |
| -------------------- | --------- | ------------------------------------ |
| `priority: critical` | `#B60205` | Regression or crash; fix immediately |
| `priority: high`     | `#D93F0B` | Major impact; schedule next release  |
| `priority: medium`   | `#FBCA04` | Normal priority                      |
| `priority: low`      | `#0E8A16` | Nice to have                         |

### `special:` — One-off markers

| Label              | Color     | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `good first issue` | `#7057FF` | Good for newcomers                 |
| `pr welcome`       | `#2E8B57` | Community contributions welcome    |
| `breaking change`  | `#FF0000` | Breaking change for next major     |
| `duplicate`        | `#CCCCCC` | Duplicate of existing issue        |
| `wontfix`          | `#FFFFFF` | Out of scope or won't be addressed |

`pr welcome` merges `PR Welcome` and `Status: Help Wanted`. Version-specific labels like `React 19` are removed in favor of issue titles, bodies, or Milestones.

## Label Application Decision Tree

When triaging an open issue:

```
1. What is the nature?          → type: (required)
2. Which package does it hit?   → area: (required)
3. How urgent is it?            → priority: (required)
4. What is the workflow state?  → status: (required while open)
5. Any special markers?         → special: (optional)
```

When closing an issue:

```
1. Remove all status: labels
2. If duplicate → add duplicate, reference the original issue
3. If out of scope → add wontfix with an explanatory comment
4. Mark the fix version via Milestone (not a label)
```

## Migration Mapping

| Old Label                   | New Label                |
| --------------------------- | ------------------------ |
| `Type: Bug`                 | `type: bug`              |
| `Type: Enhancement`         | `type: feature`          |
| `Type: Feature`             | `type: feature`          |
| `Type: New Plugin`          | `type: feature`          |
| `Type: New Recipe`          | `type: feature`          |
| `Type: New Rule`            | `type: new-rule`         |
| `Type: Documentation`       | `type: docs`             |
| `Type: Refactor`            | `type: refactor`         |
| `Type: Upstream`            | `type: upstream`         |
| `Type: Dependencies`        | `type: dependencies`     |
| `dependencies`              | `type: dependencies`     |
| `Status: Triaging`          | `status: triage`         |
| `Status: Accepted`          | `status: accepted`       |
| `Status: In Progress`       | `status: in-progress`    |
| `Status: On Hold`           | `status: blocked`        |
| `Status: Awaiting Response` | `status: waiting-author` |
| `PR Welcome`                | `pr welcome`             |
| `Status: Help Wanted`       | `pr welcome`             |
| `Good First Issue`          | `good first issue`       |
| `Duplicate`                 | `duplicate`              |
| `Wontfix`                   | `wontfix`                |
