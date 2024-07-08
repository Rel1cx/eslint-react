import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: /* tsx */ `<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: /* tsx */ `
        const props = {
            dangerouslySetInnerHTML: { __html: "HTML" }
        }
        const div = <div {...props}>Children</div>
      `,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: /* tsx */ `
        const props = {
            children: "Children",
            dangerouslySetInnerHTML: { __html: "HTML" }
        }
        const div = <div {...props} />
      `,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</App>',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}> </App>',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: 'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children")',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: 'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children" })',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: 'React.createElement("App", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children")',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: 'React.createElement("App", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children" })',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: /* tsx */ `
        const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
        React.createElement("div", props, "Children")
      `,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: /* tsx */ `
        const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } }
        React.createElement("div", props)
      `,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: /* tsx */ `
        const moreProps = { children: "Children" }
        const otherProps = { ...moreProps }
        const props = { ...otherProps, dangerouslySetInnerHTML: { __html: "HTML" } }
        React.createElement("div", props)
      `,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
  ],
  valid: [
    ...allValid,
    "<div {...props} />",
  ],
});
