[@local/testkit](../README.md) / fixturePath

# Function: fixturePath()

```ts
function fixturePath(name: string): string;
```

Resolve a named fixture file under the fixtures root directory.
The file's name drives parser inference (e.g. a `.ts` name disables JSX);
its content is irrelevant and never read.

## Parameters

| Parameter | Type     | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| `name`    | `string` | The fixture file name, e.g. `"file.ts"` or `"estree.tsx"` |

## Returns

`string`

The absolute path to the fixture file
