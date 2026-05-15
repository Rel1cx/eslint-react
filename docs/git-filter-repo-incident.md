# Incident Report: `git filter-repo` Signature Chain Break

## Summary

On 2026-05-15 we attempted to reduce the `.git` repository size by removing the vendored `.repos/react` subtree from Git history using `git filter-repo`. The operation **rewrote commit hashes** and inadvertently **invalidated GPG signatures for 7,032 commits** on the `main` branch. We immediately rolled back the force-push via GitHub's push event API, restoring the original signed history.

---

## Background

We had recently vendored `facebook/react` into the monorepo under `.repos/react` using `git subtree add --squash`.

- **`.git` size before vendoring:** ~170 MB  
- **`.git` size after vendoring:** ~228 MB  
- **`.repos/react` working tree:** ~31 MB (after cleanup)  

To reclaim the ~55 MB of blob objects introduced by the squash commit, we decided to run `git filter-repo --path .repos --invert-paths` on `main`, followed by re-adding the subtree and running cleanup again.

---

## What We Did

### 1. Ran `git filter-repo`

```bash
/tmp/git-filter-repo --path .repos --invert-paths --force
```

**Result:** `.git` shrank from **228 MB → 62 MB**. The tool reported:

```
New history written in 1.03 seconds; now repacking/cleaning...
```

### 2. Re-added the subtree

```bash
git fetch --depth=1 https://github.com/facebook/react.git main
git subtree add --prefix=.repos/react https://github.com/facebook/react.git main --squash
```

### 3. Force-pushed to `main`

```bash
git push --force --progress origin main
```

**Result:** Push succeeded, but GitHub reported:

```
remote: - Commits must have verified signatures.
remote:   Found 7032 violations
remote:
remote: - This branch must not contain merge commits.
remote:   Found 1 violation
```

---

## Root Cause

`git filter-repo` does not merely delete files—it **rewrites commit objects**. Every commit that touched `.repos/` (or had a descendant that did) received a new SHA-1 hash. GitHub's verified-signature check signs the **exact commit hash**; when the hash changes, the signature becomes cryptographically invalid.

Because `.repos/react` was added relatively early in the linear history, the rewrite propagated forward through **~7,000 subsequent commits**, destroying the entire signature chain.

Additionally, `git subtree add --squash` produced a **merge commit** (`5c5c00b00`), which violated the branch-protection rule "This branch must not contain merge commits."

---

## Rollback Procedure

### Step 1 — Identify the pre-force-push HEAD

Used GitHub's Events API to find the commit hash just before the force-push:

```bash
gh api repos/Rel1cx/eslint-react/events \
  --jq '.[] | select(.type=="PushEvent" and .payload.ref=="refs/heads/main") | {before: .payload.before, head: .payload.head}'
```

Output:

```json
{"before":"178e681729f80156f062e6a18fb51a194ce9c9ae",
 "head":"0af8529952ce150d2ec9cf61085b88be1b742afa"}
```

### Step 2 — Verify the old commit still existed locally

```bash
git cat-file -t 178e681729f80156f062e6a18fb51a194ce9c9ae
# → commit
```

`filter-repo` had rewritten history but had **not yet garbage-collected** the original objects, so the old HEAD was still reachable.

### Step 3 — Reset and force-push back

```bash
git reset --hard 178e681729f80156f062e6a18fb51a194ce9c9ae
git push --force --progress origin main
```

**Result:**

```
+ 0af852995...178e68172 main -> main (forced update)
```

### Step 4 — Verify restoration

| Metric | After `filter-repo` | After rollback |
|--------|--------------------|----------------|
| Unsigned violations | **7,032** | **30** (pre-existing) |
| `.git` size | 62 MB | 70 MB |
| Signature chain | Broken | Restored |

---

## Lessons Learned

1. **Never run `git filter-repo` on a protected branch that requires signed commits.** The tool rewrites commit hashes; signatures are bound to the original hashes and cannot survive.

2. **`git subtree add --squash` creates a merge commit.** If your branch protection forbids merge commits, use an alternative vendoring strategy or adjust branch rules first.

3. **Force-pushing `main` is a last resort.** It disrupts every collaborator, CI caches, and open PRs. Always exhaust other options first.

4. **GitHub's Push Events API is a reliable reflog.** When local reflogs are wiped (e.g., by `filter-repo`), the API retains the `before`/`head` pair for every push, enabling recovery.

---

## Safer Alternatives for Managing Vendored Code Size

| Approach | Impact on `.git` | Impact on signatures | Complexity |
|----------|-----------------|----------------------|------------|
| **Accept the bloat** | None | None | Zero |
| **Vendored branch** (`vendor/react`) | `main` stays lean | `main` signatures preserved | Medium |
| **Sparse-checkout in CI** | `main` stays lean | `main` signatures preserved | Low |
| **`git filter-repo` on `main`** | Shrinks `.git` | **Destroys signatures** | High risk |

### Recommended: Vendored Branch Strategy

1. Keep `main` free of vendored source code.
2. Maintain a separate branch (e.g., `vendor/react`) that holds the `git subtree`.
3. In `main`, add a script (e.g., `scripts/fetch-vendored.ts`) that clones or sparse-checkouts the vendored branch into `.repos/` locally.
4. Add `.repos/` to `.gitignore` on `main` so it is never committed.

This gives coding agents access to the source without polluting `main`'s history or signatures.

---

## Quick Reference

```bash
# Check whether a commit is still available locally
git cat-file -t <sha>

# Find the pre-force-push HEAD via GitHub API
gh api repos/<owner>/<repo>/events \
  --jq '.[] | select(.type=="PushEvent" and .payload.ref=="refs/heads/main") | .payload.before'

# Roll back main (destructive—use with extreme caution)
git reset --hard <old-head>
git push --force origin main
```

---

*Report compiled 2026-05-15. If you have questions about vendoring strategy or Git history rewriting, discuss in #internals before executing any destructive commands on `main`.*
