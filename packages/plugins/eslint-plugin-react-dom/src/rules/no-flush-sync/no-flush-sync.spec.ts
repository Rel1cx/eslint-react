import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-flush-sync";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        flushSync(() => {
          setSomething(123);
        });
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        import reactDom from 'react-dom';

        reactDom.flushSync(() => {
          setSomething(123);
        });
      `,
      errors: [
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    ...allValid,
  ],
});
