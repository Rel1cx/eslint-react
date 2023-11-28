import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-redundant-should-component-update";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    // TODO: Add tests
  ],
  // TODO: Add tests
  invalid: [],
});
