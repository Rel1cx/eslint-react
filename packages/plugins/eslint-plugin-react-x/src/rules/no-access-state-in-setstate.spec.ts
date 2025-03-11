import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-access-state-in-setstate";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
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
          messageId: "noAccessStateInSetstate",
        },
      ],
    },
    {
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
          messageId: "noAccessStateInSetstate",
        },
      ],
    },
    {
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
          messageId: "noAccessStateInSetstate",
        },
      ],
    },
    {
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
          messageId: "noAccessStateInSetstate",
        },
      ],
    },
    {
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
          messageId: "noAccessStateInSetstate",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      class Component extends React.Component {
        state = {
          foo: 1,
        };
        render() {
          return <div />;
        }
      }
    `,
    tsx`
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
});
