import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-uses-vars";

// TODO: Add tests
ruleTester.run(RULE_NAME, rule, {
  invalid: [],
  valid: [
    "const a = <div />;",
  ],
});
