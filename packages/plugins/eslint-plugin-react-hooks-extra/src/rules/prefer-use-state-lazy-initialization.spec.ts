import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-use-state-lazy-initialization";

ruleTester.run(RULE_NAME, rule, {
  invalid: ([
    ["getValue()", T.CallExpression],
    ["getValue(1, 2, 3)", T.CallExpression],
    ["new Foo()", T.NewExpression],
  ] satisfies [string, T][]).flatMap(([expression, type]) => [
    {
      code: `import { useState } from "react"; useState(1 || ${expression})`,
      errors: [
        {
          type: T.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(2 < ${expression})`,
      errors: [
        {
          type: T.BinaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(${expression})`,
      errors: [
        {
          type,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a ? b : ${expression})`,
      errors: [
        {
          type: T.ConditionalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(${expression} ? b : c)`,
      errors: [
        {
          type: T.ConditionalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a ? (b ? ${expression} : b2) : c)`,
      errors: [
        {
          type: T.ConditionalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(${expression} && b)`,
      errors: [
        {
          type: T.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a && ${expression})`,
      errors: [
        {
          type: T.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(${expression} && b())`,
      errors: [
        {
          type: T.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a() && ${expression})`,
      errors: [
        {
          type: T.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(+${expression})`,
      errors: [
        {
          type: T.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(-${expression})`,
      errors: [
        {
          type: T.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(~${expression})`,
      errors: [
        {
          type: T.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(!${expression})`,
      errors: [
        {
          type: T.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(${expression} + 1)`,
      errors: [
        {
          type: T.BinaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(${expression} - 1)`,
      errors: [
        {
          type: T.BinaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState([${expression}])`,
      errors: [
        {
          type: T.ArrayExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState({ a: ${expression} })`,
      errors: [
        {
          type: T.ObjectExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: tsx`useLocalStorageState(1 || ${expression})`,
      errors: [
        {
          type: T.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useState: ["useLocalStorageState"],
          },
        },
      },
    },
  ]),
  valid: [
    ...allValid,
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
    "const [state, setState] = useState(use(promise));",
    {
      code: tsx`
        import { useState, use } from 'react';

        const promise = Promise.resolve();

        function App() {
          const [state, setState] = useState(use(promise));

          return null;
        }

        export default App;
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: "useLocalStorageState()",
      settings: {
        "react-x": {
          additionalHooks: {
            useState: ["useLocalStorageState"],
          },
        },
      },
    },
    {
      code: tsx`
        import { useState } from 'react';

        function getValue() {
          return 0;
        }

        function App() {
          const [count, setCount] = useState(() => getValue());

          return null;
        }

        export default App;
      `,
      settings: {
        "react-x": {
          additionalHooks: {
            useState: ["useLocalStorageState"],
          },
        },
      },
    },
  ],
});
