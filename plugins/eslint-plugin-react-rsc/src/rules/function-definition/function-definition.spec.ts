import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./function-definition";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        'use server';
        export function serverFunction() {
          return 42;
        }
      `,
      errors: [{ messageId: "file" }],
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
      errors: [{ messageId: "file" }],
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
      errors: [{ messageId: "file" }],
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
      errors: [{ messageId: "file" }],
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
      errors: [{ messageId: "file" }],
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
      errors: [{ messageId: "file" }],
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
      errors: [{ messageId: "local" }],
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
      errors: [{ messageId: "local" }],
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
      errors: [{ messageId: "local" }],
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
      errors: [{ messageId: "local" }],
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
      errors: [{ messageId: "local" }],
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
      errors: [{ messageId: "local" }],
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
    {
      code: tsx`
        'use server';
        export const serverFunction = (() => {
          return 42;
        }) as MyType;
      `,
      errors: [{ messageId: "file" }],
      output: tsx`
        'use server';
        export const serverFunction = (async () => {
          return 42;
        }) as MyType;
      `,
    },
    {
      code: tsx`
        'use server';
        export default (function serverFunction() {
          return 42;
        }) as MyType;
      `,
      errors: [{ messageId: "file" }],
      output: tsx`
        'use server';
        export default (async function serverFunction() {
          return 42;
        }) as MyType;
      `,
    },
    {
      code: tsx`
        'use server';
        const serverFunction = (() => {
          return 42;
        }) as MyType;
        export { serverFunction };
      `,
      errors: [{ messageId: "file" }],
      output: tsx`
        'use server';
        const serverFunction = (async () => {
          return 42;
        }) as MyType;
        export { serverFunction };
      `,
    },
    {
      code: tsx`
        import React from 'react';
        'use client';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      code: tsx`
        import React from 'react';
        'use server';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      code: tsx`
        const x = 1;
        'use client';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      code: tsx`
        \`use client\`;
      `,
      errors: [{ messageId: "fileDirectiveQuote" }],
    },
    {
      code: tsx`
        \`use server\`;
      `,
      errors: [{ messageId: "fileDirectiveQuote" }],
    },
    {
      code: tsx`
        export function Component() {
          async function serverFunction() {
            const x = 1;
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "localDirectivePosition" }],
    },
    {
      code: tsx`
        export function Component() {
          async function serverFunction() {
            \`use server\`;
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "localDirectiveQuote" }],
    },
    {
      code: tsx`
        export function Component() {
          function serverFunction() {
            'use client';
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "localDirectiveUnexpected" }],
    },
    {
      code: tsx`
        export function Component() {
          function serverFunction() {
            \`use client\`;
            return 42;
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "localDirectiveQuote" }],
    },
    {
      code: tsx`
        export const x = 1;
        'use server';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      code: tsx`
        export function Component() {
          async function serverFunction() {
            return 42;
            'use server';
          }

          return <div />;
        }
      `,
      errors: [{ messageId: "localDirectivePosition" }],
    },
  ],
  valid: [
    tsx`
      "use strict";
      'use client';
    `,
    tsx`
      'use client';
      export function clientFunction() {
        return 42;
      }
    `,
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
    tsx`
      'use client';
      import { useState } from 'react';
    `,
    tsx`
      // comment
      'use client';
    `,
    tsx`
      /* comment */
      'use server';
      export async function serverFunction() {
        return 42;
      }
    `,
    tsx`
      export function Component() {
        async function serverFunction() {
          'use strict';
          'use server';
          return 42;
        }

        return <div />;
      }
    `,
    tsx`
      "use client";
      import { useState } from 'react';
    `,
    tsx`
      "use server";
      export async function serverFunction() {
        return 42;
      }
    `,
    tsx`
      export function Component() {
        async function serverFunction() {
          "use server";
          return 42;
        }

        return <div />;
      }
    `,
    tsx`
      \`use \${"client"}\`;
    `,
    tsx`
      export function Component() {
        async function serverFunction() {
          return 42;
        }

        return <div />;
      }
    `,
  ],
});
