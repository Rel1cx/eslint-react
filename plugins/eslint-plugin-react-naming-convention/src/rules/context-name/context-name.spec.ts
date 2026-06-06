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
    {
      code: tsx`
        import { createContext } from "react";
        const ThemeCONTEXT = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const _Context = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const MyContextExtra = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        let value;
        value = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const value = condition ? createContext("") : null;
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const value = createContext("") || null;
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        a = b = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const CONTEXT = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const C = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      code: tsx`
        import { createContext } from "react";
        const ThemeContext = createContext(""), value = createContext("");
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
    tsx`
      import { createContext } from "react";
      let ThemeContext;
      ThemeContext = createContext("");
    `,
    tsx`
      import { createContext } from "react";
      const ThemeContext = condition ? createContext("") : null;
    `,
    tsx`
      import { createContext } from "react";
      const ThemeContext = createContext("") || null;
    `,
    tsx`
      import { createContext } from "react";
      ctxs["ThemeContext"] = createContext("");
    `,
    tsx`
      import { createContext } from "react";
      const A_Context = createContext("");
    `,
  ],
});
