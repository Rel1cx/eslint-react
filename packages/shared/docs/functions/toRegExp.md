[@eslint-react/shared](../README.md) / toRegExp

# Function: toRegExp()

```ts
function toRegExp(string: string): {
  test: boolean;
};
```

Convert a string to the `RegExp`.
Normal strings (e.g., `"foo"`) is converted to `/^foo$/` of `RegExp`.
Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `string` | `string` | The string to convert. |

## Returns

```ts
{
  test: boolean;
}
```

Returns the `RegExp`.

| Name | Type |
| ------ | ------ |
| `test()` | (`s`: `string`) => `boolean` |

## See

https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/src/utils/regexp.ts
