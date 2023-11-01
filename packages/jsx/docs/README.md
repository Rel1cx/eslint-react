@eslint-react/jsx

# @eslint-react/jsx

## Table of contents

### Type Aliases

- [CallFromPragmaPredicate](README.md#callfrompragmapredicate)
- [JSXValueCheckOptions](README.md#jsxvaluecheckoptions)

### Variables

- [defaultJSXValueCheckOptions](README.md#defaultjsxvaluecheckoptions)
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
- [getPropName](README.md#getpropname)
- [getPropNameWithNamespace](README.md#getpropnamewithnamespace)
- [getPropValue](README.md#getpropvalue)
- [hasAnyProp](README.md#hasanyprop)
- [hasChildren](README.md#haschildren)
- [hasEveryProp](README.md#haseveryprop)
- [hasProp](README.md#hasprop)
- [isCallFromPragma](README.md#iscallfrompragma)
- [isChildOfBuiltinComponentElement](README.md#ischildofbuiltincomponentelement)
- [isChildOfUserDefinedComponentElement](README.md#ischildofuserdefinedcomponentelement)
- [isChildrenOfCreateElement](README.md#ischildrenofcreateelement)
- [isCloneElementCall](README.md#iscloneelementcall)
- [isCreateElementCall](README.md#iscreateelementcall)
- [isFragment](README.md#isfragment)
- [isFragmentHasLessThanTwoChildren](README.md#isfragmenthaslessthantwochildren)
- [isFragmentWithOnlyTextAndIsNotChild](README.md#isfragmentwithonlytextandisnotchild)
- [isFragmentWithSingleExpression](README.md#isfragmentwithsingleexpression)
- [isFunctionReturningJSXValue](README.md#isfunctionreturningjsxvalue)
- [isInitializedFromPragma](README.md#isinitializedfrompragma)
- [isInsideCreateElementProps](README.md#isinsidecreateelementprops)
- [isInsidePropValue](README.md#isinsidepropvalue)
- [isJSXValue](README.md#isjsxvalue)
- [isLineBreak](README.md#islinebreak)
- [isLiteral](README.md#isliteral)
- [isPaddingSpaces](README.md#ispaddingspaces)
- [isPropertyOfPragma](README.md#ispropertyofpragma)
- [isWhiteSpace](README.md#iswhitespace)
- [traverseUpProp](README.md#traverseupprop)

## Type Aliases

### CallFromPragmaPredicate

Ƭ **CallFromPragmaPredicate**: (`node`: `TSESTree.Node`, `context`: `RuleContext`) => node is TSESTree.CallExpression

#### Type declaration

▸ (`node`, `context`): node is TSESTree.CallExpression

##### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `node`    | `TSESTree.Node` |
| `context` | `RuleContext`   |

##### Returns

node is TSESTree.CallExpression

---

### JSXValueCheckOptions

Ƭ **JSXValueCheckOptions**: `Object`

#### Type declaration

| Name          | Type      | Description                                                 |
| :------------ | :-------- | :---------------------------------------------------------- |
| `ignoreNull?` | `boolean` | Whether to ignore null values                               |
| `strict?`     | `boolean` | Whether to check all branches of the conditional expression |

## Variables

### defaultJSXValueCheckOptions

• `Const` **defaultJSXValueCheckOptions**: `Object`

#### Type declaration

| Name         | Type    |
| :----------- | :------ |
| `ignoreNull` | `false` |
| `strict`     | `false` |

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

▸ **findPropInAttributes**(`attributes`, `context`): (`propName`: `string`) => `Option`<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

#### Parameters

| Name         | Type                                                        | Description                 |
| :----------- | :---------------------------------------------------------- | :-------------------------- |
| `attributes` | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                  | The attributes to search in |
| `context`    | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context            |

#### Returns

`fn`

A function that searches for a property in the given attributes

▸ (`propName`): `Option`<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

##### Parameters

| Name       | Type     |
| :--------- | :------- |
| `propName` | `string` |

##### Returns

`Option`<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

---

### findPropInProperties

▸ **findPropInProperties**(`properties`, `context`, `seenProps?`): (`propName`: `string`) => `Option`<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

#### Parameters

| Name         | Type                                                        | Default value | Description                                |
| :----------- | :---------------------------------------------------------- | :------------ | :----------------------------------------- |
| `properties` | `ObjectLiteralElement`[] \| (`Property` \| `RestElement`)[] | `undefined`   | The properties to search in                |
| `context`    | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | `undefined`   | The rule context                           |
| `seenProps`  | `string`[]                                                  | `[]`          | The properties that have already been seen |

#### Returns

`fn`

A function that searches for a property in the given properties

▸ (`propName`): `Option`<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

##### Parameters

| Name       | Type     |
| :--------- | :------- |
| `propName` | `string` |

##### Returns

`Option`<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

---

### getFragmentFromContext

▸ **getFragmentFromContext**<`T`\>(`context`): `string`

#### Type parameters

| Name | Type                                                                |
| :--- | :------------------------------------------------------------------ |
| `T`  | extends `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `context` | `T`  |

#### Returns

`string`

---

### getPragmaFromContext

▸ **getPragmaFromContext**<`T`\>(`context`): `string`

#### Type parameters

| Name | Type                                                                |
| :--- | :------------------------------------------------------------------ |
| `T`  | extends `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `context` | `T`  |

#### Returns

`string`

---

### getPropName

▸ **getPropName**(`node`): `string`

Get the name of a JSX attribute

#### Parameters

| Name   | Type           | Description            |
| :----- | :------------- | :--------------------- |
| `node` | `JSXAttribute` | The JSX attribute node |

#### Returns

`string`

string

---

### getPropNameWithNamespace

▸ **getPropNameWithNamespace**(`node`): `string`

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

▸ **getPropValue**(`attribute`, `context`): `None`<`null` \| { `value`: `unknown` }\> \| `Some`<`null` \| { `value`: `unknown` }\>

Gets and resolves the static value of a JSX attribute

#### Parameters

| Name        | Type                                                        | Description                           |
| :---------- | :---------------------------------------------------------- | :------------------------------------ |
| `attribute` | `JSXAttribute` \| `JSXSpreadAttribute`                      | The JSX attribute to get the value of |
| `context`   | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context                      |

#### Returns

`None`<`null` \| { `value`: `unknown` }\> \| `Some`<`null` \| { `value`: `unknown` }\>

The static value of the given JSX attribute

---

### hasAnyProp

▸ **hasAnyProp**(`attributes`, `propNames`, `context`): `boolean`

Check if any of the given prop names are present in the given attributes

#### Parameters

| Name         | Type                                                        | Description                  |
| :----------- | :---------------------------------------------------------- | :--------------------------- |
| `attributes` | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                  | The attributes to search in  |
| `propNames`  | `string`[]                                                  | The prop names to search for |
| `context`    | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context             |

#### Returns

`boolean`

`true` if any of the given prop names are present in the given attributes

---

### hasChildren

▸ **hasChildren**(`node`): `boolean`

Check if a JSXElement or JSXFragment has children

#### Parameters

| Name   | Type                          | Description           |
| :----- | :---------------------------- | :-------------------- |
| `node` | `JSXElement` \| `JSXFragment` | The AST node to check |

#### Returns

`boolean`

`true` if the node has children

---

### hasEveryProp

▸ **hasEveryProp**(`attributes`, `propNames`, `context`): `boolean`

Check if all of the given prop names are present in the given attributes

#### Parameters

| Name         | Type                                                        | Description                  |
| :----------- | :---------------------------------------------------------- | :--------------------------- |
| `attributes` | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                  | The attributes to search in  |
| `propNames`  | `string`[]                                                  | The prop names to search for |
| `context`    | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context             |

#### Returns

`boolean`

`true` if all of the given prop names are present in the given attributes

---

### hasProp

▸ **hasProp**(`attributes`, `propName`, `context`): `boolean`

Check if the given prop name is present in the given attributes

#### Parameters

| Name         | Type                                                        | Description                 |
| :----------- | :---------------------------------------------------------- | :-------------------------- |
| `attributes` | (`JSXAttribute` \| `JSXSpreadAttribute`)[]                  | The attributes to search in |
| `propName`   | `string`                                                    | The prop name to search for |
| `context`    | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context            |

#### Returns

`boolean`

`true` if the given prop name is present in the given properties

---

### isCallFromPragma

▸ **isCallFromPragma**(`name`): (`node`: `Node`, `context`: `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\>) => node is CallExpression

Checks if the given node is a call expression to the given function or method of the pragma

#### Parameters

| Name   | Type     | Description                                 |
| :----- | :------- | :------------------------------------------ |
| `name` | `string` | The name of the function or method to check |

#### Returns

`fn`

A predicate that checks if the given node is a call expression to the given function or method

▸ (`node`, `context`): node is CallExpression

##### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `node`    | `Node`                                                      |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

##### Returns

node is CallExpression

---

### isChildOfBuiltinComponentElement

▸ **isChildOfBuiltinComponentElement**(`node`): `boolean`

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `node` | `Node` |

#### Returns

`boolean`

---

### isChildOfUserDefinedComponentElement

▸ **isChildOfUserDefinedComponentElement**(`node`, `pragma`, `fragment`): `boolean`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `node`     | `Node`   |
| `pragma`   | `string` |
| `fragment` | `string` |

#### Returns

`boolean`

---

### isChildrenOfCreateElement

▸ **isChildrenOfCreateElement**(`node`, `context`): `boolean`

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `node`    | `Node`                                                      |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

---

### isCloneElementCall

▸ **isCloneElementCall**(`node`, `context`): node is CallExpression

Checks if the given node is a call expression to `cloneElement`

#### Parameters

| Name      | Type                                                        | Description           |
| :-------- | :---------------------------------------------------------- | :-------------------- |
| `node`    | `Node`                                                      | The AST node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context      |

#### Returns

node is CallExpression

`true` if the node is a call expression to `cloneElement`

---

### isCreateElementCall

▸ **isCreateElementCall**(`node`, `context`): node is CallExpression

Checks if the given node is a call expression to `createElement`

#### Parameters

| Name      | Type                                                        | Description           |
| :-------- | :---------------------------------------------------------- | :-------------------- |
| `node`    | `Node`                                                      | The AST node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context      |

#### Returns

node is CallExpression

`true` if the node is a call expression to `createElement`

---

### isFragment

▸ **isFragment**(`node`, `pragma`, `fragment`): `boolean`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `node`     | `JSXElement` |
| `pragma`   | `string`     |
| `fragment` | `string`     |

#### Returns

`boolean`

---

### isFragmentHasLessThanTwoChildren

▸ **isFragmentHasLessThanTwoChildren**(`node`): `boolean`

Check if a JSXElement or JSXFragment has less than two non-padding children and the first child is not a call expression

#### Parameters

| Name   | Type                          | Description           |
| :----- | :---------------------------- | :-------------------- |
| `node` | `JSXElement` \| `JSXFragment` | The AST node to check |

#### Returns

`boolean`

boolean

---

### isFragmentWithOnlyTextAndIsNotChild

▸ **isFragmentWithOnlyTextAndIsNotChild**(`node`): `boolean`

Check if a JSXElement or JSXFragment has only one literal child and is not a child

#### Parameters

| Name   | Type                          | Description           |
| :----- | :---------------------------- | :-------------------- |
| `node` | `JSXElement` \| `JSXFragment` | The AST node to check |

#### Returns

`boolean`

`true` if the node has only one literal child and is not a child

**`Example`**

```ts
Somehow fragment like this is useful: <Foo content={<>ee eeee eeee ...</>} />
```

---

### isFragmentWithSingleExpression

▸ **isFragmentWithSingleExpression**(`node`): `boolean`

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `node` | `JSXElement` \| `JSXFragment` |

#### Returns

`boolean`

---

### isFunctionReturningJSXValue

▸ **isFunctionReturningJSXValue**(`node`, `context`, `options?`): `boolean`

Check if function is returning JSX

#### Parameters

| Name       | Type                                                        | Description                        |
| :--------- | :---------------------------------------------------------- | :--------------------------------- |
| `node`     | `TSESTreeFunction`                                          | The return statement node to check |
| `context`  | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context                   |
| `options?` | [`JSXValueCheckOptions`](README.md#jsxvaluecheckoptions)    | The JSX value check options        |

#### Returns

`boolean`

boolean

---

### isInitializedFromPragma

▸ **isInitializedFromPragma**(`variableName`, `context`, `pragma?`): `boolean`

#### Parameters

| Name           | Type                                                        |
| :------------- | :---------------------------------------------------------- |
| `variableName` | `string`                                                    |
| `context`      | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |
| `pragma`       | `string`                                                    |

#### Returns

`boolean`

---

### isInsideCreateElementProps

▸ **isInsideCreateElementProps**(`node`, `context`): `boolean`

Determines whether inside createElement's props.

#### Parameters

| Name      | Type                                                        | Description           |
| :-------- | :---------------------------------------------------------- | :-------------------- |
| `node`    | `Node`                                                      | The AST node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context      |

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

### isJSXValue

▸ **isJSXValue**(`node`, `context`, `options?`): `boolean`

Check if a node is a JSX value

#### Parameters

| Name      | Type                                                        | Default value                 | Description                       |
| :-------- | :---------------------------------------------------------- | :---------------------------- | :-------------------------------- |
| `node`    | `undefined` \| `null` \| `Node`                             | `undefined`                   | The AST node to check             |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | `undefined`                   | The rule context                  |
| `options` | [`JSXValueCheckOptions`](README.md#jsxvaluecheckoptions)    | `defaultJSXValueCheckOptions` | The `JSXValueCheckOptions` to use |

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

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `name`    | `string`                                                    |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |
| `pragma`  | `string`                                                    |

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

▸ **traverseUpProp**(`node`, `predicate?`): `O.Option`<`TSESTree.JSXAttribute`\>

Traverses up prop node

#### Parameters

| Name        | Type                                  | Default value | Description                           |
| :---------- | :------------------------------------ | :------------ | :------------------------------------ |
| `node`      | `Node`                                | `undefined`   | The AST node to start traversing from |
| `predicate` | (`node`: `JSXAttribute`) => `boolean` | `F.constTrue` | The predicate to check each node      |

#### Returns

`O.Option`<`TSESTree.JSXAttribute`\>

prop node if found
