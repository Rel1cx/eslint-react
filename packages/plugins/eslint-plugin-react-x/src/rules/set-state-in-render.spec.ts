import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
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
          messageId: "default",
          data: {
            name: "setCount",
          },
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
          messageId: "default",
          data: {
            name: "setCount",
          },
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
          messageId: "default",
          data: {
            name: "setCount",
          },
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
          messageId: "default",
          data: {
            name: "setCount",
          },
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
          messageId: "default",
          data: {
            name: "data[1]",
          },
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
          messageId: "default",
          data: {
            name: "setData",
          },
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
          messageId: "default",
          data: {
            name: "setData",
          },
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
          messageId: "default",
          data: {
            name: "setA",
          },
        },
        {
          messageId: "default",
          data: {
            name: "setB",
          },
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
          messageId: "default",
          data: {
            name: "setCount",
          },
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
          messageId: "default",
          data: {
            name: "setCount",
          },
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
          messageId: "default",
          data: {
            name: "setA",
          },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
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
  ],
});
