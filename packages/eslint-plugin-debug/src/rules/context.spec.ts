import { allFunctions, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./context";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allFunctions,
  ],
  invalid: [],
});
