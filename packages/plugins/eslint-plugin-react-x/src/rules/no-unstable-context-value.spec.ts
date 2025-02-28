import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unstable-context-value";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
          function App() {
            const foo = {}
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      errors: [{
        messageId: "unstableContextValue",
        data: {
          type: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
      }],
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = []
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            type: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        function App() {
            const foo = new Object();
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            type: "new expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = () => {}
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            type: "arrow function expression",
            suggestion: "Consider wrapping it in a useCallback hook.",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        function App() {
            const foo = {
                bar: () => {}
            }
            return <Context.Provider value={foo.bar}></Context.Provider>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            type: "object expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = {}
            return <Context value={foo}></Context>;
        }
      `,
      errors: [{
        messageId: "unstableContextValue",
        data: {
          type: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
      }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = []
            return <CONTEXT value={foo}></CONTEXT>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            type: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = []
            return <ThemeContext value={foo}></ThemeContext>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            type: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = []
            return <THEME_CONTEXT value={foo}></THEME_CONTEXT>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            type: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
        function App() {
          const foo = useMemo(() => ({}), [])
          return <Context.Provider value={foo}></Context.Provider>
      }
    `,
    /* tsx */ `
        function App() {
          const foo = useMemo(() => [], [])
          return <Context.Provider value={foo}></Context.Provider>
      }
    `,
    /* tsx */ `
        const foo = {}
        function App() {
          return <Context.Provider value={foo}></Context.Provider>;
      }
    `,
    /* tsx */ `
        const foo = []
        function App() {
          return <Context.Provider value={foo}></Context.Provider>;
      }
    `,
    /* tsx */ `
        const foo = new Object()
        function App() {
          return <Context.Provider value={foo}></Context.Provider>;
      }
    `,
    /* tsx */ `
      const foo = () => {}
              function App() {
                  return <Context.Provider value={foo}></Context.Provider>;
              }
    `,
    {
      code: /* tsx */ `
          function App() {
            const foo = {}
            return <Context value={foo}></Context>;
        }
      `,
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = []
            return <CONTEXT value={foo}></CONTEXT>
        }
      `,
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = []
            return <ThemeContext value={foo}></ThemeContext>
        }
      `,
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
          function App() {
            const foo = []
            return <THEME_CONTEXT value={foo}></THEME_CONTEXT>
        }
      `,
      settings: {
        "react-x": {
          version: "18.0.0",
        },
      },
    },
  ],
});
