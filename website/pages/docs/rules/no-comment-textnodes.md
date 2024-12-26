# no-comment-textnodes

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-comment-textnodes
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-comment-textnodes
```

**Labels**

`JSX` `Text Nodes`

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents comment strings (e.g. beginning with `//` or `/*`) from being accidentally inserted into the JSX element's textnodes.

This could be a mistake during code editing or it could be a misunderstanding of how JSX works. Either way, it's probably not what you intended.

## Examples

### Failing

```tsx
import React from "react";

function MyComponent() {
  return <div>// empty div</div>;
  //          ^^^^^^^^^^^^
  //          - Possible misused comment in text node. Comments inside children section of tag should be placed inside braces.
}

function MyComponent2() {
  return <div>/* empty div */</div>;
  //          ^^^^^^^^^^^^^^^
  //          - Possible misused comment in text node. Comments inside children section of tag should be placed inside braces.
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return <div>{/* empty div */}</div>;
}
```

### Legitimate uses

It's possible you may want to legitimately output comment start characters (`//` or `/*`) in a JSX text node. In which case, you can do the following:

```tsx
import React from "react";

function MyComponent() {
  // 🟢 Good: This is a legitimate use of comment strings in JSX textnodes
  return <div>{"/* This will be output as a text node */"}</div>;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-comment-textnodes.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-comment-textnodes.spec.ts)
