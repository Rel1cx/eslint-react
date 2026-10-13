import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./id-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Variable declarations with invalid id names
    {
      name: "Name without 'id'",
      code: tsx`
        import { useId } from "react";
        const value = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Name 'unique' without 'id'",
      code: tsx`
        import { useId } from "react";
        const unique = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Name without 'id' via React namespace",
      code: tsx`
        import React from "react";
        const foo = React.useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Name with all-caps 'ID'",
      code: tsx`
        import { useId } from "react";
        const myID = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "All-caps name 'ID'",
      code: tsx`
        import { useId } from "react";
        const ID = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Single-letter uppercase name",
      code: tsx`
        import { useId } from "react";
        const I = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Single-letter lowercase name",
      code: tsx`
        import { useId } from "react";
        const i = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Leading underscore in name",
      code: tsx`
        import { useId } from "react";
        const _id = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Multiple declarators with an invalid id name",
      code: tsx`
        import { useId } from "react";
        const id = useId(), value = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    // Other assignment targets
    {
      name: "Member expression assignment with invalid id name",
      code: tsx`
        ctxs.myValue = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Class property with invalid id name",
      code: tsx`
        import { useId } from "react";
        class Foo { value = useId(); }
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Nested member expression assignment with invalid id name",
      code: tsx`
        import { useId } from "react";
        obj.nested.value = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Object literal property with invalid id name key",
      code: tsx`
        import { useId } from "react";
        const ids = { value: useId() };
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Assignment after declaration with invalid id name",
      code: tsx`
        import { useId } from "react";
        let value;
        value = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Chained assignment with invalid id name",
      code: tsx`
        import { useId } from "react";
        a = b = useId();
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Computed member expression assignment with string-literal key with invalid id name",
      code: tsx`
        import { useId } from "react";
        ctxs["value"] = useId();
      `,
      errors: [{ messageId: "invalid-id-name", type: AST.MemberExpression }],
    },
    // Indirect useId calls
    {
      name: "Conditional expression initializer with invalid id name",
      code: tsx`
        import { useId } from "react";
        const value = condition ? useId() : "";
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Logical expression initializer with invalid id name",
      code: tsx`
        import { useId } from "react";
        const value = useId() || "";
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "useId wrapped in another call with invalid id name",
      code: tsx`
        import { useId } from "react";
        const value = wrap(useId());
      `,
      errors: [{ messageId: "invalid-id-name", type: AST.Identifier }],
      output: null,
    },
    {
      name: "Type-casted useId call with invalid id name",
      code: tsx`
        const value = (useId as () => string)();
      `,
      errors: [{ messageId: "invalid-id-name", type: AST.Identifier }],
      output: null,
    },
    {
      name: "Sequence expression with the id as the last value",
      code: tsx`
        import { useId } from "react";
        const value = (foo(), useId());
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
    {
      name: "Awaited useId call with invalid id name",
      code: tsx`
        import { useId } from "react";
        async function load() {
          const value = await useId();
        }
      `,
      errors: [{ messageId: "invalid-id-name" }],
    },
  ],
  valid: [
    // Variable declarations with valid id names
    {
      name: "Name 'id'",
      code: tsx`
        import { useId } from "react";
        const id = useId();
      `,
    },
    {
      name: "CamelCase name with 'Id' suffix",
      code: tsx`
        import { useId } from "react";
        const inputId = useId();
      `,
    },
    {
      name: "CamelCase name with 'Id' suffix via React namespace",
      code: tsx`
        import React from "react";
        const dialogTitleId = React.useId();
      `,
    },
    {
      name: "CamelCase name with 'Id' infix without import",
      code: tsx`
        const reactId = useId();
      `,
    },
    {
      name: "Capitalized name 'Id'",
      code: tsx`
        import { useId } from "react";
        const Id = useId();
      `,
    },
    {
      name: "Leading underscore in a valid id name",
      code: tsx`
        import { useId } from "react";
        const _myId = useId();
      `,
    },
    // Other assignment targets with valid id names
    {
      name: "Member expression assignment with valid id name",
      code: tsx`
        ctxs.myId = useId();
      `,
    },
    {
      name: "Computed member expression assignment with valid id name",
      code: tsx`
        import { useId } from "react";
        ctxs["myId"] = useId();
      `,
    },
    {
      name: "Class property with valid id name",
      code: tsx`
        import { useId } from "react";
        class Foo { myId = useId(); }
      `,
    },
    {
      name: "Nested member expression assignment with valid id name",
      code: tsx`
        import { useId } from "react";
        obj.nested.myId = useId();
      `,
    },
    {
      name: "Assignment after declaration with valid id name",
      code: tsx`
        import { useId } from "react";
        let myId;
        myId = useId();
      `,
    },
    {
      name: "Conditional expression initializer with valid id name",
      code: tsx`
        import { useId } from "react";
        const myId = condition ? useId() : "";
      `,
    },
    {
      name: "Logical expression initializer with valid id name",
      code: tsx`
        import { useId } from "react";
        const myId = useId() || "";
      `,
    },
    {
      name: "Chained assignment with valid id name",
      code: tsx`
        import { useId } from "react";
        outerValue = innerId = useId();
      `,
    },
    // Code not subject to the rule
    {
      name: "Unassigned useId call",
      code: tsx`
        import { useId } from "react";
        useId();
      `,
    },
    {
      name: "Default exported useId call",
      code: tsx`
        import { useId } from "react";
        export default useId();
      `,
    },
    {
      name: "useId call returned from a custom hook",
      code: tsx`
        import { useId } from "react";
        function useCustomId() {
          return useId();
        }
      `,
    },
    {
      name: "useId call returned from an arrow function with expression body",
      code: tsx`
        import { useId } from "react";
        const valueFactory = () => useId();
      `,
    },
    {
      name: "Exported custom hook with expression body returning useId",
      code: tsx`
        import { useId } from "react";
        export const useFieldLabel = () => useId();
      `,
    },
    {
      name: "useId call returned from an IIFE",
      code: tsx`
        import { useId } from "react";
        const value = (() => useId())();
      `,
    },
    {
      name: "useId call in a JSX attribute value",
      code: tsx`
        import { useId } from "react";
        const el = <input id={useId()} />;
      `,
    },
    {
      name: "Computed object literal key using useId",
      code: tsx`
        import { useId } from "react";
        const obj = { [useId()]: 1 };
      `,
    },
    {
      name: "Array destructured useId result",
      code: tsx`
        import { useId } from "react";
        const [value] = [useId()];
      `,
    },
    {
      name: "Object destructured useId result",
      code: tsx`
        import { useId } from "react";
        const { value } = { value: useId() };
      `,
    },
    {
      name: "Class private field with useId",
      code: tsx`
        import { useId } from "react";
        class Foo { #value = useId(); }
      `,
    },
    {
      name: "Call of a function that is not useId",
      code: tsx`
        const notAnId = someOtherFunction();
      `,
    },
    {
      name: "Call of a function whose name only starts with 'useId'",
      code: tsx`
        const obj = useIdSomethingElse();
      `,
    },
    {
      name: "Computed member call of 'useId'",
      code: tsx`
        const value = hooks["useId"]();
      `,
    },
    {
      name: "Computed member expression assignment with unresolvable key variable",
      code: tsx`
        ctxs[value] = useId();
      `,
    },
    {
      name: "Object literal property with valid id name key",
      code: tsx`
        import { useId } from "react";
        const ids = { myId: useId() };
      `,
    },
    {
      name: "Valid property key takes precedence over the invalid outer variable",
      code: tsx`
        import { useId } from "react";
        const container = { myId: useId() };
      `,
    },
    {
      name: "Destructuring default value does not report",
      code: tsx`
        import { useId } from "react";
        const { value = useId() } = ids;
      `,
    },
    // Containers and derived values do not transfer the id to a name
    {
      name: "Array literal containing useId",
      code: tsx`
        import { useId } from "react";
        const ids = [useId()];
      `,
    },
    {
      name: "Object literal property with unresolvable computed key",
      code: tsx`
        import { useId } from "react";
        const ids = { [key]: useId() };
      `,
    },
    {
      name: "Template literal embedding useId",
      code: tsx`
        import { useId } from "react";
        const label = \`id-\${useId()}\`;
      `,
    },
    {
      name: "Member access on the useId result",
      code: tsx`
        import { useId } from "react";
        const length = useId().length;
      `,
    },
    {
      name: "Sequence expression where useId is not the last value",
      code: tsx`
        import { useId } from "react";
        const value = (useId(), foo());
      `,
    },
    {
      name: "useId call yielded from a generator",
      code: tsx`
        import { useId } from "react";
        function* gen() {
          const value = yield useId();
        }
      `,
    },
  ],
});
