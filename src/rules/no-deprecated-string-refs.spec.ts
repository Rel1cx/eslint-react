import * as validFunction from "../../test/common/valid/function";
import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule, { RULE_NAME } from "./no-deprecated-string-refs";

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
        `function App() {
            return <div ref={ref} />
        }`,
        `function App() {
            return <div ref={() => {}} />;
        }`,
    ],
    invalid: [
        {
            code: `function App() {
            return <div ref="ref" />
        }`,
            errors: [{ messageId: "INVALID" }],
        },
    ],
});
