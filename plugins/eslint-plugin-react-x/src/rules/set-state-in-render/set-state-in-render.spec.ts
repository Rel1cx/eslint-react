import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./set-state-in-render";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { useState } from "react";

        function Component({ value }) {
          const [count, setCount] = useState(0);
          setCount(value);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          data: {
            name: "setCount",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState } from "react";

        function useHook({ value }) {
          const [count, setCount] = useState(0);
          setCount(value);
          return null;
        }
      `,
      errors: [
        {
          data: {
            name: "setCount",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          setCount(1);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          data: {
            name: "setCount",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          setCount(c => c + 1);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          data: {
            name: "setCount",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState } from "react";

        const Component = () => {
          const [count, setCount] = useState(0);
          setCount(1);
          return <div>{count}</div>;
        };
      `,
      errors: [
        {
          data: {
            name: "setCount",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const data = useState(0);
          data[1](1);
          return <div>{data[0]}</div>;
        }
      `,
      errors: [
        {
          data: {
            name: "data[1]",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useSta(0);
          setData(1);
          return null;
        }
      `,
      errors: [
        {
          data: {
            name: "setData",
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          additionalStateHooks: "useSta",
        },
      },
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useMyState(0);
          setData(1);
          return null;
        }
      `,
      errors: [
        {
          data: {
            name: "setData",
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          additionalStateHooks: "useMyState",
        },
      },
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [a, setA] = useState(0);
          const [b, setB] = useState(0);
          setA(1);
          setB(2);
          return <div>{a}{b}</div>;
        }
      `,
      errors: [
        {
          data: {
            name: "setA",
          },
          messageId: "default",
        },
        {
          data: {
            name: "setB",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState, memo } from "react";

        const Component = memo(function Component() {
          const [count, setCount] = useState(0);
          setCount(1);
          return <div>{count}</div>;
        });
      `,
      errors: [
        {
          data: {
            name: "setCount",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          setCount(1);
          if (count > 10) return null;
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          data: {
            name: "setCount",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [a, setA] = useState(0);
          const [b, setB] = useState(0);
          setA(1);
          if (a > 10) return null;
          setB(2);
          return <div>{a}{b}</div>;
        }
      `,
      errors: [
        {
          data: {
            name: "setA",
          },
          messageId: "default",
        },
      ],
    },
    // Aliased setState call (from React Compiler fixtures)
    // NOTE: The IMPL only flags the direct setState call (setX), not the alias
    // (aliased). The SPEC flags both because it tracks all references to the
    // state setter through HIR StoreLocal/LoadLocal propagation.
    {
      code: tsx`
        function Component(props) {
          const [x, setX] = useState(0);
          const aliased = setX;
          setX(1);
          aliased(2);
          return x;
        }
      `,
      errors: [
        { data: { name: "setX" }, messageId: "default" },
      ],
    },
    // Unbound state destructuring (hole in array pattern) (from React Compiler fixtures)
    {
      code: tsx`
        function Component(props) {
          let [, setState] = useState();
          setState(1);
          return props.foo;
        }
      `,
      errors: [{ data: { name: "setState" }, messageId: "default" }],
    },
    // setState after a loop (from React Compiler fixtures)
    {
      code: tsx`
        function Component(props) {
          const [state, setState] = useState(false);
          for (const _ of props) {
          }
          setState(true);
          return state;
        }
      `,
      errors: [{ data: { name: "setState" }, messageId: "default" }],
    },
  ],
  valid: [
    {
      code: tsx`
        import { useState } from "react";

        function Component({ items }) {
          const sorted = [...items].sort();
          return <ul>{sorted.map(item => <li key={item}>{item}</li>)}</ul>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function useHook() {
          const [count, setCount] = useState(0);
          const handleClick = () => {
            setCount(c => c + 1);
          };
          return null;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          return (
            <button onClick={() => setCount(count + 1)}>
              {count}
            </button>
          );
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ user }) {
          const name = user?.name || '';
          const email = user?.email || '';
          return <div>{name}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ items }) {
          const [isReverse, setIsReverse] = useState(false);
          const [selection, setSelection] = useState(null);
          const [prevItems, setPrevItems] = useState(items);
          if (items !== prevItems) {
            setPrevItems(items);
            setSelection(null);
          }
          return null;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ max }) {
          const [count, setCount] = useState(0);
          const increment = () => {
            setCount(current => Math.min(current + 1, max));
          };
          return <button onClick={increment}>{count}</button>;
        }
      `,
    },
    {
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          useEffect(() => {
            setCount(1);
          }, []);
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          useEffect(() => {
            const intervalId = setInterval(() => {
              setCount(c => c + 1);
            }, 1000);
            return () => clearInterval(intervalId);
          }, []);
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const handleClick = () => {
            setCount(c => c + 1);
          };
          return <button onClick={handleClick}>{count}</button>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const handleClick = function() {
            setCount(c => c + 1);
          };
          return <button onClick={handleClick}>{count}</button>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ value }) {
          const [count, setCount] = useState(0);
          if (value > 10) {
            setCount(value);
          }
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ value }) {
          const [count, setCount] = useState(0);
          const result = value > 10 ? setCount(value) : null;
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ value }) {
          const [count, setCount] = useState(0);
          value > 10 && setCount(value);
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ value }) {
          const [count, setCount] = useState(0);
          switch (value) {
            case 1:
              setCount(value);
              break;
          }
          return <div>{count}</div>;
        }
      `,
    },
    {
      code: tsx`
        function notAComponent() {
          return null;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(null);
          return (
            <form onSubmit={() => setData("submitted")}>
              <button type="submit">Submit</button>
            </form>
          );
        }
      `,
    },
    {
      code: tsx`
        import { useState, useCallback } from "react";

        function Component() {
          const [count, setCount] = useState(0);
          const increment = useCallback(() => {
            setCount(c => c + 1);
          }, []);
          return <button onClick={increment}>{count}</button>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ items }) {
          const [prevItems, setPrevItems] = useState(items);
          if (items === prevItems) return <div>same</div>;
          setPrevItems(items);
          return <div>changed</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ items }) {
          const [prevItems, setPrevItems] = useState(items);
          const [selection, setSelection] = useState(null);
          if (items === prevItems) return <div>same</div>;
          setPrevItems(items);
          setSelection(null);
          return <div>changed</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        function Component({ loading, data }) {
          const [value, setValue] = useState(null);
          if (loading) return <div>Loading...</div>;
          if (!data) return null;
          setValue(data.value);
          return <div>{value}</div>;
        }
      `,
    },
    {
      code: tsx`
        import { useState } from "react";

        const Component = ({ items }) => {
          const [prevItems, setPrevItems] = useState(items);
          if (items === prevItems) return <div>same</div>;
          setPrevItems(items);
          return <div>changed</div>;
        };
      `,
    },
    // setState inside lambda called during render (from React Compiler fixtures)
    // NOTE: The IMPL does not flag this because setState is inside a nested function.
    // The rule only checks if the CallExpression is directly in a conditional/event handler.
    // The SPEC flags it because the lambda is invoked synchronously during render.
    {
      code: tsx`
        function Component(props) {
          const [x, setX] = useState(0);
          const foo = () => {
            setX(1);
          };
          foo();
          return [x];
        }
      `,
    },
    // setState inside nested lambdas called during render (from React Compiler fixtures)
    {
      code: tsx`
        function Component(props) {
          const [x, setX] = useState(0);
          const foo = () => {
            setX(1);
          };
          const bar = () => {
            foo();
          };
          const baz = () => {
            bar();
          };
          baz();
          return [x];
        }
      `,
    },
    // Uncalled callback with setState inside switch (from React Compiler fixtures)
    {
      code: tsx`
        function Component(props) {
          const [currentStep, setCurrentStep] = useState(0);
          const onSubmit = errorEvent => {
            setCurrentStep(1);
          };
          switch (currentStep) {
            case 0:
              return <div />;
            case 1:
              return <div onSubmit={onSubmit} />;
            default:
              return <div />;
          }
        }
      `,
    },
    // Nested lambda with conditional setState call chain (from React Compiler fixtures)
    {
      code: tsx`
        function Component(props) {
          const [x, setX] = useState(0);
          const foo = () => {
            setX(1);
          };
          const bar = () => {
            if (props.cond) {
              foo();
            }
          };
          const baz = () => {
            bar();
          };
          baz();
          return [x];
        }
      `,
    },
  ],
});
