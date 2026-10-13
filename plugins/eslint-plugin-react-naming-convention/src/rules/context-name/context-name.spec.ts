import tsx from "dedent";

import { ruleTester } from "@local/testkit";
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
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Lowercase name without 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const theme = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "PascalCase name without 'Context' suffix via React namespace",
      code: tsx`
        import React from "react";
        const Theme = React.createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Lowercase name without 'Context' suffix via React namespace",
      code: tsx`
        import React from "react";
        const theme = React.createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Lowercase 'context' suffix",
      code: tsx`
        const themecontext = React.createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Lowercase 'context' suffix with React version settings",
      code: tsx`
        const themecontext = React.createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
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
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "All-caps 'CONTEXT' suffix",
      code: tsx`
        import { createContext } from "react";
        const ThemeCONTEXT = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Name with trailing digit after 'Context' suffix",
      code: tsx`
        import { createContext } from "react";
        const ThemeContext2 = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "'Context' not at the end of the name",
      code: tsx`
        import { createContext } from "react";
        const MyContextExtra = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "All-caps name",
      code: tsx`
        import { createContext } from "react";
        const CONTEXT = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Single-letter name",
      code: tsx`
        import { createContext } from "react";
        const C = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Leading underscore in name",
      code: tsx`
        import { createContext } from "react";
        const _Context = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Multiple declarators with an invalid context name",
      code: tsx`
        import { createContext } from "react";
        const ThemeContext = createContext(""), value = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    // Other assignment targets
    {
      name: "Member expression assignment with invalid context name",
      code: tsx`
        ctxs.themecontext = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Class property with invalid context name",
      code: tsx`
        import { createContext } from "react";
        class Foo { theme = createContext(""); }
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Nested member expression assignment with invalid context name",
      code: tsx`
        import { createContext } from "react";
        obj.nested.theme = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Object literal property with invalid context name key",
      code: tsx`
        import { createContext } from "react";
        const contexts = { theme: createContext("") };
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Nested object literal property resolves the innermost key",
      code: tsx`
        import { createContext } from "react";
        const contexts = { outer: { theme: createContext("") } };
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Class property with computed string-literal key with invalid context name",
      code: tsx`
        import { createContext } from "react";
        class Store {
          ["theme"] = createContext("");
        }
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Assignment after declaration with invalid context name",
      code: tsx`
        import { createContext } from "react";
        let value;
        value = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
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
        messageId: "invalid-context-name",
        suggestions: [],
      }],
      output: null,
    },
    {
      name: "Computed member expression assignment with string-literal key with invalid context name",
      code: tsx`
        import { createContext } from "react";
        ctxs["theme"] = createContext("");
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    // Indirect createContext calls
    {
      name: "Conditional expression initializer with invalid context name",
      code: tsx`
        import { createContext } from "react";
        const value = condition ? createContext("") : null;
      `,
      errors: [{ messageId: "invalid-context-name" }],
    },
    {
      name: "Logical expression initializer with invalid context name",
      code: tsx`
        import { createContext } from "react";
        const value = createContext("") || null;
      `,
      errors: [{ messageId: "invalid-context-name" }],
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
        messageId: "invalid-context-name",
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
      name: "Arrow function with expression body returning createContext",
      code: tsx`
        import { createContext } from "react";
        const theme = () => createContext("");
      `,
    },
    {
      name: "Exported context factory with expression body",
      code: tsx`
        import { createContext } from "react";
        export const createThemeContext = () => createContext(null);
      `,
    },
    {
      name: "Arrow function implicit return of object literal containing createContext",
      code: tsx`
        import { createContext } from "react";
        const useTheme = () => ({ theme: createContext("") });
      `,
    },
    {
      name: "createContext call returned from an IIFE",
      code: tsx`
        import { createContext } from "react";
        const value = (() => createContext(""))();
      `,
    },
    {
      name: "createContext call in a JSX attribute value",
      code: tsx`
        import { createContext } from "react";
        const el = <Ctx.Provider value={createContext("")} />;
      `,
    },
    {
      name: "createContext call in a class static block",
      code: tsx`
        import { createContext } from "react";
        const C = class {
          static {
            createContext("");
          }
        };
      `,
    },
    {
      name: "Computed object literal key using createContext",
      code: tsx`
        import { createContext } from "react";
        const obj = { [createContext("")]: 1 };
      `,
    },
    {
      name: "Computed member expression assignment with unresolvable key variable",
      code: tsx`
        import { createContext } from "react";
        ctxs[theme] = createContext("");
      `,
    },
    {
      name: "Object literal property with valid context name key",
      code: tsx`
        import { createContext } from "react";
        const contexts = { ThemeContext: createContext("") };
      `,
    },
    {
      name: "Destructuring default value does not report",
      code: tsx`
        import { createContext } from "react";
        const { theme = createContext("") } = contexts;
      `,
    },
    {
      name: "Export default object literal containing createContext",
      code: tsx`
        import { createContext } from "react";
        export default { theme: createContext("") };
      `,
    },
    {
      name: "Object literal in return statement is not reported",
      code: tsx`
        import { createContext } from "react";
        function make() {
          return { theme: createContext("") };
        }
      `,
    },
    {
      name: "Private class field with createContext is not reported",
      code: tsx`
        import { createContext } from "react";
        class Store {
          #theme = createContext("");
        }
      `,
    },
  ],
});
