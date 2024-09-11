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
          messageId: "noLeakedResizeObserver",
        },
      ],
    },
    {
      code: /* tsx */ `
        import React, { useEffect, useRef } from 'react';

        function Example() {
          const ref = useRef<HTMLDivElement>(null);

          useEffect(() => {
            if (!ref.current) return;
            const ro = new ResizeObserver(() => console.log('resize'));
            ro.observe(ref.current);
          }, []);

          return <div ref={ref} />;
        }
      `,
      errors: [
        {
          messageId: "noLeakedResizeObserver",
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
          messageId: "noLeakedResizeObserver",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect } from 'react';

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            for (const element of document.querySelectorAll('.selector')) {
              observer.observe(element);
            }
            return () => {
              for (const element of document.querySelectorAll('.selector')) {
                observer.unobserve(element);
              }
            }
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "noLeakedResizeObserverInControlFlow",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect } from 'react';

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            Array.from(document.querySelectorAll('.selector')).forEach(element => {
              observer.observe(element);
            });
            return () => {
              Array.from(document.querySelectorAll('.selector')).forEach(element => {
                observer.unobserve(element);
              });
            }
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "noLeakedResizeObserverInControlFlow",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { Component } from 'react';

        class MyComponent extends Component {
          componentDidMount() {
            new ResizeObserver(() => {}).observe(document.body);
          }

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "noLeakedResizeObserverNoFloatingInstance",
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
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    /* tsx */ `
      import React, { useEffect, useRef } from 'react';

      function Example() {
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (!ref.current) return;
          const ro = new ResizeObserver(() => console.log('resize'));
          ro.observe(ref.current);
          return () => ro.disconnect();
        }, []);

        return <div ref={ref} />;
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
          const scrollRoot = scrollRootRef.current;
          if (!scrollRoot) {
            return undefined;
          }

          const resizeObserver = new ResizeObserver(getAndSetScrollOffsets);
          resizeObserver.observe(scrollRoot);

          return () => {
            resizeObserver.unobserve(scrollRoot);
          };
        }, [elementRef, scrollRootRef]);

        return <div />;
      }
    `,
    /* tsx */ `
      import { useEffect } from 'react';

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          for (const element of document.querySelectorAll('.selector')) {
            observer.observe(element);
          }
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
          Array.from(document.querySelectorAll('.selector')).forEach(element => {
            observer.observe(element);
          });
          return () => {
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    // TODO: Add support for `ResizeObserver` instance in `useRef`
    // /* tsx */ `
    //   import { useEffect, useRef } from 'react';

    //   function Component() {
    //     const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
    //     useEffect(() => {
    //       const observer = observerRef.current;
    //       if (!observer) return;
    //       observer.observe(document.body);
    //       observer.observe(document.querySelector('.selector')!);
    //       return () => {
    //         observer.unobserve(document.body);
    //         observer.unobserve(document.querySelector('.selector')!);
    //       }
    //     }, []);

    //     return <div />;
    //   }
    // `,
    // /* tsx */ `
    //   import { useEffect, useRef } from 'react';

    //   function Component() {
    //     const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
    //     useEffect(() => {
    //       observerRef.current.observe(document.body);
    //       observerRef.current.observe(document.querySelector('.selector')!);
    //       return () => {
    //         observerRef.current.unobserve(document.body);
    //         observerRef.current.unobserve(document.querySelector('.selector')!);
    //       }
    //     }, []);

    //     return <div />;
    //   }
    // `,
  ],
});
