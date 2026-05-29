import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-misused-capture-owner-stack";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `import { captureOwnerStack } from 'react';`,
      errors: [
        {
          type: AST.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
      ],
    },
    {
      code: `import { captureOwnerStack } from "react";`,
      errors: [
        {
          type: AST.ImportSpecifier,
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
          type: AST.ImportSpecifier,
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
          type: AST.CallExpression,
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
          type: AST.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Missing environment check with TSAsExpression on object
        import * as React from "react";

        const ownerStack = (React as any).captureOwnerStack();
      `,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Missing environment check with TSTypeAssertion on object
        import * as React from "react";

        const ownerStack = (<any>React).captureOwnerStack();
      `,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: false },
        },
      },
      errors: [
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Missing environment check with TSNonNullExpression on object
        import * as React from "react";

        const ownerStack = React!.captureOwnerStack();
      `,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Missing environment check with optional member expression
        import * as React from "react";

        const ownerStack = React?.captureOwnerStack();
      `,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Missing environment check with optional call expression
        import * as React from "react";

        const ownerStack = React.captureOwnerStack?.();
      `,
      errors: [
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Named import with TSAsExpression on callee
        import { captureOwnerStack } from "react";

        const ownerStack = (captureOwnerStack as any)();
      `,
      errors: [
        {
          type: AST.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Named import with TSTypeAssertion on callee
        import { captureOwnerStack } from "react";

        const ownerStack = (<any>captureOwnerStack)?.();
      `,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: false },
        },
      },
      errors: [
        {
          type: AST.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Named import with TSTypeAssertion on callee
        import { captureOwnerStack } from "react";

        const ownerStack = (<() => {}>captureOwnerStack)?.()!;
      `,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: false },
        },
      },
      errors: [
        {
          type: AST.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Multi-layer TS wrapper with namespace member call
        import { captureOwnerStack } from "react";

        const ownerStack = (<object?>(React as unknown)?.captureOwnerStack)?.()!;
      `,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: false },
        },
      },
      errors: [
        {
          type: AST.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
        {
          type: AST.CallExpression,
          messageId: "missingDevelopmentOnlyCheck",
        },
      ],
    },
    {
      code: tsx`
        // Failing: Named import with TSNonNullExpression on callee
        import { captureOwnerStack } from "react";

        const ownerStack = captureOwnerStack!();
      `,
      errors: [
        {
          type: AST.ImportSpecifier,
          messageId: "useNamespaceImport",
        },
        {
          type: AST.CallExpression,
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
    {
      code: tsx`
        // Passing: TSAsExpression on object with environment check
        import * as React from "react";

        if (process.env.NODE_ENV !== "production") {
          const ownerStack = (React as any).captureOwnerStack();
        }
      `,
    },
    {
      code: tsx`
        // Passing: TSTypeAssertion on object with environment check
        import * as React from "react";

        if (process.env.NODE_ENV !== "production") {
          const ownerStack = (<any>React).captureOwnerStack();
        }
      `,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: false },
        },
      },
    },
    {
      code: tsx`
        // Passing: TSNonNullExpression on object with environment check
        import * as React from "react";

        if (process.env.NODE_ENV !== "production") {
          const ownerStack = React!.captureOwnerStack();
        }
      `,
    },
    {
      code: tsx`
        // Passing: Optional member expression with environment check
        import * as React from "react";

        if (process.env.NODE_ENV !== "production") {
          const ownerStack = React?.captureOwnerStack();
        }
      `,
    },
    {
      code: tsx`
        // Passing: Optional call expression with environment check
        import * as React from "react";

        if (process.env.NODE_ENV !== "production") {
          const ownerStack = React.captureOwnerStack?.();
        }
      `,
    },
    {
      code: tsx`
        // Passing: Optional call expression with environment check
        import * as React from "react";

        if (process?.env?.NODE_ENV !== "production") {
          const ownerStack = React.captureOwnerStack();
        }
      `,
    },
  ],
});
