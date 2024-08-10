import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<App foo={true} />`,
      errors: [{
        messageId: "preferShorthandBoolean",
        data: { propName: "foo" },
      }],
    },
    {
      code: /* tsx */ `<App foo={true} bar />`,
      errors: [{
        messageId: "preferShorthandBoolean",
        data: { propName: "foo" },
      }],
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
