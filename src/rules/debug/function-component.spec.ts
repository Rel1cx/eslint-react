import RuleTester, { getFixturesRootDir } from "../../../test/rule-tester";
import rule, { RULE_NAME } from "./function-component";
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
        `function foo() { return 'bar'; }`,
        // TODO: support skipping render functions, they are not components
        `function renderItem (name: string) { return <div>{name}</div> };`,
        `function Foo() { const bar = <div>foo</div>; }`,
    ],
    invalid: [
        {
            code: `function Foo() { return <div>foo</div>; }`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const Foo = () => <div>foo</div>;`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const Foo = React.memo(() => <div>foo</div>);`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const Foo = React.memo(function Foo() { return <div>foo</div>; });`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const Foo = React.forwardRef(() => <div>foo</div>);`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const Foo = () => React.createElement('div', null, 'foo');`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
    ],
});
