import tsx from "dedent";

import { ruleTester } from "#/test";
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
    {
      code: tsx`
        import { createContext } from "react";
        const ThemeContext2 = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        class Foo { theme = createContext(""); }
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        obj.nested.theme = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const contexts = { ThemeContext: createContext("") };
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
  ],
  valid: [
    tsx`
      import { createContext } from "react";
      const Context = createContext("");
    `,
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
    tsx`
      import { createContext } from "react";
      const AContext = createContext("");
    `,
    tsx`
      import { createContext } from "react";
      const MyUIContext = createContext("");
    `,
    tsx`
      import { createContext } from "react";
      createContext("");
    `,
    tsx`
      import { createContext } from "react";
      export default createContext("");
    `,
    tsx`
      import { createContext } from "react";
      class Foo { ThemeContext = createContext(""); }
    `,
    tsx`
      import { createContext } from "react";
      obj.nested.ThemeContext = createContext("");
    `,
    tsx`
      import { createContext } from "react";
      const Theme_Context = createContext("");
    `,
  ],
});
