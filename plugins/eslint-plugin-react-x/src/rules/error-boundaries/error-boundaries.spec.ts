import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./error-boundaries";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Parent() {
          try {
            return <ChildComponent />;
          } catch (error) {
            return <div>Error occurred</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        function Parent() {
          try {
            return (
              <div>
                <ChildComponent />
              </div>
            );
          } catch (error) {
            return <div>Error occurred</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        function Parent() {
          try {
            return <>{children}</>;
          } catch (error) {
            return null;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        function Parent() {
          try {
            return condition ? <Child /> : <Other />;
          } catch (error) {
            return <div>Error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        function Parent() {
          try {
            return condition && <Child />;
          } catch (error) {
            return <div>Error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        const Parent = () => {
          try {
            return <ChildComponent />;
          } catch (error) {
            return <div>Error occurred</div>;
          }
        };
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        const Parent = function Parent() {
          try {
            return <ChildComponent />;
          } catch (error) {
            return <div>Error occurred</div>;
          }
        };
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        function Parent() {
          if (condition) {
            try {
              return <Child />;
            } catch (error) {
              return <div>Error</div>;
            }
          }
          return <div />;
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        function Parent() {
          try {
            if (condition) {
              return <Child />;
            }
            return <Other />;
          } catch (error) {
            return <div>Error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        function Component({ promise }) {
          try {
            const data = use(promise);
            return <div>{data}</div>;
          } catch (error) {
            return <div>Failed to load</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithUse" }],
    },
    {
      code: tsx`
        function Component({ promise }) {
          try {
            const data = use(promise);
          } catch (error) {
            console.error(error);
          }
          return <div />;
        }
      `,
      errors: [{ messageId: "tryCatchWithUse" }],
    },
    {
      code: tsx`
        function Component({ promise }) {
          try {
            const data = React.use(promise);
            return <div>{data}</div>;
          } catch (error) {
            return <div>Failed</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithUse" }],
    },
    {
      code: tsx`
        function Component() {
          try {
            return use(promise);
          } catch (error) {
            return null;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithUse" }],
    },
    {
      code: tsx`
        function Parent() {
          try {
            switch (type) {
              case 'a':
                return <ComponentA />;
              case 'b':
                return <ComponentB />;
            }
          } catch (error) {
            return <div>Error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    {
      code: tsx`
        export function MyComponent() {
          let x;
          try {
            x = JSON.parse("}");
            if (x == 47) return null;
          } catch (e) {
            x = null;
          }

          try {
            return <div>{x}</div>;
          } catch (e) {
            return <span />;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    // Derived from react-main/compiler try-catch-logical-and-optional.js
    {
      code: tsx`
        function Component({ cond, obj, items }) {
          try {
            const result = cond && obj?.value && items.length;
            return <div>{String(result)}</div>;
          } catch {
            return <div>error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    // Derived from react-main/compiler try-catch-multiple-value-blocks.js
    {
      code: tsx`
        function Component({ a, b, cond, items }) {
          try {
            const x = a?.value;
            const y = cond ? b?.first : items.length;
            const z = x && y;
            return (
              <div>
                {String(x)}-{String(y)}-{String(z)}
              </div>
            );
          } catch {
            return <div>error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    // Derived from react-main/compiler try-catch-nullish-coalescing.js
    {
      code: tsx`
        function Component({ a, b, fallback }) {
          try {
            const result = a ?? b ?? fallback.value;
            return <span>{result}</span>;
          } catch {
            return <span>error</span>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    // JSX in catch block nested inside outer try - should report outer try
    {
      code: tsx`
        function Component() {
          try {
            try {
              doSomething();
            } catch (error) {
              return <div>Error occurred</div>;
            }
          } catch (error2) {
            return <div>Outer error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithJsx" }],
    },
    // use() in catch block nested inside outer try - should report outer try
    {
      code: tsx`
        function Component({ promise }) {
          try {
            try {
              doSomething();
            } catch (error) {
              const data = use(promise);
              return <div>{data}</div>;
            }
          } catch (error2) {
            return <div>Outer error</div>;
          }
        }
      `,
      errors: [{ messageId: "tryCatchWithUse" }],
    },
  ],
  valid: [
    // Error boundary usage
    tsx`
      function Parent() {
        return (
          <ErrorBoundary>
            <ChildComponent />
          </ErrorBoundary>
        );
      }
    `,
    // Error boundary with Suspense
    tsx`
      function App() {
        return (
          <ErrorBoundary fallback={<div>Failed to load</div>}>
            <Suspense fallback={<div>Loading...</div>}>
              <DataComponent promise={fetchData()} />
            </Suspense>
          </ErrorBoundary>
        );
      }
    `,
    // try/catch in event handler (nested function, not component body)
    tsx`
      function Parent() {
        const handleClick = () => {
          try {
            doSomething();
          } catch (e) {
            console.error(e);
          }
        };
        return <div onClick={handleClick} />;
      }
    `,
    // try/catch in event handler with JSX (nested arrow function)
    tsx`
      function Parent() {
        const handleClick = () => {
          try {
            showToast(<ErrorMessage />);
          } catch (e) {
            console.error(e);
          }
        };
        return <div onClick={handleClick} />;
      }
    `,
    // try/catch in useEffect callback
    tsx`
      function Component() {
        useEffect(() => {
          try {
            fetchData();
          } catch (e) {
            setError(e);
          }
        }, []);
        return <div />;
      }
    `,
    // try/catch around non-JSX operations in component
    tsx`
      function Component() {
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = null;
        }
        return <div>{data}</div>;
      }
    `,
    // try/catch in non-component function
    tsx`
      function fetchData() {
        try {
          return fetch('/api');
        } catch (e) {
          return null;
        }
      }
    `,
    // try/catch in utility function (lowercase name)
    tsx`
      function processItems() {
        try {
          return items.map(i => <Item key={i.id} />);
        } catch (e) {
          return [];
        }
      }
    `,
    // try/catch in non-component arrow function
    tsx`
      const helper = () => {
        try {
          return <div />;
        } catch (e) {
          return null;
        }
      };
    `,
    // try/catch around non-rendering operations
    tsx`
      function Component() {
        try {
          localStorage.setItem('key', 'value');
        } catch (e) {
          console.warn('Storage unavailable');
        }
        return <div />;
      }
    `,
    // try/catch in class method (not a function component)
    tsx`
      class Service {
        getData() {
          try {
            return this.fetch();
          } catch (e) {
            return null;
          }
        }
      }
    `,
    // No try/catch at all
    tsx`
      function Component() {
        return <div />;
      }
    `,
    tsx`
      export function MyComponent() {
        let x;
        try {
          x = JSON.parse("}");
          if (x == 47) return null;
        } catch (e) {
          x = null;
        }
        return <div>{x}</div>;
      }
    `,
    // Derived from react-main/compiler try-catch.js
    // try/catch around non-JSX operations in component
    tsx`
      function Component(props) {
        let x;
        try {
          x = JSON.parse(text);
        } catch {
          x = null;
        }
        return x;
      }
    `,
    // Derived from react-main/compiler try-catch-with-return.js
    // try returns primitive/undefined, catch returns null - no JSX in try
    tsx`
      function Component(props) {
        let x = [];
        try {
          const y = shallowCopy({});
          if (y == null) {
            return;
          }
          x.push(throwInput(y));
        } catch {
          return null;
        }
        return x;
      }
    `,
    // Derived from react-main/compiler try-catch-ternary-expression.js
    // try/catch around non-JSX operations
    tsx`
      function Component(props) {
        let result;
        try {
          result = props.cond ? props.a : props.fallback.value;
        } catch (e) {
          result = "error";
        }
        return result;
      }
    `,
    // Derived from react-main/compiler try-catch-try-immediately-returns.js
    // try returns primitive value
    tsx`
      function Component(props) {
        let x = props.default;
        try {
          const y = 42;
          return y;
        } catch (e) {
          x = e;
        }
        return x;
      }
    `,
    // Derived from react-main/compiler try-catch-empty-try.js
    tsx`
      function Component(props) {
        let x = props.default;
        try {
        } catch (e) {
          x = e;
        }
        return x;
      }
    `,
    // Derived from react-main/compiler try-catch-mutate-outer-value.js
    // try/catch mutates outer value but does not return JSX
    tsx`
      function Component(props) {
        const x = [];
        try {
          x.push(throwErrorWithMessage("oops"));
        } catch {
          x.push(shallowCopy({ a: props.a }));
        }
        return x;
      }
    `,
    // Derived from react-main/compiler try-catch-within-function-expression.js
    // try/catch in nested arrow function
    tsx`
      function Component(props) {
        const callback = () => {
          try {
            return [];
          } catch (e) {
            return;
          }
        };
        return callback();
      }
    `,
    // Derived from react-main/compiler try-catch-within-object-method.js
    // try/catch in object method
    tsx`
      function Component(props) {
        const object = {
          foo() {
            try {
              return [];
            } catch (e) {
              return;
            }
          },
        };
        return object.foo();
      }
    `,
    // Derived from react-main/compiler invalid-jsx-in-try-with-catch.js
    // JSX is assigned in try but returned outside try - not caught by this rule
    tsx`
      function Component(props) {
        let el;
        try {
          el = <div />;
        } catch {
          return null;
        }
        return el;
      }
    `,
    // JSX in catch block without outer try - allowed by SPEC
    tsx`
      function Component() {
        try {
          doSomething();
        } catch (error) {
          return <div>Error occurred</div>;
        }
      }
    `,
    // use() in catch block without outer try - allowed
    tsx`
      function Component({ promise }) {
        try {
          doSomething();
        } catch (error) {
          const data = use(promise);
          return <div>{data}</div>;
        }
      }
    `,
    // Derived from react-main/compiler repro-preds-undefined-try-catch-return-primitive.js
    // try/catch in useMemo callback returning primitive
    tsx`
      function useSupportsTouchEvent() {
        return useMemo(() => {
          if (checkforTouchEvents) {
            try {
              document.createEvent("TouchEvent");
              return true;
            } catch {
              return false;
            }
          }
        }, []);
      }
    `,
    // Derived from react-main/compiler repro-unreachable-code-early-return-in-useMemo.js
    // try/catch in useMemo callback returning object
    tsx`
      function Component({ value }) {
        const result = useMemo(() => {
          if (value == null) {
            return null;
          }
          try {
            return { value };
          } catch (e) {
            return null;
          }
        }, [value]);
        return <div>{result}</div>;
      }
    `,
    // Derived from react-main/compiler repro-nested-try-catch-in-usememo.js
    // nested try/catch in useMemo callback
    tsx`
      function useFoo(text) {
        return useMemo(() => {
          try {
            let formattedText = "";
            try {
              formattedText = format(text);
            } catch {
              formattedText = text;
            }
            return formattedText || "";
          } catch (e) {
            return "";
          }
        }, [text]);
      }
    `,
  ],
});
