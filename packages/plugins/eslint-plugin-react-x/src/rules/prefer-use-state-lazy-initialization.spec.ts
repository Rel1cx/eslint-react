import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-use-state-lazy-initialization";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `import { useState } from "react"; useState(1 || getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(2 < getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(1 < 2 ? getValue() : 4)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a ? b : getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(getValue() ? b : c)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a ? (b ? getValue() : b2) : c)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(getValue() && b)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(a() && new Foo())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
        {
          type: AST.NewExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(+getValue())`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState(getValue() + 1)`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState([getValue()])`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
        },
      ],
    },
    {
      code: `import { useState } from "react"; useState({ a: getValue() })`,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "default",
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
          messageId: "default",
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
    "const [id, setId] = useState(useId());",
    "const [state, setState] = useState(use(promise));",
    "const [serverData, setLikes] = useState(use(getLikes()));",
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
