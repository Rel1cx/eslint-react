import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./avoid-shorthand-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<><div /></>`,
      errors: [
        {
          messageId: "avoidShorthandFragment",
        },
      ],
    },
    {
      code: /* tsx */ `<><div /><div /></>`,
      errors: [
        {
          messageId: "avoidShorthandFragment",
        },
      ],
    },
    {
      code: /* tsx */ `<>text</>`,
      errors: [
        {
          messageId: "avoidShorthandFragment",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    "<React.Fragment><Foo /><Bar /></React.Fragment>",
    "<Fragment>foo<div /></Fragment>",
  ],
});
