import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./max-depth";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "const a = <div />;",
    "const a = <div><img /></div>;",
    "const a = <div><div><img /></div></div>;",
    "const a = <div><div><div><img /></div></div></div>;",
    "const a = <div><div><div><div><img /></div></div></div></div>;",
    "const a = <div><div><div><div><div><img /></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><img /></div></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><div><img /></div></div></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><div><div><img /></div></div></div></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><div><div><div><img /></div></div></div></div></div></div></div></div></div>;",
    {
      code: "const a = <div><div><div>{<img />}</div></div></div>;",
      options: [{ max: 4 }],
    },
  ],
  invalid: [
    {
      code: "const a = <div><div><div><img /></div></div></div>;",
      options: [{ max: 3 }],
      errors: [
        {
          messageId: "MAX_DEPTH",
          data: {
            maxDepth: 3,
            depth: 4,
          },
        },
      ],
    },
    {
      code: "const a = <div><div><div>{<img />}</div></div></div>;",
      options: [{ max: 3 }],
      errors: [
        {
          messageId: "MAX_DEPTH",
          data: {
            maxDepth: 3,
            depth: 4,
          },
        },
      ],
    },
  ],
});
