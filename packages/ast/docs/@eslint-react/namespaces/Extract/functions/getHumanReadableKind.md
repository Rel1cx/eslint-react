[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getHumanReadableKind

# Function: getHumanReadableKind()

```ts
function getHumanReadableKind(node: Node): 
  | "property"
  | "regexp literal"
  | "null literal"
  | "string literal"
  | "number literal"
  | "bigint literal"
  | "boolean literal"
  | "symbol literal"
  | "undefined literal"
  | "object literal"
  | "function literal"
  | "decorator"
  | "identifier"
  | "program"
  | "super"
  | "accessor property"
  | "array expression"
  | "array pattern"
  | "function expression"
  | "arrow function expression"
  | "assignment expression"
  | "assignment pattern"
  | "await expression"
  | "binary expression"
  | "block statement"
  | "break statement"
  | "call expression"
  | "catch clause"
  | "chain expression"
  | "class body"
  | "class declaration"
  | "class expression"
  | "conditional expression"
  | "continue statement"
  | "debugger statement"
  | "while statement"
  | "do while statement"
  | "empty statement"
  | "export all declaration"
  | "export default declaration"
  | "export named declaration"
  | "export specifier"
  | "expression statement"
  | "for in statement"
  | "for of statement"
  | "for statement"
  | "function declaration"
  | "if statement"
  | "import attribute"
  | "import declaration"
  | "import default specifier"
  | "import expression"
  | "import namespace specifier"
  | "import specifier"
  | "jsx attribute"
  | "jsx closing element"
  | "jsx closing fragment"
  | "jsx element"
  | "jsx empty expression"
  | "jsx expression container"
  | "jsx fragment"
  | "jsx identifier"
  | "member expression"
  | "jsx member expression"
  | "jsx namespaced name"
  | "jsx opening element"
  | "jsx opening fragment"
  | "jsx spread attribute"
  | "jsx spread child"
  | "jsx text"
  | "labeled statement"
  | "logical expression"
  | "meta property"
  | "method definition"
  | "new expression"
  | "object expression"
  | "object pattern"
  | "private identifier"
  | "property definition"
  | "rest element"
  | "return statement"
  | "sequence expression"
  | "spread element"
  | "static block"
  | "switch case"
  | "switch statement"
  | "tagged template expression"
  | "template element"
  | "template literal"
  | "this expression"
  | "throw statement"
  | "try statement"
  | "unary expression"
  | "update expression"
  | "variable declaration"
  | "variable declarator"
  | "with statement"
  | "yield expression"
  | "ts abstract accessor property"
  | "ts abstract keyword"
  | "ts abstract method definition"
  | "ts abstract property definition"
  | "ts any keyword"
  | "ts array type"
  | "ts as expression"
  | "ts async keyword"
  | "ts big int keyword"
  | "ts boolean keyword"
  | "ts call signature declaration"
  | "ts class implements"
  | "ts conditional type"
  | "ts constructor type"
  | "ts construct signature declaration"
  | "ts declare function"
  | "ts declare keyword"
  | "ts empty body function expression"
  | "ts enum body"
  | "ts enum declaration"
  | "ts enum member"
  | "ts export assignment"
  | "ts export keyword"
  | "ts external module reference"
  | "ts function type"
  | "ts import equals declaration"
  | "ts import type"
  | "ts indexed access type"
  | "ts index signature"
  | "ts infer type"
  | "ts instantiation expression"
  | "ts interface body"
  | "ts interface declaration"
  | "ts interface heritage"
  | "ts intersection type"
  | "ts intrinsic keyword"
  | "ts literal type"
  | "ts mapped type"
  | "ts method signature"
  | "ts module block"
  | "ts module declaration"
  | "ts named tuple member"
  | "ts namespace export declaration"
  | "ts never keyword"
  | "ts non null expression"
  | "ts null keyword"
  | "ts number keyword"
  | "ts object keyword"
  | "ts optional type"
  | "ts parameter property"
  | "ts private keyword"
  | "ts property signature"
  | "ts protected keyword"
  | "ts public keyword"
  | "ts qualified name"
  | "ts readonly keyword"
  | "ts rest type"
  | "ts satisfies expression"
  | "ts static keyword"
  | "ts string keyword"
  | "ts symbol keyword"
  | "ts template literal type"
  | "ts this type"
  | "ts tuple type"
  | "ts type alias declaration"
  | "ts type annotation"
  | "ts type assertion"
  | "ts type literal"
  | "ts type operator"
  | "ts type parameter"
  | "ts type parameter declaration"
  | "ts type parameter instantiation"
  | "ts type predicate"
  | "ts type query"
  | "ts type reference"
  | "ts undefined keyword"
  | "ts union type"
  | "ts unknown keyword"
  | "ts void keyword";
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |

## Returns

  \| `"property"`
  \| `"regexp literal"`
  \| `"null literal"`
  \| `"string literal"`
  \| `"number literal"`
  \| `"bigint literal"`
  \| `"boolean literal"`
  \| `"symbol literal"`
  \| `"undefined literal"`
  \| `"object literal"`
  \| `"function literal"`
  \| `"decorator"`
  \| `"identifier"`
  \| `"program"`
  \| `"super"`
  \| `"accessor property"`
  \| `"array expression"`
  \| `"array pattern"`
  \| `"function expression"`
  \| `"arrow function expression"`
  \| `"assignment expression"`
  \| `"assignment pattern"`
  \| `"await expression"`
  \| `"binary expression"`
  \| `"block statement"`
  \| `"break statement"`
  \| `"call expression"`
  \| `"catch clause"`
  \| `"chain expression"`
  \| `"class body"`
  \| `"class declaration"`
  \| `"class expression"`
  \| `"conditional expression"`
  \| `"continue statement"`
  \| `"debugger statement"`
  \| `"while statement"`
  \| `"do while statement"`
  \| `"empty statement"`
  \| `"export all declaration"`
  \| `"export default declaration"`
  \| `"export named declaration"`
  \| `"export specifier"`
  \| `"expression statement"`
  \| `"for in statement"`
  \| `"for of statement"`
  \| `"for statement"`
  \| `"function declaration"`
  \| `"if statement"`
  \| `"import attribute"`
  \| `"import declaration"`
  \| `"import default specifier"`
  \| `"import expression"`
  \| `"import namespace specifier"`
  \| `"import specifier"`
  \| `"jsx attribute"`
  \| `"jsx closing element"`
  \| `"jsx closing fragment"`
  \| `"jsx element"`
  \| `"jsx empty expression"`
  \| `"jsx expression container"`
  \| `"jsx fragment"`
  \| `"jsx identifier"`
  \| `"member expression"`
  \| `"jsx member expression"`
  \| `"jsx namespaced name"`
  \| `"jsx opening element"`
  \| `"jsx opening fragment"`
  \| `"jsx spread attribute"`
  \| `"jsx spread child"`
  \| `"jsx text"`
  \| `"labeled statement"`
  \| `"logical expression"`
  \| `"meta property"`
  \| `"method definition"`
  \| `"new expression"`
  \| `"object expression"`
  \| `"object pattern"`
  \| `"private identifier"`
  \| `"property definition"`
  \| `"rest element"`
  \| `"return statement"`
  \| `"sequence expression"`
  \| `"spread element"`
  \| `"static block"`
  \| `"switch case"`
  \| `"switch statement"`
  \| `"tagged template expression"`
  \| `"template element"`
  \| `"template literal"`
  \| `"this expression"`
  \| `"throw statement"`
  \| `"try statement"`
  \| `"unary expression"`
  \| `"update expression"`
  \| `"variable declaration"`
  \| `"variable declarator"`
  \| `"with statement"`
  \| `"yield expression"`
  \| `"ts abstract accessor property"`
  \| `"ts abstract keyword"`
  \| `"ts abstract method definition"`
  \| `"ts abstract property definition"`
  \| `"ts any keyword"`
  \| `"ts array type"`
  \| `"ts as expression"`
  \| `"ts async keyword"`
  \| `"ts big int keyword"`
  \| `"ts boolean keyword"`
  \| `"ts call signature declaration"`
  \| `"ts class implements"`
  \| `"ts conditional type"`
  \| `"ts constructor type"`
  \| `"ts construct signature declaration"`
  \| `"ts declare function"`
  \| `"ts declare keyword"`
  \| `"ts empty body function expression"`
  \| `"ts enum body"`
  \| `"ts enum declaration"`
  \| `"ts enum member"`
  \| `"ts export assignment"`
  \| `"ts export keyword"`
  \| `"ts external module reference"`
  \| `"ts function type"`
  \| `"ts import equals declaration"`
  \| `"ts import type"`
  \| `"ts indexed access type"`
  \| `"ts index signature"`
  \| `"ts infer type"`
  \| `"ts instantiation expression"`
  \| `"ts interface body"`
  \| `"ts interface declaration"`
  \| `"ts interface heritage"`
  \| `"ts intersection type"`
  \| `"ts intrinsic keyword"`
  \| `"ts literal type"`
  \| `"ts mapped type"`
  \| `"ts method signature"`
  \| `"ts module block"`
  \| `"ts module declaration"`
  \| `"ts named tuple member"`
  \| `"ts namespace export declaration"`
  \| `"ts never keyword"`
  \| `"ts non null expression"`
  \| `"ts null keyword"`
  \| `"ts number keyword"`
  \| `"ts object keyword"`
  \| `"ts optional type"`
  \| `"ts parameter property"`
  \| `"ts private keyword"`
  \| `"ts property signature"`
  \| `"ts protected keyword"`
  \| `"ts public keyword"`
  \| `"ts qualified name"`
  \| `"ts readonly keyword"`
  \| `"ts rest type"`
  \| `"ts satisfies expression"`
  \| `"ts static keyword"`
  \| `"ts string keyword"`
  \| `"ts symbol keyword"`
  \| `"ts template literal type"`
  \| `"ts this type"`
  \| `"ts tuple type"`
  \| `"ts type alias declaration"`
  \| `"ts type annotation"`
  \| `"ts type assertion"`
  \| `"ts type literal"`
  \| `"ts type operator"`
  \| `"ts type parameter"`
  \| `"ts type parameter declaration"`
  \| `"ts type parameter instantiation"`
  \| `"ts type predicate"`
  \| `"ts type query"`
  \| `"ts type reference"`
  \| `"ts undefined keyword"`
  \| `"ts union type"`
  \| `"ts unknown keyword"`
  \| `"ts void keyword"`
