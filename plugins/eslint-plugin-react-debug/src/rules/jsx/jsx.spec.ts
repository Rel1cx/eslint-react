import { createRuleTesterForJsxEmit } from "#/testing/helpers";
import { stringify } from "@/utils/stringify";
import tsx from "dedent";
import ts from "typescript";
import rule, { RULE_NAME } from "./jsx";

const ruleTester = createRuleTesterForJsxEmit(ts.JsxEmit.ReactJSX);

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React from "react";
        const Foo = () => <div />;
      `,
      errors: [
        {
          data: {
            json: stringify({
              kind: "element",
              type: "div",
              jsx: "react-jsx",
              jsxFactory: "React.createElement",
              jsxFragmentFactory: "React.Fragment",
              jsxImportSource: "react",
              jsxRuntime: "automatic",
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        /** @jsx Preact.h */
        /** @jsxFrag Preact.Fragment */
        /** @jsxImportSource preact */
        /** @jsxRuntime classic */
        import React from "react";
        const Foo = () => <div />;
      `,
      errors: [
        {
          data: {
            json: stringify({
              kind: "element",
              type: "div",
              jsx: "react",
              jsxFactory: "Preact.h",
              jsxFragmentFactory: "Preact.Fragment",
              jsxImportSource: "preact",
              jsxRuntime: "classic",
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        /** @jsxRuntime classic */
        import React from "react";
        const Foo = () => <div />;
      `,
      errors: [
        {
          data: {
            json: stringify({
              kind: "element",
              type: "div",
              jsx: "react",
              jsxFactory: "React.createElement",
              jsxFragmentFactory: "React.Fragment",
              jsxImportSource: "react",
              jsxRuntime: "classic",
            }),
          },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [],
});
