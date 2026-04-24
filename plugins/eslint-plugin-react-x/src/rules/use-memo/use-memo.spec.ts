import tsx from "dedent";

import { ruleTester } from "../../../../../test";
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
    // Callback wrapped in TSAsExpression with no return value
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo((() => {
            data.forEach(item => console.log(item));
          }) as () => void, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [{ messageId: "missingReturnValue" }],
    },
    // Callback accepting parameters
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo((x) => x * 2, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [{ messageId: "callbackWithParameters" }],
    },
    // Callback accepting multiple parameters
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ a, b }) {
          const result = useMemo(function(x, y) {
            return x + y;
          }, [a, b]);
          return <div>{result}</div>;
        }
      `,
      errors: [{ messageId: "callbackWithParameters" }],
    },
    // Async callback
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo(async () => {
            return await fetch(data);
          }, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [{ messageId: "asyncOrGeneratorCallback" }],
    },
    // Generator callback
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo(function* () {
            yield data;
            return data;
          }, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [{ messageId: "asyncOrGeneratorCallback" }],
    },
    // Callback with both parameter and missing return
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ data }) {
          const processed = useMemo((x) => {
            console.log(x);
          }, [data]);
          return <div>{processed}</div>;
        }
      `,
      errors: [
        { messageId: "missingReturnValue" },
        { messageId: "callbackWithParameters" },
      ],
    },
    // React.useMemo async callback (from React Compiler fixtures)
    {
      code: tsx`
        function Component(a, b) {
          const x = React.useMemo(async () => {
            await a;
          }, []);
          return x;
        }
      `,
      errors: [
        { messageId: "asyncOrGeneratorCallback" },
        { messageId: "missingReturnValue" },
      ],
    },
    // useMemo with no return value — both useMemo and React.useMemo (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          const value = useMemo(() => {
            console.log('computing');
          }, []);
          const value2 = React.useMemo(() => {
            console.log('computing');
          }, []);
          return (
            <div>
              {value}
              {value2}
            </div>
          );
        }
      `,
      errors: [
        { messageId: "missingReturnValue" },
        { messageId: "missingReturnValue" },
      ],
    },
    // useMemo with bare return (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          const value = useMemo(() => {
            return;
          }, []);
          return <div>{value}</div>;
        }
      `,
      errors: [{ messageId: "missingReturnValue" }],
    },
    // useMemo result unused (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          useMemo(() => {
            return [];
          }, []);
          return <div />;
        }
      `,
      errors: [{ messageId: "notAssignedToVariable" }],
    },
    // useMemo callback with args (from React Compiler fixtures)
    {
      code: tsx`
        function Component(a, b) {
          const x = useMemo(c => a, []);
          return x;
        }
      `,
      errors: [{ messageId: "callbackWithParameters" }],
    },
  ],
  valid: [
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
    tsx`
      function A() {
        const x = useMemo(() => {
            return 1 + 1;
        }, []) as number;
        return x;
      }
    `,
    tsx`
      const use1 = () => useMemo(() => 1, []);
    `,
    // Parameterless callback
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const result = useMemo(() => items.length, [items]);
        return <div>{result}</div>;
      }
    `,
    // FunctionExpression with no parameters
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const result = useMemo(function() {
          return items.filter(Boolean);
        }, [items]);
        return <div>{result}</div>;
      }
    `,
    // Explicit null return (from React Compiler fixtures)
    tsx`
      function Component() {
        const value = useMemo(() => {
          return null;
        }, []);
        return <div>{value}</div>;
      }
    `,
    // If-else with multiple returns (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const x = useMemo(() => {
          if (props.cond) {
            return makeObject(props.a);
          }
          return makeObject(props.b);
        });
        return x;
      }
    `,
    // useMemo result used in logical expression (from React Compiler fixtures)
    tsx`
      import {useMemo} from 'react';
      function Component(props) {
        return (
          useMemo(() => {
            return [props.value];
          }) || []
        );
      }
    `,
  ],
});
