[@eslint-react/ast](../../../../README.md) / [View](../README.md) / isAbsentView

# Function: isAbsentView()

```ts
function isAbsentView(
  view:
    | View<Node>
    | AbsentView,
): view is AbsentView;
```

Check whether a view is an absent view.

## Parameters

| Parameter | Type                                                                                     | Description        |
| --------- | ---------------------------------------------------------------------------------------- | ------------------ |
| `view`    | \| [`View`](../interfaces/View.md)\<`Node`\> \| [`AbsentView`](../classes/AbsentView.md) | The view to check. |

## Returns

`view is AbsentView`

`true` when the view wraps no node.
