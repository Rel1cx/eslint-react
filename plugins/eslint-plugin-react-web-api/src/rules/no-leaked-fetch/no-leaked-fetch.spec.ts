import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-leaked-fetch";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // No signal provided
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            fetch("/api/user");
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            fetch("/api/user", {});
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            window.fetch("/api/user");
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            globalThis.fetch("/api/user");
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // Cleanup returns a non-function, so the fetch is never aborted
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal });
            return null;
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // Different effect kinds
    {
      code: tsx`
        function Example() {
          useLayoutEffect(() => {
            fetch("/api/user");
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useInsertionEffect(() => {
            fetch("/api/user");
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            (fetch as any)("/api/user");
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // fetch inside control flow (if / for)
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            if (Math.random() > 0.5) {
              fetch("/api/user");
            }
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            for (let i = 0; i < 3; i++) {
              fetch(\`/api/user/\${i}\`);
            }
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // fetch inside try/catch
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            try {
              fetch("/api/user");
            } catch (e) {}
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // Computed identifier key is not a static "signal" option: the property name is the runtime value of the variable
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            const signal = "cache";
            fetch("/api/user", { [signal]: ctrl.signal });
            return () => ctrl.abort();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // Computed string literal keys are not statically resolved, so the "signal" option is not recognized
    {
      code: tsx`
        import { useEffect } from "react";

        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { ["signal"]: ctrl.signal });
            return () => ctrl.abort();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // Signal provided but no matching abort in cleanup
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal });
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            window.fetch("/api/user", { signal: ctrl.signal });
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            const opts = { signal: ctrl.signal };
            fetch("/api/user", opts);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            const signal = ctrl.signal;
            fetch("/api/user", { signal });
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { ...someOptions, signal: ctrl.signal });
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useLayoutEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal });
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // Signal wrapped in type expression without cleanup (unwrap)
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal as AbortSignal });
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // Options wrapped in type expression without cleanup (unwrap)
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal } as RequestInit);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            if (Math.random() > 0.5) {
              fetch("/api/user", { signal: ctrl.signal });
            }
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // Multiple fetches with different controllers, only one aborted
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl1 = new AbortController();
            const ctrl2 = new AbortController();
            fetch("/api/user/1", { signal: ctrl1.signal });
            fetch("/api/user/2", { signal: ctrl2.signal });
            return () => ctrl1.abort();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // Aborting the wrong controller
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl1 = new AbortController();
            const ctrl2 = new AbortController();
            fetch("/api/user", { signal: ctrl1.signal });
            return () => ctrl2.abort();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // Aborting wrong controller wrapped in type expression (unwrap)
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl1 = new AbortController();
            const ctrl2 = new AbortController();
            fetch("/api/user", { signal: ctrl1.signal });
            return () => (ctrl2 as AbortController).abort();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // abort nested in a callback in the setup function instead of the cleanup function
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal });
            setTimeout(() => ctrl.abort(), 5000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // abort nested in a callback outside any effect
    {
      code: tsx`
        function Example() {
          const ctrl = new AbortController();

          useEffect(() => {
            fetch("/api/user", { signal: ctrl.signal });
          }, []);

          const handleClick = () => {
            setTimeout(() => ctrl.abort(), 100);
          };
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // Setup with an expression body: the innermost function is the setup itself
    {
      code: tsx`
        function Example() {
          useEffect(() => fetch("/api/user"), []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // Effects of components nested inside another component are still checked
    {
      code: tsx`
        function Parent() {
          function Child() {
            useEffect(() => {
              fetch("/api/user");
            }, []);
            return null;
          }
          return <Child />;
        }
      `,
      errors: [
        {
          messageId: "expected-abort-controller",
        },
      ],
    },
    // Cleanup returned via an identifier reference is not recognized as a cleanup
    // callback (only an inline `return () => ...` / `return function ...` is), so the
    // abort inside `cleanup` is not collected
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal });
            function cleanup() {
              ctrl.abort();
            }
            return cleanup;
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // An abort in another effect's cleanup does not pair when the controllers have
    // different names
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrlA = new AbortController();
            fetch("/api/user", { signal: ctrlA.signal });
          }, []);

          useEffect(() => {
            const ctrlB = new AbortController();
            return () => ctrlB.abort();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
    // An abort in another effect's cleanup does not pair when the controllers are
    // different variables with the same name: controller matching resolves
    // identifiers to their variables, not just their names
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const ctrl = new AbortController();
            fetch("/api/user", { signal: ctrl.signal });
          }, []);

          useEffect(() => {
            const ctrl = new AbortController();
            return () => ctrl.abort();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-abort-in-cleanup",
        },
      ],
    },
  ],
  valid: [
    // Basic valid cases
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          window.fetch("/api/user", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          globalThis.fetch("/api/user", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Options passed via variable
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          const opts = { signal: ctrl.signal };
          fetch("/api/user", opts);
          return () => ctrl.abort();
        }, []);
      }
    `,
    // signal aliased via variable
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          const signal = ctrl.signal;
          fetch("/api/user", { signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Spread options with signal
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { ...someOptions, signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Cleanup is a named function
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return function cleanup() {
            ctrl.abort();
          };
        }, []);
      }
    `,
    // Different effect kinds
    tsx`
      import { useLayoutEffect } from "react";

      function Example() {
        useLayoutEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    tsx`
      import { useInsertionEffect } from "react";

      function Example() {
        useInsertionEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Signal wrapped in type expression (unwrap)
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal as AbortSignal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Options wrapped in type expression (unwrap)
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal } as RequestInit);
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Abort controller wrapped in type expression (unwrap)
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => (ctrl as AbortController).abort();
        }, []);
      }
    `,
    // Signal with non-null assertion (unwrap)
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal! });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Options variable resolved through type expression (unwrap)
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          const opts = { signal: ctrl.signal } as RequestInit;
          fetch("/api/user", opts);
          return () => ctrl.abort();
        }, []);
      }
    `,
    // fetch inside control flow with signal and abort
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          if (Math.random() > 0.5) {
            fetch("/api/user", { signal: ctrl.signal });
          }
          return () => ctrl.abort();
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          for (let i = 0; i < 3; i++) {
            fetch(\`/api/user/\${i}\`, { signal: ctrl.signal });
          }
          return () => ctrl.abort();
        }, []);
      }
    `,
    // fetch inside try/catch with signal and abort
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          try {
            fetch("/api/user", { signal: ctrl.signal });
          } catch (e) {}
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Multiple fetches sharing one controller
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user/1", { signal: ctrl.signal });
          fetch("/api/user/2", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // Multiple fetches with different controllers
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl1 = new AbortController();
          const ctrl2 = new AbortController();
          fetch("/api/user/1", { signal: ctrl1.signal });
          fetch("/api/user/2", { signal: ctrl2.signal });
          return () => {
            ctrl1.abort();
            ctrl2.abort();
          };
        }, []);
      }
    `,
    // Multiple effects, each with their own fetch + abort
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);

        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/posts", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // fetch in nested callback should not be checked
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const handleClick = () => {
            fetch("/api/user");
          };
          return () => {};
        }, []);
      }
    `,
    // fetch in forEach callback should not be checked (nested function)
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ids = [1, 2, 3];
          ids.forEach(id => {
            fetch(\`/api/user/\${id}\`);
          });
          return () => {};
        }, []);
      }
    `,
    // fetch in regular function should not be checked
    tsx`
      import { useEffect } from "react";

      function fetchData() {
        return fetch("/api/user");
      }

      function Example() {
        useEffect(() => {
          fetchData();
          return () => {};
        }, []);
      }
    `,
    // fetch outside effect should not be checked
    tsx`
      import { useEffect } from "react";

      function Example() {
        fetch("/api/user");

        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => ctrl.abort();
        }, []);
      }
    `,
    // fetch in class component should not be checked
    tsx`
      import { Component } from "react";

      class Example extends Component {
        componentDidMount() {
          fetch("/api/user");
        }
      }
    `,
    // Signal as function parameter (e.g. foxact/use-abortable-effect)
    tsx`
      import { useEffect } from "foxact/use-abortable-effect";

      function Example() {
        useEffect(signal => {
          fetch("/api/user", { signal });
        }, []);
      }
    `,
    // The controller is derived from a CallExpression (`getController()`) in both
    // the fetch signal and the abort call. Relies on `Compare.isEqual` supporting
    // `CallExpression` so the two are recognized as the same controller.
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          fetch("/api/user", { signal: getController().signal });
          return () => {
            getController().abort();
          };
        }, []);
      }
    `,
    // abort nested in a callback inside the cleanup function
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => {
            setTimeout(() => ctrl.abort(), 100);
          };
        }, []);
      }
    `,
    // abort nested in a promise callback inside the cleanup function
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => {
            Promise.resolve().then(() => ctrl.abort());
          };
        }, []);
      }
    `,
    // abort nested in a locally declared function inside the cleanup function
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => {
            function doAbort() {
              ctrl.abort();
            }
            doAbort();
          };
        }, []);
      }
    `,
    // abort nested multiple levels deep inside the cleanup function
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const ctrl = new AbortController();
          fetch("/api/user", { signal: ctrl.signal });
          return () => {
            setTimeout(() => {
              Promise.resolve().then(() => ctrl.abort());
            }, 100);
          };
        }, []);
      }
    `,
    // fetch in an async IIFE inside the setup function is not checked: the innermost
    // function is the IIFE, not the setup callback
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          (async () => {
            await fetch("/api/user");
          })();
        }, []);
      }
    `,
    // fetch nested two function levels deep inside the setup function is not checked
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const handleClick = () => {
            const load = () => {
              fetch("/api/user");
            };
            load();
          };
          button.addEventListener("click", handleClick);
        }, []);
      }
    `,
    // fetch inside the cleanup function is not checked: the innermost function is
    // the cleanup callback, not the setup callback
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          return () => {
            fetch("/api/unsubscribe");
          };
        }, []);
      }
    `,
    // fetch inside a useCallback is not checked
    tsx`
      import { useCallback, useEffect } from "react";

      function Example() {
        const load = useCallback(() => {
          fetch("/api/user");
        }, []);
      }
    `,
    // fetch at module top level is not checked
    tsx`
      import { useEffect } from "react";

      fetch("/api/user");

      function Example() {
        return null;
      }
    `,
    // Setup passed as an identifier reference is not recognized (the setup must be
    // an inline function expression), so the fetch inside is not checked
    tsx`
      import { useEffect } from "react";

      function Example() {
        const setup = () => {
          fetch("/api/user");
        };
        useEffect(setup, []);
      }
    `,
    // Setup wrapped in a type expression is not recognized as a setup callback, so
    // the fetch inside is not checked
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect((() => {
          fetch("/api/user");
        }) as any, []);
      }
    `,
    // fetch in the dependency array is not checked: the innermost function is the
    // component, not a setup callback
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {}, [fetch("/api/user")]);
      }
    `,
    // An abort in another effect's cleanup pairs when it references the same
    // controller variable (matching is file-wide, not per-effect)
    tsx`
      import { useEffect } from "react";

      function Example() {
        const ctrl = new AbortController();

        useEffect(() => {
          fetch("/api/user", { signal: ctrl.signal });
        }, []);

        useEffect(() => {
          return () => ctrl.abort();
        }, []);
      }
    `,
  ],
});
