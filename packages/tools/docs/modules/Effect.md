[@eslint-react/tools](../README.md) / Effect

# Namespace: Effect

## Table of contents

### Namespaces

- [All](Effect.All.md)
- [Effect](Effect.Effect.md)
- [Repeat](Effect.Repeat.md)
- [Retry](Effect.Retry.md)

### Interfaces

- [Adapter](../interfaces/Effect.Adapter.md)
- [Blocked](../interfaces/Effect.Blocked.md)
- [Effect](../interfaces/Effect.Effect-1.md)
- [EffectGen](../interfaces/Effect.EffectGen.md)
- [EffectTypeLambda](../interfaces/Effect.EffectTypeLambda.md)
- [EffectUnify](../interfaces/Effect.EffectUnify.md)
- [EffectUnifyIgnore](../interfaces/Effect.EffectUnifyIgnore.md)
- [Permit](../interfaces/Effect.Permit.md)
- [Semaphore](../interfaces/Effect.Semaphore.md)

### Type Aliases

- [EffectTypeId](Effect.md#effecttypeid)
- [MergeRecord](Effect.md#mergerecord)

### Variables

- [Do](Effect.md#do)
- [EffectTypeId](Effect.md#effecttypeid-1)
- [allowInterrupt](Effect.md#allowinterrupt)
- [clock](Effect.md#clock)
- [console](Effect.md#console)
- [currentParentSpan](Effect.md#currentparentspan)
- [currentSpan](Effect.md#currentspan)
- [descriptor](Effect.md#descriptor)
- [fiberId](Effect.md#fiberid)
- [getFiberRefs](Effect.md#getfiberrefs)
- [getRuntimeFlags](Effect.md#getruntimeflags)
- [interrupt](Effect.md#interrupt)
- [logAnnotations](Effect.md#logannotations)
- [metricLabels](Effect.md#metriclabels)
- [never](Effect.md#never)
- [random](Effect.md#random)
- [scope](Effect.md#scope)
- [spanAnnotations](Effect.md#spanannotations)
- [spanLinks](Effect.md#spanlinks)
- [succeedNone](Effect.md#succeednone)
- [tracer](Effect.md#tracer)
- [unit](Effect.md#unit)

### Functions

- [acquireRelease](Effect.md#acquirerelease)
- [acquireReleaseInterruptible](Effect.md#acquirereleaseinterruptible)
- [acquireUseRelease](Effect.md#acquireuserelease)
- [addFinalizer](Effect.md#addfinalizer)
- [all](Effect.md#all)
- [allSuccesses](Effect.md#allsuccesses)
- [allWith](Effect.md#allwith)
- [andThen](Effect.md#andthen)
- [annotateCurrentSpan](Effect.md#annotatecurrentspan)
- [annotateLogs](Effect.md#annotatelogs)
- [annotateSpans](Effect.md#annotatespans)
- [ap](Effect.md#ap)
- [as](Effect.md#as)
- [asSome](Effect.md#assome)
- [asSomeError](Effect.md#assomeerror)
- [asUnit](Effect.md#asunit)
- [async](Effect.md#async)
- [asyncEffect](Effect.md#asynceffect)
- [asyncEither](Effect.md#asynceither)
- [asyncOption](Effect.md#asyncoption)
- [awaitAllChildren](Effect.md#awaitallchildren)
- [bind](Effect.md#bind)
- [bindTo](Effect.md#bindto)
- [blocked](Effect.md#blocked)
- [cacheRequestResult](Effect.md#cacherequestresult)
- [cached](Effect.md#cached)
- [cachedFunction](Effect.md#cachedfunction)
- [cachedInvalidateWithTTL](Effect.md#cachedinvalidatewithttl)
- [cachedWithTTL](Effect.md#cachedwithttl)
- [catch](Effect.md#catch)
- [catchAll](Effect.md#catchall)
- [catchAllCause](Effect.md#catchallcause)
- [catchAllDefect](Effect.md#catchalldefect)
- [catchIf](Effect.md#catchif)
- [catchSome](Effect.md#catchsome)
- [catchSomeCause](Effect.md#catchsomecause)
- [catchSomeDefect](Effect.md#catchsomedefect)
- [catchTag](Effect.md#catchtag)
- [catchTags](Effect.md#catchtags)
- [cause](Effect.md#cause)
- [checkInterruptible](Effect.md#checkinterruptible)
- [clockWith](Effect.md#clockwith)
- [configProviderWith](Effect.md#configproviderwith)
- [consoleWith](Effect.md#consolewith)
- [context](Effect.md#context)
- [contextWith](Effect.md#contextwith)
- [contextWithEffect](Effect.md#contextwitheffect)
- [daemonChildren](Effect.md#daemonchildren)
- [delay](Effect.md#delay)
- [descriptorWith](Effect.md#descriptorwith)
- [die](Effect.md#die)
- [dieMessage](Effect.md#diemessage)
- [dieSync](Effect.md#diesync)
- [diffFiberRefs](Effect.md#difffiberrefs)
- [disconnect](Effect.md#disconnect)
- [dropUntil](Effect.md#dropuntil)
- [dropWhile](Effect.md#dropwhile)
- [either](Effect.md#either)
- [ensuring](Effect.md#ensuring)
- [ensuringChild](Effect.md#ensuringchild)
- [ensuringChildren](Effect.md#ensuringchildren)
- [eventually](Effect.md#eventually)
- [every](Effect.md#every)
- [exists](Effect.md#exists)
- [exit](Effect.md#exit)
- [fail](Effect.md#fail)
- [failCause](Effect.md#failcause)
- [failCauseSync](Effect.md#failcausesync)
- [failSync](Effect.md#failsync)
- [fiberIdWith](Effect.md#fiberidwith)
- [filter](Effect.md#filter)
- [filterOrDie](Effect.md#filterordie)
- [filterOrDieMessage](Effect.md#filterordiemessage)
- [filterOrElse](Effect.md#filterorelse)
- [filterOrFail](Effect.md#filterorfail)
- [finalizersMask](Effect.md#finalizersmask)
- [findFirst](Effect.md#findfirst)
- [firstSuccessOf](Effect.md#firstsuccessof)
- [flatMap](Effect.md#flatmap)
- [flatten](Effect.md#flatten)
- [flip](Effect.md#flip)
- [flipWith](Effect.md#flipwith)
- [forEach](Effect.md#foreach)
- [forever](Effect.md#forever)
- [fork](Effect.md#fork)
- [forkAll](Effect.md#forkall)
- [forkDaemon](Effect.md#forkdaemon)
- [forkIn](Effect.md#forkin)
- [forkScoped](Effect.md#forkscoped)
- [forkWithErrorHandler](Effect.md#forkwitherrorhandler)
- [fromFiber](Effect.md#fromfiber)
- [fromFiberEffect](Effect.md#fromfibereffect)
- [fromNullable](Effect.md#fromnullable)
- [gen](Effect.md#gen)
- [head](Effect.md#head)
- [if](Effect.md#if)
- [ignore](Effect.md#ignore)
- [ignoreLogged](Effect.md#ignorelogged)
- [inheritFiberRefs](Effect.md#inheritfiberrefs)
- [interruptWith](Effect.md#interruptwith)
- [interruptible](Effect.md#interruptible)
- [interruptibleMask](Effect.md#interruptiblemask)
- [intoDeferred](Effect.md#intodeferred)
- [isEffect](Effect.md#iseffect)
- [isFailure](Effect.md#isfailure)
- [isSuccess](Effect.md#issuccess)
- [iterate](Effect.md#iterate)
- [labelMetrics](Effect.md#labelmetrics)
- [labelMetricsScoped](Effect.md#labelmetricsscoped)
- [let](Effect.md#let)
- [linkSpans](Effect.md#linkspans)
- [locally](Effect.md#locally)
- [locallyScoped](Effect.md#locallyscoped)
- [locallyScopedWith](Effect.md#locallyscopedwith)
- [locallyWith](Effect.md#locallywith)
- [log](Effect.md#log)
- [logDebug](Effect.md#logdebug)
- [logError](Effect.md#logerror)
- [logFatal](Effect.md#logfatal)
- [logInfo](Effect.md#loginfo)
- [logTrace](Effect.md#logtrace)
- [logWarning](Effect.md#logwarning)
- [loop](Effect.md#loop)
- [makeSemaphore](Effect.md#makesemaphore)
- [makeSpan](Effect.md#makespan)
- [makeSpanScoped](Effect.md#makespanscoped)
- [map](Effect.md#map)
- [mapAccum](Effect.md#mapaccum)
- [mapBoth](Effect.md#mapboth)
- [mapError](Effect.md#maperror)
- [mapErrorCause](Effect.md#maperrorcause)
- [mapInputContext](Effect.md#mapinputcontext)
- [match](Effect.md#match)
- [matchCause](Effect.md#matchcause)
- [matchCauseEffect](Effect.md#matchcauseeffect)
- [matchEffect](Effect.md#matcheffect)
- [merge](Effect.md#merge)
- [mergeAll](Effect.md#mergeall)
- [negate](Effect.md#negate)
- [none](Effect.md#none)
- [onError](Effect.md#onerror)
- [onExit](Effect.md#onexit)
- [onInterrupt](Effect.md#oninterrupt)
- [once](Effect.md#once)
- [option](Effect.md#option)
- [optionFromOptional](Effect.md#optionfromoptional)
- [orDie](Effect.md#ordie)
- [orDieWith](Effect.md#ordiewith)
- [orElse](Effect.md#orelse)
- [orElseFail](Effect.md#orelsefail)
- [orElseSucceed](Effect.md#orelsesucceed)
- [parallelErrors](Effect.md#parallelerrors)
- [parallelFinalizers](Effect.md#parallelfinalizers)
- [partition](Effect.md#partition)
- [patchFiberRefs](Effect.md#patchfiberrefs)
- [patchRuntimeFlags](Effect.md#patchruntimeflags)
- [promise](Effect.md#promise)
- [provide](Effect.md#provide)
- [provideService](Effect.md#provideservice)
- [provideServiceEffect](Effect.md#provideserviceeffect)
- [race](Effect.md#race)
- [raceAll](Effect.md#raceall)
- [raceFirst](Effect.md#racefirst)
- [raceWith](Effect.md#racewith)
- [randomWith](Effect.md#randomwith)
- [reduce](Effect.md#reduce)
- [reduceEffect](Effect.md#reduceeffect)
- [reduceRight](Effect.md#reduceright)
- [reduceWhile](Effect.md#reducewhile)
- [repeat](Effect.md#repeat)
- [repeatN](Effect.md#repeatn)
- [repeatOrElse](Effect.md#repeatorelse)
- [replicate](Effect.md#replicate)
- [replicateEffect](Effect.md#replicateeffect)
- [request](Effect.md#request)
- [retry](Effect.md#retry)
- [retryOrElse](Effect.md#retryorelse)
- [runCallback](Effect.md#runcallback)
- [runFork](Effect.md#runfork)
- [runPromise](Effect.md#runpromise)
- [runPromiseExit](Effect.md#runpromiseexit)
- [runRequestBlock](Effect.md#runrequestblock)
- [runSync](Effect.md#runsync)
- [runSyncExit](Effect.md#runsyncexit)
- [runtime](Effect.md#runtime)
- [sandbox](Effect.md#sandbox)
- [schedule](Effect.md#schedule)
- [scheduleForked](Effect.md#scheduleforked)
- [scheduleFrom](Effect.md#schedulefrom)
- [scopeWith](Effect.md#scopewith)
- [scoped](Effect.md#scoped)
- [sequentialFinalizers](Effect.md#sequentialfinalizers)
- [serviceConstants](Effect.md#serviceconstants)
- [serviceFunction](Effect.md#servicefunction)
- [serviceFunctionEffect](Effect.md#servicefunctioneffect)
- [serviceFunctions](Effect.md#servicefunctions)
- [serviceMembers](Effect.md#servicemembers)
- [serviceOption](Effect.md#serviceoption)
- [serviceOptional](Effect.md#serviceoptional)
- [setFiberRefs](Effect.md#setfiberrefs)
- [sleep](Effect.md#sleep)
- [step](Effect.md#step)
- [succeed](Effect.md#succeed)
- [succeedSome](Effect.md#succeedsome)
- [summarized](Effect.md#summarized)
- [supervised](Effect.md#supervised)
- [suspend](Effect.md#suspend)
- [sync](Effect.md#sync)
- [tagMetrics](Effect.md#tagmetrics)
- [tagMetricsScoped](Effect.md#tagmetricsscoped)
- [takeUntil](Effect.md#takeuntil)
- [takeWhile](Effect.md#takewhile)
- [tap](Effect.md#tap)
- [tapBoth](Effect.md#tapboth)
- [tapDefect](Effect.md#tapdefect)
- [tapError](Effect.md#taperror)
- [tapErrorCause](Effect.md#taperrorcause)
- [tapErrorTag](Effect.md#taperrortag)
- [timed](Effect.md#timed)
- [timedWith](Effect.md#timedwith)
- [timeout](Effect.md#timeout)
- [timeoutFail](Effect.md#timeoutfail)
- [timeoutFailCause](Effect.md#timeoutfailcause)
- [timeoutTo](Effect.md#timeoutto)
- [tracerWith](Effect.md#tracerwith)
- [transplant](Effect.md#transplant)
- [try](Effect.md#try)
- [tryMap](Effect.md#trymap)
- [tryMapPromise](Effect.md#trymappromise)
- [tryPromise](Effect.md#trypromise)
- [unified](Effect.md#unified)
- [unifiedFn](Effect.md#unifiedfn)
- [uninterruptible](Effect.md#uninterruptible)
- [uninterruptibleMask](Effect.md#uninterruptiblemask)
- [unless](Effect.md#unless)
- [unlessEffect](Effect.md#unlesseffect)
- [unsafeMakeSemaphore](Effect.md#unsafemakesemaphore)
- [unsandbox](Effect.md#unsandbox)
- [updateFiberRefs](Effect.md#updatefiberrefs)
- [updateService](Effect.md#updateservice)
- [useSpan](Effect.md#usespan)
- [using](Effect.md#using)
- [validate](Effect.md#validate)
- [validateAll](Effect.md#validateall)
- [validateFirst](Effect.md#validatefirst)
- [validateWith](Effect.md#validatewith)
- [when](Effect.md#when)
- [whenEffect](Effect.md#wheneffect)
- [whenFiberRef](Effect.md#whenfiberref)
- [whenRef](Effect.md#whenref)
- [whileLoop](Effect.md#whileloop)
- [withClock](Effect.md#withclock)
- [withClockScoped](Effect.md#withclockscoped)
- [withConcurrency](Effect.md#withconcurrency)
- [withConfigProvider](Effect.md#withconfigprovider)
- [withConfigProviderScoped](Effect.md#withconfigproviderscoped)
- [withConsole](Effect.md#withconsole)
- [withConsoleScoped](Effect.md#withconsolescoped)
- [withEarlyRelease](Effect.md#withearlyrelease)
- [withLogSpan](Effect.md#withlogspan)
- [withMaxOpsBeforeYield](Effect.md#withmaxopsbeforeyield)
- [withMetric](Effect.md#withmetric)
- [withParentSpan](Effect.md#withparentspan)
- [withRequestBatching](Effect.md#withrequestbatching)
- [withRequestCache](Effect.md#withrequestcache)
- [withRequestCaching](Effect.md#withrequestcaching)
- [withRuntimeFlagsPatch](Effect.md#withruntimeflagspatch)
- [withRuntimeFlagsPatchScoped](Effect.md#withruntimeflagspatchscoped)
- [withScheduler](Effect.md#withscheduler)
- [withSchedulingPriority](Effect.md#withschedulingpriority)
- [withSpan](Effect.md#withspan)
- [withSpanScoped](Effect.md#withspanscoped)
- [withTracer](Effect.md#withtracer)
- [withTracerScoped](Effect.md#withtracerscoped)
- [withTracerTiming](Effect.md#withtracertiming)
- [withUnhandledErrorLogLevel](Effect.md#withunhandlederrorloglevel)
- [yieldNow](Effect.md#yieldnow)
- [zip](Effect.md#zip)
- [zipLeft](Effect.md#zipleft)
- [zipRight](Effect.md#zipright)
- [zipWith](Effect.md#zipwith)

## Other

### MergeRecord

Ƭ **MergeRecord**\<`K`, `H`\>: \{ [k in keyof K \| keyof H]: k extends keyof K ? K[k] : k extends keyof H ? H[k] : never } extends infer X ? `X` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name |
| :------ |
| `K` |
| `H` |

___

### catch

▸ **catch**\<`N`, `K`, `E`, `R1`, `E1`, `A1`\>(`discriminator`, `options`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `Exclude`\<`E`, \{ [n in string \| number \| symbol]: K }\>, `A1` \| `A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` \| `number` \| `symbol` |
| `K` | extends `string` |
| `E` | `E` |
| `R1` | `R1` |
| `E1` | `E1` |
| `A1` | `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `discriminator` | `N` |
| `options` | `Object` |
| `options.failure` | `K` |
| `options.onFailure` | (`error`: `Extract`\<`E`, \{ [n in string \| number \| symbol]: K }\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `Exclude`\<`E`, \{ [n in string \| number \| symbol]: K }\>, `A1` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `Exclude`\<`E`, \{ [n in string \| number \| symbol]: K }\>, `A1` \| `A`\>

▸ **catch**\<`R`, `E`, `A`, `N`, `K`, `R1`, `E1`, `A1`\>(`self`, `discriminator`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E1` \| `Exclude`\<`E`, \{ [n in string \| number \| symbol]: K }\>, `A` \| `A1`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `N` | extends `string` \| `number` \| `symbol` |
| `K` | extends `string` |
| `R1` | `R1` |
| `E1` | `E1` |
| `A1` | `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `discriminator` | `N` |
| `options` | `Object` |
| `options.failure` | `K` |
| `options.onFailure` | (`error`: `Extract`\<`E`, \{ [n in string \| number \| symbol]: K }\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E1` \| `Exclude`\<`E`, \{ [n in string \| number \| symbol]: K }\>, `A` \| `A1`\>

___

### if

▸ **if**\<`R1`, `R2`, `E1`, `E2`, `A`, `A1`\>(`options`): \<R, E\>(`self`: `boolean` \| [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R`, `E1` \| `E2` \| `E`, `A` \| `A1`\>

#### Type parameters

| Name |
| :------ |
| `R1` |
| `R2` |
| `E1` |
| `E2` |
| `A` |
| `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onFalse` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A1`\> |
| `options.onTrue` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R`, `E1` \| `E2` \| `E`, `A` \| `A1`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `never` |
| `E` | `never` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `boolean` \| [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R`, `E1` \| `E2` \| `E`, `A` \| `A1`\>

▸ **if**\<`R1`, `R2`, `E1`, `E2`, `A`, `A1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2`, `E1` \| `E2`, `A` \| `A1`\>

#### Type parameters

| Name |
| :------ |
| `R1` |
| `R2` |
| `E1` |
| `E2` |
| `A` |
| `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `boolean` |
| `options` | `Object` |
| `options.onFalse` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A1`\> |
| `options.onTrue` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2`, `E1` \| `E2`, `A` \| `A1`\>

▸ **if**\<`R`, `E`, `R1`, `R2`, `E1`, `E2`, `A`, `A1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1` \| `R2`, `E` \| `E1` \| `E2`, `A` \| `A1`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `R1` |
| `R2` |
| `E1` |
| `E2` |
| `A` |
| `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |
| `options` | `Object` |
| `options.onFalse` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A1`\> |
| `options.onTrue` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1` \| `R2`, `E` \| `E1` \| `E2`, `A` \| `A1`\>

___

### let

▸ **let**\<`N`, `K`, `A`\>(`tag`, `f`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `K`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `K` | `K` |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `Exclude`\<`N`, keyof `K`\> |
| `f` | (`_`: `K`) => `A` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `K`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

▸ **let**\<`R`, `E`, `K`, `N`, `A`\>(`self`, `tag`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `K` | `K` |
| `N` | extends `string` |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `K`\> |
| `tag` | `Exclude`\<`N`, keyof `K`\> |
| `f` | (`_`: `K`) => `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

___

### try

▸ **try**\<`A`, `E`\>(`options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.catch` | (`error`: `unknown`) => `E` |
| `options.try` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>

▸ **try**\<`A`\>(`evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `UnknownException`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `UnknownException`, `A`\>

## alternatives

### orDie

▸ **orDie**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

Translates effect failure into death of the fiber, making all failures
unchecked and not a part of the type of the effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

**`Since`**

2.0.0

___

### orDieWith

▸ **orDieWith**\<`E`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

Keeps none of the errors, and terminates the fiber with them, using the
specified function to convert the `E` into a `Throwable`.

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`error`: `E`) => `unknown` |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

**`Since`**

2.0.0

▸ **orDieWith**\<`R`, `E`, `A`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

Keeps none of the errors, and terminates the fiber with them, using the
specified function to convert the `E` into a `Throwable`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`error`: `E`) => `unknown` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

**`Since`**

2.0.0

___

### orElse

▸ **orElse**\<`R2`, `E2`, `A2`\>(`that`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

Executes this effect and returns its value, if it succeeds, but otherwise
executes the specified effect.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **orElse**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `that`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2`, `A` \| `A2`\>

Executes this effect and returns its value, if it succeeds, but otherwise
executes the specified effect.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### orElseFail

▸ **orElseFail**\<`E2`\>(`evaluate`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

Executes this effect and returns its value, if it succeeds, but otherwise
fails with the specified error.

#### Type parameters

| Name |
| :------ |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`E2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

▸ **orElseFail**\<`R`, `E`, `A`, `E2`\>(`self`, `evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

Executes this effect and returns its value, if it succeeds, but otherwise
fails with the specified error.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`E2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

___

### orElseSucceed

▸ **orElseSucceed**\<`A2`\>(`evaluate`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A`\>

Executes this effect and returns its value, if it succeeds, but
otherwise succeeds with the specified value.

#### Type parameters

| Name |
| :------ |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`A2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **orElseSucceed**\<`R`, `E`, `A`, `A2`\>(`self`, `evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A` \| `A2`\>

Executes this effect and returns its value, if it succeeds, but
otherwise succeeds with the specified value.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A` \| `A2`\>

**`Since`**

2.0.0

## caching

### cached

▸ **cached**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\>

Returns an effect that, if evaluated, will return the lazily computed
result of this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\>

**`Since`**

2.0.0

___

### cachedFunction

▸ **cachedFunction**\<`R`, `E`, `A`, `B`\>(`f`, `eq?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>\>

Returns a memoized version of the specified effectual function.

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
| `f` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `eq?` | `Equivalence`\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>\>

**`Since`**

2.0.0

___

### cachedInvalidateWithTTL

▸ **cachedInvalidateWithTTL**(`timeToLive`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>]\>

Returns an effect that, if evaluated, will return the cached result of this
effect. Cached results will expire after `timeToLive` duration. In
addition, returns an effect that can be used to invalidate the current
cached value before the `timeToLive` duration expires.

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeToLive` | `DurationInput` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>]\>

**`Since`**

2.0.0

▸ **cachedInvalidateWithTTL**\<`R`, `E`, `A`\>(`self`, `timeToLive`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>]\>

Returns an effect that, if evaluated, will return the cached result of this
effect. Cached results will expire after `timeToLive` duration. In
addition, returns an effect that can be used to invalidate the current
cached value before the `timeToLive` duration expires.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `timeToLive` | `DurationInput` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>]\>

**`Since`**

2.0.0

___

### cachedWithTTL

▸ **cachedWithTTL**(`timeToLive`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>\>

Returns an effect that, if evaluated, will return the cached result of this
effect. Cached results will expire after `timeToLive` duration.

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeToLive` | `DurationInput` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>\>

**`Since`**

2.0.0

▸ **cachedWithTTL**\<`R`, `E`, `A`\>(`self`, `timeToLive`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>\>

Returns an effect that, if evaluated, will return the cached result of this
effect. Cached results will expire after `timeToLive` duration.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `timeToLive` | `DurationInput` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>\>

**`Since`**

2.0.0

___

### once

▸ **once**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>\>

Returns an effect that will be executed at most once, even if it is
evaluated multiple times.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>\>

**`Example`**

```ts
import * as Effect from "effect/Effect"
import * as Console from "effect/Console"

const program = Effect.gen(function* (_) {
  const twice = Console.log("twice")
  yield* _(twice, Effect.repeatN(1))
  const once = yield* _(Console.log("once"), Effect.once)
  yield* _(once, Effect.repeatN(1))
})

Effect.runFork(program)
// Output:
// twice
// twice
// once
```

**`Since`**

2.0.0

## clock

### clock

• `Const` **clock**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Clock.Clock`\>

Retreives the `Clock` service from the context

**`Since`**

2.0.0

___

### clockWith

▸ **clockWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Retreives the `Clock` service from the context and provides it to the
specified effectful function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`clock`: `Clock`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withClock

▸ **withClock**\<`A`\>(`value`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Executes the specified workflow with the specified implementation of the
clock service.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Clock` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withClock**\<`R`, `E`, `A`\>(`effect`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Executes the specified workflow with the specified implementation of the
clock service.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | extends `Clock` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `value` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## collecting &amp; elements

### all

▸ **all**\<`Arg`, `O`\>(`arg`, `options?`): [`Return`](Effect.All.md#return)\<`Arg`, `O`\>

Runs all the provided effects in sequence respecting the structure provided in input.

Supports multiple arguments, a single argument tuple / array or record / struct.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Arg` | extends `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\>\> \| `Record`\<`string`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\>\> |
| `O` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Arg` |
| `options?` | `O` |

#### Returns

[`Return`](Effect.All.md#return)\<`Arg`, `O`\>

**`Since`**

2.0.0

___

### allSuccesses

▸ **allSuccesses**\<`R`, `E`, `A`\>(`elements`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`[]\>

Evaluate and run each effect in the structure and collect the results,
discarding results from failed effects.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`[]\>

**`Since`**

2.0.0

___

### allWith

▸ **allWith**\<`O`\>(`options?`): \<Arg\>(`arg`: `Arg`) => [`Return`](Effect.All.md#return)\<`Arg`, `O`\>

Data-last variant of `Effect.all`.

Runs all the provided effects in sequence respecting the structure provided in input.

Supports multiple arguments, a single argument tuple / array or record / struct.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `O` |

#### Returns

`fn`

▸ \<`Arg`\>(`arg`): [`Return`](Effect.All.md#return)\<`Arg`, `O`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Arg` | extends `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\>\> \| `Record`\<`string`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\>\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Arg` |

##### Returns

[`Return`](Effect.All.md#return)\<`Arg`, `O`\>

**`Since`**

2.0.0

___

### dropUntil

▸ **dropUntil**\<`B`, `R`, `E`, `A`\>(`predicate`): (`elements`: `Iterable`\<`B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

Drops all elements until the effectful predicate returns true.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `R` | `R` |
| `E` | `E` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

**`Since`**

2.0.0

▸ **dropUntil**\<`A`, `R`, `E`\>(`elements`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Drops all elements until the effectful predicate returns true.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

___

### dropWhile

▸ **dropWhile**\<`B`, `R`, `E`, `A`\>(`predicate`): (`elements`: `Iterable`\<`B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

Drops all elements so long as the predicate returns true.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `R` | `R` |
| `E` | `E` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

**`Since`**

2.0.0

▸ **dropWhile**\<`A`, `R`, `E`\>(`elements`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Drops all elements so long as the predicate returns true.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

___

### every

▸ **every**\<`R`, `E`, `A`\>(`f`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

Determines whether all elements of the `Collection<A>` satisfies the effectual
predicate `f`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

**`Since`**

2.0.0

▸ **every**\<`R`, `E`, `A`\>(`elements`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

Determines whether all elements of the `Collection<A>` satisfies the effectual
predicate `f`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

**`Since`**

2.0.0

___

### exists

▸ **exists**\<`R`, `E`, `A`\>(`f`, `options?`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

Determines whether any element of the `Iterable<A>` satisfies the effectual
predicate `f`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

**`Since`**

2.0.0

▸ **exists**\<`R`, `E`, `A`\>(`elements`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

Determines whether any element of the `Iterable<A>` satisfies the effectual
predicate `f`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

**`Since`**

2.0.0

___

### filter

▸ **filter**\<`A`, `R`, `E`\>(`f`, `options?`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Filters the collection using the specified effectful predicate.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.negate?` | `boolean` |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

▸ **filter**\<`A`, `R`, `E`\>(`elements`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Filters the collection using the specified effectful predicate.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.negate?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

___

### findFirst

▸ **findFirst**\<`A`, `R`, `E`\>(`f`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

Returns the first element that satisfies the effectful predicate.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

▸ **findFirst**\<`A`, `R`, `E`\>(`elements`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

Returns the first element that satisfies the effectful predicate.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

___

### firstSuccessOf

▸ **firstSuccessOf**\<`R`, `E`, `A`\>(`effects`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

This function takes an iterable of `Effect` values and returns a new
`Effect` value that represents the first `Effect` value in the iterable
that succeeds. If all of the `Effect` values in the iterable fail, then
the resulting `Effect` value will fail as well.

This function is sequential, meaning that the `Effect` values in the
iterable will be executed in sequence, and the first one that succeeds
will determine the outcome of the resulting `Effect` value.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `effects` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> | The iterable of `Effect` values to evaluate. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

A new `Effect` value that represents the first successful
`Effect` value in the iterable, or a failed `Effect` value if all of the
`Effect` values in the iterable fail.

**`Since`**

2.0.0

___

### forEach

▸ **forEach**\<`A`, `R`, `E`, `B`\>(`f`, `options?`): (`self`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard?` | ``false`` |

#### Returns

`fn`

▸ (`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

**`Since`**

2.0.0

▸ **forEach**\<`A`, `R`, `E`, `B`\>(`f`, `options`): (`self`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard` | ``true`` |

#### Returns

`fn`

▸ (`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

**`Since`**

2.0.0

▸ **forEach**\<`A`, `R`, `E`, `B`\>(`self`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard?` | ``false`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

**`Since`**

2.0.0

▸ **forEach**\<`A`, `R`, `E`, `B`\>(`self`, `f`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard` | ``true`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

**`Since`**

2.0.0

___

### head

▸ **head**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `NoSuchElementException`, `A`\>

Returns a successful effect with the head of the collection if the collection
is non-empty, or fails with the error `None` if the collection is empty.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Iterable`\<`A`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `NoSuchElementException`, `A`\>

**`Since`**

2.0.0

___

### mergeAll

▸ **mergeAll**\<`Z`, `A`\>(`zero`, `f`, `options?`): \<R, E\>(`elements`: `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Merges an `Iterable<Effect<R, E, A>>` to a single effect, working
sequentially.

#### Type parameters

| Name |
| :------ |
| `Z` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `zero` | `Z` |
| `f` | (`z`: `Z`, `a`: `A`, `i`: `number`) => `Z` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

▸ **mergeAll**\<`R`, `E`, `A`, `Z`\>(`elements`, `zero`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Merges an `Iterable<Effect<R, E, A>>` to a single effect, working
sequentially.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `Z` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `zero` | `Z` |
| `f` | (`z`: `Z`, `a`: `A`, `i`: `number`) => `Z` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

___

### partition

▸ **partition**\<`R`, `E`, `A`, `B`\>(`f`, `options?`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [excluded: E[], satisfying: B[]]\>

Feeds elements of type `A` to a function `f` that returns an effect.
Collects all successes and failures in a tupled fashion.

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
| `f` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [excluded: E[], satisfying: B[]]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [excluded: E[], satisfying: B[]]\>

**`Since`**

2.0.0

▸ **partition**\<`R`, `E`, `A`, `B`\>(`elements`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [excluded: E[], satisfying: B[]]\>

Feeds elements of type `A` to a function `f` that returns an effect.
Collects all successes and failures in a tupled fashion.

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
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [excluded: E[], satisfying: B[]]\>

**`Since`**

2.0.0

___

### reduce

▸ **reduce**\<`Z`, `A`, `R`, `E`\>(`zero`, `f`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Folds an `Iterable<A>` using an effectual function f, working sequentially
from left to right.

#### Type parameters

| Name |
| :------ |
| `Z` |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `zero` | `Z` |
| `f` | (`z`: `Z`, `a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

▸ **reduce**\<`Z`, `A`, `R`, `E`\>(`elements`, `zero`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Folds an `Iterable<A>` using an effectual function f, working sequentially
from left to right.

#### Type parameters

| Name |
| :------ |
| `Z` |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `zero` | `Z` |
| `f` | (`z`: `Z`, `a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

___

### reduceEffect

▸ **reduceEffect**\<`R`, `E`, `A`\>(`zero`, `f`, `options?`): (`elements`: `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Reduces an `Iterable<Effect<R, E, A>>` to a single effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `zero` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`acc`: `A`, `a`: `A`, `i`: `number`) => `A` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **reduceEffect**\<`R`, `E`, `A`\>(`elements`, `zero`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Reduces an `Iterable<Effect<R, E, A>>` to a single effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `zero` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`acc`: `A`, `a`: `A`, `i`: `number`) => `A` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### reduceRight

▸ **reduceRight**\<`A`, `Z`, `R`, `E`\>(`zero`, `f`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Folds an `Iterable<A>` using an effectual function f, working sequentially from left to right.

#### Type parameters

| Name |
| :------ |
| `A` |
| `Z` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `zero` | `Z` |
| `f` | (`a`: `A`, `z`: `Z`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

▸ **reduceRight**\<`A`, `Z`, `R`, `E`\>(`elements`, `zero`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Folds an `Iterable<A>` using an effectual function f, working sequentially from left to right.

#### Type parameters

| Name |
| :------ |
| `A` |
| `Z` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `zero` | `Z` |
| `f` | (`a`: `A`, `z`: `Z`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

___

### reduceWhile

▸ **reduceWhile**\<`A`, `R`, `E`, `Z`\>(`zero`, `options`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Folds over the elements in this chunk from the left, stopping the fold early
when the predicate is not satisfied.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `Z` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `zero` | `Z` |
| `options` | `Object` |
| `options.body` | (`s`: `Z`, `a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\> |
| `options.while` | [`Predicate`](../interfaces/.Predicate.md)\<`Z`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

▸ **reduceWhile**\<`A`, `R`, `E`, `Z`\>(`elements`, `zero`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

Folds over the elements in this chunk from the left, stopping the fold early
when the predicate is not satisfied.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `Z` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `zero` | `Z` |
| `options` | `Object` |
| `options.body` | (`s`: `Z`, `a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\> |
| `options.while` | [`Predicate`](../interfaces/.Predicate.md)\<`Z`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Z`\>

**`Since`**

2.0.0

___

### replicate

▸ **replicate**(`n`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>[]

Replicates the given effect `n` times.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>[]

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>[]

**`Since`**

2.0.0

▸ **replicate**\<`R`, `E`, `A`\>(`self`, `n`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>[]

Replicates the given effect `n` times.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `n` | `number` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>[]

**`Since`**

2.0.0

___

### replicateEffect

▸ **replicateEffect**(`n`, `options?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Performs this effect the specified number of times and collects the
results.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard?` | ``false`` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

▸ **replicateEffect**(`n`, `options`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

Performs this effect the specified number of times and collects the
results.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |
| `options` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard` | ``true`` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

**`Since`**

2.0.0

▸ **replicateEffect**\<`R`, `E`, `A`\>(`self`, `n`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Performs this effect the specified number of times and collects the
results.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `n` | `number` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard?` | ``false`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

▸ **replicateEffect**\<`R`, `E`, `A`\>(`self`, `n`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

Performs this effect the specified number of times and collects the
results.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `n` | `number` |
| `options` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard` | ``true`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

**`Since`**

2.0.0

___

### takeUntil

▸ **takeUntil**\<`B`, `R`, `E`, `A`\>(`predicate`): (`elements`: `Iterable`\<`B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

Takes elements until the effectual predicate returns true.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | `B` |
| `R` | `R` |
| `E` | `E` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

**`Since`**

2.0.0

▸ **takeUntil**\<`R`, `E`, `A`\>(`elements`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Takes elements until the effectual predicate returns true.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

___

### takeWhile

▸ **takeWhile**\<`R`, `E`, `B`, `A`\>(`predicate`): (`elements`: `Iterable`\<`B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

Takes all elements so long as the effectual predicate returns true.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `B` | `B` |
| `A` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`[]\>

**`Since`**

2.0.0

▸ **takeWhile**\<`R`, `E`, `A`\>(`elements`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

Takes all elements so long as the effectual predicate returns true.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`[]\>

**`Since`**

2.0.0

___

### validateAll

▸ **validateAll**\<`R`, `E`, `A`, `B`\>(`f`, `options?`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`[]\>

Feeds elements of type `A` to `f` and accumulates all errors in error
channel or successes in success channel.

This combinator is lossy meaning that if there are errors all successes
will be lost. To retain all information please use `partition`.

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
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard?` | ``false`` |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`[]\>

**`Since`**

2.0.0

▸ **validateAll**\<`R`, `E`, `A`, `B`\>(`f`, `options`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `void`\>

Feeds elements of type `A` to `f` and accumulates all errors in error
channel or successes in success channel.

This combinator is lossy meaning that if there are errors all successes
will be lost. To retain all information please use `partition`.

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
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard` | ``true`` |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `void`\>

**`Since`**

2.0.0

▸ **validateAll**\<`R`, `E`, `A`, `B`\>(`elements`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`[]\>

Feeds elements of type `A` to `f` and accumulates all errors in error
channel or successes in success channel.

This combinator is lossy meaning that if there are errors all successes
will be lost. To retain all information please use `partition`.

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
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard?` | ``false`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`[]\>

**`Since`**

2.0.0

▸ **validateAll**\<`R`, `E`, `A`, `B`\>(`elements`, `f`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `void`\>

Feeds elements of type `A` to `f` and accumulates all errors in error
channel or successes in success channel.

This combinator is lossy meaning that if there are errors all successes
will be lost. To retain all information please use `partition`.

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
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |
| `options.discard` | ``true`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `void`\>

**`Since`**

2.0.0

___

### validateFirst

▸ **validateFirst**\<`R`, `E`, `A`, `B`\>(`f`, `options?`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`\>

Feeds elements of type `A` to `f` until it succeeds. Returns first success
or the accumulation of all errors.

If `elements` is empty then `Effect.fail([])` is returned.

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
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`\>

**`Example`**

```ts
import * as Effect from "effect/Effect"
import * as Exit from "effect/Exit"

const f = (n: number) => (n > 0 ? Effect.succeed(n) : Effect.fail(`${n} is negative`))

assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([], f)), Exit.fail([]))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([1, 2], f)), Exit.succeed(1))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([1, -1], f)), Exit.succeed(1))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([-1, 2], f)), Exit.succeed(2))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([-1, -2], f)), Exit.fail(['-1 is negative', '-2 is negative']))
```

**`Since`**

2.0.0

▸ **validateFirst**\<`R`, `E`, `A`, `B`\>(`elements`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`\>

Feeds elements of type `A` to `f` until it succeeds. Returns first success
or the accumulation of all errors.

If `elements` is empty then `Effect.fail([])` is returned.

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
| `elements` | `Iterable`\<`A`\> |
| `f` | (`a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrency?` | `Concurrency` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `B`\>

**`Example`**

```ts
import * as Effect from "effect/Effect"
import * as Exit from "effect/Exit"

const f = (n: number) => (n > 0 ? Effect.succeed(n) : Effect.fail(`${n} is negative`))

assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([], f)), Exit.fail([]))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([1, 2], f)), Exit.succeed(1))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([1, -1], f)), Exit.succeed(1))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([-1, 2], f)), Exit.succeed(2))
assert.deepStrictEqual(Effect.runSyncExit(Effect.validateFirst([-1, -2], f)), Exit.fail(['-1 is negative', '-2 is negative']))
```

**`Since`**

2.0.0

## combining

### ap

▸ **ap**\<`R2`, `E2`, `A`\>(`that`): \<R, E, B\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, (`a`: `A`) => `B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `B`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, (`a`: `A`) => `B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B`\>

**`Since`**

2.0.0

▸ **ap**\<`R`, `E`, `A`, `B`, `R2`, `E2`\>(`self`, `that`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `B`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |
| `R2` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, (`a`: `A`) => `B`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `B`\>

**`Since`**

2.0.0

## config

### configProviderWith

▸ **configProviderWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Retrieves the default config provider, and passes it to the specified
function, which may return an effect that uses the provider to perform some
work or compute some value.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`configProvider`: `ConfigProvider`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withConfigProvider

▸ **withConfigProvider**(`value`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Executes the specified workflow with the specified configuration provider.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ConfigProvider` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withConfigProvider**\<`R`, `E`, `A`\>(`effect`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Executes the specified workflow with the specified configuration provider.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `value` | `ConfigProvider` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withConfigProviderScoped

▸ **withConfigProviderScoped**(`value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

Sets the configuration provider to the specified value and restores it to its original value
when the scope is closed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ConfigProvider` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

## console

### console

• `Const` **console**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Console`\>

Retreives the `Console` service from the context

**`Since`**

2.0.0

___

### consoleWith

▸ **consoleWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Retreives the `Console` service from the context and provides it to the
specified effectful function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`console`: `Console`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withConsole

▸ **withConsole**\<`A`\>(`console`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Executes the specified workflow with the specified implementation of the
console service.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Console` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `console` | `A` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withConsole**\<`R`, `E`, `A`\>(`effect`, `console`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Executes the specified workflow with the specified implementation of the
console service.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | extends `Console` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `console` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## constructors

### never

• `Const` **never**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

Returns a effect that will never produce anything. The moral equivalent of
`while(true) {}`, only without the wasted CPU cycles.

**`Since`**

2.0.0

___

### succeedNone

• `Const` **succeedNone**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Option`](O.md#option)\<`never`\>\>

Returns an effect which succeeds with `None`.

**`Since`**

2.0.0

___

### unit

• `Const` **unit**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### async

▸ **async**\<`R`, `E`, `A`\>(`register`, `blockingOn?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Imports an asynchronous side-effect into a pure `Effect` value.
The callback function `Effect<R, E, A> => void` must be called at most once.

If an Effect is returned by the registration function, it will be executed
if the fiber executing the effect is interrupted.

The registration function can also receive an `AbortSignal` if required for
interruption.

The `FiberId` of the fiber that may complete the async callback may be
provided to allow for better diagnostics.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `register` | (`callback`: (`_`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => `void`, `signal`: `AbortSignal`) => `void` \| [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\> |
| `blockingOn?` | `FiberId` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### asyncEffect

▸ **asyncEffect**\<`R`, `E`, `A`, `R2`, `E2`, `X`\>(`register`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

Converts an asynchronous, callback-style API into an `Effect`, which will
be executed asynchronously.

With this variant, the registration function may return a an `Effect`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `register` | (`callback`: (`_`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => `void`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

___

### asyncEither

▸ **asyncEither**\<`R`, `E`, `A`\>(`register`, `blockingOn?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Imports an asynchronous side-effect into an effect. It has the option of
returning the value synchronously, which is useful in cases where it cannot
be determined if the effect is synchronous or asynchronous until the register
is actually executed. It also has the option of returning a canceler,
which will be used by the runtime to cancel the asynchronous effect if the fiber
executing the effect is interrupted.

If the register function returns a value synchronously, then the callback
function `Effect<R, E, A> => void` must not be called. Otherwise the callback
function must be called at most once.

The `FiberId` of the fiber that may complete the async callback may be
provided to allow for better diagnostics.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `register` | (`callback`: (`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => `void`) => [`Either`](E.md#either)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>, [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `blockingOn?` | `FiberId` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### asyncOption

▸ **asyncOption**\<`R`, `E`, `A`\>(`register`, `blockingOn?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Imports an asynchronous effect into a pure `Effect` value, possibly returning
the value synchronously.

If the register function returns a value synchronously, then the callback
function `Effect<R, E, A> => void` must not be called. Otherwise the callback
function must be called at most once.

The `FiberId` of the fiber that may complete the async callback may be
provided to allow for better diagnostics.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `register` | (`callback`: (`_`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => `void`) => [`Option`](O.md#option)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `blockingOn?` | `FiberId` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### die

▸ **die**(`defect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `defect` | `unknown` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### dieMessage

▸ **dieMessage**(`message`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

Returns an effect that dies with a `RuntimeException` having the specified
text message. This method can be used for terminating a fiber because a
defect has been detected in the code.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### dieSync

▸ **dieSync**(`evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### fail

▸ **fail**\<`E`\>(`error`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

**`Since`**

2.0.0

___

### failCause

▸ **failCause**\<`E`\>(`cause`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cause` | `Cause`\<`E`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

**`Since`**

2.0.0

___

### failCauseSync

▸ **failCauseSync**\<`E`\>(`evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`Cause`\<`E`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

**`Since`**

2.0.0

___

### failSync

▸ **failSync**\<`E`\>(`evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`E`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `never`\>

**`Since`**

2.0.0

___

### gen

▸ **gen**\<`Eff`, `AEff`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<[`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`R`, `any`, `any`\>] ? `R` : `never`, [`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`any`, `E`, `any`\>] ? `E` : `never`, `AEff`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Eff` | extends [`EffectGen`](../interfaces/Effect.EffectGen.md)\<`any`, `any`, `any`\> |
| `AEff` | `AEff` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`resume`: [`Adapter`](../interfaces/Effect.Adapter.md)) => `Generator`\<`Eff`, `AEff`, `any`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<[`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`R`, `any`, `any`\>] ? `R` : `never`, [`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`any`, `E`, `any`\>] ? `E` : `never`, `AEff`\>

**`Since`**

2.0.0

▸ **gen**\<`Self`, `Eff`, `AEff`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<[`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`R`, `any`, `any`\>] ? `R` : `never`, [`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`any`, `E`, `any`\>] ? `E` : `never`, `AEff`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Self` | `Self` |
| `Eff` | extends [`EffectGen`](../interfaces/Effect.EffectGen.md)\<`any`, `any`, `any`\> |
| `AEff` | `AEff` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Self` |
| `f` | (`this`: `Self`, `resume`: [`Adapter`](../interfaces/Effect.Adapter.md)) => `Generator`\<`Eff`, `AEff`, `any`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<[`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`R`, `any`, `any`\>] ? `R` : `never`, [`Eff`] extends [`never`] ? `never` : [`Eff`] extends [[`EffectGen`](../interfaces/Effect.EffectGen.md)\<`any`, `E`, `any`\>] ? `E` : `never`, `AEff`\>

**`Since`**

2.0.0

___

### none

▸ **none**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `NoSuchElementException` \| `E`, `void`\>

Requires the option produced by this value to be `None`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `NoSuchElementException` \| `E`, `void`\>

**`Since`**

2.0.0

___

### promise

▸ **promise**\<`A`\>(`evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `A`\>

Like `tryPromise` but produces a defect in case of errors.

An optional `AbortSignal` can be provided to allow for interruption of the
wrapped Promise api.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | (`signal`: `AbortSignal`) => `Promise`\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `A`\>

**`Since`**

2.0.0

___

### succeed

▸ **succeed**\<`A`\>(`value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `A`\>

**`Since`**

2.0.0

___

### succeedSome

▸ **succeedSome**\<`A`\>(`value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Option`](O.md#option)\<`A`\>\>

Returns an effect which succeeds with the value wrapped in a `Some`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

___

### suspend

▸ **suspend**\<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### sync

▸ **sync**\<`A`\>(`evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `A`\>

**`Since`**

2.0.0

___

### withClockScoped

▸ **withClockScoped**\<`A`\>(`value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

Sets the implementation of the clock service to the specified value and
restores it to its original value when the scope is closed.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Clock` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

___

### withConsoleScoped

▸ **withConsoleScoped**\<`A`\>(`console`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

Sets the implementation of the console service to the specified value and
restores it to its original value when the scope is closed.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Console` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `console` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

___

### yieldNow

▸ **yieldNow**(`options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.priority?` | `number` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

## context

### context

▸ **context**\<`R`\>(): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Context`](../interfaces/Context.Context.md)\<`R`\>\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Context`](../interfaces/Context.Context.md)\<`R`\>\>

**`Since`**

2.0.0

___

### contextWith

▸ **contextWith**\<`R`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

Accesses the context of the effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`R`\>) => `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

**`Since`**

2.0.0

___

### contextWithEffect

▸ **contextWithEffect**\<`R`, `R0`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R0`, `E`, `A`\>

Effectually accesses the context of the effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `R0` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`R0`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R0`, `E`, `A`\>

**`Since`**

2.0.0

___

### mapInputContext

▸ **mapInputContext**\<`R0`, `R`\>(`f`): \<E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R0`, `E`, `A`\>

Provides some of the context required to run this effect,
leaving the remainder `R0`.

#### Type parameters

| Name |
| :------ |
| `R0` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`R0`\>) => [`Context`](../interfaces/Context.Context.md)\<`R`\> |

#### Returns

`fn`

▸ \<`E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R0`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R0`, `E`, `A`\>

**`Since`**

2.0.0

▸ **mapInputContext**\<`R0`, `R`, `E`, `A`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R0`, `E`, `A`\>

Provides some of the context required to run this effect,
leaving the remainder `R0`.

#### Type parameters

| Name |
| :------ |
| `R0` |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`context`: [`Context`](../interfaces/Context.Context.md)\<`R0`\>) => [`Context`](../interfaces/Context.Context.md)\<`R`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R0`, `E`, `A`\>

**`Since`**

2.0.0

___

### provide

▸ **provide**\<`R2`, `E2`, `A2`\>(`layer`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `A2`\>, `E2` \| `E`, `A`\>

Splits the context into two parts, providing one part using the
specified layer/context/runtime and leaving the remainder `R0`

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `A2`\>, `E2` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `A2`\>, `E2` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **provide**\<`R2`\>(`context`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

Splits the context into two parts, providing one part using the
specified layer/context/runtime and leaving the remainder `R0`

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](../interfaces/Context.Context.md)\<`R2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **provide**\<`R2`\>(`runtime`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

Splits the context into two parts, providing one part using the
specified layer/context/runtime and leaving the remainder `R0`

#### Type parameters

| Name |
| :------ |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `runtime` | `Runtime`\<`R2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **provide**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `layer`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `A2`\>, `E` \| `E2`, `A`\>

Splits the context into two parts, providing one part using the
specified layer/context/runtime and leaving the remainder `R0`

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `layer` | [`Layer`](../interfaces/Layer.Layer-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `A2`\>, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

▸ **provide**\<`R`, `E`, `A`, `R2`\>(`self`, `context`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

Splits the context into two parts, providing one part using the
specified layer/context/runtime and leaving the remainder `R0`

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `context` | [`Context`](../interfaces/Context.Context.md)\<`R2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **provide**\<`R`, `E`, `A`, `R2`\>(`self`, `runtime`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

Splits the context into two parts, providing one part using the
specified layer/context/runtime and leaving the remainder `R0`

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `runtime` | `Runtime`\<`R2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `R2`\>, `E`, `A`\>

**`Since`**

2.0.0

___

### provideService

▸ **provideService**\<`T`\>(`tag`, `service`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `Identifier`\<`T`\>\>, `E`, `A`\>

Provides the effect with the single service it requires. If the effect
requires more than one service use `provideContext` instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `service` | `Service`\<`T`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `Identifier`\<`T`\>\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `Identifier`\<`T`\>\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **provideService**\<`R`, `E`, `A`, `T`\>(`self`, `tag`, `service`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `Identifier`\<`T`\>\>, `E`, `A`\>

Provides the effect with the single service it requires. If the effect
requires more than one service use `provideContext` instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `tag` | `T` |
| `service` | `Service`\<`T`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `Identifier`\<`T`\>\>, `E`, `A`\>

**`Since`**

2.0.0

___

### provideServiceEffect

▸ **provideServiceEffect**\<`T`, `R1`, `E1`\>(`tag`, `effect`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `Exclude`\<`R`, `Identifier`\<`T`\>\>, `E1` \| `E`, `A`\>

Provides the effect with the single service it requires. If the effect
requires more than one service use `provideContext` instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |
| `R1` | `R1` |
| `E1` | `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `Service`\<`T`\>\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `Exclude`\<`R`, `Identifier`\<`T`\>\>, `E1` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `Exclude`\<`R`, `Identifier`\<`T`\>\>, `E1` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **provideServiceEffect**\<`R`, `E`, `A`, `T`, `R1`, `E1`\>(`self`, `tag`, `effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `Exclude`\<`R`, `Identifier`\<`T`\>\>, `E` \| `E1`, `A`\>

Provides the effect with the single service it requires. If the effect
requires more than one service use `provideContext` instead.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |
| `R1` | `R1` |
| `E1` | `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `tag` | `T` |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `Service`\<`T`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `Exclude`\<`R`, `Identifier`\<`T`\>\>, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

___

### serviceConstants

▸ **serviceConstants**\<`SR`, `SE`, `S`\>(`getService`): \{ [k in string \| number \| symbol]: S[k] extends Effect\<R, E, A\> ? Effect\<SR \| R, SE \| E, A\> : never }

#### Type parameters

| Name |
| :------ |
| `SR` |
| `SE` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getService` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`SR`, `SE`, `S`\> |

#### Returns

\{ [k in string \| number \| symbol]: S[k] extends Effect\<R, E, A\> ? Effect\<SR \| R, SE \| E, A\> : never }

**`Since`**

2.0.0

___

### serviceFunction

▸ **serviceFunction**\<`T`, `Args`, `A`\>(`getService`, `f`): (...`args`: `Args`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<[`Context`](Effect.Effect.md#context)\<`T`\>, [`Error`](Effect.Effect.md#error)\<`T`\>, `A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |
| `Args` | extends `any`[] |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getService` | `T` |
| `f` | (`_`: [`Success`](Effect.Effect.md#success)\<`T`\>) => (...`args`: `Args`) => `A` |

#### Returns

`fn`

▸ (`...args`): [`Effect`](../interfaces/Effect.Effect-1.md)\<[`Context`](Effect.Effect.md#context)\<`T`\>, [`Error`](Effect.Effect.md#error)\<`T`\>, `A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<[`Context`](Effect.Effect.md#context)\<`T`\>, [`Error`](Effect.Effect.md#error)\<`T`\>, `A`\>

**`Since`**

2.0.0

___

### serviceFunctionEffect

▸ **serviceFunctionEffect**\<`T`, `Args`, `R`, `E`, `A`\>(`getService`, `f`): (...`args`: `Args`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| [`Context`](Effect.Effect.md#context)\<`T`\>, `E` \| [`Error`](Effect.Effect.md#error)\<`T`\>, `A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |
| `Args` | extends `any`[] |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getService` | `T` |
| `f` | (`_`: [`Success`](Effect.Effect.md#success)\<`T`\>) => (...`args`: `Args`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

`fn`

▸ (`...args`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| [`Context`](Effect.Effect.md#context)\<`T`\>, `E` \| [`Error`](Effect.Effect.md#error)\<`T`\>, `A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| [`Context`](Effect.Effect.md#context)\<`T`\>, `E` \| [`Error`](Effect.Effect.md#error)\<`T`\>, `A`\>

**`Since`**

2.0.0

___

### serviceFunctions

▸ **serviceFunctions**\<`SR`, `SE`, `S`\>(`getService`): \{ [k in string \| number \| symbol]: S[k] extends Function ? Function : never }

#### Type parameters

| Name |
| :------ |
| `SR` |
| `SE` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getService` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`SR`, `SE`, `S`\> |

#### Returns

\{ [k in string \| number \| symbol]: S[k] extends Function ? Function : never }

**`Since`**

2.0.0

___

### serviceMembers

▸ **serviceMembers**\<`SR`, `SE`, `S`\>(`getService`): `Object`

#### Type parameters

| Name |
| :------ |
| `SR` |
| `SE` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `getService` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`SR`, `SE`, `S`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `constants` | \{ [k in string \| number \| symbol]: S[k] extends Effect\<R, E, A\> ? Effect\<SR \| R, SE \| E, A\> : never } |
| `functions` | \{ [k in string \| number \| symbol]: S[k] extends Function ? Function : never } |

**`Since`**

2.0.0

___

### serviceOption

▸ **serviceOption**\<`I`, `S`\>(`tag`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Option`](O.md#option)\<`S`\>\>

#### Type parameters

| Name |
| :------ |
| `I` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, `S`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Option`](O.md#option)\<`S`\>\>

**`Since`**

2.0.0

___

### serviceOptional

▸ **serviceOptional**\<`I`, `S`\>(`tag`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `NoSuchElementException`, `S`\>

#### Type parameters

| Name |
| :------ |
| `I` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | [`Tag`](../interfaces/Context.Tag.md)\<`I`, `S`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `NoSuchElementException`, `S`\>

**`Since`**

2.0.0

___

### updateService

▸ **updateService**\<`T`\>(`tag`, `f`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `Identifier`\<`T`\>, `E`, `A`\>

Updates the service with the required service entry.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `T` |
| `f` | (`service`: `Service`\<`T`\>) => `Service`\<`T`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `Identifier`\<`T`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `Identifier`\<`T`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **updateService**\<`R`, `E`, `A`, `T`\>(`self`, `tag`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `Identifier`\<`T`\>, `E`, `A`\>

Updates the service with the required service entry.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `T` | extends [`Tag`](../interfaces/Context.Tag.md)\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `tag` | `T` |
| `f` | (`service`: `Service`\<`T`\>) => `Service`\<`T`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `Identifier`\<`T`\>, `E`, `A`\>

**`Since`**

2.0.0

## conversions

### either

▸ **either**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Either`](E.md#either)\<`E`, `A`\>\>

Returns an effect whose failure and success have been lifted into an
`Either`. The resulting effect cannot fail, because the failure case has
been exposed as part of the `Either` success case.

This method is useful for recovering from effects that may fail.

The error parameter of the returned `Effect` is `never`, since it is
guaranteed the effect does not model failure.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Either`](E.md#either)\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### exit

▸ **exit**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Exit`\<`E`, `A`\>\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Exit`\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### intoDeferred

▸ **intoDeferred**\<`E`, `A`\>(`deferred`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `deferred` | `Deferred`\<`E`, `A`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

**`Since`**

2.0.0

▸ **intoDeferred**\<`R`, `E`, `A`\>(`self`, `deferred`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `deferred` | `Deferred`\<`E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

**`Since`**

2.0.0

___

### option

▸ **option**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Option`](O.md#option)\<`A`\>\>

Executes this effect, skipping the error but returning optionally the
success.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

## delays &amp; timeouts

### delay

▸ **delay**(`duration`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns an effect that is delayed from this effect by the specified
`Duration`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `duration` | `DurationInput` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **delay**\<`R`, `E`, `A`\>(`self`, `duration`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns an effect that is delayed from this effect by the specified
`Duration`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `duration` | `DurationInput` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### sleep

▸ **sleep**(`duration`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Returns an effect that suspends for the specified duration. This method is
asynchronous, and does not actually block the fiber executing the effect.

#### Parameters

| Name | Type |
| :------ | :------ |
| `duration` | `DurationInput` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### timed

▸ **timed**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Duration`, `A`]\>

Returns a new effect that executes this one and times the execution.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Duration`, `A`]\>

**`Since`**

2.0.0

___

### timedWith

▸ **timedWith**\<`R1`, `E1`\>(`nanoseconds`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, [`Duration`, `A`]\>

A more powerful variation of `timed` that allows specifying the clock.

#### Type parameters

| Name |
| :------ |
| `R1` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nanoseconds` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `bigint`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, [`Duration`, `A`]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, [`Duration`, `A`]\>

**`Since`**

2.0.0

▸ **timedWith**\<`R`, `E`, `A`, `R1`, `E1`\>(`self`, `nanoseconds`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, [`Duration`, `A`]\>

A more powerful variation of `timed` that allows specifying the clock.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `nanoseconds` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `bigint`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, [`Duration`, `A`]\>

**`Since`**

2.0.0

___

### timeout

▸ **timeout**(`duration`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `NoSuchElementException` \| `E`, `A`\>

Returns an effect that will timeout this effect, returning `None` if the
timeout elapses before the effect has produced a value; and returning
`Some` of the produced value otherwise.

If the timeout elapses without producing a value, the running effect will
be safely interrupted.

WARNING: The effect returned by this method will not itself return until
the underlying effect is actually interrupted. This leads to more
predictable resource utilization. If early return is desired, then instead
of using `effect.timeout(d)`, use `effect.disconnect.timeout(d)`, which
first disconnects the effect's interruption signal before performing the
timeout, resulting in earliest possible return, before an underlying effect
has been successfully interrupted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `duration` | `DurationInput` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `NoSuchElementException` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `NoSuchElementException` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **timeout**\<`R`, `E`, `A`\>(`self`, `duration`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `NoSuchElementException` \| `E`, `A`\>

Returns an effect that will timeout this effect, returning `None` if the
timeout elapses before the effect has produced a value; and returning
`Some` of the produced value otherwise.

If the timeout elapses without producing a value, the running effect will
be safely interrupted.

WARNING: The effect returned by this method will not itself return until
the underlying effect is actually interrupted. This leads to more
predictable resource utilization. If early return is desired, then instead
of using `effect.timeout(d)`, use `effect.disconnect.timeout(d)`, which
first disconnects the effect's interruption signal before performing the
timeout, resulting in earliest possible return, before an underlying effect
has been successfully interrupted.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `duration` | `DurationInput` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `NoSuchElementException` \| `E`, `A`\>

**`Since`**

2.0.0

___

### timeoutFail

▸ **timeoutFail**\<`E1`\>(`options`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `A`\>

The same as `timeout`, but instead of producing a `None` in the event of
timeout, it will produce the specified error.

#### Type parameters

| Name |
| :------ |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.duration` | `DurationInput` |
| `options.onTimeout` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`E1`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **timeoutFail**\<`R`, `E`, `A`, `E1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `A`\>

The same as `timeout`, but instead of producing a `None` in the event of
timeout, it will produce the specified error.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.duration` | `DurationInput` |
| `options.onTimeout` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`E1`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

___

### timeoutFailCause

▸ **timeoutFailCause**\<`E1`\>(`options`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `A`\>

The same as `timeout`, but instead of producing a `None` in the event of
timeout, it will produce the specified failure.

#### Type parameters

| Name |
| :------ |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.duration` | `DurationInput` |
| `options.onTimeout` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`Cause`\<`E1`\>\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **timeoutFailCause**\<`R`, `E`, `A`, `E1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `A`\>

The same as `timeout`, but instead of producing a `None` in the event of
timeout, it will produce the specified failure.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.duration` | `DurationInput` |
| `options.onTimeout` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`Cause`\<`E1`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

___

### timeoutTo

▸ **timeoutTo**\<`A`, `B`, `B1`\>(`options`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B` \| `B1`\>

Returns an effect that will timeout this effect, returning either the
default value if the timeout elapses before the effect has produced a
value or returning the result of applying the function `onSuccess` to the
success value of the effect.

If the timeout elapses without producing a value, the running effect will
be safely interrupted.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `B1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.duration` | `DurationInput` |
| `options.onSuccess` | (`a`: `A`) => `B` |
| `options.onTimeout` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B1`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B` \| `B1`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B` \| `B1`\>

**`Since`**

2.0.0

▸ **timeoutTo**\<`R`, `E`, `A`, `B`, `B1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B` \| `B1`\>

Returns an effect that will timeout this effect, returning either the
default value if the timeout elapses before the effect has produced a
value or returning the result of applying the function `onSuccess` to the
success value of the effect.

If the timeout elapses without producing a value, the running effect will
be safely interrupted.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |
| `B1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.duration` | `DurationInput` |
| `options.onSuccess` | (`a`: `A`) => `B` |
| `options.onTimeout` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`B1`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B` \| `B1`\>

**`Since`**

2.0.0

## do notation

### Do

• `Const` **Do**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, {}\>

**`Since`**

2.0.0

___

### bind

▸ **bind**\<`N`, `K`, `R2`, `E2`, `A`\>(`tag`, `f`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `K`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

Binds an effectful value in a `do` scope

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `K` | `K` |
| `R2` | `R2` |
| `E2` | `E2` |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `Exclude`\<`N`, keyof `K`\> |
| `f` | (`_`: `K`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `K`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

**`Since`**

2.0.0

▸ **bind**\<`R`, `E`, `N`, `K`, `R2`, `E2`, `A`\>(`self`, `tag`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

Binds an effectful value in a `do` scope

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `N` | extends `string` |
| `K` | `K` |
| `R2` | `R2` |
| `E2` | `E2` |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `K`\> |
| `tag` | `Exclude`\<`N`, keyof `K`\> |
| `f` | (`_`: `K`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`MergeRecord`](Effect.md#mergerecord)\<`K`, \{ [k in string]: A }\>\>

**`Since`**

2.0.0

___

### bindTo

▸ **bindTo**\<`N`\>(`tag`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Record`\<`N`, `A`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tag` | `N` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Record`\<`N`, `A`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Record`\<`N`, `A`\>\>

**`Since`**

2.0.0

▸ **bindTo**\<`R`, `E`, `A`, `N`\>(`self`, `tag`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Record`\<`N`, `A`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `tag` | `N` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Record`\<`N`, `A`\>\>

**`Since`**

2.0.0

## error handling

### catchAll

▸ **catchAll**\<`E`, `R2`, `E2`, `A2`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

Recovers from all recoverable errors.

**Note**: that `Effect.catchAll` will not recover from unrecoverable defects. To
recover from both recoverable and unrecoverable errors use
`Effect.catchAllCause`.

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
| `f` | (`e`: `E`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchAll**\<`R`, `A`, `E`, `R2`, `E2`, `A2`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2`, `A` \| `A2`\>

Recovers from all recoverable errors.

**Note**: that `Effect.catchAll` will not recover from unrecoverable defects. To
recover from both recoverable and unrecoverable errors use
`Effect.catchAllCause`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |
| `E` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`e`: `E`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### catchAllCause

▸ **catchAllCause**\<`E`, `R2`, `E2`, `A2`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

Recovers from both recoverable and unrecoverable errors.

See `sandbox`, `mapErrorCause` for other functions that can
recover from defects.

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
| `f` | (`cause`: `Cause`\<`E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchAllCause**\<`R`, `A`, `E`, `R2`, `E2`, `A2`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2`, `A` \| `A2`\>

Recovers from both recoverable and unrecoverable errors.

See `sandbox`, `mapErrorCause` for other functions that can
recover from defects.

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |
| `E` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`cause`: `Cause`\<`E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### catchAllDefect

▸ **catchAllDefect**\<`R2`, `E2`, `A2`\>(`f`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

Recovers from all defects with provided function.

**WARNING**: There is no sensible way to recover from defects. This
method should be used only at the boundary between Effect and an external
system, to transmit information on a defect for diagnostic or explanatory
purposes.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`defect`: `unknown`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchAllDefect**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Recovers from all defects with provided function.

**WARNING**: There is no sensible way to recover from defects. This
method should be used only at the boundary between Effect and an external
system, to transmit information on a defect for diagnostic or explanatory
purposes.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`defect`: `unknown`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### catchIf

▸ **catchIf**\<`E`, `EA`, `EB`, `R2`, `E2`, `A2`\>(`refinement`, `f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `Exclude`\<`E`, `EB`\>, `A2` \| `A`\>

Recovers from errors that match the given predicate.

#### Type parameters

| Name |
| :------ |
| `E` |
| `EA` |
| `EB` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`EA`, `EB`\> |
| `f` | (`e`: `EB`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `Exclude`\<`E`, `EB`\>, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `Exclude`\<`E`, `EB`\>, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchIf**\<`E`, `EX`, `R2`, `E2`, `A2`\>(`predicate`, `f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

Recovers from errors that match the given predicate.

#### Type parameters

| Name |
| :------ |
| `E` |
| `EX` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`EX`\> |
| `f` | (`e`: `EX`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchIf**\<`R`, `E`, `A`, `EA`, `EB`, `R2`, `E2`, `A2`\>(`self`, `refinement`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2` \| `Exclude`\<`E`, `EB`\>, `A` \| `A2`\>

Recovers from errors that match the given predicate.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `EA` |
| `EB` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `refinement` | [`Refinement`](../interfaces/.Refinement.md)\<`EA`, `EB`\> |
| `f` | (`e`: `EB`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E2` \| `Exclude`\<`E`, `EB`\>, `A` \| `A2`\>

**`Since`**

2.0.0

▸ **catchIf**\<`R`, `E`, `A`, `EX`, `R2`, `E2`, `A2`\>(`self`, `predicate`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Recovers from errors that match the given predicate.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `EX` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`EX`\> |
| `f` | (`e`: `EX`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### catchSome

▸ **catchSome**\<`E`, `R2`, `E2`, `A2`\>(`pf`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

Recovers from some or all of the error cases.

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
| `pf` | (`e`: `E`) => [`Option`](O.md#option)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchSome**\<`R`, `A`, `E`, `R2`, `E2`, `A2`\>(`self`, `pf`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Recovers from some or all of the error cases.

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |
| `E` |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `pf` | (`e`: `E`) => [`Option`](O.md#option)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### catchSomeCause

▸ **catchSomeCause**\<`E`, `R2`, `E2`, `A2`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

Recovers from some or all of the error cases with provided cause.

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
| `f` | (`cause`: `Cause`\<`E`\>) => [`Option`](O.md#option)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchSomeCause**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Recovers from some or all of the error cases with provided cause.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`cause`: `Cause`\<`E`\>) => [`Option`](O.md#option)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### catchSomeDefect

▸ **catchSomeDefect**\<`R2`, `E2`, `A2`\>(`pf`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

Recovers from some or all of the defects with provided partial function.

**WARNING**: There is no sensible way to recover from defects. This
method should be used only at the boundary between Effect and an external
system, to transmit information on a defect for diagnostic or explanatory
purposes.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pf` | (`defect`: `unknown`) => [`Option`](O.md#option)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **catchSomeDefect**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `pf`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Recovers from some or all of the defects with provided partial function.

**WARNING**: There is no sensible way to recover from defects. This
method should be used only at the boundary between Effect and an external
system, to transmit information on a defect for diagnostic or explanatory
purposes.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `pf` | (`defect`: `unknown`) => [`Option`](O.md#option)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### catchTag

▸ **catchTag**\<`K`, `E`, `R1`, `E1`, `A1`\>(`k`, `f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `Exclude`\<`E`, \{ `_tag`: `K`  }\>, `A1` \| `A`\>

Recovers from the specified tagged error.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `E` | `E` |
| `R1` | `R1` |
| `E1` | `E1` |
| `A1` | `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `K` |
| `f` | (`e`: `Extract`\<`E`, \{ `_tag`: `K`  }\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `Exclude`\<`E`, \{ `_tag`: `K`  }\>, `A1` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `Exclude`\<`E`, \{ `_tag`: `K`  }\>, `A1` \| `A`\>

**`Since`**

2.0.0

▸ **catchTag**\<`R`, `E`, `A`, `K`, `R1`, `E1`, `A1`\>(`self`, `k`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E1` \| `Exclude`\<`E`, \{ `_tag`: `K`  }\>, `A` \| `A1`\>

Recovers from the specified tagged error.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `K` | extends `string` |
| `R1` | `R1` |
| `E1` | `E1` |
| `A1` | `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `k` | `K` |
| `f` | (`e`: `Extract`\<`E`, \{ `_tag`: `K`  }\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E1` \| `Exclude`\<`E`, \{ `_tag`: `K`  }\>, `A` \| `A1`\>

**`Since`**

2.0.0

___

### catchTags

▸ **catchTags**\<`E`, `Cases`\>(`cases`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? R : never }[keyof `Cases`], `Exclude`\<`E`, \{ `_tag`: keyof `Cases`  }\> \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? E : never }[keyof `Cases`], `A` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? A : never }[keyof `Cases`]\>

Recovers from the specified tagged errors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `Cases` | extends \{ [K in string]?: Function } \| \{ [K in string]?: Function } & \{ [K in number \| symbol]: never } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cases` | `Cases` |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? R : never }[keyof `Cases`], `Exclude`\<`E`, \{ `_tag`: keyof `Cases`  }\> \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? E : never }[keyof `Cases`], `A` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? A : never }[keyof `Cases`]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? R : never }[keyof `Cases`], `Exclude`\<`E`, \{ `_tag`: keyof `Cases`  }\> \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? E : never }[keyof `Cases`], `A` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? A : never }[keyof `Cases`]\>

**`Since`**

2.0.0

▸ **catchTags**\<`R`, `E`, `A`, `Cases`\>(`self`, `cases`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? R : never }[keyof `Cases`], `Exclude`\<`E`, \{ `_tag`: keyof `Cases`  }\> \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? E : never }[keyof `Cases`], `A` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? A : never }[keyof `Cases`]\>

Recovers from the specified tagged errors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `Cases` | extends \{ [K in string]?: Function } \| \{ [K in string]?: Function } & \{ [K in number \| symbol]: never } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `cases` | `Cases` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? R : never }[keyof `Cases`], `Exclude`\<`E`, \{ `_tag`: keyof `Cases`  }\> \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? E : never }[keyof `Cases`], `A` \| \{ [K in string \| number \| symbol]: Cases[K] extends Function ? A : never }[keyof `Cases`]\>

**`Since`**

2.0.0

___

### cause

▸ **cause**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Cause`\<`E`\>\>

Returns an effect that succeeds with the cause of failure of this effect,
or `Cause.empty` if the effect did succeed.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Cause`\<`E`\>\>

**`Since`**

2.0.0

___

### eventually

▸ **eventually**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

Returns an effect that ignores errors and runs repeatedly until it
eventually succeeds.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A`\>

**`Since`**

2.0.0

___

### ignore

▸ **ignore**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

Returns a new effect that ignores the success or failure of this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

**`Since`**

2.0.0

___

### ignoreLogged

▸ **ignoreLogged**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

Returns a new effect that ignores the success or failure of this effect,
but which also logs failures at the Debug level, just in case the failure
turns out to be important.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

**`Since`**

2.0.0

___

### parallelErrors

▸ **parallelErrors**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `A`\>

Exposes all parallel errors in a single call.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`[], `A`\>

**`Since`**

2.0.0

___

### retry

▸ **retry**\<`E`, `O`\>(`options`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `_O`\>  } ? `E` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`E`, `E2`\>  } ? `E2` : `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `A`\>

Retries according to the options provided

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `O` | extends [`Options`](../interfaces/Effect.Retry.Options.md)\<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `O` |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `_O`\>  } ? `E` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`E`, `E2`\>  } ? `E2` : `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `_O`\>  } ? `E` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`E`, `E2`\>  } ? `E2` : `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `A`\>

**`Since`**

2.0.0

▸ **retry**\<`R1`, `E`, `E0`, `B`\>(`policy`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

Retries according to the options provided

#### Type parameters

| Name |
| :------ |
| `R1` |
| `E` |
| `E0` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `Schedule`\<`R1`, `E0`, `B`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **retry**\<`R`, `A`, `E`, `O`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `_O`\>  } ? `E` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`E`, `E2`\>  } ? `E2` : `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `A`\>

Retries according to the options provided

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `A` | `A` |
| `E` | `E` |
| `O` | extends [`Options`](../interfaces/Effect.Retry.Options.md)\<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `O` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `_O`\>  } ? `E` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`E`, `E2`\>  } ? `E2` : `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `A`\>

**`Since`**

2.0.0

▸ **retry**\<`R`, `E`, `E0`, `A`, `R1`, `B`\>(`self`, `policy`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `A`\>

Retries according to the options provided

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `E0` |
| `A` |
| `R1` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `policy` | `Schedule`\<`R1`, `E0`, `B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `A`\>

**`Since`**

2.0.0

___

### retryOrElse

▸ **retryOrElse**\<`R1`, `E`, `A1`, `R2`, `E2`, `A2`, `E3`\>(`policy`, `orElse`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

Retries with the specified schedule, until it fails, and then both the
value produced by the schedule together with the last error are passed to
the recovery function.

#### Type parameters

| Name |
| :------ |
| `R1` |
| `E` |
| `A1` |
| `R2` |
| `E2` |
| `A2` |
| `E3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `Schedule`\<`R1`, `E3`, `A1`\> |
| `orElse` | (`e`: `E`, `out`: `A1`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R`, `E` \| `E2`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **retryOrElse**\<`R`, `E`, `A`, `R1`, `A1`, `R2`, `E2`, `A2`, `E3`\>(`self`, `policy`, `orElse`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Retries with the specified schedule, until it fails, and then both the
value produced by the schedule together with the last error are passed to
the recovery function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `A1` |
| `R2` |
| `E2` |
| `A2` |
| `E3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `policy` | `Schedule`\<`R1`, `E3`, `A1`\> |
| `orElse` | (`e`: `E`, `out`: `A1`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### sandbox

▸ **sandbox**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `Cause`\<`E`\>, `A`\>

Exposes the full `Cause` of failure for the specified effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `Cause`\<`E`\>, `A`\>

**`Since`**

2.0.0

___

### tryMap

▸ **tryMap**\<`A`, `B`, `E1`\>(`options`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `B`\>

Returns an effect whose success is mapped by the specified side effecting
`try` function, translating any promise rejections into typed failed effects
via the `catch` function.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.catch` | (`error`: `unknown`) => `E1` |
| `options.try` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `B`\>

**`Since`**

2.0.0

▸ **tryMap**\<`R`, `E`, `A`, `B`, `E1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `B`\>

Returns an effect whose success is mapped by the specified side effecting
`try` function, translating any promise rejections into typed failed effects
via the `catch` function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.catch` | (`error`: `unknown`) => `E1` |
| `options.try` | (`a`: `A`) => `B` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `B`\>

**`Since`**

2.0.0

___

### tryMapPromise

▸ **tryMapPromise**\<`A`, `B`, `E1`\>(`options`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `B`\>

Returns an effect whose success is mapped by the specified side effecting
`try` function, translating any promise rejections into typed failed effects
via the `catch` function.

An optional `AbortSignal` can be provided to allow for interruption of the
wrapped Promise api.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.catch` | (`error`: `unknown`) => `E1` |
| `options.try` | (`a`: `A`, `signal`: `AbortSignal`) => `Promise`\<`B`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E1` \| `E`, `B`\>

**`Since`**

2.0.0

▸ **tryMapPromise**\<`R`, `E`, `A`, `B`, `E1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `B`\>

Returns an effect whose success is mapped by the specified side effecting
`try` function, translating any promise rejections into typed failed effects
via the `catch` function.

An optional `AbortSignal` can be provided to allow for interruption of the
wrapped Promise api.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |
| `E1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.catch` | (`error`: `unknown`) => `E1` |
| `options.try` | (`a`: `A`, `signal`: `AbortSignal`) => `Promise`\<`B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E1`, `B`\>

**`Since`**

2.0.0

___

### tryPromise

▸ **tryPromise**\<`A`, `E`\>(`options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>

Create an `Effect` that when executed will construct `promise` and wait for
its result, errors will produce failure as `unknown`.

An optional `AbortSignal` can be provided to allow for interruption of the
wrapped Promise api.

#### Type parameters

| Name |
| :------ |
| `A` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.catch` | (`error`: `unknown`) => `E` |
| `options.try` | (`signal`: `AbortSignal`) => `Promise`\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>

**`Since`**

2.0.0

▸ **tryPromise**\<`A`\>(`try_`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `UnknownException`, `A`\>

Create an `Effect` that when executed will construct `promise` and wait for
its result, errors will produce failure as `unknown`.

An optional `AbortSignal` can be provided to allow for interruption of the
wrapped Promise api.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `try_` | (`signal`: `AbortSignal`) => `Promise`\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `UnknownException`, `A`\>

**`Since`**

2.0.0

___

### unsandbox

▸ **unsandbox**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

The inverse operation `sandbox(effect)`

Terminates with exceptions on the `Left` side of the `Either` error, if it
exists. Otherwise extracts the contained `Effect<R, E, A>`

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `Cause`\<`E`\>, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## execution

### runCallback

▸ **runCallback**\<`E`, `A`\>(`effect`, `options?`): `Cancel`\<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\> |
| `options?` | `RunCallbackOptions`\<`E`, `A`\> |

#### Returns

`Cancel`\<`E`, `A`\>

**`Since`**

2.0.0

___

### runFork

▸ **runFork**\<`E`, `A`\>(`effect`, `options?`): `RuntimeFiber`\<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\> |
| `options?` | `RunForkOptions` |

#### Returns

`RuntimeFiber`\<`E`, `A`\>

**`Since`**

2.0.0

___

### runPromise

▸ **runPromise**\<`E`, `A`\>(`effect`): `Promise`\<`A`\>

Runs an `Effect` workflow, returning a `Promise` which resolves with the
result of the workflow or rejects with an error.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\> |

#### Returns

`Promise`\<`A`\>

**`Since`**

2.0.0

___

### runPromiseExit

▸ **runPromiseExit**\<`E`, `A`\>(`effect`): `Promise`\<`Exit`\<`E`, `A`\>\>

Runs an `Effect` workflow, returning a `Promise` which resolves with the
`Exit` value of the workflow.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\> |

#### Returns

`Promise`\<`Exit`\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### runSync

▸ **runSync**\<`E`, `A`\>(`effect`): `A`

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\> |

#### Returns

`A`

**`Since`**

2.0.0

___

### runSyncExit

▸ **runSyncExit**\<`E`, `A`\>(`effect`): `Exit`\<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\> |

#### Returns

`Exit`\<`E`, `A`\>

**`Since`**

2.0.0

## fiber refs

### getFiberRefs

• `Const` **getFiberRefs**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `FiberRefs.FiberRefs`\>

Returns a collection of all `FiberRef` values for the fiber running this
effect.

**`Since`**

2.0.0

___

### inheritFiberRefs

▸ **inheritFiberRefs**(`childFiberRefs`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Inherits values from all `FiberRef` instances into current fiber.

#### Parameters

| Name | Type |
| :------ | :------ |
| `childFiberRefs` | `FiberRefs` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### locally

▸ **locally**\<`A`\>(`self`, `value`): \<R, E, B\>(`use`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

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

`fn`

▸ \<`R`, `E`, `B`\>(`use`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **locally**\<`R`, `E`, `B`, `A`\>(`use`, `self`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `self` | `FiberRef`\<`A`\> |
| `value` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

___

### locallyScoped

▸ **locallyScoped**\<`A`\>(`value`): (`self`: `FiberRef`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

`fn`

▸ (`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `FiberRef`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

▸ **locallyScoped**\<`A`\>(`self`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

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

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

___

### locallyScopedWith

▸ **locallyScopedWith**\<`A`\>(`f`): (`self`: `FiberRef`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `A` |

#### Returns

`fn`

▸ (`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `FiberRef`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

▸ **locallyScopedWith**\<`A`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `FiberRef`\<`A`\> |
| `f` | (`a`: `A`) => `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

___

### locallyWith

▸ **locallyWith**\<`A`\>(`self`, `f`): \<R, E, B\>(`use`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `FiberRef`\<`A`\> |
| `f` | (`a`: `A`) => `A` |

#### Returns

`fn`

▸ \<`R`, `E`, `B`\>(`use`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **locallyWith**\<`R`, `E`, `B`, `A`\>(`use`, `self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `self` | `FiberRef`\<`A`\> |
| `f` | (`a`: `A`) => `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

___

### patchFiberRefs

▸ **patchFiberRefs**(`patch`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Applies the specified changes to the `FiberRef` values for the fiber
running this workflow.

#### Parameters

| Name | Type |
| :------ | :------ |
| `patch` | `FiberRefsPatch` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### setFiberRefs

▸ **setFiberRefs**(`fiberRefs`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Sets the `FiberRef` values for the fiber running this effect to the values
in the specified collection of `FiberRef` values.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fiberRefs` | `FiberRefs` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### updateFiberRefs

▸ **updateFiberRefs**(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Updates the `FiberRef` values for the fiber running this effect using the
specified function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`fiberId`: `Runtime`, `fiberRefs`: `FiberRefs`) => `FiberRefs` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

## filtering &amp; conditionals

### filterOrDie

▸ **filterOrDie**\<`A`, `B`, `X`\>(`filter`, `orDieWith`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Filter the specified effect with the provided function, dying with specified
defect if the predicate fails.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orDieWith` | (`a`: `X`) => `unknown` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **filterOrDie**\<`A`, `X`, `Y`\>(`filter`, `orDieWith`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Filter the specified effect with the provided function, dying with specified
defect if the predicate fails.

#### Type parameters

| Name |
| :------ |
| `A` |
| `X` |
| `Y` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orDieWith` | (`a`: `Y`) => `unknown` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **filterOrDie**\<`R`, `E`, `A`, `B`, `X`\>(`self`, `filter`, `orDieWith`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Filter the specified effect with the provided function, dying with specified
defect if the predicate fails.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orDieWith` | (`a`: `X`) => `unknown` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **filterOrDie**\<`R`, `E`, `A`, `X`, `Y`\>(`self`, `filter`, `orDieWith`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Filter the specified effect with the provided function, dying with specified
defect if the predicate fails.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `X` |
| `Y` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orDieWith` | (`a`: `Y`) => `unknown` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### filterOrDieMessage

▸ **filterOrDieMessage**\<`A`, `B`\>(`filter`, `message`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Filter the specified effect with the provided function, dying with specified
message if the predicate fails.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `message` | `string` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **filterOrDieMessage**\<`A`, `X`\>(`filter`, `message`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Filter the specified effect with the provided function, dying with specified
message if the predicate fails.

#### Type parameters

| Name |
| :------ |
| `A` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `message` | `string` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **filterOrDieMessage**\<`R`, `E`, `A`, `B`\>(`self`, `filter`, `message`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Filter the specified effect with the provided function, dying with specified
message if the predicate fails.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `message` | `string` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **filterOrDieMessage**\<`R`, `E`, `A`, `X`\>(`self`, `filter`, `message`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Filter the specified effect with the provided function, dying with specified
message if the predicate fails.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `message` | `string` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### filterOrElse

▸ **filterOrElse**\<`A`, `B`, `X`, `R2`, `E2`, `C`\>(`filter`, `orElse`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B` \| `C`\>

Filters the specified effect with the provided function returning the value
of the effect if it is successful, otherwise returns the value of `orElse`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `X` |
| `R2` |
| `E2` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orElse` | (`a`: `X`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `C`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B` \| `C`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B` \| `C`\>

**`Since`**

2.0.0

▸ **filterOrElse**\<`A`, `X`, `Y`, `R2`, `E2`, `B`\>(`filter`, `orElse`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A` \| `B`\>

Filters the specified effect with the provided function returning the value
of the effect if it is successful, otherwise returns the value of `orElse`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `X` |
| `Y` |
| `R2` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orElse` | (`a`: `Y`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `B`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A` \| `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A` \| `B`\>

**`Since`**

2.0.0

▸ **filterOrElse**\<`R`, `E`, `A`, `B`, `X`, `R2`, `E2`, `C`\>(`self`, `filter`, `orElse`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `B` \| `C`\>

Filters the specified effect with the provided function returning the value
of the effect if it is successful, otherwise returns the value of `orElse`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |
| `X` |
| `R2` |
| `E2` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orElse` | (`a`: `X`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `C`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `B` \| `C`\>

**`Since`**

2.0.0

▸ **filterOrElse**\<`R`, `E`, `A`, `X`, `Y`, `R2`, `E2`, `B`\>(`self`, `filter`, `orElse`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `B`\>

Filters the specified effect with the provided function returning the value
of the effect if it is successful, otherwise returns the value of `orElse`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `X` |
| `Y` |
| `R2` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orElse` | (`a`: `Y`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `B`\>

**`Since`**

2.0.0

___

### filterOrFail

▸ **filterOrFail**\<`A`, `B`, `X`, `E2`\>(`filter`, `orFailWith`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2` \| `E`, `B`\>

Filter the specified effect with the provided function, failing with specified
error if the predicate fails.

In addition to the filtering capabilities discussed earlier, you have the option to further
refine and narrow down the type of the success channel by providing a
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
Let's explore this concept through an example:

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `X` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orFailWith` | (`a`: `X`) => `E2` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2` \| `E`, `B`\>

**`Example`**

```ts
import { Effect, pipe } from "effect"

// Define a user interface
interface User {
  readonly name: string
}

// Assume an asynchronous authentication function
declare const auth: () => Promise<User | null>

const program = pipe(
  Effect.promise(() => auth()),
  Effect.filterOrFail(
    // Define a guard to narrow down the type
    (user): user is User => user !== null,
    () => new Error("Unauthorized")
  ),
  Effect.map((user) => user.name) // The 'user' here has type `User`, not `User | null`
)
```

**`Since`**

2.0.0

▸ **filterOrFail**\<`A`, `X`, `Y`, `E2`\>(`filter`, `orFailWith`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2` \| `E`, `A`\>

Filter the specified effect with the provided function, failing with specified
error if the predicate fails.

In addition to the filtering capabilities discussed earlier, you have the option to further
refine and narrow down the type of the success channel by providing a
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
Let's explore this concept through an example:

#### Type parameters

| Name |
| :------ |
| `A` |
| `X` |
| `Y` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orFailWith` | (`a`: `Y`) => `E2` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2` \| `E`, `A`\>

**`Example`**

```ts
import { Effect, pipe } from "effect"

// Define a user interface
interface User {
  readonly name: string
}

// Assume an asynchronous authentication function
declare const auth: () => Promise<User | null>

const program = pipe(
  Effect.promise(() => auth()),
  Effect.filterOrFail(
    // Define a guard to narrow down the type
    (user): user is User => user !== null,
    () => new Error("Unauthorized")
  ),
  Effect.map((user) => user.name) // The 'user' here has type `User`, not `User | null`
)
```

**`Since`**

2.0.0

▸ **filterOrFail**\<`R`, `E`, `A`, `B`, `X`, `E2`\>(`self`, `filter`, `orFailWith`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E2`, `B`\>

Filter the specified effect with the provided function, failing with specified
error if the predicate fails.

In addition to the filtering capabilities discussed earlier, you have the option to further
refine and narrow down the type of the success channel by providing a
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
Let's explore this concept through an example:

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |
| `X` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orFailWith` | (`a`: `X`) => `E2` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E2`, `B`\>

**`Example`**

```ts
import { Effect, pipe } from "effect"

// Define a user interface
interface User {
  readonly name: string
}

// Assume an asynchronous authentication function
declare const auth: () => Promise<User | null>

const program = pipe(
  Effect.promise(() => auth()),
  Effect.filterOrFail(
    // Define a guard to narrow down the type
    (user): user is User => user !== null,
    () => new Error("Unauthorized")
  ),
  Effect.map((user) => user.name) // The 'user' here has type `User`, not `User | null`
)
```

**`Since`**

2.0.0

▸ **filterOrFail**\<`R`, `E`, `A`, `X`, `Y`, `E2`\>(`self`, `filter`, `orFailWith`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E2`, `A`\>

Filter the specified effect with the provided function, failing with specified
error if the predicate fails.

In addition to the filtering capabilities discussed earlier, you have the option to further
refine and narrow down the type of the success channel by providing a
[user-defined type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).
Let's explore this concept through an example:

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `X` |
| `Y` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orFailWith` | (`a`: `Y`) => `E2` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E` \| `E2`, `A`\>

**`Example`**

```ts
import { Effect, pipe } from "effect"

// Define a user interface
interface User {
  readonly name: string
}

// Assume an asynchronous authentication function
declare const auth: () => Promise<User | null>

const program = pipe(
  Effect.promise(() => auth()),
  Effect.filterOrFail(
    // Define a guard to narrow down the type
    (user): user is User => user !== null,
    () => new Error("Unauthorized")
  ),
  Effect.map((user) => user.name) // The 'user' here has type `User`, not `User | null`
)
```

**`Since`**

2.0.0

___

### unless

▸ **unless**(`predicate`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

The moral equivalent of `if (!p) exp`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`boolean`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

▸ **unless**\<`R`, `E`, `A`\>(`self`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

The moral equivalent of `if (!p) exp`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `predicate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

___

### unlessEffect

▸ **unlessEffect**\<`R2`, `E2`\>(`predicate`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`Option`](O.md#option)\<`A`\>\>

The moral equivalent of `if (!p) exp` when `p` has side-effects.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `boolean`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`Option`](O.md#option)\<`A`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

▸ **unlessEffect**\<`R`, `E`, `A`, `R2`, `E2`\>(`self`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`Option`](O.md#option)\<`A`\>\>

The moral equivalent of `if (!p) exp` when `p` has side-effects.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `predicate` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

___

### when

▸ **when**(`predicate`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

The moral equivalent of `if (p) exp`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`boolean`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

▸ **when**\<`R`, `E`, `A`\>(`self`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

The moral equivalent of `if (p) exp`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `predicate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

___

### whenEffect

▸ **whenEffect**\<`R`, `E`\>(`predicate`): \<R2, E2, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`Option`](O.md#option)\<`A`\>\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `predicate` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

`fn`

▸ \<`R2`, `E2`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`Option`](O.md#option)\<`A`\>\>

##### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

▸ **whenEffect**\<`R`, `E`, `A`, `R2`, `E2`\>(`self`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`Option`](O.md#option)\<`A`\>\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A`\> |
| `predicate` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

___

### whenFiberRef

▸ **whenFiberRef**\<`S`\>(`fiberRef`, `predicate`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

Executes this workflow when value of the specified `FiberRef` satisfies the
predicate.

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fiberRef` | `FiberRef`\<`S`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`S`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

**`Since`**

2.0.0

▸ **whenFiberRef**\<`R`, `E`, `A`, `S`\>(`self`, `fiberRef`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

Executes this workflow when value of the specified `FiberRef` satisfies the
predicate.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `fiberRef` | `FiberRef`\<`S`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`S`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

**`Since`**

2.0.0

___

### whenRef

▸ **whenRef**\<`S`\>(`ref`, `predicate`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

Executes this workflow when the value of the `Ref` satisfies the predicate.

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`S`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`S`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

**`Since`**

2.0.0

▸ **whenRef**\<`R`, `E`, `A`, `S`\>(`self`, `ref`, `predicate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

Executes this workflow when the value of the `Ref` satisfies the predicate.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `ref` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`S`\> |
| `predicate` | [`Predicate`](../interfaces/.Predicate.md)\<`S`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`S`, [`Option`](O.md#option)\<`A`\>]\>

**`Since`**

2.0.0

## getters &amp; folding

### isFailure

▸ **isFailure**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

Returns `true` if this effect is a failure, `false` otherwise.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

**`Since`**

2.0.0

___

### isSuccess

▸ **isSuccess**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

Returns `true` if this effect is a success, `false` otherwise.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `boolean`\>

**`Since`**

2.0.0

___

### match

▸ **match**\<`E`, `A`, `A2`, `A3`\>(`options`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

Folds over the failure value or the success value to yield an effect that
does not fail, but succeeds with the value returned by the left or right
function passed to `match`.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `A2` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onFailure` | (`error`: `E`) => `A2` |
| `options.onSuccess` | (`value`: `A`) => `A3` |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

**`Since`**

2.0.0

▸ **match**\<`R`, `E`, `A`, `A2`, `A3`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

Folds over the failure value or the success value to yield an effect that
does not fail, but succeeds with the value returned by the left or right
function passed to `match`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `A2` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`error`: `E`) => `A2` |
| `options.onSuccess` | (`value`: `A`) => `A3` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

**`Since`**

2.0.0

___

### matchCause

▸ **matchCause**\<`E`, `A2`, `A`, `A3`\>(`options`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A2` |
| `A` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onFailure` | (`cause`: `Cause`\<`E`\>) => `A2` |
| `options.onSuccess` | (`a`: `A`) => `A3` |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

**`Since`**

2.0.0

▸ **matchCause**\<`R`, `E`, `A2`, `A`, `A3`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A2` |
| `A` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`cause`: `Cause`\<`E`\>) => `A2` |
| `options.onSuccess` | (`a`: `A`) => `A3` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `A2` \| `A3`\>

**`Since`**

2.0.0

___

### matchCauseEffect

▸ **matchCauseEffect**\<`E`, `A`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`options`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

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
| `options.onFailure` | (`cause`: `Cause`\<`E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

**`Since`**

2.0.0

▸ **matchCauseEffect**\<`R`, `E`, `A`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` \| `A3`\>

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`cause`: `Cause`\<`E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` \| `A3`\>

**`Since`**

2.0.0

___

### matchEffect

▸ **matchEffect**\<`E`, `A`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`options`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

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
| `options.onFailure` | (`e`: `E`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

**`Since`**

2.0.0

▸ **matchEffect**\<`R`, `E`, `A`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` \| `A3`\>

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`e`: `E`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options.onSuccess` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `A3`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E2` \| `E3`, `A2` \| `A3`\>

**`Since`**

2.0.0

## interruption

### allowInterrupt

• `Const` **allowInterrupt**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

This function checks if any fibers are attempting to interrupt the current
fiber, and if so, performs self-interruption.

Note that this allows for interruption to occur in uninterruptible regions.

**`Since`**

2.0.0

___

### interrupt

• `Const` **interrupt**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### checkInterruptible

▸ **checkInterruptible**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Checks the interrupt status, and produces the effect returned by the
specified callback.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`isInterruptible`: `boolean`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### disconnect

▸ **disconnect**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns an effect whose interruption will be disconnected from the
fiber's own interruption, being performed in the background without
slowing down the fiber's interruption.

This method is useful to create "fast interrupting" effects. For
example, if you call this on a bracketed effect, then even if the
effect is "stuck" in acquire or release, its interruption will return
immediately, while the acquire / release are performed in the
background.

See timeout and race for other applications.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### interruptWith

▸ **interruptWith**(`fiberId`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fiberId` | `FiberId` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `never`\>

**`Since`**

2.0.0

___

### interruptible

▸ **interruptible**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### interruptibleMask

▸ **interruptibleMask**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`restore`: \<RX, EX, AX\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`RX`, `EX`, `AX`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RX`, `EX`, `AX`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### onInterrupt

▸ **onInterrupt**\<`R2`, `X`\>(`cleanup`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cleanup` | (`interruptors`: `HashSet`\<`FiberId`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **onInterrupt**\<`R`, `E`, `A`, `R2`, `X`\>(`self`, `cleanup`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `cleanup` | (`interruptors`: `HashSet`\<`FiberId`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

**`Since`**

2.0.0

___

### uninterruptible

▸ **uninterruptible**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### uninterruptibleMask

▸ **uninterruptibleMask**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`restore`: \<RX, EX, AX\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`RX`, `EX`, `AX`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`RX`, `EX`, `AX`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## logging

### logAnnotations

• `Const` **logAnnotations**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `HashMap.HashMap`\<`string`, `unknown`\>\>

Retrieves the log annotations associated with the current scope.

**`Since`**

2.0.0

___

### annotateLogs

▸ **annotateLogs**(`key`, `value`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Annotates each log in this effect with the specified log annotation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **annotateLogs**(`values`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Annotates each log in this effect with the specified log annotation.

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Record`\<`string`, `unknown`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **annotateLogs**\<`R`, `E`, `A`\>(`effect`, `key`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Annotates each log in this effect with the specified log annotation.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **annotateLogs**\<`R`, `E`, `A`\>(`effect`, `values`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Annotates each log in this effect with the specified log annotation.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `values` | `Record`\<`string`, `unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### log

▸ **log**\<`A`\>(`messageOrCause`, `supplementary?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Logs the specified message or cause at the current log level.

You can set the current log level using `FiberRef.currentLogLevel`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageOrCause` | `A` |
| `supplementary?` | `A` extends `Cause`\<`any`\> ? `unknown` : `Cause`\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### logDebug

▸ **logDebug**\<`A`\>(`messageOrCause`, `supplementary?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Logs the specified message or cause at the Debug log level.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageOrCause` | `A` |
| `supplementary?` | `A` extends `Cause`\<`any`\> ? `unknown` : `Cause`\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### logError

▸ **logError**\<`A`\>(`messageOrCause`, `supplementary?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Logs the specified message or cause at the Error log level.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageOrCause` | `A` |
| `supplementary?` | `A` extends `Cause`\<`any`\> ? `unknown` : `Cause`\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### logFatal

▸ **logFatal**\<`A`\>(`messageOrCause`, `supplementary?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Logs the specified message or cause at the Fatal log level.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageOrCause` | `A` |
| `supplementary?` | `A` extends `Cause`\<`any`\> ? `unknown` : `Cause`\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### logInfo

▸ **logInfo**\<`A`\>(`messageOrCause`, `supplementary?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Logs the specified message or cause at the Info log level.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageOrCause` | `A` |
| `supplementary?` | `A` extends `Cause`\<`any`\> ? `unknown` : `Cause`\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### logTrace

▸ **logTrace**\<`A`\>(`messageOrCause`, `supplementary?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Logs the specified message or cause at the Trace log level.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageOrCause` | `A` |
| `supplementary?` | `A` extends `Cause`\<`any`\> ? `unknown` : `Cause`\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### logWarning

▸ **logWarning**\<`A`\>(`messageOrCause`, `supplementary?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Logs the specified message or cause at the Warning log level.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageOrCause` | `A` |
| `supplementary?` | `A` extends `Cause`\<`any`\> ? `unknown` : `Cause`\<`unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### withLogSpan

▸ **withLogSpan**(`label`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Adjusts the label for the current logging span.

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withLogSpan**\<`R`, `E`, `A`\>(`effect`, `label`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Adjusts the label for the current logging span.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `label` | `string` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withUnhandledErrorLogLevel

▸ **withUnhandledErrorLogLevel**(`level`): \<R, E, B\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Decides wether child fibers will report or not unhandled errors via the logger

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | [`Option`](O.md#option)\<`LogLevel`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `B`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **withUnhandledErrorLogLevel**\<`R`, `E`, `B`\>(`self`, `level`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Decides wether child fibers will report or not unhandled errors via the logger

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `level` | [`Option`](O.md#option)\<`LogLevel`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

## mapping

### as

▸ **as**\<`B`\>(`value`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

This function maps the success value of an `Effect` value to a specified
constant value.

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `B` | The constant value that the success value of the `Effect` value will be mapped to. |

#### Returns

`fn`

A new `Effect` value that represents the mapping of the success
value of the original `Effect` value to the specified constant value.

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **as**\<`R`, `E`, `A`, `B`\>(`self`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

This function maps the success value of an `Effect` value to a specified
constant value.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | The `Effect` value whose success value will be mapped to the specified constant value. |
| `value` | `B` | The constant value that the success value of the `Effect` value will be mapped to. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

A new `Effect` value that represents the mapping of the success
value of the original `Effect` value to the specified constant value.

**`Since`**

2.0.0

___

### asSome

▸ **asSome**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

This function maps the success value of an `Effect` value to a `Some` value
in an `Option` value. If the original `Effect` value fails, the returned
`Effect` value will also fail.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | The `Effect` value whose success value will be mapped to a `Some` value in an `Option` value. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Option`](O.md#option)\<`A`\>\>

A new `Effect` value that represents the mapping of the success
value of the original `Effect` value to a `Some` value in an `Option`
value. The returned `Effect` value may fail if the original `Effect` value
fails.

**`Since`**

2.0.0

___

### asSomeError

▸ **asSomeError**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, [`Option`](O.md#option)\<`E`\>, `A`\>

This function maps the error value of an `Effect` value to a `Some` value
in an `Option` value. If the original `Effect` value succeeds, the returned
`Effect` value will also succeed.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | The `Effect` value whose error value will be mapped to a `Some` value in an `Option` value. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, [`Option`](O.md#option)\<`E`\>, `A`\>

A new `Effect` value that represents the mapping of the error
value of the original `Effect` value to a `Some` value in an `Option`
value. The returned `Effect` value may succeed if the original `Effect`
value succeeds.

**`Since`**

2.0.0

___

### asUnit

▸ **asUnit**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

This function maps the success value of an `Effect` value to `void`. If the
original `Effect` value succeeds, the returned `Effect` value will also
succeed. If the original `Effect` value fails, the returned `Effect` value
will fail with the same error.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | The `Effect` value whose success value will be mapped to `void`. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

A new `Effect` value that represents the mapping of the success
value of the original `Effect` value to `void`.

**`Since`**

2.0.0

___

### flip

▸ **flip**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `A`, `E`\>

Returns an effect that swaps the error/success cases. This allows you to
use all methods on the error channel, possibly before flipping back.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `A`, `E`\>

**`Since`**

2.0.0

___

### flipWith

▸ **flipWith**\<`R`, `A`, `E`, `R2`, `A2`, `E2`\>(`f`): (`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>

Swaps the error/value parameters, applies the function `f` and flips the
parameters back

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |
| `E` |
| `R2` |
| `A2` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `A`, `E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `A2`, `E2`\> |

#### Returns

`fn`

▸ (`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>

**`Since`**

2.0.0

▸ **flipWith**\<`R`, `A`, `E`, `R2`, `A2`, `E2`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>

Swaps the error/value parameters, applies the function `f` and flips the
parameters back

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |
| `E` |
| `R2` |
| `A2` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `A`, `E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `A2`, `E2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>

**`Since`**

2.0.0

___

### map

▸ **map**\<`A`, `B`\>(`f`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **map**\<`R`, `E`, `A`, `B`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`a`: `A`) => `B` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

___

### mapAccum

▸ **mapAccum**\<`A`, `B`, `R`, `E`, `Z`\>(`zero`, `f`): (`elements`: `Iterable`\<`A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Z`, `B`[]]\>

Statefully and effectfully maps over the elements of this chunk to produce
new elements.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `R` |
| `E` |
| `Z` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `zero` | `Z` |
| `f` | (`z`: `Z`, `a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, readonly [`Z`, `B`]\> |

#### Returns

`fn`

▸ (`elements`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Z`, `B`[]]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Z`, `B`[]]\>

**`Since`**

2.0.0

▸ **mapAccum**\<`A`, `B`, `R`, `E`, `Z`\>(`elements`, `zero`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Z`, `B`[]]\>

Statefully and effectfully maps over the elements of this chunk to produce
new elements.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `R` |
| `E` |
| `Z` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `elements` | `Iterable`\<`A`\> |
| `zero` | `Z` |
| `f` | (`z`: `Z`, `a`: `A`, `i`: `number`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, readonly [`Z`, `B`]\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Z`, `B`[]]\>

**`Since`**

2.0.0

___

### mapBoth

▸ **mapBoth**\<`E`, `A`, `E2`, `A2`\>(`options`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A2`\>

Returns an effect whose failure and success channels have been mapped by
the specified `onFailure` and `onSuccess` functions.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onFailure` | (`e`: `E`) => `E2` |
| `options.onSuccess` | (`a`: `A`) => `A2` |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A2`\>

**`Since`**

2.0.0

▸ **mapBoth**\<`R`, `E`, `A`, `E2`, `A2`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A2`\>

Returns an effect whose failure and success channels have been mapped by
the specified `onFailure` and `onSuccess` functions.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`e`: `E`) => `E2` |
| `options.onSuccess` | (`a`: `A`) => `A2` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A2`\>

**`Since`**

2.0.0

___

### mapError

▸ **mapError**\<`E`, `E2`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

Returns an effect with its error channel mapped using the specified function.

#### Type parameters

| Name |
| :------ |
| `E` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`e`: `E`) => `E2` |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

▸ **mapError**\<`R`, `A`, `E`, `E2`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

Returns an effect with its error channel mapped using the specified function.

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |
| `E` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`e`: `E`) => `E2` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

___

### mapErrorCause

▸ **mapErrorCause**\<`E`, `E2`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

Returns an effect with its full cause of failure mapped using the specified
function. This can be used to transform errors while preserving the
original structure of `Cause`.

See `sandbox`, `catchAllCause` for other functions for dealing
with defects.

#### Type parameters

| Name |
| :------ |
| `E` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`cause`: `Cause`\<`E`\>) => `Cause`\<`E2`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

▸ **mapErrorCause**\<`R`, `E`, `A`, `E2`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

Returns an effect with its full cause of failure mapped using the specified
function. This can be used to transform errors while preserving the
original structure of `Cause`.

See `sandbox`, `catchAllCause` for other functions for dealing
with defects.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`cause`: `Cause`\<`E`\>) => `Cause`\<`E2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E2`, `A`\>

**`Since`**

2.0.0

___

### merge

▸ **merge**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `E` \| `A`\>

Returns a new effect where the error channel has been merged into the
success channel to their common combined type.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `E` \| `A`\>

**`Since`**

2.0.0

___

### negate

▸ **negate**\<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

Returns a new effect where boolean value of this effect is negated.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `boolean`\>

**`Since`**

2.0.0

## metrics

### metricLabels

• `Const` **metricLabels**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `ReadonlyArray`\<`MetricLabel.MetricLabel`\>\>

Retrieves the metric labels associated with the current scope.

**`Since`**

2.0.0

___

### labelMetrics

▸ **labelMetrics**(`labels`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Tags each metric in this effect with the specific tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `labels` | `Iterable`\<`MetricLabel`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **labelMetrics**\<`R`, `E`, `A`\>(`self`, `labels`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Tags each metric in this effect with the specific tag.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `labels` | `Iterable`\<`MetricLabel`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### labelMetricsScoped

▸ **labelMetricsScoped**(`labels`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

Tags each metric in a scope with a the specific tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `labels` | readonly `MetricLabel`[] |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

___

### tagMetrics

▸ **tagMetrics**(`key`, `value`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Tags each metric in this effect with the specific tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **tagMetrics**(`values`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Tags each metric in this effect with the specific tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Record`\<`string`, `string`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **tagMetrics**\<`R`, `E`, `A`\>(`effect`, `key`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Tags each metric in this effect with the specific tag.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `key` | `string` |
| `value` | `string` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **tagMetrics**\<`R`, `E`, `A`\>(`effect`, `values`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Tags each metric in this effect with the specific tag.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `values` | `Record`\<`string`, `string`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### tagMetricsScoped

▸ **tagMetricsScoped**(`key`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

Tags each metric in a scope with a the specific tag.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

___

### withMetric

▸ **withMetric**\<`Type`, `In`, `Out`\>(`metric`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `Type` |
| `In` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `metric` | `Metric`\<`Type`, `In`, `Out`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withMetric**\<`R`, `E`, `A`, `Type`, `In`, `Out`\>(`self`, `metric`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `Type` |
| `In` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `metric` | `Metric`\<`Type`, `In`, `Out`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## optionality

### fromNullable

▸ **fromNullable**\<`A`\>(`value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `NoSuchElementException`, `NonNullable`\<`A`\>\>

Returns an effect that errors with `NoSuchElementException` if the value is
null or undefined, otherwise succeeds with the value.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `NoSuchElementException`, `NonNullable`\<`A`\>\>

**`Since`**

2.0.0

___

### optionFromOptional

▸ **optionFromOptional**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `Exclude`\<`E`, `NoSuchElementException`\>, [`Option`](O.md#option)\<`A`\>\>

Wraps the success value of this effect with `Option.some`, and maps
`Cause.NoSuchElementException` to `Option.none`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `Exclude`\<`E`, `NoSuchElementException`\>, [`Option`](O.md#option)\<`A`\>\>

**`Since`**

2.0.0

## random

### random

• `Const` **random**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Random.Random`\>

Retreives the `Random` service from the context.

**`Since`**

2.0.0

___

### randomWith

▸ **randomWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Retreives the `Random` service from the context and uses it to run the
specified workflow.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`random`: `Random`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## refinements

### isEffect

▸ **isEffect**(`u`): u is Effect\<unknown, unknown, unknown\>

This function returns `true` if the specified value is an `Effect` value,
`false` otherwise.

This function can be useful for checking the type of a value before
attempting to operate on it as an `Effect` value. For example, you could
use `isEffect` to check the type of a value before using it as an
argument to a function that expects an `Effect` value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `u` | `unknown` | The value to check for being an `Effect` value. |

#### Returns

u is Effect\<unknown, unknown, unknown\>

`true` if the specified value is an `Effect` value, `false`
otherwise.

**`Since`**

2.0.0

## repetition / recursion

### forever

▸ **forever**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `never`\>

Repeats this effect forever (until the first error).

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `never`\>

**`Since`**

2.0.0

___

### iterate

▸ **iterate**\<`A`, `B`, `R`, `E`\>(`initial`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

The `Effect.iterate` function allows you to iterate with an effectful operation. It uses an effectful `body` operation to change the state during each iteration and continues the iteration as long as the `while` function evaluates to `true`:

```ts
Effect.iterate(initial, options: { while, body })
```

We can think of `Effect.iterate` as equivalent to a `while` loop in JavaScript:

```ts
let result = initial

while (options.while(result)) {
  result = options.body(result)
}

return result
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initial` | `A` |
| `options` | `Object` |
| `options.body` | (`b`: `B`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options.while` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **iterate**\<`A`, `R`, `E`\>(`initial`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

The `Effect.iterate` function allows you to iterate with an effectful operation. It uses an effectful `body` operation to change the state during each iteration and continues the iteration as long as the `while` function evaluates to `true`:

```ts
Effect.iterate(initial, options: { while, body })
```

We can think of `Effect.iterate` as equivalent to a `while` loop in JavaScript:

```ts
let result = initial

while (options.while(result)) {
  result = options.body(result)
}

return result
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initial` | `A` |
| `options` | `Object` |
| `options.body` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options.while` | (`a`: `A`) => `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### loop

▸ **loop**\<`A`, `B`, `R`, `E`, `C`\>(`initial`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`[]\>

The `Effect.loop` function allows you to repeatedly change the state based on an `step` function until a condition given by the `while` function is evaluated to `true`:

```ts
Effect.loop(initial, options: { while, step, body })
```

It collects all intermediate states in an array and returns it as the final result.

We can think of Effect.loop as equivalent to a while loop in JavaScript:

```ts
let state = initial
const result = []

while (options.while(state)) {
  result.push(options.body(state))
  state = options.step(state)
}

return result
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `R` |
| `E` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initial` | `A` |
| `options` | `Object` |
| `options.body` | (`b`: `B`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`\> |
| `options.discard?` | ``false`` |
| `options.step` | (`b`: `B`) => `A` |
| `options.while` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`[]\>

**`Since`**

2.0.0

▸ **loop**\<`A`, `R`, `E`, `C`\>(`initial`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`[]\>

The `Effect.loop` function allows you to repeatedly change the state based on an `step` function until a condition given by the `while` function is evaluated to `true`:

```ts
Effect.loop(initial, options: { while, step, body })
```

It collects all intermediate states in an array and returns it as the final result.

We can think of Effect.loop as equivalent to a while loop in JavaScript:

```ts
let state = initial
const result = []

while (options.while(state)) {
  result.push(options.body(state))
  state = options.step(state)
}

return result
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initial` | `A` |
| `options` | `Object` |
| `options.body` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`\> |
| `options.discard?` | ``false`` |
| `options.step` | (`a`: `A`) => `A` |
| `options.while` | (`a`: `A`) => `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`[]\>

**`Since`**

2.0.0

▸ **loop**\<`A`, `B`, `R`, `E`, `C`\>(`initial`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

The `Effect.loop` function allows you to repeatedly change the state based on an `step` function until a condition given by the `while` function is evaluated to `true`:

```ts
Effect.loop(initial, options: { while, step, body })
```

It collects all intermediate states in an array and returns it as the final result.

We can think of Effect.loop as equivalent to a while loop in JavaScript:

```ts
let state = initial
const result = []

while (options.while(state)) {
  result.push(options.body(state))
  state = options.step(state)
}

return result
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `R` |
| `E` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initial` | `A` |
| `options` | `Object` |
| `options.body` | (`b`: `B`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`\> |
| `options.discard` | ``true`` |
| `options.step` | (`b`: `B`) => `A` |
| `options.while` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

**`Since`**

2.0.0

▸ **loop**\<`A`, `R`, `E`, `C`\>(`initial`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

The `Effect.loop` function allows you to repeatedly change the state based on an `step` function until a condition given by the `while` function is evaluated to `true`:

```ts
Effect.loop(initial, options: { while, step, body })
```

It collects all intermediate states in an array and returns it as the final result.

We can think of Effect.loop as equivalent to a while loop in JavaScript:

```ts
let state = initial
const result = []

while (options.while(state)) {
  result.push(options.body(state))
  state = options.step(state)
}

return result
```

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initial` | `A` |
| `options` | `Object` |
| `options.body` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `C`\> |
| `options.discard` | ``true`` |
| `options.step` | (`a`: `A`) => `A` |
| `options.while` | (`a`: `A`) => `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

**`Since`**

2.0.0

___

### repeat

▸ **repeat**\<`A`, `O`\>(`options`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `Out`\>  } ? `Out` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\>  } ? `B` : `A`\>

Returns a new effect that repeats this effect according to the specified
schedule or until the first failure. Scheduled recurrences are in addition
to the first execution, so that `io.repeat(Schedule.once)` yields an effect
that executes `io`, and then if that succeeds, executes `io` an additional
time.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | `A` |
| `O` | extends [`Options`](../interfaces/Effect.Repeat.Options.md)\<`A`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `O` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `Out`\>  } ? `Out` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\>  } ? `B` : `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `Out`\>  } ? `Out` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\>  } ? `B` : `A`\>

**`Since`**

2.0.0

▸ **repeat**\<`R1`, `A`, `A0`, `B`\>(`schedule`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `B`\>

Returns a new effect that repeats this effect according to the specified
schedule or until the first failure. Scheduled recurrences are in addition
to the first execution, so that `io.repeat(Schedule.once)` yields an effect
that executes `io`, and then if that succeeds, executes `io` an additional
time.

#### Type parameters

| Name |
| :------ |
| `R1` |
| `A` |
| `A0` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schedule` | `Schedule`\<`R1`, `A`, `B`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **repeat**\<`R`, `E`, `A`, `O`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `Out`\>  } ? `Out` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\>  } ? `B` : `A`\>

Returns a new effect that repeats this effect according to the specified
schedule or until the first failure. Scheduled recurrences are in addition
to the first execution, so that `io.repeat(Schedule.once)` yields an effect
that executes `io`, and then if that succeeds, executes `io` an additional
time.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `O` | extends [`Options`](../interfaces/Effect.Repeat.Options.md)\<`A`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `O` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule`\<`X`, `_I`, `_O`\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`X`, `_E`, `_A`\>  } ? `X` : `never`, `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`_R`, `X`, `_A`\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule`\<`_R`, `_I`, `Out`\>  } ? `Out` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\>  } ? `B` : `A`\>

**`Since`**

2.0.0

▸ **repeat**\<`R`, `E`, `A`, `A0`, `R1`, `B`\>(`self`, `schedule`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `B`\>

Returns a new effect that repeats this effect according to the specified
schedule or until the first failure. Scheduled recurrences are in addition
to the first execution, so that `io.repeat(Schedule.once)` yields an effect
that executes `io`, and then if that succeeds, executes `io` an additional
time.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `A0` |
| `R1` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `schedule` | `Schedule`\<`R1`, `A0`, `B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `B`\>

**`Since`**

2.0.0

___

### repeatN

▸ **repeatN**(`n`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns a new effect that repeats this effect the specified number of times
or until the first failure. Repeats are in addition to the first execution,
so that `io.repeatN(1)` yields an effect that executes `io`, and then if
that succeeds, executes `io` an additional time.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **repeatN**\<`R`, `E`, `A`\>(`self`, `n`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns a new effect that repeats this effect the specified number of times
or until the first failure. Repeats are in addition to the first execution,
so that `io.repeatN(1)` yields an effect that executes `io`, and then if
that succeeds, executes `io` an additional time.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `n` | `number` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### repeatOrElse

▸ **repeatOrElse**\<`R2`, `A`, `A0`, `B`, `E`, `R3`, `E2`\>(`schedule`, `orElse`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2`, `B`\>

Returns a new effect that repeats this effect according to the specified
schedule or until the first failure, at which point, the failure value and
schedule output are passed to the specified handler.

Scheduled recurrences are in addition to the first execution, so that
`pipe(effect, Effect.repeat(Schedule.once()))` yields an effect that executes
`effect`, and then if that succeeds, executes `effect` an additional time.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `A` |
| `A0` |
| `B` |
| `E` |
| `R3` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schedule` | `Schedule`\<`R2`, `A`, `B`\> |
| `orElse` | (`error`: `E`, `option`: [`Option`](O.md#option)\<`B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E2`, `B`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2`, `B`\>

**`Since`**

2.0.0

▸ **repeatOrElse**\<`R`, `E`, `A`, `A0`, `R2`, `B`, `R3`, `E2`\>(`self`, `schedule`, `orElse`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E2`, `B`\>

Returns a new effect that repeats this effect according to the specified
schedule or until the first failure, at which point, the failure value and
schedule output are passed to the specified handler.

Scheduled recurrences are in addition to the first execution, so that
`pipe(effect, Effect.repeat(Schedule.once()))` yields an effect that executes
`effect`, and then if that succeeds, executes `effect` an additional time.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `A0` |
| `R2` |
| `B` |
| `R3` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `schedule` | `Schedule`\<`R2`, `A0`, `B`\> |
| `orElse` | (`error`: `E`, `option`: [`Option`](O.md#option)\<`B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E2`, `B`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E2`, `B`\>

**`Since`**

2.0.0

___

### schedule

▸ **schedule**\<`R2`, `Out`\>(`schedule`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `Out`\>

Runs this effect according to the specified schedule.

See `scheduleFrom` for a variant that allows the schedule's decision to
depend on the result of this effect.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schedule` | `Schedule`\<`R2`, `unknown`, `Out`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `Out`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `Out`\>

**`Since`**

2.0.0

▸ **schedule**\<`R`, `E`, `A`, `R2`, `Out`\>(`self`, `schedule`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `Out`\>

Runs this effect according to the specified schedule.

See `scheduleFrom` for a variant that allows the schedule's decision to
depend on the result of this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `schedule` | `Schedule`\<`R2`, `unknown`, `Out`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `Out`\>

**`Since`**

2.0.0

___

### scheduleForked

▸ **scheduleForked**\<`R2`, `Out`\>(`schedule`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R2` \| `R`, `never`, `RuntimeFiber`\<`E`, `Out`\>\>

Runs this effect according to the specified schedule in a new fiber
attached to the current scope.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `schedule` | `Schedule`\<`R2`, `unknown`, `Out`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R2` \| `R`, `never`, `RuntimeFiber`\<`E`, `Out`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R2` \| `R`, `never`, `RuntimeFiber`\<`E`, `Out`\>\>

**`Since`**

2.0.0

▸ **scheduleForked**\<`R`, `E`, `A`, `R2`, `Out`\>(`self`, `schedule`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R` \| `R2`, `never`, `RuntimeFiber`\<`E`, `Out`\>\>

Runs this effect according to the specified schedule in a new fiber
attached to the current scope.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `schedule` | `Schedule`\<`R2`, `unknown`, `Out`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R` \| `R2`, `never`, `RuntimeFiber`\<`E`, `Out`\>\>

**`Since`**

2.0.0

___

### scheduleFrom

▸ **scheduleFrom**\<`R2`, `In`, `Out`\>(`initial`, `schedule`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `In`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `Out`\>

Runs this effect according to the specified schedule starting from the
specified input value.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `In` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initial` | `In` |
| `schedule` | `Schedule`\<`R2`, `In`, `Out`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `Out`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `In`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `Out`\>

**`Since`**

2.0.0

▸ **scheduleFrom**\<`R`, `E`, `In`, `R2`, `Out`\>(`self`, `initial`, `schedule`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `Out`\>

Runs this effect according to the specified schedule starting from the
specified input value.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `In` |
| `R2` |
| `Out` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `In`\> |
| `initial` | `In` |
| `schedule` | `Schedule`\<`R2`, `In`, `Out`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `Out`\>

**`Since`**

2.0.0

___

### whileLoop

▸ **whileLoop**\<`R`, `E`, `A`\>(`options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.body` | [`LazyArg`](../interfaces/F.LazyArg.md)\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `options.step` | (`a`: `A`) => `void` |
| `options.while` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`boolean`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `void`\>

**`Since`**

2.0.0

## requests &amp; batching

### blocked

▸ **blocked**\<`E`, `A`\>(`blockedRequests`, `_continue`): [`Blocked`](../interfaces/Effect.Blocked.md)\<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockedRequests` | `RequestBlock` |
| `_continue` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\> |

#### Returns

[`Blocked`](../interfaces/Effect.Blocked.md)\<`E`, `A`\>

**`Since`**

2.0.0

___

### cacheRequestResult

▸ **cacheRequestResult**\<`A`\>(`request`, `result`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Request`\<`any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `A` |
| `result` | `Result`\<`A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### request

▸ **request**\<`A`, `Ds`\>(`request`, `dataSource`): [`Effect`](../interfaces/Effect.Effect-1.md)\<[`Ds`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\>] ? [`Context`](Effect.Effect.md#context)\<`Ds`\> : `never`, `Error`\<`A`\>, `Success`\<`A`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Request`\<`any`, `any`\> |
| `Ds` | extends `RequestResolver`\<`A`, `never`\> \| [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `RequestResolver`\<`A`, `never`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `A` |
| `dataSource` | `Ds` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<[`Ds`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\>] ? [`Context`](Effect.Effect.md#context)\<`Ds`\> : `never`, `Error`\<`A`\>, `Success`\<`A`\>\>

**`Since`**

2.0.0

___

### runRequestBlock

▸ **runRequestBlock**\<`R`\>(`blockedRequests`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockedRequests` | `RequestBlock` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

**`Since`**

2.0.0

___

### step

▸ **step**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Exit`\<`E`, `A`\> \| [`Blocked`](../interfaces/Effect.Blocked.md)\<`E`, `A`\>\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Exit`\<`E`, `A`\> \| [`Blocked`](../interfaces/Effect.Blocked.md)\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### withRequestBatching

▸ **withRequestBatching**(`requestBatching`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestBatching` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withRequestBatching**\<`R`, `E`, `A`\>(`self`, `requestBatching`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `requestBatching` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withRequestCache

▸ **withRequestCache**(`cache`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | `Cache` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withRequestCache**\<`R`, `E`, `A`\>(`self`, `cache`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `cache` | `Cache` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withRequestCaching

▸ **withRequestCaching**(`strategy`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withRequestCaching**\<`R`, `E`, `A`\>(`self`, `strategy`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `strategy` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## runtime

### getRuntimeFlags

• `Const` **getRuntimeFlags**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `RuntimeFlags.RuntimeFlags`\>

Retrieves an effect that succeeds with the current runtime flags, which
govern behavior and features of the runtime system.

**`Since`**

2.0.0

___

### patchRuntimeFlags

▸ **patchRuntimeFlags**(`patch`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `patch` | `RuntimeFlagsPatch` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### runtime

▸ **runtime**\<`R`\>(): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Runtime`\<`R`\>\>

Returns an effect that accesses the runtime, which can be used to
(unsafely) execute tasks. This is useful for integration with legacy code
that must call back into Effect code.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Runtime`\<`R`\>\>

**`Since`**

2.0.0

___

### withRuntimeFlagsPatch

▸ **withRuntimeFlagsPatch**(`update`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `update` | `RuntimeFlagsPatch` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withRuntimeFlagsPatch**\<`R`, `E`, `A`\>(`self`, `update`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `update` | `RuntimeFlagsPatch` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withRuntimeFlagsPatchScoped

▸ **withRuntimeFlagsPatchScoped**(`update`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `update` | `RuntimeFlagsPatch` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

## scheduler

### withScheduler

▸ **withScheduler**(`scheduler`): \<R, E, B\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Sets the provided scheduler for usage in the wrapped effect

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheduler` | `Scheduler` |

#### Returns

`fn`

▸ \<`R`, `E`, `B`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **withScheduler**\<`R`, `E`, `B`\>(`self`, `scheduler`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Sets the provided scheduler for usage in the wrapped effect

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `scheduler` | `Scheduler` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

## scoping, resources &amp; finalization

### scope

• `Const` **scope**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope.Scope`, `never`, `Scope.Scope`\>

**`Since`**

2.0.0

___

### acquireRelease

▸ **acquireRelease**\<`A`, `R2`, `X`\>(`release`): \<R, E\>(`acquire`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R` \| `Scope`, `E`, `A`\>

This function constructs a scoped resource from an `acquire` and `release`
`Effect` value.

If the `acquire` `Effect` value successfully completes execution, then the
`release` `Effect` value will be added to the finalizers associated with the
scope of this `Effect` value, and it is guaranteed to be run when the scope
is closed.

The `acquire` and `release` `Effect` values will be run uninterruptibly.
Additionally, the `release` `Effect` value may depend on the `Exit` value
specified when the scope is closed.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `release` | (`a`: `A`, `exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> | The `Effect` value that releases the resource. |

#### Returns

`fn`

A new `Effect` value that represents the scoped resource.

▸ \<`R`, `E`\>(`acquire`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R` \| `Scope`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `acquire` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R` \| `Scope`, `E`, `A`\>

**`Since`**

2.0.0

▸ **acquireRelease**\<`R`, `E`, `A`, `R2`, `X`\>(`acquire`, `release`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `Scope`, `E`, `A`\>

This function constructs a scoped resource from an `acquire` and `release`
`Effect` value.

If the `acquire` `Effect` value successfully completes execution, then the
`release` `Effect` value will be added to the finalizers associated with the
scope of this `Effect` value, and it is guaranteed to be run when the scope
is closed.

The `acquire` and `release` `Effect` values will be run uninterruptibly.
Additionally, the `release` `Effect` value may depend on the `Exit` value
specified when the scope is closed.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `acquire` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | The `Effect` value that acquires the resource. |
| `release` | (`a`: `A`, `exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> | The `Effect` value that releases the resource. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `Scope`, `E`, `A`\>

A new `Effect` value that represents the scoped resource.

**`Since`**

2.0.0

___

### acquireReleaseInterruptible

▸ **acquireReleaseInterruptible**\<`A`, `R2`, `X`\>(`release`): \<R, E\>(`acquire`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R2` \| `R`, `E`, `A`\>

This function constructs a scoped resource from an `acquire` and `release`
`Effect` value.

If the `acquire` `Effect` value successfully completes execution, then the
`release` `Effect` value will be added to the finalizers associated with the
scope of this `Effect` value, and it is guaranteed to be run when the scope
is closed.

The `acquire` `Effect` values will be run interruptibly.
The `release` `Effect` values will be run uninterruptibly.

Additionally, the `release` `Effect` value may depend on the `Exit` value
specified when the scope is closed.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `release` | (`exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> | The `Effect` value that releases the resource. |

#### Returns

`fn`

A new `Effect` value that represents the scoped resource.

▸ \<`R`, `E`\>(`acquire`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R2` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `acquire` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R2` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **acquireReleaseInterruptible**\<`R`, `E`, `A`, `R2`, `X`\>(`acquire`, `release`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R` \| `R2`, `E`, `A`\>

This function constructs a scoped resource from an `acquire` and `release`
`Effect` value.

If the `acquire` `Effect` value successfully completes execution, then the
`release` `Effect` value will be added to the finalizers associated with the
scope of this `Effect` value, and it is guaranteed to be run when the scope
is closed.

The `acquire` `Effect` values will be run interruptibly.
The `release` `Effect` values will be run uninterruptibly.

Additionally, the `release` `Effect` value may depend on the `Exit` value
specified when the scope is closed.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `acquire` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | The `Effect` value that acquires the resource. |
| `release` | (`exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> | The `Effect` value that releases the resource. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R` \| `R2`, `E`, `A`\>

A new `Effect` value that represents the scoped resource.

**`Since`**

2.0.0

___

### acquireUseRelease

▸ **acquireUseRelease**\<`A`, `R2`, `E2`, `A2`, `R3`, `X`\>(`use`, `release`): \<R, E\>(`acquire`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E`, `A2`\>

This function is used to ensure that an `Effect` value that represents the
acquisition of a resource (for example, opening a file, launching a thread,
etc.) will not be interrupted, and that the resource will always be released
when the `Effect` value completes execution.

`acquireUseRelease` does the following:

  1. Ensures that the `Effect` value that acquires the resource will not be
     interrupted. Note that acquisition may still fail due to internal
     reasons (such as an uncaught exception).
  2. Ensures that the `release` `Effect` value will not be interrupted,
     and will be executed as long as the acquisition `Effect` value
     successfully acquires the resource.

During the time period between the acquisition and release of the resource,
the `use` `Effect` value will be executed.

If the `release` `Effect` value fails, then the entire `Effect` value will
fail, even if the `use` `Effect` value succeeds. If this fail-fast behavior
is not desired, errors produced by the `release` `Effect` value can be caught
and ignored.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R2` |
| `E2` |
| `A2` |
| `R3` |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `use` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> | The `Effect` value that is executed between the acquisition and release of the resource. |
| `release` | (`a`: `A`, `exit`: `Exit`\<`E2`, `A2`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `never`, `X`\> | The `Effect` value that releases the resource. |

#### Returns

`fn`

A new `Effect` value that represents the acquisition, use, and
release of the resource.

▸ \<`R`, `E`\>(`acquire`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E`, `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `acquire` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E2` \| `E`, `A2`\>

**`Since`**

2.0.0

▸ **acquireUseRelease**\<`R`, `E`, `A`, `R2`, `E2`, `A2`, `R3`, `X`\>(`acquire`, `use`, `release`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E` \| `E2`, `A2`\>

This function is used to ensure that an `Effect` value that represents the
acquisition of a resource (for example, opening a file, launching a thread,
etc.) will not be interrupted, and that the resource will always be released
when the `Effect` value completes execution.

`acquireUseRelease` does the following:

  1. Ensures that the `Effect` value that acquires the resource will not be
     interrupted. Note that acquisition may still fail due to internal
     reasons (such as an uncaught exception).
  2. Ensures that the `release` `Effect` value will not be interrupted,
     and will be executed as long as the acquisition `Effect` value
     successfully acquires the resource.

During the time period between the acquisition and release of the resource,
the `use` `Effect` value will be executed.

If the `release` `Effect` value fails, then the entire `Effect` value will
fail, even if the `use` `Effect` value succeeds. If this fail-fast behavior
is not desired, errors produced by the `release` `Effect` value can be caught
and ignored.

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
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `acquire` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | The `Effect` value that acquires the resource. |
| `use` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> | The `Effect` value that is executed between the acquisition and release of the resource. |
| `release` | (`a`: `A`, `exit`: `Exit`\<`E2`, `A2`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `never`, `X`\> | The `Effect` value that releases the resource. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E` \| `E2`, `A2`\>

A new `Effect` value that represents the acquisition, use, and
release of the resource.

**`Since`**

2.0.0

___

### addFinalizer

▸ **addFinalizer**\<`R`, `X`\>(`finalizer`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `never`, `void`\>

This function adds a finalizer to the scope of the calling `Effect` value.
The finalizer is guaranteed to be run when the scope is closed, and it may
depend on the `Exit` value that the scope is closed with.

#### Type parameters

| Name |
| :------ |
| `R` |
| `X` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `finalizer` | (`exit`: `Exit`\<`unknown`, `unknown`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `X`\> | The finalizer to add to the scope of the calling `Effect` value. This function must take an `Exit` value as its parameter, and return a new `Effect` value. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `never`, `void`\>

A new `Effect` value that represents the addition of the finalizer
to the scope of the calling `Effect` value.

**`Since`**

2.0.0

___

### ensuring

▸ **ensuring**\<`R1`, `X`\>(`finalizer`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

Returns an effect that, if this effect _starts_ execution, then the
specified `finalizer` is guaranteed to be executed, whether this effect
succeeds, fails, or is interrupted.

For use cases that need access to the effect's result, see `onExit`.

Finalizers offer very powerful guarantees, but they are low-level, and
should generally not be used for releasing resources. For higher-level
logic built on `ensuring`, see the `acquireRelease` family of methods.

#### Type parameters

| Name |
| :------ |
| `R1` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `finalizer` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `never`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **ensuring**\<`R`, `E`, `A`, `R1`, `X`\>(`self`, `finalizer`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `A`\>

Returns an effect that, if this effect _starts_ execution, then the
specified `finalizer` is guaranteed to be executed, whether this effect
succeeds, fails, or is interrupted.

For use cases that need access to the effect's result, see `onExit`.

Finalizers offer very powerful guarantees, but they are low-level, and
should generally not be used for releasing resources. For higher-level
logic built on `ensuring`, see the `acquireRelease` family of methods.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `finalizer` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `never`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `A`\>

**`Since`**

2.0.0

___

### finalizersMask

▸ **finalizersMask**(`strategy`): \<R, E, A\>(`self`: (`restore`: \<R1, E1, A1\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | `ExecutionStrategy` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | (`restore`: \<R1, E1, A1\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### onError

▸ **onError**\<`E`, `R2`, `X`\>(`cleanup`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

Runs the specified effect if this effect fails, providing the error to the
effect if it exists. The provided effect will not be interrupted.

#### Type parameters

| Name |
| :------ |
| `E` |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cleanup` | (`cause`: `Cause`\<`E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **onError**\<`R`, `A`, `E`, `R2`, `X`\>(`self`, `cleanup`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

Runs the specified effect if this effect fails, providing the error to the
effect if it exists. The provided effect will not be interrupted.

#### Type parameters

| Name |
| :------ |
| `R` |
| `A` |
| `E` |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `cleanup` | (`cause`: `Cause`\<`E`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

**`Since`**

2.0.0

___

### onExit

▸ **onExit**\<`E`, `A`, `R2`, `X`\>(`cleanup`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

Ensures that a cleanup functions runs, whether this effect succeeds, fails,
or is interrupted.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cleanup` | (`exit`: `Exit`\<`E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **onExit**\<`R`, `E`, `A`, `R2`, `X`\>(`self`, `cleanup`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

Ensures that a cleanup functions runs, whether this effect succeeds, fails,
or is interrupted.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `cleanup` | (`exit`: `Exit`\<`E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

**`Since`**

2.0.0

___

### parallelFinalizers

▸ **parallelFinalizers**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### scopeWith

▸ **scopeWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `E`, `A`\>

Accesses the current scope and uses it to perform the specified effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`scope`: `Scope`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

___

### scoped

▸ **scoped**\<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `A`\>

Scopes all resources uses in this workflow to the lifetime of the workflow,
ensuring that their finalizers are run as soon as this workflow completes
execution, whether by success, failure, or interruption.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `Scope`\>, `E`, `A`\>

**`Since`**

2.0.0

___

### sequentialFinalizers

▸ **sequentialFinalizers**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns a new scoped workflow that runs finalizers added to the scope of
this workflow sequentially in the reverse of the order in which they were
added. Note that finalizers are run sequentially by default so this only
has meaning if used within a scope where finalizers are being run in
parallel.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### using

▸ **using**\<`A`, `R2`, `E2`, `A2`\>(`use`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `Scope`\>, `E2` \| `E`, `A2`\>

Scopes all resources acquired by `resource` to the lifetime of `use`
without effecting the scope of any resources acquired by `use`.

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
| `use` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `Scope`\>, `E2` \| `E`, `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `Scope`\>, `E2` \| `E`, `A2`\>

**`Since`**

2.0.0

▸ **using**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `use`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `Scope`\>, `E` \| `E2`, `A2`\>

Scopes all resources acquired by `resource` to the lifetime of `use`
without effecting the scope of any resources acquired by `use`.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `use` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `Exclude`\<`R`, `Scope`\>, `E` \| `E2`, `A2`\>

**`Since`**

2.0.0

___

### withEarlyRelease

▸ **withEarlyRelease**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `E`, [[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>, `A`]\>

Returns a new scoped workflow that returns the result of this workflow as
well as a finalizer that can be run to close the scope of this workflow.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `E`, [[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>, `A`]\>

**`Since`**

2.0.0

## semaphore

### makeSemaphore

▸ **makeSemaphore**(`permits`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Semaphore`](../interfaces/Effect.Semaphore.md)\>

Creates a new Semaphore

#### Parameters

| Name | Type |
| :------ | :------ |
| `permits` | `number` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, [`Semaphore`](../interfaces/Effect.Semaphore.md)\>

**`Since`**

2.0.0

___

### unsafeMakeSemaphore

▸ **unsafeMakeSemaphore**(`permits`): [`Semaphore`](../interfaces/Effect.Semaphore.md)

Unsafely creates a new Semaphore

#### Parameters

| Name | Type |
| :------ | :------ |
| `permits` | `number` |

#### Returns

[`Semaphore`](../interfaces/Effect.Semaphore.md)

**`Since`**

2.0.0

## sequencing

### andThen

▸ **andThen**\<`A`, `X`\>(`f`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

Executes a sequence of two actions, typically two `Effect`s, where the second action can depend on the result of the first action.

The `that` action can take various forms:

- a value
- a function returning a value
- a promise
- a function returning a promise
- an effect
- a function returning an effect

#### Type parameters

| Name |
| :------ |
| `A` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `NoInfer`\<`A`\>) => `X` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

**`Example`**

```ts
import * as Effect from "effect/Effect"

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(1))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => s.length))), 2)

assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen(Promise.resolve(1)))), 1)
assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen((s) => Promise.resolve(s.length)))), 2)

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(Effect.succeed(1)))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => Effect.succeed(s.length)))), 2)
```

**`Since`**

2.0.0

▸ **andThen**\<`X`\>(`f`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

Executes a sequence of two actions, typically two `Effect`s, where the second action can depend on the result of the first action.

The `that` action can take various forms:

- a value
- a function returning a value
- a promise
- a function returning a promise
- an effect
- a function returning an effect

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `X` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

**`Example`**

```ts
import * as Effect from "effect/Effect"

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(1))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => s.length))), 2)

assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen(Promise.resolve(1)))), 1)
assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen((s) => Promise.resolve(s.length)))), 2)

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(Effect.succeed(1)))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => Effect.succeed(s.length)))), 2)
```

**`Since`**

2.0.0

▸ **andThen**\<`A`, `R`, `E`, `X`\>(`self`, `f`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

Executes a sequence of two actions, typically two `Effect`s, where the second action can depend on the result of the first action.

The `that` action can take various forms:

- a value
- a function returning a value
- a promise
- a function returning a promise
- an effect
- a function returning an effect

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`a`: `NoInfer`\<`A`\>) => `X` |

#### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

**`Example`**

```ts
import * as Effect from "effect/Effect"

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(1))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => s.length))), 2)

assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen(Promise.resolve(1)))), 1)
assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen((s) => Promise.resolve(s.length)))), 2)

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(Effect.succeed(1)))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => Effect.succeed(s.length)))), 2)
```

**`Since`**

2.0.0

▸ **andThen**\<`A`, `R`, `E`, `X`\>(`self`, `f`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

Executes a sequence of two actions, typically two `Effect`s, where the second action can depend on the result of the first action.

The `that` action can take various forms:

- a value
- a function returning a value
- a promise
- a function returning a promise
- an effect
- a function returning an effect

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | `X` |

#### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A1`\> : [`X`] extends [`Promise`\<`A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A1`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `X`\>

**`Example`**

```ts
import * as Effect from "effect/Effect"

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(1))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => s.length))), 2)

assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen(Promise.resolve(1)))), 1)
assert.deepStrictEqual(await Effect.runPromise(Effect.succeed("aa").pipe(Effect.andThen((s) => Promise.resolve(s.length)))), 2)

assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen(Effect.succeed(1)))), 1)
assert.deepStrictEqual(Effect.runSync(Effect.succeed("aa").pipe(Effect.andThen((s) => Effect.succeed(s.length)))), 2)
```

**`Since`**

2.0.0

___

### flatMap

▸ **flatMap**\<`A`, `R1`, `E1`, `B`\>(`f`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, `B`\>

This function is a pipeable operator that maps over an `Effect` value,
flattening the result of the mapping function into a new `Effect` value.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R1` |
| `E1` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `B`\> | The mapping function to apply to the `Effect` value. This function must return another `Effect` value. |

#### Returns

`fn`

A new `Effect` value that is the result of flattening the
mapped `Effect` value.

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, `B`\>

**`Since`**

2.0.0

▸ **flatMap**\<`R`, `E`, `A`, `R1`, `E1`, `B`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `B`\>

This function is a pipeable operator that maps over an `Effect` value,
flattening the result of the mapping function into a new `Effect` value.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `E1` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> | - |
| `f` | (`a`: `A`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `B`\> | The mapping function to apply to the `Effect` value. This function must return another `Effect` value. |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `B`\>

A new `Effect` value that is the result of flattening the
mapped `Effect` value.

**`Since`**

2.0.0

___

### flatten

▸ **flatten**\<`R`, `E`, `R1`, `E1`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\>

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

___

### race

▸ **race**\<`R2`, `E2`, `A2`\>(`that`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

Returns an effect that races this effect with the specified effect,
returning the first successful `A` from the faster side. If one effect
succeeds, the other will be interrupted. If neither succeeds, then the
effect will fail with some error.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **race**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `that`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Returns an effect that races this effect with the specified effect,
returning the first successful `A` from the faster side. If one effect
succeeds, the other will be interrupted. If neither succeeds, then the
effect will fail with some error.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### raceAll

▸ **raceAll**\<`R`, `E`, `A`\>(`effects`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns an effect that races this effect with all the specified effects,
yielding the value of the first effect to succeed with a value. Losers of
the race will be interrupted immediately

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effects` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### raceFirst

▸ **raceFirst**\<`R2`, `E2`, `A2`\>(`that`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

Returns an effect that races this effect with the specified effect,
yielding the first result to complete, whether by success or failure. If
neither effect completes, then the composed effect will not complete.

WARNING: The raced effect will safely interrupt the "loser", but will not
resume until the loser has been cleanly terminated. If early return is
desired, then instead of performing `l raceFirst r`, perform
`l.disconnect raceFirst r.disconnect`, which disconnects left and right
interrupt signal, allowing a fast return, with interruption performed
in the background.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2` \| `A`\>

**`Since`**

2.0.0

▸ **raceFirst**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `that`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

Returns an effect that races this effect with the specified effect,
yielding the first result to complete, whether by success or failure. If
neither effect completes, then the composed effect will not complete.

WARNING: The raced effect will safely interrupt the "loser", but will not
resume until the loser has been cleanly terminated. If early return is
desired, then instead of performing `l raceFirst r`, perform
`l.disconnect raceFirst r.disconnect`, which disconnects left and right
interrupt signal, allowing a fast return, with interruption performed
in the background.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A` \| `A2`\>

**`Since`**

2.0.0

___

### raceWith

▸ **raceWith**\<`E`, `A`, `R1`, `E1`, `A1`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`other`, `options`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

Returns an effect that races this effect with the specified effect, calling
the specified finisher as soon as one result or the other has been computed.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `R1` |
| `E1` |
| `A1` |
| `R2` |
| `E2` |
| `A2` |
| `R3` |
| `E3` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |
| `options` | `Object` |
| `options.onOtherDone` | (`exit`: `Exit`\<`E1`, `A1`\>, `fiber`: `Fiber`\<`E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `A3`\> |
| `options.onSelfDone` | (`exit`: `Exit`\<`E`, `A`\>, `fiber`: `Fiber`\<`E1`, `A1`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R2` \| `R3` \| `R`, `E2` \| `E3`, `A2` \| `A3`\>

**`Since`**

2.0.0

▸ **raceWith**\<`R`, `E`, `A`, `R1`, `E1`, `A1`, `R2`, `E2`, `A2`, `R3`, `E3`, `A3`\>(`self`, `other`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1` \| `R2` \| `R3`, `E2` \| `E3`, `A2` \| `A3`\>

Returns an effect that races this effect with the specified effect, calling
the specified finisher as soon as one result or the other has been computed.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `E1` |
| `A1` |
| `R2` |
| `E2` |
| `A2` |
| `R3` |
| `E3` |
| `A3` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `other` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |
| `options` | `Object` |
| `options.onOtherDone` | (`exit`: `Exit`\<`E1`, `A1`\>, `fiber`: `Fiber`\<`E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `A3`\> |
| `options.onSelfDone` | (`exit`: `Exit`\<`E`, `A`\>, `fiber`: `Fiber`\<`E1`, `A1`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1` \| `R2` \| `R3`, `E2` \| `E3`, `A2` \| `A3`\>

**`Since`**

2.0.0

___

### summarized

▸ **summarized**\<`R2`, `E2`, `B`, `C`\>(`summary`, `f`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`C`, `A`]\>

Summarizes a effect by computing some value before and after execution, and
then combining the values to produce a summary, together with the result of
execution.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `summary` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `B`\> |
| `f` | (`start`: `B`, `end`: `B`) => `C` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`C`, `A`]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`C`, `A`]\>

**`Since`**

2.0.0

▸ **summarized**\<`R`, `E`, `A`, `R2`, `E2`, `B`, `C`\>(`self`, `summary`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`C`, `A`]\>

Summarizes a effect by computing some value before and after execution, and
then combining the values to produce a summary, together with the result of
execution.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `summary` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `B`\> |
| `f` | (`start`: `B`, `end`: `B`) => `C` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`C`, `A`]\>

**`Since`**

2.0.0

___

### tap

▸ **tap**\<`A`, `X`\>(`f`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `NoInfer`\<`A`\>) => `X` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **tap**\<`X`\>(`f`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `X` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **tap**\<`A`, `R`, `E`, `X`\>(`self`, `f`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`a`: `NoInfer`\<`A`\>) => `X` |

#### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **tap**\<`A`, `R`, `E`, `X`\>(`self`, `f`): [`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `R` |
| `E` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | `X` |

#### Returns

[`X`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\> : [`X`] extends [`Promise`\<`_A1`\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `UnknownException` \| `E`, `A`\> : [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### tapBoth

▸ **tapBoth**\<`E`, `XE`, `A`, `XA`, `R2`, `E2`, `X`, `R3`, `E3`, `X1`\>(`options`): \<R\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E` \| `E2` \| `E3`, `A`\>

Returns an effect that effectfully "peeks" at the failure or success of
this effect.

#### Type parameters

| Name |
| :------ |
| `E` |
| `XE` |
| `A` |
| `XA` |
| `R2` |
| `E2` |
| `X` |
| `R3` |
| `E3` |
| `X1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onFailure` | (`e`: `XE`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |
| `options.onSuccess` | (`a`: `XA`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `X1`\> |

#### Returns

`fn`

▸ \<`R`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E` \| `E2` \| `E3`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R3` \| `R`, `E` \| `E2` \| `E3`, `A`\>

**`Since`**

2.0.0

▸ **tapBoth**\<`R`, `E`, `A`, `XE`, `XA`, `R2`, `E2`, `X`, `R3`, `E3`, `X1`\>(`self`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E` \| `E2` \| `E3`, `A`\>

Returns an effect that effectfully "peeks" at the failure or success of
this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `XE` |
| `XA` |
| `R2` |
| `E2` |
| `X` |
| `R3` |
| `E3` |
| `X1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `options` | `Object` |
| `options.onFailure` | (`e`: `XE`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |
| `options.onSuccess` | (`a`: `XA`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R3`, `E3`, `X1`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2` \| `R3`, `E` \| `E2` \| `E3`, `A`\>

**`Since`**

2.0.0

___

### tapDefect

▸ **tapDefect**\<`R2`, `E2`, `X`\>(`f`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

Returns an effect that effectually "peeks" at the defect of this effect.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`cause`: `Cause`\<`never`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **tapDefect**\<`R`, `E`, `A`, `R2`, `E2`, `X`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

Returns an effect that effectually "peeks" at the defect of this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`cause`: `Cause`\<`never`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

___

### tapError

▸ **tapError**\<`E`, `XE`, `R2`, `E2`, `X`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A`\>

Returns an effect that effectfully "peeks" at the failure of this effect.

#### Type parameters

| Name |
| :------ |
| `E` |
| `XE` |
| `R2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`e`: `XE`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

▸ **tapError**\<`R`, `E`, `XE`, `A`, `R2`, `E2`, `X`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

Returns an effect that effectfully "peeks" at the failure of this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `XE` |
| `A` |
| `R2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`e`: `XE`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

___

### tapErrorCause

▸ **tapErrorCause**\<`E`, `XE`, `R2`, `E2`, `X`\>(`f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A`\>

Returns an effect that effectually "peeks" at the cause of the failure of
this effect.

#### Type parameters

| Name |
| :------ |
| `E` |
| `XE` |
| `R2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`cause`: `Cause`\<`XE`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

▸ **tapErrorCause**\<`R`, `E`, `A`, `XE`, `R2`, `E2`, `X`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

Returns an effect that effectually "peeks" at the cause of the failure of
this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `XE` |
| `R2` |
| `E2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`cause`: `Cause`\<`XE`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

___

### tapErrorTag

▸ **tapErrorTag**\<`K`, `E`, `R1`, `E1`, `A1`\>(`k`, `f`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E` \| `E1`, `A`\>

Returns an effect that effectfully "peeks" at the specific tagged failure of this effect.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `E` | `E` |
| `R1` | `R1` |
| `E1` | `E1` |
| `A1` | `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `k` | `K` |
| `f` | (`e`: `Extract`\<`E`, \{ `_tag`: `K`  }\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E` \| `E1`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

▸ **tapErrorTag**\<`R`, `E`, `A`, `K`, `R1`, `E1`, `A1`\>(`self`, `k`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\>

Returns an effect that effectfully "peeks" at the specific tagged failure of this effect.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `K` | extends `string` |
| `R1` | `R1` |
| `E1` | `E1` |
| `A1` | `A1` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `k` | `K` |
| `f` | (`e`: `Extract`\<`E`, \{ `_tag`: `K`  }\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `A1`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `A`\>

**`Since`**

2.0.0

## supervision &amp; fibers

### descriptor

• `Const` **descriptor**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Fiber.Fiber.Descriptor`\>

Constructs an effect with information about the current `Fiber`.

**`Since`**

2.0.0

___

### fiberId

• `Const` **fiberId**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `FiberId.FiberId`\>

**`Since`**

2.0.0

___

### awaitAllChildren

▸ **awaitAllChildren**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns a new effect that will not succeed with its value before first
waiting for the end of all child fibers forked by the effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### daemonChildren

▸ **daemonChildren**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns a new workflow that will not supervise any fibers forked by this
workflow.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### descriptorWith

▸ **descriptorWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Constructs an effect based on information about the current `Fiber`.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`descriptor`: `Descriptor`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### diffFiberRefs

▸ **diffFiberRefs**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`FiberRefsPatch`, `A`]\>

Returns a new workflow that executes this one and captures the changes in
`FiberRef` values.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, [`FiberRefsPatch`, `A`]\>

**`Since`**

2.0.0

___

### ensuringChild

▸ **ensuringChild**\<`R2`, `X`\>(`f`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

Acts on the children of this fiber (collected into a single fiber),
guaranteeing the specified callback will be invoked, whether or not this
effect succeeds.

#### Type parameters

| Name |
| :------ |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`fiber`: `Fiber`\<`any`, readonly `unknown`[]\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **ensuringChild**\<`R`, `E`, `A`, `R2`, `X`\>(`self`, `f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

Acts on the children of this fiber (collected into a single fiber),
guaranteeing the specified callback will be invoked, whether or not this
effect succeeds.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `f` | (`fiber`: `Fiber`\<`any`, readonly `unknown`[]\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `never`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E`, `A`\>

**`Since`**

2.0.0

___

### ensuringChildren

▸ **ensuringChildren**\<`R1`, `X`\>(`children`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

Acts on the children of this fiber, guaranteeing the specified callback
will be invoked, whether or not this effect succeeds.

#### Type parameters

| Name |
| :------ |
| `R1` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `children` | (`fibers`: readonly `RuntimeFiber`\<`any`, `any`\>[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `never`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **ensuringChildren**\<`R`, `E`, `A`, `R1`, `X`\>(`self`, `children`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `A`\>

Acts on the children of this fiber, guaranteeing the specified callback
will be invoked, whether or not this effect succeeds.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `children` | (`fibers`: readonly `RuntimeFiber`\<`any`, `any`\>[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `never`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E`, `A`\>

**`Since`**

2.0.0

___

### fiberIdWith

▸ **fiberIdWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`descriptor`: `Runtime`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### fork

▸ **fork**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

Returns an effect that forks this effect into its own separate fiber,
returning the fiber immediately, without waiting for it to begin executing
the effect.

You can use the `fork` method whenever you want to execute an effect in a
new fiber, concurrently and without "blocking" the fiber executing other
effects. Using fibers can be tricky, so instead of using this method
directly, consider other higher-level methods, such as `raceWith`,
`zipPar`, and so forth.

The fiber returned by this method has methods to interrupt the fiber and to
wait for it to finish executing the effect. See `Fiber` for more
information.

Whenever you use this method to launch a new fiber, the new fiber is
attached to the parent fiber's scope. This means when the parent fiber
terminates, the child fiber will be terminated as well, ensuring that no
fibers leak. This behavior is called "auto supervision", and if this
behavior is not desired, you may use the `forkDaemon` or `forkIn` methods.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### forkAll

▸ **forkAll**(`options?`): \<R, E, A\>(`effects`: `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Fiber`\<`E`, `A`[]\>\>

Returns an effect that forks all of the specified values, and returns a
composite fiber that produces a list of their results, in order.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.discard?` | ``false`` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effects`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Fiber`\<`E`, `A`[]\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effects` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Fiber`\<`E`, `A`[]\>\>

**`Since`**

2.0.0

▸ **forkAll**(`options`): \<R, E, A\>(`effects`: `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

Returns an effect that forks all of the specified values, and returns a
composite fiber that produces a list of their results, in order.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.discard` | ``true`` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effects`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effects` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

**`Since`**

2.0.0

▸ **forkAll**\<`R`, `E`, `A`\>(`effects`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Fiber`\<`E`, `A`[]\>\>

Returns an effect that forks all of the specified values, and returns a
composite fiber that produces a list of their results, in order.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effects` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `options?` | `Object` |
| `options.discard?` | ``false`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `Fiber`\<`E`, `A`[]\>\>

**`Since`**

2.0.0

▸ **forkAll**\<`R`, `E`, `A`\>(`effects`, `options`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

Returns an effect that forks all of the specified values, and returns a
composite fiber that produces a list of their results, in order.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effects` | `Iterable`\<[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>\> |
| `options` | `Object` |
| `options.discard` | ``true`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `void`\>

**`Since`**

2.0.0

___

### forkDaemon

▸ **forkDaemon**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

Forks the effect into a new fiber attached to the global scope. Because the
new fiber is attached to the global scope, when the fiber executing the
returned effect terminates, the forked fiber will continue running.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### forkIn

▸ **forkIn**(`scope`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

Forks the effect in the specified scope. The fiber will be interrupted
when the scope is closed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Scope` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

**`Since`**

2.0.0

▸ **forkIn**\<`R`, `E`, `A`\>(`self`, `scope`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

Forks the effect in the specified scope. The fiber will be interrupted
when the scope is closed.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `scope` | `Scope` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### forkScoped

▸ **forkScoped**\<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

Forks the fiber in a `Scope`, interrupting it when the scope is closed.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### forkWithErrorHandler

▸ **forkWithErrorHandler**\<`E`, `X`\>(`handler`): \<R, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

Like fork but handles an error with the provided handler.

#### Type parameters

| Name |
| :------ |
| `E` |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`e`: `E`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `X`\> |

#### Returns

`fn`

▸ \<`R`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

**`Since`**

2.0.0

▸ **forkWithErrorHandler**\<`R`, `E`, `A`, `X`\>(`self`, `handler`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

Like fork but handles an error with the provided handler.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `handler` | (`e`: `E`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `never`, `RuntimeFiber`\<`E`, `A`\>\>

**`Since`**

2.0.0

___

### fromFiber

▸ **fromFiber**\<`E`, `A`\>(`fiber`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>

Creates an `Effect` value that represents the exit value of the specified
fiber.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fiber` | `Fiber`\<`E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `E`, `A`\>

**`Since`**

2.0.0

___

### fromFiberEffect

▸ **fromFiberEffect**\<`R`, `E`, `A`\>(`fiber`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Creates an `Effect` value that represents the exit value of the specified
fiber.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fiber` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `Fiber`\<`E`, `A`\>\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### supervised

▸ **supervised**\<`X`\>(`supervisor`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns an effect with the behavior of this one, but where all child fibers
forked in the effect are reported to the specified supervisor.

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `supervisor` | `Supervisor`\<`X`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **supervised**\<`R`, `E`, `A`, `X`\>(`self`, `supervisor`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Returns an effect with the behavior of this one, but where all child fibers
forked in the effect are reported to the specified supervisor.

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `supervisor` | `Supervisor`\<`X`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### transplant

▸ **transplant**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Transplants specified effects so that when those effects fork other
effects, the forked effects will be governed by the scope of the fiber that
executes this effect.

This can be used to "graft" deep grandchildren onto a higher-level scope,
effectively extending their lifespans into the parent scope.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`grafter`: \<R2, E2, A2\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withConcurrency

▸ **withConcurrency**(`concurrency`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concurrency` | `number` \| ``"unbounded"`` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withConcurrency**\<`R`, `E`, `A`\>(`self`, `concurrency`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `concurrency` | `number` \| ``"unbounded"`` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## symbols

### EffectTypeId

Ƭ **EffectTypeId**: typeof [`EffectTypeId`](Effect.md#effecttypeid-1)

**`Since`**

2.0.0

___

### EffectTypeId

• `Const` **EffectTypeId**: unique `symbol`

**`Since`**

2.0.0

## tracing

### currentParentSpan

• `Const` **currentParentSpan**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `Cause.NoSuchElementException`, `Tracer.ParentSpan`\>

**`Since`**

2.0.0

___

### currentSpan

• `Const` **currentSpan**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `Cause.NoSuchElementException`, `Tracer.Span`\>

**`Since`**

2.0.0

___

### spanAnnotations

• `Const` **spanAnnotations**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `HashMap.HashMap`\<`string`, `unknown`\>\>

**`Since`**

2.0.0

___

### spanLinks

• `Const` **spanLinks**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Chunk.Chunk`\<`Tracer.SpanLink`\>\>

**`Since`**

2.0.0

___

### tracer

• `Const` **tracer**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Tracer.Tracer`\>

**`Since`**

2.0.0

___

### annotateCurrentSpan

▸ **annotateCurrentSpan**(`key`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Adds an annotation to the current span if available

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

▸ **annotateCurrentSpan**(`values`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

Adds an annotation to the current span if available

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Record`\<`string`, `unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `void`\>

**`Since`**

2.0.0

___

### annotateSpans

▸ **annotateSpans**(`key`, `value`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Adds an annotation to each span in this effect.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **annotateSpans**(`values`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Adds an annotation to each span in this effect.

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Record`\<`string`, `unknown`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **annotateSpans**\<`R`, `E`, `A`\>(`effect`, `key`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Adds an annotation to each span in this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **annotateSpans**\<`R`, `E`, `A`\>(`effect`, `values`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Adds an annotation to each span in this effect.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `values` | `Record`\<`string`, `unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### linkSpans

▸ **linkSpans**(`span`, `attributes?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

For all spans in this effect, add a link with the provided span.

#### Parameters

| Name | Type |
| :------ | :------ |
| `span` | `ParentSpan` |
| `attributes?` | `Record`\<`string`, `unknown`\> |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **linkSpans**\<`R`, `E`, `A`\>(`self`, `span`, `attributes?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

For all spans in this effect, add a link with the provided span.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `span` | `ParentSpan` |
| `attributes?` | `Record`\<`string`, `unknown`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### makeSpan

▸ **makeSpan**(`name`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Span`\>

Create a new span for tracing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`never`, `never`, `Span`\>

**`Since`**

2.0.0

___

### makeSpanScoped

▸ **makeSpanScoped**(`name`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `Span`\>

Create a new span for tracing, and automatically close it when the Scope
finalizes.

The span is not added to the current span stack, so no child spans will be
created for it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `Span`\>

**`Since`**

2.0.0

___

### tracerWith

▸ **tracerWith**\<`R`, `E`, `A`\>(`f`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`tracer`: `Tracer`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### useSpan

▸ **useSpan**\<`R`, `E`, `A`\>(`name`, `evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Create a new span for tracing, and automatically close it when the effect
completes.

The span is not added to the current span stack, so no child spans will be
created for it.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `evaluate` | (`span`: `Span`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **useSpan**\<`R`, `E`, `A`\>(`name`, `options`, `evaluate`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

Create a new span for tracing, and automatically close it when the effect
completes.

The span is not added to the current span stack, so no child spans will be
created for it.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |
| `evaluate` | (`span`: `Span`) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withParentSpan

▸ **withParentSpan**(`span`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

Adds the provided span to the current span stack.

#### Parameters

| Name | Type |
| :------ | :------ |
| `span` | `ParentSpan` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **withParentSpan**\<`R`, `E`, `A`\>(`self`, `span`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

Adds the provided span to the current span stack.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `span` | `ParentSpan` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

___

### withSpan

▸ **withSpan**(`name`, `options?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

Wraps the effect with a new span for tracing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **withSpan**\<`R`, `E`, `A`\>(`self`, `name`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

Wraps the effect with a new span for tracing.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

___

### withSpanScoped

▸ **withSpanScoped**(`name`, `options?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

Wraps the effect with a new span for tracing.

The span is ended when the Scope is finalized.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

▸ **withSpanScoped**\<`R`, `E`, `A`\>(`self`, `name`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

Wraps the effect with a new span for tracing.

The span is ended when the Scope is finalized.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `name` | `string` |
| `options?` | `Object` |
| `options.attributes?` | `Record`\<`string`, `unknown`\> |
| `options.context?` | [`Context`](../interfaces/Context.Context.md)\<`never`\> |
| `options.links?` | readonly `SpanLink`[] |
| `options.parent?` | `ParentSpan` |
| `options.root?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope` \| `Exclude`\<`R`, `ParentSpan`\>, `E`, `A`\>

**`Since`**

2.0.0

___

### withTracer

▸ **withTracer**(`value`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Tracer` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withTracer**\<`R`, `E`, `A`\>(`effect`, `value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `value` | `Tracer` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

___

### withTracerScoped

▸ **withTracerScoped**(`value`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Tracer` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`Scope`, `never`, `void`\>

**`Since`**

2.0.0

___

### withTracerTiming

▸ **withTracerTiming**(`enabled`): \<R, E, A\>(`effect`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`effect`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

▸ **withTracerTiming**\<`R`, `E`, `A`\>(`effect`, `enabled`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `enabled` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>

**`Since`**

2.0.0

## unify

### unified

▸ **unified**\<`Ret`\>(`f`): [`Unify`](Effect.Effect.md#unify)\<`Ret`\>

Used to unify effects that would otherwise be `Effect<A, B, C> | Effect<D, E, F>`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ret` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | `Ret` |

#### Returns

[`Unify`](Effect.Effect.md#unify)\<`Ret`\>

**`Since`**

2.0.0

___

### unifiedFn

▸ **unifiedFn**\<`Args`, `Ret`\>(`f`): (...`args`: `Args`) => [`Unify`](Effect.Effect.md#unify)\<`Ret`\>

Used to unify functions that would otherwise return `Effect<A, B, C> | Effect<D, E, F>`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends readonly `any`[] |
| `Ret` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`args`: `Args`) => `Ret` |

#### Returns

`fn`

▸ (`...args`): [`Unify`](Effect.Effect.md#unify)\<`Ret`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

##### Returns

[`Unify`](Effect.Effect.md#unify)\<`Ret`\>

**`Since`**

2.0.0

## utils

### withMaxOpsBeforeYield

▸ **withMaxOpsBeforeYield**(`priority`): \<R, E, B\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Sets the maximum number of operations before yield by the default schedulers

#### Parameters

| Name | Type |
| :------ | :------ |
| `priority` | `number` |

#### Returns

`fn`

▸ \<`R`, `E`, `B`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **withMaxOpsBeforeYield**\<`R`, `E`, `B`\>(`self`, `priority`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Sets the maximum number of operations before yield by the default schedulers

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `priority` | `number` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

___

### withSchedulingPriority

▸ **withSchedulingPriority**(`priority`): \<R, E, B\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Sets the scheduling priority used when yielding

#### Parameters

| Name | Type |
| :------ | :------ |
| `priority` | `number` |

#### Returns

`fn`

▸ \<`R`, `E`, `B`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

▸ **withSchedulingPriority**\<`R`, `E`, `B`\>(`self`, `priority`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

Sets the scheduling priority used when yielding

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\> |
| `priority` | `number` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `B`\>

**`Since`**

2.0.0

## zipping

### validate

▸ **validate**\<`R1`, `E1`, `B`\>(`that`, `options?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, [`A`, `B`]\>

Sequentially zips the this result with the specified result. Combines both
`Cause`s when both effects fail.

#### Type parameters

| Name |
| :------ |
| `R1` |
| `E1` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, [`A`, `B`]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, [`A`, `B`]\>

**`Since`**

2.0.0

▸ **validate**\<`R`, `E`, `A`, `R1`, `E1`, `B`\>(`self`, `that`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, [`A`, `B`]\>

Sequentially zips the this result with the specified result. Combines both
`Cause`s when both effects fail.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `E1` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `B`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, [`A`, `B`]\>

**`Since`**

2.0.0

___

### validateWith

▸ **validateWith**\<`A`, `R1`, `E1`, `B`, `C`\>(`that`, `f`, `options?`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, `C`\>

Sequentially zips this effect with the specified effect using the specified
combiner function. Combines the causes in case both effect fail.

#### Type parameters

| Name |
| :------ |
| `A` |
| `R1` |
| `E1` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `B`\> |
| `f` | (`a`: `A`, `b`: `B`) => `C` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, `C`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R1` \| `R`, `E1` \| `E`, `C`\>

**`Since`**

2.0.0

▸ **validateWith**\<`R`, `E`, `A`, `R1`, `E1`, `B`, `C`\>(`self`, `that`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `C`\>

Sequentially zips this effect with the specified effect using the specified
combiner function. Combines the causes in case both effect fail.

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R1` |
| `E1` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R1`, `E1`, `B`\> |
| `f` | (`a`: `A`, `b`: `B`) => `C` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R1`, `E` \| `E1`, `C`\>

**`Since`**

2.0.0

___

### zip

▸ **zip**\<`R2`, `E2`, `A2`\>(`that`, `options?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`A`, `A2`]\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`A`, `A2`]\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, [`A`, `A2`]\>

**`Since`**

2.0.0

▸ **zip**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `that`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`A`, `A2`]\>

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, [`A`, `A2`]\>

**`Since`**

2.0.0

___

### zipLeft

▸ **zipLeft**\<`R2`, `E2`, `A2`\>(`that`, `options?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A`\>

**`Since`**

2.0.0

▸ **zipLeft**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `that`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A`\>

**`Since`**

2.0.0

___

### zipRight

▸ **zipRight**\<`R2`, `E2`, `A2`\>(`that`, `options?`): \<R, E, A\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `A2`\>

**`Since`**

2.0.0

▸ **zipRight**\<`R`, `E`, `A`, `R2`, `E2`, `A2`\>(`self`, `that`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A2`\>

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
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `A2`\>

**`Since`**

2.0.0

___

### zipWith

▸ **zipWith**\<`R2`, `E2`, `A2`, `A`, `B`\>(`that`, `f`, `options?`): \<R, E\>(`self`: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `R2` |
| `E2` |
| `A2` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `f` | (`a`: `A`, `b`: `A2`) => `B` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

`fn`

▸ \<`R`, `E`\>(`self`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R2` \| `R`, `E2` \| `E`, `B`\>

**`Since`**

2.0.0

▸ **zipWith**\<`R`, `E`, `A`, `R2`, `E2`, `A2`, `B`\>(`self`, `that`, `f`, `options?`): [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `B`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |
| `R2` |
| `E2` |
| `A2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `E`, `A`\> |
| `that` | [`Effect`](../interfaces/Effect.Effect-1.md)\<`R2`, `E2`, `A2`\> |
| `f` | (`a`: `A`, `b`: `A2`) => `B` |
| `options?` | `Object` |
| `options.batching?` | `boolean` \| ``"inherit"`` |
| `options.concurrent?` | `boolean` |

#### Returns

[`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `R2`, `E` \| `E2`, `B`\>

**`Since`**

2.0.0
