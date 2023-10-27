# debug/hooks

<!-- end auto-generated rule header -->

Warns when a React Hook is found. Useful for debugging.

> **Warning**
> This rule should only be used for debugging purposes.
> Otherwise, leave it off.

## Rule Details

### ❌ Incorrect

```tsx
import React from "react";

function useToggle() {
  const [value, setValue] = useState(false);

  return [value, () => setValue(x => !x)];
}
```
