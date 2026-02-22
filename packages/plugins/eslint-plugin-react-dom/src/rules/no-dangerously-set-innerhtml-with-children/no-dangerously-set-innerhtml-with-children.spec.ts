import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml-with-children";

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
        const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
        ;<div {...props}>Children</div>
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } }
        ;<div {...props} />
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<App dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</App>`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<App dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<App dangerouslySetInnerHTML={{ __html: "HTML" }}> </App>`,
      errors: [{ messageId: "default" }],
    },
    {
      // https://github.com/Rel1cx/eslint-react/issues/1163
      code: tsx`
        function Abc() {
          return (
            <>
              {/* Error on div 1: A DOM component cannot use both children and 'dangerouslySetInnerHTML'. eslint @eslint-react/dom/no-dangerously-set-innerhtml-with-children */}
              <div dangerouslySetInnerHTML={{ __html: 'Hello World' }}>
                Goodbye World
              </div>

              {/* No error on div 2 */}
              <div dangerouslySetInnerHTML={{ __html: 'Hello World' }}>
                <p>Goodbye World</p>
              </div>
            </>
          );
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    ...allValid,
    "<div>Children</div>",
    "<div {...props} />",
    '<div dangerouslySetInnerHTML={{ __html: "HTML" }} />',
    '<div children="Children" />',
    tsx`
      const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
      const div = <div {...props} />
    `,
    tsx`
      const moreProps = { className: "eslint" }
      const props = { children: "Children", ...moreProps }
      const div = <div {...props} />
    `,
    tsx`
      const otherProps = { children: "Children" }
      const { a, b, ...props } = otherProps
      const div = <div {...props} />
    `,
    "<App>Children</App>",
    '<App dangerouslySetInnerHTML={{ __html: "HTML" }} />',
    '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>\n</App>',
    "<App {...undefined}>Children</App>",
  ],
});
