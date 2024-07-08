import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-iframe-sandbox";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<iframe sandbox="allow-scripts allow-same-origin" />;',
      errors: [
        {
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
        },
      ],
    },
    {
      code: /* tsx */ `
        import React from "react";

        function App() {
            return React.createElement("iframe", { sandbox: "allow-scripts allow-same-origin" });
        }
      `,
      errors: [
        {
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { createElement } from "react";

        function App() {
            return createElement("iframe", { sandbox: "allow-scripts allow-same-origin" });
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
