import { NodeType } from "@eslint-react/ast";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./prefer-use-state-lazy-initialization";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
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
  ],
  invalid: [
    {
      code: 'import { useState } from "react"; useState(1 || getValue())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.LogicalExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(2 < getValue())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.BinaryExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(getValue())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.CallExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(getValue(1, 2, 3))',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.CallExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a ? b : c())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.ConditionalExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a() ? b : c)',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.ConditionalExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a ? (b ? b1() : b2) : c)',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.ConditionalExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a() && b)',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.LogicalExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a && b())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.LogicalExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(a() && b())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.LogicalExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(+b())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.UnaryExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(-b())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.UnaryExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(~b())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.UnaryExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(!b())',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.UnaryExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(b() + 1)',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.BinaryExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState(b() - 1)',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.BinaryExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState([b()])',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.ArrayExpression,
        },
      ],
    },
    {
      code: 'import { useState } from "react"; useState({ a: b() })',
      errors: [
        {
          messageId: "PREFER_USE_STATE_LAZY_INITIALIZATION",
          type: NodeType.ObjectExpression,
        },
      ],
    },
  ],
});
