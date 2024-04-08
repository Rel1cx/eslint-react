import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-shorthand-boolean";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});
ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<App foo={true} />",
      errors: [{ messageId: "PREFER_SHORTHAND_BOOLEAN" }],
    },
    {
      code: "<App foo={true} bar />",
      errors: [{ messageId: "PREFER_SHORTHAND_BOOLEAN" }],
    },
  ],
  valid: [
    ...allValid,
    "<App foo />",
    "<App foo bar />",
    "<App foo bar={false} />",
    "<App foo bar={false} baz />",
  ],
});
