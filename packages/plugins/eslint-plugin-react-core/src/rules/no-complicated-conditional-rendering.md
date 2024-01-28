# no-complicated-conditional-rendering

## Rule category

Style.

## What it does

Prevents complicated conditional rendering in JSX.

## Examples

### Failing

```tsx
function Component({ hideShapes, debugSvg }) {
  return <div>{hideShapes ? null : debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />}</div>;
}
```

### Passing

```tsx
function Component({ hideShapes, debugSvg }) {
  // Early return if nothing to render
  if (hideShapes) {
    return null;
  }

  return debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />;
}
```
