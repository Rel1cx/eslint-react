[@eslint-react/jsx](../README.md) / hasAnyAttribute

# Function: hasAnyAttribute()

```ts
function hasAnyAttribute(
   context: RuleContext, 
   element: JSXElement, 
   names: readonly string[]): boolean;
```

Check whether a JSX element carries **at least one** of the given attributes.

This is a batch variant of [hasAttribute](hasAttribute.md) for the common pattern of
short-circuiting on multiple prop names:

```ts
// before
if (hasAttribute(ctx, el, "key")) return;
if (hasAttribute(ctx, el, "ref")) return;

// after
if (hasAnyAttribute(ctx, el, ["key", "ref"])) return;
```

Spread attributes are taken into account (see [findAttribute](findAttribute.md)).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes). |
| `element` | `JSXElement` | The `JSXElement` node to inspect. |
| `names` | readonly `string`[] | The attribute names to look for. |

## Returns

`boolean`

`true` when **at least one** of the attributes is present.
