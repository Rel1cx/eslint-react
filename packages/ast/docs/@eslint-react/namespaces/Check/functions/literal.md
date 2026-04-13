[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / literal

# Function: literal()

## Call Signature

```ts
function literal(node: Node): node is Literal;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |

### Returns

`node is Literal`

## Call Signature

```ts
function literal(node: Node, ofKind: "boolean"): node is BooleanLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |
| `ofKind` | `"boolean"` |

### Returns

`node is BooleanLiteral`

## Call Signature

```ts
function literal(node: Node, ofKind: "null"): node is NullLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |
| `ofKind` | `"null"` |

### Returns

`node is NullLiteral`

## Call Signature

```ts
function literal(node: Node, ofKind: "number"): node is NumberLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |
| `ofKind` | `"number"` |

### Returns

`node is NumberLiteral`

## Call Signature

```ts
function literal(node: Node, ofKind: "regexp"): node is RegExpLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |
| `ofKind` | `"regexp"` |

### Returns

`node is RegExpLiteral`

## Call Signature

```ts
function literal(node: Node, ofKind: "string"): node is StringLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |
| `ofKind` | `"string"` |

### Returns

`node is StringLiteral`
