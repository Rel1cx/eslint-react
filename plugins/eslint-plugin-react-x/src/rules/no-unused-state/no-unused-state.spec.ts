import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
          useState(0);
          return <div />;
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
    // useState result not destructured (should not crash)
    {
      code: tsx`
        function Component() {
          return useState(0);
        }
      `,
    },
    // useState result assigned to a single variable (should not crash)
    {
      code: tsx`
        function Component() {
          const state = useState(0);
          return <div>{state[0]}</div>;
        }
      `,
    },
    // useState result passed to another call (should not crash)
    {
      code: tsx`
        function Component() {
          return foo(useState(0));
        }
      `,
    },
    // useState as arrow function implicit return should not crash
    {
      code: tsx`
        const Component = () => useState(0);
      `,
    },
    // useState in assignment expression (should not crash when parent is AssignmentExpression)
    {
      code: tsx`
        function Component() {
          let state;
          state = useState(0);
          return <div>{state[0]}</div>;
        }
      `,
    },
    // useState in conditional expression (should not crash when parent is ConditionalExpression)
    {
      code: tsx`
        function Component() {
          const x = condition ? useState(0) : null;
          return <div>{x}</div>;
        }
      `,
    },
    // useState in array expression (should not crash when parent is ArrayExpression)
    {
      code: tsx`
        function Component() {
          const arr = [useState(0)];
          return <div>{arr[0][0]}</div>;
        }
      `,
    },
  ],
});
