[@local/testkit](../README.md) / lintWithConfig

# Function: lintWithConfig()

```ts
function lintWithConfig(
  config: Config<RulesConfig> | Config<RulesConfig>[],
  patterns: string[],
  cwd?: string,
): Promise<LintResult[]>;
```

## Parameters

| Parameter  | Type                                                     |
| ---------- | -------------------------------------------------------- |
| `config`   | `Config`\<`RulesConfig`\> \| `Config`\<`RulesConfig`\>[] |
| `patterns` | `string`[]                                               |
| `cwd`      | `string`                                                 |

## Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`LintResult`[]\>
