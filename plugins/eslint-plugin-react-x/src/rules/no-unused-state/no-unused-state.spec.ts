import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-unused-state";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          return <div />;
        }
      `,
      errors: [{ messageId: "default", data: { name: "data" } }],
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            console.log(data);
          }, [data]);
          return <div />;
        }
      `,
      errors: [{ messageId: "default", data: { name: "data" } }],
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          useLayoutEffect(() => {
            console.log(data);
          }, [data]);
          return <div />;
        }
      `,
      errors: [{ messageId: "default", data: { name: "data" } }],
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(data + 1);
          }, [data]);
          return <div />;
        }
      `,
      errors: [{ messageId: "default", data: { name: "data" } }],
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            console.log(data);
          }, []);
          return <div />;
        }
      `,
      errors: [{ messageId: "default", data: { name: "data" } }],
    },
    {
      code: tsx`
        function Component() {
          const [a, setA] = useState(0);
          const [b, setB] = useState(0);
          useEffect(() => {
            console.log(a);
          }, [a]);
          return <div>{b}</div>;
        }
      `,
      errors: [{ messageId: "default", data: { name: "a" } }],
    },
  ],
  valid: [
    {
      code: tsx`
        function Component() {
          return null;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          return <div>{data}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          const handleClick = useCallback(() => {
            console.log(data);
          }, [data]);
          return <div onClick={handleClick} />;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          const memoized = useMemo(() => data * 2, [data]);
          return <div>{memoized}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          console.log(data);
          return <div />;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          if (data > 0) return <div>positive</div>;
          return <div />;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const [data, setData] = useState(0);
          return <Child data={data} />;
        }
      `,
    },
  ],
});
