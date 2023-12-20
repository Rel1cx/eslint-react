@eslint-react/jsx

# @eslint-react/jsx

## Table of contents

### Variables

- [DEFAULT\_JSX\_VALUE\_CHECK\_HINT](README.md#default_jsx_value_check_hint)
- [JSXValueCheckHint](README.md#jsxvaluecheckhint)
- [hdlAnimation](README.md#hdlanimation)
- [hdlClipboard](README.md#hdlclipboard)
- [hdlComposition](README.md#hdlcomposition)
- [hdlFocus](README.md#hdlfocus)
- [hdlForm](README.md#hdlform)
- [hdlImage](README.md#hdlimage)
- [hdlKeyboard](README.md#hdlkeyboard)
- [hdlMedia](README.md#hdlmedia)
- [hdlMouse](README.md#hdlmouse)
- [hdlScroll](README.md#hdlscroll)
- [hdlSelection](README.md#hdlselection)
- [hdlTouch](README.md#hdltouch)
- [hdlTransition](README.md#hdltransition)
- [hdlWheel](README.md#hdlwheel)

### Functions

- [elementType](README.md#elementtype)
- [findPropInAttributes](README.md#findpropinattributes)
- [findPropInProperties](README.md#findpropinproperties)
- [getFragmentFromContext](README.md#getfragmentfromcontext)
- [getPragmaFromContext](README.md#getpragmafromcontext)
- [getProp](README.md#getprop)
- [getPropName](README.md#getpropname)
- [getPropValue](README.md#getpropvalue)
- [hasAnyProp](README.md#hasanyprop)
- [hasChildren](README.md#haschildren)
- [hasEveryProp](README.md#haseveryprop)
- [hasProp](README.md#hasprop)
- [isCallFromPragma](README.md#iscallfrompragma)
- [isCallFromPragmaMember](README.md#iscallfrompragmamember)
- [isChildOfJSXElement](README.md#ischildofjsxelement)
- [isChildrenOfCreateElement](README.md#ischildrenofcreateelement)
- [isCloneElement](README.md#iscloneelement)
- [isCloneElementCall](README.md#iscloneelementcall)
- [isCreateElement](README.md#iscreateelement)
- [isCreateElementCall](README.md#iscreateelementcall)
- [isFragment](README.md#isfragment)
- [isFragmentElement](README.md#isfragmentelement)
- [isFragmentSyntax](README.md#isfragmentsyntax)
- [isFromPragma](README.md#isfrompragma)
- [isFromPragmaMember](README.md#isfrompragmamember)
- [isFunctionReturningJSXValue](README.md#isfunctionreturningjsxvalue)
- [isInitializedFromPragma](README.md#isinitializedfrompragma)
- [isInsideCreateElementProps](README.md#isinsidecreateelementprops)
- [isInsidePropValue](README.md#isinsidepropvalue)
- [isJSXElementOfBuiltinComponent](README.md#isjsxelementofbuiltincomponent)
- [isJSXElementOfUserDefinedComponent](README.md#isjsxelementofuserdefinedcomponent)
- [isJSXValue](README.md#isjsxvalue)
- [isLineBreak](README.md#islinebreak)
- [isLiteral](README.md#isliteral)
- [isPaddingSpaces](README.md#ispaddingspaces)
- [isPropertyOfPragma](README.md#ispropertyofpragma)
- [isWhiteSpace](README.md#iswhitespace)
- [traverseUpProp](README.md#traverseupprop)

## Variables

### DEFAULT\_JSX\_VALUE\_CHECK\_HINT

• `Const` **DEFAULT\_JSX\_VALUE\_CHECK\_HINT**: `bigint`

---

### JSXValueCheckHint

• `Const` **JSXValueCheckHint**: `Object`

#### Type declaration

| Name                   | Type     |
| :--------------------- | :------- |
| `None`                 | `0n`     |
| `SkipBooleanLiteral`   | `bigint` |
| `SkipCreateElement`    | `bigint` |
| `SkipNullLiteral`      | `bigint` |
| `SkipNumberLiteral`    | `bigint` |
| `SkipStringLiteral`    | `bigint` |
| `SkipUndefinedLiteral` | `bigint` |
| `StrictArray`          | `bigint` |
| `StrictConditional`    | `bigint` |
| `StrictLogical`        | `bigint` |

---

### hdlAnimation

• `Const` **hdlAnimation**: readonly [`"onAnimationStart"`, `"onAnimationEnd"`, `"onAnimationIteration"`]

---

### hdlClipboard

• `Const` **hdlClipboard**: readonly [`"onCopy"`, `"onCut"`, `"onPaste"`]

---

### hdlComposition

• `Const` **hdlComposition**: readonly [`"onCompositionEnd"`, `"onCompositionStart"`, `"onCompositionUpdate"`]

---

### hdlFocus

• `Const` **hdlFocus**: readonly [`"onFocus"`, `"onBlur"`]

---

### hdlForm

• `Const` **hdlForm**: readonly [`"onChange"`, `"onInput"`, `"onSubmit"`]

---

### hdlImage

• `Const` **hdlImage**: readonly [`"onLoad"`, `"onError"`]

---

### hdlKeyboard

• `Const` **hdlKeyboard**: readonly [`"onKeyDown"`, `"onKeyPress"`, `"onKeyUp"`]

---

### hdlMedia

• `Const` **hdlMedia**: readonly [`"onAbort"`, `"onCanPlay"`, `"onCanPlayThrough"`, `"onDurationChange"`, `"onEmptied"`, `"onEncrypted"`, `"onEnded"`, `"onError"`, `"onLoadedData"`, `"onLoadedMetadata"`, `"onLoadStart"`, `"onPause"`, `"onPlay"`, `"onPlaying"`, `"onProgress"`, `"onRateChange"`, `"onSeeked"`, `"onSeeking"`, `"onStalled"`, `"onSuspend"`, `"onTimeUpdate"`, `"onVolumeChange"`, `"onWaiting"`]

---

### hdlMouse

• `Const` **hdlMouse**: readonly [`"onClick"`, `"onContextMenu"`, `"onDblClick"`, `"onDoubleClick"`, `"onDrag"`, `"onDragEnd"`, `"onDragEnter"`, `"onDragExit"`, `"onDragLeave"`, `"onDragOver"`, `"onDragStart"`, `"onDrop"`, `"onMouseDown"`, `"onMouseEnter"`, `"onMouseLeave"`, `"onMouseMove"`, `"onMouseOut"`, `"onMouseOver"`, `"onMouseUp"`]

---

### hdlScroll

• `Const` **hdlScroll**: readonly [`"onScroll"`]

---

### hdlSelection

• `Const` **hdlSelection**: readonly [`"onSelect"`]

---

### hdlTouch

• `Const` **hdlTouch**: readonly [`"onTouchCancel"`, `"onTouchEnd"`, `"onTouchMove"`, `"onTouchStart"`]

---

### hdlTransition

• `Const` **hdlTransition**: readonly [`"onTransitionEnd"`]

---

### hdlWheel

• `Const` **hdlWheel**: readonly [`"onWheel"`]

## Functions

### elementType

▸ **elementType**(`node`): `string`

Returns the tag name associated with a JSXOpeningElement.

#### Parameters

| Name   | Type                                        | Description                                |
| :----- | :------------------------------------------ | :----------------------------------------- |
| `node` | `JSXOpeningElement` \| `JSXOpeningFragment` | The visited JSXOpeningElement node object. |

#### Returns

`string`

The element's tag name.

---

### findPropInAttributes

▸ **findPropInAttributes**(`attributes`, `context`, `initialScope`): (`propName`: `string`) => `Option`\<`NonNullable`\<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

#### Parameters

| Name           | Type                                                          | Description                 |
| :------------- | :------------------------------------------------------------ | :-------------------------- |
| `attributes`   | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                    | The attributes to search in |
| `context`      | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context            |
| `initialScope` | `Scope`                                                       |                             |

#### Returns

`fn`

A function that searches for a property in the given attributes

▸ (`propName`): `Option`\<`NonNullable`\<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

##### Parameters

| Name       | Type     |
| :--------- | :------- |
| `propName` | `string` |

##### Returns

`Option`\<`NonNullable`\<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

---

### findPropInProperties

▸ **findPropInProperties**(`properties`, `context`, `initialScope`, `seenProps?`): (`propName`: `string`) => `Option`\<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

#### Parameters

| Name           | Type                                                                           | Default value | Description                                |
| :------------- | :----------------------------------------------------------------------------- | :------------ | :----------------------------------------- |
| `properties`   | `ObjectLiteralElement`[] \| (`Property` \| `RestElement` \| `SpreadElement`)[] | `undefined`   | The properties to search in                |
| `context`      | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>                  | `undefined`   | The rule context                           |
| `initialScope` | `Scope`                                                                        | `undefined`   |                                            |
| `seenProps`    | `string`[]                                                                     | `[]`          | The properties that have already been seen |

#### Returns

`fn`

A function that searches for a property in the given properties

▸ (`propName`): `Option`\<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

##### Parameters

| Name       | Type     |
| :--------- | :------- |
| `propName` | `string` |

##### Returns

`Option`\<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

---

### getFragmentFromContext

▸ **getFragmentFromContext**\<`T`\>(`context`): `string`

#### Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `T`  | extends `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `context` | `T`  |

#### Returns

`string`

---

### getPragmaFromContext

▸ **getPragmaFromContext**\<`T`\>(`context`): `string`

#### Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `T`  | extends `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `context` | `T`  |

#### Returns

`string`

---

### getProp

▸ **getProp**(`props`, `propName`, `context`, `initialScope`): `O.Option`\<`TSESTree.JSXAttribute` \| `TSESTree.JSXSpreadAttribute`\>

#### Parameters

| Name           | Type                                                          |
| :------------- | :------------------------------------------------------------ |
| `props`        | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                    |
| `propName`     | `string`                                                      |
| `context`      | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `initialScope` | `Scope`                                                       |

#### Returns

`O.Option`\<`TSESTree.JSXAttribute` \| `TSESTree.JSXSpreadAttribute`\>

---

### getPropName

▸ **getPropName**(`node`): `string`

Get the name of a JSX attribute with namespace

#### Parameters

| Name   | Type           | Description            |
| :----- | :------------- | :--------------------- |
| `node` | `JSXAttribute` | The JSX attribute node |

#### Returns

`string`

string

---

### getPropValue

▸ **getPropValue**(`attribute`, `context`): `None`\<`null` \| \{ `value`: `unknown` }\> \| `Some`\<`null` \| \{ `value`: `unknown` }\>

Gets and resolves the static value of a JSX attribute

#### Parameters

| Name        | Type                                                          | Description                           |
| :---------- | :------------------------------------------------------------ | :------------------------------------ |
| `attribute` | `JSXAttribute` \| `JSXSpreadAttribute`                        | The JSX attribute to get the value of |
| `context`   | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context                      |

#### Returns

`None`\<`null` \| \{ `value`: `unknown` }\> \| `Some`\<`null` \| \{ `value`: `unknown` }\>

The static value of the given JSX attribute

---

### hasAnyProp

▸ **hasAnyProp**(`attributes`, `propNames`, `context`, `initialScope`): `boolean`

Check if any of the given prop names are present in the given attributes

#### Parameters

| Name           | Type                                                          | Description                  |
| :------------- | :------------------------------------------------------------ | :--------------------------- |
| `attributes`   | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                    | The attributes to search in  |
| `propNames`    | `string`[]                                                    | The prop names to search for |
| `context`      | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context             |
| `initialScope` | `Scope`                                                       |                              |

#### Returns

`boolean`

`true` if any of the given prop names are present in the given attributes

---

### hasChildren

▸ **hasChildren**(`node`, `predicate?`): `boolean`

Check if a `JSXElement` or `JSXFragment` has children

#### Parameters

| Name         | Type                              | Description                        |
| :----------- | :-------------------------------- | :--------------------------------- |
| `node`       | `JSXElement` \| `JSXFragment`     | The AST node to check              |
| `predicate?` | (`node`: `JSXChild`) => `boolean` | A predicate to filter the children |

#### Returns

`boolean`

`true` if the node has children

---

### hasEveryProp

▸ **hasEveryProp**(`attributes`, `propNames`, `context`, `initialScope`): `boolean`

Check if all of the given prop names are present in the given attributes

#### Parameters

| Name           | Type                                                          | Description                  |
| :------------- | :------------------------------------------------------------ | :--------------------------- |
| `attributes`   | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                    | The attributes to search in  |
| `propNames`    | `string`[]                                                    | The prop names to search for |
| `context`      | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context             |
| `initialScope` | `Scope`                                                       |                              |

#### Returns

`boolean`

`true` if all of the given prop names are present in the given attributes

---

### hasProp

▸ **hasProp**(`attributes`, `propName`, `context`, `initialScope`): `boolean`

Check if the given prop name is present in the given attributes

#### Parameters

| Name           | Type                                                          | Description                 |
| :------------- | :------------------------------------------------------------ | :-------------------------- |
| `attributes`   | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                    | The attributes to search in |
| `propName`     | `string`                                                      | The prop name to search for |
| `context`      | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context            |
| `initialScope` | `Scope`                                                       |                             |

#### Returns

`boolean`

`true` if the given prop name is present in the given properties

---

### isCallFromPragma

▸ **isCallFromPragma**(`name`): (`node`: `CallExpression`, `context`: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>) => `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`fn`

▸ (`node`, `context`): `boolean`

##### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

##### Returns

`boolean`

---

### isCallFromPragmaMember

▸ **isCallFromPragmaMember**(`pragmaMemberName`, `name`): (`node`: `CallExpression`, `context`: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>) => `boolean`

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `pragmaMemberName` | `string` |
| `name`             | `string` |

#### Returns

`fn`

▸ (`node`, `context`): `boolean`

##### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

##### Returns

`boolean`

---

### isChildOfJSXElement

▸ **isChildOfJSXElement**(`node`): node is JSXElement & Object

Check if a node is a child of a `JSXElement`

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

node is JSXElement & Object

`true` if the node is a child of a `JSXElement`

---

### isChildrenOfCreateElement

▸ **isChildrenOfCreateElement**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `Node`                                                        |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

---

### isCloneElement

▸ **isCloneElement**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `Identifier` \| `MemberExpression`                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

---

### isCloneElementCall

▸ **isCloneElementCall**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

---

### isCreateElement

▸ **isCreateElement**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `Identifier` \| `MemberExpression`                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

---

### isCreateElementCall

▸ **isCreateElementCall**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `CallExpression`                                              |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

---

### isFragment

▸ **isFragment**(`node`, `pragma`, `fragment`): node is JSXElement \| JSXFragment

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `node`     | `Node`   |
| `pragma`   | `string` |
| `fragment` | `string` |

#### Returns

node is JSXElement \| JSXFragment

---

### isFragmentElement

▸ **isFragmentElement**(`node`, `pragma`, `fragment`): `boolean`

Check if a node is `<Fragment></Fragment>` or `<Pragma.Fragment></Pragma.Fragment>`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `node`     | `JSXElement` |
| `pragma`   | `string`     |
| `fragment` | `string`     |

#### Returns

`boolean`

---

### isFragmentSyntax

▸ **isFragmentSyntax**(`node`): node is JSXFragment

Check if a node is `<></>`

#### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `node` | `undefined` \| `null` \| `Node` |

#### Returns

node is JSXFragment

---

### isFromPragma

▸ **isFromPragma**(`name`): (`node`: `Identifier` \| `MemberExpression`, `context`: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>) => `boolean`

Checks if the given node is a call expression to the given function or method of the pragma

#### Parameters

| Name   | Type     | Description                                 |
| :----- | :------- | :------------------------------------------ |
| `name` | `string` | The name of the function or method to check |

#### Returns

`fn`

A predicate that checks if the given node is a call expression to the given function or method

▸ (`node`, `context`): `boolean`

##### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `node`    | `Identifier` \| `MemberExpression`                            |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |

##### Returns

`boolean`

---

### isFromPragmaMember

▸ **isFromPragmaMember**(`pragmaMemberName`, `name`): (`node`: `TSESTree.MemberExpression`, `context`: `RuleContext`, `pragma?`: `string`) => `boolean`

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `pragmaMemberName` | `string` |
| `name`             | `string` |

#### Returns

`fn`

A function that checks if a given node is a member expression of a Pragma member.

▸ (`node`, `context`, `pragma?`): `boolean`

##### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `node`    | `TSESTree.MemberExpression` |
| `context` | `RuleContext`               |
| `pragma?` | `string`                    |

##### Returns

`boolean`

---

### isFunctionReturningJSXValue

▸ **isFunctionReturningJSXValue**(`node`, `context`, `hint?`): `boolean`

Check if function is returning JSX

#### Parameters

| Name      | Type                                                          | Default value                  | Description                        |
| :-------- | :------------------------------------------------------------ | :----------------------------- | :--------------------------------- |
| `node`    | `TSESTreeFunction`                                            | `undefined`                    | The return statement node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | `undefined`                    | The rule context                   |
| `hint`    | `bigint`                                                      | `DEFAULT_JSX_VALUE_CHECK_HINT` | The `JSXValueCheckHint` to use     |

#### Returns

`boolean`

boolean

---

### isInitializedFromPragma

▸ **isInitializedFromPragma**(`variableName`, `context`, `initialScope`, `pragma?`): `boolean`

#### Parameters

| Name           | Type                                                          |
| :------------- | :------------------------------------------------------------ |
| `variableName` | `string`                                                      |
| `context`      | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `initialScope` | `Scope`                                                       |
| `pragma`       | `string`                                                      |

#### Returns

`boolean`

---

### isInsideCreateElementProps

▸ **isInsideCreateElementProps**(`node`, `context`): `boolean`

Determines whether inside createElement's props.

#### Parameters

| Name      | Type                                                          | Description           |
| :-------- | :------------------------------------------------------------ | :-------------------- |
| `node`    | `Node`                                                        | The AST node to check |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | The rule context      |

#### Returns

`boolean`

`true` if the node is inside createElement's props

---

### isInsidePropValue

▸ **isInsidePropValue**(`node`): `boolean`

Checks if the node is inside a prop's value

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

`true` if the node is inside a prop's value

---

### isJSXElementOfBuiltinComponent

▸ **isJSXElementOfBuiltinComponent**(`node`): node is JSXFragment

Check if a node is a `JSXFragment` of `Built-in Component` type

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

node is JSXFragment

`true` if the node is a `JSXFragment` of `Built-in Component` type

---

### isJSXElementOfUserDefinedComponent

▸ **isJSXElementOfUserDefinedComponent**(`node`): node is JSXElement

Check if a node is a `JSXElement` of `User-Defined Component` type

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

node is JSXElement

`true` if the node is a `JSXElement` of `User-Defined Component` type

---

### isJSXValue

▸ **isJSXValue**(`node`, `context`, `hint?`): `boolean`

Check if a node is a JSX value

#### Parameters

| Name      | Type                                                          | Default value                  | Description                    |
| :-------- | :------------------------------------------------------------ | :----------------------------- | :----------------------------- |
| `node`    | `undefined` \| `null` \| `Node`                               | `undefined`                    | The AST node to check          |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> | `undefined`                    | The rule context               |
| `hint`    | `bigint`                                                      | `DEFAULT_JSX_VALUE_CHECK_HINT` | The `JSXValueCheckHint` to use |

#### Returns

`boolean`

boolean

---

### isLineBreak

▸ **isLineBreak**(`node`): `boolean`

Check if a Literal or JSXText node is a line break

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

boolean

---

### isLiteral

▸ **isLiteral**(`node`): node is JSXText \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| StringLiteral

Check if a node is a Literal or JSXText

#### Parameters

| Name   | Type                            | Description           |
| :----- | :------------------------------ | :-------------------- |
| `node` | `undefined` \| `null` \| `Node` | The AST node to check |

#### Returns

node is JSXText \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| StringLiteral

boolean `true` if the node is a Literal or JSXText

---

### isPaddingSpaces

▸ **isPaddingSpaces**(`node`): `boolean`

Check if a Literal or JSXText node is padding spaces

#### Parameters

| Name   | Type   | Description           |
| :----- | :----- | :-------------------- |
| `node` | `Node` | The AST node to check |

#### Returns

`boolean`

boolean

---

### isPropertyOfPragma

▸ **isPropertyOfPragma**(`name`, `context`, `pragma?`): (`node`: `Node`) => `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `name`    | `string`                                                      |
| `context` | `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                      |

#### Returns

`fn`

▸ (`node`): `boolean`

##### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

##### Returns

`boolean`

---

### isWhiteSpace

▸ **isWhiteSpace**(`node`): `boolean`

Check if a Literal or JSXText node is whitespace

#### Parameters

| Name   | Type                   | Description           |
| :----- | :--------------------- | :-------------------- |
| `node` | `JSXText` \| `Literal` | The AST node to check |

#### Returns

`boolean`

boolean `true` if the node is whitespace

---

### traverseUpProp

▸ **traverseUpProp**(`node`, `predicate?`): `O.Option`\<`TSESTree.JSXAttribute`\>

Traverses up prop node

#### Parameters

| Name        | Type                                  | Default value | Description                           |
| :---------- | :------------------------------------ | :------------ | :------------------------------------ |
| `node`      | `Node`                                | `undefined`   | The AST node to start traversing from |
| `predicate` | (`node`: `JSXAttribute`) => `boolean` | `F.constTrue` | The predicate to check each node      |

#### Returns

`O.Option`\<`TSESTree.JSXAttribute`\>

prop node if found
