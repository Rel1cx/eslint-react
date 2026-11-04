[@local/testkit](../README.md) / createTypeTestBed

# Function: createTypeTestBed()

```ts
function createTypeTestBed(files: Record<string, string>, options?: CompilerOptions): TypeTestBed;
```

Creates an in-memory TypeScript program from virtual source files and exposes its type checker.

## Parameters

| Parameter  | Type                                                                                                              | Description                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `files`    | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `string`\> | Virtual files keyed by absolute-ish path (ex: `{ "/fixture.ts": "declare const x: string;" }`).     |
| `options?` | `CompilerOptions`                                                                                                 | Extra compiler options overriding the defaults (`strict`, `noLib`, ESNext target/module, `noEmit`). |

## Returns

[`TypeTestBed`](../interfaces/TypeTestBed.md)

The test bed for resolving types and symbols by declaration name.

## Remarks

The default libs are skipped (`noLib`) so program creation stays cheap; intrinsic types
(ex: `string`, `boolean`, literal types) still resolve without them, but globals declared by
lib files (ex: `Array`, `Promise`) are unavailable in the virtual sources.
