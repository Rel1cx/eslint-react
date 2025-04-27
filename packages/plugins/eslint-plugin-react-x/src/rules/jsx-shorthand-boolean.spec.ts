import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<input disabled={true} />`,
      errors: [{
        messageId: "omitAttributeValue",
        data: { propName: "disabled" },
      }],
      output: tsx`<input disabled />`,
    },
    {
      code: tsx`<App foo={true} />`,
      errors: [{
        messageId: "omitAttributeValue",
        data: { propName: "foo" },
      }],
      output: tsx`<App foo />`,
    },
    {
      code: tsx`<App foo={true} bar />`,
      errors: [{
        messageId: "omitAttributeValue",
        data: { propName: "foo" },
      }],
      output: tsx`<App foo bar />`,
    },
  ],
  valid: [
    ...allValid,
    tsx`<input disabled />`,
    "<App foo />",
    "<App foo bar />",
    "<App foo bar={false} />",
    "<App foo bar={false} baz />",
  ],
});
