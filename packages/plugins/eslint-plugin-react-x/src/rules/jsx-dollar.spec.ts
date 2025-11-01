import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-dollar";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const App = (props) => {
            return <div>Hello \${props.name}</div>;
        };
      `,
      errors: [
        {
          messageId: "jsxDollar",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                const App = (props) => {
                    return <div>Hello {props.name}</div>;
                };
              `,
            },
          ],
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      const App = (props) => {
          return [<div key="1">1</div>]
      };
    `,
    tsx`
      const App = (props) => {
          return <div>Hello $</div>;
      };
    `,
  ],
});
