import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const props = {
            dangerouslySetInnerHTML: { __html: "HTML" }
        }
        const div = <div {...props}>Children</div>
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const props = {
            children: "Children",
            dangerouslySetInnerHTML: { __html: "HTML" }
        }
        const div = <div {...props} />
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</App>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}> </App>',
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    ...allValid,
    "<div {...props} />",
  ],
});
