import tsx from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./ref-name";

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
    {
      code: tsx`
        refs.myValue = useRef();
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
    tsx`
      const notARef = someOtherFunction();
    `,
    tsx`
      const obj = useRef({}).current;
    `,
    tsx`
      const obj = React.useRef({}).current;
    `,
    tsx`
      const useOnce = <T,>(fn: () => T) => (useRef<{ value: T }>().current ??= { value: fn() }).value;
    `,
    tsx`
      const useOnce = <T,>(fn: () => T) => (React.useRef<{ value: T }>().current ??= { value: fn() }).value;
    `,
    tsx`
      refs.myRef = useRef();
    `,
  ],
});
