import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
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
          messageId: "noStringStyleProp",
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
          messageId: "noStringStyleProp",
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
          messageId: "noStringStyleProp",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
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
    {
      // https://github.com/Rel1cx/eslint-react/issues/1217
      code: tsx`
        const a = <StatusBar style="auto" />;
      `,
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "StatusBar",
              attributes: [
                // inform that the style attribute on StatusBar is not an intrinsic attribute but a custom one
                { name: "", as: "style" },
              ],
            },
          ],
        },
      },
    },
  ],
});
