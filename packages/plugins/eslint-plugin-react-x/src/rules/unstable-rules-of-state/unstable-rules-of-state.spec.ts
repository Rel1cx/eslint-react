import type { ESLintReactSettings } from "@eslint-react/shared";
import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./unstable-rules-of-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // ── noReferenceToState ──────────────────────────────────────────
    // Spread object
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "John", age: 25 });
          setUser({ ...user, age: 30 });
          return <div />;
        }
      `,
      errors: [{ data: { name: "setUser" }, messageId: "noReferenceToState" }],
    },
    // Spread array
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState(["a", "b"]);
          const newItem = "c";
          setItems([...items, newItem]);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setItems" }, messageId: "noReferenceToState" }],
    },
    // Arithmetic — addition
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          setCount(count + 1);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setCount" }, messageId: "noReferenceToState" }],
    },
    // Setter used before its defining useState (order-independent detection)
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const increment = () => {
            setCount(count + 1);
          };

          const [count, setCount] = useState(0);

          return <button onClick={increment}>+</button>;
        }
      `,
      errors: [{ data: { name: "setCount" }, messageId: "noReferenceToState" }],
    },
    // Arithmetic — subtraction
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          setCount(count - 1);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setCount" }, messageId: "noReferenceToState" }],
    },
    // Negation
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [open, setOpen] = useState(false);
          setOpen(!open);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setOpen" }, messageId: "noReferenceToState" }],
    },
    // Property access
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "John", age: 25 });
          setUser({ name: user.name, age: 30 });
          return <div />;
        }
      `,
      errors: [{ data: { name: "setUser" }, messageId: "noReferenceToState" }],
    },
    // Method call on state
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([{ id: 1, active: true }]);
          setItems(items.filter(x => x.active));
          return <div />;
        }
      `,
      errors: [{ data: { name: "setItems" }, messageId: "noReferenceToState" }],
    },
    // Concatenation
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState(["a"]);
          const newItem = "b";
          setItems(items.concat(newItem));
          return <div />;
        }
      `,
      errors: [{ data: { name: "setItems" }, messageId: "noReferenceToState" }],
    },
    // Template literal
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [label, setLabel] = useState("hello");
          setLabel(\`\${label} updated\`);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setLabel" }, messageId: "noReferenceToState" }],
    },
    // Ternary with state ref
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          setCount(count > 0 ? count - 1 : 0);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setCount" }, messageId: "noReferenceToState" }],
    },
    // Nested state ref
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState({ users: [], count: 0 });
          setData({ users: data.users, count: data.count + 1 });
          return <div />;
        }
      `,
      errors: [{ data: { name: "setData" }, messageId: "noReferenceToState" }],
    },
    // Multiple state pairs — only the one referencing its own state is flagged
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const [total, setTotal] = useState(100);
          setCount(count + 1);
          setTotal(0);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setCount" }, messageId: "noReferenceToState" }],
    },
    // Spread array with state ref as trigger
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [ids, setIds] = useState([1, 2]);
          const newId = 3;
          setIds([...ids, newId]);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setIds" }, messageId: "noReferenceToState" }],
    },
    // additionalStateHooks — custom hook
    {
      code: tsx`
        function Component() {
          const [count, setCount] = useMyState(0);
          setCount(count + 1);
          return <div />;
        }
      `,
      errors: [{ data: { name: "setCount" }, messageId: "noReferenceToState" }],
      settings: {
        "react-x": {
          additionalStateHooks: "/^useMyState$/u",
        },
      },
    },
    // State ref via method call result
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setResult] = useState(["a", "b", "c"]);
          const target = "b";
          setResult(items.indexOf(target));
          return <div />;
        }
      `,
      errors: [{ data: { name: "setResult" }, messageId: "noReferenceToState" }],
    },
  ],
  valid: [
    // ── noReferenceToState (valid) ──────────────────────────────────
    // Callback form with objects
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "John", age: 25 });
          setUser(prev => ({ ...prev, age: 30 }));
          return <div />;
        }
      `,
    },
    // Callback form with arrays
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState(["a", "b"]);
          const newItem = "c";
          setItems(prev => [...prev, newItem]);
          return <div />;
        }
      `,
    },
    // Callback form with primitives
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const [open, setOpen] = useState(false);
          setCount(c => c + 1);
          setOpen(o => !o);
          return <div />;
        }
      `,
    },
    // Literal reset — empty object
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "John" });
          setUser({});
          return <div />;
        }
      `,
    },
    // Literal reset — full object
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "John", age: 25 });
          setUser({ name: "", age: 0 });
          return <div />;
        }
      `,
    },
    // Literal reset — empty array
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState(["a"]);
          setItems([]);
          return <div />;
        }
      `,
    },
    // Literal reset — populated array
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([{ id: 1 }]);
          setItems([{ id: 0, value: "" }]);
          return <div />;
        }
      `,
    },
    // Literal primitive
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const [open, setOpen] = useState(false);
          setCount(0);
          setOpen(true);
          return <div />;
        }
      `,
    },
    // Unrelated variable
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [user, setUser] = useState({ name: "John" });
          const newUserFromApi = { name: "Jane" };
          setUser(newUserFromApi);
          return <div />;
        }
      `,
    },
    // Function call result (no state ref)
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([]);
          setItems(getNewItems());
          return <div />;
        }
      `,
    },
    // Setter passed as callback — not called directly with state
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [items, setItems] = useState([]);
          someArray.map(setItems);
          return <div />;
        }
      `,
    },
    // Shadowed variable — inner scope count is not the state var
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          function inner() {
            const count = 5;
            setCount(count);
          }
          return <div />;
        }
      `,
    },
    // Multiple useState pairs — only flag when referencing own state
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const [total, setTotal] = useState(100);
          setCount(total);
          return <div />;
        }
      `,
    },
  ],
});

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    ["react-x"]?: Partial<ESLintReactSettings>;
  }
}
