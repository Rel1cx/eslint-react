[@eslint-react/jsx](../README.md) / findSpreadProperty

# Function: findSpreadProperty()

```ts
function findSpreadProperty(
  context: RuleContext,
  argument: Expression,
  name: string,
  seen?: Set<Node>,
): Property | undefined;
```

Find the `Property` node that provides a given key inside a spread argument.

This is the single resolution routine shared by [findAttribute](findAttribute.md) (existence
checks) and the `spreadProps` variant of `resolveAttributeValue` (value extraction):

- An `Identifier` argument is resolved to its initializer via variable
  resolution; an `ObjectExpression` argument is searched directly.
- Properties are walked **in reverse** so that later entries win, matching
  JavaScript object semantics (`{ ...a, k: 1 }` -> the literal `k`).
- Nested `SpreadElement`s (identifiers or inline object expressions) are
  searched recursively; a `seen` set guards against circular references.
- Computed keys are skipped (they cannot be matched by name statically);
  plain identifier keys and string literal keys are both matched.

## Parameters

| Parameter  | Type                                                                                              | Description                                                       |
| ---------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `context`  | `RuleContext`                                                                                     | The ESLint rule context (needed for variable resolution).         |
| `argument` | `Expression`                                                                                      | The spread argument expression to search.                         |
| `name`     | `string`                                                                                          | The property name to look for.                                    |
| `seen`     | [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`Node`\> | Internal set of already-visited object expressions (cycle guard). |

## Returns

`Property` \| `undefined`

The matching `Property` node, or `undefined` when the key is not found.
