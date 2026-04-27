// @ts-nocheck

import tsx from "dedent";

import { ruleTester } from "../../../../../test";
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
    // Custom hook with additionalHooks option - missing dependency
    {
      code: tsx`
        function MyComponent({ value }) {
          useCustomEffect(() => {
            console.log(value);
          }, []);
        }
      `,
      options: [{ additionalHooks: "useCustomEffect" }],
      errors: [
        {
          message:
            `React Hook useCustomEffect has a missing dependency: 'value'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [value]`,
              output: tsx`
                function MyComponent({ value }) {
                  useCustomEffect(() => {
                    console.log(value);
                  }, [value]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Custom hook matching pattern - missing dependency
    {
      code: tsx`
        function MyComponent({ a, b }) {
          useDataEffect(() => {
            console.log(a, b);
          }, []);
        }
      `,
      options: [{ additionalHooks: "use(Data|Custom)Effect" }],
      errors: [
        {
          message:
            `React Hook useDataEffect has missing dependencies: 'a' and 'b'. Either include them or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a, b]`,
              output: tsx`
                function MyComponent({ a, b }) {
                  useDataEffect(() => {
                    console.log(a, b);
                  }, [a, b]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Derived from react-main/compiler allow-modify-global-in-callback-jsx.js
    {
      code: tsx`
        function Component({value}) {
          const onClick = () => {
            someGlobal.value = value;
          };
          return useMemo(() => {
            return <div onClick={onClick}>{someGlobal.value}</div>;
          }, []);
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo has a missing dependency: 'onClick'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [onClick]`,
              output: tsx`
                function Component({value}) {
                  const onClick = () => {
                    someGlobal.value = value;
                  };
                  return useMemo(() => {
                    return <div onClick={onClick}>{someGlobal.value}</div>;
                  }, [onClick]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Derived from react-main/compiler array-pattern-spread-creates-array.js
    {
      code: tsx`
        function Component(props) {
          const x = useMemo(() => makeObject_Primitives(), []);
          const rest = useMemo(() => {
            const [_, ...rest] = props.array;
            rest.push(x);
            return rest;
          });
          return rest;
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react-main/compiler block-scoping-switch-variable-scoping.js
    {
      code: tsx`
        function Component(props) {
          const outerHandlers = useMemo(() => {
            let handlers = {value: props.value};
            switch (props.test) {
              case true: {
                console.log(handlers.value);
                break;
              }
              default: {
              }
            }
            return handlers;
          });
          return outerHandlers;
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react-main/compiler error.invalid-reassign-variable-in-usememo.js
    {
      code: tsx`
        function Component() {
          let x;
          const y = useMemo(() => {
            let z;
            x = [];
            z = true;
            return z;
          }, []);
          return [x, y];
        }
      `,
      errors: [
        {
          message:
            `Assignments to the 'x' variable from inside React Hook useMemo will be lost after each render. To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useMemo.`,
        },
      ],
    },
    // Derived from react-main/compiler useCallback-maybe-modify-free-variable-dont-preserve-memoization-guarantee.js
    {
      code: tsx`
        function Component(props) {
          const free = makeObject_Primitives();
          const free2 = makeObject_Primitives();
          const part = free2.part;
          useHook();
          const callback = useCallback(() => {
            const x = makeObject_Primitives();
            x.value = props.value;
            mutate(x, free, part);
          }, [props.value]);
          mutate(free, part);
          return callback;
        }
      `,
      errors: [
        {
          message:
            `React Hook useCallback has missing dependencies: 'free' and 'part'. Either include them or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [free, part, props.value]`,
              output: tsx`
                function Component(props) {
                  const free = makeObject_Primitives();
                  const free2 = makeObject_Primitives();
                  const part = free2.part;
                  useHook();
                  const callback = useCallback(() => {
                    const x = makeObject_Primitives();
                    x.value = props.value;
                    mutate(x, free, part);
                  }, [free, part, props.value]);
                  mutate(free, part);
                  return callback;
                }
              `,
            },
          ],
        },
      ],
    },
    // Derived from react-main/compiler useMemo-mabye-modified-free-variable-dont-preserve-memoization-guarantees.js
    {
      code: tsx`
        function Component(props) {
          const free = makeObject_Primitives();
          const free2 = makeObject_Primitives();
          const part = free2.part;
          useHook();
          const object = useMemo(() => {
            const x = makeObject_Primitives();
            x.value = props.value;
            mutate(x, free, part);
            return x;
          }, [props.value]);
          identity(free);
          identity(part);
          return object;
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo has missing dependencies: 'free' and 'part'. Either include them or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [free, part, props.value]`,
              output: tsx`
                function Component(props) {
                  const free = makeObject_Primitives();
                  const free2 = makeObject_Primitives();
                  const part = free2.part;
                  useHook();
                  const object = useMemo(() => {
                    const x = makeObject_Primitives();
                    x.value = props.value;
                    mutate(x, free, part);
                    return x;
                  }, [free, part, props.value]);
                  identity(free);
                  identity(part);
                  return object;
                }
              `,
            },
          ],
        },
      ],
    },
    // Derived from react-main/compiler useMemo-with-optional.js
    {
      code: tsx`
        function Component(props) {
          return (
            useMemo(() => {
              return [props.value];
            }) || []
          );
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react-main/compiler useCallback-set-ref-nested-property.js
    {
      code: tsx`
        function Component({}) {
          const ref = useRef({inner: null});
          const onChange = useCallback(event => {
            ref.current.inner = event.target.value;
          });
          return <input onChange={onChange} />;
        }
      `,
      errors: [
        {
          message:
            `React Hook useCallback does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react-main/compiler error.invalid-useMemo-callback-args.js
    {
      code: tsx`
        function component(a, b) {
          let x = useMemo(c => a, []);
          return x;
        }
      `,
      errors: [
        {
          message:
            `React Hook useMemo has a missing dependency: 'a'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a]`,
              output: tsx`
                function component(a, b) {
                  let x = useMemo(c => a, [a]);
                  return x;
                }
              `,
            },
          ],
        },
      ],
    },
  ],
  valid: [
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
    // Custom hook with additionalHooks option
    {
      code: tsx`
        function MyComponent({ value }) {
          useCustomEffect(() => {
            console.log(value);
          }, [value]);
        }
      `,
      options: [{ additionalHooks: "useCustomEffect" }],
    },
    // Custom hook matching pattern
    {
      code: tsx`
        function MyComponent({ a, b }) {
          useDataEffect(() => {
            console.log(a, b);
          }, [a, b]);
        }
      `,
      options: [{ additionalHooks: "use(Data|Custom)Effect" }],
    },
    // Derived from react-main/compiler drop-methodcall-usecallback.js
    // useCallback with correct deps
    {
      code: tsx`
        function Component(props) {
          const onClick = React.useCallback(() => {
            console.log(props.value);
          }, [props.value]);
          return <div onClick={onClick} />;
        }
      `,
    },
    // Derived from react-main/compiler drop-methodcall-usememo.js
    // useMemo with correct deps
    {
      code: tsx`
        function Component(props) {
          const x = React.useMemo(() => {
            const x = [];
            x.push(props.value);
            return x;
          }, [props.value]);
          return x;
        }
      `,
    },
    // Derived from react-main/compiler babel-existing-react-import.js
    // useMemo with correct deps
    {
      code: tsx`
        function Component(props) {
          const [x] = useState(0);
          const expensiveNumber = useMemo(() => calculateExpensiveNumber(x), [x]);
          return <div>{expensiveNumber}</div>;
        }
      `,
    },
    // Derived from react-main/compiler allow-ref-access-in-effect.js
    // ref mutation in effect with empty deps (ref is stable)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const [state, setState] = useState(false);
          useEffect(() => {
            ref.current = 'Ok';
          }, []);
          useEffect(() => {
            setState(true);
          }, []);
          return <Child key={String(state)} ref={ref} />;
        }
      `,
    },
    // Derived from react-main/compiler allow-ref-access-in-unused-callback-nested.js
    // ref mutation in nested callback inside effect with empty deps
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const [state, setState] = useState(false);
          useEffect(() => {
            const callback = () => {
              ref.current = 'Ok';
            };
          }, []);
          useEffect(() => {
            setState(true);
          }, []);
          return <Child key={String(state)} ref={ref} />;
        }
      `,
    },
    // Derived from react-main/compiler allow-global-mutation-unused-usecallback.js
    // useCallback modifying global with empty deps
    {
      code: tsx`
        function Component() {
          const callback = useCallback(() => {
            window.foo = true;
          }, []);
          return <div>Ok</div>;
        }
      `,
    },
    // Derived from react-main/compiler error.invalid-hoisting-setstate.js
    // setState in effect with empty deps (setState is stable)
    {
      code: tsx`
        function Foo() {
          useEffect(() => setState(2), []);
          const [state, setState] = useState(0);
          return <div>{state}</div>;
        }
      `,
    },
    // Derived from react-main/compiler useCallback-maybe-modify-free-variable-preserve-memoization-guarantee.js
    // useCallback with correct deps
    {
      code: tsx`
        function Component(props) {
          const free = makeObject_Primitives();
          const free2 = makeObject_Primitives();
          const part = free2.part;
          useHook();
          const callback = useCallback(() => {
            const x = makeObject_Primitives();
            x.value = props.value;
            mutate(x, free, part);
          }, [props.value, free, part]);
          mutate(free, part);
          return callback;
        }
      `,
    },
    // Derived from react-main/compiler useMemo-mabye-modified-free-variable-preserve-memoization-guarantees.js
    // useMemo with correct deps
    {
      code: tsx`
        function Component(props) {
          const free = makeObject_Primitives();
          const free2 = makeObject_Primitives();
          const part = free2.part;
          useHook();
          const object = useMemo(() => {
            const x = makeObject_Primitives();
            x.value = props.value;
            mutate(x, free, part);
            return x;
          }, [props.value, free, part]);
          identity(free);
          identity(part);
          return object;
        }
      `,
    },
    // Derived from react-main/compiler useMemo-arrow-implicit-return.js
    // useMemo with empty deps and no external values
    {
      code: tsx`
        function Component() {
          const value = useMemo(() => computeValue(), []);
          return <div>{value}</div>;
        }
      `,
    },
    // Derived from react-main/compiler preserve-use-memo-unused-state.js
    // setState setter in useCallback with empty deps (stable)
    {
      code: tsx`
        function useFoo() {
          const [, setState] = useState();
          return useCallback(() => {
            setState(x => x + 1);
          }, []);
        }
      `,
    },
    // Derived from react-main/compiler repro-preserve-memoization-inner-destructured-value-mistaken-as-dependency.js
    // useMemo with correct deps
    {
      code: tsx`
        function useInputValue(input) {
          const object = React.useMemo(() => {
            const {value} = identity(input);
            return {value};
          }, [input]);
          return object;
        }
      `,
    },
  ],
});
