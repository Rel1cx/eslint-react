import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-leaked-timeout";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-timeout-id",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            window.setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-timeout-id",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            (setTimeout as any)(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-timeout-id",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const timeoutId = global.setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-clear-timeout-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const timeoutId = globalThis.setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-clear-timeout-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const timeoutId = setTimeout(() => {}, 1000) as number;
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-clear-timeout-in-cleanup",
        },
      ],
    },
    {
      name: "reports a 'setTimeout' created inside the cleanup callback",
      code: tsx`
        function Example() {
          useEffect(() => {
            return () => {
              const timeoutId = setTimeout(() => {}, 1000);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-clear-timeout-in-cleanup",
        },
      ],
    },
    {
      name: "reports when the cleanup clears a different timeout id",
      code: tsx`
        function Example() {
          useEffect(() => {
            const timeoutId = setTimeout(() => {}, 1000);
            const otherId = 0;
            return () => clearTimeout(otherId);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-clear-timeout-in-cleanup",
        },
      ],
    },
    {
      name: "treats 'useLayoutEffect' as an effect hook",
      code: tsx`
        function Example() {
          useLayoutEffect(() => {
            setTimeout(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-timeout-id",
        },
      ],
    },
    {
      name: "reports a 'setTimeout' created in deeply nested functions inside the setup callback",
      code: tsx`
        function Example() {
          useEffect(() => {
            let timeoutId: number;
            const schedule = () => {
              const inner = () => {
                timeoutId = setTimeout(() => {}, 1000);
              };
              inner();
            };
            schedule();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-clear-timeout-in-cleanup",
        },
      ],
    },
    {
      name: "does not pair entries across different effects when the timeout id identifiers are different variables with the same name",
      code: tsx`
        function Example() {
          useEffect(() => {
            const timeoutId = setTimeout(() => {}, 1000);
          }, []);
          useEffect(() => {
            const timeoutId = 0;
            return () => clearTimeout(timeoutId);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expected-clear-timeout-in-cleanup",
        },
      ],
    },
  ],
  valid: [
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = setTimeout(() => {}, 1000);
          return () => clearTimeout(timeoutId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = window.setTimeout(() => {}, 1000);
          return () => window.clearTimeout(timeoutId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = global.setTimeout(() => {}, 1000);
          return () => global.clearTimeout(timeoutId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = globalThis.setTimeout(() => {}, 1000);
          return () => globalThis.clearTimeout(timeoutId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = setTimeout(() => {}, 1000);
          return () => globalThis.clearTimeout(timeoutId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = globalThis.setTimeout(() => {}, 1000);
          return () => clearTimeout(timeoutId);
        }, []);
      }
    `,
    tsx`
      import { useEffect, useRef } from "react";

      function Example() {
        const timeoutIdRef = useRef<number | null>(null);
        useEffect(() => {
          timeoutIdRef.current = setTimeout(() => {}, 1000);
          return () => {
            if (timeoutIdRef.current !== null) {
              clearTimeout(timeoutIdRef.current);
            }
          };
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = setTimeout(() => {}, 1000) as number;
          return () => clearTimeout(timeoutId as number);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const timeoutId = setTimeout(() => {}, 1000) as number;
          return () => clearTimeout(timeoutId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          let timeoutId: number | null = null;
          if (Math.random() > 0.5) {
            timeoutId = setTimeout(() => {}, 1000);
          }
          return () => {
            timeoutId && clearTimeout(timeoutId);
          };
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          let timeoutId1: number | null = null;
          let timeoutId2: number | null = null;
          if (Math.random() > 0.5) {
            timeoutId1 = setTimeout(() => {}, 1000);
            timeoutId2 = setTimeout(() => {}, 1000);
          }
          return () => {
            timeoutId1 && clearTimeout(timeoutId1);
            timeoutId2 && clearTimeout(timeoutId2);
          };
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          let timeoutId1: number | null;
          let timeoutId2: number | null;
          if (Math.random() > 0.5) {
            timeoutId1 = setTimeout(() => {}, 1000);
            timeoutId2 = setTimeout(() => {}, 1000);
          }
          return () => {
            timeoutId1 && clearTimeout(timeoutId1);
            timeoutId2 && clearTimeout(timeoutId2);
          };
        }, []);
      }
    `,
    {
      name: "pairs a 'setTimeout' created and cleared in deeply nested functions inside setup and cleanup",
      code: tsx`
        function Example() {
          useEffect(() => {
            let timeoutId: number;
            const schedule = () => {
              const inner = () => {
                timeoutId = setTimeout(() => {}, 1000);
              };
              inner();
            };
            schedule();
            return () => {
              const cancel = () => clearTimeout(timeoutId);
              cancel();
            };
          }, []);
        }
      `,
    },
    {
      name: "pairs a 'setTimeout' with a 'clearTimeout' in a nested function that is not the cleanup callback",
      code: tsx`
        function Example() {
          useEffect(() => {
            const timeoutId = setTimeout(() => {}, 1000);
            const cancel = () => clearTimeout(timeoutId);
            document.addEventListener("click", cancel);
          }, []);
        }
      `,
    },
    {
      name: "ignores calls inside a setup callback passed as an identifier reference",
      code: tsx`
        function Example() {
          function setup() {
            const timeoutId = setTimeout(() => {}, 1000);
            return () => clearTimeout(timeoutId);
          }
          useEffect(setup, []);
        }
      `,
    },
    {
      name: "ignores a 'setTimeout' in an event handler outside any effect",
      code: tsx`
        function Example() {
          const handleClick = () => {
            const timeoutId = setTimeout(() => {}, 1000);
          };
          return <button onClick={handleClick} />;
        }
      `,
    },
    {
      name: "ignores a 'setTimeout' inside a 'useCallback' callback",
      code: tsx`
        function Example() {
          const callback = useCallback(() => {
            const timeoutId = setTimeout(() => {}, 1000);
          }, []);
        }
      `,
    },
    {
      name: "pairs calls when the setup callback is wrapped in another call expression",
      code: tsx`
        function Example() {
          useEffect(memo(() => {
            const timeoutId = setTimeout(() => {}, 1000);
            return () => clearTimeout(timeoutId);
          }), []);
        }
      `,
    },
    {
      name: "ignores a 'setTimeout' in the dependency array",
      code: tsx`
        function Example() {
          useEffect(() => {}, [setTimeout(() => {}, 1000)]);
        }
      `,
    },
    {
      name: "ignores a 'setTimeout' used directly as the setup argument",
      code: tsx`
        function Example() {
          useEffect(setTimeout(() => {}, 1000), []);
        }
      `,
    },
  ],
});
