import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./jsx-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<input disabled={true} />`,
      errors: [{
        data: { message: "Omit attribute value for 'disabled'." },
        messageId: "default",
      }],
      output: tsx`<input disabled />`,
    },
    {
      code: tsx`<App foo={true} />`,
      errors: [{
        data: { message: "Omit attribute value for 'foo'." },
        messageId: "default",
      }],
      output: tsx`<App foo />`,
    },
    {
      code: tsx`<App foo={true} bar />`,
      errors: [{
        data: { message: "Omit attribute value for 'foo'." },
        messageId: "default",
      }],
      output: tsx`<App foo bar />`,
    },
    {
      code: tsx`<App foo={true} bar={false} />`,
      errors: [{
        data: { message: "Omit attribute value for 'foo'." },
        messageId: "default",
      }],
      output: tsx`<App foo bar={false} />`,
    },
    {
      code: tsx`<App foo={true} bar={false} baz />`,
      errors: [{
        data: { message: "Omit attribute value for 'foo'." },
        messageId: "default",
      }],
      output: tsx`<App foo bar={false} baz />`,
    },
    {
      code: tsx`<input disabled />`,
      errors: [{
        data: { message: "Set attribute value for 'disabled'." },
        messageId: "default",
      }],
      options: [-1],
      output: tsx`<input disabled={true} />`,
    },
  ],
  valid: [
    tsx`<input disabled />`,
    "<App foo />",
    "<App foo bar />",
    "<App foo bar={false} />",
    "<App foo bar={false} baz />",
    {
      code: tsx`<App foo={true} />`,
      options: [-1],
    },
  ],
});
