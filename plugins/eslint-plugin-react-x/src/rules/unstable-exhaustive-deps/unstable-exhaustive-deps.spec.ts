// @ts-nocheck

import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./unstable-exhaustive-deps";

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
  ],
});
