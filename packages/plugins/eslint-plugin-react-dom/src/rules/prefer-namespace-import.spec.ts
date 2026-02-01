import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-namespace-import";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `import ReactDOM from 'react-dom';`,
      errors: [{ type: AST.ImportDeclaration, messageId: "default" }],
      output: `import * as ReactDOM from 'react-dom';`,
    },
    {
      code: `import ReactDom from 'react-dom';`,
      errors: [{ type: AST.ImportDeclaration, messageId: "default" }],
      output: `import * as ReactDom from 'react-dom';`,
    },
    {
      code: `import REACTDOM from 'react-dom';`,
      errors: [{ type: AST.ImportDeclaration, messageId: "default" }],
      output: `import * as REACTDOM from 'react-dom';`,
    },
    {
      code: `import ReactDOM from 'react-dom/client';`,
      errors: [{ type: AST.ImportDeclaration, messageId: "default" }],
      output: `import * as ReactDOM from 'react-dom/client';`,
    },
    {
      code: `import ReactDom from 'react-dom/client';`,
      errors: [{ type: AST.ImportDeclaration, messageId: "default" }],
      output: `import * as ReactDom from 'react-dom/client';`,
    },
    {
      code: `import REACTDOM from 'react-dom/client';`,
      errors: [{ type: AST.ImportDeclaration, messageId: "default" }],
      output: `import * as REACTDOM from 'react-dom/client';`,
    },
  ],
  valid: [
    {
      code: `import React from 'react';`,
    },
    {
      code: `import * as React from 'react';`,
    },
    {
      code: `import { createRoot } from 'react-dom/client';`,
    },
    {
      code: `import * as ReactDOM from 'react-dom';`,
    },
    {
      code: `import * as ReactDOM from 'react-dom/client';`,
    },
    {
      code: `import * as ReactDOM from 'react-dom/server';`,
    },
    {
      code: `import * as ReactDom from 'react-dom';`,
    },
    {
      code: `import * as ReactDom from 'react-dom/client';`,
    },
    {
      code: `import * as ReactDom from 'react-dom/server';`,
    },
    {
      code: `import * as REACTDOM from 'react-dom';`,
    },
    {
      code: `import * as REACTDOM from 'react-dom/client';`,
    },
    {
      code: `import * as REACTDOM from 'react-dom/server';`,
    },
  ],
});
