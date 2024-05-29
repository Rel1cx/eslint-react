import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./avoid-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<App foo />",
      errors: [{
        data: { propName: "foo" },
        messageId: "AVOID_SHORTHAND_BOOLEAN",
      }],
    },
    {
      code: "<App foo bar />",
      errors: [
        {
          data: { propName: "foo" },
          messageId: "AVOID_SHORTHAND_BOOLEAN",
        },
        {
          data: { propName: "bar" },
          messageId: "AVOID_SHORTHAND_BOOLEAN",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    "<App foo={true} />",
    "<App foo={true} bar={true} />",
    "<App foo={false} bar={false} />",
    "<App foo={false} bar={false} baz={false} />",
  ],
});
