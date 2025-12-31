import tsx from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./use-ref-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { useRef } from "react";
        const count = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      code: tsx`
        import { useRef } from "react";
        const input = useRef<HTMLInputElement>(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      code: tsx`
        import React from "react";
        const count = React.useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      code: tsx`
        import React from "react";
        const input = React.useRef<HTMLInputElement>(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      code: tsx`
        const value = useRef(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
  ],
  valid: [
    ...allFunctions,
    tsx`
      import { useRef } from "react";
      const countRef = useRef(0);
    `,
    tsx`
      import React from "react";
      const inputRef = React.useRef<HTMLInputElement>(null);
    `,
    tsx`
      const valueRef = useRef(null);
    `,
  ],
});
