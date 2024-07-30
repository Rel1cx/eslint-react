import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-iframe-sandbox";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<iframe sandbox="allow-scripts allow-same-origin" />;`,
      errors: [
        {
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
        },
      ],
    },
    {
      code: /* tsx */ `<PolyComponent as="iframe" sandbox="allow-scripts allow-same-origin" />;`,
      errors: [
        {
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // TODO: Evaluate the necessity of supporting props lookup for spread props
    {
      code: /* tsx */ `
        const props = {
          sandbox: "allow-scripts allow-same-origin",
        };

        function App() {
            return <iframe {...props} />;
        }
      `,
      errors: [
        {
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    "<a />;",
    "<span />;",
    '<button type="button">Click me</button>;',
    '<iframe sandbox="allow-downloads" />;',
    '<iframe sandbox="allow-downloads allow-scripts" />;',
    '<iframe sandbox="allow-downloads allow-scripts allow-forms" />;',
    'const IFrame = () => <iframe sandbox="allow-downloads" />;',
    /* tsx */ `
      function App() {
          return <iframe sandbox="allow-downloads" />;
      }
    `,
  ],
});
