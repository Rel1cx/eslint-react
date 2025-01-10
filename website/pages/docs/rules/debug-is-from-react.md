# is-from-react

**Full Name in `eslint-plugin-react-debug`**

```plain copy
react-debug/is-from-react
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/debug/is-from-react
```

**Features**

`🐞`

**Presets**

- `debug`

## What it does

Reports all identifiers that are initialized from React. Useful for debugging. This rule should only be used for debugging purposes. Otherwise, leave it off.

## Examples

```tsx
import { useState } from "react";
//       ^^^^^^^^
//       - [initialized from react] name: 'useState', import source: 'react'.
```

```tsx
import React from "react";
//     ^^^^^
//     - [initialized from react] name: 'React', import source: 'react'.

const Children = React.Children;
//    ^^^^^^^^   ^^^^^ ^^^^^^^^
//    |          |     - [initialized from react] name: 'Children', import source: 'react'.
//    |          - [initialized from react] name: 'React', import source: 'react'.
//    - [initialized from react] name: 'Children', import source: 'react'.

const toArray = Children.toArray;
//    ^^^^^^^   ^^^^^^^^ ^^^^^^^
//    |         |        - [initialized from react] name: 'toArray', import source: 'react'.
//    |         - [initialized from react] name: 'Children', import source: 'react'.
//    - [initialized from react] name: 'Children', import source: 'react'.
```

### When [`settings["react-x"].importSource`](https://eslint-react.xyz/docs/configuration#importsource) is set to `"@pika/react"`

```tsx
import { useState } from "@pika/react";
//       ^^^^^^^^
//       - [initialized from react] name: 'useState', import source: '@pika/react'.
```

```tsx
import React from "@pika/react";
//     ^^^^^
//     - [initialized from react] name: 'React', import source: '@pika/react'.

const Children = React.Children;
//    ^^^^^^^^   ^^^^^ ^^^^^^^^
//    |          |     - [initialized from react] name: 'Children', import source: '@pika/react'.
//    |          - [initialized from react] name: 'React', import source: '@pika/react'.
//    - [initialized from react] name: 'Children', import source: '@pika/react'.

const toArray = Children.toArray;
//    ^^^^^^^   ^^^^^^^^ ^^^^^^^
//    |         |        - [initialized from react] name: 'toArray', import source: '@pika/react'.
//    |         - [initialized from react] name: 'Children', import source: '@pika/react'.
//    - [initialized from react] name: 'Children', import source: '@pika/react'.
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/is-from-react.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/is-from-react.spec.ts)
