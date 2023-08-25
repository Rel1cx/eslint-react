# no-misused-jsx-extension

## Rule Details

Examples of **correct** case for this rule:

```tsx
// src/components/ExampleComponent.tsx

import React from "react";

const ExampleComponent = () => {
  return <div />;
};

export default ExampleComponent;
```

Examples of **incorrect** case for this rule:

```tsx
// src/components/foo.tsx

export const foo = "foo";
```

## When Not To Use It

If you don't want to enforce that all files are named with the `.tsx` extension containing JSX, then you can disable this rule.
