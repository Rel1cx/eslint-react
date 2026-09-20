[@eslint-react/var](../README.md) / createImportLookup

# Function: createImportLookup()

```ts
function createImportLookup(program: Program, options: ImportLookupOptions): ImportLookup;
```

Create a lookup of local import bindings from a source by scanning the
top-level imports of a program.

Entries are kept in source order with both indexes (by local name, by imported
name) built during the scan, so every query works immediately. Aliases
(`import { flushSync as fs }`) are handled naturally.

## Parameters

| Parameter | Type                                                          |
| --------- | ------------------------------------------------------------- |
| `program` | `Program`                                                     |
| `options` | [`ImportLookupOptions`](../interfaces/ImportLookupOptions.md) |

## Returns

[`ImportLookup`](../interfaces/ImportLookup.md)

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
