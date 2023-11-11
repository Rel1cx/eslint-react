# debug/hooks

<!-- end auto-generated rule header -->

## Rule category

Verbose.

## What it does

Reports all react hooks. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Examples

```tsx
import React from "react";

function useToggle() {
  const [value, setValue] = useState(false);

  return [value, () => setValue(x => !x)];
}
```
