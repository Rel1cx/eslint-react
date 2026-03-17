# @eslint-react/kit

## Interfaces

| Interface | Description |
| ------ | ------ |
| [Collector](interfaces/Collector.md) | The return type of a collector — a query API paired with an AST visitor. |
| [Kit](interfaces/Kit.md) | A structured core passed as the second argument to a rule's `make` function. Members are organized by domain rather than presented as a flat namespace. |

## Functions

| Function | Description |
| ------ | ------ |
| [default](functions/default.md) | Creates an ESLint flat-config object from one or more custom rule definitions. |
| [merge](functions/merge.md) | Merges multiple RuleListener (visitor) objects into a single listener. |
