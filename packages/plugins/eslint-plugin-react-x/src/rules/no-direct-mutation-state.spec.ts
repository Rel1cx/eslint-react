import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-mutation-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
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
        messageId: "NO_DIRECT_MUTATION_STATE",
      }],
    },
  ],
  valid: [
    ...allValid,
    dedent`
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
    dedent`
      class Hello extends React.Component {
        constructor(props) {
          super(props)

          this.state = {
            foo: 'bar',
          }
        }
      }
    `,
    dedent`
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
