import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./exhaustive-deps";

// Task 6.1: Valid test cases
ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Task 6.2: Missing reactive values
    {
      name: "missing a single reactive dep",
      code: tsx`
        function MyComponent({ a }) {
          useEffect(() => {
            console.log(a);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'a'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ a }) {
          useEffect(() => {
            console.log(a);
          }, [a]);
          return null;
        }
      `,
    },
    {
      name: "missing multiple reactive deps",
      code: tsx`
        function MyComponent({ a, b }) {
          useEffect(() => {
            console.log(a, b);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'a', 'b'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ a, b }) {
          useEffect(() => {
            console.log(a, b);
          }, [a, b]);
          return null;
        }
      `,
    },
    // Unnecessary dependencies
    {
      name: "unnecessary dependency not referenced in callback",
      code: tsx`
        function MyComponent({ a, b }) {
          useEffect(() => {
            console.log(a);
          }, [a, b]);
          return null;
        }
      `,
      errors: [
        {
          messageId: "unnecessaryDeps",
          data: { deps: "'b'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ a, b }) {
          useEffect(() => {
            console.log(a);
          }, [a]);
          return null;
        }
      `,
    },
    // Non-literal dependency arrays (no autofix)
    {
      name: "non-literal dependency array (variable reference)",
      code: tsx`
        function MyComponent({ a }) {
          const deps = [a];
          useEffect(() => {
            console.log(a);
          }, deps);
          return null;
        }
      `,
      errors: [
        {
          messageId: "nonLiteralDeps",
          data: { hookName: "useEffect" },
        },
      ],
    },
    // Member expression dependencies
    {
      name: "missing member expression dependency obj.property",
      code: tsx`
        function MyComponent({ obj }) {
          useEffect(() => {
            console.log(obj.property);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'obj.property'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ obj }) {
          useEffect(() => {
            console.log(obj.property);
          }, [obj.property]);
          return null;
        }
      `,
    },
    {
      name: "missing multiple member expression deps obj.a and obj.b",
      code: tsx`
        function MyComponent({ obj }) {
          useEffect(() => {
            console.log(obj.a, obj.b);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'obj.a', 'obj.b'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ obj }) {
          useEffect(() => {
            console.log(obj.a, obj.b);
          }, [obj.a, obj.b]);
          return null;
        }
      `,
    },
    // Optional chaining dependencies
    {
      name: "missing optional chaining dependency obj?.property",
      code: tsx`
        function MyComponent({ obj }) {
          useEffect(() => {
            console.log(obj?.property);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'obj?.property'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ obj }) {
          useEffect(() => {
            console.log(obj?.property);
          }, [obj?.property]);
          return null;
        }
      `,
    },
    // useMemo with missing deps
    {
      name: "useMemo with missing reactive dep",
      code: tsx`
        function MyComponent({ x, y }) {
          const result = useMemo(() => x + y, [x]);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'y'", hookName: "useMemo" },
        },
      ],
      output: tsx`
        function MyComponent({ x, y }) {
          const result = useMemo(() => x + y, [x, y]);
          return null;
        }
      `,
    },
    // useCallback with missing deps
    {
      name: "useCallback with missing reactive dep",
      code: tsx`
        function MyComponent({ handler }) {
          const cb = useCallback(() => {
            handler();
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'handler'", hookName: "useCallback" },
        },
      ],
      output: tsx`
        function MyComponent({ handler }) {
          const cb = useCallback(() => {
            handler();
          }, [handler]);
          return null;
        }
      `,
    },
    // useImperativeHandle with missing deps (callback at index 1)
    {
      name: "useImperativeHandle with missing reactive dep",
      code: tsx`
        function MyComponent({ value }, ref) {
          useImperativeHandle(ref, () => ({
            getValue: () => value,
          }), []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'value'", hookName: "useImperativeHandle" },
        },
      ],
      output: tsx`
        function MyComponent({ value }, ref) {
          useImperativeHandle(ref, () => ({
            getValue: () => value,
          }), [value]);
          return null;
        }
      `,
    },
    // Additional invalid test cases from ESLintRuleExhaustiveDeps-test.js
    // Optional chaining with missing dep
    {
      name: "useCallback with optional chaining missing dep",
      code: tsx`
        function MyComponent({ foo }: { foo?: { toString(): string } }) {
          useCallback(() => {
            console.log(foo?.toString());
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'foo'", hookName: "useCallback" },
        },
      ],
      output: tsx`
        function MyComponent({ foo }: { foo?: { toString(): string } }) {
          useCallback(() => {
            console.log(foo?.toString());
          }, [foo]);
          return null;
        }
      `,
    },
    // Local variable missing dep
    {
      name: "local variable missing from deps",
      code: tsx`
        function MyComponent() {
          const local = someFunc();
          useEffect(() => {
            console.log(local);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local = someFunc();
          useEffect(() => {
            console.log(local);
          }, [local]);
          return null;
        }
      `,
    },
    // Mutable variable missing dep (primitive but declared with let)
    {
      name: "mutable variable missing from deps (let declaration)",
      code: tsx`
        function MyComponent() {
          let local = 42;
          useEffect(() => {
            console.log(local);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          let local = 42;
          useEffect(() => {
            console.log(local);
          }, [local]);
          return null;
        }
      `,
    },
    // Regex literal (stateful, should be a dep)
    {
      name: "regex literal missing from deps",
      code: tsx`
        function MyComponent() {
          const local = /foo/;
          useEffect(() => {
            console.log(local);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local = /foo/;
          useEffect(() => {
            console.log(local);
          }, [local]);
          return null;
        }
      `,
    },
    // Local variable in conditional
    {
      name: "local variable in conditional missing from deps",
      code: tsx`
        function MyComponent() {
          const local = someFunc();
          useEffect(() => {
            if (true) {
              console.log(local);
            }
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local = someFunc();
          useEffect(() => {
            if (true) {
              console.log(local);
            }
          }, [local]);
          return null;
        }
      `,
    },
    // Local variable in try/catch
    {
      name: "local variable in try/finally missing from deps",
      code: tsx`
        function MyComponent() {
          const local = {};
          useEffect(() => {
            try {
              console.log(local);
            } finally {}
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local = {};
          useEffect(() => {
            try {
              console.log(local);
            } finally {}
          }, [local]);
          return null;
        }
      `,
    },
    // Local variable in nested function
    {
      name: "local variable in nested function missing from deps",
      code: tsx`
        function MyComponent() {
          const local = {};
          useEffect(() => {
            function inner() {
              console.log(local);
            }
            inner();
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local = {};
          useEffect(() => {
            function inner() {
              console.log(local);
            }
            inner();
          }, [local]);
          return null;
        }
      `,
    },
    // Multiple locals in block scope missing
    {
      name: "multiple locals in block scope missing from deps",
      code: tsx`
        function MyComponent() {
          const local1 = someFunc();
          {
            const local2 = someFunc();
            useEffect(() => {
              console.log(local1);
              console.log(local2);
            }, []);
          }
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local1' and 'local2'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local1 = someFunc();
          {
            const local2 = someFunc();
            useEffect(() => {
              console.log(local1);
              console.log(local2);
            }, [local1, local2]);
          }
          return null;
        }
      `,
    },
    // One local missing from deps
    {
      name: "one of two locals missing from deps",
      code: tsx`
        function MyComponent() {
          const local1 = {};
          const local2 = {};
          useEffect(() => {
            console.log(local1);
            console.log(local2);
          }, [local1]);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local2'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local1 = {};
          const local2 = {};
          useEffect(() => {
            console.log(local1);
            console.log(local2);
          }, [local1, local2]);
          return null;
        }
      `,
    },
    // Unnecessary dependency in useMemo
    {
      name: "unnecessary dependency in useMemo",
      code: tsx`
        function MyComponent() {
          const local1 = {};
          const local2 = {};
          useMemo(() => {
            console.log(local1);
          }, [local1, local2]);
          return null;
        }
      `,
      errors: [
        {
          messageId: "unnecessaryDeps",
          data: { deps: "'local2'", hookName: "useMemo" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local1 = {};
          const local2 = {};
          useMemo(() => {
            console.log(local1);
          }, [local1]);
          return null;
        }
      `,
    },
    // Outer scope value incorrectly included
    {
      name: "outer scope value incorrectly included in nested component",
      code: tsx`
        function MyComponent() {
          const local1 = someFunc();
          function MyNestedComponent() {
            const local2 = {};
            useCallback(() => {
              console.log(local1);
              console.log(local2);
            }, [local1]);
          }
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'local2'", hookName: "useCallback" },
        },
      ],
      output: tsx`
        function MyComponent() {
          const local1 = someFunc();
          function MyNestedComponent() {
            const local2 = {};
            useCallback(() => {
              console.log(local1);
              console.log(local2);
            }, [local2]);
          }
          return null;
        }
      `,
    },
  ],
  valid: [
    ...allValid,
    // All deps present
    {
      name: "useEffect with all reactive deps present",
      code: tsx`
        function MyComponent({ a, b }) {
          useEffect(() => {
            console.log(a, b);
          }, [a, b]);
          return null;
        }
      `,
    },
    {
      name: "useMemo with all reactive deps present",
      code: tsx`
        function MyComponent({ x }) {
          const val = useMemo(() => x * 2, [x]);
          return null;
        }
      `,
    },
    {
      name: "useCallback with all reactive deps present",
      code: tsx`
        function MyComponent({ onClick }) {
          const handler = useCallback(() => {
            onClick();
          }, [onClick]);
          return null;
        }
      `,
    },
    // Stable values omitted — setState from useState
    {
      name: "setState from useState omitted from deps",
      code: tsx`
        function MyComponent() {
          const [count, setCount] = useState(0);
          useEffect(() => {
            setCount(count + 1);
          }, [count]);
          return null;
        }
      `,
    },
    // Stable values omitted — dispatch from useReducer
    {
      name: "dispatch from useReducer omitted from deps",
      code: tsx`
        function MyComponent() {
          const [state, dispatch] = useReducer(reducer, init);
          useEffect(() => {
            dispatch({ type: "increment" });
          }, []);
          return null;
        }
      `,
    },
    // Stable values omitted — ref from useRef
    {
      name: "ref from useRef omitted from deps",
      code: tsx`
        function MyComponent() {
          const ref = useRef(null);
          useEffect(() => {
            console.log(ref.current);
          }, []);
          return null;
        }
      `,
    },
    // Stable values omitted — startTransition from useTransition
    {
      name: "startTransition from useTransition omitted from deps",
      code: tsx`
        function MyComponent() {
          const [isPending, startTransition] = useTransition();
          useEffect(() => {
            startTransition(() => {});
          }, []);
          return null;
        }
      `,
    },
    // Module-level constants omitted
    {
      name: "module-level constant omitted from deps",
      code: tsx`
        const API_URL = "https://example.com";
        function MyComponent() {
          useEffect(() => {
            fetch(API_URL);
          }, []);
          return null;
        }
      `,
    },
    // Imports omitted
    {
      name: "imported value omitted from deps",
      code: tsx`
        import { helper } from "./utils";
        function MyComponent() {
          useEffect(() => {
            helper();
          }, []);
          return null;
        }
      `,
    },
    // No dependency array (runs every render)
    {
      name: "useEffect with no dependency array runs every render",
      code: tsx`
        function MyComponent({ value }) {
          useEffect(() => {
            console.log(value);
          });
          return null;
        }
      `,
    },
    // Empty dependency array with no reactive values
    {
      name: "useEffect with empty deps and no reactive values",
      code: tsx`
        function MyComponent() {
          useEffect(() => {
            console.log("mounted");
          }, []);
          return null;
        }
      `,
    },
    // useLayoutEffect with all deps present
    {
      name: "useLayoutEffect with all deps present",
      code: tsx`
        function MyComponent({ size }) {
          useLayoutEffect(() => {
            document.title = size;
          }, [size]);
          return null;
        }
      `,
    },
    // useInsertionEffect with all deps present
    {
      name: "useInsertionEffect with all deps present",
      code: tsx`
        function MyComponent({ theme }) {
          useInsertionEffect(() => {
            applyTheme(theme);
          }, [theme]);
          return null;
        }
      `,
    },
    // All stable values combined
    {
      name: "all stable values omitted from deps together",
      code: tsx`
        function MyComponent() {
          const [count, setCount] = useState(0);
          const [state, dispatch] = useReducer(reducer, init);
          const ref = useRef(null);
          const [isPending, startTransition] = useTransition();
          useEffect(() => {
            setCount(1);
            dispatch({ type: "reset" });
            ref.current = null;
            startTransition(() => {});
          }, []);
          return null;
        }
      `,
    },
    // useImperativeHandle with all deps present
    {
      name: "useImperativeHandle with all deps present",
      code: tsx`
        function MyComponent({ value }, ref) {
          useImperativeHandle(ref, () => ({
            getValue: () => value,
          }), [value]);
          return null;
        }
      `,
    },
    // Issue #1528: variables declared inside the callback are locals, not deps
    {
      name: "variable declared inside callback is not a dep (issue #1528 reproduction)",
      code: tsx`
        declare function getSomeData(): unknown;
        function Component() {
          useEffect(() => {
            const data = getSomeData();
            console.log(data);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "multiple variables declared inside callback are not deps",
      code: tsx`
        function Component() {
          useEffect(() => {
            const x = 1;
            const y = 2;
            console.log(x + y);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "callback-local variable used in nested function inside callback is not a dep",
      code: tsx`
        function Component() {
          useEffect(() => {
            const items = [1, 2, 3];
            items.forEach((item) => {
              console.log(item);
            });
          }, []);
          return null;
        }
      `,
    },
    {
      name: "callback-local and component-level deps coexist correctly",
      code: tsx`
        function Component({ id }) {
          useEffect(() => {
            const result = id * 2;
            console.log(result);
          }, [id]);
          return null;
        }
      `,
    },
    {
      name: "callback-local variable member access is not a dep",
      code: tsx`
        declare function fetchUser(): { name: string };
        function Component() {
          useEffect(() => {
            const user = fetchUser();
            console.log(user.name);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "useMemo callback-local variable is not a dep",
      code: tsx`
        function Component({ multiplier }) {
          const value = useMemo(() => {
            const base = 10;
            return base * multiplier;
          }, [multiplier]);
          return null;
        }
      `,
    },
    // Additional valid test cases from ESLintRuleExhaustiveDeps-test.js
    // Local variable without deps (runs every render)
    {
      name: "local variable used without deps array (runs every render)",
      code: tsx`
        function MyComponent() {
          const local = {};
          useEffect(() => {
            console.log(local);
          });
          return null;
        }
      `,
    },
    // Local declared inside effect
    {
      name: "local variable declared inside effect callback",
      code: tsx`
        function MyComponent() {
          useEffect(() => {
            const local = {};
            console.log(local);
          }, []);
          return null;
        }
      `,
    },
    // Block scoped locals
    {
      name: "block-scoped locals in nested block",
      code: tsx`
        function MyComponent() {
          const local1 = {};
          {
            const local2 = {};
            useEffect(() => {
              console.log(local1);
              console.log(local2);
            });
          }
          return null;
        }
      `,
    },
    // useCallback with all deps from nested scope
    {
      name: "useCallback with deps from nested and outer scope",
      code: tsx`
        function MyComponent() {
          const local1 = someFunc();
          {
            const local2 = someFunc();
            useCallback(() => {
              console.log(local1);
              console.log(local2);
            }, [local1, local2]);
          }
          return null;
        }
      `,
    },
    // Nested component - outer scope not referenced
    {
      name: "nested component only references its own scope",
      code: tsx`
        function MyComponent() {
          const local1 = someFunc();
          function MyNestedComponent() {
            const local2 = someFunc();
            useCallback(() => {
              console.log(local1);
              console.log(local2);
            }, [local2]);
          }
          return null;
        }
      `,
    },
    // Same dependency referenced multiple times
    {
      name: "same dependency referenced multiple times in callback",
      code: tsx`
        function MyComponent() {
          const local = someFunc();
          useEffect(() => {
            console.log(local);
            console.log(local);
          }, [local]);
          return null;
        }
      `,
    },
    // Unresolved variables (not defined, likely imports or globals)
    {
      name: "unresolved variable is ignored",
      code: tsx`
        function MyComponent() {
          useEffect(() => {
            console.log(unresolved);
          }, []);
          return null;
        }
      `,
    },
    // Sparse array with dependency
    {
      name: "sparse dependency array with holes",
      code: tsx`
        function MyComponent() {
          const local = someFunc();
          useEffect(() => {
            console.log(local);
          }, [,,,local,,,]);
          return null;
        }
      `,
    },
    // useLayoutEffect and useImperativeHandle without deps
    {
      name: "hooks without deps array are valid",
      code: tsx`
        function MyComponent(props: { innerRef: React.RefObject<HTMLDivElement> }) {
          useEffect(() => {});
          useLayoutEffect(() => {});
          useImperativeHandle(props.innerRef, () => ({}));
          return null;
        }
      `,
    },
    // Member expression with stable property access
    {
      name: "member expression dependency with stable methods",
      code: tsx`
        function MyComponent({ foo }: { foo: string[] }) {
          useEffect(() => {
            console.log(foo.length);
          }, [foo]);
          return null;
        }
      `,
    },
    // Multiple member expressions on same prop
    {
      name: "multiple methods on same prop dependency",
      code: tsx`
        function MyComponent({ foo }: { foo: string[] }) {
          useEffect(() => {
            console.log(foo.length);
            console.log(foo.slice(0));
          }, [foo]);
          return null;
        }
      `,
    },
    // History listen pattern
    {
      name: "history.listen pattern",
      code: tsx`
        function MyComponent({ history }: { history: { listen: () => () => void } }) {
          useEffect(() => {
            return history.listen();
          }, [history]);
          return null;
        }
      `,
    },
    // Props destructured with individual deps
    {
      name: "destructured props with individual field deps",
      code: tsx`
        function MyComponent({ foo }: { foo: string }) {
          useEffect(() => {
            console.log(foo);
          }, [foo]);
          return null;
        }
      `,
    },
    // Multiple props in correct order
    {
      name: "multiple props in alphabetical order",
      code: tsx`
        function MyComponent({ bar, foo }: { bar: string; foo: string }) {
          useEffect(() => {
            console.log(foo);
            console.log(bar);
          }, [bar, foo]);
          return null;
        }
      `,
    },
    // Over-specified deps for effect (valid but not optimal)
    {
      name: "over-specified deps for effects is valid",
      code: tsx`
        function MyComponent({ foo }: { foo: { bar: { baz: string } } }) {
          useEffect(() => {
            console.log(foo.bar.baz);
          }, [foo.bar, foo.bar.baz]);
          return null;
        }
      `,
    },
    // Nullish coalescing with optional chaining
    {
      name: "nullish coalescing with optional chaining in deps",
      code: tsx`
        function MyComponent({ foo }: { foo?: { bar?: { baz: string } } }) {
          useEffect(() => {
            console.log(foo?.bar?.baz ?? null);
          }, [foo?.bar]);
          return null;
        }
      `,
    },
    // Optional chaining in deps matches non-optional in body
    {
      name: "optional chaining in deps covers non-optional access",
      code: tsx`
        function MyComponent({ foo }: { foo: { bar: string } }) {
          useEffect(() => {
            console.log(foo.bar);
          }, [foo?.bar]);
          return null;
        }
      `,
    },
    // Non-optional in deps covers optional in body
    {
      name: "non-optional dep covers optional chaining access",
      code: tsx`
        function MyComponent({ foo }: { foo: { bar: string } }) {
          useEffect(() => {
            console.log(foo?.bar);
          }, [foo.bar]);
          return null;
        }
      `,
    },
    // Props passed as function argument
    {
      name: "props passed to function in callback",
      code: tsx`
        function MyComponent({ foo }: { foo: { toString(): string } }) {
          useCallback(() => {
            console.log(foo?.toString());
          }, [foo]);
          return null;
        }
      `,
    },
    // Function expression as effect callback
    {
      name: "function expression passed to useEffect",
      code: tsx`
        function MyComponent() {
          const myEffect = () => {
            // Doesn't use anything
          };
          useEffect(myEffect, []);
          return null;
        }
      `,
    },
    // Module-level variable in effect
    {
      name: "module-level variable in effect callback",
      code: tsx`
        const local = {};
        function MyComponent() {
          const myEffect = () => {
            console.log(local);
          };
          useEffect(myEffect, []);
          return null;
        }
      `,
    },
    // Global access in effect
    {
      name: "global variable access in effect",
      code: tsx`
        function MyComponent() {
          function myEffect() {
            console.log(globalThis);
          }
          useEffect(myEffect, []);
          return null;
        }
      `,
    },
    // Effect passed as prop with dep
    {
      name: "effect function passed as prop with effect as dep",
      code: tsx`
        function MyComponent({ myEffect }: { myEffect: () => void }) {
          useEffect(myEffect, [myEffect]);
          return null;
        }
      `,
    },
    // Effect passed as prop without deps
    {
      name: "effect function passed as prop without deps",
      code: tsx`
        function MyComponent({ myEffect }: { myEffect: () => void }) {
          useEffect(myEffect);
          return null;
        }
      `,
    },
    // Ref patterns - ref with dep is valid
    {
      name: "useRef included in deps is valid",
      code: tsx`
        function MyComponent() {
          const ref = useRef<HTMLDivElement>(null);
          useEffect(() => {
            console.log(ref.current);
          }, [ref]);
          return null;
        }
      `,
    },
    // Ref omitted from deps is valid (stable)
    {
      name: "useRef omitted from deps is valid (stable)",
      code: tsx`
        function MyComponent() {
          const ref = useRef<HTMLDivElement>(null);
          useEffect(() => {
            console.log(ref.current);
          }, []);
          return null;
        }
      `,
    },
    // Assigning to ref.current makes it not a managed ref
    {
      name: "assigning to ref.current makes it not a managed ref",
      code: tsx`
        function MyComponent() {
          const myRef = useRef<string>("");
          useEffect(() => {
            myRef.current = "value";
            return () => {
              console.log(myRef.current.toString());
            };
          }, []);
          return null;
        }
      `,
    },
    // Capturing ref.current in local variable
    {
      name: "capturing ref.current in local variable is valid",
      code: tsx`
        function MyComponent() {
          const myRef = useRef<HTMLDivElement>(null);
          useEffect(() => {
            const node = myRef.current;
            if (node) {
              node.addEventListener("click", () => {});
              return () => node.removeEventListener("click", () => {});
            }
          }, []);
          return <div ref={myRef} />;
        }
      `,
    },
    // useCallback with ref.current access
    {
      name: "useCallback with ref.current access in handlers",
      code: tsx`
        function useMyThing(myRef: React.RefObject<HTMLDivElement>) {
          return useCallback(() => {
            myRef.current?.addEventListener("mousemove", () => {});
            return function () {
              setTimeout(() => {
                myRef.current?.removeEventListener("mousemove", () => {});
              });
            };
          }, [myRef]);
        }
      `,
    },
    // Ref read in non-cleanup function
    {
      name: "ref read in event handler function is valid",
      code: tsx`
        function useMyThing() {
          const myRef = useRef<HTMLDivElement>(null);
          useEffect(() => {
            const handleMove = () => {
              console.log(myRef.current);
            };
            window.addEventListener("mousemove", handleMove);
            return () => window.removeEventListener("mousemove", handleMove);
          }, []);
          return <div ref={myRef} />;
        }
      `,
    },
    // Primitive constants don't need to be deps
    {
      name: "primitive constants don't need to be deps",
      code: tsx`
        function MyComponent() {
          const local1 = 42;
          const local2 = "42";
          const local3 = null;
          useEffect(() => {
            console.log(local1);
            console.log(local2);
            console.log(local3);
          }, []);
          return null;
        }
      `,
    },
    // Over-specifying deps is valid
    {
      name: "over-specifying deps is valid",
      code: tsx`
        function MyComponent({ activeTab }: { activeTab: string }) {
          useEffect(() => {
            window.scrollTo(0, 0);
          }, [activeTab]);
          return null;
        }
      `,
    },
    // Broader deps for nested properties
    {
      name: "broader deps covering nested property access",
      code: tsx`
        function MyComponent({
          props,
        }: {
          props: { foo: { bar: { baz: string } } };
        }) {
          useEffect(() => {
            console.log(props.foo.bar.baz);
          }, [props]);
          useCallback(() => {
            console.log(props.foo.bar.baz);
          }, [props.foo]);
          return null;
        }
      `,
    },
    // Static functions don't need to be deps
    {
      name: "static functions don't need to be deps",
      code: tsx`
        function MyComponent() {
          function handleNext1() {
            console.log("hello");
          }
          const handleNext2 = () => {
            console.log("hello");
          };
          let handleNext3 = function () {
            console.log("hello");
          };
          useEffect(() => {
            return Store.subscribe(handleNext1);
          }, []);
          useLayoutEffect(() => {
            return Store.subscribe(handleNext2);
          }, []);
          useMemo(() => {
            return Store.subscribe(handleNext3);
          }, []);
          return null;
        }
      `,
    },
    // Functions using only static values don't need to be deps
    {
      name: "functions using only static values don't need to be deps",
      code: tsx`
        function MyComponent() {
          const [, setState] = useState();
          const [, dispatch] = useReducer(() => {}, {});

          function handleNext1(value: number) {
            let value2 = value * 100;
            setState(value2);
            console.log("hello");
          }
          const handleNext2 = () => {
            setState(1);
            console.log("hello");
          };
          let handleNext3 = function (value: string) {
            console.log(value);
            dispatch({ type: "x", value });
          };
          useEffect(() => {
            return Store.subscribe(handleNext1);
          }, []);
          useLayoutEffect(() => {
            return Store.subscribe(handleNext2);
          }, []);
          useMemo(() => {
            return Store.subscribe(handleNext3);
          }, []);
          return null;
        }
      `,
    },
    // useInterval pattern
    {
      name: "useInterval pattern with ref",
      code: tsx`
        function useInterval(callback: () => void, delay: number | null) {
          const savedCallback = useRef<() => void>();
          useEffect(() => {
            savedCallback.current = callback;
          });
          useEffect(() => {
            function tick() {
              savedCallback.current?.();
            }
            if (delay !== null) {
              let id = setInterval(tick, delay);
              return () => clearInterval(id);
            }
          }, [delay]);
        }
      `,
    },
    // Counter with functional setState
    {
      name: "Counter with functional setState",
      code: tsx`
        function Counter() {
          const [count, setCount] = useState(0);

          useEffect(() => {
            let id = setInterval(() => {
              setCount((c) => c + 1);
            }, 1000);
            return () => clearInterval(id);
          }, []);

          return <h1>{count}</h1>;
        }
      `,
    },
    // Counter with local function using setState
    {
      name: "Counter with local function using setState",
      code: tsx`
        function Counter() {
          const [count, setCount] = useState(0);

          function tick() {
            setCount((c) => c + 1);
          }

          useEffect(() => {
            let id = setInterval(() => {
              tick();
            }, 1000);
            return () => clearInterval(id);
          }, []);

          return <h1>{count}</h1>;
        }
      `,
    },
    // Counter with reducer
    {
      name: "Counter with reducer",
      code: tsx`
        function Counter() {
          const [count, dispatch] = useReducer((state: number) => state + 1, 0);

          useEffect(() => {
            let id = setInterval(() => {
              dispatch("inc");
            }, 1000);
            return () => clearInterval(id);
          }, []);

          return <h1>{count}</h1>;
        }
      `,
    },
    // Async fetch with cleanup flag
    {
      name: "async fetch with cleanup flag",
      code: tsx`
        function App({ query }: { query: string }) {
          const [state, setState] = useState<unknown>(null);
          useEffect(() => {
            let ignore = false;
            fetchSomething();
            async function fetchSomething() {
              const result = await fetch(
                "http://example.com/api?q=" + query
              ).then((r) => r.json());
              if (!ignore) setState(result);
            }
            return () => {
              ignore = true;
            };
          }, [query]);
          return <>{JSON.stringify(state)}</>;
        }
      `,
    },
    // Self-referential callback
    {
      name: "self-referential callback",
      code: tsx`
        function Example() {
          const foo = useCallback(() => {
            foo();
          }, []);
          return null;
        }
      `,
    },
    // Conditional self-referential callback
    {
      name: "conditional self-referential callback",
      code: tsx`
        function Example({ prop }: { prop: boolean }) {
          const foo = useCallback(() => {
            if (prop) {
              foo();
            }
          }, [prop]);
          return null;
        }
      `,
    },
    // Resize handler with local function
    {
      name: "resize handler with local function",
      code: tsx`
        function Hello() {
          const [, setState] = useState(0);
          useEffect(() => {
            const handleResize = () => setState(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
          });
          return null;
        }
      `,
    },
    // Arguments keyword in arrow function (ignored)
    {
      name: "arguments keyword in arrow function is ignored",
      code: tsx`
        function Example() {
          useEffect(() => {
            arguments;
          }, []);
          return null;
        }
      `,
    },
    // forwardRef with useImperativeHandle
    {
      name: "forwardRef with useImperativeHandle",
      code: tsx`
        const MyComponent = forwardRef((props: { hello: string }, ref) => {
          useImperativeHandle(ref, () => ({
            focus() {
              alert(props.hello);
            },
          }));
          return null;
        });
      `,
    },
    // forwardRef with useImperativeHandle and deps
    {
      name: "forwardRef with useImperativeHandle and deps",
      code: tsx`
        const MyComponent = forwardRef((props: { hello: string }, ref) => {
          useImperativeHandle(
            ref,
            () => ({
              focus() {
                alert(props.hello);
              },
            }),
            [props.hello]
          );
          return null;
        });
      `,
    },
    // Object mutation is allowed
    {
      name: "object property mutation is allowed",
      code: tsx`
        function MyComponent() {
          let obj = { foo: false };
          useEffect(() => {
            obj.foo = true;
          }, [obj]);
          return null;
        }
      `,
    },
    // Nested member expression mutation
    {
      name: "nested member expression mutation is allowed",
      code: tsx`
        function MyComponent() {
          let foo = { bar: { baz: 42 } };
          useEffect(() => {
            foo.bar.baz = 43;
          }, [foo.bar]);
          return null;
        }
      `,
    },
    // useMemo with constant primitive
    {
      name: "useMemo with constant primitive is fine",
      code: tsx`
        function useFoo() {
          const foo = "hi!";
          return useMemo(() => foo, [foo]);
        }
      `,
    },
    // useMemo with destructured constant
    {
      name: "useMemo with destructured constant is fine",
      code: tsx`
        function useFoo() {
          let { foo } = { foo: 1 };
          return useMemo(() => foo, [foo]);
        }
      `,
    },
    // useMemo with array destructured constant
    {
      name: "useMemo with array destructured constant is fine",
      code: tsx`
        function useFoo() {
          let [foo] = [1];
          return useMemo(() => foo, [foo]);
        }
      `,
    },
    // useMemo with shadowed constant
    {
      name: "useMemo with shadowed constant is fine",
      code: tsx`
        function useFoo() {
          const foo = "fine";
          if (true) {
            const foo = {};
          }
          return useMemo(() => foo, [foo]);
        }
      `,
    },
    // Ternary with constant
    {
      name: "ternary with constant is fine",
      code: tsx`
        function MyComponent() {
          const foo = true ? "fine" : "also fine";
          return useMemo(() => foo, [foo]);
        }
      `,
    },
    // undefined as deps (behaves like no deps)
    {
      name: "undefined as deps argument",
      code: tsx`
        function MyComponent() {
          useEffect(() => {
            console.log("banana banana banana");
          }, undefined);
          return null;
        }
      `,
    },
    // Custom hook that matches additionalHooks
    {
      name: "custom hook matching additionalHooks pattern",
      code: tsx`
        function MyComponent({ foo }: { foo: string }) {
          useCustomEffect(() => {
            console.log(foo);
          }, [foo]);
          return null;
        }
      `,
      options: [{ additionalHooks: "useCustomEffect" }],
    },
    // Hook with additionalHooks but different hook doesn't need to specify
    {
      name: "non-matching hook doesn't need additionalHooks deps",
      code: tsx`
        function MyComponent({ foo }: { foo: string }) {
          useOtherEffect(() => {
            console.log(foo);
          }, []);
          return null;
        }
      `,
      options: [{ additionalHooks: "useCustomEffect" }],
    },
  ],
});

// Task 6.3: additionalHooks option tests
ruleTester.run(`${RULE_NAME} (additionalHooks)`, rule, {
  invalid: [
    // Matching custom hook with missing deps
    {
      name: "matching custom hook reports missing deps",
      code: tsx`
        function MyComponent({ a }) {
          useSpecialEffect(() => {
            console.log(a);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'a'", hookName: "useSpecialEffect" },
        },
      ],
      options: [{ additionalHooks: "useSpecialEffect" }],
      output: tsx`
        function MyComponent({ a }) {
          useSpecialEffect(() => {
            console.log(a);
          }, [a]);
          return null;
        }
      `,
    },
    // Regex pattern matching with missing deps
    {
      name: "regex-matched custom hook reports missing deps",
      code: tsx`
        function MyComponent({ value }) {
          useCustomMemo(() => {
            return value * 2;
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'value'", hookName: "useCustomMemo" },
        },
      ],
      options: [{ additionalHooks: "useCustom(Effect|Memo)" }],
      output: tsx`
        function MyComponent({ value }) {
          useCustomMemo(() => {
            return value * 2;
          }, [value]);
          return null;
        }
      `,
    },
  ],
  valid: [
    // Non-matching custom hook is not checked
    {
      name: "non-matching custom hook is not checked for deps",
      code: tsx`
        function MyComponent({ a }) {
          useMyCustomHook(() => {
            console.log(a);
          }, []);
          return null;
        }
      `,
      options: [{ additionalHooks: "useSpecialEffect" }],
    },
    // Matching custom hook with correct deps
    {
      name: "matching custom hook with all deps present",
      code: tsx`
        function MyComponent({ a }) {
          useSpecialEffect(() => {
            console.log(a);
          }, [a]);
          return null;
        }
      `,
      options: [{ additionalHooks: "useSpecialEffect" }],
    },
    // Regex pattern matching
    {
      name: "regex pattern matches multiple custom hooks",
      code: tsx`
        function MyComponent({ a }) {
          useCustomEffect(() => {
            console.log(a);
          }, [a]);
          return null;
        }
      `,
      options: [{ additionalHooks: "useCustom(Effect|Memo)" }],
    },
  ],
});

// Task 6.4: Autofix test cases
ruleTester.run(`${RULE_NAME} (autofix)`, rule, {
  invalid: [
    // Fix adds missing deps sorted alphabetically
    {
      name: "autofix adds missing deps in sorted order",
      code: tsx`
        function MyComponent({ z, a, m }) {
          useEffect(() => {
            console.log(z, a, m);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'a', 'm', 'z'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ z, a, m }) {
          useEffect(() => {
            console.log(z, a, m);
          }, [a, m, z]);
          return null;
        }
      `,
    },
    // Fix removes unnecessary deps
    {
      name: "autofix removes unnecessary deps",
      code: tsx`
        function MyComponent({ a }) {
          useEffect(() => {
            console.log(a);
          }, [a, b, c]);
          return null;
        }
      `,
      errors: [
        {
          messageId: "unnecessaryDeps",
          data: { deps: "'b', 'c'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ a }) {
          useEffect(() => {
            console.log(a);
          }, [a]);
          return null;
        }
      `,
    },
    // Combined fix: adds missing and removes unnecessary in one pass
    {
      name: "autofix handles combined missing and unnecessary deps",
      code: tsx`
        function MyComponent({ a, b, c }) {
          useEffect(() => {
            console.log(a, c);
          }, [a, b]);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'c'", hookName: "useEffect" },
        },
        {
          messageId: "unnecessaryDeps",
          data: { deps: "'b'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ a, b, c }) {
          useEffect(() => {
            console.log(a, c);
          }, [a, c]);
          return null;
        }
      `,
    },
    // Fix preserves existing deps and sorts all together
    {
      name: "autofix preserves existing deps and sorts all alphabetically",
      code: tsx`
        function MyComponent({ x, a, z }) {
          useEffect(() => {
            console.log(x, a, z);
          }, [x]);
          return null;
        }
      `,
      errors: [
        {
          messageId: "missingDeps",
          data: { deps: "'a', 'z'", hookName: "useEffect" },
        },
      ],
      output: tsx`
        function MyComponent({ x, a, z }) {
          useEffect(() => {
            console.log(x, a, z);
          }, [a, x, z]);
          return null;
        }
      `,
    },
    // No autofix for non-literal deps
    {
      name: "no autofix for non-literal dependency array",
      code: tsx`
        function MyComponent({ a }) {
          const deps = [a];
          useEffect(() => {
            console.log(a);
          }, deps);
          return null;
        }
      `,
      errors: [
        {
          messageId: "nonLiteralDeps",
          data: { hookName: "useEffect" },
        },
      ],
    },
  ],
  valid: [
    // Issue #1529: whole object/array declared as dep should cover member access paths
    {
      name: "array declared as dep covers array method access (array.map)",
      code: tsx`
        function Component() {
          const number = 5;
          const array = useMemo(() => [number], [number]);
          useEffect(() => {
            console.log(array.map((x) => x * 2));
          }, [array]);
          return null;
        }
      `,
    },
    {
      name: "object declared as dep covers optional chained property access (object.a?.toString)",
      code: tsx`
        function Component() {
          const number = 5;
          const object = useMemo((): Record<string, number | null> => ({ a: null, b: number }), [number]);
          useEffect(() => {
            console.log(object.a?.toString());
          }, [object]);
          return null;
        }
      `,
    },
    {
      name: "whole object/array covers both member and method accesses together (issue #1529 reproduction)",
      code: tsx`
        function Component() {
          const number = 5;
          const array = useMemo(() => [number], [number]);
          const object = useMemo((): Record<string, number | null> => ({ a: null, b: number }), [number]);
          useEffect(() => {
            console.log("Array:", array.map((x) => x * 2));
            console.log("Object:", object.a?.toString());
          }, [array, object]);
          return null;
        }
      `,
    },
    {
      name: "parent prop dep covers deeply nested member expression (config.settings.theme)",
      code: tsx`
        function Component({ config }) {
          useEffect(() => {
            console.log(config.settings.theme);
          }, [config]);
          return null;
        }
      `,
    },
    {
      name: "parent prop dep covers multiple member expressions on same object",
      code: tsx`
        function Component({ data }) {
          useEffect(() => {
            console.log(data.firstName, data.lastName);
          }, [data]);
          return null;
        }
      `,
    },
    {
      name: "partial ancestor dep covers deeper member expression (foo.bar covers foo.bar.baz)",
      code: tsx`
        function Component({ foo }) {
          useEffect(() => {
            console.log(foo.bar.baz);
          }, [foo.bar]);
          return null;
        }
      `,
    },
    {
      name: "object dep covers optional chained access at root (user?.profile?.name)",
      code: tsx`
        function Component({ user }) {
          useEffect(() => {
            console.log(user?.profile?.name);
          }, [user]);
          return null;
        }
      `,
    },
    {
      name: "object dep covers mixed dot and optional-chain access",
      code: tsx`
        function Component({ settings }) {
          useEffect(() => {
            console.log(settings.theme?.primary, settings.locale);
          }, [settings]);
          return null;
        }
      `,
    },
  ],
});
