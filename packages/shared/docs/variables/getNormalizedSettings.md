[@eslint-react/shared](../README.md) / getNormalizedSettings

# Variable: getNormalizedSettings

```ts
const getNormalizedSettings: (ast: object) => {
  additionalEffectHooks: RegExpLike;
  additionalRefHooks: RegExpLike;
  additionalStateHooks: RegExpLike;
  compilationMode: "infer" | "annotation" | "syntax" | "all" | "off";
  importSource: string;
  polymorphicPropName: string;
  version: string;
};
```

Get the normalized ESLint React settings, memoized by the input settings object.

## Parameters

| Parameter | Type     |
| --------- | -------- |
| `ast`     | `object` |

## Returns

```ts
{
  additionalEffectHooks: RegExpLike;
  additionalRefHooks: RegExpLike;
  additionalStateHooks: RegExpLike;
  compilationMode: "infer" | "annotation" | "syntax" | "all" | "off";
  importSource: string;
  polymorphicPropName: string;
  version: string;
}
```

The normalized ESLint React settings.

| Name                    | Type                                                            |
| ----------------------- | --------------------------------------------------------------- |
| `additionalEffectHooks` | [`RegExpLike`](../type-aliases/RegExpLike.md)                   |
| `additionalRefHooks`    | [`RegExpLike`](../type-aliases/RegExpLike.md)                   |
| `additionalStateHooks`  | [`RegExpLike`](../type-aliases/RegExpLike.md)                   |
| `compilationMode`       | `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"` \| `"off"` |
| `importSource`          | `string`                                                        |
| `polymorphicPropName`   | `string`                                                        |
| `version`               | `string`                                                        |
