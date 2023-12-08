import dedent from "dedent";

import { allFunctions, defaultParserOptions, RuleTester } from "../../../../test";
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
  ],
});
