import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-dollar";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const MyComponent = () => <>Hello \${user.name}</>
      `,
      errors: [
        {
          messageId: "jsxDollar",
          column: 35,
          endColumn: 36,
          endLine: 1,
          line: 1,
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                const MyComponent = () => <>Hello {user.name}</>
              `,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
            return <div>Hello \${props.name}</div>;
        };
      `,
      errors: [
        {
          messageId: "jsxDollar",
          column: 23,
          endColumn: 24,
          endLine: 2,
          line: 2,
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
    {
      code: tsx`
        const App = (props) => {
            return <div>\${props.name} is your name</div>;
        };
      `,
      errors: [
        {
          messageId: "jsxDollar",
          column: 17,
          endColumn: 18,
          endLine: 2,
          line: 2,
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                const App = (props) => {
                    return <div>{props.name} is your name</div>;
                };
              `,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
            return <div>Hello \${props.name} is your name</div>;
        };
      `,
      errors: [
        {
          messageId: "jsxDollar",
          column: 23,
          endColumn: 24,
          endLine: 2,
          line: 2,
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                const App = (props) => {
                    return <div>Hello {props.name} is your name</div>;
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
      const MyComponent = () => \`Hello \${user.name}\`
    `,
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
    tsx`
      const App = (props) => {
          return <div>Hello {props.name}</div>;
      };
    `,
    tsx`
      import React from "react";

      function MyComponent({ price }) {
        // 🟢 Good: This is a legitimate use of the '$' character.
        return <div>{\`$\${price}\`}</div>;
      }
    `,
    tsx`
      import React from "react";
      function AnotherComponent({ price }) {
        // 🟢 Good: Another legitimate way to display a price.
        return <div>\${price}</div>;
      }
    `,
  ],
});
