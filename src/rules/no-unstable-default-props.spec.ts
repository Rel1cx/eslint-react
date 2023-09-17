import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./no-unstable-default-props";

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

const RULE_NAME = "no-unstable-default-props";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        `function Foo({ bar = "baz" }) {
            return <div>{bar}</div>;
        }`,
        `const Foo = ({ bar = "baz" }) => {
            return <div>{bar}</div>;
        };`,
        `const Foo = ({ bar = "baz" }) => <div>{bar}</div>;`,
    ],
    invalid: [
        {
            code: `function Foo({ bar = {a: 1} }) {
            return <div>{bar}</div>;
        }`,
            errors: [
                {
                    messageId: "UNSTABLE_DEFAULT_PROP",
                },
            ],
        },
    ],
});
