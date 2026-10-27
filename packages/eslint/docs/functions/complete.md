[@eslint-react/eslint](../README.md) / complete

# Function: complete()

```ts
function complete<O extends object, D extends object>(
  options:
    | Partial<O>
    | null
    | undefined,
  defaults: D,
): O & Omit<D, keyof O>;
```

Merge the rule options supplied by the user with the rule's default options.

Properties whose value is `null` or `undefined` keep the default value.

## Type Parameters

| Type Parameter                                       |
| ---------------------------------------------------- |
| <a id="type-parameter-o"></a> `O` _extends_ `object` |
| <a id="type-parameter-d"></a> `D` _extends_ `object` |

## Parameters

| Parameter  | Type                                                                                                                        | Description                            |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `options`  | \| [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`O`\> \| `null` \| `undefined` | The rule options supplied by the user. |
| `defaults` | `D`                                                                                                                         | The rule's default options.            |

## Returns

`O` & [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`D`, keyof `O`\>

The merged rule options.
