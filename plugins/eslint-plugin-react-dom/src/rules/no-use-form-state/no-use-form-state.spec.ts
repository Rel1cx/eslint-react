import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-use-form-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { useFormState } from "react-dom";

        async function increment(previousState, formData) {
          return previousState + 1;
        }

        function StatefulForm({}) {
          const [state, formAction] = useFormState(increment, 0);
          return (
            <form>
              {state}
              <button formAction={formAction}>Increment</button>
            </form>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
      output: tsx`
        import { useFormState } from "react-dom";
        import { useActionState } from "react";

        async function increment(previousState, formData) {
          return previousState + 1;
        }

        function StatefulForm({}) {
          const [state, formAction] = useActionState(increment, 0);
          return (
            <form>
              {state}
              <button formAction={formAction}>Increment</button>
            </form>
          );
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`
        import ReactDOM from "react-dom";

        async function increment(previousState, formData) {
          return previousState + 1;
        }

        function StatefulForm({}) {
          const [state, formAction] = ReactDOM.useFormState(increment, 0);
          return (
            <form>
              {state}
              <button formAction={formAction}>Increment</button>
            </form>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
      output: tsx`
        import ReactDOM from "react-dom";
        import { useActionState } from "react";

        async function increment(previousState, formData) {
          return previousState + 1;
        }

        function StatefulForm({}) {
          const [state, formAction] = useActionState(increment, 0);
          return (
            <form>
              {state}
              <button formAction={formAction}>Increment</button>
            </form>
          );
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`
        import * as ReactDOM from "react-dom";

        async function increment(previousState, formData) {
          return previousState + 1;
        }

        function StatefulForm({}) {
          const [state, formAction] = ReactDOM.useFormState(increment, 0);
          return (
            <form>
              {state}
              <button formAction={formAction}>Increment</button>
            </form>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
      output: tsx`
        import * as ReactDOM from "react-dom";
        import { useActionState } from "react";

        async function increment(previousState, formData) {
          return previousState + 1;
        }

        function StatefulForm({}) {
          const [state, formAction] = useActionState(increment, 0);
          return (
            <form>
              {state}
              <button formAction={formAction}>Increment</button>
            </form>
          );
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    // In return statement
    {
      code: tsx`
        import { useFormState } from "react-dom";
        function getState() {
          return useFormState(action, 0);
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { useFormState } from "react-dom";
        import { useActionState } from "react";
        function getState() {
          return useActionState(action, 0);
        }
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`
        import { useFormState } from "react-dom";
        (useFormState as any)(action);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { useFormState } from "react-dom";
        import { useActionState } from "react";
        (useActionState)(action);
      `,
    },
    // Merges into an existing import from the same source
    {
      code: tsx`
        import { useFormState } from "react-dom";
        import { useState } from "react";

        const [state, formAction] = useFormState(action, 0);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { useFormState } from "react-dom";
        import { useState, useActionState } from "react";

        const [state, formAction] = useActionState(action, 0);
      `,
    },
    // No duplicate import when `useActionState` is already imported
    {
      code: tsx`
        import { useFormState } from "react-dom";
        import { useActionState } from "react";

        const [state, formAction] = useFormState(action, 0);
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        import { useFormState } from "react-dom";
        import { useActionState } from "react";

        const [state, formAction] = useActionState(action, 0);
      `,
    },
    // `useActionState` is already bound by another module (no auto-fix)
    {
      code: tsx`
        import { useFormState } from "react-dom";
        import { useActionState } from "some-other-lib";

        const [state, formAction] = useFormState(action, 0);
      `,
      errors: [{ messageId: "default" }],
      output: null,
    },
  ],
  valid: [
    tsx`
      import { useActionState } from "react";
      import { useFormState } from "react-dom";

      async function increment(previousState, formData) {
        return previousState + 1;
      }

      function StatefulForm({}) {
        const [state, formAction] = useActionState(increment, 0);
        return (
          <form>
            {state}
            <button formAction={formAction}>Increment</button>
          </form>
        );
      }
    `,
    {
      code: tsx`
        import { useFormState } from "react-dom";

        async function increment(previousState, formData) {
          return previousState + 1;
        }

        function StatefulForm({}) {
          const [state, formAction] = useFormState(increment, 0);
          return (
            <form>
              {state}
              <button formAction={formAction}>Increment</button>
            </form>
          );
        }
      `,
      settings: {
        "react-x": {
          version: "17.0.0",
        },
      },
    },
    // Imported from another module
    tsx`
      import { useFormState } from "some-other-lib";
      useFormState(action, 0);
    `,
    // Different identifier
    tsx`
      myUseFormState(action, 0);
    `,
    // Variable named useFormState but not called
    tsx`
      const useFormState = 1;
      console.log(useFormState);
    `,
  ],
});
