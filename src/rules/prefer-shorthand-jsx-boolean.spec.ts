import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./prefer-shorthand-jsx-boolean";
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

const RULE_NAME = "prefer-shorthand-jsx-boolean";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        {
            code: `<App foo />;`,
            options: [
                {
                    rule: "never",
                },
            ],
        },
        {
            code: `<App foo bar={true} />;`,
            options: [
                {
                    rule: "always",
                    excepts: ["foo"],
                },
            ],
        },
        {
            code: `<App foo={true} />;`,
            options: [
                {
                    rule: "always",
                },
            ],
        },
        {
            code: `<App foo={true} bar />;`,
            options: [
                {
                    rule: "never",
                    excepts: ["foo"],
                },
            ],
        },
    ],
    invalid: [
        {
            code: `<App foo={true} />;`,
            // output: "<App foo />;",
            options: [
                {
                    rule: "never",
                },
            ],
            errors: [{ messageId: "OMIT_VALUE" }],
        },
        {
            code: `<App foo={true} bar={true} baz={true} />;`,
            // output: "<App foo bar baz={true} />;",
            options: [
                {
                    rule: "always",
                    excepts: ["foo", "bar"],
                },
            ],
            errors: [
                {
                    messageId: "OMIT_VALUE",
                },
                {
                    messageId: "OMIT_VALUE",
                },
            ],
        },
        {
            code: `<App foo={true} />;`,
            // output: "<App foo />;",
            errors: [{ messageId: "OMIT_VALUE" }],
        },
        {
            code: `<App foo = {true} />;`,
            // output: "<App foo />;",
            errors: [{ messageId: "OMIT_VALUE" }],
        },
        {
            code: `<App foo />;`,
            // output: "<App foo={true} />;",
            options: [
                {
                    rule: "always",
                },
            ],
            errors: [{ messageId: "SET_VALUE" }],
        },
        {
            code: `<App foo bar baz />;`,
            // output: "<App foo={true} bar={true} baz />;",
            options: [
                {
                    rule: "never",
                    excepts: ["foo", "bar"],
                },
            ],
            errors: [
                {
                    messageId: "SET_VALUE",
                },
                {
                    messageId: "SET_VALUE",
                },
            ],
        },
    ],
});
