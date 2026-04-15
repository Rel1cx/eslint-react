[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isLiteral

# Function: isLiteral()

## Call Signature

```ts
function isLiteral(): (node: Node) => node is Literal;
```

### Returns

(`node`: `Node`) => `node is Literal`

## Call Signature

```ts
function isLiteral(kind: "boolean"): (node: Node) => node is BooleanLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `"boolean"` |

### Returns

(`node`: `Node`) => `node is BooleanLiteral`

## Call Signature

```ts
function isLiteral(kind: "null"): (node: Node) => node is NullLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `"null"` |

### Returns

(`node`: `Node`) => `node is NullLiteral`

## Call Signature

```ts
function isLiteral(kind: "number"): (node: Node) => node is NumberLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `"number"` |

### Returns

(`node`: `Node`) => `node is NumberLiteral`

## Call Signature

```ts
function isLiteral(kind: "regexp"): (node: Node) => node is RegExpLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `"regexp"` |

### Returns

(`node`: `Node`) => `node is RegExpLiteral`

## Call Signature

```ts
function isLiteral(kind: "string"): (node: Node) => node is StringLiteral;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `kind` | `"string"` |

### Returns

(`node`: `Node`) => `node is StringLiteral`
