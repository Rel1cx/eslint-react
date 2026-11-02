[@local/testkit](../README.md) / createRuleTesterForTsconfig

# Function: createRuleTesterForTsconfig()

```ts
function createRuleTesterForTsconfig(name: "preact" | "preserve" | "react-classic" | "react-jsx" | "react-native"): RuleTester;
```

Creates a `RuleTester` pinned to a registered tsconfig fixture (e.g.
`"react-classic"` for the classic JSX runtime, `"preact"` for
`jsxImportSource: preact`).

## Parameters

| Parameter | Type                                                                                 |
| --------- | ------------------------------------------------------------------------------------ |
| `name`    | `"preact"` \| `"preserve"` \| `"react-classic"` \| `"react-jsx"` \| `"react-native"` |

## Returns

`RuleTester`
