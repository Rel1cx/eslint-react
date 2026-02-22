import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./use-memo";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // No return statement at all in block body
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo(() => {
            data.forEach(item => console.log(item));
          }, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [{ messageId: "missingReturnValue" }],
    },
    // Bare return (no value)
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo(() => {
            if (data) return;
          }, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [{ messageId: "missingReturnValue" }],
    },
    // All return paths are bare returns
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo(() => {
            if (data) return;
            return;
          }, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [{ messageId: "missingReturnValue" }],
    },
    // useMemo result not assigned to a variable (side-effect only, no return)
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ user }) {
          useMemo(() => {
            analytics.track("UserViewed", { userId: user.id });
          }, [user.id]);
          return <div />;
        }
      `,
      errors: [{ messageId: "notAssignedToVariable" }],
    },
    // useMemo result not assigned even though callback returns a value
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ user }) {
          useMemo(() => {
            return analytics.track("UserViewed", { userId: user.id });
          }, [user.id]);
          return <div />;
        }
      `,
      errors: [{ messageId: "notAssignedToVariable" }],
    },
    // FunctionExpression callback with no return
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ items }) {
          const result = useMemo(function() {
            items.forEach(item => console.log(item));
          }, [items]);
          return <div />;
        }
      `,
      errors: [{ messageId: "missingReturnValue" }],
    },
    // Multiple return statements but all are bare
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ flag }) {
          const value = useMemo(() => {
            if (flag) {
              return;
            }
            return;
          }, [flag]);
          return <div>{value}</div>;
        }
      `,
      errors: [{ messageId: "missingReturnValue" }],
    },
    // React namespace call not assigned
    {
      code: tsx`
        import React from "react";

        function Component({ user }) {
          React.useMemo(() => {
            analytics.track("UserViewed", { userId: user.id });
          }, [user.id]);
          return <div />;
        }
      `,
      errors: [{ messageId: "notAssignedToVariable" }],
    },
  ],
  valid: [
    ...allValid,
    // Arrow function with concise body (always returns)
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const sorted = useMemo(() => [...items].sort(), [items]);
        return <div>{sorted.join(", ")}</div>;
      }
    `,
    // Block body with explicit return value
    tsx`
      import { useMemo } from "react";

      function Component({ data }) {
        const processed = useMemo(() => {
          return data.map(item => item * 2);
        }, [data]);
        return <div>{processed}</div>;
      }
    `,
    // Block body returning object
    tsx`
      import { useMemo } from "react";

      function Component() {
        const [width, setWidth] = useState(undefined);
        const refItem = useMemo(() => {
          return { setWidth };
        }, []);
        return <div />;
      }
    `,
    // Arrow function returning JSX
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const elements = useMemo(() => items.map(item => <span key={item.id}>{item.name}</span>), [items]);
        return <div>{elements}</div>;
      }
    `,
    // Conditional return with value in all branches
    tsx`
      import { useMemo } from "react";

      function Component({ flag, a, b }) {
        const value = useMemo(() => {
          if (flag) return a;
          return b;
        }, [flag, a, b]);
        return <div>{value}</div>;
      }
    `,
    // FunctionExpression callback with return value
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const result = useMemo(function() {
          return items.filter(Boolean);
        }, [items]);
        return <div />;
      }
    `,
    // No useMemo in file — fast path
    tsx`
      function Component({ items }) {
        return <div>{items.length}</div>;
      }
    `,

    // React namespace call assigned to variable
    tsx`
      import React from "react";

      function Component({ items }) {
        const sorted = React.useMemo(() => [...items].sort(), [items]);
        return <div>{sorted.join(", ")}</div>;
      }
    `,
    // Arrow function with nested function that has no return — outer arrow still returns
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const handler = useMemo(() => {
          return () => {
            items.forEach(item => console.log(item));
          };
        }, [items]);
        return <button onClick={handler} />;
      }
    `,
    // Arrow function concise body returning another arrow
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const handler = useMemo(() => () => items.length, [items]);
        return <div onClick={handler} />;
      }
    `,
  ],
});
