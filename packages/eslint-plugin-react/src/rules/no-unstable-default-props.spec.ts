import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
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

const MESSAGE_ID = "INVALID";

const expectedViolations = [
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "a",
            forbiddenType: "object expression",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "b",
            forbiddenType: "array expression",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "c",
            forbiddenType: "RegExp literal",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "d",
            forbiddenType: "arrow function expression",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "e",
            forbiddenType: "function expression",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "f",
            forbiddenType: "class expression",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "g",
            forbiddenType: "new expression",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "h",
            forbiddenType: "JSX element",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "i",
            forbiddenType: "call expression",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "j",
            forbiddenType: "call expression",
        },
    },
] as const;

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...allValid,
        dedent`
            const emptyFunction = () => {}

            function App({ foo = emptyFunction }) {
                return null
            }
        `,
        dedent`
            const emptyFunction = () => {}

            function App({ foo = emptyFunction, ...rest }) {
                return null
            }
        `,
        dedent`
              function App({ foo = 1, baz = 'hello' }) {
                return null
            }
        `,
        dedent`
              function App(props) {
                return null
            }
        `,
        dedent`
              function App(props) {
                  return null
              }
              App.defaultProps = {
                foo: () => {}
            }
        `,
        dedent`
              const App = () => {
                return null
            }
        `,
        dedent`
            const App = ({ foo = 1 }) => {
                return null
            }
        `,
        dedent`export default function NonComponent({ foo = {} }) {}`,
    ],
    invalid: [
        {
            code: dedent`
                function App({
                    a = {},
                    b = ['one', 'two'],
                    c = /regex/i,
                    d = () => {},
                    e = function() {},
                    f = class {},
                    g = new Thing(),
                    h = <Thing />,
                    i = Symbol('foo'),
                    j = unknownFunction()
                }) {
                    return null
                }
            `,
            errors: expectedViolations,
        },
        {
            code: dedent`
                const App = ({
                    a = {},
                    b = ['one', 'two'],
                    c = /regex/i,
                    d = () => {},
                    e = function() {},
                    f = class {},
                    g = new Thing(),
                    h = <Thing />,
                    i = Symbol('foo'),
                    j = unknownFunction()
                }) => {
                    return null
                }
            `,
            errors: expectedViolations,
        },
    ],
});
