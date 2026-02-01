import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-dollar";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      // Template literal syntax mistakenly used in JSX text
      code: tsx`
        const App = () => <>Hello \${user.name}</>
      `,
      errors: [
        {
          messageId: "default",
          column: 27,
          endColumn: 28,
          endLine: 1,
          line: 1,
          suggestions: [
            {
              messageId: "removeDollarSign",
              // Should use JSX expression syntax instead
              output: tsx`
                const App = () => <>Hello {user.name}</>
              `,
            },
          ],
        },
      ],
    },
    {
      // Two dollar signs before expression (report the last one)
      code: tsx`
        const App = () => <>Hello $\${user.name}</>
      `,
      errors: [
        {
          messageId: "default",
          column: 28,
          endColumn: 29,
          endLine: 1,
          line: 1,
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                const App = () => <>Hello \${user.name}</>
              `,
            },
          ],
        },
      ],
    },
    {
      // Template literal syntax in div element
      code: tsx`
        const App = (props) => {
            return <div>Hello \${props.name}</div>;
        };
      `,
      errors: [
        {
          messageId: "default",
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
      // Template literal syntax at start of text
      code: tsx`
        const App = (props) => {
            return <div>\${props.name} is your name</div>;
        };
      `,
      errors: [
        {
          messageId: "default",
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
      // Template literal syntax in middle of text
      code: tsx`
        const App = (props) => {
            return <div>Hello \${props.name} is your name</div>;
        };
      `,
      errors: [
        {
          messageId: "default",
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
    {
      // Multiple template literal syntax errors in single JSX element
      code: tsx`
        function App({ count, total }) {
          return <div>Progress: \${count} / \${total}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          column: 25,
          endColumn: 26,
          endLine: 2,
          line: 2,
          suggestions: [
            {
              messageId: "removeDollarSign",
              // Fix first occurrence only
              output: tsx`
                function App({ count, total }) {
                  return <div>Progress: {count} / \${total}</div>;
                }
              `,
            },
          ],
        },
        {
          messageId: "default",
          column: 36,
          endColumn: 37,
          endLine: 2,
          line: 2,
          suggestions: [
            {
              messageId: "removeDollarSign",
              // Fix second occurrence only
              output: tsx`
                function App({ count, total }) {
                  return <div>Progress: \${count} / {total}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    // Template literal in JavaScript expression - valid usage
    tsx`
      const App = () => \`Hello \${user.name}\`
    `,
    // Plain dollar sign without template literal syntax
    tsx`
      const App = (props) => {
          return <div>Hello $</div>;
      };
    `,
    // Correct JSX expression syntax
    tsx`
      const App = (props) => {
          return <div>Hello {props.name}</div>;
      };
    `,
    // Dollar sign in template literal inside JSX expression - valid
    tsx`
      function App({ price }) {
        // 🟢 Good: This is a legitimate use of the '$' character.
        return <div>{\`$\${price}\`}</div>;
      }
    `,
    tsx`
      function App({ price }) {
        return <div>\${price}</div>;
      }
    `,
  ],
});
