# jsx/no-misused-comment-in-textnode

<!-- end auto-generated rule header -->

This rule prevents comment strings (e.g. beginning with `//` or `/*`) from being accidentally
injected as a text node in JSX statements.

## Rule Details

### ❌ Incorrect

```tsx
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

```tsx
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

```tsx
function Component() {
  return <div>{"/* This will be output as a text node */"}</div>;
}
```
