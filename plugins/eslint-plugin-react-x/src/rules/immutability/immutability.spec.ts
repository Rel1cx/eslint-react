import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./immutability";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Mutating array method.
    {
      code: tsx`
        function Component() {
          const items = [];
          const fn = () => {
            items.push(1);
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "items" }, messageId: "mutates" },
        { data: { name: "items" }, messageId: "default" },
      ],
    },
    // Plain reassignment (`=`) of a captured identifier.
    {
      code: tsx`
        function Component() {
          let message = "hello";
          const fn = () => {
            message = "world";
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "message" }, messageId: "mutates" },
        { data: { name: "message" }, messageId: "default" },
      ],
    },
    // Reassignment via UpdateExpression.
    {
      code: tsx`
        function Component() {
          let count = 0;
          const fn = () => {
            count++;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "count" }, messageId: "mutates" },
        { data: { name: "count" }, messageId: "default" },
      ],
    },
    // Mutating assignment operator (`+=`) on a captured variable.
    {
      code: tsx`
        function Component() {
          let count = 0;
          const fn = () => {
            count += 1;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "count" }, messageId: "mutates" },
        { data: { name: "count" }, messageId: "default" },
      ],
    },
    // Mutation via property assignment on a captured object.
    {
      code: tsx`
        function Component() {
          const state = { count: 0 };
          const fn = () => {
            state.count = 1;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "state" }, messageId: "mutates" },
        { data: { name: "state" }, messageId: "default" },
      ],
    },
    // UpdateExpression on a member expression of a captured object.
    {
      code: tsx`
        function Component() {
          const state = { count: 0 };
          const fn = () => {
            state.count++;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "state" }, messageId: "mutates" },
        { data: { name: "state" }, messageId: "default" },
      ],
    },
    // Mutation via `delete` on a captured object property.
    {
      code: tsx`
        function Component() {
          const state = { count: 0 };
          const fn = () => {
            delete state.count;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "state" }, messageId: "mutates" },
        { data: { name: "state" }, messageId: "default" },
      ],
    },
    // Assignment through a computed member resolves to the same root identifier.
    {
      code: tsx`
        function Component() {
          const items = [1, 2, 3];
          const fn = () => {
            items[0] = 4;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "items" }, messageId: "mutates" },
        { data: { name: "items" }, messageId: "default" },
      ],
    },
    // Mutation on a deeply nested property of a captured object.
    {
      code: tsx`
        function Component() {
          const state = { nested: { count: 0 } };
          const fn = () => {
            state.nested.count = 1;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "state" }, messageId: "mutates" },
        { data: { name: "state" }, messageId: "default" },
      ],
    },
    // Mutating method invoked through optional chaining.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache?.set("key", "value");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Mutation happens before the (aliased) freeze usage in source order,
    // so the "This modifies" diagnostic sorts first.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache.set("key", "value");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Inline function passed directly as a JSX prop: the freeze usage (the
    // function itself) starts before the mutation nested inside its body.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          return <Foo fn={() => cache.set("key", "value")} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "default" },
        { data: { name: "cache" }, messageId: "mutates" },
      ],
    },
    // Inline function passed directly as a hook argument.
    {
      code: tsx`
        function useFoo() {
          const cache = new Map();
          useHook(() => {
            cache.set("key", "value");
          });
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "default" },
        { data: { name: "cache" }, messageId: "mutates" },
      ],
    },
    // Named function expression passed as a hook argument.
    {
      code: tsx`
        function useFoo() {
          const cache = new Map();
          function fn() {
            cache.set("key", "value");
          }
          useEffect(fn);
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Hook returning its own parameter: the sink identifier is a parameter, which
    // `resolveOrigin` maps to the containing hook function — the mutation performed by
    // that hook is therefore attributed to the returned value.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          function useHelper(cb) {
            cache.set("key", "value");
            return cb;
          }
          useHelper(() => {});
          return <Foo />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Hook calls through a member expression (`React.useEffect`) are sinks too.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache.set("key", "value");
          };
          React.useEffect(fn);
          return <Foo />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // The bare `use` function counts as a hook call by name.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache.set("key", "value");
          };
          use(fn);
          return <Foo />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Function returned from a hook.
    {
      code: tsx`
        function useFoo() {
          useHook();
          const cache = new Map();
          return () => {
            cache.set("key", "value");
          };
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "default" },
        { data: { name: "cache" }, messageId: "mutates" },
      ],
    },
    // A hook defined as an arrow function assigned to a `use*` variable is
    // recognized for return-value sinks.
    {
      code: tsx`
        const useFoo = () => {
          const cache = new Map();
          return () => {
            cache.set("key", "value");
          };
        };
      `,
      errors: [
        { data: { name: "cache" }, messageId: "default" },
        { data: { name: "cache" }, messageId: "mutates" },
      ],
    },
    // Implicit arrow-body returns from a hook are also return-value sinks.
    {
      code: tsx`
        const useFoo = (cache) => () => {
          cache.set("key", "value");
        };
      `,
      errors: [
        { data: { name: "cache" }, messageId: "default" },
        { data: { name: "cache" }, messageId: "mutates" },
      ],
    },
    // Type assertions around the sink expression are unwrapped.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache.set("key", "value");
          };
          return <Foo fn={fn as () => void} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Mutating a parameter captured from the enclosing component scope.
    {
      code: tsx`
        function Component(cache) {
          const fn = () => {
            cache.set("key", "value");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Conditional mutations are still treated as definite mutations.
    {
      code: tsx`
        function Component(cond) {
          const cache = new Map();
          const fn = () => {
            if (cond) cache.set("key", "value");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Mutation effect propagates through a simple local alias (`fn2 = fn`).
    {
      code: tsx`
        function Component(cond) {
          const cache = new Map();
          const fn = () => {
            cache.set("a", 1);
          };
          const fn2 = fn;
          return <Foo fn={fn2} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Mutation effect propagates through a chain of simple local aliases.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache.set("a", 1);
          };
          const fn2 = fn;
          const fn3 = fn2;
          return <Foo fn={fn3} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // An alias declared inside the callback is traced back to the captured
    // binding it was initialized from.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            const alias = cache;
            alias.set("key", "value");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Reassigning an alias mutates the alias binding, not the value from its initializer.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          let alias = cache;
          const fn = () => {
            alias = new Map();
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "alias" }, messageId: "mutates" },
        { data: { name: "alias" }, messageId: "default" },
      ],
    },
    // Mutation effect propagates through nested inline closures.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            const inner = () => {
              cache.set("key", "value");
            };
            return inner;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Mutation nested inside multiple closure layers still marks the outermost
    // passed function as mutable.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            const inner = () => {
              const deep = () => {
                cache.set("key", "value");
              };
              return deep;
            };
            return inner;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // Same mutable function passed to two different sinks reports two usage-site
    // diagnostics plus one mutation-site diagnostic for each usage.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache.set("key", "value");
          };
          return <Foo onA={fn} onB={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
        { data: { name: "cache" }, messageId: "default" },
      ],
    },
    // JSX props are purely syntactic freeze contexts: even a lowercase
    // non-component helper rendering a host element gets flagged.
    {
      code: tsx`
        function renderItem() {
          const items = [];
          const fn = () => {
            items.push(1);
          };
          return <div onClick={fn} />;
        }
      `,
      errors: [
        { data: { name: "items" }, messageId: "mutates" },
        { data: { name: "items" }, messageId: "default" },
      ],
    },
    // Method-name heuristic flags any `.push()` call regardless of receiver type.
    {
      code: tsx`
        function Component() {
          const obj = { push() {} };
          const fn = () => {
            obj.push(1);
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "obj" }, messageId: "mutates" },
        { data: { name: "obj" }, messageId: "default" },
      ],
    },
    // When a function mutates multiple captured variables, only the first
    // mutation site encountered in source order is reported.
    {
      code: tsx`
        function Component() {
          const a = 0;
          const b = 0;
          const fn = () => {
            a++;
            b++;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "a" }, messageId: "mutates" },
        { data: { name: "a" }, messageId: "default" },
      ],
    },
    // The enclosing-function walk stops exactly at the function declaring the
    // mutated variable: `inner` is mutable, but `helper` is not.
    {
      code: tsx`
        function Component() {
          const helper = () => {
            const items = [];
            const inner = () => {
              items.push(1);
            };
            return <Bar fn={inner} />;
          };
          return <Foo fn={helper} />;
        }
      `,
      errors: [
        { data: { name: "items" }, messageId: "mutates" },
        { data: { name: "items" }, messageId: "default" },
      ],
    },
    // The ref-name heuristic is case-sensitive: `myref` does not end with "Ref".
    {
      code: tsx`
        function Component() {
          const myref = { current: 0 };
          const fn = () => {
            myref.current = 1;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "myref" }, messageId: "mutates" },
        { data: { name: "myref" }, messageId: "default" },
      ],
    },
    // Initializer provenance requires exactly one definition for the origin.
    {
      code: tsx`
        function Component() {
          var mounted = useRef(false);
          var mounted;
          const fn = () => {
            mounted.current = true;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "mounted" }, messageId: "mutates" },
        { data: { name: "mounted" }, messageId: "default" },
      ],
    },

    // Mutating a value returned from useState inside a JSX event handler
    // (ported from React Compiler's error.invalid-function-expression-mutates-immutable-value).
    {
      code: tsx`
        function Component(props) {
          const [x, setX] = useState({ value: "" });
          const onChange = (e) => {
            x.value = e.target.value;
            setX(x);
          };
          return <input value={x.value} onChange={onChange} />;
        }
      `,
      errors: [
        { data: { name: "x" }, messageId: "mutates" },
        { data: { name: "x" }, messageId: "default" },
      ],
    },
    // A callback that reassigns its own binding (ported from React Compiler's
    // error.function-expression-references-variable-its-assigned-to).
    {
      code: tsx`
        function Component() {
          let callback = () => {
            callback = null;
          };
          return <div onClick={callback} />;
        }
      `,
      errors: [
        { data: { name: "callback" }, messageId: "mutates" },
        { data: { name: "callback" }, messageId: "default" },
      ],
    },
    // A hook that returns a function capturing and reassigning a local variable
    // (ported from React Compiler's error.invalid-reassign-local-in-hook-return-value).
    {
      code: tsx`
        function useFoo() {
          let x = 0;
          return (value) => {
            x = value;
          };
        }
      `,
      errors: [
        { data: { name: "x" }, messageId: "default" },
        { data: { name: "x" }, messageId: "mutates" },
      ],
    },
    // Conditional reassignment plus a mutating method in a JSX event handler
    // (ported from React Compiler's error.mutable-range-shared-inner-outer-function).
    {
      code: tsx`
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
      errors: [
        { data: { name: "a" }, messageId: "mutates" },
        { data: { name: "a" }, messageId: "default" },
      ],
    },

    // Direct mutation of a useState value, with no closure reaching a freeze
    // sink (https://github.com/Rel1cx/eslint-react/issues/1941).
    {
      code: tsx`
        function Example({ initial }) {
          const [values, setValues] = useState(initial);
          const handleChange = (itemId, diff) => {
            values[itemId].confirmedQuantity = diff;
            setValues(values);
          };
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a state value returned from 'useState' and must be treated as immutable.",
            name: "values",
          },
          messageId: "direct",
        },
      ],
    },
    // Mutation reached through a shallow copy of state: the copy's own slots are
    // new, but `copyValues[itemId]` still references the original nested object
    // (https://github.com/Rel1cx/eslint-react/issues/1941).
    {
      code: tsx`
        function Example({ initial }) {
          const [values, setValues] = useState(initial);
          const handleChange = (itemId, diff) => {
            const copyValues = { ...values };
            copyValues[itemId].confirmedQuantity = diff;
            setValues(copyValues);
          };
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a shallow copy of 'values'; mutating nested values through it mutates 'values' in place.",
            name: "copyValues",
          },
          messageId: "direct",
        },
      ],
    },
    // Direct mutation of props in the component body.
    {
      code: tsx`
        function Component(props) {
          props.count = 1;
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // Direct mutation of a destructured prop inside a handler that is never
    // passed to a freeze sink.
    {
      code: tsx`
        function Component({ items }) {
          const handleClick = () => {
            items.push(1);
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // Iterator provenance is preserved through state aliases and destructuring.
    {
      code: tsx`
        function Component() {
          const [items] = useState([]);
          const alias = items;
          for (const { value } of alias) {
            value.tags.push("changed");
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "value",
          },
          messageId: "direct",
        },
      ],
    },
    // Member-expression collections are traced to their props root.
    {
      code: tsx`
        function Component(props) {
          for (const item of props.items) {
            item.modified = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'props' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // `delete` on a props property.
    {
      code: tsx`
        function Component(props) {
          const reset = () => {
            delete props.count;
          };
          reset();
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // UpdateExpression on a member of a useReducer state value.
    {
      code: tsx`
        function Component() {
          const [state, dispatch] = useReducer(reducer, { count: 0 });
          const increment = () => {
            state.count++;
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // Mutating method call on a state value.
    {
      code: tsx`
        function Component() {
          const [items, setItems] = useState([]);
          const add = () => {
            items.push(1);
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // Nested mutation through an array shallow copy of state.
    {
      code: tsx`
        function Component() {
          const [items, setItems] = useState([]);
          const toggle = (index) => {
            const copy = [...items];
            copy[index].done = true;
            setItems(copy);
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // Nested mutation through a shallow copy of props.
    {
      code: tsx`
        function Component(props) {
          const handleClick = () => {
            const copy = { ...props };
            copy.user.name = "x";
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // An identifier alias of a state value is traced back to the state origin.
    {
      code: tsx`
        function Component() {
          const [values, setValues] = useState({});
          const alias = values;
          const handleChange = () => {
            alias.count = 1;
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // Namespaced state hook calls are recognized.
    {
      code: tsx`
        function Component() {
          const [values, setValues] = React.useState({});
          const handleChange = () => {
            values.count = 1;
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
    },
    // Custom state hooks configured via `additionalStateHooks` are recognized.
    {
      code: tsx`
        function Component() {
          const [values, setValues] = useMyState({});
          const handleChange = () => {
            values.count = 1;
          };
          return <div />;
        }
      `,
      errors: [
        { messageId: "direct" },
      ],
      settings: {
        "react-x": {
          additionalStateHooks: "useMyState",
        },
      },
    },
    // A mutation already reported through a freeze sink is not reported again
    // by the direct-mutation pass.
    {
      code: tsx`
        function Component(props) {
          const onClick = () => {
            props.count = 1;
          };
          return <button onClick={onClick} />;
        }
      `,
      errors: [
        { data: { name: "props" }, messageId: "mutates" },
        { data: { name: "props" }, messageId: "default" },
      ],
    },

    // Logical assignment operators (`||=`) on a captured identifier count as
    // binding mutations; the collector does not filter by operator.
    {
      code: tsx`
        function Component() {
          let count = 0;
          const fn = () => {
            count ||= 1;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "count" }, messageId: "mutates" },
        { data: { name: "count" }, messageId: "default" },
      ],
    },
    // Logical assignment (`??=`) to a props property is a direct mutation.
    {
      code: tsx`
        function Component(props) {
          props.count ??= 1;
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // A mutating method invoked through a member chain resolves to the root
    // identifier of the chain.
    {
      code: tsx`
        function Component() {
          const [state, setState] = useState({ list: [] });
          const add = () => {
            state.list.push(1);
          };
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a state value returned from 'useState' and must be treated as immutable.",
            name: "state",
          },
          messageId: "direct",
        },
      ],
    },
    // `useReducer` state mutations name the hook in the detail message.
    {
      code: tsx`
        function Component() {
          const [state, dispatch] = useReducer(reducer, { count: 0 });
          const increment = () => {
            state.count += 1;
          };
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a state value returned from 'useReducer' and must be treated as immutable.",
            name: "state",
          },
          messageId: "direct",
        },
      ],
    },
    // The shallow-copy detail message names both the copy and the original.
    {
      code: tsx`
        function Component(props) {
          const handleClick = () => {
            const copy = { ...props };
            copy.user.name = "x";
          };
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a shallow copy of 'props'; mutating nested values through it mutates 'props' in place.",
            name: "copy",
          },
          messageId: "direct",
        },
      ],
    },
    // A shallow copy of a shallow copy is traced one hop: the detail names the
    // intermediate copy as the original.
    {
      code: tsx`
        function Component() {
          const [values, setValues] = useState({});
          const handle = () => {
            const copy1 = { ...values };
            const copy2 = { ...copy1 };
            copy2.a.b = 1;
          };
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a shallow copy of 'copy1'; mutating nested values through it mutates 'copy1' in place.",
            name: "copy2",
          },
          messageId: "direct",
        },
      ],
    },
    // A property destructured from props is traced back to the props origin, so
    // the report names 'props', not the destructured binding.
    {
      code: tsx`
        function Component(props) {
          const { user } = props;
          const handle = () => {
            user.name = "x";
          };
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // `delete` through a computed member of props is a direct mutation.
    {
      code: tsx`
        function Component(props) {
          const reset = () => {
            delete props[key];
          };
          reset();
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // The navigation-hook exemption is an exact allowlist: a value returned
    // from any other hook is not exempt from the `.push()` heuristic.
    {
      code: tsx`
        function Component() {
          const nav = useCustomNav();
          const fn = () => {
            nav.push("/dashboard");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "nav" }, messageId: "mutates" },
        { data: { name: "nav" }, messageId: "default" },
      ],
    },
    // Props of a component defined as an arrow function are frozen too.
    {
      code: tsx`
        const Component = (props) => {
          props.count = 1;
          return <div />;
        };
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // A component returned by a higher-order function is still a component:
    // its first parameter is props (https://github.com/Rel1cx/eslint-react/issues/1951).
    {
      code: tsx`
        const withFoo = (v) => (props) => {
          props.count = 1;
          return <div />;
        };
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // A returned component whose JSX return is behind a conditional is still
    // confirmed (both branches are JSX).
    {
      code: tsx`
        const withFoo = (v) => (props) => {
          props.count = 1;
          return v ? <div /> : <span />;
        };
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // A named function expression returned by a factory is confirmed by its
    // JSX return; the name plays no role.
    {
      code: tsx`
        const factory = () => function Inner(props) {
          props.count = 1;
          return <div />;
        };
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // A memo-wrapped component is confirmed through the wrapper callback.
    {
      code: tsx`
        const Component = memo((props) => {
          props.count = 1;
          return <div />;
        });
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // Hook calls confirm a component even without a JSX return.
    {
      code: tsx`
        function Component(props) {
          const [state] = useState(0);
          props.count = state;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a prop of this component and must be treated as immutable.",
            name: "props",
          },
          messageId: "direct",
        },
      ],
    },
    // Direct mutations are not deduplicated against each other: two distinct
    // mutation sites of the same state value are both reported.
    {
      code: tsx`
        function Component() {
          const [state, setState] = useState({ a: 0 });
          const inc = () => {
            state.a++;
          };
          const dec = () => {
            state.a--;
          };
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is a state value returned from 'useState' and must be treated as immutable.",
            name: "state",
          },
          messageId: "direct",
        },
        {
          data: {
            detail: "It is a state value returned from 'useState' and must be treated as immutable.",
            name: "state",
          },
          messageId: "direct",
        },
      ],
    },
    // Mutating a for-of iterator variable over props mutates an element of the
    // props value in place (https://github.com/Rel1cx/eslint-react/issues/1764).
    {
      code: tsx`
        function Component({ items }) {
          for (const item of items) {
            item.modified = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // The same applies when the iterated collection is a state value.
    {
      code: tsx`
        function Component() {
          const [items, setItems] = useState([]);
          for (const item of items) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // Mutating method calls on the iterator variable are mutations too.
    {
      code: tsx`
        function Component({ lists }) {
          for (const list of lists) {
            list.push(1);
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'lists' and must be treated as immutable.",
            name: "list",
          },
          messageId: "direct",
        },
      ],
    },
    // The iterated collection is traced through variable-declarator aliases.
    {
      code: tsx`
        function Component({ items }) {
          const list = items;
          for (const item of list) {
            item.modified = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // Iterating a shallow copy still shares elements with the original, so the
    // detail names the copy the iterator was bound from.
    {
      code: tsx`
        function Component() {
          const [items, setItems] = useState([]);
          const copy = [...items];
          for (const item of copy) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'copy' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // `for await` shares the ForOfStatement node type, so its iterator
    // variable is traced exactly like a synchronous for-of.
    {
      code: tsx`
        function Component({ items }) {
          for await (const item of items) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // An array-pattern iterator binding is traced the same way as a plain
    // identifier binding; the mutated pattern element is the reported name.
    {
      code: tsx`
        function Component() {
          const [entries] = useState([]);
          for (const [id, value] of entries) {
            value.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'entries' and must be treated as immutable.",
            name: "value",
          },
          messageId: "direct",
        },
      ],
    },
    // `let` vs `const` does not matter for value mutations through the
    // iterator variable; only rebinding the binding itself is exempt.
    {
      code: tsx`
        function Component({ items }) {
          for (let item of items) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // UpdateExpression on an iterator member is a value mutation.
    {
      code: tsx`
        function Component({ items }) {
          for (const item of items) {
            item.count++;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // `delete` on an iterator member is a value mutation.
    {
      code: tsx`
        function Component({ items }) {
          for (const item of items) {
            delete item.done;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // The iterated collection is resolved through optional chaining to its
    // props root.
    {
      code: tsx`
        function Component(props) {
          for (const item of props?.items) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'props' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // Type assertions around the iterated collection are unwrapped before the
    // root identifier is extracted.
    {
      code: tsx`
        function Component({ items }) {
          for (const item of items as Item[]) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // Iterating props itself: the collection root is the props parameter.
    {
      code: tsx`
        function Component(props) {
          for (const item of props) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'props' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // A member-expression collection rooted at a useReducer state value
    // resolves to the state origin.
    {
      code: tsx`
        function Component() {
          const [state, dispatch] = useReducer(reducer, { items: [] });
          for (const item of state.items) {
            item.done = true;
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'state' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // Nested for-of loops: the inner iterator's origin is the outer iterator
    // variable, so the detail names the outer iterator one hop up.
    {
      code: tsx`
        function Component({ groups }) {
          for (const item of groups) {
            for (const sub of item.children) {
              sub.done = true;
            }
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'item' and must be treated as immutable.",
            name: "sub",
          },
          messageId: "direct",
        },
      ],
    },
    // An iterator mutation nested in a closure that never reaches a freeze
    // sink is still caught by the direct-mutation pass.
    {
      code: tsx`
        function Component({ items }) {
          for (const item of items) {
            setTimeout(() => {
              item.done = true;
            });
          }
          return <div />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // An iterator mutation inside a handler passed to a freeze sink is caught
    // by the direct-mutation pass only: the sink pass's origin walk stops at
    // the loop-local declaration and never marks the handler mutable.
    {
      code: tsx`
        function Component({ items }) {
          const onClick = () => {
            for (const item of items) {
              item.done = true;
            }
          };
          return <button onClick={onClick} />;
        }
      `,
      errors: [
        {
          data: {
            detail: "It is an element of 'items' and must be treated as immutable.",
            name: "item",
          },
          messageId: "direct",
        },
      ],
    },
    // The same mutation inside a hook argument reaches a freeze sink first:
    // the sink pass reports it but names the iterator variable (its origin
    // walk does not trace for-of bindings), and the direct pass is then
    // deduplicated against the reported mutation node.
    {
      code: tsx`
        function Component({ items }) {
          for (const item of items) {
            useEffect(() => {
              item.done = true;
            });
          }
          return <div />;
        }
      `,
      errors: [
        { data: { name: "item" }, messageId: "default" },
        { data: { name: "item" }, messageId: "mutates" },
      ],
    }, // Destructuring assignment targets are collected as mutations, same as plain assignments
    {
      code: tsx`
        function Component() {
          let a;
          let b;
          const fn = () => {
            [a, b] = [1, 2];
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { messageId: "mutates" },
        { messageId: "default" },
      ],
    },
    // Object destructuring writes to props are mutations
    {
      code: tsx`
        function Component(props) {
          ({ user: props.user } = getData());
          return <div />;
        }
      `,
      errors: [{ messageId: "direct" }],
    },
    // Array destructuring writes to state are mutations
    {
      code: tsx`
        function Component() {
          const [state] = useState({ value: 0 });
          [state.value] = getValues();
          return <div />;
        }
      `,
      errors: [{ messageId: "direct" }],
    },
    // Nested destructuring writes to props are mutations
    {
      code: tsx`
        function Component(props) {
          ({ a: [props.x] } = getData());
          return <div />;
        }
      `,
      errors: [{ messageId: "direct" }],
    },
    // A pattern default with a member target writes props
    {
      code: tsx`
        function Component(props) {
          ({ a: props.x = 1 } = getData());
          return <div />;
        }
      `,
      errors: [{ messageId: "direct" }],
    },
    // A for-of loop target writes props on every iteration
    {
      code: tsx`
        function Component(props) {
          for (props.current of getItems()) {
            console.log("iterated");
          }
          return <div />;
        }
      `,
      errors: [{ messageId: "direct" }],
    },
    // A for-in loop target writes state on every iteration
    {
      code: tsx`
        function Component() {
          const [state] = useState({ key: "" });
          for (state.key in getRecord()) {
            console.log("iterated");
          }
          return <div />;
        }
      `,
      errors: [{ messageId: "direct" }],
    },
  ],
  valid: [
    tsx`
      function Component() {
        const ref = useRef(null);
        const fn = () => {
          ref.current = 1;
        };
        return <Foo fn={fn} />;
      }
    `,
    // useRef-initialized values are exempt for mutating method calls too.
    tsx`
      function Component() {
        const box = useRef([]);
        const fn = () => {
          box.current.push(1);
        };
        return <Foo fn={fn} />;
      }
    `,
    // Namespaced useRef calls are recognized by the initializer check.
    tsx`
      function Component() {
        const flag = React.useRef(false);
        const fn = () => {
          flag.current = true;
        };
        return <Foo fn={fn} />;
      }
    `,
    // useRef provenance is followed through variable-declarator aliases.
    tsx`
      function Component() {
        const mounted = useRef(false);
        const alias = mounted;
        const fn = () => {
          alias.current = true;
        };
        return <Foo fn={fn} />;
      }
    `,
    // Ref received as props is exempt from mutability checks.
    tsx`
      function Component(props) {
        const fn = () => {
          props.myRef.current = 1;
        };
        return <Foo fn={fn} />;
      }
    `,
    // The ref-name heuristic exempts "*Ref" names regardless of initializer.
    tsx`
      function Component() {
        const timerRef = { current: 0 };
        const fn = () => {
          timerRef.current = 1;
        };
        return <Foo fn={fn} />;
      }
    `,
    // Plain reassignment of a ref-named identifier is exempt.
    tsx`
      function Component(node) {
        let nodeRef = null;
        const fn = () => {
          nodeRef = node;
        };
        return <Foo fn={fn} />;
      }
    `,
    // Ref-like property anywhere in the mutated chain is exempt.
    tsx`
      function Component() {
        const fn = () => {
          const obj = { ref: { current: 0 } };
          obj.ref.current = 1;
        };
        return <Foo fn={fn} />;
      }
    `,
    // Non-mutating method calls on captured values are allowed.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.get("key");
        };
        return <Foo fn={fn} />;
      }
    `,
    // Non-mutating array methods are allowed.
    tsx`
      function Component() {
        const items = [1, 2, 3];
        const fn = () => {
          items.map((x) => x * 2);
        };
        return <Foo fn={fn} />;
      }
    `,
    tsx`
      function Component() {
        const helper = () => {
          let local = 0;
          local++;
        };
        return <Foo fn={helper} />;
      }
    `,
    tsx`
      function useFoo() {
        const cache = new Map();
        return () => cache.get("key");
      }
    `,
    // Mutation in the component body itself never marks the passed function;
    // the function only reads the variable.
    tsx`
      function Component() {
        const cache = new Map();
        cache.set("key", "value");
        const fn = () => cache.get("key");
        return <Foo fn={fn} />;
      }
    `,
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        fn();
        return <Foo />;
      }
    `,
    // Passing a mutable function to a non-hook call is not a freeze context.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        normalFn(fn);
      }
    `,
    // Returning a mutable function from a non-hook function is not a freeze context.
    tsx`
      function helper() {
        const cache = new Map();
        return () => {
          cache.set("key", "value");
        };
      }
    `,
    // "useful" does not match the use[A-Z0-9] hook-name pattern.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        useful(fn);
        return <Foo />;
      }
    `,
    // JSX children expression containers are not attribute sinks.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        return <Foo>{fn}</Foo>;
      }
    `,
    // JSX spread attributes are not collected as sinks.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        return <Foo {...{ fn }} />;
      }
    `,
    // Spread arguments to hook calls are not collected as sinks.
    tsx`
      function useFoo() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        const fns = [fn];
        useHook(...fns);
      }
    `,
    // Mutating method invoked via a computed property is not statically resolved
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache["set"]("key", "value");
        };
        return <Foo fn={fn} />;
      }
    `,
    // Mutating methods on non-identifier roots (call results) are ignored
    // because no root identifier can be extracted.
    tsx`
      function Component() {
        const fn = () => {
          getItems().push(1);
        };
        return <Foo fn={fn} />;
      }
    `,
    // Local shadowing prevents the outer captured variable from being marked.
    tsx`
      function Component() {
        const cache = new Map();
        const outer = () => {
          const cache = new Set();
          const inner = () => {
            cache.add("key");
          };
        };
        return <Foo fn={outer} />;
      }
    `,
    // A parameter shadowing the outer variable keeps the mutation local: the
    // enclosing-function walk breaks as soon as the declaration is inside.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = (cache) => {
          cache.set("key", "value");
        };
        return <Foo fn={fn} />;
      }
    `,
    // Module-scope bindings are not function-context variables.
    tsx`
      const globalCache = new Map();
      function Component() {
        const fn = () => {
          globalCache.set("key", "value");
        };
        return <Foo fn={fn} />;
      }
    `,
    // Aliases of module-scope bindings retain their module origin.
    tsx`
      const globalCache = new Map();
      function Component() {
        const cache = globalCache;
        const fn = () => {
          cache.set("key", "value");
        };
        return <Foo fn={fn} />;
      }
    `,
    // Unresolvable identifiers (implicit globals) are ignored.
    tsx`
      function Component() {
        const fn = () => {
          someGlobal.count = 1;
        };
        return <Foo fn={fn} />;
      }
    `,
    // Aliasing through reassignment after declaration is not tracked.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        let fn2;
        fn2 = fn;
        return <Foo fn={fn2} />;
      }
    `,
    // Functions stored on object properties are not resolved back to aliases.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        const obj = { fn };
        return <Foo onClick={obj.fn} />;
      }
    `,
    // Functions returned from another function call are not resolved.
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        const makeFn = () => fn;
        return <Foo onClick={makeFn()} />;
      }
    `,
    // A mutable function returned inside an object literal from a hook is not
    // resolved back to the function node.
    tsx`
      function useFoo() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        return { fn };
      }
    `,
    // Returns from nested non-hook functions inside a hook are not
    // hook-return sinks.
    tsx`
      function useFoo() {
        const cache = new Map();
        function make() {
          return () => {
            cache.set("key", "value");
          };
        }
        make();
      }
    `,
    // Indirect mutation by calling a mutable function is not tracked; only
    // syntactic mutation sites within the sunk function's closure chain count
    // (the SPEC would catch this via transitive effect inference).
    tsx`
      function Component() {
        const cache = new Map();
        const fn = () => {
          cache.set("key", "value");
        };
        return <Foo fn={() => fn()} />;
      }
    `,
    tsx`
      "use client"
      import { useSearchParams } from 'next/navigation'

      export default function Page() {
        const searchParams = useSearchParams()
        searchParams.get('foo') // returns 'bar' when ?foo=bar
        // ...
      }
    `,
    tsx`
      "use client"
      import { usePathname } from 'next/navigation'

      export default function Page() {
       const pathname = usePathname() // returns "/dashboard" on /dashboard?foo=bar
       // ...
      }
    `,
    tsx`
      "use client"
      import { useRouter } from 'next/navigation'

      export default function Page() {
       const router = useRouter()
       // ...
       router.push('/dashboard') // Navigate to /dashboard
      }
    `,
    // `useRouter().push()` navigates; it does not mutate the captured router value.
    tsx`
      function Component() {
        const router = useRouter()
        const navigation = router
        return <button onClick={() => navigation.push('/dashboard')} />
      }
    `,
    tsx`
      "use client"
      import { useParams } from 'next/navigation'

      export default function Page() {
        // on /dashboard/[team] where pathname is /dashboard/nextjs
        const { team } = useParams() // team === "nextjs"
      }
    `,
    tsx`
      'use client'

      import { useSelectedLayoutSegments } from 'next/navigation'

      export default function ExampleClientComponent() {
        const segments = useSelectedLayoutSegments()

        return (
          <ul>
            {segments.map((segment, index) => (
              <li key={index}>{segment}</li>
            ))}
          </ul>
        )
      }
    `,
    tsx`
      'use client'
      import { useSelectedLayoutSegment } from 'next/navigation'

      export default function ExampleClientComponent() {
        const segment = useSelectedLayoutSegment()

        return <p>Active segment: {segment}</p>
      }
    `,
    tsx`
      function Component() {
        const router = useRouter()
        return <button onClick={() => {
          router.push('/dashboard')
          router.replace()
          router.refresh()
          router.back()
          router.forward()
          router.prefetch()
        }} />
      }
    `,
    // Navigation methods do not mutate the values returned by navigation hooks.
    tsx`
      function Component() {
        const navigate = useNavigate()
        return <button onClick={() => navigate.push('/dashboard')} />
      }
    `,
    tsx`
      function Component() {
        const navigation = useNavigation()
        return <button onClick={() => navigation.push('/dashboard')} />
      }
    `,
    tsx`
      function Component() {
        const history = useHistory()
        return <button onClick={() => history.push('/dashboard')} />
      }
    `,
    // https://github.com/Rel1cx/eslint-react/issues/1893
    tsx`
      import { useEffect, useRef } from "react";

      export function Component() {
        const mounted = useRef<boolean>(false);
        useEffect(() => {
          if (mounted.current) return;
          mounted.current = true;
        }, []);
        return <div/>;
      }
    `,
    // https://github.com/Rel1cx/eslint-react/issues/1898
    // Regression: `router.push()` inside a frozen callback is navigation, not
    // an in-place mutation of the captured router value.
    tsx`
      function Component() {
        const router = useRouter()
        return <button onClick={() => router.push('/dashboard')} />
      }
    `,
    // Reassignment to implicit globals in a JSX event handler is ignored
    // (ported from React Compiler's allow-reassignment-to-global-function-jsx-prop).
    tsx`
      function Component() {
        const onClick = () => {
          someUnknownGlobal = true;
          moduleLocal = true;
        };
        return <div onClick={onClick} />;
      }
    `,
    // Function-call mutations are not tracked syntactically
    // (ported from React Compiler's maybe-mutate-object-in-callback).
    tsx`
      function Component(props) {
        const object = {};
        const onClick = () => {
          mutate(object);
        };
        return <Foo callback={onClick}>{props.children}</Foo>;
      }
    `,
    // useCallback wrapping a ref mutation is allowed
    // (ported from React Compiler's useCallback-set-ref-nested-property).
    tsx`
      import { useCallback, useRef } from "react";

      function Component() {
        const ref = useRef({ inner: null });
        const onChange = useCallback((event) => {
          ref.current.inner = event.target.value;
        });
        return <input onChange={onChange} />;
      }
    `,
    // Writing a shallow copy's own top-level slot is not a mutation of state.
    tsx`
      function Example({ initial }) {
        const [values, setValues] = useState(initial);
        const handleChange = (itemId, diff) => {
          const copyValues = { ...values };
          copyValues[itemId] = { ...copyValues[itemId], confirmedQuantity: diff };
          setValues(copyValues);
        };
      }
    `,
    // Mutating a shallow-copied array itself only affects the new array.
    tsx`
      function Component() {
        const [items, setItems] = useState([]);
        const add = () => {
          const copy = [...items];
          copy.push(1);
          setItems(copy);
        };
      }
    `,
    // The setter at index 1 of the tuple is not a state value.
    tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handleChange = () => {
          setValues.extra = 1;
        };
      }
    `,
    // Parameters of non-component functions are not props.
    tsx`
      function helper(props) {
        props.count = 1;
      }
    `,
    // A parameter of an arrow function returned by another function is not
    // props unless the returned function is actually a component
    // (https://github.com/Rel1cx/eslint-react/issues/1951).
    tsx`
      export const curriedArrow = (v) => (obj) => {
        obj.a = 1;
        return v;
      };
    `,
    // An explicit non-JSX return type annotation does not change that.
    tsx`
      export const curriedTyped = (v: string) => (obj: { a: number }): string => {
        obj.a = 1;
        return v;
      };
    `,
    // A returned arrow function with no return value is not a component.
    tsx`
      export const curriedNoReturn = (v) => (obj) => {
        obj.a = 1;
      };
    `,
    // https://github.com/Rel1cx/eslint-react/issues/1951
    tsx`
      export const createHeaderSetter = (value) => {
        return (next) => async (req) => {
          req.headers.set("x-example", value);
          return await next(req);
        };
      };
    `,
    // A function declaration returning a handler is not a component either.
    tsx`
      function factory(v) {
        return (obj) => {
          obj.a = 1;
          return v;
        };
      }
    `,
    // A component-like name alone is not enough: without a JSX return or hook
    // calls the returned function is not a confirmed component.
    tsx`
      const factory = () => function Transform(props) {
        props.count = 1;
      };
    `,
    // A function that never returns JSX and calls no hooks is not confirmed
    // as a component, even with a component-like name.
    tsx`
      function Component(props) {
        props.count = 1;
      }
    `,
    // Only the first parameter of a confirmed component is props; mutating a
    // later parameter of a returned component is allowed.
    tsx`
      const withFoo = (v) => (props, ctx) => {
        ctx.count = 1;
        return <div />;
      };
    `,
    // Parameters of custom hooks are not component props.
    tsx`
      function useFoo(cache) {
        const flush = () => {
          cache.set("key", "value");
        };
        flush();
      }
    `,
    // A handler parameter shadowing the component's props name is not props.
    tsx`
      function Component(props) {
        const onClick = (props) => {
          props.count = 1;
        };
        return <div />;
      }
    `,
    // Deep copies do not share nested references with the original.
    tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handleChange = () => {
          const copy = structuredClone(values);
          copy.a.b = 1;
        };
      }
    `,
    // Spreading a mutable local value does not create a frozen origin.
    tsx`
      function Component() {
        const local = { nested: { count: 0 } };
        const copy = { ...local };
        copy.nested.count = 1;
      }
    `,
    // Ref-like props remain exempt from the direct-mutation pass.
    tsx`
      function Component(props) {
        const onClick = () => {
          props.myRef.current = 1;
        };
        onClick();
      }
    `,
    // A `useState` result that is not destructured into an array pattern is
    // not classified as a state value.
    tsx`
      function Component() {
        const pair = useState({});
        const handle = () => {
          pair[0].value = 1;
        };
        handle();
      }
    `,
    // Custom ref hooks configured via `additionalRefHooks` are exempt.
    {
      code: tsx`
        function Component() {
          const box = useMyRef([]);
          const fn = () => {
            box.current.push(1);
          };
          return <Foo fn={fn} />;
        }
      `,
      settings: {
        "react-x": {
          additionalRefHooks: "useMyRef",
        },
      },
    },
    // Only the first parameter of a component is treated as props.
    tsx`
      function Component(props, context) {
        context.count = 1;
        return <div />;
      }
    `,
    // Returning a mutable function from a component is not a freeze context;
    // only hook return values are sinks.
    tsx`
      function Component() {
        const cache = new Map();
        return () => {
          cache.set("key", "value");
        };
      }
    `,
    // Only spread literals create shallow-copy origins; `Object.assign` copies
    // are not tracked.
    tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handle = () => {
          const copy = Object.assign({}, values);
          copy.a.b = 1;
        };
        handle();
      }
    `,
    // A spread argument that is not a plain identifier is not traced back to
    // an origin.
    tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handle = () => {
          const copy = { ...getValues() };
          copy.a.b = 1;
        };
        handle();
      }
    `,
    // Mutating the iterator variable of a for-of over a local mutable value is
    // allowed; only collections derived from props/state are frozen.
    tsx`
      function Component() {
        const items = [{ done: false }];
        for (const item of items) {
          item.done = true;
        }
        return <div />;
      }
    `,
    // A for-in loop iterates keys, not elements of a frozen collection.
    tsx`
      function Component({ items }) {
        for (const key in items) {
          key.modified = true;
        }
        return <div />;
      }
    `,
    // Reassigning the iterator binding itself is not a value mutation.
    tsx`
      function Component({ items }) {
        for (let item of items) {
          item = { done: true };
        }
        return <div />;
      }
    `,
    // A for-of whose right side has no root identifier is not traced back to
    // an origin.
    tsx`
      function Component({ items }) {
        for (const item of getItems()) {
          item.done = true;
        }
        return <div />;
      }
    `,
    // Iterating over a parameter of a non-component function is not iterating
    // over props.
    tsx`
      function helper({ items }) {
        for (const item of items) {
          item.done = true;
        }
      }
    `,
    // An uninitialized declarator outside a for-of is not an iterator binding;
    // a later assignment from a props element is not tracked.
    tsx`
      function Component({ items }) {
        let item;
        item = items[0];
        item.done = true;
        return <div />;
      }
    `,
    // A classic for statement is not a for-of: its uninitialized declarator
    // does not share any iterated collection's origin.
    tsx`
      function Component({ items }) {
        for (let item;;) {
          item = items[0];
          item.done = true;
          break;
        }
        return <div />;
      }
    `,
    // Iterating a deep copy shares no element references with the original.
    tsx`
      function Component({ items }) {
        const copy = structuredClone(items);
        for (const item of copy) {
          item.done = true;
        }
        return <div />;
      }
    `,
    // A collection that does not resolve to a variable has no frozen origin.
    tsx`
      function Component() {
        for (const item of someGlobal) {
          item.done = true;
        }
        return <div />;
      }
    `,
    // Cyclic spread aliases terminate via the `seen` guard and yield no
    // frozen origin instead of recursing forever.
    tsx`
      function Component() {
        const a = [...b];
        const b = [...a];
        for (const item of a) {
          item.done = true;
        }
        return <div />;
      }
    `,
    // Rebinding the iterator variable inside a freeze-sunk closure is a
    // binding mutation: it neither marks the handler mutable nor reports a
    // direct value mutation.
    tsx`
      function Component({ items }) {
        const onClick = () => {
          for (let item of items) {
            item = { done: true };
          }
        };
        return <button onClick={onClick} />;
      }
    `,
    // Scope resolution is exact: after the loop the identifier refers to the
    // shadowed outer local binding, which has no frozen origin.
    tsx`
      function Component({ items }) {
        const item = { done: false };
        for (const item of items) {
        }
        item.done = true;
        return <div />;
      }
    `,
  ],
});
