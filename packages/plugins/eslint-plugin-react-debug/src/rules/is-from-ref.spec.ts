import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import { stringify } from "../utils";
import rule, { RULE_NAME } from "./is-from-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React from "react";

        function MyComponent() {
          const myRef = React.useRef(42);
          const value = myRef.current
          return <div>{value}</div>;
        }
      `,
      errors: [
        {
          messageId: "isFromRef",
          data: {
            json: stringify({
              name: "myRef",
            }),
          },
        },
        {
          messageId: "isFromRef",
          data: {
            json: stringify({
              name: "value",
            }),
          },
        },
        {
          messageId: "isFromRef",
          data: {
            json: stringify({
              name: "myRef",
            }),
          },
        },
        {
          messageId: "isFromRef",
          data: {
            json: stringify({
              name: "current",
            }),
          },
        },
        {
          messageId: "isFromRef",
          data: {
            json: stringify({
              name: "value",
            }),
          },
        },
      ],
    },
  ],
  valid: [
    tsx`
      import React from "react";

      function MyComponent() {
        const [state, setState] = React.useState(0);
        const value = state + 1;
        return <div>{value}</div>;
      }
    `,
  ],
});
