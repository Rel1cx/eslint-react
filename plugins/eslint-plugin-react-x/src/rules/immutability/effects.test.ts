import * as core from "@eslint-react/core";
import { merge } from "@eslint-react/eslint";
import { type TestRuleContext, getTextOf, runCollector } from "@local/testkit";
import tsx from "dedent";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";
import { inferDirectMutations, inferMutableFunctions } from "./effects";

function inferMutableSummaries(code: string) {
  let context: TestRuleContext | null = null;
  return runCollector(
    code,
    (ctx) => {
      context = ctx;
      const collector = createFactCollector();
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => {
      if (context == null) throw new Error("The rule context was not captured");
      return [...inferMutableFunctions(context, facts.mutations).entries()].map(([fn, effect]) => ({
        fn: getTextOf(code, fn),
        mutation: getTextOf(code, effect.node),
        name: effect.name,
      }));
    },
  );
}

function inferDirectSummaries(code: string) {
  let context: TestRuleContext | null = null;
  return runCollector(
    code,
    (ctx) => {
      context = ctx;
      const facts = createFactCollector();
      const comps = core.getFunctionComponentCollector(ctx);
      return {
        api: { comps: comps.api, facts: facts.facts },
        visitor: merge(facts.visitor, comps.visitor),
      };
    },
    ({ comps, facts }, program) => {
      if (context == null) throw new Error("The rule context was not captured");
      const components = comps.getAllComponents(program).map((comp) => comp.node);
      return inferDirectMutations(context, facts.mutations, components).map((mutation) => ({
        detail: mutation.detail,
        name: mutation.name,
        text: getTextOf(code, mutation.node),
      }));
    },
  );
}

describe("inferMutableFunctions", () => {
  it("should mark a function that mutates a captured local through a method call", () => {
    const code = "function outer() { const cache = new Map(); const fn = () => { cache.set('k', 'v'); }; }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "() => { cache.set('k', 'v'); }", mutation: "cache.set('k', 'v')", name: "cache" },
    ]);
  });

  it("should mark a function that rebinds a captured local", () => {
    const code = "function outer() { let count = 0; const inc = () => { count++; }; }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "() => { count++; }", mutation: "count++", name: "count" },
    ]);
  });

  it("should mark a function declaration that mutates a captured local", () => {
    const code = "function outer() { const cache = new Map(); function inner() { cache.set('k', 'v'); } }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "function inner() { cache.set('k', 'v'); }", mutation: "cache.set('k', 'v')", name: "cache" },
    ]);
  });

  it("should not mark the function that declares the mutated variable", () => {
    const code = "function outer() { const o = {}; o.x = 1; }";
    expect(inferMutableSummaries(code)).toEqual([]);
  });

  it("should mark every intermediate function between the mutation and the declaring function", () => {
    const code = "function outer() { const cache = new Map(); const fn = () => () => { cache.set('k'); }; }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "() => { cache.set('k'); }", mutation: "cache.set('k')", name: "cache" },
      { fn: "() => () => { cache.set('k'); }", mutation: "cache.set('k')", name: "cache" },
    ]);
  });

  it("should not mark a nested function that mutates a local declared by its parent function", () => {
    const code = "function outer() { const fn = () => { const local = {}; const g = () => { local.x = 1; }; }; }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "() => { local.x = 1; }", mutation: "local.x = 1", name: "local" },
    ]);
  });

  it("should keep the first mutation as the representative of a function", () => {
    const code = "function outer() { const a = {}; const b = {}; const fn = () => { a.x = 1; b.x = 2; }; }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "() => { a.x = 1; b.x = 2; }", mutation: "a.x = 1", name: "a" },
    ]);
  });

  it("should resolve an alias of a captured variable to its origin", () => {
    const code = "function outer() { const cache = new Map(); const alias = cache; const fn = () => { alias.set('k'); }; }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "() => { alias.set('k'); }", mutation: "alias.set('k')", name: "cache" },
    ]);
  });

  it("should skip mutations of module-scope variables", () => {
    const code = "const cache = new Map(); function outer() { const fn = () => { cache.set('k'); }; }";
    expect(inferMutableSummaries(code)).toEqual([]);
  });

  it("should skip mutations whose root identifier cannot be resolved", () => {
    const code = "function outer() { const fn = () => { missing.push(1); }; }";
    expect(inferMutableSummaries(code)).toEqual([]);
  });

  it("should skip mutations of ref-like targets", () => {
    const code = "function outer() { const ref = useRef(0); const fn = () => { ref.current = 1; }; }";
    expect(inferMutableSummaries(code)).toEqual([]);
  });

  it("should skip mutations of targets initialized from a useRef alias", () => {
    const code = "function outer() { const r = useRef(0); const a = r; const fn = () => { a.current = 1; }; }";
    expect(inferMutableSummaries(code)).toEqual([]);
  });

  it("should skip mutating method calls on values initialized by a navigation hook", () => {
    const code = "function outer() { const router = useRouter(); const fn = () => { router.push('/'); }; }";
    expect(inferMutableSummaries(code)).toEqual([]);
  });

  it("should skip mutating method calls through an alias of a navigation hook value", () => {
    const code = "function outer() { const router = useRouter(); const nav = router; const fn = () => { nav.push('/'); }; }";
    expect(inferMutableSummaries(code)).toEqual([]);
  });

  it("should not exempt mutating method calls on other call-initialized values", () => {
    const code = "function outer() { const store = makeStore(); const fn = () => { store.set('k', 'v'); }; }";
    expect(inferMutableSummaries(code)).toEqual([
      { fn: "() => { store.set('k', 'v'); }", mutation: "store.set('k', 'v')", name: "store" },
    ]);
  });
});

describe("inferDirectMutations", () => {
  it("should report a member mutation of a component's props", () => {
    const code = tsx`
      function Component(props) {
        const handleClick = () => {
          props.count += 1;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a prop of this component and must be treated as immutable.",
        name: "props",
        text: "props.count += 1",
      },
    ]);
  });

  it("should report a delete of a prop member", () => {
    const code = tsx`
      function Component(props) {
        const handleClick = () => {
          delete props.count;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a prop of this component and must be treated as immutable.",
        name: "props",
        text: "delete props.count",
      },
    ]);
  });

  it("should report a mutating method call on a destructured prop", () => {
    const code = tsx`
      function Component({ items }) {
        const handleClick = () => {
          items.push(1);
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a prop of this component and must be treated as immutable.",
        name: "items",
        text: "items.push(1)",
      },
    ]);
  });

  it("should report the rebinding of a destructured prop", () => {
    const code = tsx`
      function Component({ error }) {
        const reset = () => {
          error = null;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a prop of this component and must not be reassigned.",
        name: "error",
        text: "error = null",
      },
    ]);
  });

  it("should not report the rebinding of a plain alias of a prop", () => {
    const code = tsx`
      function Component({ error }) {
        const reset = () => {
          const current = error;
          current = null;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([]);
  });

  it("should report a member write through a plain alias of a prop", () => {
    const code = tsx`
      function Component({ error }) {
        const reset = () => {
          const current = error;
          current.message = "x";
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a prop of this component and must be treated as immutable.",
        name: "error",
        text: 'current.message = "x"',
      },
    ]);
  });

  it("should report a member mutation of a useState value", () => {
    const code = tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handleChange = () => {
          values.foo = 1;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a state value returned from 'useState' and must be treated as immutable.",
        name: "values",
        text: "values.foo = 1",
      },
    ]);
  });

  it("should report the rebinding of a useReducer state value", () => {
    const code = tsx`
      function Component() {
        const [state, dispatch] = useReducer(reducer, {});
        const reset = () => {
          state = {};
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a state value returned from 'useReducer' and must not be reassigned.",
        name: "state",
        text: "state = {}",
      },
    ]);
  });

  it("should report a nested mutation through a shallow copy of state", () => {
    const code = tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handleChange = () => {
          const copy = { ...values };
          copy.a.b = 1;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a shallow copy of 'values'; mutating nested values through it mutates 'values' in place.",
        name: "copy",
        text: "copy.a.b = 1",
      },
    ]);
  });

  it("should report a mutating method call on a nested member of a shallow copy", () => {
    const code = tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handleChange = () => {
          const copy = { ...values };
          copy.list.push(1);
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is a shallow copy of 'values'; mutating nested values through it mutates 'values' in place.",
        name: "copy",
        text: "copy.list.push(1)",
      },
    ]);
  });

  it("should not report writes to the top-level slots of a shallow copy", () => {
    const code = tsx`
      function Component() {
        const [values, setValues] = useState({});
        const handleChange = () => {
          const copy = { ...values };
          copy.a = 1;
          copy.list = [];
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([]);
  });

  it("should report a member mutation of a for-of iterator over props", () => {
    const code = tsx`
      function Component({ items }) {
        const handleClick = () => {
          for (const item of items) {
            item.done = true;
          }
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([
      {
        detail: "It is an element of 'items' and must be treated as immutable.",
        name: "item",
        text: "item.done = true",
      },
    ]);
  });

  it("should not report the rebinding of a for-of iterator", () => {
    const code = tsx`
      function Component({ items }) {
        const handleClick = () => {
          for (const item of items) {
            item = null;
          }
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([]);
  });

  it("should skip mutations of ref-like targets", () => {
    const code = tsx`
      function Component() {
        const ref = useRef(null);
        const handleClick = () => {
          ref.current = 1;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([]);
  });

  it("should skip mutating method calls on values initialized by a navigation hook", () => {
    const code = tsx`
      function Component() {
        const router = useRouter();
        const handleClick = () => {
          router.push("/");
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([]);
  });

  it("should not report mutations of a non-component function's parameters", () => {
    const code = "function helper(props) { props.x = 1; }";
    expect(inferDirectSummaries(code)).toEqual([]);
  });

  it("should not report mutations of variables that do not resolve to a frozen origin", () => {
    const code = tsx`
      function Component() {
        const local = {};
        const handleClick = () => {
          local.x = 1;
        };
        return <div />;
      }
    `;
    expect(inferDirectSummaries(code)).toEqual([]);
  });
});
