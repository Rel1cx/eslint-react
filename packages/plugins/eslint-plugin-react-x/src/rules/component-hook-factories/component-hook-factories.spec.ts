import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
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
          data: {
            name: "Component",
          },
          messageId: "component",
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
          data: {
            name: "Component",
          },
          messageId: "component",
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
          data: {
            name: "Button",
          },
          messageId: "component",
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
          data: {
            name: "Button",
          },
          messageId: "component",
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
          data: {
            name: "Child",
          },
          messageId: "component",
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
          data: {
            name: "Child",
          },
          messageId: "component",
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
          data: {
            name: "useData",
          },
          messageId: "hook",
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
          data: {
            name: "useData",
          },
          messageId: "hook",
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
          data: {
            name: "useLocalState",
          },
          messageId: "hook",
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
          data: {
            name: "useInner",
          },
          messageId: "hook",
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
          data: {
            name: "Header",
          },
          messageId: "component",
        },
        {
          data: {
            name: "Footer",
          },
          messageId: "component",
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
          data: {
            name: "useFeatureData",
          },
          messageId: "hook",
        },
        {
          data: {
            name: "FeatureComponent",
          },
          messageId: "component",
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
          data: {
            name: "DeeplyNested",
          },
          messageId: "component",
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
          data: {
            name: "Button",
          },
          messageId: "component",
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
          data: {
            name: "useAuth",
          },
          messageId: "hook",
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
          data: {
            name: "Inner",
          },
          messageId: "component",
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
          data: {
            name: "ThemedComponent",
          },
          messageId: "component",
        },
      ],
    },
  ],
  valid: [
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
