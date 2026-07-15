import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-leaked-dollar";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      // Template literal syntax mistakenly used in JSX text
      code: tsx`
        const App = () => <>Hello \${user.name}</>
      `,
      errors: [
        {
          column: 27,
          endColumn: 28,
          endLine: 1,
          line: 1,
          messageId: "default",
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
          column: 28,
          endColumn: 29,
          endLine: 1,
          line: 1,
          messageId: "default",
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
          column: 23,
          endColumn: 24,
          endLine: 2,
          line: 2,
          messageId: "default",
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
          column: 17,
          endColumn: 18,
          endLine: 2,
          line: 2,
          messageId: "default",
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
          column: 23,
          endColumn: 24,
          endLine: 2,
          line: 2,
          messageId: "default",
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
          column: 25,
          endColumn: 26,
          endLine: 2,
          line: 2,
          messageId: "default",
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
          column: 36,
          endColumn: 37,
          endLine: 2,
          line: 2,
          messageId: "default",
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
    // --- Boundary tests start here ---
    {
      // Boundary: '$$' + expression (length === 2, value !== '$')
      // Fix removes only the last '$', leaving '$' + expression which becomes valid
      code: tsx`
        const App = () => <>$$\${user.name}</>
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                const App = () => <>$\${user.name}</>
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: isolated '$' + expression with MORE than 2 children
      // <div>${a}{b}</div> has 3 children: JSXText('$'), JSXExpr(a), JSXExpr(b)
      code: tsx`
        function App() {
          return <div>\${a}{b}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          line: 2,
          column: 15,
          endLine: 2,
          endColumn: 16,
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div>{a}{b}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: '$' between text and expression with more children
      // <div>Hello {world} ${price}</div>
      // children: JSXText('Hello '), JSXExpr(world), JSXText(' $'), JSXExpr(price)
      code: tsx`
        function App() {
          return <div>Hello {world} \${price}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div>Hello {world} {price}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: expression before '$' then another expression
      // <div>{a}\${b}</div> → JSXExpr(a), JSXText("$"), JSXExpr(b) → length === 3 → invalid
      code: tsx`
        function App() {
          return <div>{a}\${b}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          line: 2,
          column: 18,
          endLine: 2,
          endColumn: 19,
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div>{a}{b}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: '$' before expression in nested element
      code: tsx`
        function App() {
          return <div><span>Hello \${user}</span></div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div><span>Hello {user}</span></div>;
                }
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: multiple '$' signs in same text node, only last one reported
      code: tsx`
        function App() {
          return <div>Price: $$$\${value}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div>Price: $$\${value}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: '$' followed by expression with nested JSX inside expression
      code: tsx`
        function App() {
          return <div>Hello \${<span>world</span>}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div>Hello {<span>world</span>}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: '$' at the very start of element with expression
      // <div>$${expr}</div> — but let's verify with $$$ which triggers
      code: tsx`
        function App() {
          return <div>$$$\${expr}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div>$$\${expr}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
    {
      // Boundary: '$' with a space in between text and expression via newline
      // Actually this should be valid because the text node ends with space, not $
      // But let's test a variant where newline separates: parser might create separate text nodes
      code: tsx`
        function App() {
          return <div>Hello
\${expr}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeDollarSign",
              output: tsx`
                function App() {
                  return <div>Hello
{expr}</div>;
                }
              `,
            },
          ],
        },
      ],
    },
  ],
  valid: [
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
    // Intentional: isolated '$' before expression with exactly 2 children
    tsx`
      function App({ price }) {
        return <div>\${price}</div>;
      }
    `,
    // Boundary: '$' before JSXElement, not expression
    tsx`
      function App() {
        return <div>$<span>text</span></div>;
      }
    `,
    // Boundary: '$' at end with no following sibling at all
    tsx`
      function App() {
        return <div>Hello $</div>;
      }
    `,
    // Boundary: isolated '$' before expression in Fragment (exactly 2 children)
    tsx`
      function App({ price }) {
        return <>\${price}</>;
      }
    `,
    // Boundary: empty expression container after '$' with exactly 2 children
    // <div>\${}</div> → JSXText("$"), JSXExpressionContainer(null) → length === 2, value === "$" → skip
    tsx`
      function App() {
        return <div>\${}</div>;
      }
    `,
    // Boundary: '$' followed by space then expression (text ends with space, not $)
    tsx`
      function App() {
        return <div>$ {expr}</div>;
      }
    `,
    // Boundary: '$' in the middle of text, not at end
    tsx`
      function App() {
        return <div>Hello $world</div>;
      }
    `,
    // Boundary: '$' followed by another text node before expression
    // <div>$text{expr}</div> → JSXText("$text"), JSXExpressionContainer → text doesn't end with $
    tsx`
      function App() {
        return <div>$text{expr}</div>;
      }
    `,
    // Boundary: whitespace-only text with '$' at end
    // <div>  $  {expr}</div> → JSXText("  $  ") doesn't end with $ → valid
    tsx`
      function App() {
        return <div>  $  {expr}</div>;
      }
    `,
    // Boundary: tab/newline before expression
    // <div>Hello $	{expr}</div> → JSXText("Hello $\t") ends with tab → valid
    tsx`
      function App() {
        return <div>Hello $	{expr}</div>;
      }
    `,
    // &dollar; is not a recognized HTML entity, so it is not treated as a '$'.
    "<div>Price: &dollar;{value}</div>",
    // Decimal / hexadecimal character references for '$' are also not treated as '$'.
    "<div>Price: &#36;{value}</div>",
    "<div>Price: &#x24;{value}</div>",
    "<div>Price: &#36;&#36;{value}</div>",
    tsx`
      function App() {
        return <div>{a}&#36;{b}</div>;
      }
    `,
    // '$' inside an attribute value is not a text node
    '<div attr="Price: ${value}" />',
  ],
});
