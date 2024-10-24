import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./avoid-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<input disabled />`,
      errors: [{
        messageId: "avoidShorthandBoolean",
        data: { propName: "disabled" },
      }],
      output: /* tsx */ `<input disabled={true} />`,
    },
    {
      code: /* tsx */ `<App foo />`,
      errors: [{
        messageId: "avoidShorthandBoolean",
        data: { propName: "foo" },
      }],
      output: /* tsx */ `<App foo={true} />`,
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
      output: /* tsx */ `<App foo={true} bar={true} />`,
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `<input disabled={true} />`,
    /* tsx */ `<App foo={true} />`,
    /* tsx */ `<App foo={true} bar={true} />`,
    /* tsx */ `<App foo={false} bar={false} />`,
    /* tsx */ `<App foo={false} bar={false} baz={false} />`,
  ],
});
