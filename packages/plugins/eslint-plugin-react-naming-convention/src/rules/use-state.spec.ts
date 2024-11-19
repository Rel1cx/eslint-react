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
        messageId: "useState",
        data: {
          setterName: "setState",
          stateName: "state",
        },
      }],
    },
    {
      code: /* tsx */ `
        function Component() {
          const [state, setValue] = useState(0);

          return <div />;
        }
      `,
      errors: [{
        messageId: "useState",
        data: {
          setterName: "setState",
          stateName: "state",
        },
      }],
      settings: {
        "react-x": {
          strictImportCheck: false,
        },
      },
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
        messageId: "useState",
        data: {
          setterName: "setState",
          stateName: "state",
        },
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
        messageId: "useState",
        data: {
          setterName: "setState",
          stateName: "state",
        },
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
        messageId: "useState",
        data: {
          setterName: "setState",
          stateName: "state",
        },
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
        messageId: "useState",
        data: {
          setterName: "setState",
          stateName: "state",
        },
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
    {
      code: /* tsx */ `
        function Component() {
          const [state, setValue] = useState(0);

          return <div />;
        }
      `,
      settings: {
        "react-x": {
          strictImportCheck: true,
        },
      },
    },
  ],
});
