[@eslint-react/var](../README.md) / createImportLookup

# Function: createImportLookup()

```ts
function createImportLookup(program: Program, options: ImportLookupOptions): ImportLookup;
```

Create a lookup of local import bindings from a source by scanning the
top-level imports of a program.

Entries are kept in source order, and both indexes (by local name and by
imported name) are built during the same scan, so every query works
immediately after creation. Aliases (`import { flushSync as fs }`) are
handled naturally: the alias is the entry's local name.

## Parameters

| Parameter | Type                                                          | Description                                              |
| --------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| `program` | `Program`                                                     | The program whose top-level import declarations to scan. |
| `options` | [`ImportLookupOptions`](../interfaces/ImportLookupOptions.md) | The source to track and optional builtin namespaces.     |

## Returns

[`ImportLookup`](../interfaces/ImportLookup.md)

An [ImportLookup](../interfaces/ImportLookup.md) over the matching import bindings.

## Example

```typescript
const imports = createImportLookup(context.sourceCode.ast, { source: "react-dom" });
return {
  CallExpression(node) {
    const callee = Extract.unwrap(node.callee);
    if (Check.isIdentifier(callee) && imports.has(callee.name, "flushSync")) {
      // ...
    }
  },
};
```
