# no-clone-element

## Rule category

Restriction.

## What it does

Prevents the use of `React.cloneElement`.

## Why is this bad?

Using cloneElement is uncommon and can lead to fragile code. This also makes it harder to trace the data flow. Try the [alternatives](https://react.dev/reference/react/cloneElement#alternatives) instead.

## Examples

### Failing

```tsx
import { cloneElement } from "react";

// ...
const clonedElement = cloneElement(
  <Row title="Cabbage">
    Hello
  </Row>,
  { isHighlighted: true },
  "Goodbye",
);
// ...

console.log(clonedElement); // <Row title="Cabbage" isHighlighted={true}>Goodbye</Row>
```

### Passing

```tsx
export default function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
    </div>
  );
}
```

## Further Reading

- [react.dev: Legacy React APIs cloneElement](https://react.dev/reference/react/createRef)
