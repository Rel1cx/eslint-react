import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./use-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function Component() {
          const [state, setValue] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "badValueOrSetterName",
      }],
    },
    {
      code: /* tsx */ `
        function Component() {
          const [state, set] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "badValueOrSetterName",
      }],
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        function Component() {
          const [state, sseettState] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "badValueOrSetterName",
      }],
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        function Component() {
          const [state, setstate] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "badValueOrSetterName",
      }],
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        function Component() {
          const [{foo, bar, baz}, foobarbaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

          return <div />;
        }
      `,
      errors: [{
        messageId: "badValueOrSetterName",
      }],
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        function Component() {
          const [{foo, bar, baz}, setFooBar] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

          return <div />;
        }
      `,
      errors: [{
        messageId: "badValueOrSetterName",
      }],
    },
    {
      code: /* tsx */ `
        import { useState } from 'react';

        export function useTest(): [number, (n: number) => void] {
          const [count1, setCount] = useState(0);
          return [count1, setCount];
        }
      `,
      errors: [{
        messageId: "badValueOrSetterName",
      }],
    },
  ],
  valid: [
    ...allFunctions,
    /* tsx */ `
      import { useState } from "react";

      function Component() {
        const [state, setState] = useState(0);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useState } from "react";

      function Component() {
        const [{foo, bar, baz}, setFooBarBaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

        return <div />;
      }
    `,
    /* tsx */ `
      import { useState } from "react";

      function Component() {
        const [{foo, bar, baz}, set_foo_bar_baz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

        return <div />;
      }
    `,
    /* tsx */ `
      import { useState } from 'react';

      export function useTest(): [number, (n: number) => void] {
        const [count, setCount] = useState(0);
        return [count, setCount];
      }
    `,
  ],
});
