import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./purity";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Component() {
          const id = Math.random();
          return <div key={id}>Content</div>;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "Math.random()" },
      }],
    },
    {
      code: tsx`
        function Component() {
          const timestamp = Date.now();
          return <div>Created at: {timestamp}</div>;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "Date.now()" },
      }],
    },
    {
      code: tsx`
        function Component() {
          const date = new Date();
          return <div>{date.toISOString()}</div>;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "new Date()" },
      }],
    },
    {
      code: tsx`
        function Component() {
          const id = crypto.randomUUID();
          return <div id={id}>Content</div>;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "crypto.randomUUID()" },
      }],
    },
    {
      code: tsx`
        function Component() {
          const t = performance.now();
          return <div>{t}</div>;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "performance.now()" },
      }],
    },
    {
      code: tsx`
        const Component = () => {
          const id = Math.random();
          return <div>{id}</div>;
        };
      `,
      errors: [{
        messageId: "default",
        data: { name: "Math.random()" },
      }],
    },
    {
      code: tsx`
        function Component() {
          const a = Math.random();
          const b = Date.now();
          return <div>{a}{b}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: { name: "Math.random()" },
        },
        {
          messageId: "default",
          data: { name: "Date.now()" },
        },
      ],
    },
    {
      code: tsx`
        function useMyHook() {
          const id = Math.random();
          return id;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "Math.random()" },
      }],
    },
    {
      code: tsx`
        function useTimestamp() {
          const t = Date.now();
          return t;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "Date.now()" },
      }],
    },
    {
      code: tsx`
        function useId() {
          const id = crypto.randomUUID();
          return id;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "crypto.randomUUID()" },
      }],
    },
    {
      code: tsx`
        function Clock() {
          return <div>Current time: {Date.now()}</div>;
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "Date.now()" },
      }],
    },
    {
      code: tsx`
        function Component() {
          const values = crypto.getRandomValues(new Uint8Array(16));
          return <div>{values}</div>;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: { name: "crypto.getRandomValues()" },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    {
      code: tsx`
        function Component() {
          const [id] = useState(() => crypto.randomUUID());
          return <div key={id}>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [time, setTime] = useState(() => Date.now());
          useEffect(() => {
            const interval = setInterval(() => {
              setTime(Date.now());
            }, 1000);
            return () => clearInterval(interval);
          }, []);
          return <div>Current time: {time}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          return (
            <button onClick={() => console.log(Math.random())}>
              Roll
            </button>
          );
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const handleClick = () => {
            const id = crypto.randomUUID();
            console.log(id);
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            const timestamp = Date.now();
            console.log(timestamp);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useLayoutEffect(() => {
            const t = performance.now();
            console.log(t);
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const callback = useCallback(() => {
            return Math.random();
          }, []);
          return <button onClick={callback}>Click</button>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const handleClick = function() {
            const date = new Date();
            console.log(date);
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    {
      code: tsx`
        function notAComponent() {
          const x = Math.random();
          return x;
        }
      `,
    },
    {
      code: tsx`
        const helper = () => {
          return Date.now();
        };
      `,
    },
    {
      code: tsx`
        function Component() {
          const sorted = [...items].sort();
          return <ul>{sorted.map(item => <li key={item}>{item}</li>)}</ul>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const value = useMemo(() => Math.random(), []);
          return <div>{value}</div>;
        }
      `,
    },
    {
      code: tsx`
        function useMyHook() {
          const [val] = useState(() => Math.random());
          return val;
        }
      `,
    },
    {
      code: tsx`
        function useMyHook() {
          useEffect(() => {
            const id = crypto.randomUUID();
            console.log(id);
          }, []);
        }
      `,
    },
    {
      code: tsx`
        class MyComponent extends React.Component {
          render() {
            return <div>{Math.random()}</div>;
          }
        }
      `,
    },
  ],
});
