import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-leaked-resize-observer";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useEffect } from 'react';

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            observer.observe(document.body);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "noLeakedResizeObserverInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect } from 'react';

        function Component() {
          useEffect(() => {
            new ResizeObserver(() => {});
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "noLeakedResizeObserverNoFloatingInstance",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect } from 'react';

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            observer.observe(document.body);
            observer.observe(document.querySelector('.selector')!);
            return () => {
              observer.unobserve(document.body);
            }
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "noLeakedResizeObserverInEffect",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useEffect } from 'react';

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          return () => {
            observer.unobserve(document.body);
          }
        }, []);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useEffect } from 'react';

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          return () => {
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useEffect } from 'react';

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          return () => {
            observer.unobserve(document.body);
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useEffect } from 'react';

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          observer.observe(document.querySelector('.selector')!);
          return () => {
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useEffect, useRef } from 'react';

      function Component() {
        const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
        useEffect(() => {
          const observer = observerRef.current;
          if (!observer) return;
          observer.observe(document.body);
          observer.observe(document.querySelector('.selector')!);
          return () => {
            observer.unobserve(document.body);
            observer.unobserve(document.querySelector('.selector')!);
          }
        }, []);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useEffect, useRef } from 'react';

      function Component() {
        const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
        useEffect(() => {
          observerRef.current.observe(document.body);
          observerRef.current.observe(document.querySelector('.selector')!);
          return () => {
            observerRef.current.unobserve(document.body);
            observerRef.current.unobserve(document.querySelector('.selector')!);
          }
        }, []);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useEffect } from 'react';

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          observer.observe(document.querySelector('.selector')!);
          return () => {
            observer.unobserve(document.body);
            observer.unobserve(document.querySelector('.selector')!);
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
  ],
});
