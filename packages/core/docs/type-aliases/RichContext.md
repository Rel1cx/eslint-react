[@eslint-react/core](../README.md) / RichContext

# Type Alias: RichContext\<M _extends_ `string` = `string`, O _extends_ readonly `unknown`[] = readonly `unknown`[]\>

```ts
type RichContext<M extends string = string, O extends readonly unknown[] = readonly unknown[]> = {
  _: RuleContext<M, O>;
  ast: RuleContext["sourceCode"]["ast"];
  getEnvConfig: () => EnvConfig;
  getJsxConfig: () => Required<JsxConfig>;
  getText: RuleContext["sourceCode"]["getText"];
  hasText: (
    expr:
      | RegExp
      | string,
  ) => boolean;
  settings: ESLintReactSettingsNormalized;
  src: RuleContext["sourceCode"];
  report: void;
};
```

## Type Parameters

| Type Parameter                     | Default type         |
| ---------------------------------- | -------------------- |
| `M` _extends_ `string`             | `string`             |
| `O` _extends_ readonly `unknown`[] | readonly `unknown`[] |

## Properties

| Property                                          | Type                                                                                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-_"></a> `_`                       | `RuleContext`\<`M`, `O`\>                                                                                                                     |
| <a id="property-ast"></a> `ast`                   | `RuleContext`\[`"sourceCode"`\]\[`"ast"`\]                                                                                                    |
| <a id="property-getenvconfig"></a> `getEnvConfig` | () => [`EnvConfig`](../interfaces/EnvConfig.md)                                                                                               |
| <a id="property-getjsxconfig"></a> `getJsxConfig` | () => [`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[`JsxConfig`](../interfaces/JsxConfig.md)\> |
| <a id="property-gettext"></a> `getText`           | `RuleContext`\[`"sourceCode"`\]\[`"getText"`\]                                                                                                |
| <a id="property-hastext"></a> `hasText`           | (`expr`: \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| `string`) => `boolean`           |
| <a id="property-settings"></a> `settings`         | `ESLintReactSettingsNormalized`                                                                                                               |
| <a id="property-src"></a> `src`                   | `RuleContext`\[`"sourceCode"`\]                                                                                                               |

## Methods

### report()

```ts
report(desc: ReportDescriptor<M> | null | undefined): void;
```

#### Parameters

| Parameter | Type                                               |
| --------- | -------------------------------------------------- |
| `desc`    | `ReportDescriptor`\<`M`\> \| `null` \| `undefined` |

#### Returns

`void`
