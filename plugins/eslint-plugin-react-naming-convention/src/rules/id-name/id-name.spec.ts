import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./id-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { useId } from "react";
        const value = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const unique = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import React from "react";
        const foo = React.useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        ctxs.myValue = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const myID = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        class Foo { value = useId(); }
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        obj.nested.value = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const ids = { myId: useId() };
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const ID = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const i = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const _id = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        let value;
        value = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const value = condition ? useId() : "";
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const value = useId() || "";
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        a = b = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const I = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
    {
      code: tsx`
        import { useId } from "react";
        const id = useId(), value = useId();
      `,
      errors: [{ messageId: "invalidIdName" }],
    },
  ],
  valid: [
    tsx`
      import { useId } from "react";
      const id = useId();
    `,
    tsx`
      import { useId } from "react";
      const inputId = useId();
    `,
    tsx`
      import React from "react";
      const dialogTitleId = React.useId();
    `,
    tsx`
      const reactId = useId();
    `,
    tsx`
      const notAnId = someOtherFunction();
    `,
    tsx`
      const obj = useIdSomethingElse();
    `,
    tsx`
      ctxs.myId = useId();
    `,
    tsx`
      import { useId } from "react";
      useId();
    `,
    tsx`
      import { useId } from "react";
      export default useId();
    `,
    tsx`
      import { useId } from "react";
      const Id = useId();
    `,
    tsx`
      import { useId } from "react";
      class Foo { myId = useId(); }
    `,
    tsx`
      import { useId } from "react";
      obj.nested.myId = useId();
    `,
    tsx`
      import { useId } from "react";
      const [value] = [useId()];
    `,
    tsx`
      import { useId } from "react";
      const { value } = { value: useId() };
    `,
    tsx`
      import { useId } from "react";
      let myId;
      myId = useId();
    `,
    tsx`
      import { useId } from "react";
      const myId = condition ? useId() : "";
    `,
    tsx`
      import { useId } from "react";
      const myId = useId() || "";
    `,
    tsx`
      import { useId } from "react";
      ctxs["myId"] = useId();
    `,
    tsx`
      import { useId } from "react";
      const _myId = useId();
    `,
  ],
});
