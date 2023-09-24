import { allNonComponent } from "../../../test/common/valid/function";
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
    valid: allNonComponent,
    invalid: [
        {
            code: `function App() { return <div>foo</div> }`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const App = () => <div>foo</div>`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const App = React.memo(() => <div>foo</div>)`,
            errors: [{ messageId: "FUNCTION_COMPONENT_ANONYMOUS" }],
        },
        {
            code: `const App = React.memo(function App() { return <div>foo</div> })`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
        {
            code: `const App = React.forwardRef(() => <div>foo</div>)`,
            errors: [{ messageId: "FUNCTION_COMPONENT_ANONYMOUS" }],
        },
        {
            code: `const App = () => React.createElement('div', null, 'foo')`,
            errors: [{ messageId: "FUNCTION_COMPONENT" }],
        },
    ],
});
