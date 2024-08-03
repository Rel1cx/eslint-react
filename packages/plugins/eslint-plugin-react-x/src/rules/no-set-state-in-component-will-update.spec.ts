import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        class Foo extends React.Component {
          componentWillUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "noSetStateInComponentWillUpdate" },
      ],
    },
    {
      code: /* tsx */ `
        const Foo = class extends React.Component {
          componentWillUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "noSetStateInComponentWillUpdate" },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
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
