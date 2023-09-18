import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./no-deprecated-string-refs";
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

const RULE_NAME = "no-deprecated-string-refs";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        `function Foo() {
            return <div ref={ref} />;
        }`,
        `function Foo() {
            return <div ref={() => {}} />;
        }`,
    ],
    invalid: [
        {
            code: `function Foo() {
            return <div ref="ref" />;
        }`,
            errors: [{ messageId: "DEPRECATED_STRING_REF" }],
        },
    ],
});
