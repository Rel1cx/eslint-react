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

| Abbreviation           | Full Name                         | Description & Examples                                      |
| ---------------------- | --------------------------------- | ----------------------------------------------------------- |
| `AMD`                  | Asynchronous Module Definition    | AMD module specification                                    |
| `API`                  | Application Programming Interface | Application programming interface                           |
| `Arg`                  | Argument                          | Function argument, Example: `Arg ast.Ref`, `Args []Arg`     |
| `Args`                 | Arguments                         | Argument list, Example: `ECall.Args`, `Fn.Args`             |
| `AST`                  | Abstract Syntax Tree              | Abstract syntax tree, Example: `AST` struct                 |
| `AtToken`              | At Token                          | CSS `@` rule keyword, Example: `RAtKeyframes.AtToken`       |
| `Await`                | Await                             | Asynchronous await, Example: `EAwait`, `SForOf.Await`       |
| `Accessor`             | Accessor                          | Accessor, Example: `PropertyAutoAccessor`                   |
| `ApproximateLineCount` | Approximate Line Count            | Approximate line count, Example: `AST.ApproximateLineCount` |

## B

| Abbreviation | Full Name | Description & Examples                                                     |
| ------------ | --------- | -------------------------------------------------------------------------- |
| `B`          | Binding   | Binding type interface prefix, Example: `BIdentifier`, `BArray`, `BObject` |
| `Base64`     | Base64    | Base64 encoding                                                            |
| `Bin`        | Binary    | Binary operation, Example: `BinOpAdd`, `BinOpAssign`, `EBinary`            |
| `Bitwise`    | Bitwise   | Bitwise operation, Example: `BinOpBitwiseOr`                               |
| `Bool`       | Boolean   | Boolean value, Example: `EBoolean`                                         |
| `Browser`    | Browser   | Browser target environment                                                 |
| `Buf`        | Buffer    | Buffer (commonly used in peripheral modules)                               |
| `Bundle`     | Bundle    | Bundle result                                                              |

## C

| Abbreviation    | Full Name              | Description & Examples                                                     |
| --------------- | ---------------------- | -------------------------------------------------------------------------- |
| `CanBe`         | Can Be                 | Capability flag prefix, Example: `CanBeRemovedIfUnused`                    |
| `Char`          | Character              | Character, Example: `CharFreq` (character frequency histogram)             |
| `Cfg`           | Configuration          | Configuration (commonly used in peripheral modules)                        |
| `CJS`           | CommonJS               | CommonJS module specification, Example: `ExportsCommonJS`, `WrapWithToCJS` |
| `Chunk`         | Chunk                  | Code chunk after code splitting                                            |
| `Clone`         | Clone                  | Clone method, Example: `CloneWithImportRecords`                            |
| `CodeSplitting` | Code Splitting         | Code splitting                                                             |
| `ColumnOffset`  | Column Offset          | Column offset                                                              |
| `Comma`         | Comma                  | Comma operator, Example: `BinOpComma`, `LComma`                            |
| `Compat`        | Compatibility          | Compatibility, Example: `compat.JSFeature`                                 |
| `Computed`      | Computed               | Computed property, Example: `PropertyIsComputed`                           |
| `Const`         | Constant               | Constant, Example: `ConstValue`, `LocalConst`                              |
| `Cooked`        | Cooked                 | Template string cooked value, Example: `HeadCooked`                        |
| `Cpl`           | Complement             | Bitwise complement, Example: `UnOpCpl`                                     |
| `CSS`           | Cascading Style Sheets | Cascading style sheets, Example: `SymbolGlobalCSS`, `SymbolLocalCSS`       |
| `Ctor`          | Constructor            | Constructor, Example: `IsTypeScriptCtorField`                              |
| `Curr`          | Current                | Current value (commonly used in iteration variables)                       |

## D

| Abbreviation   | Full Name    | Description & Examples                                                       |
| -------------- | ------------ | ---------------------------------------------------------------------------- |
| `D`            | Declaration  | CSS declaration type prefix, Example: `DUnknown`, `DFlex`, `DColor`          |
| `Data`         | Data         | Generic data field, Example: `Expr.Data E`, `Stmt.Data S`                    |
| `DataURL`      | Data URL     | Data URL, inline resource                                                    |
| `Decl`         | Declaration  | Declaration, Example: `Decl` struct                                          |
| `Decls`        | Declarations | Declaration list, Example: `SLocal.Decls`                                    |
| `Dec`          | Decrement    | Decrement, Example: `UnOpPreDec`, `UnOpPostDec`                              |
| `Decorator`    | Decorator    | Decorator, Example: `[]Decorator`, `PropertyMethod`                          |
| `Define`       | Define       | Define replacement, Example: `Define` config                                 |
| `Deno`         | Deno         | Deno runtime                                                                 |
| `Dependency`   | Dependency   | Dependency, Example: `Dependency` struct                                     |
| `Dest` / `Dst` | Destination  | Destination (commonly used in copy/convert operations)                       |
| `Did`          | Did          | Past action flag prefix, Example: `DidKeepName`, `DidWarnAboutCommonJSInESM` |
| `Dir`          | Directory    | Directory, Example: `PlatformIndependentPathDirBaseExt`                      |
| `Dbg`          | Debug        | Debug (commonly used in peripheral modules)                                  |

## E

| Abbreviation | Full Name         | Description & Examples                                                        |
| ------------ | ----------------- | ----------------------------------------------------------------------------- |
| `E`          | Expression        | Expression type interface prefix, Example: `EArray`, `EBinary`, `EIdentifier` |
| `Enum`       | Enumeration       | Enumeration, Example: `SEnum`, `EnumValue`, `TSEnum`                          |
| `EOF`        | End of File       | End of file                                                                   |
| `Err`        | Error             | Error (commonly used in peripheral modules)                                   |
| `ESM`        | ECMAScript Module | ECMAScript module specification, Example: `ExportsESM`, `WrapWithToESM`       |
| `Expr`       | Expression        | Expression, Example: `Expr` struct, `SExpr`                                   |
| `Ext`        | Extension         | Extension (commonly used in path handling)                                    |
| `External`   | External          | External module, not bundled                                                  |

## F

| Abbreviation | Full Name   | Description & Examples                                |
| ------------ | ----------- | ----------------------------------------------------- |
| `Feature`    | Feature     | Language feature, Example: `compat.JSFeature`         |
| `Flags`      | Flags       | Bit flag set, Example: `SymbolFlags`, `PropertyFlags` |
| `Fn`         | Function    | Function, Example: `Fn` struct, `SFunction`           |
| `For`        | For         | Loop statement, Example: `SFor`, `SForIn`, `SForOf`   |
| `Freq`       | Frequency   | Frequency, Example: `CharFreq` (character frequency)  |
| `FS`         | File System | File system                                           |

## G

| Abbreviation  | Full Name        | Description & Examples                    |
| ------------- | ---------------- | ----------------------------------------- |
| `Ge`          | Greater or Equal | Greater than or equal, Example: `BinOpGe` |
| `GlobPattern` | Glob Pattern     | Glob pattern, Example: `ast.GlobPattern`  |
| `Gt`          | Greater Than     | Greater than, Example: `BinOpGt`          |

## H

| Abbreviation        | Full Name                 | Description & Examples                                                            |
| ------------------- | ------------------------- | --------------------------------------------------------------------------------- |
| `Has`               | Has                       | Property possession flag prefix, Example: `HasRestArg`, `HasNoSideEffectsComment` |
| `Hash`              | Hash                      | Hash method, Example: `Hash()`, `HashTokens()`                                    |
| `Hashbang`          | Hashbang                  | Script header shebang, Example: `AST.Hashbang`                                    |
| `Hoist` / `Hoisted` | Hoist / Hoisted           | Variable hoisting, Example: `SymbolHoisted`, `ScopeKind.StopsHoisting()`          |
| `HTML`              | HyperText Markup Language | HyperText Markup Language                                                         |

## I

| Abbreviation                 | Full Name                               | Description & Examples                                                |
| ---------------------------- | --------------------------------------- | --------------------------------------------------------------------- |
| `IIFE`                       | Immediately Invoked Function Expression | Immediately invoked function expression                               |
| `Ident`                      | Identifier                              | Identifier, Example: `EIdentifier`, `BIdentifier`                     |
| `Idx`                        | Index                                   | Index, Example: `InnerIndex`, `SourceIndex`                           |
| `If`                         | If                                      | Condition, Example: `EIf`, `SIf`                                      |
| `ImportKind`                 | Import Kind                             | Import kind, Example: `ImportStmt`, `ImportDynamic`                   |
| `ImportPhase`                | Import Phase                            | Import phase, Example: `EvaluationPhase`, `DeferPhase`, `SourcePhase` |
| `ImportRec` / `ImportRecord` | Import Record                           | Import record, Example: `ast.ImportRecord`                            |
| `Inc`                        | Increment                               | Increment, Example: `UnOpPreInc`, `UnOpPostInc`                       |
| `Init`                       | Initializer / Initialize                | Initialization, Example: `SFor.InitOrNil`                             |
| `Inner`                      | Inner                                   | Inner, Example: `InnerIndex` (relative to `Outer`/`Source`)           |
| `Instanceof`                 | Instanceof                              | instanceof operator, Example: `BinOpInstanceof`                       |
| `Is`                         | Is                                      | State flag prefix, Example: `IsAsync`, `IsExport`, `IsSingleLine`     |

## J

| Abbreviation | Full Name                  | Description & Examples                         |
| ------------ | -------------------------- | ---------------------------------------------- |
| `JSON`       | JavaScript Object Notation | JSON data format                               |
| `JSX`        | JavaScript XML             | JSX syntax, Example: `EJSXElement`, `EJSXText` |

## K

| Abbreviation | Full Name | Description & Examples                                                            |
| ------------ | --------- | --------------------------------------------------------------------------------- |
| `Kind`       | Kind      | Type/kind discriminator field, Example: `SymbolKind`, `PropertyKind`, `LocalKind` |
| `Kw`         | Keyword   | Keyword, Example: `AssertOrWithKeyword`                                           |

## L

| Abbreviation   | Full Name            | Description & Examples                                    |
| -------------- | -------------------- | --------------------------------------------------------- |
| `L`            | Level                | Precedence level, Example: `LComma`, `LAssign`, `LPrefix` |
| `Le`           | Less or Equal        | Less than or equal, Example: `BinOpLe`                    |
| `LegalComment` | Legal Comment        | Legal comment, Example: `extractedLegalComments`          |
| `Legacy`       | Legacy               | Legacy/deprecated, Example: `LegacyOctalLoc`              |
| `Len`          | Length               | Length, Example: `RangeLen`                               |
| `LineOffset`   | Line Offset          | Line offset                                               |
| `Loader`       | Loader               | Loader, determines file handling                          |
| `Loc`          | Location             | Source location, Example: `logger.Loc`                    |
| `LocRef`       | Location + Reference | Location and reference combination, Example: `ast.LocRef` |
| `Loose`        | Loose                | Loose equality, Example: `BinOpLooseEq`, `BinOpLooseNe`   |
| `Lt`           | Less Than            | Less than, Example: `BinOpLt`                             |

## M

| Abbreviation | Full Name        | Description & Examples                                         |
| ------------ | ---------------- | -------------------------------------------------------------- |
| `Manifest`   | Manifest         | Manifest file                                                  |
| `Mangle`     | Mangle           | Name mangling/minification                                     |
| `Max`        | Maximum          | Maximum value                                                  |
| `Meta`       | Meta             | Metadata, Example: `EImportMeta`                               |
| `Metafile`   | Metafile         | Metadata output file                                           |
| `Min`        | Minimum          | Minimum value                                                  |
| `Minify`     | Minify           | Code minification                                              |
| `ModuleRef`  | Module Reference | Module reference, Example: `AST.ModuleRef`                     |
| `ModuleType` | Module Type      | Module type, Example: `ModuleESM_MJS`, `ModuleCommonJS_CJS`    |
| `Msg`        | Message          | Message (commonly used in peripheral modules)                  |
| `MQ`         | Media Query      | CSS media query prefix, Example: `MQType`, `MQBinary`, `MQNot` |
| `MultiLine`  | Multi-Line       | Multi-line, Example: `ENew.IsMultiLine`                        |

## N

| Abbreviation  | Full Name            | Description & Examples                              |
| ------------- | -------------------- | --------------------------------------------------- |
| `NaN`         | Not a Number         | Not-a-number value                                  |
| `Ne`          | Not Equal            | Not equal, Example: `BinOpLooseNe`, `BinOpStrictNe` |
| `Nil`         | Nil                  | Nil value (used with `OrNil` suffix)                |
| `Node`        | Node.js              | Node.js runtime                                     |
| `NPM` / `npm` | Node Package Manager | Node package manager                                |
| `NS`          | Namespace            | Namespace, Example: `TSNamespace`, `NamespaceRef`   |
| `Nullable`    | Nullable             | Nullable, Example: `NullableChildren`               |
| `Nullish`     | Nullish              | Nullish, Example: `BinOpNullishCoalescing`          |
| `Num`         | Number               | Number                                              |

## O

| Abbreviation    | Full Name        | Description & Examples                                                |
| --------------- | ---------------- | --------------------------------------------------------------------- |
| `Octal`         | Octal            | Octal, Example: `LegacyOctalLoc`                                      |
| `Op`            | Operator         | Operator, Example: `OpCode`, `BinOpAdd`, `UnOpNot`                    |
| `OpCode`        | Operation Code   | Operation code type, Example: `OpCode uint8`                          |
| `Optional`      | Optional         | Optional, Example: `OptionalChain`, `ECall.OptionalChain`             |
| `OptionalChain` | Optional Chain   | Optional chaining, Example: `OptionalChainNone`, `OptionalChainStart` |
| `OrNil`         | Or Nil           | Optional/possibly nil suffix, Example: `ValueOrNil`, `TestOrNil`      |
| `OS`            | Operating System | Operating system                                                      |
| `Outer`         | Outer            | Outer, Example: `OuterOpenBraceLoc` (relative to `Inner`)             |

## P

| Abbreviation    | Full Name     | Description & Examples                                                          |
| --------------- | ------------- | ------------------------------------------------------------------------------- |
| `Parenthesized` | Parenthesized | Parenthesized, Example: `EArray.IsParenthesized`                                |
| `Part`          | Part          | AST code part, used for tree shaking and code splitting, Example: `Part` struct |
| `Platform`      | Platform      | Target platform, Example: `PlatformBrowser`, `PlatformNode`                     |
| `Pkg`           | Package       | Package (commonly used in path/resolution modules)                              |
| `Plugin`        | Plugin        | Plugin                                                                          |
| `PnP` / `pnp`   | Plug'n'Play   | Yarn PnP resolution strategy                                                    |
| `Pos`           | Position      | Position (commonly used in peripheral modules)                                  |
| `Pow`           | Power         | Power/exponentiation, Example: `BinOpPow`                                       |
| `Prev`          | Previous      | Previous                                                                        |
| `Prop`          | Property      | Property, Example: `Property` struct                                            |
| `Props`         | Properties    | Property list, Example: `MangledProps`, `ReservedProps`                         |

## Q

| Abbreviation | Full Name | Description & Examples             |
| ------------ | --------- | ---------------------------------- |
| `Quoted`     | Quoted    | Quoted, Example: `PreferQuotedKey` |

## R

| Abbreviation | Full Name          | Description & Examples                                                   |
| ------------ | ------------------ | ------------------------------------------------------------------------ |
| `R`          | Rule               | CSS rule type prefix, Example: `RAtCharset`, `RSelector`, `RDeclaration` |
| `Range`      | Range              | Range, Example: `logger.Range`                                           |
| `Raw`        | Raw                | Raw value, Example: `TemplatePart.TailRaw`                               |
| `Ref`        | Reference          | Symbol reference, Example: `ast.Ref`                                     |
| `RegExp`     | Regular Expression | Regular expression, Example: `ERegExp`                                   |
| `Rem`        | Remainder          | Remainder, Example: `BinOpRem`                                           |

## S

| Abbreviation  | Full Name                | Description & Examples                                                      |
| ------------- | ------------------------ | --------------------------------------------------------------------------- |
| `S`           | Statement                | Statement type interface prefix, Example: `SBlock`, `SIf`, `SExpr`          |
| `Scope`       | Scope                    | Scope, Example: `Scope`, `ScopeKind`                                        |
| `Shl`         | Shift Left               | Left shift, Example: `BinOpShl`                                             |
| `Should`      | Should                   | Recommendation flag prefix, Example: `ShouldLowerStandardDecorators`        |
| `Shr`         | Shift Right              | Right shift, Example: `BinOpShr`, `BinOpUShr` (unsigned right shift)        |
| `Shorthand`   | Shorthand                | Shorthand property, Example: `PropertyWasShorthand`                         |
| `SideEffect`  | Side Effect              | Side effect, Example: `HasNoSideEffectsComment`                             |
| `SingleLine`  | Single-Line              | Single line, Example: `EObject.IsSingleLine`                                |
| `SourceIndex` | Source Index             | Source file index, Example: `Ref.SourceIndex`                               |
| `SourceMap`   | Source Map               | Source map                                                                  |
| `Spread`      | Spread                   | Spread operator, Example: `ESpread`, `BArray.HasSpread`                     |
| `Src`         | Source                   | Source, Example: `SourceIndex`                                              |
| `Stderr`      | Standard Error           | Standard error output                                                       |
| `Stdin`       | Standard Input           | Standard input                                                              |
| `Stdout`      | Standard Output          | Standard output                                                             |
| `Stmt`        | Statement                | Statement, Example: `Stmt` struct                                           |
| `Str`         | String                   | String                                                                      |
| `Strict`      | Strict                   | Strict mode/strict equality, Example: `BinOpStrictEq`, `ExplicitStrictMode` |
| `StrictNe`    | Strict Not Equal         | Strict not equal, Example: `BinOpStrictNe`                                  |
| `StrictEq`    | Strict Equal             | Strict equal, Example: `BinOpStrictEq`                                      |
| `SVG`         | Scalable Vector Graphics | Scalable Vector Graphics                                                    |
| `Sym`         | Symbol                   | Symbol, Example: `Symbol` struct, `SymbolMap`                               |

## T

| Abbreviation  | Full Name          | Description & Examples                                                     |
| ------------- | ------------------ | -------------------------------------------------------------------------- |
| `TagOrNil`    | Tag Or Nil         | Tag (may be nil), Example: `ETemplate.TagOrNil`                            |
| `Tagged`      | Tagged             | Tagged, Example: tagged template literal                                   |
| `Target`      | Target             | Target environment/platform, Example: `JSFeature` target                   |
| `TDZ`         | Temporal Dead Zone | Temporal dead zone (commonly seen in comments)                             |
| `Temp`        | Temporary          | Temporary variable                                                         |
| `Template`    | Template           | Template, Example: `ETemplate`, `TemplatePart`                             |
| `Text`        | Text               | Text content, Example: `Token.Text`, `EJSXText.Raw`                        |
| `TopLevel`    | Top-Level          | Top-level, Example: `TopLevelSymbolToPartsFromParser`                      |
| `TreeShaking` | Tree Shaking       | Tree shaking, dead code elimination                                        |
| `TS`          | TypeScript         | TypeScript-related prefix, Example: `TSEnum`, `TSNamespace`, `STypeScript` |
| `TSX`         | TypeScript XML     | TSX syntax                                                                 |
| `Typeof`      | Typeof             | typeof operator, Example: `UnOpTypeof`                                     |

## U

| Abbreviation | Full Name                     | Description & Examples                                                  |
| ------------ | ----------------------------- | ----------------------------------------------------------------------- |
| `U`          | Unsigned                      | Unsigned                                                                |
| `UMD`        | Universal Module Definition   | UMD module specification                                                |
| `Un`         | Unary                         | Unary operation, Example: `UnOpNeg`, `UnOpNot`, `EUnary`                |
| `UniqueKey`  | Unique Key                    | Unique key, Example: `ContainsUniqueKey`                                |
| `URL`        | Uniform Resource Locator      | Uniform Resource Locator, Example: `TURL`, `ImportURL`                  |
| `UShr`       | Unsigned Shift Right          | Unsigned right shift, Example: `BinOpUShr`                              |
| `Use`        | Use                           | Use flag prefix, Example: `UseCountEstimate`, `UseDefineForClassFields` |
| `UTF`        | Unicode Transformation Format | Unicode Transformation Format, Example: `UTF16EqualsString`             |

## V

| Abbreviation | Full Name    | Description & Examples                      |
| ------------ | ------------ | ------------------------------------------- |
| `Val`        | Value        | Value                                       |
| `ValueOrNil` | Value Or Nil | Possibly nil value field                    |
| `Verbatim`   | Verbatim     | Verbatim, Example: verbatim whitespace mode |

## W

| Abbreviation    | Full Name         | Description & Examples                                                                |
| --------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `Was`           | Was               | Historical state flag prefix, Example: `WasOriginallyBareImport`, `WasTSImportEquals` |
| `WasOriginally` | Was Originally    | Original form flag, Example: `WasOriginallyTypeofIdentifier`                          |
| `Watch`         | Watch             | Watch mode                                                                            |
| `WrapperRef`    | Wrapper Reference | Wrapper reference, Example: `AST.WrapperRef`                                          |

## X

| Abbreviation | Full Name                  | Description & Examples                           |
| ------------ | -------------------------- | ------------------------------------------------ |
| `XML`        | eXtensible Markup Language | eXtensible Markup Language                       |
| `XSS`        | Cross-Site Scripting       | Cross-site scripting (security-related comments) |

## Full Table of Abbreviations

| Abbreviation                 | Full Name                               | Description & Examples                                                                |
| ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------- |
| `AMD`                        | Asynchronous Module Definition          | AMD module specification                                                              |
| `API`                        | Application Programming Interface       | Application programming interface                                                     |
| `AST`                        | Abstract Syntax Tree                    | Abstract syntax tree, Example: `AST` struct                                           |
| `Accessor`                   | Accessor                                | Accessor, Example: `PropertyAutoAccessor`                                             |
| `ApproximateLineCount`       | Approximate Line Count                  | Approximate line count, Example: `AST.ApproximateLineCount`                           |
| `Arg`                        | Argument                                | Function argument, Example: `Arg ast.Ref`, `Args []Arg`                               |
| `Args`                       | Arguments                               | Argument list, Example: `ECall.Args`, `Fn.Args`                                       |
| `AtToken`                    | At Token                                | CSS `@` rule keyword, Example: `RAtKeyframes.AtToken`                                 |
| `Await`                      | Await                                   | Asynchronous await, Example: `EAwait`, `SForOf.Await`                                 |
| `B`                          | Binding                                 | Binding type interface prefix, Example: `BIdentifier`, `BArray`, `BObject`            |
| `Base64`                     | Base64                                  | Base64 encoding                                                                       |
| `Bin`                        | Binary                                  | Binary operation, Example: `BinOpAdd`, `BinOpAssign`, `EBinary`                       |
| `Bitwise`                    | Bitwise                                 | Bitwise operation, Example: `BinOpBitwiseOr`                                          |
| `Bool`                       | Boolean                                 | Boolean value, Example: `EBoolean`                                                    |
| `Browser`                    | Browser                                 | Browser target environment                                                            |
| `Buf`                        | Buffer                                  | Buffer (commonly used in peripheral modules)                                          |
| `Bundle`                     | Bundle                                  | Bundle result                                                                         |
| `CJS`                        | CommonJS                                | CommonJS module specification, Example: `ExportsCommonJS`, `WrapWithToCJS`            |
| `CSS`                        | Cascading Style Sheets                  | Cascading style sheets, Example: `SymbolGlobalCSS`, `SymbolLocalCSS`                  |
| `CanBe`                      | Can Be                                  | Capability flag prefix, Example: `CanBeRemovedIfUnused`                               |
| `Cfg`                        | Configuration                           | Configuration (commonly used in peripheral modules)                                   |
| `Char`                       | Character                               | Character, Example: `CharFreq` (character frequency histogram)                        |
| `Chunk`                      | Chunk                                   | Code chunk after code splitting                                                       |
| `Clone`                      | Clone                                   | Clone method, Example: `CloneWithImportRecords`                                       |
| `CodeSplitting`              | Code Splitting                          | Code splitting                                                                        |
| `ColumnOffset`               | Column Offset                           | Column offset                                                                         |
| `Comma`                      | Comma                                   | Comma operator, Example: `BinOpComma`, `LComma`                                       |
| `Compat`                     | Compatibility                           | Compatibility, Example: `compat.JSFeature`                                            |
| `Computed`                   | Computed                                | Computed property, Example: `PropertyIsComputed`                                      |
| `Const`                      | Constant                                | Constant, Example: `ConstValue`, `LocalConst`                                         |
| `Cooked`                     | Cooked                                  | Template string cooked value, Example: `HeadCooked`                                   |
| `Cpl`                        | Complement                              | Bitwise complement, Example: `UnOpCpl`                                                |
| `Ctor`                       | Constructor                             | Constructor, Example: `IsTypeScriptCtorField`                                         |
| `Curr`                       | Current                                 | Current value (commonly used in iteration variables)                                  |
| `D`                          | Declaration                             | CSS declaration type prefix, Example: `DUnknown`, `DFlex`, `DColor`                   |
| `DataURL`                    | Data URL                                | Data URL, inline resource                                                             |
| `Data`                       | Data                                    | Generic data field, Example: `Expr.Data E`, `Stmt.Data S`                             |
| `Dbg`                        | Debug                                   | Debug (commonly used in peripheral modules)                                           |
| `Dec`                        | Decrement                               | Decrement, Example: `UnOpPreDec`, `UnOpPostDec`                                       |
| `Decl`                       | Declaration                             | Declaration, Example: `Decl` struct                                                   |
| `Decls`                      | Declarations                            | Declaration list, Example: `SLocal.Decls`                                             |
| `Decorator`                  | Decorator                               | Decorator, Example: `[]Decorator`, `PropertyMethod`                                   |
| `Define`                     | Define                                  | Define replacement, Example: `Define` config                                          |
| `Deno`                       | Deno                                    | Deno runtime                                                                          |
| `Dependency`                 | Dependency                              | Dependency, Example: `Dependency` struct                                              |
| `Dest` / `Dst`               | Destination                             | Destination (commonly used in copy/convert operations)                                |
| `Did`                        | Did                                     | Past action flag prefix, Example: `DidKeepName`, `DidWarnAboutCommonJSInESM`          |
| `Dir`                        | Directory                               | Directory, Example: `PlatformIndependentPathDirBaseExt`                               |
| `EOF`                        | End of File                             | End of file                                                                           |
| `ESM`                        | ECMAScript Module                       | ECMAScript module specification, Example: `ExportsESM`, `WrapWithToESM`               |
| `E`                          | Expression                              | Expression type interface prefix, Example: `EArray`, `EBinary`, `EIdentifier`         |
| `Enum`                       | Enumeration                             | Enumeration, Example: `SEnum`, `EnumValue`, `TSEnum`                                  |
| `Err`                        | Error                                   | Error (commonly used in peripheral modules)                                           |
| `Expr`                       | Expression                              | Expression, Example: `Expr` struct, `SExpr`                                           |
| `Ext`                        | Extension                               | Extension (commonly used in path handling)                                            |
| `External`                   | External                                | External module, not bundled                                                          |
| `FS`                         | File System                             | File system                                                                           |
| `Feature`                    | Feature                                 | Language feature, Example: `compat.JSFeature`                                         |
| `Flags`                      | Flags                                   | Bit flag set, Example: `SymbolFlags`, `PropertyFlags`                                 |
| `Fn`                         | Function                                | Function, Example: `Fn` struct, `SFunction`                                           |
| `For`                        | For                                     | Loop statement, Example: `SFor`, `SForIn`, `SForOf`                                   |
| `Freq`                       | Frequency                               | Frequency, Example: `CharFreq` (character frequency)                                  |
| `Ge`                         | Greater or Equal                        | Greater than or equal, Example: `BinOpGe`                                             |
| `GlobPattern`                | Glob Pattern                            | Glob pattern, Example: `ast.GlobPattern`                                              |
| `Gt`                         | Greater Than                            | Greater than, Example: `BinOpGt`                                                      |
| `HTML`                       | HyperText Markup Language               | HyperText Markup Language                                                             |
| `Has`                        | Has                                     | Property possession flag prefix, Example: `HasRestArg`, `HasNoSideEffectsComment`     |
| `Hash`                       | Hash                                    | Hash method, Example: `Hash()`, `HashTokens()`                                        |
| `Hashbang`                   | Hashbang                                | Script header shebang, Example: `AST.Hashbang`                                        |
| `Hoist` / `Hoisted`          | Hoist / Hoisted                         | Variable hoisting, Example: `SymbolHoisted`, `ScopeKind.StopsHoisting()`              |
| `IIFE`                       | Immediately Invoked Function Expression | Immediately invoked function expression                                               |
| `Ident`                      | Identifier                              | Identifier, Example: `EIdentifier`, `BIdentifier`                                     |
| `Idx`                        | Index                                   | Index, Example: `InnerIndex`, `SourceIndex`                                           |
| `If`                         | If                                      | Condition, Example: `EIf`, `SIf`                                                      |
| `ImportKind`                 | Import Kind                             | Import kind, Example: `ImportStmt`, `ImportDynamic`                                   |
| `ImportPhase`                | Import Phase                            | Import phase, Example: `EvaluationPhase`, `DeferPhase`, `SourcePhase`                 |
| `ImportRec` / `ImportRecord` | Import Record                           | Import record, Example: `ast.ImportRecord`                                            |
| `Inc`                        | Increment                               | Increment, Example: `UnOpPreInc`, `UnOpPostInc`                                       |
| `Init`                       | Initializer / Initialize                | Initialization, Example: `SFor.InitOrNil`                                             |
| `Inner`                      | Inner                                   | Inner, Example: `InnerIndex` (relative to `Outer`/`Source`)                           |
| `Instanceof`                 | Instanceof                              | instanceof operator, Example: `BinOpInstanceof`                                       |
| `Is`                         | Is                                      | State flag prefix, Example: `IsAsync`, `IsExport`, `IsSingleLine`                     |
| `JSON`                       | JavaScript Object Notation              | JSON data format                                                                      |
| `JSX`                        | JavaScript XML                          | JSX syntax, Example: `EJSXElement`, `EJSXText`                                        |
| `Kind`                       | Kind                                    | Type/kind discriminator field, Example: `SymbolKind`, `PropertyKind`, `LocalKind`     |
| `Kw`                         | Keyword                                 | Keyword, Example: `AssertOrWithKeyword`                                               |
| `L`                          | Level                                   | Precedence level, Example: `LComma`, `LAssign`, `LPrefix`                             |
| `Le`                         | Less or Equal                           | Less than or equal, Example: `BinOpLe`                                                |
| `Legacy`                     | Legacy                                  | Legacy/deprecated, Example: `LegacyOctalLoc`                                          |
| `LegalComment`               | Legal Comment                           | Legal comment, Example: `extractedLegalComments`                                      |
| `Len`                        | Length                                  | Length, Example: `RangeLen`                                                           |
| `LineOffset`                 | Line Offset                             | Line offset                                                                           |
| `Loader`                     | Loader                                  | Loader, determines file handling                                                      |
| `LocRef`                     | Location + Reference                    | Location and reference combination, Example: `ast.LocRef`                             |
| `Loc`                        | Location                                | Source location, Example: `logger.Loc`                                                |
| `Loose`                      | Loose                                   | Loose equality, Example: `BinOpLooseEq`, `BinOpLooseNe`                               |
| `Lt`                         | Less Than                               | Less than, Example: `BinOpLt`                                                         |
| `MQ`                         | Media Query                             | CSS media query prefix, Example: `MQType`, `MQBinary`, `MQNot`                        |
| `Mangle`                     | Mangle                                  | Name mangling/minification                                                            |
| `Manifest`                   | Manifest                                | Manifest file                                                                         |
| `Max`                        | Maximum                                 | Maximum value                                                                         |
| `Meta`                       | Meta                                    | Metadata, Example: `EImportMeta`                                                      |
| `Metafile`                   | Metafile                                | Metadata output file                                                                  |
| `Min`                        | Minimum                                 | Minimum value                                                                         |
| `Minify`                     | Minify                                  | Code minification                                                                     |
| `ModuleRef`                  | Module Reference                        | Module reference, Example: `AST.ModuleRef`                                            |
| `ModuleType`                 | Module Type                             | Module type, Example: `ModuleESM_MJS`, `ModuleCommonJS_CJS`                           |
| `Msg`                        | Message                                 | Message (commonly used in peripheral modules)                                         |
| `MultiLine`                  | Multi-Line                              | Multi-line, Example: `ENew.IsMultiLine`                                               |
| `NPM` / `npm`                | Node Package Manager                    | Node package manager                                                                  |
| `NS`                         | Namespace                               | Namespace, Example: `TSNamespace`, `NamespaceRef`                                     |
| `NaN`                        | Not a Number                            | Not-a-number value                                                                    |
| `Ne`                         | Not Equal                               | Not equal, Example: `BinOpLooseNe`, `BinOpStrictNe`                                   |
| `Nil`                        | Nil                                     | Nil value (used with `OrNil` suffix)                                                  |
| `Node`                       | Node.js                                 | Node.js runtime                                                                       |
| `Nullable`                   | Nullable                                | Nullable, Example: `NullableChildren`                                                 |
| `Nullish`                    | Nullish                                 | Nullish, Example: `BinOpNullishCoalescing`                                            |
| `Num`                        | Number                                  | Number                                                                                |
| `OS`                         | Operating System                        | Operating system                                                                      |
| `Octal`                      | Octal                                   | Octal, Example: `LegacyOctalLoc`                                                      |
| `OpCode`                     | Operation Code                          | Operation code type, Example: `OpCode uint8`                                          |
| `Op`                         | Operator                                | Operator, Example: `OpCode`, `BinOpAdd`, `UnOpNot`                                    |
| `OptionalChain`              | Optional Chain                          | Optional chaining, Example: `OptionalChainNone`, `OptionalChainStart`                 |
| `Optional`                   | Optional                                | Optional, Example: `OptionalChain`, `ECall.OptionalChain`                             |
| `OrNil`                      | Or Nil                                  | Optional/possibly nil suffix, Example: `ValueOrNil`, `TestOrNil`                      |
| `Outer`                      | Outer                                   | Outer, Example: `OuterOpenBraceLoc` (relative to `Inner`)                             |
| `Parenthesized`              | Parenthesized                           | Parenthesized, Example: `EArray.IsParenthesized`                                      |
| `Part`                       | Part                                    | AST code part, used for tree shaking and code splitting, Example: `Part` struct       |
| `Pkg`                        | Package                                 | Package (commonly used in path/resolution modules)                                    |
| `Platform`                   | Platform                                | Target platform, Example: `PlatformBrowser`, `PlatformNode`                           |
| `Plugin`                     | Plugin                                  | Plugin                                                                                |
| `PnP` / `pnp`                | Plug'n'Play                             | Yarn PnP resolution strategy                                                          |
| `Pos`                        | Position                                | Position (commonly used in peripheral modules)                                        |
| `Pow`                        | Power                                   | Power/exponentiation, Example: `BinOpPow`                                             |
| `Prev`                       | Previous                                | Previous                                                                              |
| `Prop`                       | Property                                | Property, Example: `Property` struct                                                  |
| `Props`                      | Properties                              | Property list, Example: `MangledProps`, `ReservedProps`                               |
| `Quoted`                     | Quoted                                  | Quoted, Example: `PreferQuotedKey`                                                    |
| `R`                          | Rule                                    | CSS rule type prefix, Example: `RAtCharset`, `RSelector`, `RDeclaration`              |
| `Range`                      | Range                                   | Range, Example: `logger.Range`                                                        |
| `Raw`                        | Raw                                     | Raw value, Example: `TemplatePart.TailRaw`                                            |
| `Ref`                        | Reference                               | Symbol reference, Example: `ast.Ref`                                                  |
| `RegExp`                     | Regular Expression                      | Regular expression, Example: `ERegExp`                                                |
| `Rem`                        | Remainder                               | Remainder, Example: `BinOpRem`                                                        |
| `SVG`                        | Scalable Vector Graphics                | Scalable Vector Graphics                                                              |
| `S`                          | Statement                               | Statement type interface prefix, Example: `SBlock`, `SIf`, `SExpr`                    |
| `Scope`                      | Scope                                   | Scope, Example: `Scope`, `ScopeKind`                                                  |
| `Shl`                        | Shift Left                              | Left shift, Example: `BinOpShl`                                                       |
| `Shorthand`                  | Shorthand                               | Shorthand property, Example: `PropertyWasShorthand`                                   |
| `Should`                     | Should                                  | Recommendation flag prefix, Example: `ShouldLowerStandardDecorators`                  |
| `Shr`                        | Shift Right                             | Right shift, Example: `BinOpShr`, `BinOpUShr` (unsigned right shift)                  |
| `SideEffect`                 | Side Effect                             | Side effect, Example: `HasNoSideEffectsComment`                                       |
| `SingleLine`                 | Single-Line                             | Single line, Example: `EObject.IsSingleLine`                                          |
| `SourceIndex`                | Source Index                            | Source file index, Example: `Ref.SourceIndex`                                         |
| `SourceMap`                  | Source Map                              | Source map                                                                            |
| `Spread`                     | Spread                                  | Spread operator, Example: `ESpread`, `BArray.HasSpread`                               |
| `Src`                        | Source                                  | Source, Example: `SourceIndex`                                                        |
| `Stderr`                     | Standard Error                          | Standard error output                                                                 |
| `Stdin`                      | Standard Input                          | Standard input                                                                        |
| `Stdout`                     | Standard Output                         | Standard output                                                                       |
| `Stmt`                       | Statement                               | Statement, Example: `Stmt` struct                                                     |
| `Str`                        | String                                  | String                                                                                |
| `StrictEq`                   | Strict Equal                            | Strict equal, Example: `BinOpStrictEq`                                                |
| `StrictNe`                   | Strict Not Equal                        | Strict not equal, Example: `BinOpStrictNe`                                            |
| `Strict`                     | Strict                                  | Strict mode/strict equality, Example: `BinOpStrictEq`, `ExplicitStrictMode`           |
| `Sym`                        | Symbol                                  | Symbol, Example: `Symbol` struct, `SymbolMap`                                         |
| `TDZ`                        | Temporal Dead Zone                      | Temporal dead zone (commonly seen in comments)                                        |
| `TSX`                        | TypeScript XML                          | TSX syntax                                                                            |
| `TS`                         | TypeScript                              | TypeScript-related prefix, Example: `TSEnum`, `TSNamespace`, `STypeScript`            |
| `TagOrNil`                   | Tag Or Nil                              | Tag (may be nil), Example: `ETemplate.TagOrNil`                                       |
| `Tagged`                     | Tagged                                  | Tagged, Example: tagged template literal                                              |
| `Target`                     | Target                                  | Target environment/platform, Example: `JSFeature` target                              |
| `Temp`                       | Temporary                               | Temporary variable                                                                    |
| `Template`                   | Template                                | Template, Example: `ETemplate`, `TemplatePart`                                        |
| `Text`                       | Text                                    | Text content, Example: `Token.Text`, `EJSXText.Raw`                                   |
| `TopLevel`                   | Top-Level                               | Top-level, Example: `TopLevelSymbolToPartsFromParser`                                 |
| `TreeShaking`                | Tree Shaking                            | Tree shaking, dead code elimination                                                   |
| `Typeof`                     | Typeof                                  | typeof operator, Example: `UnOpTypeof`                                                |
| `UMD`                        | Universal Module Definition             | UMD module specification                                                              |
| `URL`                        | Uniform Resource Locator                | Uniform Resource Locator, Example: `TURL`, `ImportURL`                                |
| `UShr`                       | Unsigned Shift Right                    | Unsigned right shift, Example: `BinOpUShr`                                            |
| `UTF`                        | Unicode Transformation Format           | Unicode Transformation Format, Example: `UTF16EqualsString`                           |
| `U`                          | Unsigned                                | Unsigned                                                                              |
| `Un`                         | Unary                                   | Unary operation, Example: `UnOpNeg`, `UnOpNot`, `EUnary`                              |
| `UniqueKey`                  | Unique Key                              | Unique key, Example: `ContainsUniqueKey`                                              |
| `Use`                        | Use                                     | Use flag prefix, Example: `UseCountEstimate`, `UseDefineForClassFields`               |
| `Val`                        | Value                                   | Value                                                                                 |
| `ValueOrNil`                 | Value Or Nil                            | Possibly nil value field                                                              |
| `Verbatim`                   | Verbatim                                | Verbatim, Example: verbatim whitespace mode                                           |
| `WasOriginally`              | Was Originally                          | Original form flag, Example: `WasOriginallyTypeofIdentifier`                          |
| `Was`                        | Was                                     | Historical state flag prefix, Example: `WasOriginallyBareImport`, `WasTSImportEquals` |
| `Watch`                      | Watch                                   | Watch mode                                                                            |
| `WrapperRef`                 | Wrapper Reference                       | Wrapper reference, Example: `AST.WrapperRef`                                          |
| `XML`                        | eXtensible Markup Language              | eXtensible Markup Language                                                            |
| `XSS`                        | Cross-Site Scripting                    | Cross-site scripting (security-related comments)                                      |
