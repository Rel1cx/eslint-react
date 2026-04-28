# AST Source Code Abbreviation Reference

This document is compiled from naming conventions in AST-related source code, derived from [esbuild](https://github.com/evanw/esbuild).

---

## Table of Contents

- [A](#a)
- [B](#b)
- [C](#c)
- [D](#d)
- [E](#e)
- [F](#f)
- [G](#g)
- [H](#h)
- [I](#i)
- [J](#j)
- [K](#k)
- [L](#l)
- [M](#m)
- [N](#n)
- [O](#o)
- [P](#p)
- [Q](#q)
- [R](#r)
- [S](#s)
- [T](#t)
- [U](#u)
- [V](#v)
- [W](#w)
- [X](#x)
- [Full Table of Abbreviations](#full-table-of-abbreviations)

## A

| Abbreviation           | Full Name                         | Description & Examples                                  |
| ---------------------- | --------------------------------- | ------------------------------------------------------- |
| `AMD`                  | Asynchronous Module Definition    | AMD module specification                                |
| `API`                  | Application Programming Interface | Application programming interface                       |
| `Arg`                  | Argument                          | Function argument, e.g. `Arg ast.Ref`, `Args []Arg`     |
| `Args`                 | Arguments                         | Argument list, e.g. `ECall.Args`, `Fn.Args`             |
| `AST`                  | Abstract Syntax Tree              | Abstract syntax tree, e.g. `AST` struct                 |
| `AtToken`              | At Token                          | CSS `@` rule keyword, e.g. `RAtKeyframes.AtToken`       |
| `Await`                | Await                             | Asynchronous await, e.g. `EAwait`, `SForOf.Await`       |
| `Accessor`             | Accessor                          | Accessor, e.g. `PropertyAutoAccessor`                   |
| `ApproximateLineCount` | Approximate Line Count            | Approximate line count, e.g. `AST.ApproximateLineCount` |

## B

| Abbreviation | Full Name | Description & Examples                                                 |
| ------------ | --------- | ---------------------------------------------------------------------- |
| `B`          | Binding   | Binding type interface prefix, e.g. `BIdentifier`, `BArray`, `BObject` |
| `Base64`     | Base64    | Base64 encoding                                                        |
| `Bin`        | Binary    | Binary operation, e.g. `BinOpAdd`, `BinOpAssign`, `EBinary`            |
| `Bitwise`    | Bitwise   | Bitwise operation, e.g. `BinOpBitwiseOr`                               |
| `Bool`       | Boolean   | Boolean value, e.g. `EBoolean`                                         |
| `Browser`    | Browser   | Browser target environment                                             |
| `Buf`        | Buffer    | Buffer (commonly used in peripheral modules)                           |
| `Bundle`     | Bundle    | Bundle result                                                          |

## C

| Abbreviation    | Full Name              | Description & Examples                                                 |
| --------------- | ---------------------- | ---------------------------------------------------------------------- |
| `CanBe`         | Can Be                 | Capability flag prefix, e.g. `CanBeRemovedIfUnused`                    |
| `Char`          | Character              | Character, e.g. `CharFreq` (character frequency histogram)             |
| `Cfg`           | Configuration          | Configuration (commonly used in peripheral modules)                    |
| `CJS`           | CommonJS               | CommonJS module specification, e.g. `ExportsCommonJS`, `WrapWithToCJS` |
| `Chunk`         | Chunk                  | Code chunk after code splitting                                        |
| `Clone`         | Clone                  | Clone method, e.g. `CloneWithImportRecords`                            |
| `CodeSplitting` | Code Splitting         | Code splitting                                                         |
| `ColumnOffset`  | Column Offset          | Column offset                                                          |
| `Comma`         | Comma                  | Comma operator, e.g. `BinOpComma`, `LComma`                            |
| `Compat`        | Compatibility          | Compatibility, e.g. `compat.JSFeature`                                 |
| `Computed`      | Computed               | Computed property, e.g. `PropertyIsComputed`                           |
| `Const`         | Constant               | Constant, e.g. `ConstValue`, `LocalConst`                              |
| `Cooked`        | Cooked                 | Template string cooked value, e.g. `HeadCooked`                        |
| `Cpl`           | Complement             | Bitwise complement, e.g. `UnOpCpl`                                     |
| `CSS`           | Cascading Style Sheets | Cascading style sheets, e.g. `SymbolGlobalCSS`, `SymbolLocalCSS`       |
| `Ctor`          | Constructor            | Constructor, e.g. `IsTypeScriptCtorField`                              |
| `Curr`          | Current                | Current value (commonly used in iteration variables)                   |

## D

| Abbreviation   | Full Name    | Description & Examples                                                   |
| -------------- | ------------ | ------------------------------------------------------------------------ |
| `D`            | Declaration  | CSS declaration type prefix, e.g. `DUnknown`, `DFlex`, `DColor`          |
| `Data`         | Data         | Generic data field, e.g. `Expr.Data E`, `Stmt.Data S`                    |
| `DataURL`      | Data URL     | Data URL, inline resource                                                |
| `Decl`         | Declaration  | Declaration, e.g. `Decl` struct                                          |
| `Decls`        | Declarations | Declaration list, e.g. `SLocal.Decls`                                    |
| `Dec`          | Decrement    | Decrement, e.g. `UnOpPreDec`, `UnOpPostDec`                              |
| `Decorator`    | Decorator    | Decorator, e.g. `[]Decorator`, `PropertyMethod`                          |
| `Define`       | Define       | Define replacement, e.g. `Define` config                                 |
| `Deno`         | Deno         | Deno runtime                                                             |
| `Dependency`   | Dependency   | Dependency, e.g. `Dependency` struct                                     |
| `Dest` / `Dst` | Destination  | Destination (commonly used in copy/convert operations)                   |
| `Did`          | Did          | Past action flag prefix, e.g. `DidKeepName`, `DidWarnAboutCommonJSInESM` |
| `Dir`          | Directory    | Directory, e.g. `PlatformIndependentPathDirBaseExt`                      |
| `Dbg`          | Debug        | Debug (commonly used in peripheral modules)                              |

## E

| Abbreviation | Full Name         | Description & Examples                                                    |
| ------------ | ----------------- | ------------------------------------------------------------------------- |
| `E`          | Expression        | Expression type interface prefix, e.g. `EArray`, `EBinary`, `EIdentifier` |
| `Enum`       | Enumeration       | Enumeration, e.g. `SEnum`, `EnumValue`, `TSEnum`                          |
| `EOF`        | End of File       | End of file                                                               |
| `Err`        | Error             | Error (commonly used in peripheral modules)                               |
| `ESM`        | ECMAScript Module | ECMAScript module specification, e.g. `ExportsESM`, `WrapWithToESM`       |
| `Expr`       | Expression        | Expression, e.g. `Expr` struct, `SExpr`                                   |
| `Ext`        | Extension         | Extension (commonly used in path handling)                                |
| `External`   | External          | External module, not bundled                                              |

## F

| Abbreviation | Full Name   | Description & Examples                            |
| ------------ | ----------- | ------------------------------------------------- |
| `Feature`    | Feature     | Language feature, e.g. `compat.JSFeature`         |
| `Flags`      | Flags       | Bit flag set, e.g. `SymbolFlags`, `PropertyFlags` |
| `Fn`         | Function    | Function, e.g. `Fn` struct, `SFunction`           |
| `For`        | For         | Loop statement, e.g. `SFor`, `SForIn`, `SForOf`   |
| `Freq`       | Frequency   | Frequency, e.g. `CharFreq` (character frequency)  |
| `FS`         | File System | File system                                       |

## G

| Abbreviation  | Full Name        | Description & Examples                |
| ------------- | ---------------- | ------------------------------------- |
| `Ge`          | Greater or Equal | Greater than or equal, e.g. `BinOpGe` |
| `GlobPattern` | Glob Pattern     | Glob pattern, e.g. `ast.GlobPattern`  |
| `Gt`          | Greater Than     | Greater than, e.g. `BinOpGt`          |

## H

| Abbreviation        | Full Name                 | Description & Examples                                                        |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| `Has`               | Has                       | Property possession flag prefix, e.g. `HasRestArg`, `HasNoSideEffectsComment` |
| `Hash`              | Hash                      | Hash method, e.g. `Hash()`, `HashTokens()`                                    |
| `Hashbang`          | Hashbang                  | Script header shebang, e.g. `AST.Hashbang`                                    |
| `Hoist` / `Hoisted` | Hoist / Hoisted           | Variable hoisting, e.g. `SymbolHoisted`, `ScopeKind.StopsHoisting()`          |
| `HTML`              | HyperText Markup Language | HyperText Markup Language                                                     |

## I

| Abbreviation                 | Full Name                               | Description & Examples                                            |
| ---------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| `IIFE`                       | Immediately Invoked Function Expression | Immediately invoked function expression                           |
| `Ident`                      | Identifier                              | Identifier, e.g. `EIdentifier`, `BIdentifier`                     |
| `Idx`                        | Index                                   | Index, e.g. `InnerIndex`, `SourceIndex`                           |
| `If`                         | If                                      | Condition, e.g. `EIf`, `SIf`                                      |
| `ImportKind`                 | Import Kind                             | Import kind, e.g. `ImportStmt`, `ImportDynamic`                   |
| `ImportPhase`                | Import Phase                            | Import phase, e.g. `EvaluationPhase`, `DeferPhase`, `SourcePhase` |
| `ImportRec` / `ImportRecord` | Import Record                           | Import record, e.g. `ast.ImportRecord`                            |
| `Inc`                        | Increment                               | Increment, e.g. `UnOpPreInc`, `UnOpPostInc`                       |
| `Init`                       | Initializer / Initialize                | Initialization, e.g. `SFor.InitOrNil`                             |
| `Inner`                      | Inner                                   | Inner, e.g. `InnerIndex` (relative to `Outer`/`Source`)           |
| `Instanceof`                 | Instanceof                              | instanceof operator, e.g. `BinOpInstanceof`                       |
| `Is`                         | Is                                      | State flag prefix, e.g. `IsAsync`, `IsExport`, `IsSingleLine`     |

## J

| Abbreviation | Full Name                  | Description & Examples                     |
| ------------ | -------------------------- | ------------------------------------------ |
| `JSON`       | JavaScript Object Notation | JSON data format                           |
| `JSX`        | JavaScript XML             | JSX syntax, e.g. `EJSXElement`, `EJSXText` |

## K

| Abbreviation | Full Name | Description & Examples                                                        |
| ------------ | --------- | ----------------------------------------------------------------------------- |
| `Kind`       | Kind      | Type/kind discriminator field, e.g. `SymbolKind`, `PropertyKind`, `LocalKind` |
| `Kw`         | Keyword   | Keyword, e.g. `AssertOrWithKeyword`                                           |

## L

| Abbreviation   | Full Name            | Description & Examples                                |
| -------------- | -------------------- | ----------------------------------------------------- |
| `L`            | Level                | Precedence level, e.g. `LComma`, `LAssign`, `LPrefix` |
| `Le`           | Less or Equal        | Less than or equal, e.g. `BinOpLe`                    |
| `LegalComment` | Legal Comment        | Legal comment, e.g. `extractedLegalComments`          |
| `Legacy`       | Legacy               | Legacy/deprecated, e.g. `LegacyOctalLoc`              |
| `Len`          | Length               | Length, e.g. `RangeLen`                               |
| `LineOffset`   | Line Offset          | Line offset                                           |
| `Loader`       | Loader               | Loader, determines file handling                      |
| `Loc`          | Location             | Source location, e.g. `logger.Loc`                    |
| `LocRef`       | Location + Reference | Location and reference combination, e.g. `ast.LocRef` |
| `Loose`        | Loose                | Loose equality, e.g. `BinOpLooseEq`, `BinOpLooseNe`   |
| `Lt`           | Less Than            | Less than, e.g. `BinOpLt`                             |

## M

| Abbreviation | Full Name        | Description & Examples                                     |
| ------------ | ---------------- | ---------------------------------------------------------- |
| `Manifest`   | Manifest         | Manifest file                                              |
| `Mangle`     | Mangle           | Name mangling/minification                                 |
| `Max`        | Maximum          | Maximum value                                              |
| `Meta`       | Meta             | Metadata, e.g. `EImportMeta`                               |
| `Metafile`   | Metafile         | Metadata output file                                       |
| `Min`        | Minimum          | Minimum value                                              |
| `Minify`     | Minify           | Code minification                                          |
| `ModuleRef`  | Module Reference | Module reference, e.g. `AST.ModuleRef`                     |
| `ModuleType` | Module Type      | Module type, e.g. `ModuleESM_MJS`, `ModuleCommonJS_CJS`    |
| `Msg`        | Message          | Message (commonly used in peripheral modules)              |
| `MQ`         | Media Query      | CSS media query prefix, e.g. `MQType`, `MQBinary`, `MQNot` |
| `MultiLine`  | Multi-Line       | Multi-line, e.g. `ENew.IsMultiLine`                        |

## N

| Abbreviation  | Full Name            | Description & Examples                          |
| ------------- | -------------------- | ----------------------------------------------- |
| `NaN`         | Not a Number         | Not-a-number value                              |
| `Ne`          | Not Equal            | Not equal, e.g. `BinOpLooseNe`, `BinOpStrictNe` |
| `Nil`         | Nil                  | Nil value (used with `OrNil` suffix)            |
| `Node`        | Node.js              | Node.js runtime                                 |
| `NPM` / `npm` | Node Package Manager | Node package manager                            |
| `NS`          | Namespace            | Namespace, e.g. `TSNamespace`, `NamespaceRef`   |
| `Nullable`    | Nullable             | Nullable, e.g. `NullableChildren`               |
| `Nullish`     | Nullish              | Nullish, e.g. `BinOpNullishCoalescing`          |
| `Num`         | Number               | Number                                          |

## O

| Abbreviation    | Full Name        | Description & Examples                                            |
| --------------- | ---------------- | ----------------------------------------------------------------- |
| `Octal`         | Octal            | Octal, e.g. `LegacyOctalLoc`                                      |
| `Op`            | Operator         | Operator, e.g. `OpCode`, `BinOpAdd`, `UnOpNot`                    |
| `OpCode`        | Operation Code   | Operation code type, e.g. `OpCode uint8`                          |
| `Optional`      | Optional         | Optional, e.g. `OptionalChain`, `ECall.OptionalChain`             |
| `OptionalChain` | Optional Chain   | Optional chaining, e.g. `OptionalChainNone`, `OptionalChainStart` |
| `OrNil`         | Or Nil           | Optional/possibly nil suffix, e.g. `ValueOrNil`, `TestOrNil`      |
| `OS`            | Operating System | Operating system                                                  |
| `Outer`         | Outer            | Outer, e.g. `OuterOpenBraceLoc` (relative to `Inner`)             |

## P

| Abbreviation    | Full Name     | Description & Examples                                                      |
| --------------- | ------------- | --------------------------------------------------------------------------- |
| `Parenthesized` | Parenthesized | Parenthesized, e.g. `EArray.IsParenthesized`                                |
| `Part`          | Part          | AST code part, used for tree shaking and code splitting, e.g. `Part` struct |
| `Platform`      | Platform      | Target platform, e.g. `PlatformBrowser`, `PlatformNode`                     |
| `Pkg`           | Package       | Package (commonly used in path/resolution modules)                          |
| `Plugin`        | Plugin        | Plugin                                                                      |
| `PnP` / `pnp`   | Plug'n'Play   | Yarn PnP resolution strategy                                                |
| `Pos`           | Position      | Position (commonly used in peripheral modules)                              |
| `Pow`           | Power         | Power/exponentiation, e.g. `BinOpPow`                                       |
| `Prev`          | Previous      | Previous                                                                    |
| `Prop`          | Property      | Property, e.g. `Property` struct                                            |
| `Props`         | Properties    | Property list, e.g. `MangledProps`, `ReservedProps`                         |

## Q

| Abbreviation | Full Name | Description & Examples         |
| ------------ | --------- | ------------------------------ |
| `Quoted`     | Quoted    | Quoted, e.g. `PreferQuotedKey` |

## R

| Abbreviation | Full Name          | Description & Examples                                               |
| ------------ | ------------------ | -------------------------------------------------------------------- |
| `R`          | Rule               | CSS rule type prefix, e.g. `RAtCharset`, `RSelector`, `RDeclaration` |
| `Range`      | Range              | Range, e.g. `logger.Range`                                           |
| `Raw`        | Raw                | Raw value, e.g. `TemplatePart.TailRaw`                               |
| `Ref`        | Reference          | Symbol reference, e.g. `ast.Ref`                                     |
| `RegExp`     | Regular Expression | Regular expression, e.g. `ERegExp`                                   |
| `Rem`        | Remainder          | Remainder, e.g. `BinOpRem`                                           |

## S

| Abbreviation  | Full Name                | Description & Examples                                                  |
| ------------- | ------------------------ | ----------------------------------------------------------------------- |
| `S`           | Statement                | Statement type interface prefix, e.g. `SBlock`, `SIf`, `SExpr`          |
| `Scope`       | Scope                    | Scope, e.g. `Scope`, `ScopeKind`                                        |
| `Shl`         | Shift Left               | Left shift, e.g. `BinOpShl`                                             |
| `Should`      | Should                   | Recommendation flag prefix, e.g. `ShouldLowerStandardDecorators`        |
| `Shr`         | Shift Right              | Right shift, e.g. `BinOpShr`, `BinOpUShr` (unsigned right shift)        |
| `Shorthand`   | Shorthand                | Shorthand property, e.g. `PropertyWasShorthand`                         |
| `SideEffect`  | Side Effect              | Side effect, e.g. `HasNoSideEffectsComment`                             |
| `SingleLine`  | Single-Line              | Single line, e.g. `EObject.IsSingleLine`                                |
| `SourceIndex` | Source Index             | Source file index, e.g. `Ref.SourceIndex`                               |
| `SourceMap`   | Source Map               | Source map                                                              |
| `Spread`      | Spread                   | Spread operator, e.g. `ESpread`, `BArray.HasSpread`                     |
| `Src`         | Source                   | Source, e.g. `SourceIndex`                                              |
| `Stderr`      | Standard Error           | Standard error output                                                   |
| `Stdin`       | Standard Input           | Standard input                                                          |
| `Stdout`      | Standard Output          | Standard output                                                         |
| `Stmt`        | Statement                | Statement, e.g. `Stmt` struct                                           |
| `Str`         | String                   | String                                                                  |
| `Strict`      | Strict                   | Strict mode/strict equality, e.g. `BinOpStrictEq`, `ExplicitStrictMode` |
| `StrictNe`    | Strict Not Equal         | Strict not equal, e.g. `BinOpStrictNe`                                  |
| `StrictEq`    | Strict Equal             | Strict equal, e.g. `BinOpStrictEq`                                      |
| `SVG`         | Scalable Vector Graphics | Scalable Vector Graphics                                                |
| `Sym`         | Symbol                   | Symbol, e.g. `Symbol` struct, `SymbolMap`                               |

## T

| Abbreviation  | Full Name          | Description & Examples                                                 |
| ------------- | ------------------ | ---------------------------------------------------------------------- |
| `TagOrNil`    | Tag Or Nil         | Tag (may be nil), e.g. `ETemplate.TagOrNil`                            |
| `Tagged`      | Tagged             | Tagged, e.g. tagged template literal                                   |
| `Target`      | Target             | Target environment/platform, e.g. `JSFeature` target                   |
| `TDZ`         | Temporal Dead Zone | Temporal dead zone (commonly seen in comments)                         |
| `Temp`        | Temporary          | Temporary variable                                                     |
| `Template`    | Template           | Template, e.g. `ETemplate`, `TemplatePart`                             |
| `Text`        | Text               | Text content, e.g. `Token.Text`, `EJSXText.Raw`                        |
| `TopLevel`    | Top-Level          | Top-level, e.g. `TopLevelSymbolToPartsFromParser`                      |
| `TreeShaking` | Tree Shaking       | Tree shaking, dead code elimination                                    |
| `TS`          | TypeScript         | TypeScript-related prefix, e.g. `TSEnum`, `TSNamespace`, `STypeScript` |
| `TSX`         | TypeScript XML     | TSX syntax                                                             |
| `Typeof`      | Typeof             | typeof operator, e.g. `UnOpTypeof`                                     |

## U

| Abbreviation | Full Name                     | Description & Examples                                              |
| ------------ | ----------------------------- | ------------------------------------------------------------------- |
| `U`          | Unsigned                      | Unsigned                                                            |
| `UMD`        | Universal Module Definition   | UMD module specification                                            |
| `Un`         | Unary                         | Unary operation, e.g. `UnOpNeg`, `UnOpNot`, `EUnary`                |
| `UniqueKey`  | Unique Key                    | Unique key, e.g. `ContainsUniqueKey`                                |
| `URL`        | Uniform Resource Locator      | Uniform Resource Locator, e.g. `TURL`, `ImportURL`                  |
| `UShr`       | Unsigned Shift Right          | Unsigned right shift, e.g. `BinOpUShr`                              |
| `Use`        | Use                           | Use flag prefix, e.g. `UseCountEstimate`, `UseDefineForClassFields` |
| `UTF`        | Unicode Transformation Format | Unicode Transformation Format, e.g. `UTF16EqualsString`             |

## V

| Abbreviation | Full Name    | Description & Examples                  |
| ------------ | ------------ | --------------------------------------- |
| `Val`        | Value        | Value                                   |
| `ValueOrNil` | Value Or Nil | Possibly nil value field                |
| `Verbatim`   | Verbatim     | Verbatim, e.g. verbatim whitespace mode |

## W

| Abbreviation    | Full Name         | Description & Examples                                                            |
| --------------- | ----------------- | --------------------------------------------------------------------------------- |
| `Was`           | Was               | Historical state flag prefix, e.g. `WasOriginallyBareImport`, `WasTSImportEquals` |
| `WasOriginally` | Was Originally    | Original form flag, e.g. `WasOriginallyTypeofIdentifier`                          |
| `Watch`         | Watch             | Watch mode                                                                        |
| `WrapperRef`    | Wrapper Reference | Wrapper reference, e.g. `AST.WrapperRef`                                          |

## X

| Abbreviation | Full Name                  | Description & Examples                           |
| ------------ | -------------------------- | ------------------------------------------------ |
| `XML`        | eXtensible Markup Language | eXtensible Markup Language                       |
| `XSS`        | Cross-Site Scripting       | Cross-site scripting (security-related comments) |

## Full Table of Abbreviations

| Abbreviation                 | Full Name                               | Description & Examples                                                            |
| ---------------------------- | --------------------------------------- | --------------------------------------------------------------------------------- |
| `AMD`                        | Asynchronous Module Definition          | AMD module specification                                                          |
| `API`                        | Application Programming Interface       | Application programming interface                                                 |
| `AST`                        | Abstract Syntax Tree                    | Abstract syntax tree, e.g. `AST` struct                                           |
| `Accessor`                   | Accessor                                | Accessor, e.g. `PropertyAutoAccessor`                                             |
| `ApproximateLineCount`       | Approximate Line Count                  | Approximate line count, e.g. `AST.ApproximateLineCount`                           |
| `Arg`                        | Argument                                | Function argument, e.g. `Arg ast.Ref`, `Args []Arg`                               |
| `Args`                       | Arguments                               | Argument list, e.g. `ECall.Args`, `Fn.Args`                                       |
| `AtToken`                    | At Token                                | CSS `@` rule keyword, e.g. `RAtKeyframes.AtToken`                                 |
| `Await`                      | Await                                   | Asynchronous await, e.g. `EAwait`, `SForOf.Await`                                 |
| `B`                          | Binding                                 | Binding type interface prefix, e.g. `BIdentifier`, `BArray`, `BObject`            |
| `Base64`                     | Base64                                  | Base64 encoding                                                                   |
| `Bin`                        | Binary                                  | Binary operation, e.g. `BinOpAdd`, `BinOpAssign`, `EBinary`                       |
| `Bitwise`                    | Bitwise                                 | Bitwise operation, e.g. `BinOpBitwiseOr`                                          |
| `Bool`                       | Boolean                                 | Boolean value, e.g. `EBoolean`                                                    |
| `Browser`                    | Browser                                 | Browser target environment                                                        |
| `Buf`                        | Buffer                                  | Buffer (commonly used in peripheral modules)                                      |
| `Bundle`                     | Bundle                                  | Bundle result                                                                     |
| `CJS`                        | CommonJS                                | CommonJS module specification, e.g. `ExportsCommonJS`, `WrapWithToCJS`            |
| `CSS`                        | Cascading Style Sheets                  | Cascading style sheets, e.g. `SymbolGlobalCSS`, `SymbolLocalCSS`                  |
| `CanBe`                      | Can Be                                  | Capability flag prefix, e.g. `CanBeRemovedIfUnused`                               |
| `Cfg`                        | Configuration                           | Configuration (commonly used in peripheral modules)                               |
| `Char`                       | Character                               | Character, e.g. `CharFreq` (character frequency histogram)                        |
| `Chunk`                      | Chunk                                   | Code chunk after code splitting                                                   |
| `Clone`                      | Clone                                   | Clone method, e.g. `CloneWithImportRecords`                                       |
| `CodeSplitting`              | Code Splitting                          | Code splitting                                                                    |
| `ColumnOffset`               | Column Offset                           | Column offset                                                                     |
| `Comma`                      | Comma                                   | Comma operator, e.g. `BinOpComma`, `LComma`                                       |
| `Compat`                     | Compatibility                           | Compatibility, e.g. `compat.JSFeature`                                            |
| `Computed`                   | Computed                                | Computed property, e.g. `PropertyIsComputed`                                      |
| `Const`                      | Constant                                | Constant, e.g. `ConstValue`, `LocalConst`                                         |
| `Cooked`                     | Cooked                                  | Template string cooked value, e.g. `HeadCooked`                                   |
| `Cpl`                        | Complement                              | Bitwise complement, e.g. `UnOpCpl`                                                |
| `Ctor`                       | Constructor                             | Constructor, e.g. `IsTypeScriptCtorField`                                         |
| `Curr`                       | Current                                 | Current value (commonly used in iteration variables)                              |
| `D`                          | Declaration                             | CSS declaration type prefix, e.g. `DUnknown`, `DFlex`, `DColor`                   |
| `DataURL`                    | Data URL                                | Data URL, inline resource                                                         |
| `Data`                       | Data                                    | Generic data field, e.g. `Expr.Data E`, `Stmt.Data S`                             |
| `Dbg`                        | Debug                                   | Debug (commonly used in peripheral modules)                                       |
| `Dec`                        | Decrement                               | Decrement, e.g. `UnOpPreDec`, `UnOpPostDec`                                       |
| `Decl`                       | Declaration                             | Declaration, e.g. `Decl` struct                                                   |
| `Decls`                      | Declarations                            | Declaration list, e.g. `SLocal.Decls`                                             |
| `Decorator`                  | Decorator                               | Decorator, e.g. `[]Decorator`, `PropertyMethod`                                   |
| `Define`                     | Define                                  | Define replacement, e.g. `Define` config                                          |
| `Deno`                       | Deno                                    | Deno runtime                                                                      |
| `Dependency`                 | Dependency                              | Dependency, e.g. `Dependency` struct                                              |
| `Dest` / `Dst`               | Destination                             | Destination (commonly used in copy/convert operations)                            |
| `Did`                        | Did                                     | Past action flag prefix, e.g. `DidKeepName`, `DidWarnAboutCommonJSInESM`          |
| `Dir`                        | Directory                               | Directory, e.g. `PlatformIndependentPathDirBaseExt`                               |
| `EOF`                        | End of File                             | End of file                                                                       |
| `ESM`                        | ECMAScript Module                       | ECMAScript module specification, e.g. `ExportsESM`, `WrapWithToESM`               |
| `E`                          | Expression                              | Expression type interface prefix, e.g. `EArray`, `EBinary`, `EIdentifier`         |
| `Enum`                       | Enumeration                             | Enumeration, e.g. `SEnum`, `EnumValue`, `TSEnum`                                  |
| `Err`                        | Error                                   | Error (commonly used in peripheral modules)                                       |
| `Expr`                       | Expression                              | Expression, e.g. `Expr` struct, `SExpr`                                           |
| `Ext`                        | Extension                               | Extension (commonly used in path handling)                                        |
| `External`                   | External                                | External module, not bundled                                                      |
| `FS`                         | File System                             | File system                                                                       |
| `Feature`                    | Feature                                 | Language feature, e.g. `compat.JSFeature`                                         |
| `Flags`                      | Flags                                   | Bit flag set, e.g. `SymbolFlags`, `PropertyFlags`                                 |
| `Fn`                         | Function                                | Function, e.g. `Fn` struct, `SFunction`                                           |
| `For`                        | For                                     | Loop statement, e.g. `SFor`, `SForIn`, `SForOf`                                   |
| `Freq`                       | Frequency                               | Frequency, e.g. `CharFreq` (character frequency)                                  |
| `Ge`                         | Greater or Equal                        | Greater than or equal, e.g. `BinOpGe`                                             |
| `GlobPattern`                | Glob Pattern                            | Glob pattern, e.g. `ast.GlobPattern`                                              |
| `Gt`                         | Greater Than                            | Greater than, e.g. `BinOpGt`                                                      |
| `HTML`                       | HyperText Markup Language               | HyperText Markup Language                                                         |
| `Has`                        | Has                                     | Property possession flag prefix, e.g. `HasRestArg`, `HasNoSideEffectsComment`     |
| `Hash`                       | Hash                                    | Hash method, e.g. `Hash()`, `HashTokens()`                                        |
| `Hashbang`                   | Hashbang                                | Script header shebang, e.g. `AST.Hashbang`                                        |
| `Hoist` / `Hoisted`          | Hoist / Hoisted                         | Variable hoisting, e.g. `SymbolHoisted`, `ScopeKind.StopsHoisting()`              |
| `IIFE`                       | Immediately Invoked Function Expression | Immediately invoked function expression                                           |
| `Ident`                      | Identifier                              | Identifier, e.g. `EIdentifier`, `BIdentifier`                                     |
| `Idx`                        | Index                                   | Index, e.g. `InnerIndex`, `SourceIndex`                                           |
| `If`                         | If                                      | Condition, e.g. `EIf`, `SIf`                                                      |
| `ImportKind`                 | Import Kind                             | Import kind, e.g. `ImportStmt`, `ImportDynamic`                                   |
| `ImportPhase`                | Import Phase                            | Import phase, e.g. `EvaluationPhase`, `DeferPhase`, `SourcePhase`                 |
| `ImportRec` / `ImportRecord` | Import Record                           | Import record, e.g. `ast.ImportRecord`                                            |
| `Inc`                        | Increment                               | Increment, e.g. `UnOpPreInc`, `UnOpPostInc`                                       |
| `Init`                       | Initializer / Initialize                | Initialization, e.g. `SFor.InitOrNil`                                             |
| `Inner`                      | Inner                                   | Inner, e.g. `InnerIndex` (relative to `Outer`/`Source`)                           |
| `Instanceof`                 | Instanceof                              | instanceof operator, e.g. `BinOpInstanceof`                                       |
| `Is`                         | Is                                      | State flag prefix, e.g. `IsAsync`, `IsExport`, `IsSingleLine`                     |
| `JSON`                       | JavaScript Object Notation              | JSON data format                                                                  |
| `JSX`                        | JavaScript XML                          | JSX syntax, e.g. `EJSXElement`, `EJSXText`                                        |
| `Kind`                       | Kind                                    | Type/kind discriminator field, e.g. `SymbolKind`, `PropertyKind`, `LocalKind`     |
| `Kw`                         | Keyword                                 | Keyword, e.g. `AssertOrWithKeyword`                                               |
| `L`                          | Level                                   | Precedence level, e.g. `LComma`, `LAssign`, `LPrefix`                             |
| `Le`                         | Less or Equal                           | Less than or equal, e.g. `BinOpLe`                                                |
| `Legacy`                     | Legacy                                  | Legacy/deprecated, e.g. `LegacyOctalLoc`                                          |
| `LegalComment`               | Legal Comment                           | Legal comment, e.g. `extractedLegalComments`                                      |
| `Len`                        | Length                                  | Length, e.g. `RangeLen`                                                           |
| `LineOffset`                 | Line Offset                             | Line offset                                                                       |
| `Loader`                     | Loader                                  | Loader, determines file handling                                                  |
| `LocRef`                     | Location + Reference                    | Location and reference combination, e.g. `ast.LocRef`                             |
| `Loc`                        | Location                                | Source location, e.g. `logger.Loc`                                                |
| `Loose`                      | Loose                                   | Loose equality, e.g. `BinOpLooseEq`, `BinOpLooseNe`                               |
| `Lt`                         | Less Than                               | Less than, e.g. `BinOpLt`                                                         |
| `MQ`                         | Media Query                             | CSS media query prefix, e.g. `MQType`, `MQBinary`, `MQNot`                        |
| `Mangle`                     | Mangle                                  | Name mangling/minification                                                        |
| `Manifest`                   | Manifest                                | Manifest file                                                                     |
| `Max`                        | Maximum                                 | Maximum value                                                                     |
| `Meta`                       | Meta                                    | Metadata, e.g. `EImportMeta`                                                      |
| `Metafile`                   | Metafile                                | Metadata output file                                                              |
| `Min`                        | Minimum                                 | Minimum value                                                                     |
| `Minify`                     | Minify                                  | Code minification                                                                 |
| `ModuleRef`                  | Module Reference                        | Module reference, e.g. `AST.ModuleRef`                                            |
| `ModuleType`                 | Module Type                             | Module type, e.g. `ModuleESM_MJS`, `ModuleCommonJS_CJS`                           |
| `Msg`                        | Message                                 | Message (commonly used in peripheral modules)                                     |
| `MultiLine`                  | Multi-Line                              | Multi-line, e.g. `ENew.IsMultiLine`                                               |
| `NPM` / `npm`                | Node Package Manager                    | Node package manager                                                              |
| `NS`                         | Namespace                               | Namespace, e.g. `TSNamespace`, `NamespaceRef`                                     |
| `NaN`                        | Not a Number                            | Not-a-number value                                                                |
| `Ne`                         | Not Equal                               | Not equal, e.g. `BinOpLooseNe`, `BinOpStrictNe`                                   |
| `Nil`                        | Nil                                     | Nil value (used with `OrNil` suffix)                                              |
| `Node`                       | Node.js                                 | Node.js runtime                                                                   |
| `Nullable`                   | Nullable                                | Nullable, e.g. `NullableChildren`                                                 |
| `Nullish`                    | Nullish                                 | Nullish, e.g. `BinOpNullishCoalescing`                                            |
| `Num`                        | Number                                  | Number                                                                            |
| `OS`                         | Operating System                        | Operating system                                                                  |
| `Octal`                      | Octal                                   | Octal, e.g. `LegacyOctalLoc`                                                      |
| `OpCode`                     | Operation Code                          | Operation code type, e.g. `OpCode uint8`                                          |
| `Op`                         | Operator                                | Operator, e.g. `OpCode`, `BinOpAdd`, `UnOpNot`                                    |
| `OptionalChain`              | Optional Chain                          | Optional chaining, e.g. `OptionalChainNone`, `OptionalChainStart`                 |
| `Optional`                   | Optional                                | Optional, e.g. `OptionalChain`, `ECall.OptionalChain`                             |
| `OrNil`                      | Or Nil                                  | Optional/possibly nil suffix, e.g. `ValueOrNil`, `TestOrNil`                      |
| `Outer`                      | Outer                                   | Outer, e.g. `OuterOpenBraceLoc` (relative to `Inner`)                             |
| `Parenthesized`              | Parenthesized                           | Parenthesized, e.g. `EArray.IsParenthesized`                                      |
| `Part`                       | Part                                    | AST code part, used for tree shaking and code splitting, e.g. `Part` struct       |
| `Pkg`                        | Package                                 | Package (commonly used in path/resolution modules)                                |
| `Platform`                   | Platform                                | Target platform, e.g. `PlatformBrowser`, `PlatformNode`                           |
| `Plugin`                     | Plugin                                  | Plugin                                                                            |
| `PnP` / `pnp`                | Plug'n'Play                             | Yarn PnP resolution strategy                                                      |
| `Pos`                        | Position                                | Position (commonly used in peripheral modules)                                    |
| `Pow`                        | Power                                   | Power/exponentiation, e.g. `BinOpPow`                                             |
| `Prev`                       | Previous                                | Previous                                                                          |
| `Prop`                       | Property                                | Property, e.g. `Property` struct                                                  |
| `Props`                      | Properties                              | Property list, e.g. `MangledProps`, `ReservedProps`                               |
| `Quoted`                     | Quoted                                  | Quoted, e.g. `PreferQuotedKey`                                                    |
| `R`                          | Rule                                    | CSS rule type prefix, e.g. `RAtCharset`, `RSelector`, `RDeclaration`              |
| `Range`                      | Range                                   | Range, e.g. `logger.Range`                                                        |
| `Raw`                        | Raw                                     | Raw value, e.g. `TemplatePart.TailRaw`                                            |
| `Ref`                        | Reference                               | Symbol reference, e.g. `ast.Ref`                                                  |
| `RegExp`                     | Regular Expression                      | Regular expression, e.g. `ERegExp`                                                |
| `Rem`                        | Remainder                               | Remainder, e.g. `BinOpRem`                                                        |
| `SVG`                        | Scalable Vector Graphics                | Scalable Vector Graphics                                                          |
| `S`                          | Statement                               | Statement type interface prefix, e.g. `SBlock`, `SIf`, `SExpr`                    |
| `Scope`                      | Scope                                   | Scope, e.g. `Scope`, `ScopeKind`                                                  |
| `Shl`                        | Shift Left                              | Left shift, e.g. `BinOpShl`                                                       |
| `Shorthand`                  | Shorthand                               | Shorthand property, e.g. `PropertyWasShorthand`                                   |
| `Should`                     | Should                                  | Recommendation flag prefix, e.g. `ShouldLowerStandardDecorators`                  |
| `Shr`                        | Shift Right                             | Right shift, e.g. `BinOpShr`, `BinOpUShr` (unsigned right shift)                  |
| `SideEffect`                 | Side Effect                             | Side effect, e.g. `HasNoSideEffectsComment`                                       |
| `SingleLine`                 | Single-Line                             | Single line, e.g. `EObject.IsSingleLine`                                          |
| `SourceIndex`                | Source Index                            | Source file index, e.g. `Ref.SourceIndex`                                         |
| `SourceMap`                  | Source Map                              | Source map                                                                        |
| `Spread`                     | Spread                                  | Spread operator, e.g. `ESpread`, `BArray.HasSpread`                               |
| `Src`                        | Source                                  | Source, e.g. `SourceIndex`                                                        |
| `Stderr`                     | Standard Error                          | Standard error output                                                             |
| `Stdin`                      | Standard Input                          | Standard input                                                                    |
| `Stdout`                     | Standard Output                         | Standard output                                                                   |
| `Stmt`                       | Statement                               | Statement, e.g. `Stmt` struct                                                     |
| `Str`                        | String                                  | String                                                                            |
| `StrictEq`                   | Strict Equal                            | Strict equal, e.g. `BinOpStrictEq`                                                |
| `StrictNe`                   | Strict Not Equal                        | Strict not equal, e.g. `BinOpStrictNe`                                            |
| `Strict`                     | Strict                                  | Strict mode/strict equality, e.g. `BinOpStrictEq`, `ExplicitStrictMode`           |
| `Sym`                        | Symbol                                  | Symbol, e.g. `Symbol` struct, `SymbolMap`                                         |
| `TDZ`                        | Temporal Dead Zone                      | Temporal dead zone (commonly seen in comments)                                    |
| `TSX`                        | TypeScript XML                          | TSX syntax                                                                        |
| `TS`                         | TypeScript                              | TypeScript-related prefix, e.g. `TSEnum`, `TSNamespace`, `STypeScript`            |
| `TagOrNil`                   | Tag Or Nil                              | Tag (may be nil), e.g. `ETemplate.TagOrNil`                                       |
| `Tagged`                     | Tagged                                  | Tagged, e.g. tagged template literal                                              |
| `Target`                     | Target                                  | Target environment/platform, e.g. `JSFeature` target                              |
| `Temp`                       | Temporary                               | Temporary variable                                                                |
| `Template`                   | Template                                | Template, e.g. `ETemplate`, `TemplatePart`                                        |
| `Text`                       | Text                                    | Text content, e.g. `Token.Text`, `EJSXText.Raw`                                   |
| `TopLevel`                   | Top-Level                               | Top-level, e.g. `TopLevelSymbolToPartsFromParser`                                 |
| `TreeShaking`                | Tree Shaking                            | Tree shaking, dead code elimination                                               |
| `Typeof`                     | Typeof                                  | typeof operator, e.g. `UnOpTypeof`                                                |
| `UMD`                        | Universal Module Definition             | UMD module specification                                                          |
| `URL`                        | Uniform Resource Locator                | Uniform Resource Locator, e.g. `TURL`, `ImportURL`                                |
| `UShr`                       | Unsigned Shift Right                    | Unsigned right shift, e.g. `BinOpUShr`                                            |
| `UTF`                        | Unicode Transformation Format           | Unicode Transformation Format, e.g. `UTF16EqualsString`                           |
| `U`                          | Unsigned                                | Unsigned                                                                          |
| `Un`                         | Unary                                   | Unary operation, e.g. `UnOpNeg`, `UnOpNot`, `EUnary`                              |
| `UniqueKey`                  | Unique Key                              | Unique key, e.g. `ContainsUniqueKey`                                              |
| `Use`                        | Use                                     | Use flag prefix, e.g. `UseCountEstimate`, `UseDefineForClassFields`               |
| `Val`                        | Value                                   | Value                                                                             |
| `ValueOrNil`                 | Value Or Nil                            | Possibly nil value field                                                          |
| `Verbatim`                   | Verbatim                                | Verbatim, e.g. verbatim whitespace mode                                           |
| `WasOriginally`              | Was Originally                          | Original form flag, e.g. `WasOriginallyTypeofIdentifier`                          |
| `Was`                        | Was                                     | Historical state flag prefix, e.g. `WasOriginallyBareImport`, `WasTSImportEquals` |
| `Watch`                      | Watch                                   | Watch mode                                                                        |
| `WrapperRef`                 | Wrapper Reference                       | Wrapper reference, e.g. `AST.WrapperRef`                                          |
| `XML`                        | eXtensible Markup Language              | eXtensible Markup Language                                                        |
| `XSS`                        | Cross-Site Scripting                    | Cross-site scripting (security-related comments)                                  |
