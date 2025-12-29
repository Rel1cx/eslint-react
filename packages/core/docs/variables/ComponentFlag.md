[@eslint-react/core](../README.md) / ComponentFlag

# Variable: ComponentFlag

```ts
ComponentFlag: {
  Async: bigint;
  CreateElement: bigint;
  ForwardRef: bigint;
  Memo: bigint;
  None: bigint;
  PureComponent: bigint;
};
```

## Type Declaration

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| <a id="async"></a> `Async` | `bigint` | - | Indicates the component is asynchronous |
| <a id="createelement"></a> `CreateElement` | `bigint` | - | Indicates the component creates elements using `createElement` instead of JSX |
| <a id="forwardref"></a> `ForwardRef` | `bigint` | - | Indicates the component forwards a ref (e.g., React.forwardRef) |
| <a id="memo"></a> `Memo` | `bigint` | - | Indicates the component is memoized (e.g., React.memo) |
| <a id="none"></a> `None` | `bigint` | `0n` | No flags set |
| <a id="purecomponent"></a> `PureComponent` | `bigint` | - | Indicates the component is a pure component (e.g., extends PureComponent) |
