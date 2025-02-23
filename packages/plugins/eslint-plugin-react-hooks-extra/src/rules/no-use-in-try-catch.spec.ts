import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-use-in-try-catch";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function Message({ messagePromise }) {
          try {
            const content = use(messagePromise);
            //              ^^^
            //              - 'use' cannot be called in a try-catch block. Instead of a try-catch block wrap your component in an Error Boundary, or provide an alternative value to use with the Promise’s .catch method.
            return <p>Here is the message: {content}</p>;
          } catch (error) {
            return <p>⚠️Something went wrong</p>;
          }
        }
      `,
      errors: [{ messageId: "noUseInTryCatch" }],
    },
    {
      code: /* tsx */ `
        function Message({ messagePromise }) {
          try {
            const content = React.use(messagePromise);
            //                    ^^^
            //                    - 'use' cannot be called in a try-catch block. Instead of a try-catch block wrap your component in an Error Boundary, or provide an alternative value to use with the Promise’s .catch method.
            return <p>Here is the message: {content}</p>;
          } catch (error) {
            return <p>⚠️Something went wrong</p>;
          }
        }
      `,
      errors: [{ messageId: "noUseInTryCatch" }],
    },
    {
      code: /* tsx */ `
        import { use } from "react";

        function Message({ messagePromise }) {
          try {
            const content = use(messagePromise);
            //              ^^^
            //              - 'use' cannot be called in a try-catch block. Instead of a try-catch block wrap your component in an Error Boundary, or provide an alternative value to use with the Promise’s .catch method.
            return <p>Here is the message: {content}</p>;
          } catch (error) {
            return <p>⚠️Something went wrong</p>;
          }
        }
      `,
      errors: [{ messageId: "noUseInTryCatch" }],
    },
    {
      code: /* tsx */ `
        import * as React from "react";

        function Message({ messagePromise }) {
          try {
            const content = React.use(messagePromise);
            //                    ^^^
            //                    - 'use' cannot be called in a try-catch block. Instead of a try-catch block wrap your component in an Error Boundary, or provide an alternative value to use with the Promise’s .catch method.
            return <p>Here is the message: {content}</p>;
          } catch (error) {
            return <p>⚠️Something went wrong</p>;
          }
        }
      `,
      errors: [{ messageId: "noUseInTryCatch" }],
    },
  ],
  valid: [
    ...allValid,
  ],
});
