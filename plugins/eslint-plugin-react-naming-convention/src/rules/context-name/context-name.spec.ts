import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./context-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Variable declarations with invalid context names
    {
      name: "PascalCase name without 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const Theme = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Lowercase name without 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const theme = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "PascalCase name without 'Context' suffix via React namespace",
      code: tsx`
        import React from "react";
        const Theme = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Lowercase name without 'Context' suffix via React namespace",
      code: tsx`
        import React from "react";
        const theme = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Lowercase 'context' suffix",
      code: tsx`
        const themecontext = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Lowercase 'context' suffix with React version settings",
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
      name: "CamelCase 'Context' suffix on a lowercase name",
      code: tsx`
        const themeContext = React.createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "All-caps 'CONTEXT' suffix",
      code: tsx`
        import { createContext } from "react";
        const ThemeCONTEXT = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Name with trailing digit after 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const ThemeContext2 = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "'Context' not at the end of the name",
      code: tsx`
        import { createContext } from "react";
        const MyContextExtra = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "All-caps name",
      code: tsx`
        import { createContext } from "react";
        const CONTEXT = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Single-letter name",
      code: tsx`
        import { createContext } from "react";
        const C = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Leading underscore in name",
      code: tsx`
        import { createContext } from "react";
        const _Context = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Multiple declarators with an invalid context name",
      code: tsx`
        import { createContext } from "react";
        const ThemeContext = createContext(""), value = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    // Other assignment targets
    {
      name: "Member expression assignment with invalid context name",
      code: tsx`
        ctxs.themecontext = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Class property with invalid context name",
      code: tsx`
        import { createContext } from "react";
        class Foo { theme = createContext(""); }
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Nested member expression assignment with invalid context name",
      code: tsx`
        import { createContext } from "react";
        obj.nested.theme = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Variable initialized with an object literal containing createContext",
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
      name: "Assignment after declaration with invalid context name",
      code: tsx`
        import { createContext } from "react";
        let value;
        value = createContext("");
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Chained assignment with invalid context name",
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
      name: "Computed member expression assignment with invalid context name",
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
    // Indirect createContext calls
    {
      name: "Conditional expression initializer with invalid context name",
      code: tsx`
        import { createContext } from "react";
        const value = condition ? createContext("") : null;
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Logical expression initializer with invalid context name",
      code: tsx`
        import { createContext } from "react";
        const value = createContext("") || null;
      `,
      errors: [{ messageId: "invalidContextName" }],
    },
    {
      name: "Arrow function returning createContext with invalid context name",
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
      name: "createContext call on a non-React namespace with invalid context name",
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
  ],
  valid: [
    // Variable declarations with valid context names
    {
      name: "Name 'Context'",
      code: tsx`
        import { createContext } from "react";
        const Context = createContext("");
      `,
    },
    {
      name: "PascalCase name with 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const ThemeContext = createContext("");
      `,
    },
    {
      name: "PascalCase name with 'Context' suffix via React namespace",
      code: tsx`
        import React from "react";
        const ThemeContext = React.createContext("");
      `,
    },
    {
      name: "PascalCase name with 'Context' suffix without import",
      code: tsx`
        const ThemeContext = createContext("");
      `,
    },
    {
      name: "PascalCase name with 'Context' suffix via React namespace without import",
      code: tsx`
        const ThemeContext = React.createContext("");
      `,
    },
    {
      name: "Short name with 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const AContext = createContext("");
      `,
    },
    {
      name: "Name with acronym and 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const MyUIContext = createContext("");
      `,
    },
    {
      name: "Name with underscore and 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const Theme_Context = createContext("");
      `,
    },
    {
      name: "Short name with underscore and 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const A_Context = createContext("");
      `,
    },
    // Other assignment targets with valid context names
    {
      name: "Member expression assignment with valid context name",
      code: tsx`
        ctxs.ThemeContext = createContext("");
      `,
    },
    {
      name: "Computed member expression assignment with valid context name",
      code: tsx`
        import { createContext } from "react";
        ctxs["ThemeContext"] = createContext("");
      `,
    },
    {
      name: "Class property with valid context name",
      code: tsx`
        import { createContext } from "react";
        class Foo { ThemeContext = createContext(""); }
      `,
    },
    {
      name: "Nested member expression assignment with valid context name",
      code: tsx`
        import { createContext } from "react";
        obj.nested.ThemeContext = createContext("");
      `,
    },
    {
      name: "Assignment after declaration with valid context name",
      code: tsx`
        import { createContext } from "react";
        let ThemeContext;
        ThemeContext = createContext("");
      `,
    },
    {
      name: "Conditional expression initializer with valid context name",
      code: tsx`
        import { createContext } from "react";
        const ThemeContext = condition ? createContext("") : null;
      `,
    },
    {
      name: "Logical expression initializer with valid context name",
      code: tsx`
        import { createContext } from "react";
        const ThemeContext = createContext("") || null;
      `,
    },
    // Code not subject to the rule
    {
      name: "Unassigned createContext call",
      code: tsx`
        import { createContext } from "react";
        createContext("");
      `,
    },
    {
      name: "Default exported createContext call",
      code: tsx`
        import { createContext } from "react";
        export default createContext("");
      `,
    },
    {
      name: "Destructured createContext result",
      code: tsx`
        import { createContext } from "react";
        const { theme } = createContext({ theme: "" });
      `,
    },
    {
      name: "Aliased createContext import",
      code: tsx`
        import { createContext as makeContext } from "react";
        const theme = makeContext("");
      `,
    },
    {
      name: "Arrow function with block body returning createContext",
      code: tsx`
        const theme = () => {
          return createContext("");
        };
      `,
    },
    {
      name: "Computed member expression assignment with non-context name",
      code: tsx`
        import { createContext } from "react";
        ctxs["theme"] = createContext("");
      `,
    },
  ],
});
