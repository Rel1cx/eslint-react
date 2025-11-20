[@eslint-react/core](../README.md) / getJsxAttribute

# Function: getJsxAttribute()

```ts
function getJsxAttribute(
   context: RuleContext, 
   node: JSXElement, 
   initialScope?: Scope): (name: string) => JSXAttribute | JSXSpreadAttribute | undefined;
```

Get a function to find JSX attributes by name, considering direct attributes and spread attributes.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `node` | `JSXElement` | The JSX element node |
| `initialScope?` | `Scope` | Optional initial scope for variable resolution |

## Returns

A function that takes an attribute name and returns the corresponding JSX attribute node or undefined

```ts
(name: string): JSXAttribute | JSXSpreadAttribute | undefined;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

### Returns

`JSXAttribute` \| `JSXSpreadAttribute` \| `undefined`
