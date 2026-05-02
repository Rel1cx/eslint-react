import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./globals";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // -------------------------------------------------------------------------
    // Direct mutation of module-level variables in components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let renderCount = 0;
        function Component() {
          renderCount++;
          return <div>Count: {renderCount}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
    {
      code: tsx`
        let renderCount = 0;
        function Component() {
          renderCount += 1;
          return <div>Count: {renderCount}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
    {
      code: tsx`
        let renderCount = 0;
        function Component() {
          --renderCount;
          return <div>Count: {renderCount}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
    // -------------------------------------------------------------------------
    // Modifying window / globalThis properties
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component({ userId }) {
          window.currentUser = userId;
          return <div>User: {userId}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    {
      code: tsx`
        function Component({ userId }) {
          globalThis.currentUser = userId;
          return <div>User: {userId}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    {
      code: tsx`
        function Component({ title }) {
          document.title = title;
          return <div>Page: {title}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    // -------------------------------------------------------------------------
    // Mutating global arrays
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const events = [];
        function Component({ event }) {
          events.push(event);
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.sort();
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.shift();
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.pop();
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.splice(0, 1);
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.reverse();
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.unshift(1);
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.fill(0);
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          events.copyWithin(0, 1);
          return <div>Events: {events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    // -------------------------------------------------------------------------
    // Cache manipulation (global object property assignment)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const cache = {};
        function Component({ id }) {
          if (!cache[id]) {
            cache[id] = fetchData(id);
          }
          return <div>{cache[id]}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    {
      code: tsx`
        const cache = {};
        function Component({ id }) {
          cache[id] = fetchData(id);
          return <div>{cache[id]}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    // -------------------------------------------------------------------------
    // Mutations in custom hooks
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let hookCalls = 0;
        function useTracker() {
          hookCalls++;
          return hookCalls;
        }
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
    {
      code: tsx`
        const log = [];
        function useLogger(msg) {
          log.push(msg);
          return log;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const registry = {};
        function useRegister(id, value) {
          registry[id] = value;
          return registry;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    // -------------------------------------------------------------------------
    // Arrow function components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let count = 0;
        const Component = () => {
          count++;
          return <div>{count}</div>;
        };
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
    {
      code: tsx`
        const cache = {};
        const Component = ({ id }) => {
          cache[id] = id;
          return <div>{id}</div>;
        };
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    // -------------------------------------------------------------------------
    // Multiple mutations in same component
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let a = 0;
        let b = 0;
        function Component() {
          a++;
          b++;
          return <div>{a + b}</div>;
        }
      `,
      errors: [
        { messageId: "mutatingGlobal" },
        { messageId: "mutatingGlobal" },
      ],
    },
    {
      code: tsx`
        const items = [];
        function Component() {
          items.push(1);
          items.sort();
          return <div>{items.length}</div>;
        }
      `,
      errors: [
        { messageId: "mutatingGlobalArrayMethod" },
        { messageId: "mutatingGlobalArrayMethod" },
      ],
    },
    // -------------------------------------------------------------------------
    // Mutating global array directly in JSX expression
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const items = [];
        function Component() {
          return <div>{items.push(1)}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    // -------------------------------------------------------------------------
    // Mutating global object nested property
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const state = { nested: { value: 0 } };
        function Component() {
          state.nested.value = 1;
          return <div>{state.nested.value}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    // -------------------------------------------------------------------------
    // Optional chaining and type expression wrapping (should still report)
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const events = [];
        function Component() {
          events?.push(1);
          return <div>{events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        const events = [];
        function Component() {
          (events.push as Function)(1);
          return <div>{events.length}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalArrayMethod" }],
    },
    {
      code: tsx`
        function Component() {
          (window.title as any)++;
          return <div />;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    // -------------------------------------------------------------------------
    // Assignment to module-level let/const
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let moduleState = 0;
        function Component() {
          moduleState = 1;
          return <div>{moduleState}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.mutate-global-increment-op-invalid-react.js
    {
      code: tsx`
        let renderCount = 0;
        function NoHooks() {
          renderCount++;
          return <div />;
        }
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.store-property-in-global.js
    {
      code: tsx`
        let wat = {};
        function Component() {
          wat.test = 1;
          return <div>{wat.test}</div>;
        }
      `,
      errors: [{ messageId: "mutatingGlobalProperty" }],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.reassignment-to-global.js
    {
      code: tsx`
        function Component() {
          someUnknownGlobal = true;
          moduleLocal = true;
          return <div />;
        }
      `,
      errors: [
        { messageId: "mutatingGlobal" },
        { messageId: "mutatingGlobal" },
      ],
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.update-global-should-bailout.tsx
    {
      code: tsx`
        let renderCount = 0;
        function useFoo() {
          renderCount += 1;
          return renderCount;
        }
      `,
      errors: [{ messageId: "mutatingGlobal" }],
    },
  ],
  valid: [
    // -------------------------------------------------------------------------
    // Use state for counters
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [clickCount, setClickCount] = useState(0);
          const handleClick = () => {
            setClickCount(c => c + 1);
          };
          return (
            <button onClick={handleClick}>
              Clicked: {clickCount} times
            </button>
          );
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Use context for global values
    // -------------------------------------------------------------------------
    {
      code: tsx`
        import { useContext } from "react";

        function Component() {
          const user = useContext(UserContext);
          return <div>User: {user.id}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Synchronize external state with React in effects
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component({ title }) {
          useEffect(() => {
            document.title = title;
          }, [title]);
          return <div>Page: {title}</div>;
        }
      `,
    },
    {
      code: tsx`
        let renderCount = 0;
        function Component() {
          useEffect(() => {
            renderCount++;
          }, []);
          return <div>Count: {renderCount}</div>;
        }
      `,
    },
    {
      code: tsx`
        const events = [];
        function Component({ event }) {
          useEffect(() => {
            events.push(event);
          }, [event]);
          return <div>Events: {events.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        const cache = {};
        function Component({ id }) {
          useEffect(() => {
            cache[id] = fetchData(id);
          }, [id]);
          return <div>{cache[id]}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component({ title }) {
          useLayoutEffect(() => {
            document.title = title;
          }, [title]);
          return <div>Page: {title}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component({ title }) {
          useInsertionEffect(() => {
            document.title = title;
          }, [title]);
          return <div>Page: {title}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Mutations in event handlers
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let count = 0;
        function Component() {
          return (
            <button onClick={() => { count++; }}>
              Clicked: {count} times
            </button>
          );
        }
      `,
    },
    {
      code: tsx`
        let count = 0;
        function Component() {
          const handleClick = () => {
            count++;
          };
          return <button onClick={handleClick}>Clicked: {count} times</button>;
        }
      `,
    },
    {
      code: tsx`
        const events = [];
        function Component({ event }) {
          const handleClick = () => {
            events.push(event);
          };
          return <button onClick={handleClick}>Events: {events.length}</button>;
        }
      `,
    },
    {
      code: tsx`
        const cache = {};
        function Component({ id }) {
          const handleLoad = () => {
            cache[id] = fetchData(id);
          };
          return <button onClick={handleLoad}>Load</button>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Mutations in useCallback
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let count = 0;
        function Component() {
          const handleClick = useCallback(() => {
            count++;
          }, []);
          return <button onClick={handleClick}>Clicked: {count} times</button>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Mutations on local (non-global) variables are fine
    // -------------------------------------------------------------------------
    {
      code: tsx`
        function Component() {
          let localCount = 0;
          localCount++;
          return <div>{localCount}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const items = [];
          items.push(1);
          items.sort();
          return <div>{items.length}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const cache = {};
          cache["key"] = "value";
          return <div>{cache["key"]}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Non-component/hook functions are not checked
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let count = 0;
        function notAComponent() {
          count++;
          return count;
        }
      `,
    },
    {
      code: tsx`
        const events = [];
        function notAComponent(event) {
          events.push(event);
          return events;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Reading globals is fine
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const cache = {};
        function Component({ id }) {
          const value = cache[id];
          return <div>{value}</div>;
        }
      `,
    },
    {
      code: tsx`
        let count = 0;
        function Component() {
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        const items = [];
        function Component() {
          return <div>{items.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Non-mutating array methods on globals are fine
    // -------------------------------------------------------------------------
    {
      code: tsx`
        const items = [];
        function Component() {
          const mapped = items.map(x => x * 2);
          const filtered = items.filter(x => x > 1);
          const found = items.find(x => x === 1);
          return <div>{mapped.length}</div>;
        }
      `,
    },
    // -------------------------------------------------------------------------
    // Mutations inside nested non-component functions inside components
    // -------------------------------------------------------------------------
    {
      code: tsx`
        let count = 0;
        function Component() {
          const helper = () => {
            count++;
          };
          return <button onClick={helper}>Click</button>;
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-global-reassignment-in-effect.js
    {
      code: tsx`
        let someGlobal = false;
        function Component() {
          const [state, setState] = useState(someGlobal);
          useEffect(() => {
            someGlobal = true;
          }, []);
          useEffect(() => {
            setState(someGlobal);
          }, [someGlobal]);
          return <div>{String(state)}</div>;
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-global-mutation-in-effect-indirect.js
    {
      code: tsx`
        let someGlobal = {};
        function Component() {
          const [state, setState] = useState(someGlobal);
          const setGlobal = () => {
            someGlobal.value = true;
          };
          useEffect(() => {
            setGlobal();
          }, []);
          useEffect(() => {
            setState(someGlobal.value);
          }, [someGlobal]);
          return <div>{String(state)}</div>;
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-global-mutation-unused-usecallback.js
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
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-modify-global-in-callback-jsx.js
    {
      code: tsx`
        const someGlobal = {value: 0};
        function Component({value}) {
          const onClick = () => {
            someGlobal.value = value;
          };
          return useMemo(() => {
            return <div onClick={onClick}>{someGlobal.value}</div>;
          }, []);
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-reassignment-to-global-function-jsx-prop.js
    {
      code: tsx`
        function Component() {
          const onClick = () => {
            someUnknownGlobal = true;
            moduleLocal = true;
          };
          return <div onClick={onClick} />;
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.not-useEffect-external-mutate.js
    {
      code: tsx`
        let x = {a: 42};
        function Component(props) {
          foo(() => {
            x.a = 10;
            x.a = 20;
          });
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler error.mutable-range-shared-inner-outer-function.js
    {
      code: tsx`
        let cond = true;
        function Component(props) {
          let a;
          let b;
          const f = () => {
            if (cond) {
              a = {};
              b = [];
            } else {
              a = {};
              b = [];
            }
            a.property = true;
            b.push(false);
          };
          return <div onClick={f} />;
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-mutate-global-in-effect-fixpoint.js
    {
      code: tsx`
        let someGlobal = {value: null};
        function Component() {
          const [state, setState] = useState(someGlobal);
          let x = someGlobal;
          while (x == null) {
            x = someGlobal;
          }
          const y = x;
          useEffect(() => {
            y.value = 'hello';
          });
          useEffect(() => {
            setState(someGlobal.value);
          }, [someGlobal]);
          return <div>{String(state)}</div>;
        }
      `,
    },
    // Derived from react/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler allow-global-mutation-in-effect-indirect-usecallback.js
    {
      code: tsx`
        let someGlobal = {};
        function Component() {
          const [state, setState] = useState(someGlobal);
          const setGlobal = useCallback(() => {
            someGlobal.value = true;
          }, []);
          useEffect(() => {
            setGlobal();
          }, []);
          useEffect(() => {
            setState(someGlobal.value);
          }, [someGlobal]);
          return <div>{String(state)}</div>;
        }
      `,
    },
  ],
});
