# use-jsx-vars

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/use-jsx-vars
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/use-jsx-vars
```

**Presets**

- `core`
- `recommended`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/use-jsx-vars.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/use-jsx-vars.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/use-jsx-vars.md)

## What it does

Helpes `eslint/no-unused-vars` to correctly detect variables used in JSX.

Since 0.17.0 the eslint `no-unused-vars`s rule does not detect variables used in JSX (see details). This rule will find variables used in JSX and mark them as used.
This rule only has an effect when the `no-unused-vars` rule is enabled.

## Examples

### Failing

```tsx
const Hello = require("./Hello");
```

### Passing

```tsx
const Hello = require("./Hello");

<Hello name="John" />;
```
