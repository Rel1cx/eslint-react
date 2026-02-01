import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-nested-lazy-component-declarations";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { lazy } from "react";

        function Editor() {
          // 🔴 Bad: This will cause all state to be reset on re-renders
          const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
          //    ^^^^^^^^^^^^^^^
          //    - Do not declare lazy components inside other components. Instead, always declare them at the top level of your module.
          // ...

          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      import { lazy } from "react";

      // ✅ Good: Declare lazy components outside of your components
      const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

      function Editor() {
        // ...
      }
    `,
  ],
});
