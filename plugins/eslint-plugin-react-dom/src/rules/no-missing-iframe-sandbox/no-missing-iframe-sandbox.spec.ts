import tsx from "dedent";

import { ruleTester } from "#/test";
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
  ],
  valid: [
    "<a />;",
    "<span />;",
    '<button type="button">Click me</button>;',
    '<iframe sandbox="" />;',
    '<iframe sandbox="allow-downloads" />;',
    '<iframe sandbox="allow-downloads allow-scripts" />;',
    '<iframe sandbox="allow-downloads allow-scripts allow-forms" />;',
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
    // Not an iframe
    tsx`<div sandbox />;`,
  ],
});
