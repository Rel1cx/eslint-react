import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
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
  ],
});
