# Disallow comments from being inserted as text nodes (`react-ts/jsx/no-misused-comment-in-textnode`)

⚠️ This rule _warns_ in the following configs: ✅ `recommended`, `recommended-type-checked`.

<!-- end auto-generated rule header -->

This rule prevents comment strings (e.g. beginning with `//` or `/*`) from being accidentally
injected as a text node in JSX statements.

## Rule Details

### ❌ Incorrect

```jsx
function Component() {
    return <div>// empty div</div>;
}

function Component() {
    return (
        <div>
            /* empty div */
        </div>
    );
}
```

### ✅ Correct

```jsx
function Component() {
    return <div>{/* empty div */}</div>;
}

function Component() {
    return <div /* empty div */></div>;
}

function Component() {
    return <div className={'foo' /* temp class */}</div>;
}
```

## Legitimate uses

It's possible you may want to legitimately output comment start characters (`//` or `/*`) in a JSX text node. In which case, you can do the following:

```jsx
function Component() {
    return <div>{"/* This will be output as a text node */"}</div>;
}
```
