[@eslint-react/shared](../README.md) / IdGenerator

# Class: IdGenerator

A generator for unique ids.

## Constructors

### Constructor

```ts
new IdGenerator(prefix: string): IdGenerator;
```

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `prefix` | `string` | `"id_"` | Optional. A prefix of generated ids. |

#### Returns

`IdGenerator`

## Methods

### next()

```ts
next(): string;
```

Generates an id.

#### Returns

`string`

A generated id.
