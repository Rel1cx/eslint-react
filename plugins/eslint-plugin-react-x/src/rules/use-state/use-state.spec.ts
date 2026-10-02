import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import type { ESLintReactSettings } from "@eslint-react/shared";
import rule, { RULE_NAME } from "./use-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // --- Assignment / setter naming ---
    {
      code: tsx`
        function Component() {
          useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    {
      code: tsx`
        function Component() {
          React.useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    {
      code: tsx`
        import React from "react";

        function Component() {
          React.useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    {
      code: tsx`
        function Component() {
          const data = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    {
      code: tsx`
        function Component() {
          const [state, setValue] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    {
      code: tsx`
        function Component() {
          const [state, set] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [state, sseettState] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [state, setstate] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    {
      code: tsx`
        import { useState } from 'react';

        export function useTest(): [number, (n: number) => void] {
          const [count1, setCount] = useState(0);
          return [count1, setCount];
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    // ObjectPattern value — cannot derive a canonical setter name, always invalid
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [{ foo, bar, baz }, setFooBarBaz] = useState({ foo: "a", bar: "b", baz: "c" });

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [{ foo, bar, baz }, anythingGoes] = useState({ foo: "a", bar: "b", baz: "c" });

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [{ foo, bar, baz }, setJustSomeName] = useState({ foo: "a", bar: "b", baz: "c" });

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    // useState callee wrapped in TSAsExpression (should still detect and report invalid setter name)
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, updateCount] = (useState as any)(0);
          return <div>{count}</div>;
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    // useState with type arguments (TSInstantiationExpression)
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, updateCount] = useState<number>(0);
          return <div>{count}</div>;
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    // --- Lazy initialization ---
    {
      code: `import { useState } from "react"; useState(1 < 2 ? getValue() : 4)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(a ? b : getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(getValue() ? b : c)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(a ? (b ? getValue() : b2) : c)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(1 || getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(getValue() && b)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(2 < getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(+getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(a() && new Foo())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
        {
          type: AST.NewExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    // --- Lazy initialization: newly traversed node types ---
    {
      name: "call inside await expression in useState initial value",
      code: tsx`
        import { useState } from "react";

        async function Component() {
          const [data, setData] = useState(await fetchData());
          return null;
        }
      `,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
    },
    {
      name: "call inside tagged template expression in useState initial value",
      code: `import { useState } from "react"; useState(tag\`\${getValue()}\`)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      name: "call inside computed member expression property in useState initial value",
      code: `import { useState } from "react"; useState(obj[getValue()])`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      name: "chained call expression (callee is a call) in useState initial value",
      // getFactory()() — the outer call's callee is a CallExpression (no "name"),
      // so only the inner getFactory() passes the "name" in expr.callee filter.
      code: `import { useState } from "react"; useState(getFactory()())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      name: "new expression inside callee member expression in useState initial value",
      code: `import { useState } from "react"; useState(new Foo().bar)`,
      errors: [
        {
          type: AST.NewExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      name: "new expression inside conditional expression in useState initial value",
      code: `import { useState } from "react"; useState(flag ? new Foo() : null)`,
      errors: [
        {
          type: AST.NewExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState(getValue() + 1)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState([getValue()])`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: `import { useState } from "react"; useState({ a: getValue() })`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      options: [{ enforceAssignment: false }],
    },
    {
      code: tsx`
        import { useState, use } from 'react';

        function Component({data}) {
          const [data, setData] = useState(data ? use(data) : getValue());
          return null;
        }
      `,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalid-initialization",
        },
      ],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: tsx`
        function Component() {
          const prev = usePreviousState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
      settings: {
        "react-x": {
          additionalStateHooks: "/^usePreviousState$/u",
        },
      },
    },
    // useState in assignment expression (should not crash when parent is AssignmentExpression)
    {
      code: tsx`
        function Component() {
          let state;
          state = useState(0);
          return <div>{state[0]}</div>;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    // useState in conditional expression (should not crash when parent is ConditionalExpression)
    {
      code: tsx`
        function Component() {
          const x = condition ? useState(0) : null;
          return <div>{x}</div>;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    // useState in array expression (should not crash when parent is ArrayExpression)
    {
      code: tsx`
        function Component() {
          const arr = [useState(0)];
          return <div>{arr[0][0]}</div>;
        }
      `,
      errors: [{ messageId: "invalid-assignment" }],
    },
    // Ported from https://github.com/oxc-project/oxc/issues/24952
    // oxlint flagged intentionally unused getter/setter names; its maintainers made this a
    // config option defaulting to the upstream (report) behavior, which matches our default.
    // Our `enforceSetterName: false` option is the equivalent opt-out (see valid cases below).
    {
      code: tsx`
        const Component = () => {
          const [_, id] = useState(1);
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
    {
      code: tsx`
        const Component = () => {
          const [id, _] = useState(1);
        }
      `,
      errors: [{ messageId: "invalid-setter-name" }],
    },
  ],
  valid: [
    // --- Assignment / setter naming ---
    tsx`
      import { useState } from "react";

      function Component() {
        const [state, setState] = useState(0);

        return <div />;
      }
    `,
    tsx`const [myCount, setMyCount] = useState(0);`,
    tsx`
      import { useState } from "react";

      const [value] = useState(() => expensiveSetup());
    `,
    tsx`
      const [memoisedValue] = React.useState(() => calculateValue());
    `,
    tsx`
      import { useState } from 'react';

      export function useTest(): [number, (n: number) => void] {
        const [count, setCount] = useState(0);
        return [count, setCount];
      }
    `,
    tsx`const [fooBarBaz, setFooBarBaz] = useState({ foo: "a", bar: "b" });`,
    tsx`const [fooBarBaz, set_foo_bar_baz] = useState({ foo: "a", bar: "b" });`,
    tsx`const [foo_bar_baz, set_foo_bar_baz] = useState({ foo: "a", bar: "b" });`,
    tsx`const [FooBarBaz, setFooBarBaz] = useState({ foo: "a", bar: "b" });`,
    // --- Lazy initialization (valid) ---
    // These cases use enforceAssignment: false to focus purely on lazy-init behavior.
    ...[
      "useState()",
      'useState("")',
      "useState(true)",
      "useState(false)",
      "useState(null)",
      "useState(undefined)",
      "useState(1)",
      'useState("test")',
      "useState(value)",
      "useState(object.value)",
      "useState(1 || 2)",
      "useState(1 || 2 || 3 < 4)",
      "useState(1 && 2)",
      "useState(1 < 2)",
      "useState(1 < 2 ? 3 : 4)",
      "useState(1 == 2 ? 3 : 4)",
      "useState(1 === 2 ? 3 : 4)",
      "React.useState()",
      'React.useState("")',
      "React.useState(true)",
      "React.useState(false)",
      "React.useState(null)",
      "React.useState(undefined)",
      "React.useState(1)",
      'React.useState("test")',
      "React.useState(value)",
      "React.useState(object.value)",
      "React.useState(1 || 2)",
      "React.useState(1 || 2 || 3 < 4)",
      "React.useState(1 && 2)",
      "React.useState(1 < 2)",
      "React.useState(1 < 2 ? 3 : 4)",
      "React.useState(1 == 2 ? 3 : 4)",
      "React.useState(1 === 2 ? 3 : 4)",
      'import { useState } from "react"; useState()',
      'import { useState } from "react"; useState(() => JSON.parse("{}"))',
      'import { useState } from "react"; useState("")',
      'import { useState } from "react"; useState(true)',
      'import { useState } from "react"; useState(false)',
      'import { useState } from "react"; useState(null)',
      'import { useState } from "react"; useState(undefined)',
      'import { useState } from "react"; useState(1)',
      'import { useState } from "react"; useState("test")',
      'import { useState } from "react"; useState(value)',
      'import { useState } from "react"; useState(object.value)',
      'import { useState } from "react"; useState(1 || 2)',
      'import { useState } from "react"; useState(1 || 2 || 3 < 4)',
      'import { useState } from "react"; useState(1 && 2)',
      'import { useState } from "react"; useState(1 < 2)',
      'import { useState } from "react"; useState(1 < 2 ? 3 : 4)',
      'import { useState } from "react"; useState(1 == 2 ? 3 : 4)',
      'import { useState } from "react"; useState(1 === 2 ? 3 : 4)',
      'const { useState } = require("react"); useState()',
      'const { useState } = require("react"); useState("")',
      'const { useState } = require("react"); useState(true)',
      'const { useState } = require("react"); useState(false)',
      'const { useState } = require("react"); useState(null)',
      'const { useState } = require("react"); useState(undefined)',
      'const { useState } = require("react"); useState(1)',
      'const { useState } = require("react"); useState("test")',
      'const { useState } = require("react"); useState(value)',
      'const { useState } = require("react"); useState(object.value)',
      'const { useState } = require("react"); useState(1 || 2)',
      'const { useState } = require("react"); useState(1 || 2 || 3 < 4)',
      'const { useState } = require("react"); useState(1 && 2)',
      'const { useState } = require("react"); useState(1 < 2)',
      'const { useState } = require("react"); useState(1 < 2 ? 3 : 4)',
      'const { useState } = require("react"); useState(1 == 2 ? 3 : 4)',
      'const { useState } = require("react"); useState(1 === 2 ? 3 : 4)',
    ].map((code) => ({ code, options: [{ enforceAssignment: false }] as const })),
    // Cases with proper destructuring — use() calls must not trigger invalidInitialization
    "const [id, setId] = useState(useId());",
    "const [state, setState] = useState(use(promise));",
    "const [likes, setLikes] = useState(use(getLikes()));",
    "const [data, setData] = useState(use(getData()) || []);",
    "const [character, setCharacter] = useState(use(props.character) ?? undefined);",
    {
      code: tsx`
        import { useState, use } from 'react';

        function Shell({data}) {
          const [root, setRoot] = useState(use(data));
          updateRoot = setRoot;
          return root;
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
        function Component() {
          usePreviousState(0);

          return <div />;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
        const prev = usePreviousState(0);

          return <div />;
        }
      `,
    },
    // useState result wrapped in TSAsExpression (should not report invalidAssignment)
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0) as [number, (n: number) => void];
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        import React from 'react';
        export default function useColor() {
          // useState result is directly returned
          return React.useState();
        }
      `,
    },
    // useState result is directly returned — allowed regardless of options
    // https://github.com/Rel1cx/eslint-react/issues/1963
    tsx`
      function useColor() {
        return useState(0);
      }
    `,
    {
      code: tsx`
        function useColor() {
          return React.useState();
        }
      `,
      options: [{ enforceAssignment: true, enforceLazyInitialization: true, enforceSetterName: true }],
    },
    {
      code: tsx`
        const useColor = () => useState("red");
      `,
    },
    {
      code: tsx`
        function useCounter() {
          return useState(0) as [number, (n: number) => void];
        }
      `,
    },
    // Ported from https://github.com/oxc-project/oxc/issues/24952
    // Intentionally unused getter/setter names are allowed when setter-name enforcement is
    // opted out via `enforceSetterName: false`
    {
      code: tsx`
        const Component = () => {
          const [_, id] = useState(1);
        }
      `,
      options: [{ enforceSetterName: false }],
    },
    {
      code: tsx`
        const Component = () => {
          const [id, _] = useState(1);
        }
      `,
      options: [{ enforceSetterName: false }],
    },
  ],
});

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    ["react-x"]?: Partial<ESLintReactSettings>;
  }
}
