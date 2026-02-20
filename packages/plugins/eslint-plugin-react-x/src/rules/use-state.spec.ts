import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
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
      errors: [{ messageId: "invalidAssignment" }],
    },
    {
      code: tsx`
        function Component() {
          const data = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalidAssignment" }],
    },
    {
      code: tsx`
        function Component() {
          const [state, setValue] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalidSetterName" }],
    },
    {
      code: tsx`
        function Component() {
          const [state, set] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalidSetterName" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [state, sseettState] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalidSetterName" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [state, setstate] = useState(0);

          return <div />;
        }
      `,
      errors: [{ messageId: "invalidSetterName" }],
    },
    {
      code: tsx`
        import { useState } from 'react';

        export function useTest(): [number, (n: number) => void] {
          const [count1, setCount] = useState(0);
          return [count1, setCount];
        }
      `,
      errors: [{ messageId: "invalidSetterName" }],
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
      errors: [{ messageId: "invalidAssignment" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [{ foo, bar, baz }, anythingGoes] = useState({ foo: "a", bar: "b", baz: "c" });

          return <div />;
        }
      `,
      errors: [{ messageId: "invalidAssignment" }],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [{ foo, bar, baz }, setJustSomeName] = useState({ foo: "a", bar: "b", baz: "c" });

          return <div />;
        }
      `,
      errors: [{ messageId: "invalidAssignment" }],
    },
    // --- Lazy initialization ---
    {
      code: `import { useState } from "react"; useState(1 || getValue())`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(2 < getValue())`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(1 < 2 ? getValue() : 4)`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a ? b : getValue())`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(getValue() ? b : c)`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a ? (b ? getValue() : b2) : c)`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(getValue() && b)`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a() && new Foo())`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
        {
          type: AST.NewExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(+getValue())`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(getValue() + 1)`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState([getValue()])`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState({ a: getValue() })`,
      options: [{ enforceAssignment: false }],
      errors: [
        {
          type: AST.CallExpression,
          messageId: "invalidInitialization",
        },
      ],
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
          messageId: "invalidInitialization",
        },
      ],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
  valid: [
    ...allFunctions,
    // --- Assignment / setter naming ---
    tsx`
      import { useState } from "react";

      const [value] = useState(() => expensiveSetup());
    `,
    tsx`
      const [memoisedValue] = React.useState(() => calculateValue());
    `,
    tsx`
      import { useState } from "react";

      function Component() {
        const [state, setState] = useState(0);

        return <div />;
      }
    `,
    tsx`
      import { useState } from 'react';

      export function useTest(): [number, (n: number) => void] {
        const [count, setCount] = useState(0);
        return [count, setCount];
      }
    `,
    tsx`const [myCount, setMyCount] = useState(0);`,
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
  ],
});
