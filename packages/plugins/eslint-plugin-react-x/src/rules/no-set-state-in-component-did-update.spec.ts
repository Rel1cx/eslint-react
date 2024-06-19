import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-did-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
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
      code: dedent`
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
    dedent`
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
