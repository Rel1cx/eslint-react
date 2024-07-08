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
      errors: [{ messageId: "NO_UNSTABLE_CONTEXT_VALUE_WITH_IDENTIFIER" }],
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
          messageId: "NO_UNSTABLE_CONTEXT_VALUE_WITH_IDENTIFIER",
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
          messageId: "NO_UNSTABLE_CONTEXT_VALUE_WITH_IDENTIFIER",
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
          messageId: "NO_UNSTABLE_CONTEXT_VALUE_WITH_FUNCTION",
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
          messageId: "NO_UNSTABLE_CONTEXT_VALUE_WITH_IDENTIFIER",
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
