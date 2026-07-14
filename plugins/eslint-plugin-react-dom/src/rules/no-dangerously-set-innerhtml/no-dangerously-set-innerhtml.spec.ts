import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
    // Self-closing host element
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }} />',
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
    "<div {...props} />",
    "<div />",
    "<App />",
    tsx`<div>{dangerouslySetInnerHTML}</div>`,
    // Computed identifier key in spread props: the property name is the runtime value of the variable
    tsx`
      declare const dangerouslySetInnerHTML: string;
      const div = <div {...{ [dangerouslySetInnerHTML]: { __html: "HTML" } }} />;
    `,
    // Computed string literal keys in spread props are not statically resolved
    tsx`<div {...{ ["dangerouslySetInnerHTML"]: { __html: "HTML" } }} />`,
  ],
});
