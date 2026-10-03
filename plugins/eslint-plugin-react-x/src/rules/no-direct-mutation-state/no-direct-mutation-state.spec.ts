import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-direct-mutation-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "Direct mutation in lifecycle method",
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
    {
      name: "Direct mutation in custom method",
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
    {
      name: "Direct mutation in event handler",
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
    {
      name: "Direct mutation in arrow function property",
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
    {
      name: "Direct mutation in conditional",
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
    {
      name: "Direct mutation with complex assignment",
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
    {
      name: "Direct mutation of nested state property in event handler",
      code: tsx`
        class Hello extends React.Component {
          render() {
            return (
              <button onClick={() => {
                this.state.foo = 'baz';
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
    {
      name: "Direct mutation of deeply nested state property",
      code: tsx`
        class Hello extends React.Component {
          updateState() {
            this.state.foo.bar = 'baz';
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      name: "Direct mutation in callback within constructor",
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
    {
      name: "Direct mutation of nested state property in callback within constructor",
      code: tsx`
        class Hello extends React.Component {
          constructor(props) {
            super(props)

            doSomethingAsync(() => {
              this.state.foo = 'baz';
            });
          }
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Ported from https://github.com/oxc-project/oxc/issues/25625
    // oxlint's native rule only reported the two static chains; upstream
    // eslint-plugin-react reports all five assignments including the computed ones
    {
      name: "Direct mutation via computed member access in assignment target",
      code: tsx`
        import { Component } from 'react';

        class Example extends Component {
          a() {
            this.state.x = 1;
          }
          b() {
            this.state.x.y = 1;
          }
          c(id) {
            this.state.x[id] = 1;
          }
          d(id) {
            this.state.x[id].y = 1;
          }
          e(id) {
            this.state.items[id].prop = {};
          }
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    {
      name: "Constructor assignment",
      code: tsx`
        class Hello extends React.Component {
          constructor(props) {
            super(props)

            this.state = {
              foo: 'bar',
            }
          }
        }
      `,
    },
    {
      name: "Using setState instead of direct mutation",
      code: tsx`
        class Hello extends React.Component {
          componentDidMount() {
            this.setState({ foo: "bar" });
          }
        }
      `,
    },
    {
      name: "Class property initialization",
      code: tsx`
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
    },
    {
      name: "Reading state without mutating",
      code: tsx`
        class Hello extends React.Component {
          render() {
            return <div>{this.state.foo}</div>;
          }
        }
      `,
    },
    {
      name: "Using functional setState",
      code: tsx`
        class Hello extends React.Component {
          increment() {
            this.setState(prevState => ({
              count: prevState.count + 1
            }));
          }
        }
      `,
    },
    {
      name: "Function component using useState",
      code: tsx`
        function Hello() {
          const [state, setState] = useState({ foo: "bar" });
          return <div>{state.foo}</div>;
        }
      `,
    },
    {
      name: "Constructor with complex state initialization",
      code: tsx`
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
    },
    {
      name: "Constructor nested property assignment",
      code: tsx`
        class Hello extends React.Component {
          constructor(props) {
            super(props)

            this.state.foo = 'bar';
          }
        }
      `,
    },
    {
      name: "Constructor with method call before assignment",
      code: tsx`
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
    },
    {
      name: "Non-React class",
      code: tsx`
        class RegularClass {
          constructor() {
            this.state = { value: 123 };
          }

          update() {
            this.state = { value: 456 };
          }
        }
      `,
    },
    {
      name: "State mutation in non-component class extending plain object",
      code: tsx`
        class MyClass extends SomeBaseClass {
          update() {
            this.state = { updated: true };
          }
        }
      `,
    },
    {
      name: "Nested class component with mutation in inner class",
      code: tsx`
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
    },
  ],
});
