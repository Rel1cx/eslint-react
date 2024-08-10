import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./avoid-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<App foo />`,
      errors: [{
        messageId: "avoidShorthandBoolean",
        data: { propName: "foo" },
      }],
    },
    {
      code: /* tsx */ `<App foo bar />`,
      errors: [
        {
          messageId: "avoidShorthandBoolean",
          data: { propName: "foo" },
        },
        {
          messageId: "avoidShorthandBoolean",
          data: { propName: "bar" },
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
