import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-missing-iframe-sandbox";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<iframe />;`,
      errors: [
        {
          messageId: "missingSandboxAttribute",
          suggestions: [
            {
              data: { value: "" },
              messageId: "addSandboxAttribute",
              output: tsx`<iframe sandbox="" />;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<iframe sandbox />;`,
      errors: [
        {
          messageId: "missingSandboxAttribute",
          suggestions: [
            {
              data: { value: "" },
              messageId: "addSandboxAttribute",
              output: tsx`<iframe sandbox="" />;`,
            },
          ],
        },
      ],
    },
    // Variable sandbox value (not a static string)
    {
      code: tsx`
        function App() {
          return <iframe sandbox={sandboxValue} />;
        }
      `,
      errors: [{
        messageId: "missingSandboxAttribute",
        suggestions: [{
          data: { value: "" },
          messageId: "addSandboxAttribute",
          output: tsx`
            function App() {
              return <iframe sandbox="" />;
            }
          `,
        }],
      }],
    },
    // Report spread arguments without suggesting replacement of the spread
    {
      code: tsx`<iframe {...{ sandbox: undefined }} />;`,
      errors: [{
        messageId: "missingSandboxAttribute",
        column: 13,
        suggestions: [],
      }],
    },
    {
      code: tsx`
        const props = { sandbox: getSandbox() };
        <iframe {...props} />;
      `,
      errors: [{
        messageId: "missingSandboxAttribute",
        line: 2,
        column: 13,
        suggestions: [],
      }],
    },
    // Boolean expression sandbox value
    {
      code: tsx`
        function App() {
          return <iframe sandbox={true} />;
        }
      `,
      errors: [{
        messageId: "missingSandboxAttribute",
        suggestions: [{
          data: { value: "" },
          messageId: "addSandboxAttribute",
          output: tsx`
            function App() {
              return <iframe sandbox="" />;
            }
          `,
        }],
      }],
    },
    {
      code: tsx`<PolyComponent as="iframe" />;`,
      errors: [
        {
          messageId: "missingSandboxAttribute",
          suggestions: [
            {
              data: { value: "" },
              messageId: "addSandboxAttribute",
              output: tsx`<PolyComponent sandbox="" as="iframe" />;`,
            },
          ],
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: tsx`<PolyComponent as="iframe" sandbox />;`,
      errors: [
        {
          messageId: "missingSandboxAttribute",
          suggestions: [
            {
              data: { value: "" },
              messageId: "addSandboxAttribute",
              output: tsx`<PolyComponent as="iframe" sandbox="" />;`,
            },
          ],
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Boundary: JSXAttribute with empty expression container (resolveAttributeValue handles JSXEmptyExpression)
    {
      code: tsx`
        function App() {
          return <iframe sandbox={} />;
        }
      `,
      errors: [{
        messageId: "missingSandboxAttribute",
        suggestions: [{
          data: { value: "" },
          messageId: "addSandboxAttribute",
          output: tsx`
            function App() {
              return <iframe sandbox="" />;
            }
          `,
        }],
      }],
    },
    // Member expression component with a polymorphic prop (ex: motion.div)
    {
      code: tsx`<motion.div as="iframe" />;`,
      errors: [
        {
          messageId: "missingSandboxAttribute",
          suggestions: [
            {
              data: { value: "" },
              messageId: "addSandboxAttribute",
              output: tsx`<motion.div sandbox="" as="iframe" />;`,
            },
          ],
        },
      ],
    },
  ],
  valid: [
    '<iframe sandbox="" />;',
    '<iframe sandbox="allow-downloads" />;',
    '<iframe sandbox="allow-downloads allow-scripts" />;',
    '<iframe sandbox="allow-downloads allow-scripts allow-forms" />;',
    "<a />;",
    "<span />;",
    '<button type="button">Click me</button>;',
    'const IFrame = () => <iframe sandbox="allow-downloads" />;',
    tsx`
      function App() {
          return <iframe sandbox="allow-downloads" />;
      }
    `,
    {
      code: tsx`<PolyComponent as="iframe" sandbox="" />;`,
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: tsx`
        const props = {
          sandbox: "allow-downloads",
        };

        function App() {
            return <PolyComponent as="iframe" {...props} />;
        }
      `,
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: tsx`
        const props = {
          sandbox: "allow-downloads",
        };

        function App() {
            return <iframe {...props} />;
        }
      `,
    },
    // Alias chains in spread props are followed
    {
      code: tsx`
        const inner = { sandbox: "allow-downloads" };
        const props = inner;

        function App() {
            return <iframe {...props} />;
        }
      `,
    },
    // Statically evaluable computed keys in spread props count as providing 'sandbox'
    tsx`<iframe {...{ ["sandbox"]: "allow-downloads" }} />;`,
    // String literal keys in spread props count as providing 'sandbox'
    tsx`<iframe {...{ "sandbox": "allow-downloads" }} />;`,
    // Not an iframe
    tsx`<div sandbox />;`,
    // Boundary: member expression without a polymorphic prop is not an iframe
    "<motion.iframe />;",
  ],
});
