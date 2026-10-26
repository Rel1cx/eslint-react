import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>`,
      errors: [{ messageId: "default" }],
    },
    // Self-closing host element
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }} />',
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />`,
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
    // Custom host-like element
    {
      code: '<my-element dangerouslySetInnerHTML={{ __html: "HTML" }} />',
      errors: [{ messageId: "default" }],
    },
    // Nested inside JSX attribute value
    {
      code: tsx`<App content={<div dangerouslySetInnerHTML={{ __html: "HTML" }} />} />`,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    "<div />",
    "<App />",
    // Spread props are not resolved
    "<div {...props} />",
    tsx`
      const props = { dangerouslySetInnerHTML: { __html: "HTML" } };
      const div = <div {...props} />;
    `,
    tsx`<div>{dangerouslySetInnerHTML}</div>`,
    tsx`
      declare const dangerouslySetInnerHTML: string;
      const div = <div {...{ [dangerouslySetInnerHTML]: { __html: "HTML" } }} />;
    `,
  ],
});
