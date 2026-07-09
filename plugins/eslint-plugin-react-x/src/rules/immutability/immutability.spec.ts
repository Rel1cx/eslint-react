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
  ],
});
