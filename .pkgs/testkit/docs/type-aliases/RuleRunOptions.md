[@local/testkit](../README.md) / RuleRunOptions

# Type Alias: RuleRunOptions

```ts
type RuleRunOptions = Pick<ParseCodeOptions, "filePath" | "jsx" | "sourceType">;
```

Parser-facing options for the rule-channel helpers. `filePath` is passed
to `Linter#verify` as the filename (a `.ts` name disables TSX parsing),
`jsx` toggles JSX in `parserOptions`, and `sourceType` maps to
`parserOptions.sourceType`.
