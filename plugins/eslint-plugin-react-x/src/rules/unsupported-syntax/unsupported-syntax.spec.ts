import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./unsupported-syntax";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // eval cases
    {
      code: tsx`
        function Component({ code }) {
          const fact = eval(code);
          return <div>{fact}</div>;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        const Component = () => {
          const fact = eval("1 + 2");
          return <div>{fact}</div>;
        };
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function useMyHook(code) {
          const fact = eval(code);
          return fact;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function Component({ expression }) {
          const fact = eval(expression);
          return <div>Result: {fact}</div>;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function Component({ propName }) {
          const value = eval(\`props.\${propName}\`);
          return <div>{value}</div>;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function Component() {
          const a = eval("1");
          const b = eval("2");
          return <div>{a}{b}</div>;
        }
      `,
      errors: [
        {
          messageId: "eval",
        },
        {
          messageId: "eval",
        },
      ],
    },
    {
      code: tsx`
        function Component() {
          with (Math) {
            return <div>{sin(PI / 2)}</div>;
          }
        }
      `,
      errors: [{
        messageId: "with",
      }],
    },
    {
      code: tsx`
        function Component({ code }) {
          const fact = globalThis.eval(code);
          return <div>{fact}</div>;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function useMyHook(code) {
          const fact = globalThis.eval(code);
          return fact;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function Component() {
          const a = globalThis.eval("1");
          const b = globalThis.eval("2");
          return <div>{a}{b}</div>;
        }
      `,
      errors: [
        {
          messageId: "eval",
        },
        {
          messageId: "eval",
        },
      ],
    },
    {
      code: tsx`
        function Component({ code }) {
          const fact = (eval as Function)(code);
          return <div>{fact}</div>;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function Component({ code }) {
          const fact = (globalThis as any).eval(code);
          return <div>{fact}</div>;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
  ],
  valid: [
    // eval / with valid cases
    {
      code: tsx`
        function Component({ propName, props }) {
          const value = props[propName];
          return <div>{value}</div>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          return <div>{Math.sin(Math.PI / 2)}</div>;
        }
      `,
    },
    {
      code: tsx`
        function notAComponent() {
          const fact = eval("1 + 2");
          return fact;
        }
      `,
    },
    {
      code: tsx`
        const helper = () => {
          return eval("something");
        };
      `,
    },
    {
      code: tsx`
        function Component() {
          const handleClick = () => {
            eval("something");
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          useEffect(() => {
            eval("something");
          }, []);
          return <div>Content</div>;
        }
      `,
    },
    // IIFE valid cases — IIFEs are supported by React Compiler
    {
      code: tsx`
        function MyComponent() {
          return (
            <SomeJsx>
              <SomeMoreJsx />

              {(() => {
                const filteredThings = things.filter(callback);

                if (filteredThings.length === 0) {
                  return <Empty />;
                }

                return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
              })()}

              <SomeMoreJsx />
            </SomeJsx>
          );
        }
      `,
    },
    {
      code: tsx`
        function MyComponent() {
          return (
            <div>
              {(function() {
                return <span>hello</span>;
              })()}
            </div>
          );
        }
      `,
    },
    {
      code: tsx`
        function MyComponent() {
          return (
            <>
              {(() => {
                return <span>fragment child</span>;
              })()}
            </>
          );
        }
      `,
    },
    {
      code: tsx`
        function MyComponent() {
          const someThings = (() => {
            const filteredThings = things.filter(callback);

            if (filteredThings.length === 0) {
              return <Empty />;
            }

            return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
          })();

          return (
            <SomeJsx>
              <SomeMoreJsx />
              {someThings}
              <SomeMoreJsx />
            </SomeJsx>
          );
        }
      `,
    },
    {
      code: tsx`
        function MyComponent() {
          const someThings = useMemo(() => {
            const filteredThings = things.filter(callback);

            if (filteredThings.length === 0) {
              return <Empty />;
            }

            return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
          }, [things]);

          return (
            <SomeJsx>
              <SomeMoreJsx />
              {someThings}
              <SomeMoreJsx />
            </SomeJsx>
          );
        }
      `,
    },
    {
      code: tsx`
        function MyComponent() {
          const thingsList = useMemo(() => {
            const filteredThings = things.filter(callback);

            if (filteredThings.length === 0) {
              return <Empty />;
            }

            return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
          }, [things]);

          return (
            <SomeJsx>
              <SomeMoreJsx />
              {thingsList}
              <SomeMoreJsx />
            </SomeJsx>
          );
        }
      `,
    },
    {
      code: tsx`
        function MyComponent() {
          const thingsList = (() => {
            const filteredThings = things.filter(callback);

            if (filteredThings.length === 0) {
              return <Empty />;
            }

            return filteredThings.map((thing) => <Thing key={thing.id} data={thing} />);
          })();

          return (
            <SomeJsx>
              <SomeMoreJsx />
              {thingsList}
              <SomeMoreJsx />
            </SomeJsx>
          );
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const fn = () => <div />;
          return fn();
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const fns = [() => <div />, () => <span />];
          return fns[0]();
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const obj = { render: () => <div /> };
          return obj.render();
        }
      `,
    },
    {
      code: tsx`
        function Component() {
          const fact = (() => <div />) as any;
          return fact;
        }
      `,
    },
    // Computed property access is not statically resolved
    {
      code: tsx`
        function Component({ code }) {
          const fact = globalThis["eval"](code);
          return <div>{fact}</div>;
        }
      `,
    },
    // `globalThis[eval]` accesses the property keyed by the runtime value of `eval`, not eval itself
    {
      code: tsx`
        function Component({ code }) {
          const fact = globalThis[eval](code);
          return <div>{fact}</div>;
        }
      `,
    },
    // `.eval` on objects other than `globalThis` is not an eval call
    {
      code: tsx`
        function Component({ interpreter, code }) {
          const fact = interpreter.eval(code);
          return <div>{fact}</div>;
        }
      `,
    },
  ],
});
