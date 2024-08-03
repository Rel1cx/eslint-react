import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-mutation-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
        messageId: "noDirectMutationState",
      }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
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
    /* tsx */ `
      class Hello extends React.Component {
        constructor(props) {
          super(props)

          this.state = {
            foo: 'bar',
          }
        }
      }
    `,
    /* tsx */ `
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
  ],
});
