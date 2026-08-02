import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./function-definition";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // File-level 'use server': exported functions must be async
    {
      name: "Non-async named function export in a 'use server' file",
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
      name: "Non-async default function export in a 'use server' file",
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
      name: "Non-async exported arrow function in a 'use server' file",
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
      name: "Non-async function exported via export specifier in a 'use server' file",
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
      name: "Non-async arrow function exported via export specifier in a 'use server' file",
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
      name: "Non-async arrow function as default export in a 'use server' file",
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
      name: "Non-async arrow function as default export with type assertion in a 'use server' file",
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
      name: "Non-async function exported via aliased export specifier in a 'use server' file",
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
      name: "Multiple non-async function declarators in a 'use server' file",
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
      name: "Non-async exported arrow function with 'as' cast in a 'use server' file",
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
      name: "Non-async default exported function expression with 'as' cast in a 'use server' file",
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
      name: "Non-async arrow function with 'as' cast exported via export specifier in a 'use server' file",
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
      name: "Non-async default export with 'satisfies' in a 'use server' file",
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
      name: "Non-async function export in a 'use server' file after 'use strict'",
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
    // Local 'use server': the enclosing function must be async
    {
      name: "Non-async function declaration with local 'use server' directive",
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
      name: "Non-async arrow function with local 'use server' directive",
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
      name: "Non-async function expression with local 'use server' directive",
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
      name: "Non-async function with local 'use server' directive after 'use strict'",
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
      name: "Non-async function declaration with local 'use server' directive in a function component",
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
      name: "Non-async function declaration with local 'use server' directive in an arrow component",
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
      name: "Non-async arrow function with local 'use server' directive in a function component",
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
      name: "Non-async arrow function with local 'use server' directive in an arrow component",
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
      name: "Non-async object method with local 'use server' directive",
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
      name: "Non-async class static computed generator method with local 'use server' directive",
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
      name: "Object getter with local 'use server' directive",
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
    // File-level directive position
    {
      name: "File-level 'use client' directive after an import",
      code: tsx`
        import React from 'react';
        'use client';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      name: "File-level 'use server' directive after an import",
      code: tsx`
        import React from 'react';
        'use server';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      name: "File-level 'use client' directive after a statement",
      code: tsx`
        const x = 1;
        'use client';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      name: "File-level 'use server' directive after an export",
      code: tsx`
        export const x = 1;
        'use server';
      `,
      errors: [{ messageId: "fileDirectivePosition" }],
    },
    {
      name: "Parenthesized file-level 'use server' directive",
      code: tsx`
        ('use server');
      `,
      errors: [{ messageId: "fileDirectivePosition", data: { name: "use server" } }],
      output: null,
    },
    // File-level directive quote style
    {
      name: "File-level 'use client' directive in a template literal",
      code: tsx`
        \`use client\`;
      `,
      errors: [{ messageId: "fileDirectiveQuote" }],
    },
    {
      name: "File-level 'use server' directive in a template literal",
      code: tsx`
        \`use server\`;
      `,
      errors: [{ messageId: "fileDirectiveQuote" }],
    },
    // Local directive position
    {
      name: "Local 'use server' directive after a statement in an async function",
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
      name: "Local 'use server' directive after a return statement in an async function",
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
      name: "Local 'use server' directive after a statement in a top-level function",
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
    // Local directive quote style
    {
      name: "Local 'use server' directive in a template literal",
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
      name: "Local 'use client' directive in a template literal",
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
      name: "Local 'use server' directive in a template literal in a top-level async function",
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
    // Local directive not allowed inside a function body
    {
      name: "Local 'use client' directive inside a function",
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
      name: "Local 'use client' directive inside a top-level function",
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
  ],
  valid: [
    // File-level 'use server' with async exports
    {
      name: "Async named function export in a 'use server' file",
      code: tsx`
        'use server';
        export async function serverFunction() {
          return 42;
        }
      `,
    },
    {
      name: "Async default function export in a 'use server' file",
      code: tsx`
        'use server';
        export default async function serverFunction() {
          return 42;
        }
      `,
    },
    {
      name: "Async exported arrow function in a 'use server' file",
      code: tsx`
        'use server';
        export const serverFunction = async () => {
          return 42;
        }
      `,
    },
    {
      name: "Async arrow function as default export in a 'use server' file",
      code: tsx`
        'use server';
        const serverFunction = async () => {
          return 42;
        }
        export default serverFunction;
      `,
    },
    {
      name: "Async arrow function as default export with type assertion in a 'use server' file",
      code: tsx`
        'use server';
        const serverFunction = async () => {
          return 42;
        }
        export default serverFunction as MyType;
      `,
    },
    {
      name: "Async generator function export in a 'use server' file",
      code: tsx`
        'use server';
        export const serverFunction = async function* () {
          yield 42;
        };
      `,
    },
    {
      name: "'use server' file directive after a block comment",
      code: tsx`
        /* comment */
        'use server';
        export async function serverFunction() {
          return 42;
        }
      `,
    },
    {
      name: "Double-quoted 'use server' file directive",
      code: tsx`
        "use server";
        export async function serverFunction() {
          return 42;
        }
      `,
    },
    // File-level 'use client'
    {
      name: "'use client' file with a function export",
      code: tsx`
        'use client';
        export function clientFunction() {
          return 42;
        }
      `,
    },
    {
      name: "'use client' file directive before an import",
      code: tsx`
        'use client';
        import { useState } from 'react';
      `,
    },
    {
      name: "Double-quoted 'use client' file directive before an import",
      code: tsx`
        "use client";
        import { useState } from 'react';
      `,
    },
    {
      name: "'use client' file directive after 'use strict'",
      code: tsx`
        "use strict";
        'use client';
      `,
    },
    {
      name: "'use client' file directive after a line comment",
      code: tsx`
        // comment
        'use client';
      `,
    },
    // Local 'use server' inside async functions
    {
      name: "Async function with local 'use server' directive",
      code: tsx`
        export {};
        async function serverFunction() {
          'use server';
          return 42;
        }
      `,
    },
    {
      name: "Async arrow function with local 'use server' directive",
      code: tsx`
        export {};
        const serverFunction = async () => {
          'use server';
          return 42;
        }
      `,
    },
    {
      name: "Async function with local 'use server' directive in a component",
      code: tsx`
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
      name: "Async arrow function with local 'use server' directive in a component",
      code: tsx`
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
      name: "Async function with local 'use server' directive after 'use strict'",
      code: tsx`
        export function Component() {
          async function serverFunction() {
            'use strict';
            'use server';
            return 42;
          }

          return <div />;
        }
      `,
    },
    {
      name: "Double-quoted local 'use server' directive in a component",
      code: tsx`
        export function Component() {
          async function serverFunction() {
            "use server";
            return 42;
          }

          return <div />;
        }
      `,
    },
    {
      name: "Async object method with local 'use server' directive",
      code: tsx`
        const actions = {
          async serverFunction() {
            'use server';
            return 42;
          },
        };
      `,
    },
    // Code not subject to the rule
    {
      name: "'use server' file without exported functions",
      code: tsx`
        'use server';
        function privateHelper() {
          return 42;
        }
        export const value = 42;
        export default class Service {}
      `,
    },
    {
      name: "'use server' file with re-exports only",
      code: tsx`
        'use server';
        export { action, default as defaultAction } from './actions';
        export * from './other-actions';
      `,
    },
    {
      name: "Async function without directive in a component",
      code: tsx`
        export function Component() {
          async function serverFunction() {
            return 42;
          }

          return <div />;
        }
      `,
    },
    {
      name: "Template literal directive with an expression",
      code: tsx`
        \`use \${"client"}\`;
      `,
    },
    {
      name: "'use server' directive inside a non-top-level block",
      code: tsx`
        function serverFunction() {
          if (Math.random() > 0.5) {
            'use server';
          }
          return 42;
        }
      `,
    },
    {
      name: "Non-matching directive-like strings",
      code: tsx`
        function serverFunction(kind: string) {
          \`use \${kind}\`;
          'use servers';
          return 42;
        }
      `,
    },
  ],
});
