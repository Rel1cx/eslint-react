import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./unsupported-syntax";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // eval cases
    {
      code: tsx`
        function Component({ code }) {
          const result = eval(code);
          return <div>{result}</div>;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
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
        const Component = () => {
          const result = eval("1 + 2");
          return <div>{result}</div>;
        };
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function useMyHook(code) {
          const result = eval(code);
          return result;
        }
      `,
      errors: [{
        messageId: "eval",
      }],
    },
    {
      code: tsx`
        function Component({ expression }) {
          const result = eval(expression);
          return <div>Result: {result}</div>;
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
    // IIFE in JSX cases
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
      errors: [{
        messageId: "iife",
      }],
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
      errors: [{
        messageId: "iife",
      }],
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
      errors: [{
        messageId: "iife",
      }],
    },
    {
      code: tsx`
        function MyComponent() {
          return (
            <div>
              {(() => <span>a</span>)()}
              {(() => <span>b</span>)()}
            </div>
          );
        }
      `,
      errors: [
        {
          messageId: "iife",
        },
        {
          messageId: "iife",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
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
          const result = eval("1 + 2");
          return result;
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
    // IIFE valid cases — IIFE outside of JSX is allowed
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
  ],
});
