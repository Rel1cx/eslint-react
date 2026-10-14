[@eslint-react/core](../README.md) / DEFAULT\_JSX\_DETECTION\_HINT

# Variable: DEFAULT\_JSX\_DETECTION\_HINT

```ts
const DEFAULT_JSX_DETECTION_HINT: JsxDetectionHint;
```

Default JSX detection hint.

Skips number, bigint, boolean, string, and undefined literals —
the value types commonly returned alongside JSX in React components.
They are excluded because callers are typically interested in
element-shaped values rather than text or flag content, not because
they are unrenderable (strings and numbers are renderable since
React 16).
