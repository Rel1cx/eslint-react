import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-did-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        class Foo extends React.Component {
          componentDidUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "NO_SET_STATE_IN_COMPONENT_DID_UPDATE" },
      ],
    },
    {
      code: /* tsx */ `
        const Foo = class extends React.Component {
          componentDidUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "NO_SET_STATE_IN_COMPONENT_DID_UPDATE" },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
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
