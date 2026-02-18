import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./rules-of-hooks";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Hooks inside if/else/switch
    {
      name: "hook inside an if statement",
      code: tsx`
        function MyComponent() {
          if (condition) {
            useState(0);
          }
          return null;
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside an else branch",
      code: tsx`
        function MyComponent() {
          if (condition) {
            // nothing
          } else {
            useState(0);
          }
          return null;
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a switch case",
      code: tsx`
        function MyComponent() {
          switch (type) {
            case 'a':
              useState(0);
              break;
          }
          return null;
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a ternary expression",
      code: tsx`
        function MyComponent() {
          const val = condition ? useState(0) : null;
          return null;
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a logical expression (&&)",
      code: tsx`
        function MyComponent() {
          condition && useState(0);
          return null;
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useState" } }],
    },
    // Hooks inside for/while/do-while
    {
      name: "hook inside a for loop",
      code: tsx`
        function MyComponent() {
          for (let i = 0; i < 10; i++) {
            useState(0);
          }
          return null;
        }
      `,
      errors: [{ messageId: "loopHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a for-in loop",
      code: tsx`
        function MyComponent() {
          for (const key in obj) {
            useState(0);
          }
          return null;
        }
      `,
      errors: [{ messageId: "loopHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a for-of loop",
      code: tsx`
        function MyComponent() {
          for (const item of items) {
            useState(0);
          }
          return null;
        }
      `,
      errors: [{ messageId: "loopHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a while loop",
      code: tsx`
        function MyComponent() {
          while (condition) {
            useState(0);
          }
          return null;
        }
      `,
      errors: [{ messageId: "loopHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a do-while loop",
      code: tsx`
        function MyComponent() {
          do {
            useState(0);
          } while (condition);
          return null;
        }
      `,
      errors: [{ messageId: "loopHook", data: { name: "useState" } }],
    },
    // Hooks after early returns
    {
      name: "hook after an early return",
      code: tsx`
        function MyComponent() {
          if (condition) {
            return null;
          }
          useState(0);
          return null;
        }
      `,
      errors: [{ messageId: "afterEarlyReturn", data: { name: "useState" } }],
    },
    // Hooks inside nested callbacks/arrow functions
    {
      name: "hook inside a nested arrow function callback",
      code: tsx`
        function MyComponent() {
          const handler = () => {
            useState(0);
          };
          return null;
        }
      `,
      errors: [{ messageId: "nestedHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside a nested function expression",
      code: tsx`
        function MyComponent() {
          const handler = function() {
            useState(0);
          };
          return null;
        }
      `,
      errors: [{ messageId: "nestedHook", data: { name: "useState" } }],
    },
    // Hooks inside async functions
    {
      name: "hook inside an async function component",
      code: tsx`
        async function MyComponent() {
          useState(0);
          return null;
        }
      `,
      errors: [{ messageId: "asyncHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside an async arrow function",
      code: tsx`
        const MyComponent = async () => {
          useState(0);
          return null;
        };
      `,
      errors: [{ messageId: "asyncHook", data: { name: "useState" } }],
    },
    // Hooks inside class methods
    {
      name: "hook inside a class method",
      code: tsx`
        class MyComponent {
          render() {
            useState(0);
            return null;
          }
        }
      `,
      errors: [{ messageId: "classHook", data: { name: "useState" } }],
    },
    // Hooks at module level
    {
      name: "hook at module level (outside any function)",
      code: tsx`
        useState(0);
      `,
      errors: [{ messageId: "topLevelHook", data: { name: "useState" } }],
    },
    {
      name: "useEffect at module level",
      code: tsx`
        useEffect(() => {}, []);
      `,
      errors: [{ messageId: "topLevelHook", data: { name: "useEffect" } }],
    },
    // use() inside try/catch
    {
      name: "use() inside a try/catch block",
      code: tsx`
        function MyComponent() {
          try {
            use(promise);
          } catch (e) {}
          return null;
        }
      `,
      errors: [{ messageId: "useInTryCatch", data: { name: "use" } }],
    },
    {
      name: "React.use() inside a try/catch block",
      code: tsx`
        function MyComponent() {
          try {
            React.use(promise);
          } catch (e) {}
          return null;
        }
      `,
      errors: [{ messageId: "useInTryCatch", data: { name: "use" } }],
    },
    // Hook in a regular (non-component, non-hook) function
    {
      name: "hook inside a regular function (not a component or hook)",
      code: tsx`
        function regularFunction() {
          useState(0);
        }
      `,
      errors: [{ messageId: "invalidContext", data: { name: "useState", funcName: "regularFunction" } }],
    },
  ],
  valid: [
    ...allValid,
    // Hooks at top level of function components
    {
      name: "hooks at top level of a function declaration component",
      code: tsx`
        function MyComponent() {
          const [count, setCount] = useState(0);
          useEffect(() => {}, []);
          return null;
        }
      `,
    },
    {
      name: "hooks at top level of an arrow function component",
      code: tsx`
        const MyComponent = () => {
          const [count, setCount] = useState(0);
          useEffect(() => {}, []);
          return null;
        };
      `,
    },
    {
      name: "hooks at top level of a const function expression component",
      code: tsx`
        const MyComponent = function() {
          const [count, setCount] = useState(0);
          useMemo(() => count * 2, [count]);
          return null;
        };
      `,
    },
    // Hooks at top level of custom hooks
    {
      name: "hooks at top level of a custom hook (function declaration)",
      code: tsx`
        function useMyHook() {
          const [value, setValue] = useState(null);
          useEffect(() => {}, []);
          return value;
        }
      `,
    },
    {
      name: "hooks at top level of a custom hook (arrow function)",
      code: tsx`
        const useMyHook = () => {
          const ref = useRef(null);
          return ref;
        };
      `,
    },
    // use() inside conditionals and loops (allowed)
    {
      name: "use() inside an if statement is allowed",
      code: tsx`
        function MyComponent() {
          if (true) {
            const data = use(promise);
          }
          return null;
        }
      `,
    },
    {
      name: "React.use() inside an if statement is allowed (member expression)",
      code: tsx`
        function MyComponent() {
          if (true) {
            const data = React.use(promise);
          }
          return null;
        }
      `,
    },
    {
      name: "use() inside a for loop is allowed",
      code: tsx`
        function MyComponent() {
          for (let i = 0; i < 10; i++) {
            const data = use(promises[i]);
          }
          return null;
        }
      `,
    },
    {
      name: "use() inside a while loop is allowed",
      code: tsx`
        function MyComponent() {
          let i = 0;
          while (i < 10) {
            const data = use(promises[i]);
            i++;
          }
          return null;
        }
      `,
    },
    {
      name: "use() inside a switch statement is allowed",
      code: tsx`
        function MyComponent() {
          switch (type) {
            case 'a':
              use(promiseA);
              break;
          }
          return null;
        }
      `,
    },
    {
      name: "use() inside a ternary expression is allowed",
      code: tsx`
        function MyComponent() {
          const data = condition ? use(promiseA) : use(promiseB);
          return null;
        }
      `,
    },
    {
      name: "use() inside logical expression is allowed",
      code: tsx`
        function MyComponent() {
          const data = condition && use(promise);
          return null;
        }
      `,
    },
    // Multiple hooks at top level
    {
      name: "multiple hooks at top level of a component",
      code: tsx`
        function MyComponent() {
          const [a, setA] = useState(0);
          const [b, setB] = useState(0);
          const ref = useRef(null);
          useEffect(() => {}, []);
          const memo = useMemo(() => a + b, [a, b]);
          const cb = useCallback(() => {}, []);
          return null;
        }
      `,
    },
    // Hooks called via member expressions (React.useEffect, etc.)
    {
      name: "React.useEffect via member expression is valid at top level",
      code: tsx`
        function MyComponent() {
          React.useState(0);
          React.useEffect(() => {}, []);
          return null;
        }
      `,
    },
  ],
});

// Task 2.3: Verify diagnostic messages include the hook name
ruleTester.run(`${RULE_NAME} (message verification)`, rule, {
  invalid: [
    {
      name: "conditionalHook message includes custom hook name 'useCustomHook'",
      code: tsx`
        function MyComponent() {
          if (cond) { useCustomHook(); }
          return null;
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useCustomHook" } }],
    },
    {
      name: "loopHook message includes hook name 'useMemo'",
      code: tsx`
        function MyComponent() {
          for (let i = 0; i < 1; i++) { useMemo(() => i, []); }
          return null;
        }
      `,
      errors: [{ messageId: "loopHook", data: { name: "useMemo" } }],
    },
    {
      name: "nestedHook message includes hook name 'useCallback'",
      code: tsx`
        function MyComponent() {
          const fn = () => { useCallback(() => {}, []); };
          return null;
        }
      `,
      errors: [{ messageId: "nestedHook", data: { name: "useCallback" } }],
    },
    {
      name: "afterEarlyReturn message includes hook name 'useReducer'",
      code: tsx`
        function MyComponent() {
          if (cond) { return null; }
          useReducer(reducer, init);
          return null;
        }
      `,
      errors: [{ messageId: "afterEarlyReturn", data: { name: "useReducer" } }],
    },
    {
      name: "asyncHook message includes hook name 'useContext'",
      code: tsx`
        async function MyComponent() {
          useContext(MyContext);
          return null;
        }
      `,
      errors: [{ messageId: "asyncHook", data: { name: "useContext" } }],
    },
    {
      name: "classHook message includes hook name 'useRef'",
      code: tsx`
        class MyClass {
          method() {
            useRef(null);
            return null;
          }
        }
      `,
      errors: [{ messageId: "classHook", data: { name: "useRef" } }],
    },
    {
      name: "topLevelHook message includes custom hook name 'useCustomHook'",
      code: tsx`
        useCustomHook();
      `,
      errors: [{ messageId: "topLevelHook", data: { name: "useCustomHook" } }],
    },
    {
      name: "useInTryCatch message includes hook name 'use'",
      code: tsx`
        function MyComponent() {
          try { use(promise); } catch (e) {}
          return null;
        }
      `,
      errors: [{ messageId: "useInTryCatch", data: { name: "use" } }],
    },
  ],
  valid: [],
});
