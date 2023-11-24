import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-iframe-sandbox";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<a />;",
    "<span />;",
    '<button type="button">Click me</button>;',
    '<iframe sandbox="allow-downloads" />;',
    '<iframe sandbox="allow-downloads allow-scripts" />;',
    '<iframe sandbox="allow-downloads allow-scripts allow-forms" />;',
    'const IFrame = () => <iframe sandbox="allow-downloads" />;',
    dedent`
      function App() {
          return <iframe sandbox="allow-downloads" />;
      }
    `,
    dedent`
      import React from "react";

      function App() {
          return React.createElement("iframe", { sandbox: "allow-downloads" });
      }
    `,
    dedent`
      import { createElement } from "react";

      function App() {
          return createElement("iframe", { sandbox: "allow-downloads" });
      }
    `,
  ],
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
      code: dedent`
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
      code: dedent`
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
});
