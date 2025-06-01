---
title: jsx-no-iife
---

<Callout type="warning">This rule is experimental and may change in the future or be removed. It is not recommended to use it in production code at this time.</Callout>

**Full Name in `eslint-plugin-react-x@beta`**

```sh copy
react-x/jsx-no-iife
```

**Full Name in `@eslint-react/eslint-plugin@beta`**

```sh copy
@eslint-react/jsx-no-iife
```

**Features**

`🧪`

## Description

Disallows `IIFE` in JSX elements.

Technically, this is valid JS, but it is not conventional inside React components. `IIFE` in JSX may be hard to follow and they will probably not optimized by [React Compiler](https://react.dev/learn/react-compiler), which means slower app rendering.

## Examples

### Failing

```tsx
function MyComponent() {
  // hooks etc

  return (
    <SomeJsx>
      <SomeMoreJsx />

      {(() => {
        const filteredThings = things.filter(callback);

        if (filteredThings.length === 0) {
          return <Empty />;
        }

        return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
      })()}

      <SomeMoreJsx />
    </SomeJsx>
  );
}
```

### Passing

```tsx
function MyComponent() {
  // hooks etc

  const thingsList = things.filter(callback);

  return (
    <SomeJsx>
      <SomeMoreJsx />
      {thingsList.length === 0
        ? <Empty />
        : thingsList.map((thing) => <Thing key={thing.id} data={thing} />)}
      <SomeMoreJsx />
    </SomeJsx>
  );
}
```

```tsx
function MyComponent() {
  // hooks etc

  const thingsList = useMemo(() => things.filter(callback), [things, callback]);

  return (
    <SomeJsx>
      <SomeMoreJsx />
      {thingsList.length === 0
        ? <Empty />
        : thingsList.map((thing) => <Thing key={thing.id} data={thing} />)}
      <SomeMoreJsx />
    </SomeJsx>
  );
}
```

```tsx
function MyComponent() {
  // hooks etc

  const thingsList = useMemo(() => {
    const filteredThings = things.filter(callback);

    if (filteredThings.length === 0) {
      return <Empty />;
    }

    return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
  }, [things, callback]);

  return (
    <SomeJsx>
      <SomeMoreJsx />
      {thingsList}
      <SomeMoreJsx />
    </SomeJsx>
  );
}
```

### Passing But Not Recommended

```tsx
function MyComponent() {
  // hooks etc

  const thingsList = (() => {
    const filteredThings = things.filter(callback);

    if (filteredThings.length === 0) {
      return <Empty />;
    }

    return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
  })();

  return (
    <SomeJsx>
      <SomeMoreJsx />
      {thingsList}
      <SomeMoreJsx />
    </SomeJsx>
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-no-iife.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-no-iife.spec.ts)
