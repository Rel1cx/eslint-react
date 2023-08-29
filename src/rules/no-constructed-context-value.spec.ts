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

const RULE_NAME = "no-constructed-context-value";

ruleTester.run(RULE_NAME, rule, {
    valid: [],
    invalid: [],
});
