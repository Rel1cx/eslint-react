import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-missing-button-type";

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
    'const Button = () => <button type="button">Click me</button>;',
    dedent`
      function App() {
          return <button type="button">Click me</button>;
      }
    `,
    dedent`
      import React from "react";

      function App() {
          return React.createElement("button", { type: "button" }, "Click me");
      }
    `,
    dedent`
      import { createElement } from "react";

      function App() {
          return createElement("button", { type: "button" }, "Click me");
      }
    `,
  ],
  invalid: [
    {
      code: "<button>Click me</button>;",
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
    },
    {
      code: "<button type={undefined}>Click me</button>;",
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
    },
    {
      code: "<button type={null}>Click me</button>;",
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
    },
    // has type attribute but not explicitly set to button element
    {
      code: dedent`
        const props = {
          type: "button",
        };

        function App() {
            return <button {...props}>Click me</button>;
        }
      `,
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
    },
    {
      code: dedent`
        import React from "react";

        function App() {
            return React.createElement("button", {}, "Click me");
        }
      `,
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
    },
    {
      code: dedent`
        import { createElement } from "react";

        function App() {
            return createElement("button", {}, "Click me");
        }
      `,
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
    },
  ],
});
