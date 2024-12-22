# no-context-provider

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-context-provider
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-context-provider
```

**Features**

`🔍` `🔄`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-context-provider.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-context-provider.spec.ts)

## What it does

Disallows using `<Context.Provider>`.

In React 19, you can render `<Context>` as a provider instead of `<Context.Provider>`.

## Examples

### Failing

```tsx
const ThemeContext = createContext("");

function App({ children }) {
  return (
    <ThemeContext.Provider value="light">
      {children}
    </ThemeContext.Provider>
  );
}
```

### Passing

```tsx
const ThemeContext = createContext("");

function App({ children }) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );
}
```

## Further Reading

- [React: `<Context>` as a provider](https://react.dev/blog/2024/12/05/react-19#context-as-a-provider)
