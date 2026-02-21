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
    // Additional test cases from ESLintRulesOfHooks-test.js
    {
      name: "hook inside a nested callback (useEffect callback)",
      code: tsx`
        function ComponentWithHookInsideCallback() {
          useEffect(() => {
            useHookInsideCallback();
          });
        }
      `,
      errors: [{ messageId: "nestedHook", data: { name: "useHookInsideCallback" } }],
    },
    {
      name: "hook inside a named nested function",
      code: tsx`
        function ComponentWithHookInsideCallback() {
          function handleClick() {
            useState();
          }
        }
      `,
      errors: [{ messageId: "nestedHook", data: { name: "useState" } }],
    },
    {
      name: "hook inside do-while loop condition",
      code: tsx`
        function ComponentWithHookInsideLoop() {
          do {
            foo();
          } while (useHookInsideLoop());
        }
      `,
      errors: [{ messageId: "loopHook", data: { name: "useHookInsideLoop" } }],
    },
    {
      name: "hook inside a loop with continue",
      code: tsx`
        function useHookInLoops() {
          while (a) {
            useHook1();
            if (b) continue;
            useHook2();
          }
        }
      `,
      errors: [
        { messageId: "loopHook", data: { name: "useHook1" } },
        { messageId: "loopHook", data: { name: "useHook2" } },
      ],
    },
    {
      name: "hook inside labeled block with conditional break",
      code: tsx`
        function useLabeledBlock() {
          label: {
            if (a) break label;
            useHook();
          }
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useHook" } }],
    },
    {
      name: "hook inside try block (non-use hook)",
      code: tsx`
        function useHook() {
          try {
            f();
            useState();
          } catch {}
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useState" } }],
    },
    {
      name: "hooks in logical assignment expressions",
      code: tsx`
        function useHook({ bar }) {
          let foo1 = bar && useState();
          let foo2 = bar || useState();
          let foo3 = bar ?? useState();
        }
      `,
      errors: [
        { messageId: "conditionalHook", data: { name: "useState" } },
        { messageId: "conditionalHook", data: { name: "useState" } },
        { messageId: "conditionalHook", data: { name: "useState" } },
      ],
    },
    {
      name: "hook in ternary at top level of component",
      code: tsx`
        function ComponentWithTernaryHook() {
          cond ? useTernaryHook() : null;
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useTernaryHook" } }],
    },
    {
      name: "hook in nested function returning component",
      code: tsx`
        function createComponent() {
          return function ComponentWithConditionalHook() {
            if (cond) {
              useConditionalHook();
            }
          }
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useConditionalHook" } }],
    },
    {
      name: "hook in nested hook function",
      code: tsx`
        function createHook() {
          return function useHookWithConditionalHook() {
            if (cond) {
              useConditionalHook();
            }
          }
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useConditionalHook" } }],
    },
    {
      name: "hook with early return before it",
      code: tsx`
        function useHook() {
          if (a) return;
          useState();
        }
      `,
      errors: [{ messageId: "afterEarlyReturn", data: { name: "useState" } }],
    },
    {
      name: "hook after early return with else branch",
      code: tsx`
        function useHook() {
          if (a) return;
          if (b) {
            console.log('true');
          } else {
            console.log('false');
          }
          useState();
        }
      `,
      errors: [{ messageId: "afterEarlyReturn", data: { name: "useState" } }],
    },
    {
      name: "hook in regular function starting with use but not a hook",
      code: tsx`
        function normalFunctionWithHook() {
          useHookInsideNormalFunction();
        }
      `,
      errors: [{
        messageId: "invalidContext",
        data: { name: "useHookInsideNormalFunction", funcName: "normalFunctionWithHook" },
      }],
    },
    {
      name: "hook in function with underscore prefix",
      code: tsx`
        function _normalFunctionWithHook() {
          useHookInsideNormalFunction();
        }
        function _useNotAHook() {
          useHookInsideNormalFunction();
        }
      `,
      errors: [
        {
          messageId: "invalidContext",
          data: { name: "useHookInsideNormalFunction", funcName: "_normalFunctionWithHook" },
        },
        { messageId: "invalidContext", data: { name: "useHookInsideNormalFunction", funcName: "_useNotAHook" } },
      ],
    },
    {
      name: "hook in conditional regular function",
      code: tsx`
        function normalFunctionWithConditionalHook() {
          if (cond) {
            useHookInsideNormalFunction();
          }
        }
      `,
      errors: [{
        messageId: "invalidContext",
        data: { name: "useHookInsideNormalFunction", funcName: "normalFunctionWithConditionalHook" },
      }],
    },
    {
      name: "multiple hooks in loops",
      code: tsx`
        function useHookInLoops() {
          while (a) {
            useHook1();
            if (b) return;
            useHook2();
          }
          while (c) {
            useHook3();
            if (d) return;
            useHook4();
          }
        }
      `,
      errors: [
        { messageId: "loopHook", data: { name: "useHook1" } },
        { messageId: "loopHook", data: { name: "useHook2" } },
        { messageId: "loopHook", data: { name: "useHook3" } },
        { messageId: "loopHook", data: { name: "useHook4" } },
      ],
    },
    {
      name: "hooks in do-while loops with multiple hooks",
      code: tsx`
        function useHookInLoops() {
          do {
            useHook1();
            if (a) return;
            useHook2();
          } while (b);
          do {
            useHook3();
            if (c) return;
            useHook4();
          } while (d)
        }
      `,
      errors: [
        { messageId: "loopHook", data: { name: "useHook1" } },
        { messageId: "loopHook", data: { name: "useHook2" } },
        { messageId: "loopHook", data: { name: "useHook3" } },
        { messageId: "loopHook", data: { name: "useHook4" } },
      ],
    },
    {
      name: "hook in various non-component function expressions",
      code: tsx`
        function a() { useState(); }
        const whatever = function b() { useState(); };
        const c = () => { useState(); };
        let d = () => useState();
        e = () => { useState(); };
        ({f: () => { useState(); }});
        ({g() { useState(); }});
        const {j = () => { useState(); }} = {};
        ({k = () => { useState(); }} = {});
      `,
      errors: [
        { messageId: "invalidContext", data: { name: "useState", funcName: "a" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "b" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "c" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "d" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "e" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "f" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "g" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "j" } },
        { messageId: "invalidContext", data: { name: "useState", funcName: "k" } },
      ],
    },
    // Top level hooks
    {
      name: "hook at top level - Hook.useState",
      code: tsx`
        Hook.useState();
        Hook._useState();
        Hook.use42();
        Hook.useHook();
        Hook.use_hook();
      `,
      errors: [
        { messageId: "topLevelHook", data: { name: "useState" } },
        { messageId: "topLevelHook", data: { name: "use42" } },
        { messageId: "topLevelHook", data: { name: "useHook" } },
      ],
    },
    {
      name: "multiple hooks at top level",
      code: tsx`
        useState();
        if (foo) {
          const foo = React.useCallback(() => {});
        }
        useCustomHook();
      `,
      errors: [
        { messageId: "topLevelHook", data: { name: "useState" } },
        { messageId: "topLevelHook", data: { name: "useCallback" } },
        { messageId: "topLevelHook", data: { name: "useCustomHook" } },
      ],
    },
    {
      name: "use at top level",
      code: tsx`
        const text = use(promise);
        function App() {
          return <Text text={text} />
        }
      `,
      errors: [{ messageId: "topLevelHook", data: { name: "use" } }],
    },
    // Async hooks
    {
      name: "hook in async function component",
      code: tsx`
        async function AsyncComponent() {
          useState();
        }
      `,
      errors: [{ messageId: "asyncHook", data: { name: "useState" } }],
    },
    {
      name: "hook in async hook",
      code: tsx`
        async function useAsyncHook() {
          useState();
        }
      `,
      errors: [{ messageId: "asyncHook", data: { name: "useState" } }],
    },
    {
      name: "useId in async function component",
      code: tsx`
        async function Page() {
          useId();
          React.useId();
        }
      `,
      errors: [
        { messageId: "asyncHook", data: { name: "useId" } },
        { messageId: "asyncHook", data: { name: "useId" } },
      ],
    },
    {
      name: "useId in async hook",
      code: tsx`
        async function useAsyncHook() {
          useId();
        }
      `,
      errors: [{ messageId: "asyncHook", data: { name: "useId" } }],
    },
    {
      name: "use in async function component",
      code: tsx`
        async function AsyncComponent() {
          use();
        }
      `,
      errors: [{ messageId: "asyncHook", data: { name: "use" } }],
    },
    {
      name: "useId in non-hook async function",
      code: tsx`
        async function notAHook() {
          useId();
        }
      `,
      errors: [{ messageId: "invalidContext", data: { name: "useId", funcName: "notAHook" } }],
    },
    // Class component hooks
    {
      name: "hook in class method",
      code: tsx`
        class C {
          m() {
            This.useHook();
            Super.useHook();
          }
        }
      `,
      errors: [
        { messageId: "classHook", data: { name: "useHook" } },
        { messageId: "classHook", data: { name: "useHook" } },
      ],
    },
    {
      name: "hook in class component render method",
      code: tsx`
        class Foo extends Component {
          render() {
            if (cond) {
              FooStore.useFeatureFlag();
            }
          }
        }
      `,
      errors: [{ messageId: "classHook", data: { name: "useFeatureFlag" } }],
    },
    {
      name: "React.useState in class component",
      code: tsx`
        class ClassComponentWithHook extends React.Component {
          render() {
            React.useState();
          }
        }
      `,
      errors: [{ messageId: "classHook", data: { name: "useState" } }],
    },
    {
      name: "hook in class with arrow property",
      code: tsx`
        (class {useHook = () => { useState(); }});
      `,
      errors: [{ messageId: "classHook", data: { name: "useState" } }],
    },
    {
      name: "hook in class method shorthand",
      code: tsx`
        (class {useHook() { useState(); }});
      `,
      errors: [{ messageId: "classHook", data: { name: "useState" } }],
    },
    {
      name: "hook in class with arrow property (non-use name)",
      code: tsx`
        (class {h = () => { useState(); }});
      `,
      errors: [{ messageId: "classHook", data: { name: "useState" } }],
    },
    {
      name: "hook in class method (non-use name)",
      code: tsx`
        (class {i() { useState(); }});
      `,
      errors: [{ messageId: "classHook", data: { name: "useState" } }],
    },
    {
      name: "use in class method",
      code: tsx`
        class C {
          m() {
            use(promise);
          }
        }
      `,
      errors: [{ messageId: "classHook", data: { name: "use" } }],
    },
    // use() in try/catch
    {
      name: "use in try block",
      code: tsx`
        function App({p1, p2}) {
          try {
            use(p1);
          } catch (error) {
            console.error(error);
          }
          use(p2);
          return <div>App</div>;
        }
      `,
      errors: [{ messageId: "useInTryCatch", data: { name: "use" } }],
    },
    {
      name: "use in catch block",
      code: tsx`
        function App({p1, p2}) {
          try {
            doSomething();
          } catch {
            use(p1);
          }
          use(p2);
          return <div>App</div>;
        }
      `,
      errors: [{ messageId: "useInTryCatch", data: { name: "use" } }],
    },
    // Additional edge cases
    {
      name: "hook in component returned from function",
      code: tsx`
        function createComponent() {
          return function ComponentWithConditionalHook() {
            if (cond) {
              useConditionalHook();
            }
          }
        }
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useConditionalHook" } }],
    },
    {
      name: "hook in callback - forwardRef with condition",
      code: tsx`
        const FancyButton = React.forwardRef((props, ref) => {
          if (props.fancy) {
            useCustomHook();
          }
          return <button ref={ref}>{props.children}</button>;
        });
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useCustomHook" } }],
    },
    {
      name: "hook in callback - forwardRef with condition (function keyword)",
      code: tsx`
        const FancyButton = forwardRef(function(props, ref) {
          if (props.fancy) {
            useCustomHook();
          }
          return <button ref={ref}>{props.children}</button>;
        });
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useCustomHook" } }],
    },
    {
      name: "hook in callback - memo with condition",
      code: tsx`
        const MemoizedButton = memo(function(props) {
          if (props.fancy) {
            useCustomHook();
          }
          return <button>{props.children}</button>;
        });
      `,
      errors: [{ messageId: "conditionalHook", data: { name: "useCustomHook" } }],
    },
    {
      name: "hook in named callback function",
      code: tsx`
        React.unknownFunction(function notAComponent(foo, bar) {
          useProbablyAHook(bar)
        });
      `,
      errors: [{ messageId: "nestedHook", data: { name: "useProbablyAHook" } }],
    },
    {
      name: "use in non-component function",
      code: tsx`
        function notAComponent() {
          use(promise);
        }
      `,
      errors: [{ messageId: "invalidContext", data: { name: "use", funcName: "notAComponent" } }],
    },
    {
      name: "hook in nested function used as callback",
      code: tsx`
        function renderItem() {
          useState();
        }
        function List(props) {
          return props.items.map(renderItem);
        }
      `,
      errors: [{ messageId: "invalidContext", data: { name: "useState", funcName: "renderItem" } }],
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
    // Additional valid cases from ESLintRulesOfHooks-test.js
    {
      name: "hook in component returning component",
      code: tsx`
        function createComponentWithHook() {
          return function ComponentWithHook() {
            useHook();
          };
        }
      `,
    },
    {
      name: "hook in hook returning hook",
      code: tsx`
        function createHook() {
          return function useHookWithHook() {
            useHook();
          }
        }
      `,
    },
    {
      name: "multiple hook forms",
      code: tsx`
        function useHook() { useState(); }
        const whatever = function useHook() { useState(); };
        const useHook1 = () => { useState(); };
        let useHook2 = () => useState();
        useHook2 = () => { useState(); };
        ({useHook: () => { useState(); }});
        ({useHook() { useState(); }});
        const {useHook3 = () => { useState(); }} = {};
        ({useHook = () => { useState(); }} = {});
        Namespace.useHook = () => { useState(); };
      `,
    },
    {
      name: "multiple hooks in custom hook",
      code: tsx`
        function useHook() {
          useHook1();
          useHook2();
        }
      `,
    },
    {
      name: "hooks in returned custom hook",
      code: tsx`
        function createHook() {
          return function useHook() {
            useHook1();
            useHook2();
          };
        }
      `,
    },
    {
      name: "hook in logical expression return",
      code: tsx`
        function useHook() {
          useState() && a;
        }
      `,
    },
    {
      name: "hooks in arithmetic return",
      code: tsx`
        function useHook() {
          return useHook1() + useHook2();
        }
      `,
    },
    {
      name: "hook as function argument",
      code: tsx`
        function useHook() {
          return useHook1(useHook2());
        }
      `,
    },
    {
      name: "hook in forwardRef arrow function",
      code: tsx`
        const FancyButton = React.forwardRef((props, ref) => {
          useHook();
          return <button {...props} ref={ref} />
        });
      `,
    },
    {
      name: "hook in forwardRef anonymous function",
      code: tsx`
        const FancyButton = React.forwardRef(function (props, ref) {
          useHook();
          return <button {...props} ref={ref} />
        });
      `,
    },
    {
      name: "hook in forwardRef (bare import)",
      code: tsx`
        const FancyButton = forwardRef(function (props, ref) {
          useHook();
          return <button {...props} ref={ref} />
        });
      `,
    },
    {
      name: "hook in memo arrow function",
      code: tsx`
        const MemoizedFunction = React.memo(props => {
          useHook();
          return <button {...props} />
        });
      `,
    },
    {
      name: "hook in memo anonymous function",
      code: tsx`
        const MemoizedFunction = memo(function (props) {
          useHook();
          return <button {...props} />
        });
      `,
    },
    {
      name: "this.useHook in class is allowed",
      code: tsx`
        class C {
          m() {
            this.useHook();
            super.useHook();
          }
        }
      `,
    },
    {
      name: "jest lifecycle hooks are allowed",
      code: tsx`
        jest.useFakeTimers();
        beforeEach(() => {
          jest.useRealTimers();
        })
      `,
    },
    {
      name: "non-hook use* functions are allowed",
      code: tsx`
        fooState();
        _use();
        _useState();
        use_hook();
        jest.useFakeTimer()
      `,
    },
    {
      name: "regression test for internal code pattern",
      code: tsx`
        function makeListener(instance) {
          each(pixelsWithInferredEvents, pixel => {
            if (useExtendedSelector(pixel.id) && extendedButton) {
              foo();
            }
          });
        }
      `,
    },
    {
      name: "use-prefixed functions in unnamed callbacks are not hooks",
      code: tsx`
        React.unknownFunction((foo, bar) => {
          if (foo) {
            useNotAHook(bar)
          }
        });
      `,
    },
    {
      name: "use-prefixed functions in unnamed function args are not hooks",
      code: tsx`
        unknownFunction(function(foo, bar) {
          if (foo) {
            useNotAHook(bar)
          }
        });
      `,
    },
    {
      name: "ternary expression before hook is valid",
      code: tsx`
        function RegressionTest() {
          const foo = cond ? a : b;
          useState();
        }
      `,
    },
    {
      name: "throw before hook is valid",
      code: tsx`
        function RegressionTest() {
          if (page == null) {
            throw new Error('oh no!');
          }
          useState();
        }
      `,
    },
    {
      name: "loop that does not affect hook order is valid",
      code: tsx`
        function RegressionTest() {
          const res = [];
          const additionalCond = true;
          for (let i = 0; i !== 10 && additionalCond; ++i ) {
            res.push(i);
          }
          React.useLayoutEffect(() => {});
        }
      `,
    },
    {
      name: "use hook at top level of component",
      code: tsx`
        function App() {
          const text = use(Promise.resolve('A'));
          return <Text text={text} />
        }
      `,
    },
    {
      name: "use hook in conditional (allowed for use)",
      code: tsx`
        import * as React from 'react';
        function App() {
          if (shouldShowText) {
            const text = use(query);
            const data = React.use(thing);
            const data2 = react.use(thing2);
            return <Text text={text} />
          }
          return <Text text={shouldFetchBackupText ? use(backupQuery) : "Nothing to see here"} />
        }
      `,
    },
    {
      name: "use hook in for-of loop (allowed for use)",
      code: tsx`
        function App() {
          let data = [];
          for (const query of queries) {
            const text = use(item);
            data.push(text);
          }
          return <Child data={data} />
        }
      `,
    },
    {
      name: "use hook in callback (allowed for use)",
      code: tsx`
        function App() {
          const data = someCallback((x) => use(x));
          return <Child data={data} />
        }
      `,
    },
    {
      name: "loop after hook is valid",
      code: tsx`
        const Component = () => {
          const [state, setState] = useState(0);
          for (let i = 0; i < 10; i++) {
            console.log(i);
          }
          return <div></div>;
        };
      `,
    },
    {
      name: "hook before for-in loop with condition inside",
      code: tsx`
        function App(props) {
          const someObject = {propA: true};
          for (const propName in someObject) {
            if (propName === true) {
            } else {
            }
          }
          const [myState, setMyState] = useState(null);
        }
      `,
    },
    {
      name: "hook in unreachable code (after return)",
      code: tsx`
        function useUnreachable() {
          return;
          useHook();
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
