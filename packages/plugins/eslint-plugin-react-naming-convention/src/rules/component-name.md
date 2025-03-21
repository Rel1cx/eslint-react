---
title: component-name
---

**Full Name in `eslint-plugin-react-naming-convention`**

```plain copy
react-naming-convention/component-name
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/naming-convention/component-name
```

**Features**

`⚙️`

## Description

Enforces naming conventions for components.

## Examples

### Failing

```tsx
import React from "react";

function My_component() {
  //     ^^^^^^^^^^^^
  //     - Expected component name to be in 'PascalCase'.
  return null;
}
```

### Passing

```tsx
import React from "react";

function MyComponent() {
  return null;
}
```

## Rule Options

- `rule`: The rule to apply to the component name. Possible values:
  - `PascalCase` (default)
  - `CONSTANT_CASE`
- `excepts`: (optional) An array of component names that are allowed to not follow the rule.
- `allowAllCaps`: (optional) If `true`, allows all caps component names. Default is `false`.

## Rule Options Examples

```json
{
  "@eslint-react/naming-convention/component-name": ["warn", "PascalCase"]
}
```

```json
{
  "@eslint-react/naming-convention/component-name": ["warn", { "rule": "PascalCase", "allowAllCaps": true }]
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/component-name.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/component-name.spec.ts)

---

## See Also

- [`context-name`](./naming-convention-context-name)\
  Enforces context name to be a valid component name with the suffix `Context`.
