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
        `const Component = () => <div></div>;`,
        `const Component = () => {
                const foo = useMemo(() => ({}), []);

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        `const Component = () => {
                const foo = useMemo(() => [], []);

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        `const foo = {};
                const Component = () => {

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        `const foo = [];
                const Component = () => {

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        `const foo = new Object();
                const Component = () => {

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        `const foo = () => {};
                const Component = () => {

                return <Context.Provider value={foo}></Context.Provider>;
            };`,
        `const Component = () => {
                const foo = useMemo(() => ({}), []);
                return <Context.Provider value={foo}></Context.Provider>;
            };`,
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
        {
            code: `const Component = () => {
                const foo = {
                    bar: () => {},
                }

                return <Context.Provider value={foo.bar}></Context.Provider>;
            };`,
            errors: [
                {
                    // TODO: emit error as "CONTEXT_VALUE_CONSTRUCTION_FUNCTION"
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER",
                },
            ],
        },
    ],
});
