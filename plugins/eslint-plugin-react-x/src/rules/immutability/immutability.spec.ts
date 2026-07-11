import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./immutability";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
    // Mutating method invoked via a computed string-literal property is still
    // resolved by `getPropertyName`.
    {
      code: tsx`
        function Component() {
          const cache = new Map();
          const fn = () => {
            cache["set"]("key", "value");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "cache" }, messageId: "mutates" },
        { data: { name: "cache" }, messageId: "default" },
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
        const cache = new Map();
        const useFoo = () => () => {
          cache.set("key", "value");
        };
      `,
      errors: [
        { data: { name: "cache" }, messageId: "default" },
        { data: { name: "cache" }, messageId: "mutates" },
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
    // Variables captured from module scope are flagged too (deviation from
    // the compiler SPEC, which only tracks function-context variables).
    {
      code: tsx`
        const globalCache = new Map();
        function Component() {
          const fn = () => {
            globalCache.set("key", "value");
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "globalCache" }, messageId: "mutates" },
        { data: { name: "globalCache" }, messageId: "default" },
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
    // A useRef value aliased through a differently-named variable is not
    // recognized as a ref (`isInitializedFromUseRef` does not chase aliases).
    {
      code: tsx`
        function Component() {
          const mounted = useRef(false);
          const alias = mounted;
          const fn = () => {
            alias.current = true;
          };
          return <Foo fn={fn} />;
        }
      `,
      errors: [
        { data: { name: "alias" }, messageId: "mutates" },
        { data: { name: "alias" }, messageId: "default" },
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
    // Ref received as props is exempt from mutability checks.
    tsx`
      function Component(props) {
        const fn = () => {
          props.myRef.current = 1;
        };
        return <Foo fn={fn} />;
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
    // Unresolvable identifiers (implicit globals) are ignored.
    tsx`
      function Component() {
        const fn = () => {
          someGlobal.count = 1;
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
  ],
});
