import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
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
          componentWillUpdate() {
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
      componentWillUpdate() {
                class Bar extends Baz {
                  componentWillUpdate() {
                    this.setState({ foo: "bar" });
                  }
                }
              }
            }
    `,
  ],
});
