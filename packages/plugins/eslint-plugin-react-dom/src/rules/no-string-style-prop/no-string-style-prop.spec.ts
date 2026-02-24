import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-string-style-prop";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Component() {
          return <div style="color: red;" />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Component() {
          return <div style={"color: red;"} />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Component() {
          return <div style={\`color: red;\`} />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    tsx`
      function Component() {
        return <div style={{ color: "red" }} />;
      }
    `,
    tsx`
      function Component() {
        return <div style={someStyle} />;
      }
    `,
    tsx`
      function Component() {
        return <StatusBar style="auto" />;
      }
    `,
  ],
});
