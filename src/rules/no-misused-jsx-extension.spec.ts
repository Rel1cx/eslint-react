import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./no-misused-jsx-extension";

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

const RULE_NAME = "no-misused-jsx-extension";

const withJSXElement = `function App() { return <div><div /></div> }`;
const withJSXFragment = `function App() { return <></> }`;
const withoutJSX = "";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            filename: "react.tsx",
            code: withJSXElement,
        },
        {
            filename: "react.tsx",
            code: withJSXFragment,
        },
        {
            filename: "file.ts",
            code: withoutJSX,
            // options: [{ allow: "as-needed" }],
        },
    ],
    invalid: [
        {
            filename: "react.tsx",
            code: withoutJSX,
            errors: [
                {
                    messageId: "MISUSED_JSX_EXTENSION",
                },
            ],
        },
    ],
});
