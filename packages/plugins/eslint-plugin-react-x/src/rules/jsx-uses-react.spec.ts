import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule from "./jsx-uses-react";

ruleTester.run("no-unused-vars", rule, {
  // TODO: Add invalid test cases
  invalid: [],
  valid: [
    ...allValid,
    {
      code: tsx`
        import React from "react";

        const Hello = <div>Hello</div>;
      `,
    },
    {
      code: tsx`
        /** @jsx Foo */
        import Foo from "foo";

        const Hello = <div>Hello</div>;
      `,
    },
  ],
});
