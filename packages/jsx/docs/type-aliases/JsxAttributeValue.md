[@eslint-react/jsx](../README.md) / JsxAttributeValue

# Type Alias: JsxAttributeValue

```ts
type JsxAttributeValue =
  | JsxAttributeValueBoolean
  | JsxAttributeValueElement
  | JsxAttributeValueLiteral
  | JsxAttributeValueUnknown
  | JsxAttributeValueMissing
  | JsxAttributeValueSpreadChild
  | JsxAttributeValueSpreadProps;
```

Discriminated union representing the resolved value of a JSX attribute

Each variant carries the original AST `node` (where applicable) and a
`toStatic()` helper that attempts to collapse the value into a plain
JavaScript value at analysis time.
