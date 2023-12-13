import { defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./filename-extension";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

const withJSXElement = "const App = () => <div><div /></div>";
const withJSXFragment = "const App = () => <></>";
const withoutJSX = "";

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      filename: "react.tsx",
      code: withJSXElement,
    },
    {
      filename: "react.tsx",
      code: withJSXFragment,
    },
    {
      filename: "file.ts",
      code: withoutJSX,
    },
    {
      filename: "react.tsx",
      code: withoutJSX,
      options: ["always"],
    },
    {
      filename: "react.tsx",
      code: withoutJSX,
      options: [{ allow: "always" }],
    },
  ],
  invalid: [
    {
      filename: "react.tsx",
      code: withoutJSX,
      options: ["as-needed"],
      errors: [
        {
          messageId: "FILE_NAME_EXTENSION_UNEXPECTED",
        },
      ],
    },
    {
      filename: "react.tsx",
      code: withoutJSX,
      options: [{ allow: "as-needed" }],
      errors: [
        {
          messageId: "FILE_NAME_EXTENSION_UNEXPECTED",
        },
      ],
    },
    {
      filename: "react.tsx",
      code: withJSXElement,
      options: [
        {
          allow: "as-needed",
          extensions: ["mtx"],
        },
      ],
      errors: [
        {
          messageId: "FILE_NAME_EXTENSION_INVALID",
        },
      ],
    },
  ],
});
