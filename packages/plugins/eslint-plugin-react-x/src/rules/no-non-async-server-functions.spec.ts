import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-non-async-server-functions";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        'use server';
        export function serverFunction() {
          return 42;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        'use server';
        export async function serverFunction() {
          return 42;
        }
      `,
    },
    {
      code: tsx`
        'use server';
        export default function serverFunction() {
          return 42;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        'use server';
        export default async function serverFunction() {
          return 42;
        }
      `,
    },
    {
      code: tsx`
        'use server';
        function serverFunction() {
          return 42;
        }
        export { serverFunction };
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        'use server';
        async function serverFunction() {
          return 42;
        }
        export { serverFunction };
      `,
    },
    {
      code: tsx`
        'use server';
        const serverFunction = () => {
          return 42;
        }
        export { serverFunction };
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        'use server';
        const serverFunction = async () => {
          return 42;
        }
        export { serverFunction };
      `,
    },
    {
      code: tsx`
        'use server';
        export const serverFunction = () => {
          return 42;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        'use server';
        export const serverFunction = async () => {
          return 42;
        }
      `,
    },
    {
      code: tsx`
        'use server';
        const serverFunction = () => {
          return 42;
        }
        export default serverFunction;
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        'use server';
        const serverFunction = async () => {
          return 42;
        }
        export default serverFunction;
      `,
    },
    {
      code: tsx`
        function serverFunction() {
          'use server';
          return 42;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        async function serverFunction() {
          'use server';
          return 42;
        }
      `,
    },
    {
      code: tsx`
        const serverFunction = () => {
          'use server';
          return 42;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        const serverFunction = async () => {
          'use server';
          return 42;
        }
      `,
    },
    {
      code: tsx`
        export function Component() {
          function serverFunction() {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        export function Component() {
          async function serverFunction() {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
    },
    {
      code: tsx`
        export const Component = () => {
          function serverFunction() {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        export const Component = () => {
          async function serverFunction() {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
    },
    {
      code: tsx`
        export function Component() {
          const serverFunction = () => {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        export function Component() {
          const serverFunction = async () => {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
    },
    {
      code: tsx`
        export const Component = () => {
          const serverFunction = () => {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "default" }],
      output: tsx`
        export const Component = () => {
          const serverFunction = async () => {
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
    },
  ],
  valid: [
    ...allValid,
    tsx`
      'use server';
      export async function serverFunction() {
        return 42;
      }
    `,
    tsx`
      'use server';
      export default async function serverFunction() {
        return 42;
      }
    `,
    tsx`
      'use server';
      export const serverFunction = async () => {
        return 42;
      }
    `,
    tsx`
      'use server';
      const serverFunction = async () => {
        return 42;
      }
      export default serverFunction;
    `,
    tsx`
      export {};
      async function serverFunction() {
        'use server';
        return 42;
      }
    `,
    tsx`
      export {};
      const serverFunction = async () => {
        'use server';
        return 42;
      }
    `,
    tsx`
      export function Component() {
        async function serverFunction() {
          'use server';
          return 42;
        }

        return <div />;
      }
    `,
    tsx`
      export function Component() {
        const serverFunction = async () => {
          'use server';
          return 42;
        }

        return <div />;
      }
    `,
  ],
});
