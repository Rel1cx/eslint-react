[@eslint-react/eslint](../README.md) / createRule

# Variable: createRule

```ts
const createRule: <Options, MessageIds>(
  __namedParameters: Readonly<RuleWithMetaAndName<Options, MessageIds, PluginDocs>>,
) => RuleModuleWithName<MessageIds, Options, unknown>;
```

The rule creator that generates documentation URLs for ESLint React rules.

## Type Parameters

| Type Parameter                           |
| ---------------------------------------- |
| `Options` _extends_ readonly `unknown`[] |
| `MessageIds` _extends_ `string`          |

## Parameters

| Parameter           | Type                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `__namedParameters` | [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`RuleWithMetaAndName`\<`Options`, `MessageIds`, `PluginDocs`\>\> |

## Returns

`RuleModuleWithName`\<`MessageIds`, `Options`, `unknown`\>
