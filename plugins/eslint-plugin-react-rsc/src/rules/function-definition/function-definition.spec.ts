import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
        'use server';
        const serverFunction = () => {
          return 42;
        }
        export default serverFunction as MyType;
      `,
      errors: [{ messageId: "file" }],
      output: tsx`
        'use server';
        const serverFunction = async () => {
          return 42;
        }
        export default serverFunction as MyType;
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
    {
      code: tsx`
        'use server';
        export const value = 1, first = () => 1, second = function* () {
          yield 2;
        };
      `,
      errors: [{ messageId: "file" }, { messageId: "file" }],
      output: tsx`
        'use server';
        export const value = 1, first = async () => 1, second = async function* () {
          yield 2;
        };
      `,
    },
    {
      code: tsx`
        'use server';
        type ServerFunction = () => number;
        export default (() => 42) satisfies ServerFunction;
      `,
      errors: [{ messageId: "file" }],
      output: tsx`
        'use server';
        type ServerFunction = () => number;
        export default (async () => 42) satisfies ServerFunction;
      `,
    },
    {
      code: tsx`
        'use server';
        function serverFunction() {
          return 42;
        }
        export { serverFunction as action };
      `,
      errors: [{ messageId: "file" }],
      output: tsx`
        'use server';
        async function serverFunction() {
          return 42;
        }
        export { serverFunction as action };
      `,
    },
    {
      code: tsx`
        function serverFunction() {
          'use strict';
          'use server';
          return 42;
        }
      `,
      errors: [{ messageId: "local" }],
      output: tsx`
        async function serverFunction() {
          'use strict';
          'use server';
          return 42;
        }
      `,
    },
    {
      code: tsx`
        const serverFunction = function () {
          'use server';
          return 42;
        };
      `,
      errors: [{ messageId: "local" }],
      output: tsx`
        const serverFunction = async function () {
          'use server';
          return 42;
        };
      `,
    },
    {
      code: tsx`
        const actions = {
          serverFunction() {
            'use server';
            return 42;
          },
        };
      `,
      errors: [{ messageId: "local" }],
      output: tsx`
        const actions = {
          async serverFunction() {
            'use server';
            return 42;
          },
        };
      `,
    },
    {
      code: tsx`
        class Actions {
          static *['serverFunction']() {
            'use server';
            yield 42;
          }
        }
      `,
      errors: [{ messageId: "local" }],
      output: tsx`
        class Actions {
          static async *['serverFunction']() {
            'use server';
            yield 42;
          }
        }
      `,
    },
    {
      code: tsx`
        const actions = {
          get serverFunction() {
            'use server';
            return 42;
          },
        };
      `,
      errors: [{ messageId: "local" }],
      output: null,
    },
    {
      code: tsx`
        function serverFunction() {
          const value = 42;
          'use server';
          return value;
        }
      `,
      errors: [{ messageId: "localDirectivePosition", data: { name: "use server" } }],
      output: null,
    },
    {
      code: tsx`
        function clientFunction() {
          const value = 42;
          'use client';
          return value;
        }
      `,
      errors: [{ messageId: "localDirectiveUnexpected", data: { name: "use client" } }],
      output: null,
    },
    {
      code: tsx`
        async function serverFunction() {
          const value = 42;
          \`use server\`;
          return value;
        }
      `,
      errors: [{ messageId: "localDirectiveQuote", data: { name: "use server" } }],
      output: null,
    },
    {
      code: tsx`
        ('use server');
      `,
      errors: [{ messageId: "fileDirectivePosition", data: { name: "use server" } }],
      output: null,
    },
    {
      code: tsx`
        'use strict';
        'use server';
        export function serverFunction() {
          return 42;
        }
      `,
      errors: [{ messageId: "file" }],
      output: tsx`
        'use strict';
        'use server';
        export async function serverFunction() {
          return 42;
        }
      `,
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
      'use server';
      const serverFunction = async () => {
        return 42;
      }
      export default serverFunction as MyType;
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
    tsx`
      'use server';
      function privateHelper() {
        return 42;
      }
      export const value = 42;
      export default class Service {}
    `,
    tsx`
      'use server';
      export { action, default as defaultAction } from './actions';
      export * from './other-actions';
    `,
    tsx`
      'use server';
      export const serverFunction = async function* () {
        yield 42;
      };
    `,
    tsx`
      function serverFunction() {
        if (Math.random() > 0.5) {
          'use server';
        }
        return 42;
      }
    `,
    tsx`
      function serverFunction(kind: string) {
        \`use \${kind}\`;
        'use servers';
        return 42;
      }
    `,
    tsx`
      const actions = {
        async serverFunction() {
          'use server';
          return 42;
        },
      };
    `,
  ],
});
