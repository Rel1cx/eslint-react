# no-redundant-should-component-update

## Rule category

Correctness.

## What it does

Prevents usage of `shouldComponentUpdate` when extending `React.PureComponent`.

## Why is this bad?

While having `shouldComponentUpdate` will still work, it becomes pointless to extend `React.PureComponent`.

## Examples

### Failing

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

### Passing

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
