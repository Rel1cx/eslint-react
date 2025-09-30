[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / findParentJsxAttribute

# Function: findParentJsxAttribute()

> **findParentJsxAttribute**(`node`, `test`): `undefined` \| `JSXAttribute`

Traverses up the AST to find a parent JSX attribute node that matches a given test

## Parameters

### node

`Node`

The starting AST node

### test

(`node`) => `boolean`

Optional predicate function to test if the attribute meets criteria
              Defaults to always returning true (matches any attribute)

## Returns

`undefined` \| `JSXAttribute`

The first matching JSX attribute node found when traversing upwards, or undefined
