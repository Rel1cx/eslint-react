import tsx from "dedent";

import { ruleTester } from "../../../../../test";
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
  ],
});
