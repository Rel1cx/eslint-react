import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./refs";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Reading ref.current during render (useRef)
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          const value = ref.current;
          return <div>{value}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Writing ref.current during render (useRef)
    {
      code: tsx`
        function Component({ value }) {
          const ref = useRef(null);
          ref.current = value;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Reading ref.current during render (naming convention: ends with Ref)
    {
      code: tsx`
        function Component({ scrollRef }) {
          const offset = scrollRef.current;
          return <div>{offset}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Reading ref.current during render (naming convention: exactly "ref")
    {
      code: tsx`
        function Component({ ref }) {
          const el = ref.current;
          return <div>{el}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Writing ref.current during render (naming convention)
    {
      code: tsx`
        function Component({ buttonRef }) {
          buttonRef.current = document.createElement('button');
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Reading from a ref passed via JSX ref prop
    {
      code: tsx`
        function Component() {
          const myContainer = useRef(null);
          const width = myContainer.current?.offsetWidth;
          return <div ref={myContainer}>{width}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Reading ref.current in a hook during render
    {
      code: tsx`
        function useMyHook() {
          const ref = useRef(0);
          const value = ref.current;
          return value;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Writing ref.current in a hook during render
    {
      code: tsx`
        function useMyHook(value) {
          const ref = useRef(null);
          ref.current = value;
          return ref;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Both read and write during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          const prev = ref.current;
          ref.current = prev + 1;
          return <div>{prev}</div>;
        }
      `,
      errors: [
        { messageId: "readDuringRender" },
        { messageId: "writeDuringRender" },
      ],
    },
    // Reading in arrow function component
    {
      code: tsx`
        const Component = () => {
          const ref = useRef(null);
          const val = ref.current;
          return <div>{val}</div>;
        };
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // React.useRef
    {
      code: tsx`
        function Component() {
          const ref = React.useRef(null);
          const val = ref.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // React.createRef
    {
      code: tsx`
        function Component() {
          const ref = React.createRef();
          const val = ref.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // createRef
    {
      code: tsx`
        function Component() {
          const ref = createRef();
          const val = ref.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Reading ref.current in JSX expression
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          return <div>{ref.current}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Unconditional write not matching lazy init pattern
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          ref.current = 42;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Update expression (ref.current++)
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          ref.current++;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Reading ref.current via optional chaining during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const val = ref?.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Compound assignment (ref.current += 1)
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          ref.current += 1;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Compound assignment (ref.current -= 1)
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          ref.current -= 1;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Decrement expression (ref.current--)
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          ref.current--;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Pre-increment (++ref.current)
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          ++ref.current;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Reading ref.current as argument to a function call during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          console.log(ref.current);
          return <div />;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Reading ref.current passed as JSX prop
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          return <Child value={ref.current} />;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Reading ref.current in ternary during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          return <div>{ref.current ? "yes" : "no"}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Reading ref.current in logical expression during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const result = ref.current && ref.current.value;
          return <div>{result}</div>;
        }
      `,
      errors: [
        { messageId: "readDuringRender" },
        { messageId: "readDuringRender" },
      ],
    },
    // Reading ref.current in template literal during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const text = \`Value: \${ref.current}\`;
          return <div>{text}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Non-ref-named variable from useRef read during render
    {
      code: tsx`
        function Component() {
          const timer = useRef(0);
          const val = timer.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Ref in memo-wrapped component
    {
      code: tsx`
        const Component = memo(function Component() {
          const ref = useRef(null);
          const val = ref.current;
          return <div>{val}</div>;
        });
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Ref in forwardRef-wrapped component
    {
      code: tsx`
        const Component = forwardRef(function Component(props, outerRef) {
          const innerRef = useRef(null);
          const val = innerRef.current;
          return <div>{val}</div>;
        });
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Multiple refs both accessed during render
    {
      code: tsx`
        function Component() {
          const ref1 = useRef(null);
          const ref2 = useRef(null);
          const a = ref1.current;
          const b = ref2.current;
          return <div>{a}{b}</div>;
        }
      `,
      errors: [
        { messageId: "readDuringRender" },
        { messageId: "readDuringRender" },
      ],
    },
    // Multiple refs: one in effect (safe), one during render (unsafe)
    {
      code: tsx`
        function Component() {
          const ref1 = useRef(null);
          const ref2 = useRef(null);
          useEffect(() => {
            console.log(ref1.current);
          });
          const val = ref2.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Write inside non-null-check conditional (not lazy init)
    {
      code: tsx`
        function Component({ shouldUpdate }) {
          const ref = useRef(null);
          if (shouldUpdate) {
            ref.current = 42;
          }
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Read ref.current after lazy init block (the read itself is not inside the if body)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (ref.current === null) {
            ref.current = createThing();
          }
          return <div>{ref.current}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Ref read chained with property access during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const width = ref.current.offsetWidth;
          return <div>{width}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Ref read in JSX spread attribute during render
    {
      code: tsx`
        function Component() {
          const ref = useRef({ className: "foo" });
          return <div {...ref.current} />;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Hook writing ref during render with assignment from prop
    {
      code: tsx`
        function useSync(value) {
          const ref = useRef(value);
          ref.current = value;
          return ref;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Ref accessed via naming convention in arrow function with expression body
    {
      code: tsx`
        const Component = ({ myRef }) => <div>{myRef.current}</div>;
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Ref read in nullish coalescing during render
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const val = ref.current ?? "default";
          return <div>{val}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Write ref.current with nullish coalescing assignment
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          ref.current ??= createValue();
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Ref read in array destructuring during render
    {
      code: tsx`
        function Component() {
          const ref = useRef([1, 2, 3]);
          const [first] = ref.current;
          return <div>{first}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
    // Ref read passed to Object.keys during render
    {
      code: tsx`
        function Component() {
          const ref = useRef({});
          const keys = Object.keys(ref.current);
          return <div>{keys}</div>;
        }
      `,
      errors: [{
        messageId: "readDuringRender",
      }],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      const useOnce = <T,>(fn: () => T) => (useRef<{ value: T }>().current ??= { value: fn() }).value;
    `,
    tsx`
      import React from "react";

      const useOnce = <T,>(fn: () => T) => (React.useRef<{ value: T }>().current ??= { value: fn() }).value;
    `,
    // Read ref in effect
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useEffect(() => {
            if (ref.current) {
              console.log(ref.current.offsetWidth);
            }
          });
          return <div ref={ref} />;
        }
      `,
    },
    // Read ref in useLayoutEffect
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useLayoutEffect(() => {
            console.log(ref.current);
          }, []);
          return <div ref={ref} />;
        }
      `,
    },
    // Read ref in event handler (inline arrow)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          return (
            <button onClick={() => console.log(ref.current)}>
              Click
            </button>
          );
        }
      `,
    },
    // Read ref in event handler (named function)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const handleClick = () => {
            console.log(ref.current);
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    // Write ref in effect
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useEffect(() => {
            ref.current = document.getElementById('foo');
          }, []);
          return <div />;
        }
      `,
    },
    // Write ref in event handler
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          const handleClick = () => {
            ref.current = ref.current + 1;
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    // Use state for UI values (not a ref issue)
    {
      code: tsx`
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
    // Lazy initialization of ref value (classic pattern)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (ref.current === null) {
            ref.current = expensiveComputation();
          }
          const handleClick = () => {
            console.log(ref.current);
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    // Lazy initialization with == null
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (ref.current == null) {
            ref.current = createExpensiveThing();
          }
          return <div />;
        }
      `,
    },
    // Non-ref .current access (no ref naming, no useRef)
    {
      code: tsx`
        function Component() {
          const box = { current: 42 };
          const val = box.current;
          return <div>{val}</div>;
        }
      `,
    },
    // Non-ref .current access (object named differently)
    {
      code: tsx`
        function Component({ data }) {
          const val = data.current;
          return <div>{val}</div>;
        }
      `,
    },
    // Read ref in useCallback
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const callback = useCallback(() => {
            return ref.current;
          }, []);
          return <button onClick={callback}>Click</button>;
        }
      `,
    },
    // Read ref in useMemo callback
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const value = useMemo(() => {
            return ref.current?.value;
          }, []);
          return <div>{value}</div>;
        }
      `,
    },
    // Not a component or hook
    {
      code: tsx`
        function notAComponent() {
          const ref = useRef(0);
          const val = ref.current;
          return val;
        }
      `,
    },
    // Not a component (lowercase)
    {
      code: tsx`
        const helper = () => {
          const ref = useRef(null);
          return ref.current;
        };
      `,
    },
    // Class component (not handled by this rule)
    {
      code: tsx`
        class MyComponent extends React.Component {
          render() {
            return <div>{this.myRef.current}</div>;
          }
        }
      `,
    },
    // Ref access in a hook's effect
    {
      code: tsx`
        function useMyHook() {
          const ref = useRef(null);
          useEffect(() => {
            console.log(ref.current);
          }, []);
          return ref;
        }
      `,
    },
    // Ref access in nested function inside a hook
    {
      code: tsx`
        function useMyHook() {
          const ref = useRef(null);
          const getValue = () => ref.current;
          return getValue;
        }
      `,
    },
    // Lazy init with !== null (negated check, still valid pattern)
    {
      code: tsx`
        function Component() {
          const cacheRef = useRef(null);
          if (cacheRef.current !== null) {
            return <div>{cacheRef.current}</div>;
          }
          cacheRef.current = computeExpensiveValue();
          return <div />;
        }
      `,
    },
    // Ref in effect cleanup function
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useEffect(() => {
            ref.current = document.getElementById('target');
            return () => {
              ref.current = null;
            };
          }, []);
          return <div />;
        }
      `,
    },
    // Ref in deeply nested callbacks (effect → setTimeout → callback)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useEffect(() => {
            setTimeout(() => {
              console.log(ref.current);
            }, 100);
          }, []);
          return <div ref={ref} />;
        }
      `,
    },
    // Lazy init with reversed null operand order: `null === ref.current`
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (null === ref.current) {
            ref.current = createExpensiveThing();
          }
          return <div />;
        }
      `,
    },
    // Lazy init with `null == ref.current` (loose equality, reversed)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (null == ref.current) {
            ref.current = createExpensiveThing();
          }
          return <div />;
        }
      `,
    },
    // Inverted lazy init with != null and early return
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (ref.current != null) {
            return <div>{ref.current}</div>;
          }
          ref.current = computeValue();
          return <div />;
        }
      `,
    },
    // Ref in async callback defined inside component
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const handleClick = async () => {
            await fetch('/api');
            ref.current = document.getElementById('result');
          };
          return <button onClick={handleClick}>Load</button>;
        }
      `,
    },
    // Ref in useImperativeHandle callback
    {
      code: tsx`
        function Component(props, outerRef) {
          const inputRef = useRef(null);
          useImperativeHandle(outerRef, () => ({
            focus: () => inputRef.current?.focus(),
          }));
          return <input ref={inputRef} />;
        }
      `,
    },
    // Ref in useInsertionEffect callback
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useInsertionEffect(() => {
            ref.current = document.querySelector('.target');
          });
          return <div />;
        }
      `,
    },
    // Non-ref .current access via parameter with non-ref name
    {
      code: tsx`
        function Component({ config }) {
          const value = config.current;
          return <div>{value}</div>;
        }
      `,
    },
    // Non-ref .current access via parameter name "settings"
    {
      code: tsx`
        function Component({ settings }) {
          return <div>{settings.current}</div>;
        }
      `,
    },
    // Computed property access ref["current"] — not detected by the rule
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const val = ref["current"];
          return <div>{val}</div>;
        }
      `,
    },
    // Ref in function expression handler (not arrow)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const handleClick = function() {
            console.log(ref.current);
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    // Ref in forEach callback (treated as nested function)
    {
      code: tsx`
        function Component({ items }) {
          const ref = useRef([]);
          items.forEach((item) => {
            ref.current.push(item);
          });
          return <div />;
        }
      `,
    },
    // Ref in Array.map callback (nested function)
    {
      code: tsx`
        function Component({ items }) {
          const ref = useRef(new Map());
          return (
            <ul>
              {items.map((item) => {
                ref.current.set(item.id, item);
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          );
        }
      `,
    },
    // Non-ref-named variable from useRef in effect (no report)
    {
      code: tsx`
        function Component() {
          const timer = useRef(0);
          useEffect(() => {
            timer.current = setInterval(() => {}, 1000);
            return () => clearInterval(timer.current);
          }, []);
          return <div />;
        }
      `,
    },
    // Lazy init with non-consecutive siblings before the write
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (ref.current !== null) {
            return <div>{ref.current}</div>;
          }
          const config = getConfig();
          ref.current = createWithConfig(config);
          return <div />;
        }
      `,
    },
    // Lazy init: both read and write inside the if body
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (ref.current === null) {
            const value = expensiveComputation();
            ref.current = value;
          }
          return <div />;
        }
      `,
    },
    // Ref in Promise.then callback
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const handleClick = () => {
            fetch('/api')
              .then(() => {
                ref.current = document.getElementById('result');
              });
          };
          return <button onClick={handleClick}>Load</button>;
        }
      `,
    },
    // Ref in event handler with optional chaining read
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          return (
            <button onClick={() => ref.current?.focus()}>
              Focus
            </button>
          );
        }
      `,
    },
    // Ref write and read inside event handler
    {
      code: tsx`
        function Component() {
          const ref = useRef(0);
          const handleClick = () => {
            ref.current += 1;
            console.log(ref.current);
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    // Ref in a hook's returned callback
    {
      code: tsx`
        function useCounter() {
          const ref = useRef(0);
          const increment = () => {
            ref.current += 1;
            return ref.current;
          };
          return increment;
        }
      `,
    },
    // Ref access in nested arrow inside useLayoutEffect
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          useLayoutEffect(() => {
            const observer = new ResizeObserver(() => {
              console.log(ref.current?.getBoundingClientRect());
            });
            if (ref.current) observer.observe(ref.current);
            return () => observer.disconnect();
          }, []);
          return <div ref={ref} />;
        }
      `,
    },
    // Ref in memo-wrapped component with effect access
    {
      code: tsx`
        const Component = memo(function Component() {
          const ref = useRef(null);
          useEffect(() => {
            console.log(ref.current);
          }, []);
          return <div ref={ref} />;
        });
      `,
    },
    // Ref in forwardRef-wrapped component with effect access
    {
      code: tsx`
        const Component = forwardRef(function Component(props, outerRef) {
          const innerRef = useRef(null);
          useEffect(() => {
            console.log(innerRef.current);
          }, []);
          return <div ref={innerRef} />;
        });
      `,
    },
    // Multiple refs, all accessed safely in effects/handlers
    {
      code: tsx`
        function Component() {
          const ref1 = useRef(null);
          const ref2 = useRef(null);
          useEffect(() => {
            console.log(ref1.current, ref2.current);
          });
          return <div />;
        }
      `,
    },
    // Ref with naming convention accessed in event handler
    {
      code: tsx`
        function Component({ inputRef }) {
          return (
            <button onClick={() => inputRef.current?.focus()}>
              Focus
            </button>
          );
        }
      `,
    },
    // JSX ref prop identifier accessed in effect
    {
      code: tsx`
        function Component() {
          const myNode = useRef(null);
          useEffect(() => {
            if (myNode.current) {
              myNode.current.scrollIntoView();
            }
          }, []);
          return <div ref={myNode} />;
        }
      `,
    },
    // Ref read inside method shorthand (nested function)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const handlers = {
            click() {
              console.log(ref.current);
            },
          };
          return <button onClick={handlers.click}>Click</button>;
        }
      `,
    },
    // Ref inside generator function (nested function)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          function* gen() {
            yield ref.current;
          }
          return <div />;
        }
      `,
    },
    // Non-ref member expression with .current on call result (not Identifier object)
    {
      code: tsx`
        function Component() {
          const val = getConfig().current;
          return <div>{val}</div>;
        }
      `,
    },
    // Non-ref member expression with .current on array element (not Identifier object)
    {
      code: tsx`
        function Component({ items }) {
          const val = items[0].current;
          return <div>{val}</div>;
        }
      `,
    },
    // Ref in effect with conditional write
    {
      code: tsx`
        function Component({ enabled }) {
          const ref = useRef(null);
          useEffect(() => {
            if (enabled) {
              ref.current = document.getElementById('target');
            }
          }, [enabled]);
          return <div />;
        }
      `,
    },
    // Inverted lazy init with null on the left: `null !== ref.current`
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (null !== ref.current) {
            return <div>{ref.current}</div>;
          }
          ref.current = computeExpensiveValue();
          return <div />;
        }
      `,
    },
  ],
});
