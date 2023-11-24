import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<div {...props} />",
  ],
  invalid: [
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: dedent`
        const props = {
            dangerouslySetInnerHTML: { __html: "HTML" }
        }
        const div = <div {...props}>Children</div>
      `,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: dedent`
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
      code: `const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props, "Children")`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: `const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props)`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
    {
      code: dedent`
        const moreProps = { children: "Children" }
        const otherProps = { ...moreProps }
        const props = { ...otherProps, dangerouslySetInnerHTML: { __html: "HTML" } }
        React.createElement("div", props)
      `,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML" }],
    },
  ],
});
