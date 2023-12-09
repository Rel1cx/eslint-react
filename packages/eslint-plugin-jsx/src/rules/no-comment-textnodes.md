# jsx/no-comment-textnodes

## Rule category

Suspicious.

## What it does

Prevents comment strings (e.g. beginning with `//` or `/*`) from being accidentally inserted into the JSX element's textnodes.

## Why is this bad?

This could be a mistake during code editing or it could be a misunderstanding of how JSX works. Either way, it's probably not what you intended.

## Examples

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

### Legitimate uses

It's possible you may want to legitimately output comment start characters (`//` or `/*`) in a JSX text node. In which case, you can do the following:

```tsx
function Component() {
  return <div>{"/* This will be output as a text node */"}</div>;
}
```
