import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-string-refs";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function App() {
            return <div ref="ref" />
        }
      `,
      errors: [{ messageId: "noStringRefs" }],
    },
    {
      code: /* tsx */ `
        class Input extends React.Component {
          focus = () => {
            this.refs.input.focus();
          }

          render() {
            return <input ref="input" />;
          }
        }
      `,
      errors: [{ messageId: "noStringRefs" }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      function App() {
          return <div ref={ref} />
      }
    `,
    /* tsx */ `
      function App() {
          return <div ref={() => {}} />;
      }
    `,
  ],
});
