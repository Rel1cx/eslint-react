import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./filename-extension";

const withJsxElement = "const App = () => <div><div /></div>";
const withJsxFragment = "const App = () => <></>";
const withoutJsx = "";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: withoutJsx,
      errors: [
        {
          messageId: "unnecessaryJsxExtension",
        },
      ],
      filename: "react.tsx",
      options: ["as-needed"],
    },
    {
      code: withoutJsx,
      errors: [
        {
          messageId: "unnecessaryJsxExtension",
        },
      ],
      filename: "react.tsx",
      options: [{ allow: "as-needed" }],
    },
    {
      code: withJsxElement,
      errors: [
        {
          messageId: "missingJsxExtension",
        },
      ],
      filename: "react.tsx",
      options: [
        {
          allow: "as-needed",
          extensions: [".mts"],
        },
      ],
    },
  ],
  valid: [
    {
      code: withJsxElement,
      filename: "react.tsx",
    },
    {
      code: withJsxFragment,
      filename: "react.tsx",
    },
    {
      code: withoutJsx,
      filename: "file.ts",
    },
    {
      code: withoutJsx,
      filename: "react.tsx",
      options: ["always"],
    },
    {
      code: withoutJsx,
      filename: "react.tsx",
      options: [{ allow: "always" }],
    },
  ],
});
