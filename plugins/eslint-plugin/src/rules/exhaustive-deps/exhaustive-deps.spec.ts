// @ts-nocheck

import { ruleTester, verifyAndFix } from "@local/testkit";
import tsx from "dedent";
import { describe, expect, it } from "vitest";
import rule, { RULE_NAME } from "./exhaustive-deps";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Same as `exhaustive-deps` without options
    {
      code: tsx`
        function MyComponent({ userId }) {
          useEffect(() => {
            fetchUser(userId);
          }, []);
        }
      `,
      errors: [
        {
          message: `React Hook useEffect has a missing dependency: 'userId'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [userId]`,
              output: tsx`
                function MyComponent({ userId }) {
                  useEffect(() => {
                    fetchUser(userId);
                  }, [userId]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Setters returned by unconfigured custom Hooks are not stable
    {
      code: tsx`
        function MyComponent() {
          const [bar, setBar] = useRecoilState(barAtom);
          const fn = useCallback(() => setBar(234), []);
        }
      `,
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'setBar'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [setBar]`,
              output: tsx`
                function MyComponent() {
                  const [bar, setBar] = useRecoilState(barAtom);
                  const fn = useCallback(() => setBar(234), [setBar]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Custom Hook with the closure before the dependencies array
    {
      code: tsx`
        function MyComponent() {
          let a = 1;
          useMyEffect(() => {
            console.log(a);
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useMyEffect", closureIndex: 0, dependenciesIndex: 1 }] }],
      errors: [
        {
          message: `React Hook useMyEffect has a missing dependency: 'a'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a]`,
              output: tsx`
                function MyComponent() {
                  let a = 1;
                  useMyEffect(() => {
                    console.log(a);
                  }, [a]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Custom Hook with the dependencies array before the closure
    {
      code: tsx`
        function MyComponent() {
          let a = 1;
          let b = 1;
          useOtherEffect([a], () => {
            console.log(a, b);
          });
        }
      `,
      options: [{ hooks: [{ name: "useOtherEffect", closureIndex: 1, dependenciesIndex: 0 }] }],
      errors: [
        {
          message: `React Hook useOtherEffect has a missing dependency: 'b'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a, b]`,
              output: tsx`
                function MyComponent() {
                  let a = 1;
                  let b = 1;
                  useOtherEffect([a, b], () => {
                    console.log(a, b);
                  });
                }
              `,
            },
          ],
        },
      ],
    },
    // Custom Hook with other arguments around the closure and the dependencies array
    {
      code: tsx`
        function MyComponent({ a }) {
          const data = useQuery("key", [], () => fetchData(a), { enabled: true });
        }
      `,
      options: [{ hooks: [{ name: "useQuery", closureIndex: 2, dependenciesIndex: 1 }] }],
      errors: [
        {
          message: `React Hook useQuery has a missing dependency: 'a'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a]`,
              output: tsx`
                function MyComponent({ a }) {
                  const data = useQuery("key", [a], () => fetchData(a), { enabled: true });
                }
              `,
            },
          ],
        },
      ],
    },
    // Custom Hook called as a member of an object
    {
      code: tsx`
        function MyComponent({ a }) {
          lib.useMyEffect(() => {
            console.log(a);
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useMyEffect", closureIndex: 0, dependenciesIndex: 1 }] }],
      errors: [
        {
          message: `React Hook lib.useMyEffect has a missing dependency: 'a'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a]`,
              output: tsx`
                function MyComponent({ a }) {
                  lib.useMyEffect(() => {
                    console.log(a);
                  }, [a]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Only the configured positions of the returned array are stable
    {
      code: tsx`
        function MyComponent() {
          const [bar, setBar] = useRecoilState(barAtom);
          useEffect(() => {
            setBar(bar + 1);
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useRecoilState", stableResult: [1] }] }],
      errors: [
        {
          message: `React Hook useEffect has a missing dependency: 'bar'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [bar]`,
              output: tsx`
                function MyComponent() {
                  const [bar, setBar] = useRecoilState(barAtom);
                  useEffect(() => {
                    setBar(bar + 1);
                  }, [bar]);
                }
              `,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        function MyComponent() {
          const [a, b, c] = useTriple();
          useEffect(() => {
            console.log(a, b, c);
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useTriple", stableResult: [1, 2] }] }],
      errors: [
        {
          message: `React Hook useEffect has a missing dependency: 'a'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a]`,
              output: tsx`
                function MyComponent() {
                  const [a, b, c] = useTriple();
                  useEffect(() => {
                    console.log(a, b, c);
                  }, [a]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Positions only apply to array destructuring
    {
      code: tsx`
        function MyComponent() {
          const state = useRecoilState(barAtom);
          const fn = useCallback(() => state[1](234), []);
        }
      `,
      options: [{ hooks: [{ name: "useRecoilState", stableResult: 1 }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'state'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [state]`,
              output: tsx`
                function MyComponent() {
                  const state = useRecoilState(barAtom);
                  const fn = useCallback(() => state[1](234), [state]);
                }
              `,
            },
          ],
        },
      ],
    },
    // `stableResult: true` only applies to the returned value itself, not to values destructured from it
    {
      code: tsx`
        function MyComponent() {
          const { dispatch } = useStore();
          const fn = useCallback(() => dispatch(someAction()), []);
        }
      `,
      options: [{ hooks: [{ name: "useStore", stableResult: true }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'dispatch'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [dispatch]`,
              output: tsx`
                function MyComponent() {
                  const { dispatch } = useStore();
                  const fn = useCallback(() => dispatch(someAction()), [dispatch]);
                }
              `,
            },
          ],
        },
      ],
    },
    // `stableResult: false` does not mark anything as stable
    {
      code: tsx`
        function MyComponent() {
          const dispatch = useDispatch();
          const fn = useCallback(() => dispatch(someAction()), []);
        }
      `,
      options: [{ hooks: [{ name: "useDispatch", stableResult: false }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'dispatch'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [dispatch]`,
              output: tsx`
                function MyComponent() {
                  const dispatch = useDispatch();
                  const fn = useCallback(() => dispatch(someAction()), [dispatch]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Stable results of other Hooks do not make a Hook stable
    {
      code: tsx`
        function MyComponent() {
          const dispatch = useDispatch();
          const fn = useCallback(() => dispatch(someAction()), []);
        }
      `,
      options: [{ hooks: [{ name: "otherCustomHook", stableResult: true }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'dispatch'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [dispatch]`,
              output: tsx`
                function MyComponent() {
                  const dispatch = useDispatch();
                  const fn = useCallback(() => dispatch(someAction()), [dispatch]);
                }
              `,
            },
          ],
        },
      ],
    },
    // `additionalHooks` still works alongside `hooks`
    {
      code: tsx`
        function MyComponent({ value }) {
          const dispatch = useDispatch();
          useCustomEffect(() => {
            dispatch(value);
          }, []);
        }
      `,
      options: [{ additionalHooks: "useCustomEffect", hooks: [{ name: "useDispatch", stableResult: true }] }],
      errors: [
        {
          message: `React Hook useCustomEffect has a missing dependency: 'value'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [value]`,
              output: tsx`
                function MyComponent({ value }) {
                  const dispatch = useDispatch();
                  useCustomEffect(() => {
                    dispatch(value);
                  }, [value]);
                }
              `,
            },
          ],
        },
      ],
    },
    // P1: no-deps setState suggestion inserts at the configured dependencies index
    {
      code: tsx`
        function MyComponent() {
          const [, setX] = useState(0);
          useOtherEffect(undefined, () => {
            setX(1);
          });
        }
      `,
      options: [{ hooks: [{ name: "useOtherEffect", closureIndex: 1, dependenciesIndex: 0 }] }],
      errors: [
        {
          message:
            `React Hook useOtherEffect contains a call to 'setX'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [] as the dependencies argument (index 0) to the useOtherEffect Hook.`,
          suggestions: [
            {
              desc: `Add dependencies array: []`,
              output: tsx`
                function MyComponent() {
                  const [, setX] = useState(0);
                  useOtherEffect([], () => {
                    setX(1);
                  });
                }
              `,
            },
          ],
        },
      ],
    },
    // P1: no-deps setState suggestion appends when the configured slot is absent
    {
      code: tsx`
        function MyComponent() {
          const [, setX] = useState(0);
          useCustomEffect(() => {
            setX(1);
          }, { enabled: true });
        }
      `,
      options: [{ hooks: [{ name: "useCustomEffect", closureIndex: 0, dependenciesIndex: 2 }] }],
      errors: [
        {
          message:
            `React Hook useCustomEffect contains a call to 'setX'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [] as the dependencies argument (index 2) to the useCustomEffect Hook.`,
          suggestions: [
            {
              desc: `Add dependencies array: []`,
              output: tsx`
                function MyComponent() {
                  const [, setX] = useState(0);
                  useCustomEffect(() => {
                    setX(1);
                  }, { enabled: true }, []);
                }
              `,
            },
          ],
        },
      ],
    },
    // P1: dangerous autofix must land in the configured slot, not after the callback
    {
      code: tsx`
        function MyComponent() {
          const [, setX] = useState(0);
          useOtherEffect(undefined, () => {
            setX(1);
          });
        }
      `,
      options: [{
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        hooks: [{ name: "useOtherEffect", closureIndex: 1, dependenciesIndex: 0 }],
      }],
      output: tsx`
        function MyComponent() {
          const [, setX] = useState(0);
          useOtherEffect([], () => {
            setX(1);
          });
        }
      `,
      errors: [
        {
          message:
            `React Hook useOtherEffect contains a call to 'setX'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [] as the dependencies argument (index 0) to the useOtherEffect Hook.`,
          suggestions: [
            {
              desc: `Add dependencies array: []`,
              output: tsx`
                function MyComponent() {
                  const [, setX] = useState(0);
                  useOtherEffect([], () => {
                    setX(1);
                  });
                }
              `,
            },
          ],
        },
      ],
    },
    // P1: stableResult does not survive a reassignment
    {
      code: tsx`
        function MyComponent() {
          let dispatch = useDispatch();
          dispatch = other();
          const fn = useCallback(() => dispatch(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useDispatch", stableResult: true }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'dispatch'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [dispatch]`,
              output: tsx`
                function MyComponent() {
                  let dispatch = useDispatch();
                  dispatch = other();
                  const fn = useCallback(() => dispatch(1), [dispatch]);
                }
              `,
            },
          ],
        },
      ],
    },
    // P1: a configured stableResult must not override the built-in setter write guard
    {
      code: tsx`
        function MyComponent() {
          let [count, setCount] = useState(0);
          setCount = other();
          const fn = useCallback(() => setCount(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useState", stableResult: [1] }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'setCount'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [setCount]`,
              output: tsx`
                function MyComponent() {
                  let [count, setCount] = useState(0);
                  setCount = other();
                  const fn = useCallback(() => setCount(1), [setCount]);
                }
              `,
            },
          ],
        },
      ],
    },
    // #5: a default value at a different position does not make the binding stable
    {
      code: tsx`
        function MyComponent() {
          const [value, setValue = noop] = useCustomState();
          const fn = useCallback(() => setValue(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useCustomState", stableResult: [0] }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'setValue'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [setValue]`,
              output: tsx`
                function MyComponent() {
                  const [value, setValue = noop] = useCustomState();
                  const fn = useCallback(() => setValue(1), [setValue]);
                }
              `,
            },
          ],
        },
      ],
    },
    // #7: a gap in the configured argument positions is reported without a fix
    {
      code: tsx`
        function MyComponent() {
          const [, setX] = useState(0);
          useCustomEffect(() => {
            setX(1);
          }, { enabled: true });
        }
      `,
      options: [{
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        hooks: [{ name: "useCustomEffect", closureIndex: 0, dependenciesIndex: 3 }],
      }],
      output: null,
      errors: [
        {
          message:
            `React Hook useCustomEffect contains a call to 'setX'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [] as the dependencies argument (index 3) to the useCustomEffect Hook.`,
        },
      ],
    },
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
          message: `React Hook useEffect has a missing dependency: 'local'. Either include it or remove the dependency array.`,
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
          message: `React Hook useEffect has missing dependencies: 'bar' and 'foo'. Either include them or remove the dependency array.`,
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
          const fact = useMemo(() => foo + bar, [foo]);
          return fact;
        }
      `,
      errors: [
        {
          message: `React Hook useMemo has a missing dependency: 'bar'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [bar, foo]`,
              output: tsx`
                function MyComponent({ foo, bar }) {
                  const fact = useMemo(() => foo + bar, [bar, foo]);
                  return fact;
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
          message: `React Hook useCallback has a missing dependency: 'value'. Either include it or remove the dependency array.`,
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
          message: `React Hook useLayoutEffect has a missing dependency: 'value'. Either include it or remove the dependency array.`,
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
          message: `React Hook useImperativeHandle has a missing dependency: 'value'. Either include it or remove the dependency array.`,
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
          const fact = useMemo(() => value * 2);
          return fact;
        }
      `,
      errors: [
        {
          message: `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
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
          message: `React Hook useCallback does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
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
    // Complex expression in dependency array
    {
      code: tsx`
        function MyComponent({ foo }) {
          useEffect(() => {}, [foo.bar()]);
        }
      `,
      errors: [
        {
          message: `React Hook useEffect has a complex expression in the dependency array. Extract it to a separate variable so it can be statically checked.`,
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
          message: `React Hook React.useEffect has a missing dependency: 'local'. Either include it or remove the dependency array.`,
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
          message: `React Hook useCustomEffect has a missing dependency: 'value'. Either include it or remove the dependency array.`,
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
          message: `React Hook useDataEffect has missing dependencies: 'a' and 'b'. Either include them or remove the dependency array.`,
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-modify-global-in-callback-jsx.js
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
          message: `React Hook useMemo has a missing dependency: 'onClick'. Either include it or remove the dependency array.`,
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler array-pattern-spread-creates-array.js
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
          message: `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler block-scoping-switch-variable-scoping.js
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
          message: `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.invalid-reassign-variable-in-usememo.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler useCallback-maybe-modify-free-variable-dont-preserve-memoization-guarantee.js
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
          message: `React Hook useCallback has missing dependencies: 'free' and 'part'. Either include them or remove the dependency array.`,
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler useMemo-mabye-modified-free-variable-dont-preserve-memoization-guarantees.js
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
          message: `React Hook useMemo has missing dependencies: 'free' and 'part'. Either include them or remove the dependency array.`,
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler useMemo-with-optional.js
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
          message: `React Hook useMemo does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler useCallback-set-ref-nested-property.js
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
          message: `React Hook useCallback does nothing when called with only one argument. Did you forget to pass an array of dependencies?`,
        },
      ],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.invalid-useMemo-callback-args.js
    {
      code: tsx`
        function component(a, b) {
          let x = useMemo(c => a, []);
          return x;
        }
      `,
      errors: [
        {
          message: `React Hook useMemo has a missing dependency: 'a'. Either include it or remove the dependency array.`,
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
    // Review #9: configuring a built-in Hook name must not suppress the missing-callback error
    {
      code: tsx`
        function MyComponent() {
          useEffect();
        }
      `,
      options: [{ hooks: [{ name: "useEffect", closureIndex: 0, dependenciesIndex: 1 }] }],
      errors: [
        {
          message: `React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?`,
        },
      ],
    },
    // Review #10: a spread after the dependencies slot must not suppress the suggestion
    {
      code: tsx`
        function MyComponent() {
          const [, setX] = useState(0);
          useCustomEffect(() => {
            setX(1);
          }, undefined, ...extra);
        }
      `,
      options: [{ hooks: [{ name: "useCustomEffect", closureIndex: 0, dependenciesIndex: 1 }] }],
      errors: [
        {
          message:
            `React Hook useCustomEffect contains a call to 'setX'. Without a list of dependencies, this can lead to an infinite chain of updates. To fix this, pass [] as a second argument to the useCustomEffect Hook.`,
          suggestions: [
            {
              desc: `Add dependencies array: []`,
              output: tsx`
                function MyComponent() {
                  const [, setX] = useState(0);
                  useCustomEffect(() => {
                    setX(1);
                  }, [], ...extra);
                }
              `,
            },
          ],
        },
      ],
    },
    // Review #4: var redeclaration initializers are not stable
    {
      code: tsx`
        function MyComponent() {
          var dispatch = useDispatch();
          var dispatch = other();
          const fn = useCallback(() => dispatch(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useDispatch", stableResult: true }] }],
      errors: [
        {
          message: `React Hook useCallback has a missing dependency: 'dispatch'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [dispatch]`,
              output: tsx`
                function MyComponent() {
                  var dispatch = useDispatch();
                  var dispatch = other();
                  const fn = useCallback(() => dispatch(1), [dispatch]);
                }
              `,
            },
          ],
        },
      ],
    },
    // Review #6: a global additionalEffectHooks RegExp must not skip alternating calls
    {
      code: tsx`
        function MyComponent({ a, b }) {
          useMyEffect(() => {
            console.log(a);
          }, []);
          useMyEffect(() => {
            console.log(b);
          }, []);
        }
      `,
      settings: { "react-x": { additionalEffectHooks: "/useMyEffect/g" } },
      errors: [
        {
          message: `React Hook useMyEffect has a missing dependency: 'a'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [a]`,
              output: tsx`
                function MyComponent({ a, b }) {
                  useMyEffect(() => {
                    console.log(a);
                  }, [a]);
                  useMyEffect(() => {
                    console.log(b);
                  }, []);
                }
              `,
            },
          ],
        },
        {
          message: `React Hook useMyEffect has a missing dependency: 'b'. Either include it or remove the dependency array.`,
          suggestions: [
            {
              desc: `Update the dependencies array to be: [b]`,
              output: tsx`
                function MyComponent({ a, b }) {
                  useMyEffect(() => {
                    console.log(a);
                  }, []);
                  useMyEffect(() => {
                    console.log(b);
                  }, [b]);
                }
              `,
            },
          ],
        },
      ],
    },
  ],
  valid: [
    // Same as `exhaustive-deps` without options
    {
      code: tsx`
        function MyComponent() {
          const [count, setCount] = useState(0);
          const increment = useCallback(() => setCount((c) => c + 1), []);
        }
      `,
    },
    // Custom Hooks without a configured closure and dependencies array are not checked
    {
      code: tsx`
        function MyComponent() {
          let a = 1;
          useMyEffect(() => {
            console.log(a);
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useMyEffect", stableResult: true }] }],
    },
    // Equal `closureIndex` and `dependenciesIndex` are ignored
    {
      code: tsx`
        function MyComponent() {
          let a = 1;
          useMyEffect(() => {
            console.log(a);
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useMyEffect", closureIndex: 0, dependenciesIndex: 0 }] }],
    },
    // Custom Hook with correct dependencies
    {
      code: tsx`
        function MyComponent() {
          let a = 1;
          useMyEffect(() => {
            console.log(a);
          }, [a]);
          useOtherEffect([a], () => {
            console.log(a);
          });
        }
      `,
      options: [{
        hooks: [
          { name: "useMyEffect", closureIndex: 0, dependenciesIndex: 1 },
          { name: "useOtherEffect", closureIndex: 1, dependenciesIndex: 0 },
        ],
      }],
    },
    // Custom Hook without a dependencies array
    {
      code: tsx`
        function MyComponent() {
          let a = 1;
          useOtherEffect(undefined, () => {
            console.log(a);
          });
        }
      `,
      options: [{ hooks: [{ name: "useOtherEffect", closureIndex: 1, dependenciesIndex: 0 }] }],
    },
    // Whole result marked as stable
    {
      code: tsx`
        import { useCallback } from "react";
        import { useDispatch } from "react-redux";

        function MyComponent() {
          const dispatch = useDispatch();
          const doAction = useCallback(() => dispatch(someAction()), []);
        }
      `,
      options: [{ hooks: [{ name: "useDispatch", stableResult: true }] }],
    },
    // Stable results can still be listed as dependencies
    {
      code: tsx`
        function MyComponent() {
          const dispatch = useDispatch();
          const doAction = useCallback(() => dispatch(someAction()), [dispatch]);
        }
      `,
      options: [{ hooks: [{ name: "useDispatch", stableResult: true }] }],
    },
    // Position marked as stable, as an index or an array of indices
    {
      code: tsx`
        function MyComponent() {
          const [bar, setBar] = useRecoilState(barAtom);
          const fn = useCallback(() => setBar(234), []);
        }
      `,
      options: [{ hooks: [{ name: "useRecoilState", stableResult: 1 }] }],
    },
    {
      code: tsx`
        function MyComponent() {
          const [bar, setBar] = useRecoilState(barAtom);
          useEffect(() => {
            setBar(bar + 1);
          }, [bar]);
        }
      `,
      options: [{ hooks: [{ name: "useRecoilState", stableResult: [1] }] }],
    },
    {
      code: tsx`
        function MyComponent() {
          const [a, b, c] = useTriple();
          useEffect(() => {
            console.log(a, b, c);
          }, [a]);
        }
      `,
      options: [{ hooks: [{ name: "useTriple", stableResult: [1, 2] }] }],
    },
    // Stable results of Hooks called as a member of an object, or wrapped in a type assertion
    {
      code: tsx`
        function MyComponent() {
          const dispatch = store.useDispatch();
          const [bar, setBar] = useRecoilState(barAtom) as [number, (value: number) => void];
          const fn = useCallback(() => {
            dispatch(someAction());
            setBar(234);
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useDispatch", stableResult: true }, { name: "useRecoilState", stableResult: [1] }] }],
    },
    // Functions that only capture stable results are stable
    {
      code: tsx`
        function MyComponent() {
          const dispatch = useDispatch();
          function reset() {
            dispatch(resetAction());
          }
          useEffect(() => {
            reset();
          }, []);
        }
      `,
      options: [{ hooks: [{ name: "useDispatch", stableResult: true }] }],
    },
    // Custom Hook with a closure that uses stable results
    {
      code: tsx`
        function MyComponent({ a }) {
          const [bar, setBar] = useRecoilState(barAtom);
          useMyEffect(() => {
            setBar(a);
          }, [a]);
        }
      `,
      options: [{
        hooks: [
          { name: "useMyEffect", closureIndex: 0, dependenciesIndex: 1 },
          { name: "useRecoilState", stableResult: [1] },
        ],
      }],
    },
    // P1: the configured Hook may be declared after another declarator of the same variable
    {
      code: tsx`
        function MyComponent() {
          var a, setState;
          var [a, setState] = useCustomState();
          const fn = useCallback(() => setState(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useCustomState", stableResult: [1] }] }],
    },
    // #4: a configured Hook may omit the closure
    {
      code: tsx`
        function MyComponent() {
          const q = useQuery("key");
        }
      `,
      options: [{ hooks: [{ name: "useQuery", closureIndex: 2, dependenciesIndex: 1 }] }],
    },
    // #5: a default value in the stable position still matches
    {
      code: tsx`
        function MyComponent() {
          const [value, setValue = noop] = useCustomState();
          const fn = useCallback(() => setValue(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useCustomState", stableResult: [1] }] }],
    },
    // #5: a default value at index 0 still matches
    {
      code: tsx`
        function MyComponent() {
          const [value = 0, setValue] = useCustomState();
          const fn = useCallback(() => value, []);
        }
      `,
      options: [{ hooks: [{ name: "useCustomState", stableResult: [0] }] }],
    },
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
          const fact = useMemo(() => a + b, [a, b]);
          return fact;
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler drop-methodcall-usecallback.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler drop-methodcall-usememo.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler babel-existing-react-import.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-ref-access-in-effect.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-ref-access-in-unused-callback-nested.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-global-mutation-unused-usecallback.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.invalid-hoisting-setstate.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler useCallback-maybe-modify-free-variable-preserve-memoization-guarantee.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler useMemo-mabye-modified-free-variable-preserve-memoization-guarantees.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler useMemo-arrow-implicit-return.js
    // useMemo with empty deps and no external values
    {
      code: tsx`
        function Component() {
          const value = useMemo(() => computeValue(), []);
          return <div>{value}</div>;
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler preserve-use-memo-unused-state.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler repro-preserve-memoization-inner-destructured-value-mistaken-as-dependency.js
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
    // Review #2: configured stableResult supplements the built-in analysis
    {
      code: tsx`
        function MyComponent() {
          const [value, setValue] = store.useState(0);
          const fn = useCallback(() => setValue(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useState", stableResult: [1] }] }],
    },
    {
      code: tsx`
        function MyComponent() {
          const [value, setValue = noop] = useState(0);
          const fn = useCallback(() => setValue(1), []);
        }
      `,
      options: [{ hooks: [{ name: "useState", stableResult: [1] }] }],
    },
    // Review #3: useActionState returns a 3-element tuple in React 19
    {
      code: tsx`
        function MyComponent() {
          const [state, formAction, isPending] = useActionState(action, initial);
          useEffect(() => {
            formAction();
          }, []);
        }
      `,
    },
    // Review #7: built-in analysis finds the Hook declarator after a bare var declaration
    {
      code: tsx`
        function MyComponent() {
          var a, setState;
          var [a, setState] = useState(0);
          useEffect(() => {
            setState(1);
          }, []);
        }
      `,
    },
    // Review #8: built-in setter check unwraps a default value
    {
      code: tsx`
        function MyComponent() {
          const [value, setValue = noop] = useState(0);
          useEffect(() => {
            setValue(1);
          }, []);
        }
      `,
    },
    // Review #5: configured Hooks with null or spread closures are skipped
    {
      code: tsx`
        function MyComponent({ id }) {
          useQuery(null, [id]);
        }
      `,
      options: [{ hooks: [{ name: "useQuery", closureIndex: 0, dependenciesIndex: 1 }] }],
    },
    {
      code: tsx`
        function MyComponent({ id }) {
          useQuery(...args, [id]);
        }
      `,
      options: [{ hooks: [{ name: "useQuery", closureIndex: 0, dependenciesIndex: 1 }] }],
    },
  ],
});

describe("dangerous autofix idempotence", () => {
  it("fixes a configured Hook at a non-adjacent dependencies index in one pass", () => {
    const code = tsx`
      function MyComponent() {
        const [, setX] = useState(0);
        useOtherEffect(undefined, () => {
          setX(1);
        });
      }
    `;
    const result = verifyAndFix(code, rule, [{
      enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      hooks: [{ name: "useOtherEffect", closureIndex: 1, dependenciesIndex: 0 }],
    }]);
    expect(result.fixed).toBe(true);
    expect(result.messages).toHaveLength(0);
    expect(result.output).toBe(tsx`
      function MyComponent() {
        const [, setX] = useState(0);
        useOtherEffect([], () => {
          setX(1);
        });
      }
    `);
  });

  it("does not loop when the configured dependencies slot is beyond the arguments", () => {
    const code = tsx`
      function MyComponent() {
        const [, setX] = useState(0);
        useCustomEffect(() => {
          setX(1);
        }, { enabled: true });
      }
    `;
    const result = verifyAndFix(code, rule, [{
      enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      hooks: [{ name: "useCustomEffect", closureIndex: 0, dependenciesIndex: 3 }],
    }]);
    expect(result.fixed).toBe(false);
    expect(result.messages).toHaveLength(1);
    expect(result.output).toBe(code);
  });

  it("keeps the dependencies array outside parenthesized last arguments", () => {
    const code = tsx`
      function MyComponent() {
        const [, setX] = useState(0);
        useEffect((() => {
          setX(1);
        }));
      }
    `;
    const result = verifyAndFix(code, rule, [{
      enableDangerousAutofixThisMayCauseInfiniteLoops: true,
    }]);
    expect(result.fixed).toBe(true);
    expect(result.messages).toHaveLength(0);
    expect(result.output).toBe(tsx`
      function MyComponent() {
        const [, setX] = useState(0);
        useEffect((() => {
          setX(1);
        }), []);
      }
    `);
  });

  it("handles a trailing comma before the call's closing paren", () => {
    const code = tsx`
      function MyComponent() {
        const [, setX] = useState(0);
        useEffect((() => {
          setX(1);
        }),);
      }
    `;
    const result = verifyAndFix(code, rule, [{
      enableDangerousAutofixThisMayCauseInfiniteLoops: true,
    }]);
    expect(result.fixed).toBe(true);
    expect(result.messages).toHaveLength(0);
    expect(result.output).toBe(tsx`
      function MyComponent() {
        const [, setX] = useState(0);
        useEffect((() => {
          setX(1);
        }), []);
      }
    `);
  });
});
