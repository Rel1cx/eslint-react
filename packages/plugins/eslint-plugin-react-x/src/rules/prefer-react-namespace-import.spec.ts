import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-react-namespace-import";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `import React from 'react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDeclaration, messageId: "preferReactNamespaceImport" }],
      output: `import * as React from 'react';`,
    },
    {
      code: `import REACT from 'react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDeclaration, messageId: "preferReactNamespaceImport" }],
      output: `import * as REACT from 'react';`,
    },
    {
      code: `import type React from 'react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDeclaration, messageId: "preferReactNamespaceImport" }],
      output: `import type * as React from 'react';`,
    },
    {
      code: `import React, {useState} from 'react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDefaultSpecifier, messageId: "preferReactNamespaceImport" }],
      output: `import * as React from 'react';\nimport {useState} from 'react';`,
    },
    {
      code: `import React, {useState, useReducer} from 'react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDefaultSpecifier, messageId: "preferReactNamespaceImport" }],
      output: `import * as React from 'react';\nimport {useState, useReducer} from 'react';`,
    },
    {
      code: `import REACT, {useState} from 'react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDefaultSpecifier, messageId: "preferReactNamespaceImport" }],
      output: `import * as REACT from 'react';\nimport {useState} from 'react';`,
    },
    {
      code: `import type React, {useState} from 'react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDefaultSpecifier, messageId: "preferReactNamespaceImport" }],
      output: `import type * as React from 'react';\nimport type {useState} from 'react';`,
    },
    // TODO: Add support for custom import source (https://eslint-react.xyz/docs/configuration#importsource)
    {
      code: `import type React, {useState} from '@pika/react';`,
      errors: [{ type: AST_NODE_TYPES.ImportDefaultSpecifier, messageId: "preferReactNamespaceImport" }],
      output: `import type * as React from '@pika/react';\nimport type {useState} from '@pika/react';`,
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
  ],
  valid: [
    {
      code: `import * as React from "react";`,
    },
    {
      code: `import {useState} from "react";`,
    },
    {
      code: `import {} from "react";`,
    },
    {
      code: `import type React, {useState} from "@pika/react";`,
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
  ],
});
