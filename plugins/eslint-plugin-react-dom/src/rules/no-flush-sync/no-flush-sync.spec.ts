import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-flush-sync";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        flushSync(() => {
          setSomething(123);
        });
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        import reactDom from 'react-dom';

        reactDom.flushSync(() => {
          setSomething(123);
        });
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // Different import styles
    {
      code: tsx`
        import * as ReactDOM from 'react-dom';

        ReactDOM.flushSync(() => {
          setSomething(123);
        });
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // In async function
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        async function handleUpdate() {
          await fetchData();
          flushSync(() => {
            updateUI();
          });
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // In event handler
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        function Component() {
          const handleClick = () => {
            flushSync(() => {
              setCount(1);
            });
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // In JSX event handler directly
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        function Component() {
          return (
            <button
              onClick={() => {
                flushSync(() => {
                  setCount(1);
                });
              }}
            >
              Click
            </button>
          );
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // Multiple calls
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        function update() {
          flushSync(() => setA(1));
          flushSync(() => setB(2));
          flushSync(() => setC(3));
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Nested calls
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        function update() {
          flushSync(() => {
            flushSync(() => {
              setSomething(123);
            });
          });
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // In useEffect
    {
      code: tsx`
        import { flushSync } from 'react-dom';
        import { useEffect } from 'react';

        function Component() {
          useEffect(() => {
            flushSync(() => {
              setSomething(123);
            });
          }, []);
          return <div />;
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // In class component method
    {
      code: tsx`
        import { flushSync } from 'react-dom';
        import { Component } from 'react';

        class MyComponent extends Component {
          handleUpdate = () => {
            flushSync(() => {
              this.setState({ value: 1 });
            });
          };

          render() {
            return <button onClick={this.handleUpdate}>Update</button>;
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // With callback result
    {
      code: tsx`
        import { flushSync } from 'react-dom';

        function getValue() {
          return flushSync(() => {
            return someValue;
          });
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // Local function named flushSync (detected due to simple text matching)
    {
      code: tsx`
        function flushSync(callback) {
          callback();
        }
        flushSync(() => {});
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // Object method named flushSync (detected due to simple text matching)
    {
      code: tsx`
        const obj = {
          flushSync() {}
        };
        obj.flushSync();
      `,
      errors: [
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    // Aliased import is not detected by this rule (limitation of simple text search)
    {
      code: tsx`
        import { flushSync as fs } from 'react-dom';

        fs(() => {
          setSomething(123);
        });
      `,
    },
  ],
});
