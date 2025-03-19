import tsx from "dedent";

import { ruleTester } from "../../../../../test";
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
          messageId: "noUseFormState",
        },
      ],
      output: tsx`
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
          messageId: "noUseFormState",
        },
      ],
      output: tsx`
        import { useActionState } from "react";
        import ReactDOM from "react-dom";

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
          messageId: "noUseFormState",
        },
      ],
      output: tsx`
        import { useActionState } from "react";
        import * as ReactDOM from "react-dom";

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
  ],
});
