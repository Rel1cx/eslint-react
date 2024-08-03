import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-iframe-sandbox";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<iframe />;`,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
    },
    {
      code: /* tsx */ `<iframe sandbox />;`,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
    },
    {
      code: /* tsx */ `<iframe sandbox="" />;`,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
    },
    // has sandbox attribute but not explicitly set to iframe element
    {
      code: /* tsx */ `
        const props = {
          sandbox: "allow-downloads",
        };

        function App() {
            return <iframe {...props} />;
        }
      `,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
    },
    {
      code: /* tsx */ `<PolyComponent as="iframe"/>;`,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: /* tsx */ `<PolyComponent as="iframe" sandbox />;`,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: /* tsx */ `<PolyComponent as="iframe" sandbox="" />;`,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // has sandbox attribute but not explicitly set to iframe element
    {
      code: /* tsx */ `
        const props = {
          sandbox: "allow-downloads",
        };

        function App() {
            return <PolyComponent as="iframe" {...props} />;
        }
      `,
      errors: [
        {
          messageId: "noMissingIframeSandbox",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
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
