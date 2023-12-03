[@eslint-react/tools](../README.md) / M

# Namespace: M

## Table of contents

### References

- [P](M.md#p)

### Namespaces

- [Pattern](M.Pattern.md)

### Functions

- [isMatching](M.md#ismatching)
- [match](M.md#match)

## References

### P

Renames and re-exports [Pattern](M.Pattern.md)

## Functions

### isMatching

▸ **isMatching**\<`p`\>(`pattern`): (`value`: `unknown`) => value is infer\<p\>

`isMatching` takes pattern and returns a **type guard** function, cheching if a value matches this pattern.

[Read documentation for `isMatching` on GitHub](https://github.com/gvergnaud/ts-pattern#ismatching)

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `p`  | extends `UnknownPattern` |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `pattern` | `p`  |

#### Returns

`fn`

▸ (`value`): value is infer\<p\>

##### Parameters

| Name    | Type      |
| :------ | :-------- |
| `value` | `unknown` |

##### Returns

value is infer\<p\>

**`Example`**

```ts
const hasName = isMatching({ name: P.string });

declare let input: unknown;

if (hasName(input)) {
  // `input` inferred as { name: string }
  return input.name;
}
```

▸ **isMatching**\<`p`\>(`pattern`, `value`): value is InvertPattern\<p, unknown\>

`isMatching` takes pattern and a value and checks if the value matches this pattern.

[Read documentation for `isMatching` on GitHub](https://github.com/gvergnaud/ts-pattern#ismatching)

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `p`  | extends `UnknownPattern` |

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `pattern` | `p`       |
| `value`   | `unknown` |

#### Returns

value is InvertPattern\<p, unknown\>

**`Example`**

```ts
declare let input: unknown;

if (isMatching({ name: P.string }, input)) {
  // `input` inferred as { name: string }
  return input.name;
}
```

---

### match

▸ **match**\<`input`, `output`\>(`value`): `Match`\<`input`, `output`\>

`match` creates a **pattern matching expression**.

- Use `.with(pattern, handler)` to pattern match on the input.
- Use `.exhaustive()` or `.otherwise(() => defaultValue)` to end the expression and get the result.

[Read the documentation for `match` on GitHub](https://github.com/gvergnaud/ts-pattern#match)

#### Type parameters

| Name     | Type           |
| :------- | :------------- |
| `input`  | `input`        |
| `output` | typeof `unset` |

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `value` | `input` |

#### Returns

`Match`\<`input`, `output`\>

**`Example`**

```ts
declare let input: "A" | "B";

return match(input)
  .with("A", () => "It's an A!")
  .with("B", () => "It's a B!")
  .exhaustive();
```
