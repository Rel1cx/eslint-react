import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./context-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { createContext } from "react";
        const Theme = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const theme = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import React from "react";
        const Theme = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import React from "react";
        const theme = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        const themecontext = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        const themeContext = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        ctxs.themecontext = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        const themecontext = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
  valid: [
    tsx`
      import { createContext } from "react";
      const ThemeContext = createContext("");
    `,
    tsx`
      import React from "react";
      const ThemeContext = React.createContext("");
    `,
    tsx`
      const ThemeContext = createContext("");
    `,
    tsx`
      const ThemeContext = React.createContext("");
    `,
    tsx`
      ctxs.ThemeContext = createContext("");
    `,
  ],
});
