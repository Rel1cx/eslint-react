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
checks), [resolveAttribute](resolveAttribute.md), and [resolveAttributeValue](resolveAttributeValue.md) (named value extraction):

- An `Identifier` argument is resolved to its initializer via variable
  resolution, following alias chains (`const b = a`); an `ObjectExpression`
  argument is searched directly. TypeScript expression wrappers are unwrapped.
- Properties are walked **in reverse** so that later entries win, matching
  JavaScript object semantics (`{ ...a, k: 1 }` -> the literal `k`).
- Nested `SpreadElement`s (identifiers or inline object expressions) are
  searched recursively; a `seen` set guards against circular references.
- Statically known primitive keys use JavaScript string-key coercion, including
  numeric and computed keys (ex: `{ ["class" + "Name"]: 1 }`). Symbol keys and
  object/function key coercion are not supported by this string-name lookup.

## Parameters

| Parameter  | Type                                                                                              | Description                                               |
| ---------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `context`  | `RuleContext`                                                                                     | The ESLint rule context (needed for variable resolution). |
| `argument` | `Expression`                                                                                      | The spread argument expression to search.                 |
| `name`     | `string`                                                                                          | The property name to look for.                            |
| `seen`     | [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`Node`\> | Internal set of already-visited nodes (cycle guard).      |

## Returns

`Property` \| `undefined`

The matching `Property` node, or `undefined` when the key is not found.
