import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
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
  ],
  valid: [
    ...allValid,
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
  ],
});
