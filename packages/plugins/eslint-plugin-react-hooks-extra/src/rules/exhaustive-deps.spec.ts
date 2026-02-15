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
  valid: [],
});


