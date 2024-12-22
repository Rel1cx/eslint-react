# no-leaked-event-listener

**Full Name in `eslint-plugin-react-web-api`**

```plain copy
react-web-api/no-leaked-event-listener
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/web-api/no-leaked-event-listener
```

**Features**

`🔍`

**Presets**

- `web-api`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Enforces that every `addEventListener` in a component or custom hook has a corresponding `removeEventListener`.

## Why is this bad?

Adding an event listener without removing it can lead to memory leaks and unexpected behavior. This is because the event listener will continue to exist even after the component or hook is unmounted.

## Examples

### Failing

```tsx
import React, { Component } from "react";

class Example extends Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
    //                                 ^^^^^^^^^^^^^^^^
    //                                 - A 'addEventListener' in 'componentDidMount' should have a corresponding 'removeEventListener' in 'componentWillUnmount' method.
  }

  handleClick() {
    console.log("clicked");
  }

  render() {
    return null;
  }
}
```

```tsx
import React, { useEffect } from "react";

function Example() {
  useEffect(() => {
    const handleClick = () => {
      console.log("clicked");
    };

    document.addEventListener("click", handleClick);
    //                                 ^^^^^^^^^^^
    //                                 - A 'addEventListener' in 'useEffect' should have a corresponding 'removeEventListener' in its cleanup function.
  }, []);

  return null;
}
```

```tsx
import React, { useEffect } from "react";

function Example() {
  useEffect(() => {
    document.addEventListener("click", () => console.log("clicked"));
    //                                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //                                 - A 'addEventListener' should not have an inline listener function.
  }, []);

  return null;
}
```

```tsx
import React, { useEffect } from "react";

function Example() {
  useEffect(() => {
    const handleClick = () => {
      console.log("clicked");
    };

    document.addEventListener("click", handleClick, { capture: true });
    //                                 ^^^^^^^^^^^
    //                                 - A 'addEventListener' in 'useEffect' should have a corresponding 'removeEventListener' in its cleanup function.

    return () => {
      document.removeEventListener("click", handleClick, { capture: false });
    };
  }, []);

  return null;
}
```

```tsx
function useCustomHook() {
  useEffect(() => {
    const handleClick = () => {
      console.log("clicked");
    };

    document.addEventListener("click", handleClick);
    //                                 ^^^^^^^^^^^^
    //                                 - A 'addEventListener' in 'useEffect' should have a corresponding 'removeEventListener' in its cleanup function.
  }, []);
}
```

### Passing

```tsx
import React, { Component } from "react";

class Example extends Component {
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  handleClick() {
    console.log("clicked");
  }

  render() {
    return null;
  }
}
```

```tsx
import React, { useEffect } from "react";

function Example() {
  useEffect(() => {
    const handleClick = () => {
      console.log("clicked");
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
```

```tsx
import React, { useEffect } from "react";

function Example() {
  useEffect(() => {
    const handleClick = () => {
      console.log("clicked");
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
```

```tsx
import { useEffect } from "react";

function Example() {
  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    const handleActivity = () => {};

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  return null;
}
```

```tsx
import { useEffect } from "react";

function Example() {
  useEffect(() => {
    const events = [
      ["mousemove", () => {}],
      ["mousedown", () => {}],
    ];

    for (const [event, handler] of events) {
      window.addEventListener(event, handler);
    }

    return () => {
      for (const [event, handler] of events) {
        window.removeEventListener(event, handler);
      }
    };
  }, []);

  return null;
}
```

```tsx
function useCustomHook() {
  useEffect(() => {
    const handleClick = () => {
      console.log("clicked");
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}
```

## Further Reading

- [MDN: EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN: EventTarget.removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- [React: Subscribing to events](https://react.dev/learn/synchronizing-with-effects#subscribing-to-events)
- [React: Connecting to an external system](https://react.dev/reference/react/useEffect#connecting-to-an-external-system)
