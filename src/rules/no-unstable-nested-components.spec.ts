import { allValid } from "../../test/common/valid";
import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule, { RULE_NAME } from "./no-unstable-default-props";

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
        ...allValid,
        // TODO: add more valid cases
    ],
    invalid: [
        // TODO: add more invalid cases
    ],
});
