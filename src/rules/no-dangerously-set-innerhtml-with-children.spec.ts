import dedent from "dedent";

import { allValid } from "../../test/common/valid";
import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule, { RULE_NAME } from "./no-dangerously-set-innerhtml-with-children";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: rootDir,
    },
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
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: `const props = { dangerouslySetInnerHTML: { __html: "HTML" } }
            ;<div {...props}>Children</div>`,
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: `const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } }
            ;<div {...props} />`,
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
            code: `
            const moreProps = { children: "Children" }
            const otherProps = { ...moreProps }
            const props = { ...otherProps, dangerouslySetInnerHTML: { __html: "HTML" } }
            React.createElement("div", props)`,
            errors: [{ messageId: "INVALID" }],
        },
    ],
});
