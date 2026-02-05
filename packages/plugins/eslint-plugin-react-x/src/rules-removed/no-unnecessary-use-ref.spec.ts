import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-use-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React, { useEffect, useRef } from "react";

        function MyComponent() {
          const ref = useRef<number | null>(null);
          useEffect(() => {
            ref.current = requestAnimationFrame(() => {});
            return () => {
              if (ref.current != null) {
                cancelAnimationFrame(ref.current);
              }
            };
          }, []);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import React, { useEffect, useRef } from "react";

        function MyComponent() {
          const rafRef = useRef<number | null>(null);
          useEffect(() => {
            rafRef.current = requestAnimationFrame(() => {});
            return () => {
              if (rafRef.current != null) {
                cancelAnimationFrame(rafRef.current);
              }
            };
          }, []);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import React, { useEffect, useRef } from "react";

        function MyComponent1() {
          const rafRef = useRef<number | null>(null);
          useEffect(() => {
            rafRef.current = requestAnimationFrame(() => {});
            return () => {
              if (rafRef.current != null) {
                cancelAnimationFrame(rafRef.current);
              }
            };
          }, []);
        }

        function MyComponent2() {
          const rafRef = useRef<number | null>(null);
          useEffect(() => {
            rafRef.current = requestAnimationFrame(() => {});
            return () => {
              if (rafRef.current != null) {
                cancelAnimationFrame(rafRef.current);
              }
            };
          }, []);
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        import React, { useEffect, useRef } from "react";

        function MyComponent() {
          // This ref is named without the "Ref" suffix, just to test if this rule catches it.
          const input = useRef<HTMLInputElement | null>(null);
          useEffect(() => {
            if (input.current != null) {
              input.current.focus();
            }
          }, []);
        }
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      import React, { useRef } from "react";

      // Called outside of a component or hook but rules-of-hooks can catch this
      useRef(null);
    `,
    tsx`
      import React, { useRef } from "react";

      // Called outside of a component or hook but rules-of-hooks can catch this
      const ref = useRef(null);
    `,
    tsx`
      import React, { useRef } from "react";

      function MyComponent() {
          // Never used but other rules can catch this
          const ref = useRef(null);
      }
    `,
    tsx`
      import React, { useRef } from "react";

      function MyComponent() {
          // Never used but other rules can catch this
          useRef(null);
      }
    `,
    tsx`
      import React, { useEffect, useRef } from "react";

      function MyComponent() {
          // Never used but other rules can catch this
          const ref = useRef(null);
      }
    `,
    tsx`
      import React, { useEffect, useRef } from "react";

      function MyComponent() {
        useEffect(() => {
          let raf: number | null = requestAnimationFrame(() => {});
          return () => {
            if (raf != null) {
              cancelAnimationFrame(raf);
            }
          };
        });
      }
    `,
    tsx`
      import React, { useEffect, useRef } from "react";

      function MyComponent() {
        const ref = useRef<number | null>(null);
        useEffect(() => {
          ref.current = requestAnimationFrame(() => {});
          return () => {
            if (ref.current != null) {
              cancelAnimationFrame(ref.current);
            }
          };
        });

        useEffect(() => {
          console.log(ref.current);
        }, []);
      }
    `,
    tsx`
      import React, { useEffect, useRef } from "react";

      function MyComponent() {
        // This ref is used outside of useEffect as well, so it's necessary
        const inputRef = useRef<HTMLInputElement | null>(null);
        useEffect(() => {
          if (inputRef.current != null) {
            inputRef.current.focus();
          }
        }, []);

        return <input ref={inputRef} />;
      }
    `,
    tsx`
      import { useEffect, useRef } from "react";

      export function useBooleanTrigger(
        value: boolean,
        { turnedTrue, turnedFalse }: { turnedTrue?: () => void; turnedFalse?: () => void },
      ) {
        const previousValueRef = useRef(value);

        useEffect(() => {
          const { current: previousValue } = previousValueRef;

          if (value !== previousValue) {
            previousValueRef.current = value;

            if (value) {
              turnedTrue?.();
            } else {
              turnedFalse?.();
            }
          }
        }, [turnedFalse, turnedTrue, value]);
      }
    `,
  ],
});
