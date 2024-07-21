import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-prop-types";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function App() {
            return <div />
        }
        App.propTypes = {};
      `,
      errors: [{ messageId: "NO_PROP_TYPES" }],
    },
    {
      code: /* tsx */ `
        class Input extends React.Component {
          render() {
            return <input />;
          }
        }
        Input.propTypes = {};
      `,
      errors: [{ messageId: "NO_PROP_TYPES" }],
    },
    {
      code: /* tsx */ `
        class Input extends React.Component {
          static propTypes = {};

          render() {
            return <input />;
          }
        }
      `,
      errors: [{ messageId: "NO_PROP_TYPES" }],
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
