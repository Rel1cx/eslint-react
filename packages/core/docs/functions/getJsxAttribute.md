[@eslint-react/core](../README.md) / getJsxAttribute

# Function: getJsxAttribute()

```ts
function getJsxAttribute(
   context: RuleContext, 
   node: JSXElement, 
   initialScope?: Scope): (name: string) => JSXAttribute | JSXSpreadAttribute | undefined;
```

Creates a helper function to find a specific JSX attribute by name
Handles direct attributes and spread attributes (variables or object literals)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `node` | `JSXElement` | The JSX element node |
| `initialScope?` | `Scope` | (Optional) The initial scope to use for variable resolution |

## Returns

```ts
(name: string): JSXAttribute | JSXSpreadAttribute | undefined;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

### Returns

`JSXAttribute` \| `JSXSpreadAttribute` \| `undefined`
