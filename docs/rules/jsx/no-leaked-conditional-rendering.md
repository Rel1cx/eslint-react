# react-ts/jsx/no-leaked-conditional-rendering

Disallow problematic leaked values from being rendered.

## Rule Details

Using the && operator to render some element conditionally in JSX can cause unexpected values being rendered, or even crashing the rendering.

This rule aims to prevent dangerous leaked values from being rendered since they can cause unexpected values reaching the final DOM or even crashing your render method.

In React, you might end up rendering unexpected values like 0 or NaN. In React Native, your render method will even crash if you render these values:

```tsx
const Example = () => {
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
};
```

This can be avoided by:

- coercing the conditional to a boolean: {!!someValue && \<Something />}
- transforming the binary expression into a ternary expression which returns null for falsy values: {someValue ? \<Something /> : null}

Examples of **incorrect** code for this rule:

```tsx
const Component = ({ count, title }) => {
    return <div>{count && title}</div>;
};
```

```tsx
const Component = ({ count }) => {
    return <div>{count && <span>There are {count} results</span>}</div>;
};
```

```tsx
const Component = ({ elements }) => {
    return <div>{elements.length && <List elements={elements} />}</div>;
};
```

```tsx
const Component = ({ nestedCollection }) => {
    return (
        <div>
            {nestedCollection.elements.length && <List elements={nestedCollection.elements} />}
        </div>
    );
};
```

```tsx
const Component = ({ elements }) => {
    return <div>{elements[0] && <List elements={elements} />}</div>;
};
```

```tsx
const Component = ({ numberA, numberB }) => {
    return <div>{(numberA || numberB) && <Results>{numberA + numberB}</Results>}</div>;
};
```

```tsx
// If the condition is a boolean value, this rule will report the logical expression
// since it can't infer the type of the condition.
const Component = ({ someBool }) => {
    return <div>{someBool && <Results>{numberA + numberB}</Results>}</div>;
};
```

Examples of **correct** code for this rule:

```tsx
const Component = ({ elements }) => {
    return <div>{elements}</div>;
};
```

```tsx
// An OR condition it's considered valid since it's assumed as a way
// to render some fallback if the first value is falsy, not to render something conditionally.
const Component = ({ customTitle }) => {
    return <div>{customTitle || defaultTitle}</div>;
};
```

```tsx
const Component = ({ elements }) => {
    return <div>There are {elements.length} elements</div>;
};
```

```tsx
const Component = ({ elements, count }) => {
    return <div>{!count && "No results found"}</div>;
};
```

```tsx
const Component = ({ elements }) => {
    return <div>{!!elements.length && <List elements={elements} />}</div>;
};
```

```tsx
const Component = ({ elements }) => {
    return <div>{Boolean(elements.length) && <List elements={elements} />}</div>;
};
```

```tsx
const Component = ({ elements }) => {
    return <div>{elements.length > 0 && <List elements={elements} />}</div>;
};
```

```tsx
const Component = ({ elements }) => {
    return <div>{elements.length ? <List elements={elements} /> : null}</div>;
};
```

```tsx
const Component = ({ elements }) => {
    return <div>{elements.length ? <List elements={elements} /> : <EmptyList />}</div>;
};
```

## When Not To Use It

If you are working in a typed-codebase which encourages you to always use boolean conditions, this rule can be disabled.

## Further Reading

[react.dev: Conditional Rendering](https://react.dev/learn/conditional-rendering)
