# Issue Labels Design

This document defines the issue and pull request label system for `Rel1cx/eslint-react`. It replaces the previous ad-hoc label set with a consistent, four-dimensional taxonomy that scales with the project's monorepo structure and React Compiler alignment goals.

## Design Principles

1. **Lowercase + kebab-case + colon categories** — Aligns with Next.js, React, and Visual Studio Code conventions.
2. **Color semantics by category** — Similar categories share similar hues; conflicting colors are eliminated.
3. **De-state-machine** — Issue closure means resolution. `released` is handled by **Milestones**, not labels.
4. **Four-dimensional coverage** — Every open issue should be classifiable by `type` × `area` × `status` × `priority`.

---

## Label Catalog

### 🔴 `type:` — Nature of the issue (warm colors)

| Label                | Color     | Description                              |
| -------------------- | --------- | ---------------------------------------- |
| `type: bug`          | `#D73A4A` | Something isn't working                  |
| `type: feature`      | `#A2EEEF` | New feature or enhancement               |
| `type: new-rule`     | `#FEF2C0` | Introduce a new ESLint rule              |
| `type: docs`         | `#0075CA` | Improvements to documentation            |
| `type: refactor`     | `#BFDADC` | Code refactoring without behavior change |
| `type: upstream`     | `#F9D0C4` | Caused by or waiting on upstream         |
| `type: dependencies` | `#0366D6` | Dependency updates                       |

**Rationale**

- `type: feature` merges the old `Type: Feature`, `Type: Enhancement`, `Type: New Plugin`, and `Type: New Recipe` labels, which were overlapping in practice.
- `type: new-rule` is kept standalone because it is the most frequent request type (39 closed issues) and deserves quick filtering.
- `type: dependencies` replaces both `Type: Dependencies` and the lowercase `dependencies` duplicate.

---

### 🔵 `area:` — Scope / affected package (cool colors)

| Label             | Color     | Description                      |
| ----------------- | --------- | -------------------------------- |
| `area: react-x`   | `#5319E7` | Rules in eslint-plugin-react-x   |
| `area: react-dom` | `#6E49CB` | Rules in eslint-plugin-react-dom |
| `area: react-jsx` | `#1D76DB` | Rules in eslint-plugin-react-jsx |
| `area: core`      | `#0052CC` | Core / shared utilities          |
| `area: compiler`  | `#C5DEF5` | React Compiler SPEC alignment    |
| `area: website`   | `#B4E9FF` | Documentation website            |

**Rationale**

- The monorepo has no easy way to know which plugin an issue touches from the title alone. `area:` labels let maintainers route work to the right code owner.
- `area: compiler` is added specifically for the ongoing React Compiler SPEC alignment effort documented in `*.spec.diff.md` files.

---

### 🟡 `status:` — Maintainer workflow state (traffic-light semantics)

| Label                    | Color     | Description                              |
| ------------------------ | --------- | ---------------------------------------- |
| `status: triage`         | `#5319E7` | Needs initial review / classification    |
| `status: accepted`       | `#0E8A16` | Accepted, waiting for implementation     |
| `status: in-progress`    | `#FFA500` | Currently being worked on                |
| `status: blocked`        | `#B60205` | Blocked by dependency or external factor |
| `status: waiting-author` | `#959DA5` | Waiting for reply from the issue author  |

**Rationale**

- The old `Status: *` family had 8 labels, but `Status: Released` (154 uses) and `Status: Resolved` (1 use) revealed a skewed workflow. `released` is now a Milestone concern.
- `Status: On Hold` (0 uses) and `Status: Awaiting Response` (0 uses) are merged into `status: blocked` and `status: waiting-author`.
- `Status: Help Wanted` is retired in favor of `pr welcome` under **special**.

---

### 🟠 `priority:` — Urgency (new dimension)

| Label                | Color     | Description                          |
| -------------------- | --------- | ------------------------------------ |
| `priority: critical` | `#B60205` | Regression or crash; fix immediately |
| `priority: high`     | `#D93F0B` | Major impact; schedule next release  |
| `priority: medium`   | `#FBCA04` | Normal priority                      |
| `priority: low`      | `#0E8A16` | Nice to have                         |

**Rationale**

- The previous system had no priority dimension. With 21 open issues and growing, maintainers need a quick way to decide whether an issue belongs in the next patch or the next minor.

---

### ⚪ `special:` — One-off markers (high contrast)

| Label              | Color     | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `good first issue` | `#7057FF` | Good for newcomers                 |
| `pr welcome`       | `#2E8B57` | Community contributions welcome    |
| `breaking change`  | `#FF0000` | Breaking change for next major     |
| `duplicate`        | `#CCCCCC` | Duplicate of existing issue        |
| `wontfix`          | `#FFFFFF` | Out of scope or won't be addressed |

**Rationale**

- `pr welcome` merges `PR Welcome` and `Status: Help Wanted`.
- `breaking change` is new and required for semver planning.
- `React 19` is removed — version-specific tracking belongs in the issue title, body, or a Milestone, not a label that becomes obsolete on the next React release.

---

## Label Application Decision Tree

When triaging an open issue, apply labels in this order:

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

---

## Migration Strategy

### Phase 1: Create / rename labels (zero risk)

Run `scripts/migrate-labels.sh create` to ensure all labels listed above exist with the correct name, color, and description.

> **Important: GitHub labels are case-insensitive but case-preserving.**
> If an old label such as `Type: Bug` already exists, you cannot create a separate `type: bug`.
> The migration script handles this automatically: it detects the case-insensitive collision
> and uses `gh label edit --name` to rename the existing label in place.
> All associated issues and pull requests (including closed ones) are updated automatically.

### Phase 2: Remap open issues (immediate value)

Run `scripts/migrate-labels.sh migrate` to rewrite labels on the current open issue backlog. The script maps old labels to new ones using the table below, then removes the old labels from each issue.

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

### Phase 3: Update automation configs

Dependabot / Renovate currently adds `Type: Dependencies` to pull requests. Update `.github/dependabot.yml` (or Renovate config) to emit `type: dependencies` instead.

### Phase 4: Retire old labels (optional, after validation)

Run `scripts/migrate-labels.sh cleanup` to delete obsolete labels. The script asks for confirmation before destructive operations.

> **Note on `Status: Released`**\
> This label is attached to **154** closed issues. Rather than rewriting history, the cleanup script skips it by default. New workflow should use **Milestones** for release tracking; the label can be deleted later if desired.

---

## Appendix: Color Palette Rationale

| Category    | Hue                           | Rationale                                       |
| ----------- | ----------------------------- | ----------------------------------------------- |
| `type:`     | Red / warm                    | Stops the eye; the first thing you need to know |
| `area:`     | Blue / purple                 | Cool, technical; second-order classification    |
| `status:`   | Yellow / green / red          | Traffic-light semantics for workflow state      |
| `priority:` | Red / orange / yellow / green | Urgency gradient                                |
| `special:`  | High contrast                 | Must be instantly recognizable at a glance      |
