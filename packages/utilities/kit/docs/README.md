# @eslint-react/kit

## Interfaces

| Interface | Description |
| ------ | ------ |
| [Collector](interfaces/Collector.md) | The return type of a collector — a query API paired with an AST visitor. |
| [CollectorWithContext](interfaces/CollectorWithContext.md) | An extended collector that also provides access to the current traversal context. Useful for rules that need to inspect which component or hook the traversal is currently inside. |
| [FunctionComponentSemanticNode](interfaces/FunctionComponentSemanticNode.md) | Represents a React Function Component |
| [HookSemanticNode](interfaces/HookSemanticNode.md) | Represents a semantic hook node in the AST This interface extends SemanticNode and provides additional properties for React hook analysis |
| [Kit](interfaces/Kit.md) | - |
| [SemanticNode](interfaces/SemanticNode.md) | Represents a semantic node in the AST This is the base interface for all semantic nodes in the React semantic analysis |

## Functions

| Function | Description |
| ------ | ------ |
| [defineConfig](functions/defineConfig.md) | Creates an ESLint flat-config object from one or more custom rule definitions. |
| [merge](functions/merge.md) | Merges multiple RuleListener (visitor) objects into a single listener. |
