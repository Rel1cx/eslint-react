import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-iframe-sandbox";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<iframe sandbox="allow-scripts allow-same-origin" />;`,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`<PolyComponent as="iframe" sandbox="allow-scripts allow-same-origin" />;`,
      errors: [
        {
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Different sandbox value combinations (unsafe)
    {
      code: tsx`<iframe sandbox="allow-scripts allow-same-origin allow-popups" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-popups allow-scripts allow-same-origin allow-forms" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-downloads allow-scripts allow-modals allow-same-origin" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-scripts allow-popups-to-escape-sandbox allow-same-origin" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-scripts allow-top-navigation allow-same-origin" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-same-origin allow-presentation allow-scripts" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-scripts allow-storage-access-by-user-activation allow-same-origin" />;`,
      errors: [{ messageId: "default" }],
    },
    // Complex sandbox strings (with extra whitespace)
    {
      code: tsx`<iframe sandbox="  allow-scripts   allow-same-origin  " />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-scripts\tallow-same-origin" />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<iframe sandbox="allow-scripts\nallow-same-origin" />;`,
      errors: [{ messageId: "default" }],
    },
    // Spread props with unsafe sandbox
    {
      code: tsx`
        const props = {
          sandbox: "allow-scripts allow-same-origin",
        };

        function App() {
            return <iframe {...props} />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // Variable assignment with unsafe sandbox
    {
      code: tsx`
        function App() {
          const sandboxValue = "allow-scripts allow-same-origin";
          return <iframe sandbox={sandboxValue} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Template literal with unsafe values
    {
      code: tsx`<iframe sandbox={\`allow-scripts allow-same-origin\`} />;`,
      errors: [{ messageId: "default" }],
    },
    // With allow-top-navigation-by-user-activation
    {
      code: tsx`<iframe sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation" />;`,
      errors: [{ messageId: "default" }],
    },
    // All permissions including unsafe combination
    {
      code:
        tsx`<iframe sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation allow-top-navigation-by-user-activation" />;`,
      errors: [{ messageId: "default" }],
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
    // Allowed correct sandbox values
    '<iframe sandbox="allow-forms" />;',
    '<iframe sandbox="allow-modals" />;',
    '<iframe sandbox="allow-orientation-lock" />;',
    '<iframe sandbox="allow-pointer-lock" />;',
    '<iframe sandbox="allow-popups" />;',
    '<iframe sandbox="allow-popups-to-escape-sandbox" />;',
    '<iframe sandbox="allow-presentation" />;',
    '<iframe sandbox="allow-storage-access-by-user-activation" />;',
    '<iframe sandbox="allow-top-navigation" />;',
    '<iframe sandbox="allow-top-navigation-by-user-activation" />;',
    // Allow-same-origin alone (safe)
    '<iframe sandbox="allow-same-origin" />;',
    // Allow-scripts alone (safe)
    '<iframe sandbox="allow-scripts" />;',
    // Multiple safe permissions without unsafe combination
    '<iframe sandbox="allow-downloads allow-forms" />;',
    '<iframe sandbox="allow-popups allow-modals" />;',
    '<iframe sandbox="allow-popups allow-popups-to-escape-sandbox" />;',
    '<iframe sandbox="allow-pointer-lock allow-orientation-lock" />;',
    '<iframe sandbox="allow-downloads allow-forms allow-modals allow-popups allow-top-navigation-by-user-activation" />;',
    // Safe combinations with allow-same-origin (no allow-scripts)
    '<iframe sandbox="allow-same-origin allow-forms" />;',
    '<iframe sandbox="allow-same-origin allow-popups" />;',
    '<iframe sandbox="allow-same-origin allow-downloads allow-modals" />;',
    '<iframe sandbox="allow-presentation allow-same-origin allow-top-navigation" />;',
    // Safe combinations with allow-scripts (no allow-same-origin)
    '<iframe sandbox="allow-scripts allow-forms" />;',
    '<iframe sandbox="allow-scripts allow-popups" />;',
    '<iframe sandbox="allow-scripts allow-downloads allow-modals" />;',
    '<iframe sandbox="allow-top-navigation allow-scripts allow-forms" />;',
    // No sandbox attribute
    "<iframe />;",
    // Null/undefined sandbox
    tsx`<iframe sandbox={null} />;`,
    tsx`<iframe sandbox={undefined} />;`,
    // Dynamic values (not statically analyzable as unsafe)
    tsx`<iframe sandbox={dynamicValue} />;`,
    tsx`<iframe sandbox={getSandboxValue()} />;`,
    // Variable with unknown value
    tsx`
      const sandbox = someVariable;
      <iframe sandbox={sandbox} />;
    `,
    // Spread props not containing unsafe sandbox
    tsx`
      const props = { sandbox: "allow-downloads" };
      <iframe {...props} />;
    `,
    // Not an iframe element
    '<div sandbox="allow-scripts allow-same-origin" />;',
    '<span sandbox="allow-scripts allow-same-origin" />;',
    // Custom component (not polymorphic as iframe)
    tsx`<CustomComponent sandbox="allow-scripts allow-same-origin" />;`,
    // Template literal with safe values
    tsx`<iframe sandbox={\`allow-downloads\`} />;`,
    // Object expression (not string)
    tsx`<iframe sandbox={["allow-downloads"]} />;`,
    // Conditional expression - can't be statically resolved
    tsx`
      function App({ useSandbox }) {
        return <iframe sandbox={useSandbox ? "allow-scripts allow-same-origin" : ""} />;
      }
    `,
  ],
});
