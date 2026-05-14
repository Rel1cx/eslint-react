# Vendored Repositories

This document describes how this project uses **git subtrees** to vendor external source code (specifically `facebook/react`) into the monorepo under `.repos/`. The approach is inspired by [Effect's "One Weird Git Trick"](https://effect.website/blog/the-one-weird-git-trick-that-makes-coding-agents-more-effect-ive/).

---

## Why We Vendor Source Code

Coding agents are substantially more effective when they can read and explore **real library source code** rather than relying on documentation written for humans or fragmented web snippets.

- `node_modules` code is often compiled or flattened, losing the structure that makes it useful to read.
- Most coding agents are de-optimized from exploring `node_modules` or other git-ignored directories.
- Having the original source available locally allows agents to follow usage patterns, trace abstractions, and learn idiomatic patterns directly from the upstream codebase.

We use `git subtree` (not `git submodule`) because subtrees behave like normal directories once created—no extra initialization step, no `.gitmodules` metadata, and no indirection.

---

## Directory Layout

```
.
├── .repos/
│   └── react/          # facebook/react vendored via git subtree
├── docs/
├── packages/
├── plugins/
└── ...
```

All vendored repositories live under `.repos/`. This makes it easy to:

1. Exclude them from toolchains with a single glob (`.repos/**`).
2. Point agents to `.repos/<name>/` as a reference library.

---

## Typical Workflow

### Adding a Subtree

We use `--squash` to avoid pulling thousands of upstream commits into our own history, and `--depth=1` to minimize the initial fetch size.

```bash
# 1. Shallow fetch first
git fetch --depth=1 https://github.com/facebook/react.git main

# 2. Add as subtree
git subtree add \
  --prefix=.repos/react \
  https://github.com/facebook/react.git \
  main \
  --squash
```

### Updating a Subtree

```bash
# 1. Shallow fetch the latest upstream
git fetch --depth=1 https://github.com/facebook/react.git main

# 2. Pull changes into the subtree
git subtree pull \
  --prefix=.repos/react \
  https://github.com/facebook/react.git \
  main \
  --squash
```

Each update appears as a single squash commit, keeping history predictable and easy to review.

### Reverting the Subtree to Its Initial State

If you have committed changes to `.repos/react` and want to restore it to the state it was in when first added:

```bash
# Find the initial squash commit for the subtree
git log --all --oneline -- .repos/react | tail -1
# e.g. 1f73c9a881 Squashed '.repos/react/' content from commit ...

# Restore the directory to that exact state
git checkout <initial-squash-commit> -- .repos/react
git commit -m "revert: restore .repos/react to initial subtree state"
```

### Completely Removing a Subtree

```bash
# Hard reset to the commit just before the subtree was added
# (use git log to find the correct commit hash)
git reset --hard <commit-before-subtree>

# Or, if you want to keep later history but delete the directory:
git rm -rf .repos/react
git commit -m "remove: delete .repos/react subtree"
```

---

## Agent Guidelines

When working in this project, treat `.repos/` as **read-only reference material**:

- Use vendored repositories as reference when working with related libraries.
- Prefer examples and patterns from the vendored source code over generated guesses or web search results.
- **Do not edit** files under `.repos/` unless explicitly asked.
- **Do not import** from `.repos/` — application code should continue importing from normal package dependencies.
- When writing React-related code, inspect `.repos/react/` for examples of idiomatic usage, tests, module structure, and API design.

### Creating Pattern Files

You can ask the agent to create a small reference file for a particular data type or module from the vendored codebase. This gives the agent a project-local artifact it can reference later instead of rediscovering the same patterns repeatedly.

For example:

> Review the implementation, tests, and documentation for `useEffect` in `.repos/react`.
> Create a file at `agent-patterns/react-use-effect.md` that illustrates the most important patterns an agent should follow when writing effect logic in this project.

---

## Configuration Reference

The following files were modified to exclude `.repos/` from toolchains, editors, CI, and build systems.

### CI / GitHub Actions

| File | Change |
|------|--------|
| `.github/workflows/check.yml` | `actions/checkout` — added `sparse-checkout` to exclude `.repos/` |
| `.github/workflows/test.yml` | `actions/checkout` — added `sparse-checkout` to exclude `.repos/` |
| `.github/workflows/publish.yml` | `actions/checkout` — added `sparse-checkout` to exclude `.repos/` |
| `.github/workflows/check-provenance.yml` | `actions/checkout` — added `sparse-checkout` to exclude `.repos/` (on top of existing `fetch-depth: 0`) |

### Git Ignore

| File | Change |
|------|--------|
| `.gitignore` | Added `.repos/` |
| `.pkgs/configs/.gitignore` | Added `.repos/` |

### TypeScript

| File | Change |
|------|--------|
| `tsconfig.json` | `exclude` — added `".*"` (matches `.repos` and other dot-directories) |

### Lint & Format

| File | Change |
|------|--------|
| `eslint.config.ts` | `buildIgnoreConfig` `extra` array — added `".*/**"` |
| `dprint.json` | `excludes` — added `.repos/**` |
| `.pkgs/configs/tsl.config.ts` | `globSync` `ignore` option — added `".repos/**"` |

### Testing

| File | Change |
|------|--------|
| `vitest.config.ts` | `test.exclude` — changed from `**/react-main/**` to `".*/**"` |

### Package Management & Build

| File | Change |
|------|--------|
| `.tazerc.json` | `ignorePaths` — added `.repos` |
| `nx.json` | `namedInputs.default` — added `"!{workspaceRoot}/.repos/**"` |
| `package.json` | `lint:mdx` script — changed from `mdxlint **/*.mdx` to scoped `plugins/**/*.mdx && apps/**/*.mdx` |

### Editor Settings

| File | Change | Status |
|------|--------|--------|
| `.vscode/settings.json` | Created with `.repos/**` exclusions for search, watcher, and auto-imports | Removed in a later commit |

> **Note:** `.zed/settings.json` was also modified in the same commit, but only to add generic `file_scan_exclusions` (e.g. `.git`, `.DS_Store`). It does **not** contain `.repos`-specific rules.

---

## Trade-offs

Vendoring repositories increases the size of the project (`.repos/react` is ~55 MB / ~6,800 files) and adds a small maintenance burden to keep the subtree up to date.

However, the payoff in terms of improved output quality from coding agents when using external dependencies is well worth it—especially when humans are doing less of the actual hands-on coding.

---

## Quick Reference Cheat Sheet

```bash
# Update subtree
git fetch --depth=1 https://github.com/facebook/react.git main
git subtree pull --prefix=.repos/react https://github.com/facebook/react.git main --squash

# Restore to initial state
git log --all --oneline -- .repos/react | tail -1
git checkout <commit> -- .repos/react

# Find all vendored files
git log --all --oneline -- .repos/react
```
