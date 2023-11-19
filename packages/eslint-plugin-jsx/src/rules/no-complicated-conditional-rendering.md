# jsx/no-complicated-conditional-rendering

<!-- end auto-generated rule header -->

## Rule category

Complexity.

## What it does

Prevents complicated conditional rendering in JSX.

## Why is this bad?

Complicated conditional rendering is hard to read and understand.

## Examples

### ❌ Incorrect

```tsx
function Component({ hideShapes, debugSvg }) {
  return <div>{hideShapes ? null : debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />}</div>;
}
```

### ✅ Correct

```tsx
function Component({ hideShapes, debugSvg }) {
  // Early return if nothing to render
  if (hideShapes) {
    return null;
  }

  return debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />;
}
```
