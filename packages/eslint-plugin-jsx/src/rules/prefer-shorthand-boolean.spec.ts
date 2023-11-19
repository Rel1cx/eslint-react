import { allValid } from "@eslint-react/shared";

import RuleTester, { defaultParserOptions } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./prefer-shorthand-boolean";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});
ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<App foo />",
    "<App foo bar />",
    "<App foo bar={false} />",
    "<App foo bar={false} baz />",
  ],
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
});
