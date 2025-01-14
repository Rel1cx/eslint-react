# component-name

**Full Name in `eslint-plugin-react-naming-convention`**

```plain copy
react-naming-convention/component-name
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/naming-convention/component-name
```

**Features**

`🔍` `⚙️`

## What it does

Enforces naming conventions for components.

## Examples

This rule enforces naming conventions for components. Can be used to enforce PascalCase and CONSTANT_CASE. By default, it enforces PascalCase.

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

- `rule`: The rule to apply to the file name. Default is `"PascalCase"`. Possible values:
  1. `PascalCase`: PascalCase
  2. `CONSTANT_CASE`: CONSTANT_CASE
- `excepts`: (optional) An array of component names that are allowed to not follow the rule.
- `allowAllCaps`: (optional) If `true`, allows all caps file names. Default is `false`.
- `allowNamespace`: (optional) If `true`, allows namespace in JSX elements. Default is `false`.
- `allowLeadingUnderscore`: (optional) If `true`, allows leading underscore in file names. Default is `false`.

```json
{
  "@eslint-react/naming-convention/component-name": ["warn", "PascalCase"]
}
```

```json
{
  "@eslint-react/naming-convention/component-name": [
    "warn",
    { "rule": "PascalCase", "excepts": ["MyComponent"] }
  ]
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/component-name.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-naming-convention/src/rules/component-name.spec.ts)
