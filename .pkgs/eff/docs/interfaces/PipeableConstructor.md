[@local/eff](../README.md) / PipeableConstructor

# Interface: PipeableConstructor

Constructor type for classes whose instances implement `Pipeable`.

**When to use**

Use as the constructor-side type when a class value should be known to create
instances that support Effect-style method chaining with `.pipe(...)`.

## See

- [Pipeable](Pipeable.md) for the instance-side contract
- [Class](../variables/Class.md) for the base constructor
- [Mixin](../functions/Mixin.md) for wrapping an existing class constructor

## Since

3.15.0

## Constructors

### Constructor

```ts
new PipeableConstructor(...args: readonly any[]): Pipeable;
```

#### Parameters

| Parameter | Type             |
| --------- | ---------------- |
| ...`args` | readonly `any`[] |

#### Returns

[`Pipeable`](Pipeable.md)
