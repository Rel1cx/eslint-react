[@eslint-react/kit](../README.md) / Builder

# Interface: Builder

## Methods

### getConfig()

```ts
getConfig(options?: {
  files?: string[];
}): Config;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | \{ `files?`: `string`[]; \} |
| `options.files?` | `string`[] |

#### Returns

`Config`

***

### getPlugin()

```ts
getPlugin(): Plugin;
```

#### Returns

`Plugin`

***

### use()

```ts
use<F>(factory: F, ...args: Parameters<F>): Builder;
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

`Builder`
