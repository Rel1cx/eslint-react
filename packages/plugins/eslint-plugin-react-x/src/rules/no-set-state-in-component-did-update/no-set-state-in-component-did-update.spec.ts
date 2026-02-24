import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-did-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const Foo = class extends React.Component {
          componentDidUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          class Bar extends Baz {
            componentDidUpdate() {
              this.setState({ foo: "bar" });
            }
          }
        }
      }
    `,
  ],
});
