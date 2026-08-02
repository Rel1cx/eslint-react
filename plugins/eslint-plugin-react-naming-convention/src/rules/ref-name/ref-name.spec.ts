import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./ref-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Variable declarations with invalid ref names
    {
      name: "Name without 'Ref' suffix",
      code: tsx`
        import { useRef } from "react";
        const count = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Name without 'Ref' suffix with generic type argument",
      code: tsx`
        import { useRef } from "react";
        const input = useRef<HTMLInputElement>(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Name without 'Ref' suffix via React namespace",
      code: tsx`
        import React from "react";
        const count = React.useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Name without 'Ref' suffix with generic type argument via React namespace",
      code: tsx`
        import React from "react";
        const input = React.useRef<HTMLInputElement>(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Name without 'Ref' suffix without import",
      code: tsx`
        const value = useRef(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Name with all-caps 'REF' suffix",
      code: tsx`
        import { useRef } from "react";
        const myREF = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "All-caps name 'REF'",
      code: tsx`
        import { useRef } from "react";
        const REF = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Single-letter uppercase name",
      code: tsx`
        import { useRef } from "react";
        const R = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Single-letter lowercase name",
      code: tsx`
        import { useRef } from "react";
        const r = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Leading underscore in name",
      code: tsx`
        import { useRef } from "react";
        const _ref = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Multiple declarators with an invalid ref name",
      code: tsx`
        import { useRef } from "react";
        const ref = useRef(null), value = useRef(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    // Other assignment targets
    {
      name: "Member expression assignment with invalid ref name",
      code: tsx`
        refs.myValue = useRef();
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Class property with invalid ref name",
      code: tsx`
        import { useRef } from "react";
        class Foo { value = useRef(0); }
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Nested member expression assignment with invalid ref name",
      code: tsx`
        import { useRef } from "react";
        obj.nested.value = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Variable initialized with an object literal containing useRef",
      code: tsx`
        import { useRef } from "react";
        const refs = { myRef: useRef(0) };
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Assignment after declaration with invalid ref name",
      code: tsx`
        import { useRef } from "react";
        let value;
        value = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Chained assignment with invalid ref name",
      code: tsx`
        import { useRef } from "react";
        a = b = useRef(0);
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Computed member expression assignment with invalid ref name",
      code: tsx`
        refs[value] = useRef(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
      output: null,
    },
    // Indirect useRef calls
    {
      name: "Conditional expression initializer with invalid ref name",
      code: tsx`
        import { useRef } from "react";
        const value = condition ? useRef(0) : { current: null };
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "Logical expression initializer with invalid ref name",
      code: tsx`
        import { useRef } from "react";
        const value = useRef(0) || { current: null };
      `,
      errors: [{ messageId: "invalidRefName" }],
    },
    {
      name: "useRef call on a non-React namespace with invalid ref name",
      code: tsx`
        const value = hooks.useRef(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
      output: null,
    },
    {
      name: "Type-casted useRef call with invalid ref name",
      code: tsx`
        const value = (useRef as typeof useRef)(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
      output: null,
    },
    {
      name: "Type-casted useRef result with member access and invalid ref name",
      code: tsx`
        const value = (useRef(null) as { current: null }).current;
      `,
      errors: [{ messageId: "invalidRefName" }],
      output: null,
    },
    {
      name: "Arrow function returning useRef with invalid ref name",
      code: tsx`
        const value = () => useRef(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
      output: null,
    },
    {
      name: "Optional useRef call with invalid ref name",
      code: tsx`
        const value = useRef?.(null);
      `,
      errors: [{ messageId: "invalidRefName" }],
      output: null,
    },
  ],
  valid: [
    // Variable declarations with valid ref names
    {
      name: "Name 'ref'",
      code: tsx`
        import { useRef } from "react";
        const ref = useRef(0);
      `,
    },
    {
      name: "Name 'ref' with generic type argument",
      code: tsx`
        import { useRef } from "react";
        const ref = useRef<HTMLInputElement>(null);
      `,
    },
    {
      name: "CamelCase name with 'Ref' suffix",
      code: tsx`
        import { useRef } from "react";
        const countRef = useRef(0);
      `,
    },
    {
      name: "CamelCase name with 'Ref' suffix via React namespace",
      code: tsx`
        import React from "react";
        const inputRef = React.useRef<HTMLInputElement>(null);
      `,
    },
    {
      name: "CamelCase name with 'Ref' suffix without import",
      code: tsx`
        const valueRef = useRef(null);
      `,
    },
    {
      name: "Capitalized name 'Ref'",
      code: tsx`
        import { useRef } from "react";
        const Ref = useRef(null);
      `,
    },
    {
      name: "Leading underscore in a valid ref name",
      code: tsx`
        import { useRef } from "react";
        const _myRef = useRef(null);
      `,
    },
    // Other assignment targets with valid ref names
    {
      name: "Member expression assignment with valid ref name",
      code: tsx`
        refs.myRef = useRef();
      `,
    },
    {
      name: "Computed member expression assignment with valid ref name",
      code: tsx`
        import { useRef } from "react";
        ctxs["myRef"] = useRef(null);
      `,
    },
    {
      name: "Class property with valid ref name",
      code: tsx`
        import { useRef } from "react";
        class Foo { myRef = useRef(null); }
      `,
    },
    {
      name: "Nested member expression assignment with valid ref name",
      code: tsx`
        import { useRef } from "react";
        obj.nested.myRef = useRef();
      `,
    },
    {
      name: "Variable with valid ref name initialized with an object literal containing useRef",
      code: tsx`
        const valuesRef = { value: useRef(null) };
      `,
    },
    {
      name: "Assignment after declaration with valid ref name",
      code: tsx`
        import { useRef } from "react";
        let myRef;
        myRef = useRef(null);
      `,
    },
    {
      name: "Conditional expression initializer with valid ref name",
      code: tsx`
        import { useRef } from "react";
        const myRef = condition ? useRef(null) : { current: null };
      `,
    },
    {
      name: "Logical expression initializer with valid ref name",
      code: tsx`
        import { useRef } from "react";
        const myRef = useRef(null) || { current: null };
      `,
    },
    {
      name: "Nested assignment with valid ref name",
      code: tsx`
        const value = (currentRef = useRef(null));
      `,
    },
    // Code not subject to the rule
    {
      name: "Unassigned useRef call",
      code: tsx`
        import { useRef } from "react";
        useRef(null);
      `,
    },
    {
      name: "Default exported useRef call",
      code: tsx`
        import { useRef } from "react";
        export default useRef(null);
      `,
    },
    {
      name: "Member access on the useRef result",
      code: tsx`
        const obj = useRef({}).current;
      `,
    },
    {
      name: "Member access on the useRef result via React namespace",
      code: tsx`
        const obj = React.useRef({}).current;
      `,
    },
    {
      name: "Nested member access on the useRef result",
      code: tsx`
        import { useRef } from "react";
        const value = useRef(null).current.value;
      `,
    },
    {
      name: "useRef call inside a custom hook with immediate member access",
      code: tsx`
        const useOnce = <T,>(fn: () => T) => (useRef<{ value: T }>().current ??= { value: fn() }).value;
      `,
    },
    {
      name: "useRef call inside a custom hook with immediate member access via React namespace",
      code: tsx`
        const useOnce = <T,>(fn: () => T) => (React.useRef<{ value: T }>().current ??= { value: fn() }).value;
      `,
    },
    {
      name: "Array destructured useRef result",
      code: tsx`
        import { useRef } from "react";
        const [value] = [useRef(null)];
      `,
    },
    {
      name: "Object destructured useRef result",
      code: tsx`
        import { useRef } from "react";
        const { value } = { value: useRef(null) };
      `,
    },
    {
      name: "Arrow function with block body returning useRef",
      code: tsx`
        const value = () => {
          return useRef(null);
        };
      `,
    },
    {
      name: "Call of a function that is not useRef",
      code: tsx`
        const notARef = someOtherFunction();
      `,
    },
    {
      name: "Call of a function whose name only starts with 'useRef'",
      code: tsx`
        const value = useRefFactory(null);
      `,
    },
    {
      name: "Aliased useRef import",
      code: tsx`
        import { useRef as makeRef } from "react";
        const value = makeRef(null);
      `,
    },
    {
      name: "Computed member call of 'useRef' on the React namespace",
      code: tsx`
        const value = React["useRef"](null);
      `,
    },
    {
      name: "Computed member expression assignment with non-ref name",
      code: tsx`
        refs["value"] = useRef(null);
      `,
    },
    {
      name: "Computed member expression assignment with a ref-named key variable",
      code: tsx`
        refs[valueRef] = useRef(null);
      `,
    },
  ],
});
