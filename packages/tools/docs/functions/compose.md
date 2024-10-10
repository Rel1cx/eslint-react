[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / compose

# Function: compose()

## Since

2.0.0

## compose(bc)

> **compose**\<`A`, `B`, `C`\>(`bc`): (`ab`) => [`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **bc**: [`Refinement`](../interfaces/Refinement.md)\<`B`, `C`\>

### Returns

`Function`

#### Parameters

• **ab**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

#### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

### Since

2.0.0

### Since

2.0.0

## compose(bc)

> **compose**\<`A`, `B`\>(`bc`): (`ab`) => [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

### Type Parameters

• **A**

• **B**

### Parameters

• **bc**: [`Predicate`](../interfaces/Predicate.md)\<`NoInfer`\<`B`\>\>

### Returns

`Function`

#### Parameters

• **ab**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

#### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

### Since

2.0.0

### Since

2.0.0

## compose(ab, bc)

> **compose**\<`A`, `B`, `C`\>(`ab`, `bc`): [`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **ab**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

• **bc**: [`Refinement`](../interfaces/Refinement.md)\<`B`, `C`\>

### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `C`\>

### Since

2.0.0

### Since

2.0.0

## compose(ab, bc)

> **compose**\<`A`, `B`\>(`ab`, `bc`): [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

### Type Parameters

• **A**

• **B**

### Parameters

• **ab**: [`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

• **bc**: [`Predicate`](../interfaces/Predicate.md)\<`NoInfer`\<`B`\>\>

### Returns

[`Refinement`](../interfaces/Refinement.md)\<`A`, `B`\>

### Since

2.0.0

### Since

2.0.0
