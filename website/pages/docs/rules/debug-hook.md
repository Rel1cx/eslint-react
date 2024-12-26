# hook

**Full Name in `eslint-plugin-react-debug`**

```plain copy
react-debug/hook
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/debug/hook
```

**Labels**

`Debug` `React Hooks`

**Features**

`🐞`

**Presets**

- `debug`

## What it does

Reports all React Hooks. Useful for debugging. This rule should only be used for debugging purposes. Otherwise, leave it off.

## Examples

```tsx
import React, { useState } from "react";

function useToggle() {
  const [value, setValue] = useState(false);

  return [value, () => setValue((x) => !x)] as const;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/hook.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/hook.spec.ts)
