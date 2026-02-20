import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unstable-context-value";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
          function App() {
            const foo = {}
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      errors: [{
        messageId: "unstableContextValue",
        data: {
          kind: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
      }],
    },
    {
      code: tsx`
          function App() {
            const foo = []
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            kind: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
    },
    {
      code: tsx`
        function App() {
            const foo = new Object();
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            kind: "new expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
    },
    {
      code: tsx`
          function App() {
            const foo = () => {}
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            kind: "arrow function expression",
            suggestion: "Consider wrapping it in a useCallback hook.",
          },
        },
      ],
    },
    {
      code: tsx`
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
            kind: "object expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
    },
    {
      code: tsx`
          function App() {
            const foo = {}
            return <Context value={foo}></Context>;
        }
      `,
      errors: [{
        messageId: "unstableContextValue",
        data: {
          kind: "object expression",
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
      code: tsx`
          function App() {
            const foo = []
            return <CONTEXT value={foo}></CONTEXT>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            kind: "array expression",
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
      code: tsx`
          function App() {
            const foo = []
            return <ThemeContext value={foo}></ThemeContext>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            kind: "array expression",
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
      code: tsx`
          function App() {
            const foo = []
            return <THEME_CONTEXT value={foo}></THEME_CONTEXT>
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            kind: "array expression",
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
      code: tsx`
          function App() {
            const foo = {}
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      errors: [
        {
          messageId: "unstableContextValue",
          data: {
            kind: "object expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
        },
      ],
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
  ],
  valid: [
    ...allValid,
    {
      code: tsx`
          function App() {
            const foo = {}
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "all",
        },
      },
    },
    {
      code: tsx`
          function App() {
            const foo = useMemo(() => ({}), [])
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
          function App() {
            "use memo";
            const foo = {}
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
          "use memo";
          function App() {
            const foo = {}
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
          function App() {
            const foo = useMemo(() => [], [])
            return <Context.Provider value={foo}></Context.Provider>
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
          const foo = {}
          function App() {
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
          const foo = []
          function App() {
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
          const foo = new Object()
          function App() {
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
        const foo = () => {}
              function App() {
                  return <Context.Provider value={foo}></Context.Provider>;
              }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
          function App() {
            const foo = {}
            return <Context value={foo}></Context>;
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
          version: "18.0.0",
        },
      },
    },
    {
      code: tsx`
          function App() {
            const foo = []
            return <CONTEXT value={foo}></CONTEXT>
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
          version: "18.0.0",
        },
      },
    },
    {
      code: tsx`
          function App() {
            const foo = []
            return <ThemeContext value={foo}></ThemeContext>
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
          version: "18.0.0",
        },
      },
    },
    {
      code: tsx`
          function App() {
            const foo = []
            return <THEME_CONTEXT value={foo}></THEME_CONTEXT>
        }
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
          version: "18.0.0",
        },
      },
    },
    {
      code: tsx`
        const Provider = ({foo, children}: {foo: {}, children: React.ReactNode}) => {
          return <Context value={foo}>{children}</Context>;
        };
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    {
      code: tsx`
        const MyContext = React.createContext<string>("");

        export function MyFunctionComponent({ children, x }: { children: React.ReactNode; x: string }) {
          return <MyContext value={x}>{children}</MyContext>;
        }

        export const MyConstComponent: React.FunctionComponent<{
          children: React.ReactNode;
          x: string;
        }> = ({ children, x }) => {
          return <MyContext value={x}>{children}</MyContext>;
        };
      `,
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
  ],
});
