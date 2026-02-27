[@eslint-react/core](../README.md) / ComponentFlag

# Variable: ComponentFlag

```ts
const ComponentFlag: {
  CreateElement: bigint;
  ForwardRef: bigint;
  Memo: bigint;
  None: bigint;
  PureComponent: bigint;
};
```

Component flag constants

## Type Declaration

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-createelement"></a> `CreateElement` | `bigint` | - | Indicates the component creates elements using `createElement` instead of JSX |
| <a id="property-forwardref"></a> `ForwardRef` | `bigint` | - | Indicates the component forwards a ref (e.g., React.forwardRef) |
| <a id="property-memo"></a> `Memo` | `bigint` | - | Indicates the component is memoized (e.g., React.memo) |
| <a id="property-none"></a> `None` | `bigint` | `0n` | No flags set |
| <a id="property-purecomponent"></a> `PureComponent` | `bigint` | - | Indicates the component is a pure component (e.g., extends PureComponent) |
