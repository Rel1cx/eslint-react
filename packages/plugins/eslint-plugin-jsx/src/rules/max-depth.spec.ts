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
    "const a = <div><div /></div>;",
    "const a = <div><div><div /></div></div>;",
    "const a = <div><div><div><div /></div></div></div>;",
    "const a = <div><div><div><div><div /></div></div></div></div>;",
    "const a = <div><div><div><div><div><div /></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><div /></div></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><div><div /></div></div></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><div><div><div /></div></div></div></div></div></div></div></div>;",
    "const a = <div><div><div><div><div><div><div><div><div><div /></div></div></div></div></div></div></div></div></div>;",
    {
      code: "const a = <div><div><div>{<div />}</div></div></div>;",
      options: [{ max: 4 }],
    },
  ],
  // TODO: Add invalid tests
  invalid: [],
});
