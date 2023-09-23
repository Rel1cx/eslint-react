import * as validFunction from "../../test/common/valid/function";
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

const MESSAGE_ID = "INVALID";

const expectedViolations = [
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "a",
            forbiddenType: "object literal",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "b",
            forbiddenType: "array literal",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "c",
            forbiddenType: "regex literal",
        },
    },
    {
        messageId: MESSAGE_ID,
        data: {
            propName: "d",
            forbiddenType: "arrow function",
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
            forbiddenType: "Symbol literal",
        },
    },
] as const;

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...validFunction.all,
        `function App({ foo = emptyFunction }) { return null }`,
        `function App({ foo = emptyFunction, ...rest }) { return null }`,
        `function App({ foo = 1, baz = 'hello' }) { return null }`,
        `function App(props) { return null }`,
        `function App(props) { return null }; App.defaultProps = { foo: () => {} }`,
        `const App = () => { return null }`,
        `const App = ({ foo = 1 }) => { return null }`,
        `export default function NonComponent({ foo = {} }) {}`,
    ],
    invalid: [
        {
            code: `
    function App({
          a = {},
          b = ['one', 'two'],
          c = /regex/i,
          d = () => {},
          e = function() {},
          f = class {},
          g = new Thing(),
          h = <Thing />,
          i = Symbol('foo')
        }) {
          return null
        }
    `,
            errors: expectedViolations,
        },
        {
            code: `
    const App = ({
          a = {},
          b = ['one', 'two'],
          c = /regex/i,
          d = () => {},
          e = function() {},
          f = class {},
          g = new Thing(),
          h = <Thing />,
          i = Symbol('foo')
        }) => {
          return null
        }
      `,
            errors: expectedViolations,
        },
    ],
});
