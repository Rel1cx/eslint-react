# jsx/no-leaked-conditional-rendering

💭 This rule requires type information.

## Rule category

Suspicious.

## What it does

Prevents problematic leaked values from being rendered.

## Why is this bad?

Using the && operator to render some element conditionally in JSX can cause unexpected values being rendered, or even crashing the rendering.

## Examples

In React, you might end up rendering unexpected values like 0 or NaN. In React Native, your render method will even crash if you render these values:

```tsx
function Component() {
  return (
    <>
      {0 && <Something />}
      {/* React: renders undesired 0 */}
      {/* React Native: crashes 💥 */}

      {NaN && <Something />}
      {/* React: renders undesired NaN */}
      {/* React Native: crashes 💥 */}

      {"" && <Something />}
      {/* React: renders nothing */}
      {/* React Native, with React < 18: crashes 💥 */}
    </>
  );
}
```

This can be avoided by:

- coercing the conditional to a boolean: {!!someValue && \<Something />}
- transforming the binary expression into a ternary expression which returns null for falsy values: {someValue ? \<Something /> : null}

### ❌ Incorrect

```tsx
function Component({ count, title }) {
  return <div>{count && title}</div>;
}
```

```tsx
function Component({ count }) {
  return <div>{count && <span>There are {count} results</span>}</div>;
}
```

```tsx
function Component({ elements }) {
  return <div>{elements.length && <List elements={elements} />}</div>;
}
```

```tsx
function Component({ nestedCollection }) {
  return (
    <div>
      {nestedCollection.elements.length && <List elements={nestedCollection.elements} />}
    </div>
  );
}
```

```tsx
function Component({ elements }) {
  return <div>{elements[0] && <List elements={elements} />}</div>;
}
```

```tsx
function Component({ numberA, numberB }) {
  return <div>{(numberA || numberB) && <Results>{numberA + numberB}</Results>}</div>;
}
```

```tsx
// If the condition is a boolean value, this rule will report the logical expression
// since it can't infer the type of the condition.
function Component({ someBool }) {
  return <div>{someBool && <Results>{numberA + numberB}</Results>}</div>;
}
```

### ✅ Correct

```tsx
function Component({ elements }) {
  return <div>{elements}</div>;
}
```

```tsx
// An OR condition it's considered valid since it's assumed as a way
// to render some fallback if the first value is falsy, not to render something conditionally.
function Component({ customTitle }) {
  return <div>{customTitle || defaultTitle}</div>;
}
```

```tsx
function Component({ elements }) {
  return <div>There are {elements.length} elements</div>;
}
```

```tsx
function Component({ elements, count }) {
  return <div>{!count && "No results found"}</div>;
}
```

```tsx
function Component({ elements }) {
  return <div>{!!elements.length && <List elements={elements} />}</div>;
}
```

```tsx
function Component({ elements }) {
  return <div>{Boolean(elements.length) && <List elements={elements} />}</div>;
}
```

```tsx
function Component({ elements }) {
  return <div>{elements.length > 0 && <List elements={elements} />}</div>;
}
```

```tsx
function Component({ elements }) {
  return <div>{elements.length ? <List elements={elements} /> : null}</div>;
}
```

```tsx
function Component({ elements }) {
  return <div>{elements.length ? <List elements={elements} /> : <EmptyList />}</div>;
}
```

## Further Reading

- [react.dev: Conditional Rendering](https://react.dev/learn/conditional-rendering)
