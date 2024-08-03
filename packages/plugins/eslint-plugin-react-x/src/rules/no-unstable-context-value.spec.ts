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
      errors: [{ messageId: "noUnstableContextValueWithIdentifier" }],
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
          messageId: "noUnstableContextValueWithIdentifier",
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
          messageId: "noUnstableContextValueWithIdentifier",
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
          messageId: "noUnstableContextValueWithFunction",
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
          messageId: "noUnstableContextValueWithIdentifier",
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
