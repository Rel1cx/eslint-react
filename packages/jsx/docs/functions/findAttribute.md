[@eslint-react/jsx](../README.md) / findAttribute

# Function: findAttribute()

```ts
function findAttribute(context: RuleContext, element: JSXElement, name: string): AttributeMatch | null;
```

Find a JSX attribute (or a spread attribute containing the property) by name.

Returns the last matching attribute to mirror React's behavior where later props win.
Plain attributes are matched by full name; spread attributes are resolved when
possible: if the spread argument is an identifier that resolves to an object
expression, the object's properties are searched for a matching key (see
[findSpreadProperty](findSpreadProperty.md)).

## Parameters

| Parameter | Type          | Description                                                                    |
| --------- | ------------- | ------------------------------------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes). |
| `element` | `JSXElement`  | The `JSXElement` node to search.                                               |
| `name`    | `string`      | The attribute name to look for (ex: "className", "xml:space").                 |

## Returns

[`AttributeMatch`](../type-aliases/AttributeMatch.md) \| `null`

The matching attribute and, for spreads, the property that supplies the name; `null` when not found.
