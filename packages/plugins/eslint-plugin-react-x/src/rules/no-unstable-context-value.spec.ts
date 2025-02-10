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
  ],
});
