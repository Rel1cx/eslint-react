import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unstable-default-props";

const MESSAGE_ID = "NO_UNSTABLE_DEFAULT_PROPS";

const expectedViolations = [
  {
    data: {
      forbiddenType: "object expression",
      propName: "a",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "array expression",
      propName: "b",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "RegExp literal",
      propName: "c",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "arrow function expression",
      propName: "d",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "function expression",
      propName: "e",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "class expression",
      propName: "f",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "new expression",
      propName: "g",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "JSX element",
      propName: "h",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "call expression",
      propName: "i",
    },
    messageId: MESSAGE_ID,
  },
  {
    data: {
      forbiddenType: "call expression",
      propName: "j",
    },
    messageId: MESSAGE_ID,
  },
] as const;

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function App({ foo = [], ...rest }) {
            return null
        }
      `,
      errors: [{
        data: {
          forbiddenType: "array expression",
          propName: "foo",
        },
        messageId: MESSAGE_ID,
      }],
    },
    {
      code: /* tsx */ `
        function App({ foo = {}, ...rest }) {
            return null
        }
      `,
      errors: [{
        data: {
          forbiddenType: "object expression",
          propName: "foo",
        },
        messageId: MESSAGE_ID,
      }],
    },
    {
      code: /* tsx */ `
        function App(props) {
            const { foo = [] } = props
            return null
        }
      `,
      errors: [{
        data: {
          forbiddenType: "array expression",
          propName: "foo",
        },
        messageId: MESSAGE_ID,
      }],
    },
    {
      code: /* tsx */ `
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
      code: /* tsx */ `
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
  valid: [
    ...allValid,
    /* tsx */ `
      const emptyFunction = () => {}

      function App({ foo = emptyFunction }) {
          return null
      }
    `,
    /* tsx */ `
      const emptyFunction = () => {}

      function App({ foo = emptyFunction, ...rest }) {
          return null
      }
    `,
    /* tsx */ `
        function App({ foo = 1, baz = 'hello' }) {
          return null
      }
    `,
    /* tsx */ `
        function App(props) {
          return null
      }
    `,
    /* tsx */ `
        function App(props) {
            return null
        }
        App.defaultProps = {
          foo: () => {}
      }
    `,
    /* tsx */ `
        const App = () => {
          return null
      }
    `,
    /* tsx */ `
      const App = ({ foo = 1 }) => {
          return null
      }
    `,
    /* tsx */ `
      const emptyArray = [];
      function Component(props) {
        const { items = emptyArray } = props;

        return <div>{items}</div>;
      }
    `,
    /* tsx */ `export default function NonComponent({ foo = {} }) {}`,
  ],
});
