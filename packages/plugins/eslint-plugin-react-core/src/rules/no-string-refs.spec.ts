import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-string-refs";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
        function App() {
            return <div ref="ref" />
        }
      `,
      errors: [{ messageId: "NO_STRING_REFS" }],
    },
    {
      code: dedent`
        class Input extends React.Component {
          focus = () => {
            this.refs.input.focus();
          }

          render() {
            return <input ref="input" />;
          }
        }
      `,
      errors: [{ messageId: "NO_STRING_REFS" }],
    },
  ],
  valid: [
    ...allValid,
    dedent`
      function App() {
          return <div ref={ref} />
      }
    `,
    dedent`
      function App() {
          return <div ref={() => {}} />;
      }
    `,
  ],
});
