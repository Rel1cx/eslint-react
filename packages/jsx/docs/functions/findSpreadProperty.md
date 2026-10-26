[@eslint-react/jsx](../README.md) / findSpreadProperty

# Function: findSpreadProperty()

```ts
function findSpreadProperty(context: RuleContext, argument: Expression, name: string): Property | null;
```

Find the `Property` node that provides a given key inside a spread argument.

This is the single resolution routine shared by [findAttribute](findAttribute.md) and
`findCreateElementProp`:

- An `Identifier` argument is resolved to its initializer via variable
  resolution, following alias chains (`const b = a`) like `getStaticValue`
  does; an `ObjectExpression` argument is searched directly.
- Properties are walked **in reverse** so that later entries win, matching
  JavaScript object semantics (`{ ...a, k: 1 }` -> the literal `k`).
- Nested `SpreadElement`s (identifiers or inline object expressions) are
  searched recursively; a `seen` set guards against circular references.
- Non-computed identifier keys and string literal keys are matched directly;
  computed keys are matched when they are statically evaluable
  (ex: `{ ["class" + "Name"]: 1 }`).

## Parameters

| Parameter  | Type          | Description                                               |
| ---------- | ------------- | --------------------------------------------------------- |
| `context`  | `RuleContext` | The ESLint rule context (needed for variable resolution). |
| `argument` | `Expression`  | The spread argument expression to search.                 |
| `name`     | `string`      | The property name to look for.                            |

## Returns

`Property` \| `null`

The matching `Property` node, or `null` when the key is not found.
