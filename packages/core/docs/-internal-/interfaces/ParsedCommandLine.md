[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ParsedCommandLine

# Interface: ParsedCommandLine

Either a parsed command line or a parsed tsconfig.json

## Properties

### compileOnSave?

> `optional` **compileOnSave**: `boolean`

***

### errors

> **errors**: [`Diagnostic`](Diagnostic.md)[]

***

### fileNames

> **fileNames**: `string`[]

***

### options

> **options**: [`CompilerOptions`](CompilerOptions.md)

***

### projectReferences?

> `optional` **projectReferences**: readonly [`ProjectReference`](ProjectReference.md)[]

***

### raw?

> `optional` **raw**: `any`

***

### typeAcquisition?

> `optional` **typeAcquisition**: [`TypeAcquisition`](TypeAcquisition.md)

***

### watchOptions?

> `optional` **watchOptions**: [`WatchOptions`](WatchOptions.md)

***

### wildcardDirectories?

> `optional` **wildcardDirectories**: [`MapLike`](MapLike.md)\<[`WatchDirectoryFlags`](../enumerations/WatchDirectoryFlags.md)\>
