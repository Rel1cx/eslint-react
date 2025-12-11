import tsx from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./use-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Component() {
          useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidAssignment",
      }],
    },
    {
      code: tsx`
        function Component() {
          const data = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidAssignment",
      }],
    },
    {
      code: tsx`
        function Component() {
          const [state, setValue] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidSetterName",
      }],
    },
    {
      code: tsx`
        function Component() {
          const [state, set] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidSetterName",
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [state, sseettState] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidSetterName",
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [state, setstate] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidSetterName",
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [{foo, bar, baz}, foobarbaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidSetterName",
      }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [{foo, bar, baz}, setFooBar] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

          return <div />;
        }
      `,
      errors: [{
        messageId: "invalidSetterName",
      }],
    },
    {
      code: tsx`
        import { useState } from 'react';

        export function useTest(): [number, (n: number) => void] {
          const [count1, setCount] = useState(0);
          return [count1, setCount];
        }
      `,
      errors: [{
        messageId: "invalidSetterName",
      }],
    },
  ],
  valid: [
    ...allFunctions,
    tsx`
      import { useState } from "react";

      const [value] = useState(() => expensiveSetup());
    `,
    tsx`
      import { useState } from "react";

      function Component() {
        const [state, setState] = useState(0);

        return <div />;
      }
    `,
    tsx`
      import { useState } from "react";

      function Component() {
        const [{foo, bar, baz}, setFooBarBaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

        return <div />;
      }
    `,
    tsx`
      import { useState } from "react";

      function Component() {
        const [{foo, bar, baz}, set_foo_bar_baz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"})

        return <div />;
      }
    `,
    tsx`
      import { useState } from 'react';

      export function useTest(): [number, (n: number) => void] {
        const [count, setCount] = useState(0);
        return [count, setCount];
      }
    `,
    tsx`const [myCount, setMyCount] = useState(0);`,
    tsx`const [fooBarBaz, setFooBarBaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"});`,
    tsx`const [fooBarBaz, set_foo_bar_baz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"});`,
    tsx`const [foo_bar_baz, set_foo_bar_baz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"});`,
    tsx`const [FooBarBaz, setFooBarBaz] = useState({foo: "bbb", bar: "aaa", baz: "qqq"});`,
  ],
});
