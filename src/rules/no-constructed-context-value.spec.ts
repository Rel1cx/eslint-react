import * as validFunction from "../../test/common/valid/function";
import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule, { RULE_NAME } from "./no-constructed-context-value";

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
                const foo = useMemo(() => ({}), [])

                return <Context.Provider value={foo}></Context.Provider>
            }`,
        `function App() {
                const foo = useMemo(() => [], [])

                return <Context.Provider value={foo}></Context.Provider>
            }`,
        `const foo = {}
         function App() {
             return <Context.Provider value={foo}></Context.Provider>;
         }`,
        `const foo = []
         function App() {
             return <Context.Provider value={foo}></Context.Provider>;
         }`,
        `const foo = new Object()
         function App() {
             return <Context.Provider value={foo}></Context.Provider>;
         }`,
        `const foo = () => {}
         function App() {
             return <Context.Provider value={foo}></Context.Provider>;
         }`,
    ],
    invalid: [
        {
            code: `function App() {
                   const foo = {}

                   return <Context.Provider value={foo}></Context.Provider>;
                }`,
            errors: [{ messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER" }],
        },
        {
            code: `function App() {
                const foo = []

                return <Context.Provider value={foo}></Context.Provider>
            }`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER",
                },
            ],
        },
        {
            code: `function App() {
                const foo = new Object();

                return <Context.Provider value={foo}></Context.Provider>
            }`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER",
                },
            ],
        },
        {
            code: `function App() {
                const foo = () => {}

                return <Context.Provider value={foo}></Context.Provider>
            }`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_FUNCTION",
                },
            ],
        },
        {
            code: `function App() {
                const foo = {
                    bar: () => {}
                }

                return <Context.Provider value={foo.bar}></Context.Provider>
            }`,
            errors: [
                {
                    messageId: "CONTEXT_VALUE_CONSTRUCTION_IDENTIFIER",
                },
            ],
        },
    ],
});
