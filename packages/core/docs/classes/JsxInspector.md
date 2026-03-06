[@eslint-react/core](../README.md) / JsxInspector

# Class: JsxInspector

A stateful helper that binds an ESLint `RuleContext` once and exposes
ergonomic methods for the most common JSX inspection tasks that rules need.

### Typical usage inside a rule's `create` function

```ts
export function create(context: RuleContext) {
  const jsx = JsxInspector.from(context);

  return defineRuleListener({
    JSXElement(node) {
      // element type
      const type = jsx.getElementType(node);           // "div" | "React.Fragment" | …

      // attribute lookup + value resolution in one step
      const val  = jsx.getAttributeValue(node, "sandbox");
      if (typeof val?.getStatic() === "string") { … }

      // simple boolean checks
      if (jsx.isHostElement(node)) { … }
      if (jsx.isFragmentElement(node)) { … }
      if (jsx.hasAttribute(node, "key")) { … }
    },
  });
}
```

## Properties

| Property | Modifier | Type |
| ------ | ------ | ------ |
| <a id="property-context"></a> `context` | `readonly` | `RuleContext` |

## Accessors

### jsxConfig

#### Get Signature

```ts
get jsxConfig(): Required<JsxConfig>;
```

Merged JSX configuration (tsconfig compiler options + pragma annotations).
The result is lazily computed and cached for the lifetime of this inspector.

##### Returns

[`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[`JsxConfig`](../interfaces/JsxConfig.md)\>

## Methods

### findAttribute()

```ts
findAttribute(node: JSXElement, name: string): TSESTreeJSXAttributeLike | undefined;
```

Find a JSX attribute (or spread attribute containing the property) by name
on a given element.

Returns the **last** matching attribute (to mirror React's behaviour where
later props win), or `undefined` if not found.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXElement` | The JSX element to search for the attribute. |
| `name` | `string` | The name of the attribute to find (ex: `"className"`). |

#### Returns

`TSESTreeJSXAttributeLike` \| `undefined`

***

### getAttributeName()

```ts
getAttributeName(node: JSXAttribute): string;
```

Get the stringified name of a `JSXAttribute` node
(ex: `"className"`, `"aria-label"`, `"xml:space"`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXAttribute` | The `JSXAttribute` node to extract the name from. |

#### Returns

`string`

The stringified name of the attribute.

***

### getAttributeStaticValue()

```ts
getAttributeStaticValue(node: JSXElement, name: string): unknown;
```

Resolve the static value of an attribute, automatically handling the
`spreadProps` case by extracting the named property.

This eliminates the repetitive pattern:
```ts
const v = core.resolveJsxAttributeValue(ctx, attr);
const s = v.kind === "spreadProps" ? v.getProperty(name) : v.toStatic();
```

Returns `undefined` when the attribute is not present or its value
cannot be statically determined.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXElement` | The JSX element to search for the attribute. |
| `name` | `string` | The name of the attribute to resolve (ex: `"className"`). |

#### Returns

`unknown`

The static value of the attribute, or `undefined` if not found or not statically resolvable.

***

### getAttributeValue()

```ts
getAttributeValue(node: JSXElement, name: string): JsxAttributeValue | undefined;
```

**All-in-one helper** – find an attribute by name on an element *and*
resolve its value in a single call.

Returns `undefined` when the attribute is not present.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXElement` | The JSX element to search for the attribute. |
| `name` | `string` | The name of the attribute to find and resolve (ex: `"className"`). |

#### Returns

[`JsxAttributeValue`](../type-aliases/JsxAttributeValue.md) \| `undefined`

A descriptor of the attribute's value that can be further inspected, or `undefined` if the attribute is not found.

***

### getElementSelfName()

```ts
getElementSelfName(node: JSXElement | JSXFragment): string;
```

Get the **self name** (last segment) of a JSX element type.

- `<Foo.Bar.Baz>` → `"Baz"`
- `<div>` → `"div"`
- `<></>` → `""`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXElement` \| `JSXFragment` | The JSX element or fragment to extract the self name from. |

#### Returns

`string`

***

### getElementType()

```ts
getElementType(node: JSXElement | JSXFragment): string;
```

Get the string representation of a JSX element's type.

- `<div>` → `"div"`
- `<Foo.Bar>` → `"Foo.Bar"`
- `<React.Fragment>` → `"React.Fragment"`
- `<></>` (JSXFragment) → `""`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXElement` \| `JSXFragment` | The JSX element or fragment to extract the type from. |

#### Returns

`string`

***

### hasAttribute()

```ts
hasAttribute(node: JSXElement, name: string): boolean;
```

Shorthand: check whether an attribute exists on the element.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXElement` | The JSX element to check for the attribute. |
| `name` | `string` | The name of the attribute to check for (ex: `"className"`). |

#### Returns

`boolean`

`true` if the attribute exists on the element, `false` otherwise.

***

### isFragmentElement()

```ts
isFragmentElement(node: Node): node is JSXElement | JSXFragment;
```

Whether the node is a React **Fragment** element (either `<Fragment>` /
`<React.Fragment>` or the shorthand `<>` syntax).

The check honours the configured `jsxFragmentFactory`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The node to check. |

#### Returns

node is JSXElement \| JSXFragment

***

### isHostElement()

```ts
isHostElement(node: Node): node is JSXElement;
```

Whether the node is a **host** (intrinsic / DOM) element – i.e. its tag
name starts with a lowercase letter.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The node to check. |

#### Returns

`node is JSXElement`

***

### resolveAttributeValue()

```ts
resolveAttributeValue(attribute: TSESTreeJSXAttributeLike): 
  | {
  kind: "boolean";
  node?: undefined;
  getChildren?: ;
  toStatic: true;
}
  | {
  kind: "literal";
  node:   | BigIntLiteral
     | BooleanLiteral
     | NullLiteral
     | NumberLiteral
     | RegExpLiteral
     | StringLiteral;
  getChildren?: ;
  toStatic:   | string
     | number
     | bigint
     | boolean
     | RegExp
     | null;
}
  | {
  kind: "missing";
  node: JSXEmptyExpression;
  getChildren?: ;
  toStatic: null;
}
  | {
  kind: "expression";
  node: Expression;
  getChildren?: ;
  toStatic: unknown;
}
  | {
  kind: "element";
  node: JSXElement;
  getChildren?: ;
  toStatic: null;
}
  | {
  kind: "spreadChild";
  node: JSXEmptyExpression | Expression;
  getChildren: null;
  toStatic: null;
}
  | {
  kind: "spreadProps";
  node: Expression;
  getProperty: unknown;
  toStatic: null;
};
```

Resolve the *value* of a JSX attribute (or spread attribute) into a
descriptor that can be inspected further.

See [JsxAttributeValue](../type-aliases/JsxAttributeValue.md) for the full set of `kind` discriminants.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attribute` | `TSESTreeJSXAttributeLike` | The attribute node to resolve the value of. |

#### Returns

  \| \{
  `kind`: `"boolean"`;
  `node?`: `undefined`;
  `getChildren?`: ;
  `toStatic`: `true`;
\}
  \| \{
  `kind`: `"literal"`;
  `node`:   \| `BigIntLiteral`
     \| `BooleanLiteral`
     \| `NullLiteral`
     \| `NumberLiteral`
     \| `RegExpLiteral`
     \| `StringLiteral`;
  `getChildren?`: ;
  `toStatic`:   \| `string`
     \| `number`
     \| `bigint`
     \| `boolean`
     \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
     \| `null`;
\}
  \| \{
  `kind`: `"missing"`;
  `node`: `JSXEmptyExpression`;
  `getChildren?`: ;
  `toStatic`: `null`;
\}
  \| \{
  `kind`: `"expression"`;
  `node`: `Expression`;
  `getChildren?`: ;
  `toStatic`: `unknown`;
\}
  \| \{
  `kind`: `"element"`;
  `node`: `JSXElement`;
  `getChildren?`: ;
  `toStatic`: `null`;
\}
  \| \{
  `kind`: `"spreadChild"`;
  `node`: `JSXEmptyExpression` \| `Expression`;
  `getChildren`: `null`;
  `toStatic`: `null`;
\}
  \| \{
  `kind`: `"spreadProps"`;
  `node`: `Expression`;
  `getProperty`: `unknown`;
  `toStatic`: `null`;
\}

A descriptor of the attribute's value that can be further inspected.

***

### findParentAttribute()

```ts
static findParentAttribute(node: Node, test?: (node: JSXAttribute) => boolean): JSXAttribute | null;
```

Walk **up** the AST from `node` to find the nearest ancestor that is a
`JSXAttribute` and passes the optional `test` predicate.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The starting node for the search. |
| `test` | (`node`: `JSXAttribute`) => `boolean` | A predicate function to test each ancestor node. |

#### Returns

`JSXAttribute` \| `null`

***

### from()

```ts
static from(context: RuleContext): JsxInspector;
```

Create a new `JsxInspector` bound to the given rule context.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context to bind to this inspector instance. |

#### Returns

`JsxInspector`

***

### isJsxText()

```ts
static isJsxText(node: Node | null): node is JSXText | Literal;
```

Whether the node is a `JSXText` or a `Literal` node.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `null` | The node to check. |

#### Returns

node is JSXText \| Literal
