[@eslint-react/ast](../../../../README.md) / [View](../README.md) / isEmptyView

# Function: isEmptyView()

```ts
function isEmptyView(
  view:
    | View<Node>
    | EmptyView,
): view is EmptyView;
```

Check whether a view is an empty view.

## Parameters

| Parameter | Type                                                                                   | Description        |
| --------- | -------------------------------------------------------------------------------------- | ------------------ |
| `view`    | \| [`View`](../interfaces/View.md)\<`Node`\> \| [`EmptyView`](../classes/EmptyView.md) | The view to check. |

## Returns

`view is EmptyView`

`true` when the view wraps no node.
