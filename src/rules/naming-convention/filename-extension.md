# react-ts/naming-convention/filename-extension

## Rule Details

Examples of **correct** case for this rule:

```tsx
// src/components/Component.tsx

import React from "react";

const Component = () => {
    return <div />;
};

export default Component;
```

Examples of **incorrect** case for this rule:

```tsx
// src/components/foo.tsx

export const foo = "foo";
```

## When Not To Use It

If you don't want to enforce that all files are named with the `.tsx` extension containing JSX, then you can disable this rule.
