import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-button-type";

ruleTester.run(RULE_NAME, rule, {
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
      function App() {
          return <button type={ true ? "button" : "submit" }>Click me</button>;
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
    dedent`
      import { createElement } from "react";

      function App() {
          return createElement("button", { type: true ? "button" : "submit" }, "Click me");
      }
    `,
    dedent`
      const props = {
        type: "button",
      };

      function App() {
          return <button {...props}>Click me</button>;
      }
    `,
  ],
});
