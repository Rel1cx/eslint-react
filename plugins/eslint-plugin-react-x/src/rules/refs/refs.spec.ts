import tsx from "dedent";

import { ruleTester } from "../../../../../test";
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
    // Write through TSNonNullExpression during render should report writeDuringRender
    {
      code: tsx`
        function Component() {
          const ref = useRef<number | null>(null);
          ref.current! = 42;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Write through TSAsExpression during render should report writeDuringRender
    {
      code: tsx`
        function Component() {
          const ref = useRef<number | null>(null);
          (ref.current as number) = 42;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Write through TSNonNullExpression on the ref object itself
    {
      code: tsx`
        function Component() {
          const ref = useRef<number | null>(null);
          ref!.current = 42;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Write through TSAsExpression on the ref object itself
    {
      code: tsx`
        function Component() {
          const ref = useRef<number | null>(null);
          (ref as any).current = 42;
          return <div />;
        }
      `,
      errors: [{
        messageId: "writeDuringRender",
      }],
    },
    // Alias tracking: direct alias read
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const alias = ref;
          const val = alias.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    // Alias tracking: chained alias read
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const a = ref;
          const b = a;
          const val = b.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    // Alias tracking: alias write
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const alias = ref;
          alias.current = 42;
          return <div />;
        }
      `,
      errors: [{ messageId: "writeDuringRender" }],
    },
    // Alias tracking: reassignment alias read
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          let alias = null;
          alias = ref;
          const val = alias.current;
          return <div>{val}</div>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    // Ref passed to function
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          someFn(ref);
          return <div />;
        }
      `,
      errors: [{ messageId: "refPassedToFunction" }],
    },
    // Ref passed to console.log
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          console.log(ref);
          return <div />;
        }
      `,
      errors: [{ messageId: "refPassedToFunction" }],
    },
    // Ref passed to function via alias
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const alias = ref;
          someFn(alias);
          return <div />;
        }
      `,
      errors: [{ messageId: "refPassedToFunction" }],
    },
    // Ported from react-main/compiler/.../error.invalid-access-ref-during-render.js
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          const value = ref.current;
          return value;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    // Ported from react-main/compiler/.../error.invalid-disallow-mutating-ref-in-render.js
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          ref.current = false;
          return <button ref={ref} />;
        }
      `,
      errors: [{ messageId: "writeDuringRender" }],
    },
    // Ported from react-main/compiler/.../error.invalid-pass-ref-to-function.js
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          const x = foo(ref);
          return x;
        }
      `,
      errors: [{ messageId: "refPassedToFunction" }],
    },
    // Ported from react-main/compiler/.../error.invalid-ref-access-render-unary.js
    {
      code: tsx`
        function Component() {
          const r = useRef(null);
          const current = !r.current;
          return <div>{current}</div>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    // Ported from react-main/compiler/.../error.invalid-write-ref-prop-in-render.js
    {
      code: tsx`
        function Component(props) {
          const ref = props.ref;
          ref.current = true;
          return <div />;
        }
      `,
      errors: [{ messageId: "writeDuringRender" }],
    },
    // Ported from react-main/compiler/.../error.invalid-ref-value-as-props.js
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          return <Foo ref={ref.current} />;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    // Ported from react-main/compiler/.../error.ref-initialization-nonif.js
    // Hoisted guard variable does NOT protect the ref write
    {
      code: tsx`
        function Component() {
          const r = useRef(null);
          const guard = r.current == null;
          if (guard) {
            r.current = 1;
          }
          return <div />;
        }
      `,
      errors: [
        { messageId: "readDuringRender" },
        { messageId: "writeDuringRender" },
      ],
    },
    // Ported from react-main/compiler/.../error.ref-initialization-other.js
    // Guard on one ref does NOT protect writing a different ref
    {
      code: tsx`
        function Component() {
          const r = useRef(null);
          const r2 = useRef(null);
          if (r.current == null) {
            r2.current = 1;
          }
          return <div />;
        }
      `,
      errors: [{ messageId: "writeDuringRender" }],
    },
    // -------------------------------------------------------------------------
    // FIXME: React Compiler catches these, but ESLint refs rule does not yet
    // -------------------------------------------------------------------------
    // FIXME: error.invalid-ref-in-callback-invoked-during-render
    // Synchronous callbacks (map/forEach) execute during render but are skipped
    // because the rule treats all nested functions as safe.
    /*
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          const renderItem = item => {
            const current = ref.current;
            return <Foo item={item} current={current} />;
          };
          return <Items>{props.items.map(item => renderItem(item))}</Items>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    */
    // FIXME: error.invalid-access-ref-in-state-initializer
    // State initializer callbacks are treated as nested functions and skipped.
    /*
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(props.value);
          const [state] = useState(() => ref.current);
          return <Stringify state={state} />;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    */
    // FIXME: error.invalid-access-ref-in-reducer
    // Reducer initializer callbacks are treated as nested functions and skipped.
    /*
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(props.value);
          const [state] = useReducer(() => ref.current, null);
          return <Stringify state={state} />;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    */
    // FIXME: error.invalid-read-ref-prop-in-render-property-load
    // The rule only supports Identifier.current, not MemberExpression.current.
    /*
    {
      code: tsx`
        function Component(props) {
          const value = props.ref.current;
          return <div>{value}</div>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    */
    // FIXME: error.invalid-disallow-mutating-refs-in-render-transitive
    // Requires recursive analysis of nested functions to detect readRefEffect.
    /*
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const setRef = () => {
            ref.current = false;
          };
          const changeRef = setRef;
          changeRef();
          return <button ref={ref} />;
        }
      `,
      errors: [{ messageId: "writeDuringRender" }],
    },
    */
    // FIXME: error.invalid-aliased-ref-in-callback-invoked-during-render
    // Alias inside synchronous callback; skipped due to nested-function blind spot.
    /*
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          const renderItem = item => {
            const aliasedRef = ref;
            const current = aliasedRef.current;
            return <Foo item={item} current={current} />;
          };
          return <Items>{props.items.map(item => renderItem(item))}</Items>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    */
    // FIXME: error.invalid-access-ref-in-render-mutate-object-with-ref-function
    // Object method that reads ref, then called directly in render.
    /*
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const object = {};
          object.foo = () => ref.current;
          const refValue = object.foo();
          return <div>{refValue}</div>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    */
    // Computed property access ref["current"]
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const val = ref["current"];
          return <div>{val}</div>;
        }
      `,
      errors: [{ messageId: "readDuringRender" }],
    },
    // Computed property write ref["current"] = value
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          ref["current"] = 42;
          return <div />;
        }
      `,
      errors: [{ messageId: "writeDuringRender" }],
    },
    // Nested property write and read (from React Compiler fixtures)
    // NOTE: The IMPL reports readDuringRender for ref.current.inner = ...
    // because it only tracks direct .current assignment, not nested property writes.
    {
      code: tsx`
        function Component(props) {
          const ref = useRef({inner: null});
          ref.current.inner = props.value;
          return ref.current.inner;
        }
      `,
      errors: [
        { messageId: "readDuringRender" },
        { messageId: "readDuringRender" },
      ],
    },
    // Inferred ref (name ends with Ref but not from useRef) (from React Compiler fixtures)
    {
      code: tsx`
        function Example() {
          const fooRef = makeObject_Primitives();
          fooRef.current = true;
          return <Stringify foo={fooRef} />;
        }
      `,
      errors: [{ messageId: "writeDuringRender" }],
    },
  ],
  valid: [
    // Initialize only once on first use with nullish coalescing assignment is valid pattern
    tsx`
      const useOnce = <T,>(fn: () => T) => (useRef<{ value: T }>().current ??= { value: fn() }).value;
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
    // Ref in deeply nested callbacks (effect -> setTimeout -> callback)
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
    // Write through TSNonNullExpression in event handler is valid
    {
      code: tsx`
        function Component() {
          const ref = useRef<HTMLElement>(null);
          const handleClick = () => {
            ref.current! = document.getElementById('foo')!;
          };
          return <button onClick={handleClick}>Click</button>;
        }
      `,
    },
    // Lazy init with TSNonNullExpression in null check
    {
      code: tsx`
        function Component() {
          const ref = useRef<ExpensiveThing | null>(null);
          if ((ref.current as ExpensiveThing | null) === null) {
            ref.current = createExpensiveThing();
          }
          return <div />;
        }
      `,
    },
    // Lazy init with TSAsExpression on the ref object itself
    {
      code: tsx`
        function Component() {
          const ref = useRef<ExpensiveThing | null>(null);
          if ((ref as any).current === null) {
            (ref as any).current = createExpensiveThing();
          }
          return <div />;
        }
      `,
    },
    // Alias of non-ref object should not be flagged
    {
      code: tsx`
        function Component() {
          const box = { current: 42 };
          const alias = box;
          const val = alias.current;
          return <div>{val}</div>;
        }
      `,
    },
    // Ref passed to mergeRefs is allowed
    {
      code: tsx`
        function Component() {
          const ref1 = useRef(null);
          const ref2 = useRef(null);
          const merged = mergeRefs(ref1, ref2);
          return <div ref={merged} />;
        }
      `,
    },
    // Ref passed in nested function (event handler) is allowed
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const handler = () => {
            someFn(ref);
          };
          return <button onClick={handler}>Click</button>;
        }
      `,
    },
    // Ported from react-main/compiler/.../allow-ref-initialization.js
    {
      code: tsx`
        function Component() {
          const r = useRef(null);
          if (r.current == null) {
            r.current = 1;
          }
          return <div />;
        }
      `,
    },
    // Ported from react-main/compiler/.../allow-ref-lazy-initialization-with-logical.js
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          if (ref.current == null) {
            ref.current = props.unknownKey ?? props.value;
          }
          return <div />;
        }
      `,
    },
    // Ported from react-main/compiler/.../allow-mutating-ref-in-callback-passed-to-jsx.tsx
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const onClick = () => {
            if (ref.current !== null) {
              ref.current = "";
            }
          };
          return (
            <>
              <input ref={ref} />
              <button onClick={onClick} />
            </>
          );
        }
      `,
    },
    // -------------------------------------------------------------------------
    // FIXME: React Compiler allows these, but ESLint refs rule may false-positive
    // -------------------------------------------------------------------------
    // FIXME: allow-passing-ref-to-render-helper
    // Ref passed to a render helper inside JSX child interpolation.
    // React Compiler permits this because the helper is component-like.
    // ESLint rule reports refPassedToFunction for any non-hook CallExpression.
    /*
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          return <Foo>{props.render(ref)}</Foo>;
        }
      `,
    },
    */
    // Guard pattern: !ref.current allows lazy initialization
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (!ref.current) {
            ref.current = computeExpensiveValue();
          }
          return <div />;
        }
      `,
    },
    // Guard pattern: !(ref.current === null) allows lazy initialization
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          if (!(ref.current === null)) {
            return <div>already initialized</div>;
          }
          ref.current = computeExpensiveValue();
          return <div />;
        }
      `,
    },
    // Lazy initialization with logical expression (from React Compiler fixtures)
    {
      code: tsx`
        function Component(props) {
          const ref = useRef(null);
          if (ref.current == null) {
            ref.current = props.unknownKey ?? props.value;
          }
          return <Child ref={ref} />;
        }
      `,
    },
    // Mutating ref property in callback passed to JSX (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const onClick = () => {
            if (ref.current !== null) {
              ref.current.value = '';
            }
          };
          return (
            <>
              <input ref={ref} />
              <button onClick={onClick} />
            </>
          );
        }
      `,
    },
    // Indirect ref access via useCallback + useEffect (from React Compiler fixtures)
    {
      code: tsx`
        function Component() {
          const ref = useRef(null);
          const setRef = useCallback(() => {
            ref.current = 'Ok';
          }, []);
          useEffect(() => {
            setRef();
          }, []);
          return <Child ref={ref} />;
        }
      `,
    },
    // Prefix/postfix operators on ref.current inside callbacks (from React Compiler fixtures)
    {
      code: tsx`
        function useFoo() {
          const count = useRef(0);
          const updateCountPostfix = () => {
            const id = count.current++;
            return id;
          };
          const updateCountPrefix = () => {
            const id = ++count.current;
            return id;
          };
          useEffect(() => {
            const id = updateCountPostfix();
            console.log(\`id = \${id}\`);
            console.log(\`count = \${count.current}\`);
          }, []);
          return {count, updateCountPostfix, updateCountPrefix};
        }
      `,
    },
  ],
});
