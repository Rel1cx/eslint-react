import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
        const theme = "theme";
        ctxs[theme] = createContext("");
      `,
      errors: [{
        column: 1,
        endColumn: 12,
        endLine: 2,
        line: 2,
        messageId: "invalidContextName",
        suggestions: [],
      }],
      output: null,
    },
    {
      code: tsx`
        const theme = custom.createContext("");
      `,
      errors: [{
        column: 7,
        endColumn: 12,
        endLine: 1,
        line: 1,
        messageId: "invalidContextName",
        suggestions: [],
      }],
      output: null,
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
      errors: [{
        column: 7,
        endColumn: 15,
        endLine: 2,
        line: 2,
        messageId: "invalidContextName",
        suggestions: [],
      }],
      output: null,
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
      errors: [{
        column: 5,
        endColumn: 6,
        endLine: 2,
        line: 2,
        messageId: "invalidContextName",
        suggestions: [],
      }],
      output: null,
    },
    {
      code: tsx`
        const theme = () => createContext("");
      `,
      errors: [{
        column: 7,
        endColumn: 12,
        endLine: 1,
        line: 1,
        messageId: "invalidContextName",
        suggestions: [],
      }],
      output: null,
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
      ctxs["theme"] = createContext("");
    `,
    tsx`
      import { createContext } from "react";
      const { theme } = createContext({ theme: "" });
    `,
    tsx`
      import { createContext as makeContext } from "react";
      const theme = makeContext("");
    `,
    tsx`
      const theme = () => {
        return createContext("");
      };
    `,
    tsx`
      import { createContext } from "react";
      const A_Context = createContext("");
    `,
  ],
});
