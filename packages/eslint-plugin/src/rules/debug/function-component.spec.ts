import dedent from "dedent";

import { allFunctions } from "../../../test/common/valid/functions";
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
        ...allFunctions,
    ],
    invalid: [
        {
            code: dedent`
                function App() {
                    return <div>foo</div>
                }
            `,
            errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App" } }],
        },
        {
            code: "const App = () => <div>foo</div>",
            errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App" } }],
        },
        {
            code: "const App = React.memo(() => <div>foo</div>)",
            errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "anonymous" } }],
        },
        {
            code: dedent`
                const App = React.memo(function App() {
                    return <div>foo</div>
                })
            `,
            errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App" } }],
        },
        {
            code: "const App = React.forwardRef(() => <div>foo</div>)",
            errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "anonymous" } }],
        },
        {
            code: "const App = () => React.createElement('div', null, 'foo')",
            errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App" } }],
        },
    ],
});
