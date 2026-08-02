import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Name 'unique' without 'id'",
      code: tsx`
        import { useId } from "react";
        const unique = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Name without 'id' via React namespace",
      code: tsx`
        import React from "react";
        const foo = React.useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Name with all-caps 'ID'",
      code: tsx`
        import { useId } from "react";
        const myID = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "All-caps name 'ID'",
      code: tsx`
        import { useId } from "react";
        const ID = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Single-letter uppercase name",
      code: tsx`
        import { useId } from "react";
        const I = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Single-letter lowercase name",
      code: tsx`
        import { useId } from "react";
        const i = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Leading underscore in name",
      code: tsx`
        import { useId } from "react";
        const _id = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Multiple declarators with an invalid id name",
      code: tsx`
        import { useId } from "react";
        const id = useId(), value = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    // Other assignment targets
    {
      name: "Member expression assignment with invalid id name",
      code: tsx`
        ctxs.myValue = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Class property with invalid id name",
      code: tsx`
        import { useId } from "react";
        class Foo { value = useId(); }
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Nested member expression assignment with invalid id name",
      code: tsx`
        import { useId } from "react";
        obj.nested.value = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Variable initialized with an object literal containing useId",
      code: tsx`
        import { useId } from "react";
        const ids = { myId: useId() };
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Assignment after declaration with invalid id name",
      code: tsx`
        import { useId } from "react";
        let value;
        value = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Chained assignment with invalid id name",
      code: tsx`
        import { useId } from "react";
        a = b = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Computed member expression assignment with invalid id name",
      code: tsx`
        ctxs[value] = useId();
      `,
      errors: [{ messageId: "invalidIdName", type: AST.MemberExpression }],
      output: null,
    },
    // Indirect useId calls
    {
      name: "Conditional expression initializer with invalid id name",
      code: tsx`
        import { useId } from "react";
        const value = condition ? useId() : "";
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "Logical expression initializer with invalid id name",
      code: tsx`
        import { useId } from "react";
        const value = useId() || "";
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      name: "useId wrapped in another call with invalid id name",
      code: tsx`
        import { useId } from "react";
        const value = wrap(useId());
      `,
      errors: [{ messageId: "invalidIdName", type: AST.Identifier }],
      output: null,
    },
    {
      name: "Arrow function returning useId with invalid id name",
      code: tsx`
        import { useId } from "react";
        const valueFactory = () => useId();
      `,
      errors: [{ messageId: "invalidIdName", type: AST.Identifier }],
      output: null,
    },
    {
      name: "Type-casted useId call with invalid id name",
      code: tsx`
        const value = (useId as () => string)();
      `,
      errors: [{ messageId: "invalidIdName", type: AST.Identifier }],
      output: null,
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
      name: "Variable with valid id name initialized with an object literal containing useId",
      code: tsx`
        import { useId } from "react";
        const containerId = { value: useId() };
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
      name: "Computed member expression assignment with non-id name",
      code: tsx`
        ctxs["value"] = useId();
      `,
    },
  ],
});
