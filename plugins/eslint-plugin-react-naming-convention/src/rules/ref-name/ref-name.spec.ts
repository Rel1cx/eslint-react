import tsx from "dedent";

import { ruleTester } from "#/test";
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
    {
      code: tsx`
        import { useRef } from "react";
        const myREF = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      code: tsx`
        import { useRef } from "react";
        class Foo { value = useRef(0); }
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      code: tsx`
        import { useRef } from "react";
        obj.nested.value = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      code: tsx`
        import { useRef } from "react";
        const refs = { myRef: useRef(0) };
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
  ],
  valid: [
    tsx`
      import { useRef } from "react";
      const ref = useRef(0);
    `,
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
    tsx`
      import { useRef } from "react";
      useRef(null);
    `,
    tsx`
      import { useRef } from "react";
      export default useRef(null);
    `,
    tsx`
      import { useRef } from "react";
      const Ref = useRef(null);
    `,
    tsx`
      import { useRef } from "react";
      class Foo { myRef = useRef(null); }
    `,
    tsx`
      import { useRef } from "react";
      obj.nested.myRef = useRef();
    `,
    tsx`
      import { useRef } from "react";
      const [value] = [useRef(null)];
    `,
    tsx`
      import { useRef } from "react";
      const { value } = { value: useRef(null) };
    `,
    tsx`
      import { useRef } from "react";
      const value = useRef(null).current.value;
    `,
  ],
});
