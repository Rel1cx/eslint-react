import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./component-hook-factories";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        // ❌ Factory function creating components
        function createComponent(defaultValue) {
          return function Component() {
            return <div>{defaultValue}</div>;
          };
        }
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Component",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Factory with arrow function returning component
        function createComponent(defaultValue) {
          const Component = () => {
            return <div>{defaultValue}</div>;
          };
          return Component;
        }
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Component",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Arrow factory function creating component
        const createComponent = (color) => {
          return function Button({ children }) {
            return <button style={{ backgroundColor: color }}>{children}</button>;
          };
        };
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Button",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Factory returning arrow component
        const createComponent = (color) => {
          const Button = ({ children }) => {
            return <button style={{ backgroundColor: color }}>{children}</button>;
          };
          return Button;
        };
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Button",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Component defined inside component
        function Parent() {
          function Child() {
            return <div />;
          }

          return <Child />;
        }
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Child",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Component defined inside component (arrow)
        function Parent() {
          const Child = () => {
            return <div />;
          };

          return <Child />;
        }
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Child",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Hook factory function
        function createCustomHook(endpoint) {
          return function useData() {
            const [data, setData] = useState(null);
            useEffect(() => {
              fetch(endpoint).then(r => r.json()).then(setData);
            }, []);
            return data;
          };
        }
      `,
      errors: [
        {
          messageId: "hook",
          data: {
            name: "useData",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Arrow hook factory
        const createHook = (endpoint) => {
          const useData = () => {
            const [data, setData] = useState(null);
            useEffect(() => {
              fetch(endpoint).then(r => r.json()).then(setData);
            }, []);
            return data;
          };
          return useData;
        };
      `,
      errors: [
        {
          messageId: "hook",
          data: {
            name: "useData",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Hook defined inside a component
        function MyComponent() {
          function useLocalState() {
            return useState(0);
          }
          const [count, setCount] = useLocalState();
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "hook",
          data: {
            name: "useLocalState",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Hook defined inside another hook
        function useOuter() {
          function useInner() {
            return useState(0);
          }
          return useInner();
        }
      `,
      errors: [
        {
          messageId: "hook",
          data: {
            name: "useInner",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Factory creating multiple components
        function createComponents(theme) {
          function Header() {
            return <header style={{ color: theme.primary }} />;
          }
          function Footer() {
            return <footer style={{ color: theme.secondary }} />;
          }
          return { Header, Footer };
        }
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Header",
          },
        },
        {
          messageId: "component",
          data: {
            name: "Footer",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Factory returning both a component and a hook
        function createFeature(config) {
          function useFeatureData() {
            return useState(config.defaultValue);
          }
          function FeatureComponent() {
            const [data] = useFeatureData();
            return <div>{data}</div>;
          }
          return { useFeatureData, FeatureComponent };
        }
      `,
      errors: [
        {
          messageId: "hook",
          data: {
            name: "useFeatureData",
          },
        },
        {
          messageId: "component",
          data: {
            name: "FeatureComponent",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Nested factory (deeply nested component)
        function outer() {
          function inner() {
            function DeeplyNested() {
              return <div />;
            }
            return DeeplyNested;
          }
          return inner;
        }
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "DeeplyNested",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ makeButton factory pattern from docs
        function makeButton(color) {
          return function Button({children}) {
            return (
              <button style={{backgroundColor: color}}>
                {children}
              </button>
            );
          };
        }

        const RedButton = makeButton('red');
        const BlueButton = makeButton('blue');
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Button",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Hook factory with closure over config
        function createUseAuth(config) {
          return function useAuth() {
            const [user, setUser] = useState(null);
            useEffect(() => {
              config.authProvider.onAuthStateChanged(setUser);
            }, []);
            return user;
          };
        }
      `,
      errors: [
        {
          messageId: "hook",
          data: {
            name: "useAuth",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ IIFE-like factory pattern
        const MyComponent = (function() {
          return function Inner() {
            return <div />;
          };
        })();
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "Inner",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Generic HOC-like factory
        function withTheme(theme) {
          function ThemedComponent({ children }) {
            return <div style={{ color: theme }}>{children}</div>;
          }
          return ThemedComponent;
        }
      `,
      errors: [
        {
          messageId: "component",
          data: {
            name: "ThemedComponent",
          },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      // ✅ Component defined at module level
      function Component({ defaultValue }) {
        return <div>{defaultValue}</div>;
      }
    `,
    tsx`
      // ✅ Custom hook at module level
      function useData(endpoint) {
        const [data, setData] = useState(null);
        useEffect(() => {
          fetch(endpoint).then(r => r.json()).then(setData);
        }, []);
        return data;
      }
    `,
    tsx`
      // ✅ Components and hooks at module level
      function Button({ color, children }) {
        return (
          <button style={{ backgroundColor: color }}>
            {children}
          </button>
        );
      }

      function App() {
        return (
          <>
            <Button color="red">Red</Button>
            <Button color="blue">Blue</Button>
          </>
        );
      }
    `,
    tsx`
      // ✅ Normal event handlers inside components are fine
      function ParentComponent(props) {
        function onClick(event) {
          props.onClick(event.target.value);
        }

        const onKeyPress = () => null;

        return (
          <div>
            <button onClick={onClick} onKeyPress={onKeyPress} />
          </div>
        );
      }
    `,
    tsx`
      // ✅ Helper functions inside components are fine
      function Component({ items }) {
        function getTotal() {
          return items.reduce((sum, item) => sum + item.price, 0);
        }

        return <div>{getTotal()}</div>;
      }
    `,
    tsx`
      // ✅ Regular function returning non-component function
      function createHandler(defaultValue) {
        return function handler() {
          return defaultValue;
        };
      }
    `,
    tsx`
      // ✅ Module-level arrow component
      const MyComponent = () => {
        return <div />;
      };
    `,
    tsx`
      // ✅ Module-level arrow hook
      const useMyHook = () => {
        const [state, setState] = useState(null);
        return [state, setState];
      };
    `,
    tsx`
      // ✅ Render prop callbacks are fine (anonymous)
      function Parent() {
        return (
          <DataProvider>
            {(data) => <div>{data}</div>}
          </DataProvider>
        );
      }
    `,
    tsx`
      // ✅ Array map callbacks are fine (anonymous)
      function List({ items }) {
        return (
          <ul>
            {items.map((item) => <li key={item.id}>{item.name}</li>)}
          </ul>
        );
      }
    `,
    tsx`
      // ✅ Regular nested functions (not components or hooks)
      function outer() {
        function inner() {
          return 42;
        }
        return inner();
      }
    `,
    tsx`
      // ✅ Using React.createElement at module level
      function Component() {
        return React.createElement("div", null, "Hello");
      }
    `,
    tsx`
      // ✅ Export default component
      export default function App() {
        return <div />;
      }
    `,
  ],
});
