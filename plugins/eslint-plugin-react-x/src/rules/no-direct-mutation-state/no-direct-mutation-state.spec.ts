import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-mutation-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Basic case - direct mutation in callback within constructor
    {
      code: tsx`
        class Hello extends React.Component {
          constructor(props) {
            super(props)

            // Assign at instance creation time, not on a callback
            doSomethingAsync(() => {
              this.state = 'bad';
            });
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Direct mutation in lifecycle method
    {
      code: tsx`
        class Hello extends React.Component {
          componentDidMount() {
            this.state = { foo: "bar" };
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Direct mutation in custom method
    {
      code: tsx`
        class Hello extends React.Component {
          handleClick() {
            this.state = { clicked: true };
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Direct mutation with complex assignment
    {
      code: tsx`
        class Hello extends React.Component {
          updateState() {
            this.state = { ...this.state, count: this.state.count + 1 };
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Direct mutation in arrow function property
    {
      code: tsx`
        class Hello extends React.Component {
          updateState = () => {
            this.state = { value: 123 };
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Direct mutation in conditional
    {
      code: tsx`
        class Hello extends React.Component {
          componentDidUpdate() {
            if (this.props.shouldReset) {
              this.state = { reset: true };
            }
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Direct mutation in event handler
    {
      code: tsx`
        class Hello extends React.Component {
          render() {
            return (
              <button onClick={() => {
                this.state = { clicked: true };
              }}>
                Click
              </button>
            );
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
  ],
  valid: [
    // Nested class component (mutation in inner class)
    tsx`
      class Foo extends React.Component {
        componentDidMount() {
          class Bar extends Baz {
            componentDidMount() {
              this.state = { foo: "bar" };
            }
          }
        }
      }
    `,
    // Constructor assignment (allowed)
    tsx`
      class Hello extends React.Component {
        constructor(props) {
          super(props)

          this.state = {
            foo: 'bar',
          }
        }
      }
    `,
    // Class property initialization (allowed)
    tsx`
      import React from "react";

      class MyComponent extends React.Component {
        state = {
          foo: "bar",
        };

        componentDidMount() {
          this.setState({ foo: "baz" });
        }

        render() {
          return <div>{this.state.foo}</div>;
        }
      }
    `,
    // Using setState instead of direct mutation
    tsx`
      class Hello extends React.Component {
        componentDidMount() {
          this.setState({ foo: "bar" });
        }
      }
    `,
    // Constructor with complex state initialization
    tsx`
      class Hello extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            count: 0,
            items: [],
            loading: false,
          };
        }
      }
    `,
    // Non-React class (should not be flagged)
    tsx`
      class RegularClass {
        constructor() {
          this.state = { value: 123 };
        }

        update() {
          this.state = { value: 456 };
        }
      }
    `,
    // State mutation in non-component class extending plain object
    tsx`
      class MyClass extends SomeBaseClass {
        update() {
          this.state = { updated: true };
        }
      }
    `,
    // Function component using useState
    tsx`
      function Hello() {
        const [state, setState] = useState({ foo: "bar" });
        return <div>{state.foo}</div>;
      }
    `,
    // Reading state (not mutating)
    tsx`
      class Hello extends React.Component {
        render() {
          return <div>{this.state.foo}</div>;
        }
      }
    `,
    // Using functional setState
    tsx`
      class Hello extends React.Component {
        increment() {
          this.setState(prevState => ({
            count: prevState.count + 1
          }));
        }
      }
    `,
    // Constructor with method call before assignment
    tsx`
      class Hello extends React.Component {
        constructor(props) {
          super(props);
          this.init();
          this.state = { initialized: true };
        }

        init() {
          // some initialization
        }
      }
    `,
  ],
});
