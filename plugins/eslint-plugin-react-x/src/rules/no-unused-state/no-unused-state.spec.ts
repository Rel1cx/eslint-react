import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-unused-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [],
  valid: [
    {
      code: tsx`
        function Component() {
          return null;
        }
      `,
    },
  ],
});
