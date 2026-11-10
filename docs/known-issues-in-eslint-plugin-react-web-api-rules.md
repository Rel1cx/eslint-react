# Known Issues in eslint-plugin-react-web-api Rules

Reviewed 2026-11-02 against `main@df5da2a7f`; plugin `5.30.0-beta.22`, all 6 rules. Evidence comes from implementations, tests, docs, changelogs, and public issues/PRs. Thirteen temporary RuleTester cases confirmed the source-review findings and were removed after the run.

**10 findings: all current (6 medium, 4 low).** One directly related open GitHub bug: [#2072](https://github.com/Rel1cx/eslint-react/issues/2072) (name-based `fetch` matching, see WAPI-001). Each finding lists its affected rules and primary evidence.

## Current findings

### WAPI-001: Callees are matched by name only

- **Severity:** Medium
- **Rules:** `no-leaked-fetch`, `no-leaked-timeout`, `no-leaked-interval`, `no-leaked-event-listener`
- **Evidence:** [Open bug #2072](https://github.com/Rel1cx/eslint-react/issues/2072), [`no-leaked-fetch` source](../plugins/eslint-plugin-react-web-api/src/rules/no-leaked-fetch/no-leaked-fetch.ts), temporary RuleTester case (shadowed `setTimeout` parameter reported)
- **Finding:** `getCallKind` matches only the final callee name (`fetch`, `abort`, `setTimeout`, `addEventListener`, …) without checking the binding or receiver. Local functions, destructured parameters, and unrelated object methods with the same name are treated as the Web API: `function fetch() {}; fetch()` and `api.fetch(url)` inside an effect are reported by `no-leaked-fetch` (#2072), and a prop shadowing `setTimeout` is reported by `no-leaked-timeout` (RuleTester-confirmed). The observer rules are the exception: `isFromObserver` resolves the receiver to a `new XObserver(...)` before matching method names.

### WAPI-002: Timer clearing is accepted in the setup phase

- **Severity:** Medium
- **Rules:** `no-leaked-timeout`, `no-leaked-interval`
- **Evidence:** [`no-leaked-timeout` spec](../plugins/eslint-plugin-react-web-api/src/rules/no-leaked-timeout/no-leaked-timeout.spec.ts) (the valid case pairing a `clearTimeout` inside a click-handler defined in setup), temporary RuleTester case (conditional `clearTimeout` in setup with no cleanup returned is not reported)
- **Finding:** `cEntries` collect `clearTimeout`/`clearInterval` from anywhere inside an effect callback — setup or cleanup — and pair them file-globally with timers. `useEffect(() => { const id = setTimeout(cb, 1000); if (cond) clearTimeout(id); }, [])` is accepted even though the timer leaks when `cond` is false at unmount. The observer rules fixed the analogous problem in 5.24.7 (#2002) by requiring cleanup-phase disposal; the timer rules still lack that phase check.

### WAPI-003: Pairing is not scoped to the owning effect

- **Severity:** Medium
- **Rules:** `no-leaked-timeout`, `no-leaked-interval`, `no-leaked-fetch`, `no-leaked-event-listener`, `no-leaked-resize-observer`, `no-leaked-intersection-observer`
- **Evidence:** Rule sources, temporary RuleTester cases (shared outer variable cleared in a second effect's cleanup; cross-component `removeEventListener` pairing; `abort` in another effect's cleanup; observer `disconnect` in another effect's cleanup for both effect-created and ref-held instances — all unreported)
- **Finding:** Setup and cleanup entries are collected file-globally and paired by value equality alone. A timer started in one effect is satisfied by a `clearTimeout` in another effect's cleanup over a shared variable, a `fetch` is satisfied by an `abort` in a different effect's cleanup, an `addEventListener` in component A pairs with a `removeEventListener` in component B's cleanup (`isInverseEntry` accepts any direct cleanup-phase removal without comparing effects), and an observer created in one effect is satisfied by a `disconnect`/`unobserve` in any cleanup (`isInCleanupPhase` is not tied to the observer's effect). When the owning effect re-runs without the pairing effect re-running, the resource leaks while the rule stays silent. Only the event-listener indirect-teardown path compares effect identity (`aEffect !== rEffect` check); all direct cleanup paths and both observer rules match file-globally.

### WAPI-004: Identifier-reference and aliased effect setups are invisible

- **Severity:** Medium
- **Rules:** all 6 rules
- **Evidence:** [`no-leaked-timeout` spec](../plugins/eslint-plugin-react-web-api/src/rules/no-leaked-timeout/no-leaked-timeout.spec.ts) (valid case: "ignores calls inside a setup callback passed as an identifier reference"), [`isUseEffectSetupCallback`](../packages/core/src/hook.ts)
- **Finding:** Effect callbacks are recognized only when the inline function is passed directly to a call whose callee name matches `/^use\w*Effect$/`. `useEffect(setup, [])` with a named function reference is skipped entirely, and an aliased import (`import { useEffect as ue }`) is never matched because the callee name fails the regex — a false negative for every rule in the plugin. There is no `additionalEffectHooks` setting plumbed into these rules.

### WAPI-005: A `signal` option exempts a listener without checking `abort()`

- **Severity:** Medium
- **Rules:** `no-leaked-event-listener`
- **Evidence:** [`effect.ts`](../plugins/eslint-plugin-react-web-api/src/rules/no-leaked-event-listener/effect.ts) (`if (addEntry.signal != null) continue`), temporary RuleTester case (listener with `{ signal: controller.signal }` and no abort anywhere is unreported)
- **Finding:** Any statically recognized `signal` option suppresses both the inline-listener and missing-cleanup diagnostics, but the rule never verifies that the owning `AbortController` is aborted in the cleanup. `useEffect(() => { const c = new AbortController(); window.addEventListener("resize", h, { signal: c.signal }); }, [])` leaks the listener on unmount and is not reported. Signal support was added intentionally (#1282, #2001); the missing abort-side check is the remaining gap.

### WAPI-006: `fetch` signals outside a direct options property are rejected

- **Severity:** Medium
- **Rules:** `no-leaked-fetch`
- **Evidence:** [`no-leaked-fetch` source](../plugins/eslint-plugin-react-web-api/src/rules/no-leaked-fetch/no-leaked-fetch.ts) (`getFetchController` inspects only `arguments[1]`), temporary RuleTester cases
- **Finding:** Two false positives: `fetch(new Request(url, { signal: controller.signal }))` reports `expected-abort-controller` even though the Request carries the signal and `controller.abort()` is called in the cleanup; and `fetch(url, { signal: AbortSignal.timeout(5000) })` reports `expected-abort-controller` even though `AbortSignal.timeout()`/`AbortSignal.any()` manage their own lifecycle and need no cleanup.

### WAPI-007: Destructured `abort()` is not recognized as cleanup

- **Severity:** Low
- **Rules:** `no-leaked-fetch`
- **Evidence:** [`no-leaked-fetch` source](../plugins/eslint-plugin-react-web-api/src/rules/no-leaked-fetch/no-leaked-fetch.ts) (`getAbortController` requires a member-expression callee), temporary RuleTester case
- **Finding:** `const { abort } = controller; return () => abort();` reports `expected-abort-in-cleanup` because only `controller.abort()` member calls are collected. Bare `abort()` calls are silently dropped from `abortEntries`.

### WAPI-008: Observers created outside an effect or `useRef` are not tracked

- **Severity:** Medium
- **Rules:** `no-leaked-resize-observer`, `no-leaked-intersection-observer`
- **Evidence:** Rule sources (`NewExpression` visitor returns early unless inside an effect callback or a `useRef` initializer), temporary RuleTester case
- **Finding:** `const observer = new ResizeObserver(cb)` in the component body, an event handler, or module scope is ignored entirely: the instance is never registered, so later `observer.observe(el)` calls inside effects have no tracked observer to check against and produce no diagnostic — even though creating an observer per render in the component body is itself a leak. Only effect-callback creations and `useRef(new XObserver(...))` are analyzed.

### WAPI-009: Observer cleanup delegation resolves only bare identifier calls, one level deep

- **Severity:** Low
- **Rules:** `no-leaked-resize-observer`, `no-leaked-intersection-observer`
- **Evidence:** Rule sources (`cleanupCallees` records only bare identifier calls), temporary RuleTester case
- **Finding:** `return () => handlers.stop()` where `stop` is a method of a local object literal containing `observer.disconnect()` reports `expected-disconnect-or-unobserve-in-cleanup`, because member-expression callees are not resolved. `no-leaked-event-listener` handles the same pattern through `resolveCleanupCallee`, so the observer rules are inconsistent with it. Likewise, a helper called from a cleanup-delegated function (a second level of indirection) is not followed.

### WAPI-010: Rule descriptions promise broader scope than the implementation checks

- **Severity:** Low (docs)
- **Rules:** `no-leaked-timeout`, `no-leaked-interval`, `no-leaked-event-listener`, `no-leaked-fetch`
- **Evidence:** Rule metadata descriptions, [`no-leaked-timeout` spec](../plugins/eslint-plugin-react-web-api/src/rules/no-leaked-timeout/no-leaked-timeout.spec.ts) (valid cases ignore `setTimeout` in event handlers and `useCallback`)
- **Finding:** Descriptions say "every 'setTimeout'/'fetch'/… in a component or custom hook", but only calls inside `use\w*Effect` setup/cleanup callbacks are analyzed. Timers, fetches, and listeners created in event handlers, render bodies, or `useCallback` are deliberately ignored. The descriptions overstate the coverage; the behavior itself is a reasonable design.

## Resolved findings

### Cross-effect same-name variable confusion

- **Rules:** `no-leaked-timeout`, `no-leaked-interval`, `no-leaked-fetch`, `no-leaked-resize-observer`, `no-leaked-intersection-observer`
- **Evidence:** Rule changelogs (5.21.1)
- **Resolution:** Entries created in one effect no longer pair with same-named but different variables in another effect's cleanup; identifiers are resolved to their variables by scope (`isAssignmentTargetEqual`, `isProvenanceEqual`) instead of comparing names. `no-leaked-event-listener` received the analogous treatment separately (5.23.5 cleanup-callee resolution, 5.30.0-rc.0 `isProvenanceEqual` matching). The remaining cross-effect looseness is WAPI-003.

### Cleanup-phase enforcement for observers

- **Rules:** `no-leaked-resize-observer`, `no-leaked-intersection-observer`
- **Evidence:** Rule changelogs (5.24.7, #2002)
- **Resolution:** `disconnect()`/`unobserve()` count only in the cleanup phase (inline cleanup, a named function returned as cleanup, or a local helper it calls), and calls inside the observer's own callback no longer pair. The timer rules still lack the equivalent check (WAPI-002).

### Ref-held observer instances

- **Rules:** `no-leaked-resize-observer`, `no-leaked-intersection-observer`
- **Evidence:** Rule changelogs (5.24.7, #2003)
- **Resolution:** `useRef(new XObserver(...))` instances — including local aliases of `ref.current` — are tracked for cleanup-phase disposal; an unassigned ref initializer reports `unexpected-floating-instance`.

### Global and destructured `AbortController` patterns for listeners

- **Rules:** `no-leaked-event-listener`
- **Evidence:** Rule changelog (5.24.7, #1996, #2001)
- **Resolution:** Bare global `addEventListener(...)` calls pair with bare or `window.`/`globalThis.`/`self.`-qualified removals, and `signal` destructured directly from `new AbortController()` (including renamed bindings) is recognized. The abort-side verification gap remains as WAPI-005.

### Nested and conditional effect cleanups

- **Rules:** all 6 rules
- **Evidence:** Rule changelogs (5.27.0, 5.27.1; #2038, #2039)
- **Resolution:** Cleanups returned through conditional expressions (`return cond ? () => … : null`) and effects nested in an outer `return` (`return useEffect(() => () => { … })`) are recognized, as are setup callbacks wrapped in type expressions.

### Statically named computed option keys

- **Rules:** `no-leaked-event-listener`, `no-leaked-fetch`
- **Evidence:** Rule changelogs (5.30.0-rc.0)
- **Resolution:** `signal`/`capture` options with string-literal or simple template-literal keys (`{ "signal": … }`, `{ ["capture"]: true }`), dropped in 5.14.9, are recognized again; identifier-computed keys (`{ [signal]: … }`) remain intentionally unrecognized (5.10.2).

## Boundaries

- Intentional matching boundaries: computed member calls (`obj["setTimeout"]()`) are unmatched by design (5.14.9); identifier-computed option keys are treated as dynamic (5.10.2); React Native `addEventListener` member calls are exempt from `no-leaked-event-listener` (#1323); class-component lifecycle detection was removed in 5.7.0 from the rules that had it (`no-leaked-event-listener`, `no-leaked-timeout`, `no-leaked-interval`); only inline effect callbacks are analyzed (WAPI-004).
- Coverage gaps declined upstream: `no-leaked-mutation-observer` and `no-leaked-idle-callback` were closed as not planned (#762, #760), so `MutationObserver` and `requestIdleCallback` leaks are out of scope unless those decisions are revisited.
- The text-based fast paths (`sourceCode.text.includes("setTimeout")`, `/use\w*Effect/`) only gate whether a file is analyzed; a mention in a comment or string merely costs a no-op traversal.
- Historical issues #723, #725, #727, #728, #842, #1228, #1282, #1323, #1340, #1622, #1714, #1996, #1997, #2001, #2002, #2003, #2038, and #2039 are excluded and retained as regression concerns.
