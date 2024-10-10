[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / isTagged

# Function: isTagged()

Tests if a value is an `object` with a property `_tag` that matches the given tag.

## Param

The value to test.

## Param

The tag to test for.

## Example

```ts
import { isTagged } from "effect/Predicate"

assert.deepStrictEqual(isTagged(1, "a"), false)
assert.deepStrictEqual(isTagged(null, "a"), false)
assert.deepStrictEqual(isTagged({}, "a"), false)
assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
```

## Since

2.0.0

## isTagged(tag)

> **isTagged**\<`K`\>(`tag`): (`self`) => `self is Object`

Tests if a value is an `object` with a property `_tag` that matches the given tag.

### Type Parameters

• **K** *extends* `string`

### Parameters

• **tag**: `K`

### Returns

`Function`

#### Parameters

• **self**: `unknown`

#### Returns

`self is Object`

### Param

The value to test.

### Param

The tag to test for.

### Example

```ts
import { isTagged } from "effect/Predicate"

assert.deepStrictEqual(isTagged(1, "a"), false)
assert.deepStrictEqual(isTagged(null, "a"), false)
assert.deepStrictEqual(isTagged({}, "a"), false)
assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
```

### Since

2.0.0

## isTagged(self, tag)

> **isTagged**\<`K`\>(`self`, `tag`): `self is Object`

Tests if a value is an `object` with a property `_tag` that matches the given tag.

### Type Parameters

• **K** *extends* `string`

### Parameters

• **self**: `unknown`

• **tag**: `K`

### Returns

`self is Object`

### Param

The value to test.

### Param

The tag to test for.

### Example

```ts
import { isTagged } from "effect/Predicate"

assert.deepStrictEqual(isTagged(1, "a"), false)
assert.deepStrictEqual(isTagged(null, "a"), false)
assert.deepStrictEqual(isTagged({}, "a"), false)
assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
```

### Since

2.0.0
