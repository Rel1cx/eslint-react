import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./no-danger-with-children";

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

const RULE_NAME = "no-danger-with-children";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        "<div>Children</div>;",
        "<div {...props} />;",
        '<div dangerouslySetInnerHTML={{ __html: "HTML" }} />;',
        '<div children="Children" />;',
        `const props = { dangerouslySetInnerHTML: { __html: "HTML" } };
        <div {...props} />;`,
        `const moreProps = { className: "eslint" };
        const props = { children: "Children", ...moreProps };
        <div {...props} />;`,
        `const otherProps = { children: "Children" };
        const { a, b, ...props } = otherProps;
        <div {...props} />;`,
        "<Hello>Children</Hello>;",
        '<Hello dangerouslySetInnerHTML={{ __html: "HTML" }} />;',
        '<Hello dangerouslySetInnerHTML={{ __html: "HTML" }}>\n</Hello>;',
        'React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } });',
        'React.createElement("div", {}, "Children");',
        'React.createElement("Hello", { dangerouslySetInnerHTML: { __html: "HTML" } });',
        'React.createElement("Hello", {}, "Children");',
        "<Hello {...undefined}>Children</Hello>;",
        'React.createElement("Hello", undefined, "Children");',
        `const props = {...props, scratch: {mode: 'edit'}};
        const component = shallow(<TaskEditableTitle {...props} />);`,
    ],
    invalid: [
        {
            code: `<div dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</div>`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: '<div dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `const props = { dangerouslySetInnerHTML: { __html: "HTML" } };
            <div {...props}>Children</div>`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } };
            <div {...props} />`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `<Hello dangerouslySetInnerHTML={{ __html: "HTML" }}>Children</Hello>`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: '<Hello dangerouslySetInnerHTML={{ __html: "HTML" }} children="Children" />',
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: '<Hello dangerouslySetInnerHTML={{ __html: "HTML" }}> </Hello>',
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children");`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `React.createElement("div", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children",});`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `React.createElement("Hello", { dangerouslySetInnerHTML: { __html: "HTML" } }, "Children");`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code:
                `React.createElement("Hello", { dangerouslySetInnerHTML: { __html: "HTML" }, children: "Children",});`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `const props = { dangerouslySetInnerHTML: { __html: "HTML" } };
            React.createElement("div", props, "Children");`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `const props = { children: "Children", dangerouslySetInnerHTML: { __html: "HTML" } };
            React.createElement("div", props);`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
        {
            code: `
            const moreProps = { children: "Children" };
            const otherProps = { ...moreProps };
            const props = { ...otherProps, dangerouslySetInnerHTML: { __html: "HTML" } };
            React.createElement("div", props);`,
            errors: [{ messageId: "DANGER_WITH_CHILDREN" }],
        },
    ],
});
