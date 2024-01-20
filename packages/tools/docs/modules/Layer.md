[@eslint-react/tools](../README.md) / Layer

# Namespace: Layer

## Table of contents

### Namespaces

- [Layer](Layer.Layer.md)

### Interfaces

- [Layer](../interfaces/Layer.Layer-1.md)
- [MemoMap](../interfaces/Layer.MemoMap.md)

### Type Aliases

- [LayerTypeId](Layer.md#layertypeid)
- [MemoMapTypeId](Layer.md#memomaptypeid)

### Variables

- [LayerTypeId](Layer.md#layertypeid-1)
- [MemoMapTypeId](Layer.md#memomaptypeid-1)
- [empty](Layer.md#empty)
- [makeMemoMap](Layer.md#makememomap)
- [scope](Layer.md#scope)

### Functions

- [build](Layer.md#build)
- [buildWithMemoMap](Layer.md#buildwithmemomap)
- [buildWithScope](Layer.md#buildwithscope)
- [catchAll](Layer.md#catchall)
- [catchAllCause](Layer.md#catchallcause)
- [context](Layer.md#context)
- [die](Layer.md#die)
- [dieSync](Layer.md#diesync)
- [discard](Layer.md#discard)
- [effect](Layer.md#effect)
- [effectContext](Layer.md#effectcontext)
- [effectDiscard](Layer.md#effectdiscard)
- [extendScope](Layer.md#extendscope)
- [fail](Layer.md#fail)
- [failCause](Layer.md#failcause)
- [failCauseSync](Layer.md#failcausesync)
- [failSync](Layer.md#failsync)
- [fiberRefLocallyScopedWith](Layer.md#fiberreflocallyscopedwith)
- [flatMap](Layer.md#flatmap)
- [flatten](Layer.md#flatten)
- [fresh](Layer.md#fresh)
- [function](Layer.md#function)
- [isFresh](Layer.md#isfresh)
- [isLayer](Layer.md#islayer)
- [launch](Layer.md#launch)
- [locally](Layer.md#locally)
- [locallyEffect](Layer.md#locallyeffect)
- [locallyScoped](Layer.md#locallyscoped)
- [locallyWith](Layer.md#locallywith)
- [map](Layer.md#map)
- [mapError](Layer.md#maperror)
- [match](Layer.md#match)
- [matchCause](Layer.md#matchcause)
- [memoize](Layer.md#memoize)
- [merge](Layer.md#merge)
- [mergeAll](Layer.md#mergeall)
- [orDie](Layer.md#ordie)
- [orElse](Layer.md#orelse)
- [parentSpan](Layer.md#parentspan)
- [passthrough](Layer.md#passthrough)
- [project](Layer.md#project)
- [provide](Layer.md#provide)
- [provideMerge](Layer.md#providemerge)
- [retry](Layer.md#retry)
- [scoped](Layer.md#scoped)
- [scopedContext](Layer.md#scopedcontext)
- [scopedDiscard](Layer.md#scopeddiscard)
- [service](Layer.md#service)
- [setClock](Layer.md#setclock)
- [setConfigProvider](Layer.md#setconfigprovider)
- [setRequestBatching](Layer.md#setrequestbatching)
- [setRequestCache](Layer.md#setrequestcache)
- [setRequestCaching](Layer.md#setrequestcaching)
- [setScheduler](Layer.md#setscheduler)
- [setTracer](Layer.md#settracer)
- [setTracerTiming](Layer.md#settracertiming)
- [setUnhandledErrorLogLevel](Layer.md#setunhandlederrorloglevel)
- [span](Layer.md#span)
- [succeed](Layer.md#succeed)
- [succeedContext](Layer.md#succeedcontext)
- [suspend](Layer.md#suspend)
- [sync](Layer.md#sync)
- [syncContext](Layer.md#synccontext)
- [tap](Layer.md#tap)
- [tapError](Layer.md#taperror)
- [tapErrorCause](Layer.md#taperrorcause)
- [toRuntime](Layer.md#toruntime)
- [unwrapEffect](Layer.md#unwrapeffect)
- [unwrapScoped](Layer.md#unwrapscoped)
- [withParentSpan](Layer.md#withparentspan)
- [withSpan](Layer.md#withspan)
- [zipWith](Layer.md#zipwith)

## Other

### function

▸ **function**\<`A`, `B`\>(`tagA`, `tagB`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Identifier`\<`A`\>, `never`, `Identifier`\<`B`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |
| `B` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagA` | `A` |
| `tagB` | `B` |
| `f` | (`a`: `Service`\<`A`\>) => `Service`\<`B`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Identifier`\<`A`\>, `never`, `Identifier`\<`B`\>\>

## clock

### setClock

▸ **setClock**\<`A`\>(`clock`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Clock` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `clock` | `A` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

## config

### setConfigProvider

▸ **setConfigProvider**(`configProvider`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

Sets the current `ConfigProvider`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `configProvider` | `ConfigProvider` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

## constructors

### empty

• `Const` **empty**: [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

A Layer that constructs an empty Context.

**`Since`**

2.0.0

___

### scope

• `Const` **scope**: [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Scope.CloseableScope`\>

A layer that constructs a scope and closes it when the workflow the layer
is provided to completes execution, whether by success, failure, or
interruption. This can be used to close a scope when providing a layer to a
workflow.

**`Since`**

2.0.0

___

### context

▸ **context**\<`R`\>(): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `never`, `R`\>

Constructs a `Layer` that passes along the specified context as an
output.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `never`, `R`\>

**`Since`**

2.0.0

___

### die

▸ **die**(`defect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `unknown`\>

Constructs a layer that dies with the specified defect.

#### Parameters

| Name | Type |
| :------ | :------ |
| `defect` | `unknown` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `unknown`\>

**`Since`**

2.0.0

___

### dieSync

▸ **dieSync**(`evaluate`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `unknown`\>

Constructs a layer that dies with the specified defect.

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`unknown`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `unknown`\>

**`Since`**

2.0.0

___

### effect

▸ **effect**\<`T`\>(`tag`): \<R, E\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Service`\<`T`\>\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `Identifier`\<`T`\>\>

Constructs a layer from the specified effect.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `Identifier`\<`T`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Service`\<`T`\>\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

▸ **effect**\<`T`, `R`, `E`\>(`tag`, `effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `Identifier`\<`T`\>\>

Constructs a layer from the specified effect.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |
| `R` | `R` |
| `E` | `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Service`\<`T`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

___

### effectContext

▸ **effectContext**\<`R`, `E`, `A`\>(`effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

Constructs a layer from the specified effect, which must return one or more
services.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Context`](../interfaces/Context.Context.md)\<`A`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### effectDiscard

▸ **effectDiscard**\<`R`, `E`, `_`\>(`effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `never`\>

Constructs a layer from the specified effect discarding it's output.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `_` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `_`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `never`\>

**`Since`**

2.0.0

___

### fail

▸ **fail**\<`E`\>(`error`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

Constructs a layer that fails with the specified error.

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

**`Since`**

2.0.0

___

### failCause

▸ **failCause**\<`E`\>(`cause`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

Constructs a layer that fails with the specified cause.

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cause` | `Cause`\<`E`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

**`Since`**

2.0.0

___

### failCauseSync

▸ **failCauseSync**\<`E`\>(`evaluate`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

Constructs a layer that fails with the specified cause.

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`Cause`\<`E`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

**`Since`**

2.0.0

___

### failSync

▸ **failSync**\<`E`\>(`evaluate`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

Constructs a layer that fails with the specified error.

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`E`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `E`, `unknown`\>

**`Since`**

2.0.0

___

### scoped

▸ **scoped**\<`T`\>(`tag`): \<R, E\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Service`\<`T`\>\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `Identifier`\<`T`\>\>

Constructs a layer from the specified scoped effect.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `Identifier`\<`T`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Service`\<`T`\>\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

▸ **scoped**\<`T`, `R`, `E`\>(`tag`, `effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `Identifier`\<`T`\>\>

Constructs a layer from the specified scoped effect.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |
| `R` | `R` |
| `E` | `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Service`\<`T`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

___

### scopedContext

▸ **scopedContext**\<`R`, `E`, `A`\>(`effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `A`\>

Constructs a layer from the specified scoped effect, which must return one
or more services.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Context`](../interfaces/Context.Context.md)\<`A`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `A`\>

**`Since`**

2.0.0

___

### scopedDiscard

▸ **scopedDiscard**\<`R`, `E`, `T`\>(`effect`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `never`\>

Constructs a layer from the specified scoped effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `T`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `never`\>

**`Since`**

2.0.0

___

### service

▸ **service**\<`T`\>(`tag`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Identifier`\<`T`\>, `never`, `Identifier`\<`T`\>\>

Constructs a layer that accesses and returns the specified service from the
context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Identifier`\<`T`\>, `never`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

___

### succeed

▸ **succeed**\<`T`\>(`tag`): (`resource`: `Service`\<`T`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

Constructs a layer from the specified value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |

#### Returns

`fn`

▸ (`resource`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | `Service`\<`T`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

▸ **succeed**\<`T`\>(`tag`, `resource`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

Constructs a layer from the specified value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `resource` | `Service`\<`T`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

___

### succeedContext

▸ **succeedContext**\<`A`\>(`context`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `A`\>

Constructs a layer from the specified value, which must return one or more
services.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](../interfaces/Context.Context.md)\<`A`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `A`\>

**`Since`**

2.0.0

___

### suspend

▸ **suspend**\<`RIn`, `E`, `ROut`\>(`evaluate`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>

Lazily constructs a layer. This is useful to avoid infinite recursion when
creating layers that refer to themselves.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>

**`Since`**

2.0.0

___

### sync

▸ **sync**\<`T`\>(`tag`): (`evaluate`: [`LazyArg`](../interfaces/F.LazyArg.md)\<`Service`\<`T`\>\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

Lazily constructs a layer from the specified value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |

#### Returns

`fn`

▸ (`evaluate`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`Service`\<`T`\>\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

▸ **sync**\<`T`\>(`tag`, `evaluate`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

Lazily constructs a layer from the specified value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`Service`\<`T`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `Identifier`\<`T`\>\>

**`Since`**

2.0.0

___

### syncContext

▸ **syncContext**\<`A`\>(`evaluate`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `A`\>

Lazily constructs a layer from the specified value, which must return one or more
services.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Context`](../interfaces/Context.Context.md)\<`A`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `A`\>

**`Since`**

2.0.0

## conversions

### launch

▸ **launch**\<`RIn`, `E`, `ROut`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, `never`\>

Builds this layer and uses it until it is interrupted. This is useful when
your entire application is a layer, such as an HTTP server.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, `never`\>

**`Since`**

2.0.0

___

### toRuntime

▸ **toRuntime**\<`RIn`, `E`, `ROut`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `RIn`, `E`, `Runtime`\<`ROut`\>\>

Converts a layer that requires no services into a scoped runtime, which can
be used to execute effects.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `RIn`, `E`, `Runtime`\<`ROut`\>\>

**`Since`**

2.0.0

## destructors

### build

▸ **build**\<`RIn`, `E`, `ROut`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

Builds a layer into a scoped value.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

**`Since`**

2.0.0

___

### buildWithScope

▸ **buildWithScope**(`scope`): \<RIn, E, ROut\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

Builds a layer into an `Effect` value. Any resources associated with this
layer will be released when the specified scope is closed unless their scope
has been extended. This allows building layers where the lifetime of some of
the services output by the layer exceed the lifetime of the effect the
layer is provided to.

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Scope` |

#### Returns

`fn`

▸ \<`RIn`, `E`, `ROut`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

**`Since`**

2.0.0

▸ **buildWithScope**\<`RIn`, `E`, `ROut`\>(`self`, `scope`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

Builds a layer into an `Effect` value. Any resources associated with this
layer will be released when the specified scope is closed unless their scope
has been extended. This allows building layers where the lifetime of some of
the services output by the layer exceed the lifetime of the effect the
layer is provided to.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |
| `scope` | `Scope` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

**`Since`**

2.0.0

## error handling

### catchAll

▸ **catchAll**\<`E`, `R2`, `E2`, `A2`\>(`onError`): \<R, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2`, `A` & `A2`\>

Recovers from all errors.

#### Type parameters

| Name |
| :------ |
| `E` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onError` | (`error`: `E`) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2`, `A` & `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2`, `A` & `A2`\>

**`Since`**

2.0.0

▸ **catchAll**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `onError`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E2`, `A` & `A2`\>

Recovers from all errors.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `onError` | (`error`: `E`) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E2`, `A` & `A2`\>

**`Since`**

2.0.0

___

### catchAllCause

▸ **catchAllCause**\<`E`, `R2`, `E2`, `A2`\>(`onError`): \<R, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2`, `A` & `A2`\>

Recovers from all errors.

#### Type parameters

| Name |
| :------ |
| `E` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onError` | (`cause`: `Cause`\<`E`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2`, `A` & `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2`, `A` & `A2`\>

**`Since`**

2.0.0

▸ **catchAllCause**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `onError`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E2`, `A` & `A2`\>

Recovers from all errors.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `onError` | (`cause`: `Cause`\<`E`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E2`, `A` & `A2`\>

**`Since`**

2.0.0

___

### orDie

▸ **orDie**\<`R`, `E`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `never`, `A`\>

Translates effect failure into death of the fiber, making all failures
unchecked and not a part of the type of the layer.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `never`, `A`\>

**`Since`**

2.0.0

___

### orElse

▸ **orElse**\<`R2`, `E2`, `A2`\>(`that`): \<R, E, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A` & `A2`\>

Executes this layer and returns its output, if it succeeds, but otherwise
executes the specified layer.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A` & `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A` & `A2`\>

**`Since`**

2.0.0

▸ **orElse**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `that`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` & `A2`\>

Executes this layer and returns its output, if it succeeds, but otherwise
executes the specified layer.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` & `A2`\>

**`Since`**

2.0.0

## folding

### match

▸ **match**\<`E`, `R2`, `E2`, `A2`, `A`, `R3`, `E3`, `A3`\>(`options`): \<R\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` & `A3`\>

Feeds the error or output services of this layer into the input of either
the specified `failure` or `success` layers, resulting in a new layer with
the inputs of this layer, and the error or outputs of the specified layer.

#### Type parameters

| Name |
| :------ |
| `E` |
| `R2` |
| `E2` |
| `A2` |
| `A` |
| `R3` |
| `E3` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onFailure` | (`error`: `E`) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` & `A3`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` & `A3`\>

**`Since`**

2.0.0

▸ **match**\<`R`, `E`, `A`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`self`, `options`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` & `A3`\>

Feeds the error or output services of this layer into the input of either
the specified `failure` or `success` layers, resulting in a new layer with
the inputs of this layer, and the error or outputs of the specified layer.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |
| `R3` |
| `E3` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`error`: `E`) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` & `A3`\>

**`Since`**

2.0.0

___

### matchCause

▸ **matchCause**\<`E`, `A`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`options`): \<R\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` & `A3`\>

Feeds the error or output services of this layer into the input of either
the specified `failure` or `success` layers, resulting in a new layer with
the inputs of this layer, and the error or outputs of the specified layer.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |
| `R3` |
| `E3` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onFailure` | (`cause`: `Cause`\<`E`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` & `A3`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` & `A3`\>

**`Since`**

2.0.0

▸ **matchCause**\<`R`, `E`, `A`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`self`, `options`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` & `A3`\>

Feeds the error or output services of this layer into the input of either
the specified `failure` or `success` layers, resulting in a new layer with
the inputs of this layer, and the error or outputs of the specified layer.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |
| `R3` |
| `E3` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`cause`: `Cause`\<`E`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` & `A3`\>

**`Since`**

2.0.0

## getters

### isFresh

▸ **isFresh**\<`R`, `E`, `A`\>(`self`): `boolean`

Returns `true` if the specified `Layer` is a fresh version that will not be
shared, `false` otherwise.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

#### Returns

`boolean`

**`Since`**

2.0.0

___

### isLayer

▸ **isLayer**(`u`): u is Layer\<unknown, unknown, unknown\>

Returns `true` if the specified value is a `Layer`, `false` otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `u` | `unknown` |

#### Returns

u is Layer\<unknown, unknown, unknown\>

**`Since`**

2.0.0

## logging

### setUnhandledErrorLogLevel

▸ **setUnhandledErrorLogLevel**(`level`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | [`Option`](O.md#option)\<`LogLevel`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

## mapping

### discard

▸ **discard**\<`RIn`, `E`, `ROut`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `never`\>

Replaces the layer's output with `void` and includes the layer only for its
side-effects.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `never`\>

**`Since`**

2.0.0

___

### map

▸ **map**\<`A`, `B`\>(`f`): \<R, E\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `B`\>

Returns a new layer whose output is mapped by the specified function.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Context`](../interfaces/Context.Context.md)\<`B`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **map**\<`R`, `E`, `A`, `B`\>(`self`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `B`\>

Returns a new layer whose output is mapped by the specified function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Context`](../interfaces/Context.Context.md)\<`B`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

___

### mapError

▸ **mapError**\<`E`, `E2`\>(`f`): \<R, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E2`, `A`\>

Returns a layer with its error channel mapped using the specified function.

#### Type parameters

| Name |
| :------ |
| `E` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`error`: `E`) => `E2` |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E2`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

▸ **mapError**\<`R`, `E`, `A`, `E2`\>(`self`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E2`, `A`\>

Returns a layer with its error channel mapped using the specified function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `f` | (`error`: `E`) => `E2` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

## memo map

### makeMemoMap

• `Const` **makeMemoMap**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`MemoMap`](../interfaces/Layer.MemoMap.md)\>

Constructs a `MemoMap` that can be used to build additional layers.

**`Since`**

2.0.0

___

### buildWithMemoMap

▸ **buildWithMemoMap**(`memoMap`, `scope`): \<RIn, E, ROut\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

Builds a layer into an `Effect` value, using the specified `MemoMap` to memoize
the layer construction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `memoMap` | [`MemoMap`](../interfaces/Layer.MemoMap.md) |
| `scope` | `Scope` |

#### Returns

`fn`

▸ \<`RIn`, `E`, `ROut`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

**`Since`**

2.0.0

▸ **buildWithMemoMap**\<`RIn`, `E`, `ROut`\>(`self`, `memoMap`, `scope`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

Builds a layer into an `Effect` value, using the specified `MemoMap` to memoize
the layer construction.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |
| `memoMap` | [`MemoMap`](../interfaces/Layer.MemoMap.md) |
| `scope` | `Scope` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>

**`Since`**

2.0.0

## requests &amp; batching

### setRequestBatching

▸ **setRequestBatching**(`requestBatching`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestBatching` | `boolean` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### setRequestCache

▸ **setRequestCache**\<`R`, `E`\>(`cache`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `never`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Cache`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `never`\>

**`Since`**

2.0.0

▸ **setRequestCache**(`cache`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | `Cache` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### setRequestCaching

▸ **setRequestCaching**(`requestCaching`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestCaching` | `boolean` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

## retrying

### retry

▸ **retry**\<`RIn2`, `E`, `X`\>(`schedule`): \<RIn, ROut\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E`, `ROut`\>

Retries constructing this layer according to the specified schedule.

#### Type parameters

| Name |
| :------ |
| `RIn2` |
| `E` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schedule` | `Schedule`\<`RIn2`, `E`, `X`\> |

#### Returns

`fn`

▸ \<`RIn`, `ROut`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E`, `ROut`\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `ROut` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E`, `ROut`\>

**`Since`**

2.0.0

▸ **retry**\<`RIn`, `E`, `ROut`, `RIn2`, `X`\>(`self`, `schedule`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E`, `ROut`\>

Retries constructing this layer according to the specified schedule.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |
| `RIn2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |
| `schedule` | `Schedule`\<`RIn2`, `E`, `X`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E`, `ROut`\>

**`Since`**

2.0.0

## scheduler

### setScheduler

▸ **setScheduler**(`scheduler`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheduler` | `Scheduler` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

## sequencing

### flatMap

▸ **flatMap**\<`A`, `R2`, `E2`, `A2`\>(`f`): \<R, E\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2`\>

Constructs a layer dynamically based on the output of this layer.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2`\>

**`Since`**

2.0.0

▸ **flatMap**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `A2`\>

Constructs a layer dynamically based on the output of this layer.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `A2`\>

**`Since`**

2.0.0

___

### flatten

▸ **flatten**\<`R2`, `E2`, `A`, `I`\>(`tag`): \<R, E\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `I`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

Flattens layers nested in the context of an effect.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A`\>\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `I`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **flatten**\<`R`, `E`, `A`, `R2`, `E2`, `I`\>(`self`, `tag`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

Flattens layers nested in the context of an effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `I`\> |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

___

### tap

▸ **tap**\<`ROut`, `XR`, `RIn2`, `E2`, `X`\>(`f`): \<RIn, E\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E2` \| `E`, `ROut`\>

Performs the specified effect if this layer succeeds.

#### Type parameters

| Name |
| :------ |
| `ROut` |
| `XR` |
| `RIn2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`XR`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, `X`\> |

#### Returns

`fn`

▸ \<`RIn`, `E`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E2` \| `E`, `ROut`\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E2` \| `E`, `ROut`\>

**`Since`**

2.0.0

▸ **tap**\<`RIn`, `E`, `ROut`, `XR`, `RIn2`, `E2`, `X`\>(`self`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E` \| `E2`, `ROut`\>

Performs the specified effect if this layer succeeds.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |
| `XR` |
| `RIn2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`XR`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, `X`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E` \| `E2`, `ROut`\>

**`Since`**

2.0.0

___

### tapError

▸ **tapError**\<`E`, `XE`, `RIn2`, `E2`, `X`\>(`f`): \<RIn, ROut\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E` \| `E2`, `ROut`\>

Performs the specified effect if this layer fails.

#### Type parameters

| Name |
| :------ |
| `E` |
| `XE` |
| `RIn2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`e`: `XE`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, `X`\> |

#### Returns

`fn`

▸ \<`RIn`, `ROut`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E` \| `E2`, `ROut`\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `ROut` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E` \| `E2`, `ROut`\>

**`Since`**

2.0.0

▸ **tapError**\<`RIn`, `E`, `XE`, `ROut`, `RIn2`, `E2`, `X`\>(`self`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E` \| `E2`, `ROut`\>

Performs the specified effect if this layer fails.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `XE` |
| `ROut` |
| `RIn2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |
| `f` | (`e`: `XE`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, `X`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E` \| `E2`, `ROut`\>

**`Since`**

2.0.0

___

### tapErrorCause

▸ **tapErrorCause**\<`E`, `XE`, `RIn2`, `E2`, `X`\>(`f`): \<RIn, ROut\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E` \| `E2`, `ROut`\>

Performs the specified effect if this layer fails.

#### Type parameters

| Name |
| :------ |
| `E` |
| `XE` |
| `RIn2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`cause`: `Cause`\<`XE`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, `X`\> |

#### Returns

`fn`

▸ \<`RIn`, `ROut`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E` \| `E2`, `ROut`\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `ROut` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E` \| `E2`, `ROut`\>

**`Since`**

2.0.0

▸ **tapErrorCause**\<`RIn`, `E`, `XE`, `ROut`, `RIn2`, `E2`, `X`\>(`self`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E` \| `E2`, `ROut`\>

Performs the specified effect if this layer fails.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `XE` |
| `ROut` |
| `RIn2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |
| `f` | (`cause`: `Cause`\<`XE`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, `X`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E` \| `E2`, `ROut`\>

**`Since`**

2.0.0

## symbols

### LayerTypeId

Ƭ **LayerTypeId**: typeof [`LayerTypeId`](Layer.md#layertypeid-1)

**`Since`**

2.0.0

___

### MemoMapTypeId

Ƭ **MemoMapTypeId**: typeof [`MemoMapTypeId`](Layer.md#memomaptypeid-1)

**`Since`**

2.0.0

___

### LayerTypeId

• `Const` **LayerTypeId**: unique `symbol`

**`Since`**

2.0.0

___

### MemoMapTypeId

• `Const` **MemoMapTypeId**: unique `symbol`

**`Since`**

2.0.0

## tracing

### parentSpan

▸ **parentSpan**(`span`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `ParentSpan`\>

Adds the provided span to the span stack.

#### Parameters

| Name | Type |
| :------ | :------ |
| `span` | `ParentSpan` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `ParentSpan`\>

**`Since`**

2.0.0

___

### setTracer

▸ **setTracer**(`tracer`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

Create a Layer that sets the current Tracer

#### Parameters

| Name | Type |
| :------ | :------ |
| `tracer` | `Tracer` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### setTracerTiming

▸ **setTracerTiming**(`enabled`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### span

▸ **span**(`name`, `options?`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `ParentSpan`\>

Create and add a span to the current span stack.

The span is ended when the Layer is released.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.onEnd?` | (`span`: `Span`, `exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\> |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `ParentSpan`\>

**`Since`**

2.0.0

___

### withParentSpan

▸ **withParentSpan**(`span`): \<R, E, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `span` | `ParentSpan` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **withParentSpan**\<`R`, `E`, `A`\>(`self`, `span`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `span` | `ParentSpan` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

___

### withSpan

▸ **withSpan**(`name`, `options?`): \<R, E, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.onEnd?` | (`span`: `Span`, `exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\> |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **withSpan**\<`R`, `E`, `A`\>(`self`, `name`, `options?`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.onEnd?` | (`span`: `Span`, `exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\> |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

## utils

### extendScope

▸ **extendScope**\<`RIn`, `E`, `ROut`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`Scope` \| `RIn`, `E`, `ROut`\>

Extends the scope of this layer, returning a new layer that when provided
to an effect will not immediately release its associated resources when
that effect completes execution but instead when the scope the resulting
effect depends on is closed.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`Scope` \| `RIn`, `E`, `ROut`\>

**`Since`**

2.0.0

___

### fiberRefLocallyScopedWith

▸ **fiberRefLocallyScopedWith**\<`A`\>(`self`, `value`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `FiberRef`\<`A`\> |
| `value` | (`_`: `A`) => `A` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### fresh

▸ **fresh**\<`R`, `E`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

Creates a fresh version of this layer that will not be shared.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### locally

▸ **locally**\<`X`\>(`ref`, `value`): \<R, E, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `FiberRef`\<`X`\> |
| `value` | `X` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **locally**\<`R`, `E`, `A`, `X`\>(`self`, `ref`, `value`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `ref` | `FiberRef`\<`X`\> |
| `value` | `X` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### locallyEffect

▸ **locallyEffect**\<`RIn`, `E`, `ROut`, `RIn2`, `E2`, `ROut2`\>(`f`): (`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\>

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |
| `RIn2` |
| `E2` |
| `ROut2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`_`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, [`Context`](../interfaces/Context.Context.md)\<`ROut2`\>\> |

#### Returns

`fn`

▸ (`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\>

**`Since`**

2.0.0

▸ **locallyEffect**\<`RIn`, `E`, `ROut`, `RIn2`, `E2`, `ROut2`\>(`self`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\>

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |
| `RIn2` |
| `E2` |
| `ROut2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |
| `f` | (`_`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn`, `E`, [`Context`](../interfaces/Context.Context.md)\<`ROut`\>\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RIn2`, `E2`, [`Context`](../interfaces/Context.Context.md)\<`ROut2`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\>

**`Since`**

2.0.0

___

### locallyScoped

▸ **locallyScoped**\<`A`\>(`self`, `value`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `FiberRef`\<`A`\> |
| `value` | `A` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### locallyWith

▸ **locallyWith**\<`X`\>(`ref`, `value`): \<R, E, A\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `FiberRef`\<`X`\> |
| `value` | (`_`: `X`) => `X` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **locallyWith**\<`R`, `E`, `A`, `X`\>(`self`, `ref`, `value`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `ref` | `FiberRef`\<`X`\> |
| `value` | (`_`: `X`) => `X` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### memoize

▸ **memoize**\<`RIn`, `E`, `ROut`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>\>

Returns a scoped effect that, if evaluated, will return the lazily computed
result of this layer.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\>\>

**`Since`**

2.0.0

___

### passthrough

▸ **passthrough**\<`RIn`, `E`, `ROut`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `RIn` \| `ROut`\>

Returns a new layer that produces the outputs of this layer but also
passes through the inputs.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `RIn` \| `ROut`\>

**`Since`**

2.0.0

___

### project

▸ **project**\<`A`, `B`\>(`tagA`, `tagB`, `f`): \<RIn, E\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`A`\>\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`B`\>\>

Projects out part of one of the services output by this layer using the
specified function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |
| `B` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tagA` | `A` |
| `tagB` | `B` |
| `f` | (`a`: `Service`\<`A`\>) => `Service`\<`B`\> |

#### Returns

`fn`

▸ \<`RIn`, `E`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`B`\>\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`A`\>\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`B`\>\>

**`Since`**

2.0.0

▸ **project**\<`RIn`, `E`, `A`, `B`\>(`self`, `tagA`, `tagB`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`B`\>\>

Projects out part of one of the services output by this layer using the
specified function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RIn` | `RIn` |
| `E` | `E` |
| `A` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |
| `B` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`A`\>\> |
| `tagA` | `A` |
| `tagB` | `B` |
| `f` | (`a`: `Service`\<`A`\>) => `Service`\<`B`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `Identifier`\<`B`\>\>

**`Since`**

2.0.0

___

### provide

▸ **provide**\<`RIn`, `E`, `ROut`\>(`self`): \<RIn2, E2, ROut2\>(`that`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E` \| `E2`, `ROut2`\>

Feeds the output services of this builder into the input of the specified
builder, resulting in a new builder with the inputs of this builder as
well as any leftover inputs, and the outputs of the specified builder.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

`fn`

▸ \<`RIn2`, `E2`, `ROut2`\>(`that`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E` \| `E2`, `ROut2`\>

##### Type parameters

| Name |
| :------ |
| `RIn2` |
| `E2` |
| `ROut2` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E` \| `E2`, `ROut2`\>

**`Since`**

2.0.0

▸ **provide**\<`RIn2`, `E2`, `ROut2`, `RIn`, `E`, `ROut`\>(`that`, `self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E2` \| `E`, `ROut2`\>

Feeds the output services of this builder into the input of the specified
builder, resulting in a new builder with the inputs of this builder as
well as any leftover inputs, and the outputs of the specified builder.

#### Type parameters

| Name |
| :------ |
| `RIn2` |
| `E2` |
| `ROut2` |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\> |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E2` \| `E`, `ROut2`\>

**`Since`**

2.0.0

___

### provideMerge

▸ **provideMerge**\<`RIn`, `E`, `ROut`\>(`self`): \<RIn2, E2, ROut2\>(`that`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E` \| `E2`, `ROut` \| `ROut2`\>

Feeds the output services of this layer into the input of the specified
layer, resulting in a new layer with the inputs of this layer, and the
outputs of both layers.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

`fn`

▸ \<`RIn2`, `E2`, `ROut2`\>(`that`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E` \| `E2`, `ROut` \| `ROut2`\>

##### Type parameters

| Name |
| :------ |
| `RIn2` |
| `E2` |
| `ROut2` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E` \| `E2`, `ROut` \| `ROut2`\>

**`Since`**

2.0.0

▸ **provideMerge**\<`RIn2`, `E2`, `ROut2`, `RIn`, `E`, `ROut`\>(`that`, `self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E2` \| `E`, `ROut2` \| `ROut`\>

Feeds the output services of this layer into the input of the specified
layer, resulting in a new layer with the inputs of this layer, and the
outputs of both layers.

#### Type parameters

| Name |
| :------ |
| `RIn2` |
| `E2` |
| `ROut2` |
| `RIn` |
| `E` |
| `ROut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\> |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E`, `ROut`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `Exclude`\<`RIn2`, `ROut`\>, `E2` \| `E`, `ROut2` \| `ROut`\>

**`Since`**

2.0.0

___

### unwrapEffect

▸ **unwrapEffect**\<`R`, `E`, `R1`, `E1`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `R1` |
| `E1` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Layer`](../interfaces/Layer.Layer-1.md)\<`R1`, `E1`, `A`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

___

### unwrapScoped

▸ **unwrapScoped**\<`R`, `E`, `R1`, `E1`, `A`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R1` \| `Exclude`\<`R`, `Scope`\>, `E` \| `E1`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `R1` |
| `E1` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Layer`](../interfaces/Layer.Layer-1.md)\<`R1`, `E1`, `A`\>\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R1` \| `Exclude`\<`R`, `Scope`\>, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

## zipping

### merge

▸ **merge**\<`RIn2`, `E2`, `ROut2`\>(`that`): \<RIn, E1, ROut\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E1`, `ROut`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E2` \| `E1`, `ROut2` \| `ROut`\>

Merges this layer with the specified layer concurrently, producing a new layer with combined input and output types.

#### Type parameters

| Name |
| :------ |
| `RIn2` |
| `E2` |
| `ROut2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\> |

#### Returns

`fn`

▸ \<`RIn`, `E1`, `ROut`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E2` \| `E1`, `ROut2` \| `ROut`\>

##### Type parameters

| Name |
| :------ |
| `RIn` |
| `E1` |
| `ROut` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E1`, `ROut`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2` \| `RIn`, `E2` \| `E1`, `ROut2` \| `ROut`\>

**`Since`**

2.0.0

▸ **merge**\<`RIn`, `E1`, `ROut`, `RIn2`, `E2`, `ROut2`\>(`self`, `that`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E1` \| `E2`, `ROut` \| `ROut2`\>

Merges this layer with the specified layer concurrently, producing a new layer with combined input and output types.

#### Type parameters

| Name |
| :------ |
| `RIn` |
| `E1` |
| `ROut` |
| `RIn2` |
| `E2` |
| `ROut2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn`, `E1`, `ROut`\> |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn2`, `E2`, `ROut2`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`RIn` \| `RIn2`, `E1` \| `E2`, `ROut` \| `ROut2`\>

**`Since`**

2.0.0

___

### mergeAll

▸ **mergeAll**\<`Layers`\>(`...layers`): [`Layer`](../interfaces/Layer.Layer-1.md)\<\{ [k in string \| number \| symbol]: Context\<Layers[k]\> }[`number`], \{ [k in string \| number \| symbol]: Error\<Layers[k]\> }[`number`], \{ [k in string \| number \| symbol]: Success\<Layers[k]\> }[`number`]\>

Combines all the provided layers concurrently, creating a new layer with merged input, error, and output types.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Layers` | extends [[`Layer`](../interfaces/Layer.Layer-1.md)\<`any`, `any`, `never`\>, ...Layer\<any, any, never\>[]] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...layers` | `Layers` |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<\{ [k in string \| number \| symbol]: Context\<Layers[k]\> }[`number`], \{ [k in string \| number \| symbol]: Error\<Layers[k]\> }[`number`], \{ [k in string \| number \| symbol]: Success\<Layers[k]\> }[`number`]\>

**`Since`**

2.0.0

___

### zipWith

▸ **zipWith**\<`R2`, `E2`, `B`, `A`, `C`\>(`that`, `f`): \<R, E\>(`self`: [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\>) => [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `C`\>

Combines this layer with the specified layer concurrently, creating a new layer with merged input types and
combined output types using the provided function.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `B` |
| `A` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `B`\> |
| `f` | (`a`: [`Context`](../interfaces/Context.Context.md)\<`A`\>, `b`: [`Context`](../interfaces/Context.Context.md)\<`B`\>) => [`Context`](../interfaces/Context.Context.md)\<`C`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `C`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R2` \| `R`, `E2` \| `E`, `C`\>

**`Since`**

2.0.0

▸ **zipWith**\<`R`, `E`, `R2`, `E2`, `B`, `A`, `C`\>(`self`, `that`, `f`): [`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `C`\>

Combines this layer with the specified layer concurrently, creating a new layer with merged input types and
combined output types using the provided function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `R2` |
| `E2` |
| `B` |
| `A` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `B`\> |
| `f` | (`a`: [`Context`](../interfaces/Context.Context.md)\<`A`\>, `b`: [`Context`](../interfaces/Context.Context.md)\<`B`\>) => [`Context`](../interfaces/Context.Context.md)\<`C`\> |

#### Returns

[`Layer`](../interfaces/Layer.Layer-1.md)\<`R` \| `R2`, `E` \| `E2`, `C`\>

**`Since`**

2.0.0
