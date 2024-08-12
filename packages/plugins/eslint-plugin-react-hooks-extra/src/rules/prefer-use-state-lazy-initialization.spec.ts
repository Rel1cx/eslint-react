import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-use-state-lazy-initialization";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: 'import { useState } from "react"; useState(1 || getValue())',
      errors: [
        {
          type: AST_NODE_TYPES.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(2 < getValue())',
      errors: [
        {
          type: AST_NODE_TYPES.BinaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(getValue())',
      errors: [
        {
          type: AST_NODE_TYPES.CallExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(getValue(1, 2, 3))',
      errors: [
        {
          type: AST_NODE_TYPES.CallExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a ? b : c())',
      errors: [
        {
          type: AST_NODE_TYPES.ConditionalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a() ? b : c)',
      errors: [
        {
          type: AST_NODE_TYPES.ConditionalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a ? (b ? b1() : b2) : c)',
      errors: [
        {
          type: AST_NODE_TYPES.ConditionalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a() && b)',
      errors: [
        {
          type: AST_NODE_TYPES.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a && b())',
      errors: [
        {
          type: AST_NODE_TYPES.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a() && b())',
      errors: [
        {
          type: AST_NODE_TYPES.LogicalExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(+b())',
      errors: [
        {
          type: AST_NODE_TYPES.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(-b())',
      errors: [
        {
          type: AST_NODE_TYPES.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(~b())',
      errors: [
        {
          type: AST_NODE_TYPES.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(!b())',
      errors: [
        {
          type: AST_NODE_TYPES.UnaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(b() + 1)',
      errors: [
        {
          type: AST_NODE_TYPES.BinaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(b() - 1)',
      errors: [
        {
          type: AST_NODE_TYPES.BinaryExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState([b()])',
      errors: [
        {
          type: AST_NODE_TYPES.ArrayExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState({ a: b() })',
      errors: [
        {
          type: AST_NODE_TYPES.ObjectExpression,
          messageId: "preferUseStateLazyInitialization",
        },
      ],
    },
    {
      code: /* tsx */ `useLocalStorageState(1 || getValue())`,
      errors: [
        {
          type: AST_NODE_TYPES.LogicalExpression,
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
  ],
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
      code: /* tsx */ `
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
