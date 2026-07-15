[@local/eff](../README.md) / Mixin

# Function: Mixin()

```ts
function Mixin<TBase>(klass: TBase): TBase & PipeableConstructor;
```

Returns a subclass of the provided class that adds the standard `pipe`
method.

**When to use**

Use to add pipe support to an existing class without extending a base class
or modifying its prototype.

**Details**

The original constructor and instance members are preserved, and the added
method delegates to `pipeArguments`.

## Type Parameters

| Type Parameter                                           |
| -------------------------------------------------------- |
| `TBase` _extends_ (...`args`: readonly `any`[]) => `any` |

## Parameters

| Parameter | Type    |
| --------- | ------- |
| `klass`   | `TBase` |

## Returns

`TBase` & [`PipeableConstructor`](../interfaces/PipeableConstructor.md)

## See

- [Prototype](../variables/Prototype.md) for a reusable prototype object
- [Class](../variables/Class.md) for a base constructor to extend

## Since

4.0.0
