// @ts-nocheck

import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./exhaustive-deps";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Missing dependencies
    {
      code: tsx`
        function MyComponent() {
          const local = {};
          useEffect(() => {
            console.log(local);
          }, []);
        }
      `,
      errors: [
        {
          message:
            `React Hook useEffect has a missing dependency: 'local'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [local]`,
              output: tsx`
                function MyComponent() {
                  const local = {};
                  useEffect(() => {
                    console.log(local);
                  }, [local]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Missing dependencies with multiple deps
    {
      code: tsx`
        function MyComponent({ foo, bar }) {
          useEffect(() => {
            console.log(foo, bar);
          }, []);
        }
      `,
      errors: [
        {
          message:
            `React Hook useEffect has missing dependencies: 'bar' and 'foo'. Either include them or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [bar, foo]`,
              output: tsx`
                function MyComponent({ foo, bar }) {
                  useEffect(() => {
                    console.log(foo, bar);
                  }, [bar, foo]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Unnecessary dependency (outer scope)
    {
      code: tsx`
        function MyComponent({ foo }) {
          useEffect(() => {
            console.log(foo);
          }, [foo, bar]);
        }
      `,
      errors: [
        {
          message:
            `React Hook useEffect has an unnecessary dependency: 'bar'. Either exclude it or remove the dependency array. Outer scope values like 'bar' aren't valid dependencies because mutating them doesn't re-render the component.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [foo]`,
              output: tsx`
                function MyComponent({ foo }) {
                  useEffect(() => {
                    console.log(foo);
                  }, [foo]);
                }
              `,
            },
          ],
        },
      ],
    },
    // useMemo with missing dependency
    {
      code: tsx`
        function MyComponent({ foo, bar }) {
          const result = useMemo(() => foo + bar, [foo]);
          return result;
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo has a missing dependency: 'bar'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [bar, foo]`,
              output: tsx`
                function MyComponent({ foo, bar }) {
                  const result = useMemo(() => foo + bar, [bar, foo]);
                  return result;
                }
              `,
            },
          ],
        },
      ],
    },
    // useCallback with missing dependency
    {
      code: tsx`
        function MyComponent({ onClick, value }) {
          const handleClick = useCallback(() => onClick(value), [onClick]);
          return <button onClick={handleClick} />;
        }
      `,
      errors: [
        {
          message:
            `React Hook useCallback has a missing dependency: 'value'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [onClick, value]`,
              output: tsx`
                function MyComponent({ onClick, value }) {
                  const handleClick = useCallback(() => onClick(value), [onClick, value]);
                  return <button onClick={handleClick} />;
                }
              `,
            },
          ],
        },
      ],
    },
    // useLayoutEffect missing dependency
    {
      code: tsx`
        function MyComponent({ value }) {
          useLayoutEffect(() => {
            console.log(value);
          }, []);
        }
      `,
      errors: [
        {
          message:
            `React Hook useLayoutEffect has a missing dependency: 'value'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [value]`,
              output: tsx`
                function MyComponent({ value }) {
                  useLayoutEffect(() => {
                    console.log(value);
                  }, [value]);
                }
              `,
            },
          ],
        },
      ],
    },
    // useImperativeHandle missing dependency
    {
      code: tsx`
        function MyComponent({ value }, ref) {
          useImperativeHandle(ref, () => ({ value }), []);
        }
      `,
      errors: [
        {
          message:
            `React Hook useImperativeHandle has a missing dependency: 'value'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [value]`,
              output: tsx`
                function MyComponent({ value }, ref) {
                  useImperativeHandle(ref, () => ({ value }), [value]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Async effect callback
    {
      code: tsx`
        function MyComponent() {
          useEffect(async () => {
            await fetchData();
          }, []);
        }
      `,
      errors: [
        {
          // tsl-ignore dx/no-multiline-template-expression-without-auto-dedent
          message: `Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching`,
        },
      ],
    },
    // Effect without callback
    {
      code: tsx`
        function MyComponent() {
          useEffect();
        }
      `,
      errors: [
        {
          message: `React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?`,
        },
      ],
    },
    // useMemo without dependencies
    {
      code: tsx`
        function MyComponent({ value }) {
          const result = useMemo(() => value * 2);
          return result;
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // useCallback without dependencies
    {
      code: tsx`
        function MyComponent({ onClick }) {
          const handleClick = useCallback(() => onClick());
          return <button onClick={handleClick} />;
        }
      `,
      errors: [
        {
          message:
            `React Hook useCallback does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // ref.current in cleanup
    {
      code: tsx`
        function MyComponent() {
          const ref = useRef();
          useEffect(() => {
            return () => {
              console.log(ref.current);
            };
          }, []);
        }
      `,
      errors: [
        {
          message:
            `The ref value 'ref.current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'ref.current' to a variable inside the effect, and use that variable in the cleanup function.`,
        },
      ],
    },
    // Complex expression in dependency array
    {
      code: tsx`
        function MyComponent({ foo }) {
          useEffect(() => {}, [foo.bar()]);
        }
      `,
      errors: [
        {
          message:
            `React Hook useEffect has a complex expression in the dependency array. Extract it to a separate variable so it can be statically checked.`,
        },
      ],
    },
    // Spread element in dependency array
    {
      code: tsx`
        function MyComponent({ deps }) {
          useEffect(() => {}, [...deps]);
        }
      `,
      errors: [
        {
          message:
            `React Hook useEffect has a spread element in its dependency array. This means we can't statically verify whether you've passed the correct dependencies.`,
        },
      ],
    },
    // Non-array literal dependency
    {
      code: tsx`
        function MyComponent({ deps }) {
          useEffect(() => {}, deps);
        }
      `,
      errors: [
        {
          message:
            `React Hook useEffect was passed a dependency list that is not an array literal. This means we can't statically verify whether you've passed the correct dependencies.`,
        },
      ],
    },
    // Assignment to outer scope variable
    {
      code: tsx`
        function MyComponent() {
          let count = 0;
          useEffect(() => {
            count = 1;
          }, []);
        }
      `,
      errors: [
        {
          message:
            `Assignments to the 'count' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect.`,
        },
      ],
    },
    // React namespace form
    {
      code: tsx`
        function MyComponent() {
          const local = {};
          React.useEffect(() => {
            console.log(local);
          }, []);
        }
      `,
      errors: [
        {
          message:
            `React Hook React.useEffect has a missing dependency: 'local'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [local]`,
              output: tsx`
                function MyComponent() {
                  const local = {};
                  React.useEffect(() => {
                    console.log(local);
                  }, [local]);
                }
              `,
            },
          ],
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    // Empty dependency array with no external deps
    {
      code: tsx`
        function MyComponent() {
          useEffect(() => {
            const local = {};
            console.log(local);
          }, []);
        }
      `,
    },
    // Correct dependencies
    {
      code: tsx`
        function MyComponent({ value }) {
          useEffect(() => {
            console.log(value);
          }, [value]);
        }
      `,
    },
    // Multiple correct dependencies
    {
      code: tsx`
        function MyComponent({ foo, bar }) {
          useEffect(() => {
            console.log(foo, bar);
          }, [foo, bar]);
        }
      `,
    },
    // useMemo with correct deps
    {
      code: tsx`
        function MyComponent({ a, b }) {
          const result = useMemo(() => a + b, [a, b]);
          return result;
        }
      `,
    },
    // useCallback with correct deps
    {
      code: tsx`
        function MyComponent({ onClick, value }) {
          const handleClick = useCallback(() => onClick(value), [onClick, value]);
          return <button onClick={handleClick} />;
        }
      `,
    },
    // useRef is stable, doesn't need to be in deps
    {
      code: tsx`
        function MyComponent() {
          const ref = useRef(null);
          useEffect(() => {
            ref.current.focus();
          }, []);
        }
      `,
    },
    // useState setter is stable
    {
      code: tsx`
        function MyComponent() {
          const [count, setCount] = useState(0);
          useEffect(() => {
            const timer = setTimeout(() => setCount(c => c + 1), 1000);
            return () => clearTimeout(timer);
          }, []);
        }
      `,
    },
    // useReducer dispatch is stable
    {
      code: tsx`
        function MyComponent() {
          const [state, dispatch] = useReducer(reducer, {});
          useEffect(() => {
            dispatch({ type: "init" });
          }, []);
        }
      `,
    },
    // Functions defined inside component can be dependencies
    {
      code: tsx`
        function MyComponent({ getData }) {
          const fetchData = useCallback(async () => {
            const data = await getData();
            return data;
          }, [getData]);
        }
      `,
    },
    // Correct dependency with useLayoutEffect
    {
      code: tsx`
        function MyComponent({ value }) {
          useLayoutEffect(() => {
            console.log(value);
          }, [value]);
        }
      `,
    },
    // Correct dependency with useImperativeHandle
    {
      code: tsx`
        function MyComponent({ value }, ref) {
          useImperativeHandle(ref, () => ({ value }), [value]);
        }
      `,
    },
    // Variable declared inside effect doesn't need to be in deps
    {
      code: tsx`
        function MyComponent() {
          useEffect(() => {
            const local = someFunc();
            console.log(local);
          }, []);
        }
      `,
    },
    // React namespace
    {
      code: tsx`
        function MyComponent({ value }) {
          React.useEffect(() => {
            console.log(value);
          }, [value]);
        }
      `,
    },
    // No dependency array for useEffect is valid (runs after every render)
    {
      code: tsx`
        function MyComponent({ value }) {
          useEffect(() => {
            console.log(value);
          });
        }
      `,
    },
    // useTransition is stable
    {
      code: tsx`
        function MyComponent() {
          const [isPending, startTransition] = useTransition();
          useEffect(() => {
            startTransition(() => {});
          }, []);
        }
      `,
    },
  ],
});
