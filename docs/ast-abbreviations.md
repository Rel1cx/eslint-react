# AST Source Code Abbreviation Reference

Abbreviations used in AST-related source code, derived from [esbuild](https://github.com/evanw/esbuild).

| Abbreviation           | Full Name                               | Description & Examples                                                    |
| ---------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| `AMD`                  | Asynchronous Module Definition          | AMD module specification                                                  |
| `AST`                  | Abstract Syntax Tree                    | Abstract syntax tree, e.g. `AST` struct                                   |
| `Accessor`             | Accessor                                | Accessor, e.g. `PropertyAutoAccessor`                                     |
| `ApproximateLineCount` | Approximate Line Count                  | Approximate line count, e.g. `AST.ApproximateLineCount`                   |
| `Arg`                  | Argument                                | Function argument, e.g. `Arg ast.Ref`, `Args []Arg`                       |
| `Args`                 | Arguments                               | Argument list, e.g. `ECall.Args`, `Fn.Args`                               |
| `AtToken`              | At Token                                | CSS `@` rule keyword, e.g. `RAtKeyframes.AtToken`                         |
| `B`                    | Binding                                 | Binding type interface prefix, e.g. `BIdentifier`, `BArray`, `BObject`    |
| `Bin`                  | Binary                                  | Binary operation, e.g. `BinOpAdd`, `BinOpAssign`, `EBinary`               |
| `Bool`                 | Boolean                                 | Boolean value, e.g. `EBoolean`                                            |
| `Buf`                  | Buffer                                  | Buffer (commonly used in peripheral modules)                              |
| `CJS`                  | CommonJS                                | CommonJS module specification, e.g. `ExportsCommonJS`, `WrapWithToCJS`    |
| `Cfg`                  | Configuration                           | Configuration (commonly used in peripheral modules)                       |
| `Cpl`                  | Complement                              | Bitwise complement, e.g. `UnOpCpl`                                        |
| `Ctor`                 | Constructor                             | Constructor, e.g. `IsTypeScriptCtorField`                                 |
| `Curr`                 | Current                                 | Current value (commonly used in iteration variables)                      |
| `D`                    | Declaration                             | CSS declaration type prefix, e.g. `DUnknown`, `DFlex`, `DColor`           |
| `Dbg`                  | Debug                                   | Debug (commonly used in peripheral modules)                               |
| `Decl`                 | Declaration                             | Declaration, e.g. `Decl` struct                                           |
| `Decls`                | Declarations                            | Declaration list, e.g. `SLocal.Decls`                                     |
| `EOF`                  | End of File                             | End of file                                                               |
| `ESM`                  | ECMAScript Module                       | ECMAScript module specification, e.g. `ExportsESM`, `WrapWithToESM`       |
| `E`                    | Expression                              | Expression type interface prefix, e.g. `EArray`, `EBinary`, `EIdentifier` |
| `Enum`                 | Enumeration                             | Enumeration, e.g. `SEnum`, `EnumValue`, `TSEnum`                          |
| `Expr`                 | Expression                              | Expression, e.g. `Expr` struct, `SExpr`                                   |
| `Fn`                   | Function                                | Function, e.g. `Fn` struct, `SFunction`                                   |
| `Freq`                 | Frequency                               | Frequency, e.g. `CharFreq` (character frequency)                          |
| `IIFE`                 | Immediately Invoked Function Expression | Immediately invoked function expression                                   |
| `Ident`                | Identifier                              | Identifier, e.g. `EIdentifier`, `BIdentifier`                             |
| `Idx`                  | Index                                   | Index, e.g. `InnerIndex`, `SourceIndex`                                   |
| `Init`                 | Initializer / Initialize                | Initialization, e.g. `SFor.InitOrNil`                                     |
| `Kw`                   | Keyword                                 | Keyword, e.g. `AssertOrWithKeyword`                                       |
| `Len`                  | Length                                  | Length, e.g. `RangeLen`                                                   |
| `Loc`                  | Location                                | Source location, e.g. `logger.Loc`                                        |
| `Msg`                  | Message                                 | Message (commonly used in peripheral modules)                             |
| `NS`                   | Namespace                               | Namespace, e.g. `TSNamespace`, `NamespaceRef`                             |
| `Op`                   | Operator                                | Operator, e.g. `OpCode`, `BinOpAdd`, `UnOpNot`                            |
| `Outer`                | Outer                                   | Outer, e.g. `OuterOpenBraceLoc` (relative to `Inner`)                     |
| `Pkg`                  | Package                                 | Package (commonly used in path/resolution modules)                        |
| `Pos`                  | Position                                | Position (commonly used in peripheral modules)                            |
| `Prev`                 | Previous                                | Previous                                                                  |
| `Prop`                 | Property                                | Property, e.g. `Property` struct                                          |
| `Props`                | Properties                              | Property list, e.g. `MangledProps`, `ReservedProps`                       |
| `Ref`                  | Reference                               | Symbol reference, e.g. `ast.Ref`                                          |
| `Stmt`                 | Statement                               | Statement, e.g. `Stmt` struct                                             |
| `Str`                  | String                                  | String                                                                    |
| `Sym`                  | Symbol                                  | Symbol, e.g. `Symbol` struct, `SymbolMap`                                 |
| `TDZ`                  | Temporal Dead Zone                      | Temporal dead zone (commonly seen in comments)                            |
| `TopLevel`             | Top-Level                               | Top-level, e.g. `TopLevelSymbolToPartsFromParser`                         |
| `UMD`                  | Universal Module Definition             | UMD module specification                                                  |
| `Val`                  | Value                                   | Value                                                                     |
