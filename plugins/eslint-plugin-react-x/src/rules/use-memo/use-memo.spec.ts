import tsx from "dedent";

import { ruleTester } from "#/test";
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
      errors: [{ messageId: "mustReturnAValue" }],
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
      errors: [{ messageId: "mustReturnAValue" }],
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
      errors: [{ messageId: "mustReturnAValue" }],
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
      errors: [{ messageId: "resultMustBeUsed" }],
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
      errors: [{ messageId: "resultMustBeUsed" }],
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
      errors: [{ messageId: "mustReturnAValue" }],
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
      errors: [{ messageId: "mustReturnAValue" }],
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
      errors: [{ messageId: "resultMustBeUsed" }],
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
      errors: [{ messageId: "mustReturnAValue" }],
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
      errors: [{ messageId: "noParameters" }],
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
      errors: [{ messageId: "noParameters" }],
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
      errors: [{ messageId: "noAsyncOrGeneratorFunctions" }],
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
      errors: [{ messageId: "noAsyncOrGeneratorFunctions" }],
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
        { messageId: "mustReturnAValue" },
        { messageId: "noParameters" },
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
        { messageId: "noAsyncOrGeneratorFunctions" },
        { messageId: "mustReturnAValue" },
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
        { messageId: "mustReturnAValue" },
        { messageId: "mustReturnAValue" },
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
      errors: [{ messageId: "mustReturnAValue" }],
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
      errors: [{ messageId: "resultMustBeUsed" }],
    },
    // useMemo callback with args (from React Compiler fixtures)
    {
      code: tsx`
        function Component(a, b) {
          const x = useMemo(c => a, []);
          return x;
        }
      `,
      errors: [{ messageId: "noParameters" }],
    },
    // Rule 3: Reassigning outer variable (from React Compiler fixtures)
    {
      code: tsx`
        import { useMemo } from "react";

        function Component() {
          let x;
          const y = useMemo(() => {
            let z;
            x = [];
            z = true;
            return z;
          }, []);
          return [x, y];
        }
      `,
      errors: [{ messageId: "noReassigningOuterVariables" }],
    },
    // Rule 3: Reassigning outer variable with compound assignment
    {
      code: tsx`
        import { useMemo } from "react";

        function Component() {
          let count = 0;
          const value = useMemo(() => {
            count += 1;
            return count;
          }, []);
          return <div>{value}</div>;
        }
      `,
      errors: [{ messageId: "noReassigningOuterVariables" }],
    },
    // Rule 3: Reassigning outer variable inside conditional
    {
      code: tsx`
        import { useMemo } from "react";

        function Component({ flag }) {
          let x = 0;
          const value = useMemo(() => {
            if (flag) {
              x = 1;
            }
            return x;
          }, [flag]);
          return <div>{value}</div>;
        }
      `,
      errors: [{ messageId: "noReassigningOuterVariables" }],
    },
    // Rule 3: Reassigning outer variable alongside other violations
    // Errors are sorted by source position: mustReturnAValue (on callbackArg) comes
    // before noParameters (on firstParam) which comes before noReassigningOuterVariables
    // (on the outer variable inside the callback body).
    {
      code: tsx`
        import { useMemo } from "react";

        function Component() {
          let outer;
          const y = useMemo((param) => {
            outer = param;
          }, []);
          return [outer, y];
        }
      `,
      errors: [
        { messageId: "mustReturnAValue" },
        { messageId: "noParameters" },
        { messageId: "noReassigningOuterVariables" },
      ],
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
    // Callback wrapped in TSAsExpression with return value
    tsx`
      import { useMemo } from "react";
      function Component({ data }) {
        const processed = useMemo((() => {
          return heavyCompute(data);
        }) as () => number, [data]);
        return <div>{processed}</div>;
      }
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
    // Rule 3 valid: Reassigning local variable inside useMemo callback
    tsx`
      import { useMemo } from "react";

      function Component() {
        const y = useMemo(() => {
          let z;
          z = true;
          return z;
        }, []);
        return y;
      }
    `,
    // Rule 3 valid: Reading outer variables without reassigning
    tsx`
      import { useMemo } from "react";

      function Component({ a, b }) {
        const sum = useMemo(() => a + b, [a, b]);
        return <div>{sum}</div>;
      }
    `,
    // Rule 3 valid: Nested function reassigning its own local variable
    tsx`
      import { useMemo } from "react";

      function Component() {
        const value = useMemo(() => {
          const helper = () => {
            let y;
            y = 5;
            return y;
          };
          return helper();
        }, []);
        return <div>{value}</div>;
      }
    `,
    // useMemo with switch statement and returns (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const x = useMemo(() => {
          let y;
          switch (props.switch) {
            case 'foo': {
              return 'foo';
            }
            case 'bar': {
              y = 'bar';
              break;
            }
            default: {
              y = props.y;
            }
          }
          return y;
        });
        return x;
      }
    `,
    // useMemo with switch statement and no fallthrough (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const x = useMemo(() => {
          switch (props.key) {
            case 'key': {
              return props.value;
            }
            default: {
              return props.defaultValue;
            }
          }
        });
        return x;
      }
    `,
    // useMemo with labeled statement and unconditional return (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const x = useMemo(() => {
          label: {
            return props.value;
          }
        });
        return x;
      }
    `,
    // useMemo with nested ifs and return (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const x = useMemo(() => {
          if (props.cond) {
            if (props.cond) {
              return props.value;
            }
          }
        }, [props.cond]);
        return x;
      }
    `,
    // useMemo with logical expression concise body (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const x = useMemo(() => props.a && props.b);
        return x;
      }
    `,
    // useMemo with multiple if-else and return (from React Compiler fixtures)
    tsx`
      import {useMemo} from 'react';

      function Component(props) {
        const x = useMemo(() => {
          let y = [];
          if (props.cond) {
            y.push(props.a);
          }
          if (props.cond2) {
            return y;
          }
          y.push(props.b);
          return y;
        });
        return x;
      }
    `,
    // useMemo with multiple returns in loop (from React Compiler fixtures)
    tsx`
      function Component({items}) {
        const value = useMemo(() => {
          for (let item of items) {
            if (item.match) return item;
          }
          return null;
        }, [items]);
        return <div>{value}</div>;
      }
    `,
    // useMemo with inverted if (labeled block with break) (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const x = useMemo(() => {
          label: {
            if (props.cond) {
              break label;
            }
            return props.a;
          }
          return props.b;
        });
        return x;
      }
    `,
    // Consecutive useMemo calls in hook (from React Compiler fixtures)
    tsx`
      import {useMemo} from 'react';

      function useHook({a, b}) {
        const valA = useMemo(() => identity({a}), [a]);
        const valB = useMemo(() => identity([b]), [b]);
        return [valA, valB];
      }
    `,
    // useMemo returning independently memoizeable array (from React Compiler fixtures)
    tsx`
      function Component(props) {
        const [a, b] = useMemo(() => {
          const items = [];
          const a = makeObject(props.a);
          const b = makeObject(props.b);
          return [a, b];
        });
        return [a, b];
      }
    `,
    // React.useMemo returning object with destructured value (from React Compiler fixtures)
    tsx`
      function useInputValue(input) {
        const object = React.useMemo(() => {
          const {value} = identity(input);
          return {value};
        }, [input]);
        return object;
      }
    `,
    // useMemo with inlining block return (from React Compiler fixtures)
    tsx`
      function component(a, b) {
        let x = useMemo(() => {
          if (a) {
            return {b};
          }
        }, [a, b]);
        return x;
      }
    `,
    // useMemo with identifier callback (not a function expression) (from React Compiler fixtures)
    tsx`
      import {useMemo} from 'react';

      function Component() {
        const x = useMemo(makeArray, []);
        return x;
      }
    `,
    // useMemo as the right-hand side of a for...of loop
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const list = useMemo(() => items, [items]);
        for (const item of list) {
          console.log(item);
        }
        return <div />;
      }
    `,
    // useMemo as the right-hand side of a for...in loop
    tsx`
      import { useMemo } from "react";

      function Component({ obj }) {
        const keys = useMemo(() => Object.keys(obj), [obj]);
        for (const key of keys) {
          console.log(key);
        }
        return <div />;
      }
    `,
    // Inline useMemo as the right-hand side of a for...of/for...in loop.
    // This usage pattern is uncommon in practice but is included for rule completeness.
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        for (const item of useMemo(() => items, [items])) {
          console.log(item);
        }
        return <div />;
      }
    `,
    // This usage pattern is uncommon in practice but is included for rule completeness.
    tsx`
      import { useMemo } from "react";

      function Component({ obj }) {
        for (const key of useMemo(() => Object.keys(obj), [obj])) {
          console.log(key);
        }
        return <div />;
      }
    `,
    // Rule 3 valid: Property mutation is not outer variable reassignment
    tsx`
      import { useMemo, useRef } from "react";

      function Component() {
        const ref = useRef(0);
        const value = useMemo(() => {
          ref.current = 0;
          return ref.current;
        }, []);
        return <div>{value}</div>;
      }
    `,
    // Rule 3 valid: Reassigning block-scoped variable inside for…of loop (issue #1734)
    tsx`
      import { useMemo } from "react";

      function Component({ columns }) {
        const widths = useMemo(() => {
          const result = [];
          for (const column of columns) {
            let width = column.defaultWidth;
            if (typeof width === "number") {
              width = Math.min(width, column.maxWidth);
            } else {
              width = column.minWidth;
            }
            result.push(width);
          }
          return result;
        }, [columns]);
        return <div>{widths.join(", ")}</div>;
      }
    `,
    // Rule 3 valid: Reassigning block-scoped variable inside for loop
    tsx`
      import { useMemo } from "react";

      function Component({ items }) {
        const sum = useMemo(() => {
          let total = 0;
          for (let i = 0; i < items.length; i++) {
            let value = items[i];
            value = value * 2;
            total += value;
          }
          return total;
        }, [items]);
        return <div>{sum}</div>;
      }
    `,
    // Rule 3 valid: Reassigning block-scoped variable inside if block
    tsx`
      import { useMemo } from "react";

      function Component({ flag, a, b }) {
        const value = useMemo(() => {
          if (flag) {
            let temp = a;
            temp = temp + 1;
            return temp;
          }
          return b;
        }, [flag, a, b]);
        return <div>{value}</div>;
      }
    `,
    // Rule 3 valid: Reassigning block-scoped variable inside switch case
    tsx`
      import { useMemo } from "react";

      function Component({ type, value }) {
        const result = useMemo(() => {
          switch (type) {
            case "number": {
              let n = value;
              n = n * 2;
              return n;
            }
            default: {
              return value;
            }
          }
        }, [type, value]);
        return <div>{result}</div>;
      }
    `,
  ],
});
