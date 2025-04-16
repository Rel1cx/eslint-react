import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-misused-capture-owner-stack";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `import { captureOwnerStack } from 'react';`,
      errors: [
        {
          type: T.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
      ],
    },
    {
      code: `import { captureOwnerStack } from "react";`,
      errors: [
        {
          type: T.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Using named import directly
        import { captureOwnerStack } from "react";

        if (process.env.NODE_ENV !== "production") {
          const ownerStack = React.captureOwnerStack();
          console.log("Owner Stack", ownerStack);
        }
      `,
      errors: [
        {
          type: T.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Missing environment check
        import * as React from "react";

        const ownerStack = React.captureOwnerStack();

        console.log("Owner Stack", ownerStack);
      `,
      errors: [
        {
          type: T.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Using named import directly without environment check
        import { captureOwnerStack } from "react";

        const ownerStack = captureOwnerStack();

        console.log("Owner Stack", ownerStack);
      `,
      errors: [
        {
          type: T.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
        {
          type: T.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
  ],
  valid: [
    {
      code: `import * as React from 'react';`,
    },
    {
      code: `import {useState} from 'react';`,
    },
    {
      code: `import {} from 'react';`,
    },
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
      code: tsx`
        // Passing: Correct namespace import with environment check
        import * as React from "react";

        if (process.env.NODE_ENV !== "production") {
          const ownerStack = React.captureOwnerStack();
          console.log("Owner Stack", ownerStack);
        }
      `,
    },
    {
      code: `import * as React from "@pika/react";`,
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
  ],
});
