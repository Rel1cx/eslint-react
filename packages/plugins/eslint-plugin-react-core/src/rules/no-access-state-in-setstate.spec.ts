import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-access-state-in-setstate";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      class Component extends React.Component {
        state = {
          foo: 1,
        };
        render() {
          return <div />;
        }
      }
    `,
    dedent`
      class Component extends React.Component {
        state = {
          foo: 1,
        };
        render() {
          return <div onClick={() => this.setState({ foo: 2 })} />;
        }
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        class Component extends React.Component {
          state = {
            foo: 1,
          };
          render() {
            return <div onClick={() => this.setState({ foo: this.state.foo + 1 })} />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_ACCESS_STATE_IN_SETSTATE",
        },
      ],
    },
    {
      code: dedent`
        class Component extends React.Component {
          state = {
            foo: 1,
          };
          render() {
            return <div onClick={() => this.setState({ foo: this.state["foo"] + 1 })} />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_ACCESS_STATE_IN_SETSTATE",
        },
      ],
    },
    {
      code: dedent`
        class Component extends React.Component {
          state = {
            foo: 1,
          };
          render() {
            return <div onClick={() => this.setState({ foo: this.state.foo++ })} />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_ACCESS_STATE_IN_SETSTATE",
        },
      ],
    },
    {
      code: dedent`
        class Component extends React.Component {
          state = {
            foo: 1,
          };
          render() {
            return <div onClick={() => this.setState(() => ({ foo: this.state.foo + 1 }))} />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_ACCESS_STATE_IN_SETSTATE",
        },
      ],
    },
    {
      code: dedent`
        class Component extends React.Component {
          state = {
            foo: 1,
          };
          render() {
            return <div onClick={() => this.setState(() => ({ foo: this.state["foo"] + 1 }))} />;
          }
        }
      `,
      errors: [
        {
          messageId: "NO_ACCESS_STATE_IN_SETSTATE",
        },
      ],
    },
  ],
});
