import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import { stringify } from "@/utils/stringify";
import rule, { RULE_NAME } from "./is-from-ref";

function refError(name: string, init: string) {
  return {
    data: {
      json: stringify({ name, init }),
    },
    messageId: "default" as const,
  };
}

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
        refError("myRef", "React.useRef(42)"),
        refError("value", "myRef.current"),
        refError("myRef", "React.useRef(42)"),
        refError("current", "React.useRef(42)"),
        refError("value", "myRef.current"),
      ],
    },
    {
      code: tsx`
        import { useRef } from "react";

        const ref = useRef(null);
      `,
      errors: [refError("ref", "useRef(null)")],
    },
    {
      code: tsx`
        const ref = hooks.useRef(null);
      `,
      errors: [refError("ref", "hooks.useRef(null)")],
    },
    {
      code: tsx`
        function read(ref, inputRef) {
          const first = ref.value;
          const second = inputRef.value;
        }
      `,
      errors: [
        refError("first", "ref.value"),
        refError("second", "inputRef.value"),
      ],
    },
    {
      code: tsx`
        const sourceRef = useRef(null);
        const alias = sourceRef;
        const value = alias.current;
      `,
      errors: [
        refError("sourceRef", "useRef(null)"),
        refError("sourceRef", "useRef(null)"),
      ],
    },
    {
      code: tsx`
        const myRef = useRef(null);

        function read() {
          const myRef = { current: 0 };
          return myRef.current;
        }
      `,
      errors: [refError("myRef", "useRef(null)")],
    },
    {
      code: tsx`
        import React from "react";

        const ComponentRef = React.useRef(() => null);
        const element = <ComponentRef.current />;
      `,
      errors: [
        refError("ComponentRef", "React.useRef(() => null)"),
        refError("ComponentRef", "React.useRef(() => null)"),
        refError("current", "React.useRef(() => null)"),
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
    tsx`
      import React from "react";

      const createdRef = React.createRef();
      const factory = React.useRef;
      const similar = React.useRefValue();
    `,
    tsx`
      function read(reference, myref, holder, inputRef) {
        const fromReference = reference.current;
        const fromLowercase = myref.current;
        const fromNested = holder.inputRef.current;
        const fromOptional = inputRef?.current;
      }
    `,
    tsx`
      function read(sourceRef) {
        const alias = sourceRef;
        const value = alias.current;
      }
    `,
    tsx`
      let ref;
      ref = useRef(null);
    `,
  ],
});
