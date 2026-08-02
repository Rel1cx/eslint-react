import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-access-state-in-setstate";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "state access in setState object argument",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "state access in setState updater argument",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "state access via index signature in setState object argument",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "state access via index signature in setState updater argument",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      name: "state access with increment in setState object argument",
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    {
      name: "setState without state access",
      code: tsx`
        class Component extends React.Component {
          state = {
            foo: 1,
          };
          render() {
            return <div onClick={() => this.setState({ foo: 2 })} />;
          }
        }
      `,
    },
    {
      name: "no setState call",
      code: tsx`
        class Component extends React.Component {
          state = {
            foo: 1,
          };
          render() {
            return <div />;
          }
        }
      `,
    },
  ],
});
