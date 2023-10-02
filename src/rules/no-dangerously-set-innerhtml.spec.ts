import dedent from "dedent";

import * as validFunction from "../../test/common/valid/function";
import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: rootDir,
    },
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...validFunction.all,
        "<div {...props} />",
    ],
    invalid: [
        {
            code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
              const props = {
                  dangerouslySetInnerHTML: { __html: "HTML" }
              }
              const div = <div {...props}>Children</div>
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
              const props = {
                  children: "Children",
                  dangerouslySetInnerHTML: { __html: "HTML" }
              }
              const div = <div {...props} />
            `,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</App>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<App dangerouslySetInnerHTML={{ __html: "HTML" }}> </App>',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: 'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children")',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: 'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children" })',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: 'React.createElement("App", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children")',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: 'React.createElement("App", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children" })',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: `const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props, "Children")`,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: `const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props)`,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: dedent`
              const moreProps = { children: "Children" }
              const otherProps = { ...moreProps }
              const props = { ...otherProps, dangerouslySetInnerHTML: { __html: "HTML" } }
              React.createElement("div", props)
            `,
            errors: [{ messageId: "INVALID" }],
        },
    ],
});
