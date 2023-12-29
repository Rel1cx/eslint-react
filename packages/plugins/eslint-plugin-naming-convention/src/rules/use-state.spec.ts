import dedent from "dedent";

import { allFunctions, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./use-state";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allFunctions,
    dedent`
      import { useState } from "react";

      function Component() {
        const [state, setState] = useState(0);

        return <div />;
      }
    `,
    dedent`
      import { useState } from "react";

      function Component() {
        const [{foo, bar, baz}, setFooBarBaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

        return <div />;
      }
    `,
    dedent`
      import { useState } from "react";

      function Component() {
        const [{foo, bar, baz}, set_foo_bar_baz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

        return <div />;
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { useState } from "react";

        function Component() {
          const [state, sseettState] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "USE_STATE",
        data: {
          setterName: "setState",
          stateName: "state",
        },
      }],
    },
    {
      code: dedent`
        import { useState } from "react";

        function Component() {
          const [state, setstate] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "USE_STATE",
        data: {
          setterName: "setState",
          stateName: "state",
        },
      }],
    },
    {
      code: dedent`
        import { useState } from "react";

        function Component() {
          const [{foo, bar, baz}, foobarbaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

          return <div />;
        }
      `,
      errors: [{
        messageId: "USE_STATE",
        data: {
          setterName: "setState",
          stateName: "state",
        },
      }],
    },
    {
      code: dedent`
        import { useState } from "react";

        function Component() {
          const [state, setstate] = useLocalStorageState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "USE_STATE",
        data: {
          setterName: "setState",
          stateName: "state",
        },
      }],
      settings: {
        eslintReact: {
          reactHooks: {
            alias: {
              useState: ["useLocalStorageState"],
            },
          },
        },
      },
    },
  ],
});
