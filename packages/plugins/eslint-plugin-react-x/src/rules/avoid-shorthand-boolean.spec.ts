import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./avoid-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<App foo />`,
      errors: [{
        data: { propName: "foo" },
        messageId: "AVOID_SHORTHAND_BOOLEAN",
      }],
    },
    {
      code: /* tsx */ `<App foo bar />`,
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
    /* tsx */ `<App foo={true} />`,
    /* tsx */ `<App foo={true} bar={true} />`,
    /* tsx */ `<App foo={false} bar={false} />`,
    /* tsx */ `<App foo={false} bar={false} baz={false} />`,
  ],
});
