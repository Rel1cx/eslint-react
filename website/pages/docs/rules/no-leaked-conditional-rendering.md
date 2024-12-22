# no-leaked-conditional-rendering

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-leaked-conditional-rendering
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-leaked-conditional-rendering
```

**Features**

`🔍` `💭`

**Presets**

- `recommended-type-checked`

## What it does

Prevents problematic leaked values from being rendered.

Using the `&&` operator to render some element conditionally in JSX can cause unexpected values being rendered, or even crashing the rendering.

## Examples

In React, you might end up rendering unexpected values like `0` or `NaN`. In React Native, your render method will even crash if you render these values:

```tsx twoslash
import React from "react";

function Example() {
  return <>{0 && <view />}</>;
  //        ^
  //        - Possible unexpected value will be rendered (React Dom: renders undesired '0', React Native: crashes 💥).
}
```

```tsx twoslash
import React from "react";

function Example() {
  return <>{NaN && <div />}</>;
  //        ^^^
  //        - Possible unexpected value will be rendered (React Dom: renders undesired 'NaN', React Native: crashes 💥).
}
```

```tsx
import React from "react";

function Example() {
  return <>{"" && <div />}</>;
  //        ^^
  //        - Possible unexpected value will be rendered (React Dom: renders nothing, React Native, with React below 18: crashes 💥).
}
```

This can be avoided by:

- coercing the conditional to a boolean: `{!!someValue && <Something />}`
- transforming the binary expression into a ternary expression which returns null for falsy values: `{someValue ? <Something /> : null}`

### Failing

```tsx twoslash
import React from "react";

interface ExampleProps {
  count: number;
}

function Example({ count }: ExampleProps) {
  return <div>{count && <span>There are {count} results</span>}</div>;
  //           ^^^^^
  //           - Potential leaked value 'count' that might cause unintentionally rendered values or rendering crashes.
}
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{items.length && <List items={items} />}</div>;
  //           ^^^^^^^^^^^^
  //           - Potential leaked value 'items.length' that might cause unintentionally rendered values or rendering crashes.
}

declare const List: React.ComponentType<{ items: string[] }>;
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{items[0] && <List items={items} />}</div>;
  //           ^^^^^^^^
  //           - Potential leaked value 'items[0]' that might cause unintentionally rendered values or rendering crashes.
}

declare const List: React.ComponentType<{ items: string[] }>;
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  numberA: number;
  numberB: number;
}

function Example({ numberA, numberB }: ExampleProps) {
  return (
    <div>{(numberA || numberB) && <Results>{numberA + numberB}</Results>}</div>
    //    ^^^^^^^^^^^^^^^^^^^^
    //    - Potential leaked value '(numberA || numberB)' that might cause unintentionally rendered values or rendering crashes.
  );
}

declare const Results: React.ComponentType<React.PropsWithChildren>;
```

### Passing

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{items}</div>;
}
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  customTitle: string;
}

const defaultTitle = "Default Title";

// @log: An OR condition it's considered valid since it's assumed as a way to render some fallback if the first value is falsy, not to render something conditionally
function Example({ customTitle }: ExampleProps) {
  return <div>{customTitle || defaultTitle}</div>;
}
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>There are {items.length} items</div>;
}
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
  count: number;
}

function Example({ items, count }: ExampleProps) {
  return <div>{!count && "No results found"}</div>;
}
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{!!items.length && <List items={items} />}</div>;
}

declare const List: React.ComponentType<{ items: string[] }>;
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{Boolean(items.length) && <List items={items} />}</div>;
}

declare const List: React.ComponentType<{ items: string[] }>;
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{items.length > 0 && <List items={items} />}</div>;
}

declare const List: React.ComponentType<{ items: string[] }>;
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{items.length ? <List items={items} /> : null}</div>;
}

declare const List: React.ComponentType<{ items: string[] }>;
```

```tsx twoslash
import React from "react";

interface ExampleProps {
  items: string[];
}

function Example({ items }: ExampleProps) {
  return <div>{items.length ? <List items={items} /> : <EmptyList />}</div>;
}

declare const List: React.ComponentType<{ items: string[] }>;
declare const EmptyList: React.ComponentType;
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-leaked-conditional-rendering.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-leaked-conditional-rendering.spec.ts)

## Further Reading

- [React: Conditional Rendering](https://react.dev/learn/conditional-rendering)
