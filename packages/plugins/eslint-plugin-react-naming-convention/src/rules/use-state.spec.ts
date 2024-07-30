import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./use-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useState } from "react";

        function Component() {
          const [state, sseettState] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        data: {
          setterName: "setState",
          stateName: "state",
        },
        messageId: "USE_STATE",
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
        data: {
          setterName: "setState",
          stateName: "state",
        },
        messageId: "USE_STATE",
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
        data: {
          setterName: "setState",
          stateName: "state",
        },
        messageId: "USE_STATE",
      }],
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        function Component() {
          const [state, setstate] = useLocalStorageState(0);

          return <div />;
        }
      `,
      errors: [{
        data: {
          setterName: "setState",
          stateName: "state",
        },
        messageId: "USE_STATE",
      }],
      settings: {
        "react-x": {
          additionalHooks: {
            useState: ["useLocalStorageState"],
          },
        },
      },
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
  ],
});
