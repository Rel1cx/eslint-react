[@local/testkit](../README.md) / getFileExtension

# Function: getFileExtension()

```ts
function getFileExtension(filePath: string): string;
```

Extracts the extension (with leading dot) from a file path, used to build
the flat-config `files` pattern a filename requires. Returns an empty
string when the path has no extension.

## Parameters

| Parameter  | Type     |
| ---------- | -------- |
| `filePath` | `string` |

## Returns

`string`
