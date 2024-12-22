# prefer-read-only-props

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/prefer-read-only-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/prefer-read-only-props
```

**Features**

`🔍` `💭`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-read-only-props.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/prefer-read-only-props.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/prefer-read-only-props.md)

## What it does

This rule enforces that function components props are read-only.

Props are read-only snapshots in time: every render receives a new version of props. You can't change props. This rule enforces that you don't accidentally mutate props.

## Examples

### Failing

```tsx twoslash
import React from "react";

function Example(props: { name: string }) {
  //             ^^^^^^^^^^^^^^^^^^^^^^^
  //             - A function component's props should be read-only.
  return <div>{props.name}</div>;
}
```

```tsx twoslash
import React from "react";

interface Props {
  name: string;
}

function Example(props: Props) {
  //             ^^^^^^^^^^^^
  //            - A function component's props should be read-only.
  return <div>{props.name}</div>;
}
```

### Passing

```tsx twoslash
import React from "react";

function Example(props: { readonly name: string }) {
  return <div>{props.name}</div>;
}
```

```tsx twoslash
import React from "react";

interface Props {
  readonly name: string;
}

function Example(props: Props) {
  return <div>{props.name}</div>;
}
```

## Further Reading

- [React: passing-props-to-a-component#recap](https://react.dev/learn/passing-props-to-a-component#recap)
