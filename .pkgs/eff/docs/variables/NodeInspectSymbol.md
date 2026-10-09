[@local/eff](../README.md) / NodeInspectSymbol

# Variable: NodeInspectSymbol

```ts
const NodeInspectSymbol: typeof NodeInspectSymbol;
```

Defines the symbol used by Node.js for custom object inspection.

**Details**

This symbol is recognized by Node.js's `util.inspect()` function and the REPL
for custom object representation. When an object has a method with this symbol,
it will be called to determine how the object should be displayed.

## Since

2.0.0
