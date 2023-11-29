# react/no-redundant-should-component-update

## Rule category

Correctness.

## What it does

Warns if you have `shouldComponentUpdate` defined when defining a class component that extends `React.PureComponent`.

## Why is this bad?

While having `shouldComponentUpdate` will still work, it becomes pointless to extend `React.PureComponent`.

## Examples

### ❌ Incorrect

```tsx
class Foo extends React.PureComponent {
  shouldComponentUpdate() {
    // do check
  }

  render() {
    return <div>Radical!</div>;
  }
}

function Bar() {
  return class Baz extends React.PureComponent {
    shouldComponentUpdate() {
      // do check
    }

    render() {
      return <div>Groovy!</div>;
    }
  };
}
```

### ✅ Correct

```tsx
class Foo extends React.Component {
  shouldComponentUpdate() {
    // do check
  }

  render() {
    return <div>Radical!</div>;
  }
}

function Bar() {
  return class Baz extends React.Component {
    shouldComponentUpdate() {
      // do check
    }

    render() {
      return <div>Groovy!</div>;
    }
  };
}

class Qux extends React.PureComponent {
  render() {
    return <div>Tubular!</div>;
  }
}
```
