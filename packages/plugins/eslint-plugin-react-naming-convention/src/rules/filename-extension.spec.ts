import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./filename-extension";

const withJSXElement = "const App = () => <div><div /></div>";
const withJSXFragment = "const App = () => <></>";
const withoutJSX = "";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: withoutJSX,
      errors: [
        {
          messageId: "FILE_NAME_EXTENSION_UNEXPECTED",
        },
      ],
      filename: "react.tsx",
      options: ["as-needed"],
    },
    {
      code: withoutJSX,
      errors: [
        {
          messageId: "FILE_NAME_EXTENSION_UNEXPECTED",
        },
      ],
      filename: "react.tsx",
      options: [{ allow: "as-needed" }],
    },
    {
      code: withJSXElement,
      errors: [
        {
          messageId: "FILE_NAME_EXTENSION_INVALID",
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
      code: withJSXElement,
      filename: "react.tsx",
    },
    {
      code: withJSXFragment,
      filename: "react.tsx",
    },
    {
      code: withoutJSX,
      filename: "file.ts",
    },
    {
      code: withoutJSX,
      filename: "react.tsx",
      options: ["always"],
    },
    {
      code: withoutJSX,
      filename: "react.tsx",
      options: [{ allow: "always" }],
    },
  ],
});
