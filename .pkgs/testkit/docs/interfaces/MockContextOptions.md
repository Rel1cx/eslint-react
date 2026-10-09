[@local/testkit](../README.md) / MockContextOptions

# Interface: MockContextOptions

## Properties

| Property                               | Type                   | Description                                                            |
| -------------------------------------- | ---------------------- | ---------------------------------------------------------------------- |
| <a id="property-code"></a> `code?`     | `string`               | Source text used to implement `sourceCode.getText` by range slicing.   |
| <a id="property-parsed"></a> `parsed?` | `ParseForESLintResult` | Result of `parseCode`; used to implement a real `sourceCode.getScope`. |
