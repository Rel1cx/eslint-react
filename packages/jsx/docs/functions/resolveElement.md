[@eslint-react/jsx](../README.md) / resolveElement

# Function: resolveElement()

```ts
function resolveElement(context: RuleContext, node: Node): ElementDescriptor | undefined;
```

Describe an element without constructing or evaluating a React element.

Calls use the same name-based heuristic as core's API checks: bare `createElement`
or a fully qualified name ending in `.createElement`. There is no import identity
or alias resolution; unrelated APIs with that name also match.
TypeScript wrappers are unwrapped. String literal types use their value; other
types use their syntactic fully qualified name/source text, not runtime inference.
Missing types, non-string literal types, and spreads in the type/config positions
are rejected because the element type or argument layout cannot be described reliably.

## Parameters

| Parameter | Type          | Description                                                                 |
| --------- | ------------- | --------------------------------------------------------------------------- |
| `context` | `RuleContext` | The ESLint rule context, used for source text and authored prop resolution. |
| `node`    | `Node`        | The node to describe.                                                       |

## Returns

[`ElementDescriptor`](../type-aliases/ElementDescriptor.md) \| `undefined`

An element descriptor, or `undefined` for unsupported nodes or argument layouts.
