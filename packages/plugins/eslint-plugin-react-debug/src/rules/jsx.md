---
title: jsx
---

**Full Name in `eslint-plugin-react-debug`**

```plain copy
react-debug/jsx
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/debug/jsx
```

**Features**

`🐞`

## Description

Reports all JSX elements with config properties `jsx`, `jsxFactory`, `jsxFragmentFactory`, `jsxImportSource`, and `jsxRuntime`.

- `jsx`
- `jsxFactory`
- `jsxFragmentFactory`
- `jsxImportSource`
- `jsxRuntime`
- `jsxImportSource` is the source of the JSX factory and fragment factory functions.

## Examples

```json title="tsconfig.json"
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxFactory": "React.createElement",
    "jsxFragmentFactory": "React.Fragment",
    "jsxImportSource": "react"
  }
}
```

```tsx
import React from "react";

const element = <div>Hello World</div>;
//              ^^^^^^^^^^^^^^^^^^^^^^
//              - [jsx] jsx: 'react-jsx', jsxFactory: 'React.createElement', jsxFragmentFactory: 'React.Fragment', jsxRuntime: 'automatic', jsxImportSource: 'react'
```

```tsx
/** @jsx Preact.h */
/** @jsxFrag Preact.Fragment */
/** @jsxImportSource preact */
/** @jsxRuntime classic */

import Preact from "preact";

const element = <div>Hello World</div>;
//              ^^^^^^^^^^^^^^^^^^^^^^
//              - [jsx] jsx: 'react', jsxFactory: 'Preact.h', jsxFragmentFactory: 'Preact.Fragment', jsxRuntime: 'classic', jsxImportSource: 'preact'
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/jsx-runtime.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/jsx-runtime.spec.ts)
