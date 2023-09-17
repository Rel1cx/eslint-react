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

const MESSAGE_ID = "UNSTABLE_DEFAULT_PROP";

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
        `
      function Foo({
        bar = emptyFunction,
      }) {
        return null;
      }
    `,
        `
      function Foo({
        bar = emptyFunction,
        ...rest
      }) {
        return null;
      }
    `,
        `
      function Foo({
        bar = 1,
        baz = 'hello',
      }) {
        return null;
      }
    `,
        `
      function Foo(props) {
        return null;
      }
    `,
        `
      function Foo(props) {
        return null;
      }

      Foo.defaultProps = {
        bar: () => {}
      }
    `,
        `
      const Foo = () => {
        return null;
      };
    `,
        `
      const Foo = ({bar = 1}) => {
        return null;
      };
    `,
        `
      export default function NotAComponent({foo = {}}) {}
    `,
    ],
    invalid: [
        {
            code: `
        function Foo({
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
          return null;
        }
      `,
            errors: expectedViolations,
        },
        {
            code: `
        const Foo = ({
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
          return null;
        }
      `,
            errors: expectedViolations,
        },
    ],
});
