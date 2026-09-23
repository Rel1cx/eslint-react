[@eslint-react/jsx](../README.md) / ElementDescriptor

# Type Alias: ElementDescriptor

```ts
type ElementDescriptor =
  | {
    kind: "jsx";
    node: TSESTree.JSXElement | TSESTree.JSXFragment;
  }
  | {
    kind: "createElement";
    node: TSESTree.CallExpression;
  } & {
    type: string;
    getChildren: readonly Node[];
    getProp:
      | AttributeDescriptor
      | undefined;
  };
```

A structural description of an authored JSX element, fragment, or `createElement` call.

## Type Declaration

| Name            | Type                                                                                                  | Description                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | `string`                                                                                              | The syntactic element type, unquoted for string literals and empty for JSX fragments.                                                                                                                                                                                                                 |
| `getChildren()` | () => readonly `Node`[]                                                                               | Get nested JSX children (using the JSX `getChildren` helper) or positional call arguments. Explicit attribute/config children remain available through `getProp("children")`, not this method. Nodes retain their syntax and identity: no runtime flattening, filtering, or spread evaluation occurs. |
| `getProp()`     | (`name`: `string`) => \| [`AttributeDescriptor`](../interfaces/AttributeDescriptor.md) \| `undefined` | Read authored attributes/config properties only, without synthesizing children or applying defaultProps.                                                                                                                                                                                              |
