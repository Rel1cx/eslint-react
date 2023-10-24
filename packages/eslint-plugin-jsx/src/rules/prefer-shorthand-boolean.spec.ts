import { allValid } from "@eslint-react/shared";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./prefer-shorthand-boolean";

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
        "<App foo />",
        "<App foo bar />",
        "<App foo bar={false} />",
        "<App foo bar={false} baz />",
    ],
    invalid: [
        {
            code: "<App foo={true} />",
            errors: [{ messageId: "INVALID" }],
        },
        {
            code: "<App foo={true} bar />",
            errors: [{ messageId: "INVALID" }],
        },
    ],
});
