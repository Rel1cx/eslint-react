import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-shorthand-boolean";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<input disabled={true} />`,
      errors: [{
        messageId: "default",
        data: { message: "Omit attribute value for 'disabled'." },
      }],
      output: tsx`<input disabled />`,
    },
    {
      code: tsx`<App foo={true} />`,
      errors: [{
        messageId: "default",
        data: { message: "Omit attribute value for 'foo'." },
      }],
      output: tsx`<App foo />`,
    },
    {
      code: tsx`<App foo={true} bar />`,
      errors: [{
        messageId: "default",
        data: { message: "Omit attribute value for 'foo'." },
      }],
      output: tsx`<App foo bar />`,
    },
    {
      code: tsx`<App foo={true} bar={false} />`,
      errors: [{
        messageId: "default",
        data: { message: "Omit attribute value for 'foo'." },
      }],
      output: tsx`<App foo bar={false} />`,
    },
    {
      code: tsx`<App foo={true} bar={false} baz />`,
      errors: [{
        messageId: "default",
        data: { message: "Omit attribute value for 'foo'." },
      }],
      output: tsx`<App foo bar={false} baz />`,
    },
    {
      code: tsx`<input disabled />`,
      errors: [{
        messageId: "default",
        data: { message: "Set attribute value for 'disabled'." },
      }],
      options: [-1],
      output: tsx`<input disabled={true} />`,
    },
  ],
  valid: [
    ...allValid,
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
