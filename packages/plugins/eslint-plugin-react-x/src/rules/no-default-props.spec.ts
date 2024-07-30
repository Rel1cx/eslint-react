import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-default-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function App() {
            return <div />
        }
        App.defaultProps = {};
      `,
      errors: [{ messageId: "NO_DEFAULT_PROPS" }],
    },
    {
      code: /* tsx */ `
        class Input extends React.Component {
          render() {
            return <input />;
          }
        }
        Input.defaultProps = {};
      `,
      errors: [{ messageId: "NO_DEFAULT_PROPS" }],
    },
    {
      code: /* tsx */ `
        class Input extends React.Component {
          static defaultProps = {};

          render() {
            return <input />;
          }
        }
      `,
      errors: [{ messageId: "NO_DEFAULT_PROPS" }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      function App() {
          return <div />
      }
    `,
    /* tsx */ `
      function App() {
          return <div />;
      }
    `,
    /* tsx */ `
      class Input extends React.Component {
        render() {
          return <input />;
        }
      }
    `,
  ],
});
