import { JsxEmit } from "@eslint-react/core";
import { RuleTester } from "@typescript-eslint/rule-tester";
import tsx from "dedent";

import { defaultLanguageOptionsWithTypes, getProjectForJsxEmit } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-uses-react";

const ruleTester = new RuleTester({
  languageOptions: {
    ...defaultLanguageOptionsWithTypes,
    parserOptions: {
      ...defaultLanguageOptionsWithTypes.parserOptions,
      project: getProjectForJsxEmit(JsxEmit.React),
      projectService: false,
    },
  },
});

process.env["ESLINT_REACT_DEBUG"] === "1"
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
            messageId: "default",
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
            messageId: "default",
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
