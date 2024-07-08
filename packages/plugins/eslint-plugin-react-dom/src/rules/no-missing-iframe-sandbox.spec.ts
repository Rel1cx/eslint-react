import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-iframe-sandbox";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<iframe />;`,
      errors: [
        {
          messageId: "NO_MISSING_IFRAME_SANDBOX",
        },
      ],
    },
    {
      code: /* tsx */ `<iframe sandbox />;`,
      errors: [
        {
          messageId: "NO_MISSING_IFRAME_SANDBOX",
        },
      ],
    },
    {
      code: /* tsx */ `<iframe sandbox="" />;`,
      errors: [
        {
          messageId: "NO_MISSING_IFRAME_SANDBOX",
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
          messageId: "NO_MISSING_IFRAME_SANDBOX",
        },
      ],
    },
    {
      code: /* tsx */ `
        import React from "react";

        function App() {
            return React.createElement("iframe");
        }
      `,
      errors: [
        {
          messageId: "NO_MISSING_IFRAME_SANDBOX",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { createElement } from "react";

        function App() {
            return createElement("iframe");
        }
      `,
      errors: [
        {
          messageId: "NO_MISSING_IFRAME_SANDBOX",
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
    /* tsx */ `
      import React from "react";

      function App() {
          return React.createElement("iframe", { sandbox: "allow-downloads" });
      }
    `,
    /* tsx */ `
      import { createElement } from "react";

      function App() {
          return createElement("iframe", { sandbox: "allow-downloads" });
      }
    `,
  ],
});
