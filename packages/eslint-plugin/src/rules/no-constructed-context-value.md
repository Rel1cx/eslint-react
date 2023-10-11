# @eslint-react/no-constructed-context-value

Prevents non-stable values (i.e. object identities) from being used as a value for Context.Provider.

## Rule details

This rule aims to prevent non-stable values (i.e. object identities) from being used as a value for Context.Provider. This is because React will re-render all consumers of a context whenever the context value changes, and if the value is not stable, this can lead to unnecessary re-renders.

### ❌ Incorrect

```tsx
const ExampleContext = React.createContext({});

const ExampleProvider = () => {
    return (
        <ExampleContext.Provider value={{ foo: "bar" }}>
            <ExampleConsumer />
        </ExampleContext.Provider>
    );
};
```

### ✅ Correct

```tsx
const ExampleContext = React.createContext({});

const ExampleProvider = () => {
    const value = useMemo(() => ({ foo: "bar" }), []);

    return (
        <ExampleContext.Provider value={value}>
            <ExampleConsumer />
        </ExampleContext.Provider>
    );
};
```

## Legitimate Uses

React Context, and all its child nodes and Consumers are rerendered whenever the value prop changes. Because each Javascript object carries its own identity, things like object expressions ({foo: 'bar'}) or function expressions get a new identity on every run through the component. This makes the context think it has gotten a new object and can cause needless rerenders and unintended consequences.

This can be a pretty large performance hit because not only will it cause the context providers and consumers to rerender with all the elements in its subtree, the processing for the tree scan react does to render the provider and find consumers is also wasted.
