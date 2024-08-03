import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>`,
      errors: [{ messageId: "noDangerouslySetInnerhtml" }],
    },
    {
      code: /* tsx */ `<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />`,
      errors: [{ messageId: "noDangerouslySetInnerhtml" }],
    },
    {
      code: /* tsx */ `
        const props = {
            dangerouslySetInnerHTML: { __html: "HTML" }
        }
        const div = <div {...props}>Children</div>
      `,
      errors: [{ messageId: "noDangerouslySetInnerhtml" }],
    },
    {
      code: /* tsx */ `
        const props = {
            children: "Children",
            dangerouslySetInnerHTML: { __html: "HTML" }
        }
        const div = <div {...props} />
      `,
      errors: [{ messageId: "noDangerouslySetInnerhtml" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</App>',
      errors: [{ messageId: "noDangerouslySetInnerhtml" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
      errors: [{ messageId: "noDangerouslySetInnerhtml" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}> </App>',
      errors: [{ messageId: "noDangerouslySetInnerhtml" }],
    },
  ],
  valid: [
    ...allValid,
    "<div {...props} />",
  ],
});
