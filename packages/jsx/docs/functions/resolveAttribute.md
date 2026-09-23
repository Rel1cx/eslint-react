[@eslint-react/jsx](../README.md) / resolveAttribute

# Function: resolveAttribute()

## Call Signature

```ts
function resolveAttribute(context: RuleContext, attribute: JSXAttribute): AttributeDescriptor;
```

Describe a plain JSX attribute, retaining its name, source, and value syntax.

### Parameters

| Parameter   | Type           | Description                    |
| ----------- | -------------- | ------------------------------ |
| `context`   | `RuleContext`  | The ESLint rule context.       |
| `attribute` | `JSXAttribute` | The JSX attribute to describe. |

### Returns

[`AttributeDescriptor`](../interfaces/AttributeDescriptor.md)

An attribute descriptor.

## Call Signature

```ts
function resolveAttribute(context: RuleContext, attribute: Property):
  | AttributeDescriptor
  | undefined;
```

Describe an object property with a statically known string name.

### Parameters

| Parameter   | Type          | Description                      |
| ----------- | ------------- | -------------------------------- |
| `context`   | `RuleContext` | The ESLint rule context.         |
| `attribute` | `Property`    | The object property to describe. |

### Returns

\| [`AttributeDescriptor`](../interfaces/AttributeDescriptor.md)
\| `undefined`

A descriptor, or `undefined` for an unknown name or unsupported value node.

## Call Signature

```ts
function resolveAttribute(
  context: RuleContext,
  attribute: Property | TSESTreeJSXAttributeLike,
  name: string,
):
  | AttributeDescriptor
  | undefined;
```

Describe an attribute found by name, resolving that property for a JSX spread.

A spread describes a props object, not a single attribute, so its property name
is required. Plain JSX attributes and object properties use their own names.
Lookup follows [findSpreadProperty](findSpreadProperty.md)'s best-effort semantics.

### Parameters

| Parameter   | Type                                     | Description                                                      |
| ----------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `context`   | `RuleContext`                            | The ESLint rule context.                                         |
| `attribute` | `Property` \| `TSESTreeJSXAttributeLike` | A JSX attribute, JSX spread, or object property.                 |
| `name`      | `string`                                 | The property to find in a JSX spread; ignored for other sources. |

### Returns

\| [`AttributeDescriptor`](../interfaces/AttributeDescriptor.md)
\| `undefined`

A descriptor, or `undefined` when the named property cannot be resolved.
