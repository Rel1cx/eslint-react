// @ts-nocheck

import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./rules-of-hooks";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Hook in conditional
    {
      code: tsx`
        function MyComponent({ condition }) {
          if (condition) {
            useHook();
          }
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" is called conditionally. React Hooks must be called in the exact same order in every component render.`,
        },
      ],
    },
    // Hook in loop
    {
      code: tsx`
        function MyComponent({ items }) {
          for (const item of items) {
            useHook();
          }
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" may be executed more than once. Possibly because it is called in a loop. React Hooks must be called in the exact same order in every component render.`,
        },
      ],
    },
    // Hook in nested function
    {
      code: tsx`
        function MyComponent() {
          const handleClick = () => {
            useHook();
          };
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" is called in function "handleClick" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use".`,
        },
      ],
    },
    // Hook in class component
    {
      code: tsx`
        class MyComponent extends React.Component {
          render() {
            useHook();
            return null;
          }
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" cannot be called in a class component. React Hooks must be called in a React function component or a custom React Hook function.`,
        },
      ],
    },
    // Hook in regular function (not component or hook)
    {
      code: tsx`
        function notAComponent() {
          useHook();
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" is called in function "notAComponent" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use".`,
        },
      ],
    },
    // Hook at top level
    {
      code: tsx`
        useHook();
      `,
      errors: [
        {
          message:
            `React Hook "useHook" cannot be called at the top level. React Hooks must be called in a React function component or a custom React Hook function.`,
        },
      ],
    },
    // Hook after early return
    {
      code: tsx`
        function MyComponent({ condition }) {
          if (condition) {
            return null;
          }
          useHook();
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" is called conditionally. React Hooks must be called in the exact same order in every component render. Did you accidentally call a React Hook after an early return?`,
        },
      ],
    },
    // Hook in async function
    {
      code: tsx`
        async function MyComponent() {
          useHook();
        }
      `,
      errors: [
        {
          message: `React Hook "useHook" cannot be called in an async function.`,
        },
      ],
    },
    // Hook in nested async function
    {
      code: tsx`
        function MyComponent() {
          async function nested() {
            useHook();
          }
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" is called in function "nested" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use".`,
        },
      ],
    },
    // Hook in try/catch
    {
      code: tsx`
        function MyComponent() {
          try {
            use();
          } catch (e) {}
        }
      `,
      errors: [
        {
          message: `React Hook "use" cannot be called in a try/catch block.`,
        },
      ],
    },
    // Hook in do-while loop
    {
      code: tsx`
        function MyComponent() {
          do {
            useHook();
          } while (condition);
        }
      `,
      errors: [
        {
          message:
            `React Hook "useHook" may be executed more than once. Possibly because it is called in a loop. React Hooks must be called in the exact same order in every component render.`,
        },
      ],
    },
    // useEffectEvent not assigned to variable
    {
      code: tsx`
        function MyComponent() {
          return <Child onClick={useEffectEvent(() => {})} />;
        }
      `,
      errors: [
        {
          message:
            `React Hook "useEffectEvent" can only be called at the top level of your component. It cannot be passed down.`,
        },
      ],
    },
    // useEffectEvent assigned to non-variable
    {
      code: tsx`
        function MyComponent() {
          const obj = { handler: useEffectEvent(() => {}) };
        }
      `,
      errors: [
        {
          message:
            `React Hook "useEffectEvent" can only be called at the top level of your component. It cannot be passed down.`,
        },
      ],
    },
    // useEffectEvent function passed to non-effect
    {
      code: tsx`
        function MyComponent() {
          const onClick = useEffectEvent(() => {});
          const handleClick = () => onClick();
        }
      `,
      errors: [
        {
          message:
            `\`onClick\` is a function created with React Hook "useEffectEvent", and can only be called from Effects and Effect Events in the same component.`,
        },
      ],
    },
    // useEffectEvent function called in callback
    {
      code: tsx`
        function MyComponent() {
          const onEvent = useEffectEvent(() => {});
          useEffect(() => {
            onEvent();
          }, []);
          return <button onClick={() => onEvent()} />;
        }
      `,
      errors: [
        {
          message:
            `\`onEvent\` is a function created with React Hook "useEffectEvent", and can only be called from Effects and Effect Events in the same component.`,
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    // Hook in function component
    {
      code: tsx`
        function MyComponent() {
          useHook();
        }
      `,
    },
    // Hook in arrow function component
    {
      code: tsx`
        const MyComponent = () => {
          useHook();
        };
      `,
    },
    // Hook in custom hook
    {
      code: tsx`
        function useCustomHook() {
          useHook();
        }
      `,
    },
    // Multiple hooks in component
    {
      code: tsx`
        function MyComponent() {
          const [state, setState] = useState(0);
          const ref = useRef(null);
          useEffect(() => {}, []);
        }
      `,
    },
    // Nested custom hook call
    {
      code: tsx`
        function useOuterHook() {
          return function useInnerHook() {
            useState();
          };
        }
      `,
    },
    // Hook in forwardRef callback
    {
      code: tsx`
        const MyComponent = forwardRef((props, ref) => {
          useHook();
          return null;
        });
      `,
    },
    // Hook in memo callback
    {
      code: tsx`
        const MyComponent = memo((props) => {
          useHook();
          return null;
        });
      `,
    },
    // Hook called conditionally with use()
    {
      code: tsx`
        function MyComponent({ condition, promise }) {
          if (condition) {
            use(promise);
          }
        }
      `,
    },
    // Hook in unreachable code (not flagged)
    {
      code: tsx`
        function useUnreachable() {
          return;
          useHook();
        }
      `,
    },
    // Regular function calls are not hooks
    {
      code: tsx`
        function MyComponent() {
          userFetch();
          doSomething();
        }
      `,
    },
    // Hook starting with use in hook name
    {
      code: tsx`
        function useCustom() {
          useState();
          useEffect(() => {}, []);
          useRef(null);
        }
      `,
    },
    // useEffectEvent assigned to variable and used in effect
    {
      code: tsx`
        function MyComponent() {
          const onEvent = useEffectEvent(() => {});
          useEffect(() => {
            onEvent();
          }, []);
        }
      `,
    },
    // useEffectEvent in another useEffectEvent
    {
      code: tsx`
        function MyComponent() {
          const onEvent1 = useEffectEvent(() => {});
          const onEvent2 = useEffectEvent(() => {
            onEvent1();
          });
        }
      `,
    },
    // useEffectEvent called directly in effect - INVALID (cannot be called inside callback)
    // This case is tested in invalid section
    // useEffectEvent at top level (expression statement)
    {
      code: tsx`
        function MyComponent() {
          useEffectEvent(() => {});
        }
      `,
    },
    // Component with PascalCase namespace
    {
      code: tsx`
        function MyComponent() {
          const state = React.useState(0);
        }
      `,
    },
    // Custom hook with namespace
    {
      code: tsx`
        function useMyHook() {
          const state = React.useState(0);
        }
      `,
    },
    // Hook in destructuring pattern
    {
      code: tsx`
        const { useHook = () => { useState(); } } = {};
      `,
    },
    // Hook in object method
    {
      code: tsx`
        ({ useHook: () => { useState(); } });
      `,
    },
    // Hook in object shorthand
    {
      code: tsx`
        ({ useHook() { useState(); } });
      `,
    },
    // ForwardRef component with hook
    {
      code: tsx`
        const FancyButton = React.forwardRef((props, ref) => {
          const [count, setCount] = useState(0);
          return <button ref={ref}>{count}</button>;
        });
      `,
    },
    // Memo component with hook
    {
      code: tsx`
        const MemoComponent = React.memo(function Component({ value }) {
          const doubled = useMemo(() => value * 2, [value]);
          return <div>{doubled}</div>;
        });
      `,
    },
    // Nested components with hooks
    {
      code: tsx`
        function OuterComponent() {
          useHook();
          return function InnerComponent() {
            useAnotherHook();
          };
        }
      `,
    },
    // use() can be called in callbacks (unlike other hooks)
    {
      code: tsx`
        function MyComponent() {
          return <Child promiseFactory={() => use(promise)} />;
        }
      `,
    },
    // Hook in property assignment pattern
    {
      code: tsx`
        const obj = {
          useHook: function() {
            useState();
          }
        };
      `,
    },
    // Hook like function in test file (should not be flagged)
    {
      code: tsx`
        import { test, vi } from "vitest";

        test("", () => {
          vi.useFakeTimers();
        });
      `,
    },
  ],
});
