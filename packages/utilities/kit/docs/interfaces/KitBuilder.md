[@eslint-react/kit](../README.md) / KitBuilder

# Interface: KitBuilder

## Methods

### getConfig()

```ts
getConfig(args?: {
  files?: string[];
}): Config;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `args?` | \{ `files?`: `string`[]; \} |
| `args.files?` | `string`[] |

#### Returns

`Config`

***

### use()

```ts
use<F>(factory: F, ...args: Parameters<F>): KitBuilder;
```

#### Type Parameters

| Type Parameter |
| ------ |
| `F` *extends* (...`args`: `any`[]) => [`RuleDefinition`](../type-aliases/RuleDefinition.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `factory` | `F` |
| ...`args` | [`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<`F`\> |

#### Returns

`KitBuilder`
