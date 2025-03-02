import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./context-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { createContext } from "react";
        const Theme = createContext("");
      `,
      errors: [{ messageId: "invalid" }],
    },
    {
      code: /* tsx */ `
        import { createContext } from "react";
        const theme = createContext("");
      `,
      errors: [{ messageId: "invalid" }],
    },
    {
      code: /* tsx */ `
        import React from "react";
        const Theme = React.createContext("");
      `,
      errors: [{ messageId: "invalid" }],
    },
    {
      code: /* tsx */ `
        import React from "react";
        const theme = React.createContext("");
      `,
      errors: [{ messageId: "invalid" }],
    },
    {
      code: /* tsx */ `
        const themecontext = React.createContext("");
      `,
      errors: [{ messageId: "invalid" }],
    },
    {
      code: /* tsx */ `
        const themeContext = React.createContext("");
      `,
      errors: [{ messageId: "invalid" }],
    },
  ],
  valid: [
    ...allFunctions,
    /* tsx */ `
      import { createContext } from "react";
      const ThemeContext = createContext("");
    `,
    /* tsx */ `
      import React from "react";
      const ThemeContext = React.createContext("");
    `,
    /* tsx */ `
      const ThemeContext = createContext("");
    `,
  ],
});
