[@eslint-react/shared](../README.md) / getSettingsFromContext

# Function: getSettingsFromContext()

```ts
function getSettingsFromContext(context: RuleContext): ESLintReactSettingsNormalized;
```

Retrieves normalized ESLint React settings from the rule context
Uses caching for performance optimization

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`RuleContext`](../type-aliases/RuleContext.md) | The ESLint rule context |

## Returns

[`ESLintReactSettingsNormalized`](../interfaces/ESLintReactSettingsNormalized.md)
