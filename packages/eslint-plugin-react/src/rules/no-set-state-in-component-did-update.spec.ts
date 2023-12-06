import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-did-update";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
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
});
