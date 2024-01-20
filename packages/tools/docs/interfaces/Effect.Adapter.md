[@eslint-react/tools](../README.md) / [Effect](../modules/Effect.md) / Adapter

# Interface: Adapter

[Effect](../modules/Effect.md).Adapter

**`Since`**

2.0.0

## Callable

### Adapter

▸ **Adapter**\<`R`, `E`, `A`\>(`self`): [`EffectGen`](Effect.EffectGen.md)\<`R`, `E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`R`, `E`, `A`\>

### Adapter

▸ **Adapter**\<`A`, `_R`, `_E`, `_A`\>(`a`, `ab`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`g`: `H`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |
| `qr` | (`q`: `Q`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |
| `qr` | (`q`: `Q`) => `R` |
| `rs` | (`r`: `R`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |
| `qr` | (`q`: `Q`) => `R` |
| `rs` | (`r`: `R`) => `S` |
| `st` | (`s`: `S`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

### Adapter

▸ **Adapter**\<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `_R`, `_E`, `_A`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`, `tu`): [`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |
| `T` |
| `_R` |
| `_E` |
| `_A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |
| `qr` | (`q`: `Q`) => `R` |
| `rs` | (`r`: `R`) => `S` |
| `st` | (`s`: `S`) => `T` |
| `tu` | (`s`: `T`) => [`Effect`](Effect.Effect-1.md)\<`_R`, `_E`, `_A`\> |

#### Returns

[`EffectGen`](Effect.EffectGen.md)\<`_R`, `_E`, `_A`\>
