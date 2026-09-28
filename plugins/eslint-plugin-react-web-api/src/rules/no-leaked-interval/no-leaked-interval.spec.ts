import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-leaked-interval";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedIntervalId",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            window.setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedIntervalId",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            (setInterval as any)(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedIntervalId",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const intervalId = global.setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedClearIntervalInCleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const intervalId = globalThis.setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedClearIntervalInCleanup",
        },
      ],
    },
    {
      code: tsx`
        function Example() {
          useEffect(() => {
            const intervalId = setInterval(() => {}, 1000) as number;
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedClearIntervalInCleanup",
        },
      ],
    },
    {
      name: "reports a 'setInterval' created inside the cleanup callback",
      code: tsx`
        function Example() {
          useEffect(() => {
            return () => {
              const intervalId = setInterval(() => {}, 1000);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedClearIntervalInCleanup",
        },
      ],
    },
    {
      name: "reports when the cleanup clears a different interval id",
      code: tsx`
        function Example() {
          useEffect(() => {
            const intervalId = setInterval(() => {}, 1000);
            const otherId = 0;
            return () => clearInterval(otherId);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedClearIntervalInCleanup",
        },
      ],
    },
    {
      name: "treats 'useLayoutEffect' as an effect hook",
      code: tsx`
        function Example() {
          useLayoutEffect(() => {
            setInterval(() => {}, 1000);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedIntervalId",
        },
      ],
    },
    {
      name: "reports a 'setInterval' created in deeply nested functions inside the setup callback",
      code: tsx`
        function Example() {
          useEffect(() => {
            let intervalId: number;
            const schedule = () => {
              const inner = () => {
                intervalId = setInterval(() => {}, 1000);
              };
              inner();
            };
            schedule();
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedClearIntervalInCleanup",
        },
      ],
    },
    {
      name: "does not pair entries across different effects when the interval id identifiers are different variables with the same name",
      code: tsx`
        function Example() {
          useEffect(() => {
            const intervalId = setInterval(() => {}, 1000);
          }, []);
          useEffect(() => {
            const intervalId = 0;
            return () => clearInterval(intervalId);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "expectedClearIntervalInCleanup",
        },
      ],
    },
  ],
  valid: [
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = setInterval(() => {}, 1000);
          return () => clearInterval(intervalId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = window.setInterval(() => {}, 1000);
          return () => window.clearInterval(intervalId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = global.setInterval(() => {}, 1000);
          return () => global.clearInterval(intervalId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = globalThis.setInterval(() => {}, 1000);
          return () => globalThis.clearInterval(intervalId);
        }, []);
      }
    `,
    tsx`
      import { useEffect, useRef } from "react";

      function Example() {
        const intervalIdRef = useRef<number | null>(null);
        useEffect(() => {
          intervalIdRef.current = setInterval(() => {}, 1000);
          return () => {
            if (intervalIdRef.current !== null) {
              clearInterval(intervalIdRef.current);
            }
          };
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = setInterval(() => {}, 1000);
          return () => globalThis.clearInterval(intervalId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = globalThis.setInterval(() => {}, 1000);
          return () => clearInterval(intervalId);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = setInterval(() => {}, 1000) as number;
          return () => clearInterval(intervalId as number);
        }, []);
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Example() {
        useEffect(() => {
          const intervalId = setInterval(() => {}, 1000) as number;
          return () => clearInterval(intervalId);
        }, []);
      }
    `,
    {
      name: "pairs a 'setInterval' created and cleared in deeply nested functions inside setup and cleanup",
      code: tsx`
        function Example() {
          useEffect(() => {
            let intervalId: number;
            const schedule = () => {
              const inner = () => {
                intervalId = setInterval(() => {}, 1000);
              };
              inner();
            };
            schedule();
            return () => {
              const cancel = () => clearInterval(intervalId);
              cancel();
            };
          }, []);
        }
      `,
    },
    {
      name: "pairs a 'setInterval' with a 'clearInterval' in a nested function that is not the cleanup callback",
      code: tsx`
        function Example() {
          useEffect(() => {
            const intervalId = setInterval(() => {}, 1000);
            const cancel = () => clearInterval(intervalId);
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
            const intervalId = setInterval(() => {}, 1000);
            return () => clearInterval(intervalId);
          }
          useEffect(setup, []);
        }
      `,
    },
    {
      name: "ignores a 'setInterval' in an event handler outside any effect",
      code: tsx`
        function Example() {
          const handleClick = () => {
            const intervalId = setInterval(() => {}, 1000);
          };
          return <button onClick={handleClick} />;
        }
      `,
    },
    {
      name: "ignores a 'setInterval' inside a 'useCallback' callback",
      code: tsx`
        function Example() {
          const callback = useCallback(() => {
            const intervalId = setInterval(() => {}, 1000);
          }, []);
        }
      `,
    },
    {
      name: "pairs calls when the setup callback is wrapped in another call expression",
      code: tsx`
        function Example() {
          useEffect(memo(() => {
            const intervalId = setInterval(() => {}, 1000);
            return () => clearInterval(intervalId);
          }), []);
        }
      `,
    },
    {
      name: "ignores a 'setInterval' in the dependency array",
      code: tsx`
        function Example() {
          useEffect(() => {}, [setInterval(() => {}, 1000)]);
        }
      `,
    },
    {
      name: "ignores a 'setInterval' used directly as the setup argument",
      code: tsx`
        function Example() {
          useEffect(setInterval(() => {}, 1000), []);
        }
      `,
    },
  ],
});
