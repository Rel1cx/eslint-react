import { RuleTester } from "@typescript-eslint/rule-tester";
import tsx from "dedent";

import { JsxEmit } from "typescript";
import { defaultLanguageOptionsWithTypes, getProjectForJsxRuntime } from "../../../../../test";
import rule, { debug, RULE_NAME } from "./jsx-uses-react";

const ruleTester = new RuleTester({
  languageOptions: {
    ...defaultLanguageOptionsWithTypes,
    parserOptions: {
      ...defaultLanguageOptionsWithTypes.parserOptions,
      project: getProjectForJsxRuntime(JsxEmit.React),
      projectService: false,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unnecessary-condition
debug
  ? ruleTester.run(RULE_NAME, rule, {
    invalid: [
      {
        code: tsx`
          import React from "react";

          const Hello = <div>Hello</div>;

          console.log(Hello);
        `,
        errors: [
          {
            messageId: "jsxUsesReact",
            data: { name: "React" },
          },
          {
            messageId: "jsxUsesReact",
            data: { name: "React.createElement" },
          },
        ],
      },
      {
        code: tsx`
          /** @jsx Foo */
          import Foo from "foo";

          const Hello = <div>Hello</div>;

          console.log(Hello);
        `,
        errors: [
          {
            messageId: "jsxUsesReact",
            data: { name: "Foo" },
          },
        ],
      },
    ],
    valid: [],
  })
  : ruleTester.run(RULE_NAME, rule, {
    invalid: [],
    valid: [{
      code: tsx`
        import React from "react";

        const Hello = <div>Hello</div>;

        console.log(Hello);
      `,
    }, {
      code: tsx`
        /** @jsx Foo */
        import Foo from "foo";

        const Hello = <div>Hello</div>;

        console.log(Hello);
      `,
    }],
  });
