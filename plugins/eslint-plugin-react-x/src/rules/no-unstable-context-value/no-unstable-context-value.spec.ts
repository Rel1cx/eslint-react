import tsx from "dedent";

import { ruleTester } from "@local/testkit";
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
        data: {
          kind: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
        messageId: "unstable-context-value",
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
          data: {
            kind: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
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
          data: {
            kind: "arrow function expression",
            suggestion: "Consider wrapping it in a useCallback hook.",
          },
          messageId: "unstable-context-value",
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
          data: {
            kind: "new expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
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
          data: {
            kind: "object expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
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
        data: {
          kind: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
        messageId: "unstable-context-value",
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
            return <ThemeContext value={foo}></ThemeContext>
        }
      `,
      errors: [
        {
          data: {
            kind: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
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
            return <CONTEXT value={foo}></CONTEXT>
        }
      `,
      errors: [
        {
          data: {
            kind: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
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
          data: {
            kind: "array expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
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
          data: {
            kind: "object expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
        },
      ],
      settings: {
        "react-x": {
          compilationMode: "annotation",
        },
      },
    },
    // Ported from https://github.com/oxc-project/oxc/issues/26575
    // oxlint (like upstream eslint-plugin-react) misses the React 19 shorthand when the
    // context is imported; our rule recognizes it via the `*Context` name heuristic
    {
      code: tsx`
        import { ImportedContext } from './context';

        export function Repro() {
          return (
            <>
              <ImportedContext value={{}} />
              <ImportedContext.Provider value={{}} />
            </>
          );
        }
      `,
      errors: [
        {
          data: {
            kind: "object expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
        },
        {
          data: {
            kind: "object expression",
            suggestion: "Consider wrapping it in a useMemo hook.",
          },
          messageId: "unstable-context-value",
        },
      ],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    // The provider is nested inside a callback, but the value is constructed in
    // the component scope — it still changes on every render.
    {
      code: tsx`
        function App({ items }) {
          const foo = {}
          return <div>{items.map((item) => <Context.Provider value={foo}>{item}</Context.Provider>)}</div>;
        }
      `,
      errors: [{
        data: {
          kind: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
        messageId: "unstable-context-value",
      }],
    },
    // A class declaration is a per-render construction as well.
    {
      code: tsx`
        function App() {
          class Foo {}
          return <Context.Provider value={Foo}></Context.Provider>;
        }
      `,
      errors: [{
        data: {
          kind: "class declaration",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
        messageId: "unstable-context-value",
      }],
    },
    // Nested components: the provider belongs to the innermost component and
    // must be reported only once.
    {
      code: tsx`
        function Outer() {
          function Inner() {
            const foo = {}
            return <Context.Provider value={foo}></Context.Provider>;
          }
          return <Inner />;
        }
      `,
      errors: [{
        data: {
          kind: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
        messageId: "unstable-context-value",
      }],
    },
    // Member access on a component-scoped construction, referenced from a
    // nested callback — resolution must thread the boundary through the
    // MemberExpression branch.
    {
      code: tsx`
        function App({ items }) {
          const styles = { container: {} }
          return <div>{items.map((item) => <Context.Provider value={styles.container}>{item}</Context.Provider>)}</div>;
        }
      `,
      errors: [{
        data: {
          kind: "object expression",
          suggestion: "Consider wrapping it in a useMemo hook.",
        },
        messageId: "unstable-context-value",
      }],
    },
  ],
  valid: [
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
            const foo = Boolean({})
            return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
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
    // The value is declared at module level (stable across renders), even though
    // it is referenced from a callback nested inside the component.
    {
      code: tsx`
        const foo = {}
        function App({ items }) {
          return <div>{items.map((item) => <Context.Provider value={foo}>{item}</Context.Provider>)}</div>;
        }
      `,
    },
    // The value is declared in an outer component's render scope. It is outside
    // the inner component's resolution boundary, so it is not reported here.
    {
      code: tsx`
        function Outer() {
          const foo = {}
          function Inner() {
            return <Context.Provider value={foo}></Context.Provider>;
          }
          return <Inner />;
        }
      `,
    },
    // Providers inside custom hooks are not collected (hooks are not components).
    {
      code: tsx`
        function useFoo() {
          const foo = {}
          return <Context.Provider value={foo}></Context.Provider>;
        }
      `,
    },
  ],
});
