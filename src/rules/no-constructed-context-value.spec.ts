/* eslint-disable eslint-plugin/test-case-shorthand-strings */
import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./no-constructed-context-value";

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
    valid: [
        {
            code: `const Component = () => {
                const foo = useMemo(() => ({}), []);

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        },
        {
            code: `const Component = () => {
                const foo = useMemo(() => [], []);

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        },
        {
            code: `const foo = {};
                const Component = () => {

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        },
    ],
    invalid: [
        {
            code: `function Component() { const foo = {}; return (<Context.Provider value={foo}></Context.Provider>) }`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER",
                },
            ],
        },
        {
            code: `const Component = () => {
                const foo = [];
                return <Context.Provider value={foo}></Context.Provider>;
            };`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER",
                },
            ],
        },
        {
            code: `const Component = () => {
                const foo = new Object();
                return <Context.Provider value={foo}></Context.Provider>;
            };`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER",
                },
            ],
        },
        {
            code: `const Component = () => {
                const foo = () => {};
                return <Context.Provider value={foo}></Context.Provider>;
            };`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_FUNCTION",
                },
            ],
        },
    ],
});
