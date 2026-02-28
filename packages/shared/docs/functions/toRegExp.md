[@eslint-react/shared](../README.md) / toRegExp

# Function: toRegExp()

```ts
function toRegExp(string: string | null | undefined): RegExpLike;
```

Convert a string to the `RegExp`.
Normal strings (e.g., `"foo"`) is converted to `/^foo$/` of `RegExp`.
Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `string` | `string` \| `null` \| `undefined` | The string to convert. |

## Returns

[`RegExpLike`](../type-aliases/RegExpLike.md)

Returns the `RegExp`.

## See

https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/src/utils/regexp.ts
