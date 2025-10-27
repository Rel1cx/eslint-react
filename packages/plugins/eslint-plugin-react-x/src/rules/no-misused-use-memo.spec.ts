import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-misused-use-memo";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React, { useMemo } from "react";

        function MyComponent(props) {
          const data = useMemo(() => {
            fetch("/api/data"); // Side effect
            return props.initialData;
          }, [props.initialData]);

          return <div>{data}</div>;
        }
      `,
      errors: [
        {
          type: T.CallExpression,
          messageId: "noMisusedUseMemo",
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
  ],
});
