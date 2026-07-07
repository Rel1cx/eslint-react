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
  ],
});
