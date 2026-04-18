import tsx from "dedent";

import { ruleTester } from "../../../../../test";
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
      errors: [{ messageId: "expectedAbortController" }],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            fetch("/api/user", {});
          }, []);
        }
      `,
      errors: [{ messageId: "expectedAbortController" }],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            window.fetch("/api/user");
          }, []);
        }
      `,
      errors: [{ messageId: "expectedAbortController" }],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            globalThis.fetch("/api/user");
          }, []);
        }
      `,
      errors: [{ messageId: "expectedAbortController" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
    },
    // Cleanup returns a non-function
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            fetch("/api/user");
            return null;
          }, []);
        }
      `,
      errors: [{ messageId: "expectedAbortController" }],
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
      errors: [{ messageId: "expectedAbortController" }],
    },
    {
      code: tsx`
        function Example() {
          useInsertionEffect(() => {
            fetch("/api/user");
          }, []);
        }
      `,
      errors: [{ messageId: "expectedAbortController" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortController" }],
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
      errors: [{ messageId: "expectedAbortController" }],
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
      errors: [{ messageId: "expectedAbortInCleanup" }],
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
      errors: [{ messageId: "expectedAbortController" }],
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
    // fetch in class component should not be checked
    tsx`
      import { Component } from "react";

      class Example extends Component {
        componentDidMount() {
          fetch("/api/user");
        }
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
    // Signal as function parameter (e.g. foxact/use-abortable-effect)
    tsx`
      import { useEffect } from "foxact/use-abortable-effect";

      function Example() {
        useEffect(signal => {
          fetch("/api/user", { signal });
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
  ],
});
