import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml-with-children";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<div>Children</div>",
    "<div {...props} />",
    '<div dangerouslySetInnerHTML={{ __html: "HTML" }} />',
    '<div children="Children" />',
    dedent`
      const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
      const div = <div {...props} />
    `,
    dedent`
      const moreProps = { className: "eslint" }
      const props = { children: "Children", ...moreProps }
      const div = <div {...props} />
    `,
    dedent`
      const otherProps = { children: "Children" }
      const { a, b, ...props } = otherProps
      const div = <div {...props} />
    `,
    "<App>Children</App>",
    '<App dangerouslySetInnerHTML={{ __html: "HTML" }} />',
    '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>\n</App>',
    dedent`
      React.createElement("div", {
          dangerouslySetInnerHTML: { __html: "HTML" }
      })
    `,
    'React.createElement("div", {}, "Children")',
    dedent`
      React.createElement("App", {
          dangerouslySetInnerHTML: { __html: "HTML" }
      })
    `,
    'React.createElement("App", {}, "Children")',
    "<App {...undefined}>Children</App>",
    'React.createElement("App", undefined, "Children")',
    `const props = { ...props, scratch: {mode: 'edit'} }
        const component = shallow(<TaskEditableTitle {...props} />)`,
  ],
  invalid: [
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: `const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
            ;<div {...props}>Children</div>`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: `const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } }
            ;<div {...props} />`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</App>',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}> </App>',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: 'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children")',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: 'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children" })',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: 'React.createElement("App", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children")',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: 'React.createElement("App", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children" })',
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: `const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props, "Children")`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: `const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props)`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
    {
      code: `
            const moreProps = { children: "Children" }
            const otherProps = { ...moreProps }
            const props = { ...otherProps, dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props)`,
      errors: [{ messageId: "NO_DANGEROUSLY_SET_INNERHTML_WITH_CHILDREN" }],
    },
  ],
});
