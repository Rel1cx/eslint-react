import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import { stringify } from "../../utils";
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
          messageId: "default",
          data: {
            json: stringify({
              name: "myRef",
              init: "React.useRef(42)",
            }),
          },
        },
        {
          messageId: "default",
          data: {
            json: stringify({
              name: "value",
              init: "myRef.current",
            }),
          },
        },
        {
          messageId: "default",
          data: {
            json: stringify({
              name: "myRef",
              init: "React.useRef(42)",
            }),
          },
        },
        {
          messageId: "default",
          data: {
            json: stringify({
              name: "current",
              init: "React.useRef(42)",
            }),
          },
        },
        {
          messageId: "default",
          data: {
            json: stringify({
              name: "value",
              init: "myRef.current",
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
