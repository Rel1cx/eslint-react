import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-leaked-resize-observer";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            new ResizeObserver(() => {});
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "unexpected-floating-instance",
        },
      ],
    },
    {
      code: tsx`
        import { useEffect } from "react";

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
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        import React, { useEffect, useRef } from "react";

        function Example() {
          const ref = useRef<HTMLDivElement>(null);

          useEffect(() => {
            if (!ref.current) return;
            const ro = new ResizeObserver(() => console.log("resize"));
            ro.observe(ref.current);
          }, []);

          return <div ref={ref} />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            observer.observe(document.body);
            observer.observe(document.querySelector(".selector")!);
            return () => {
              observer.unobserve(document.body);
            }
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {}) as ResizeObserver;
            observer.observe(document.body);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            (observer.observe as any)(document.body);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // A disconnect inside the observer's own callback is not a reliable cleanup:
      // the callback may never run if the component unmounts before the element resizes
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const ref = useRef<HTMLDivElement>(null);

          useEffect(() => {
            if (!ref.current) return;
            const observer = new ResizeObserver(([entry]) => {
              console.log(entry.contentRect);
              observer.disconnect();
            });
            observer.observe(ref.current);
          }, []);

          return <div ref={ref} />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            for (const element of document.querySelectorAll(".selector")) {
              observer.observe(element);
            }
            return () => {
              for (const element of document.querySelectorAll(".selector")) {
                observer.unobserve(element);
              }
            }
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-in-control-flow",
        },
      ],
    },
    {
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            Array.from(document.querySelectorAll(".selector")).forEach(element => {
              observer.observe(element);
            });
            return () => {
              Array.from(document.querySelectorAll(".selector")).forEach(element => {
                observer.unobserve(element);
              });
            }
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-in-control-flow",
        },
      ],
    },
    {
      // `observe` nested in a plain function declared inside the setup is still collected:
      // `Traverse.findParent` skips intermediate non-effect functions up to the setup callback
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            function init() {
              observer.observe(document.body);
            }
            init();
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // `observe` nested in a `setTimeout` callback inside the setup is treated as dynamically added:
      // the nearest dynamic-or-phase ancestor of the call is the `setTimeout` call, not the setup
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            setTimeout(() => {
              observer.observe(document.body);
            }, 100);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-in-control-flow",
        },
      ],
    },
    {
      // An instance created inside the cleanup callback itself is still tracked
      // (the cleanup callback is accepted as its phase node) and still requires a disconnect
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            return () => {
              const observer = new ResizeObserver(() => {});
              observer.observe(document.body);
            };
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // `useLayoutEffect` matches the useEffect-like hook pattern and is checked the same way
      code: tsx`
        import { useLayoutEffect } from "react";

        function Component() {
          useLayoutEffect(() => {
            const observer = new ResizeObserver(() => {});
            observer.observe(document.body);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // Effects of a component defined inside another component are analyzed the same way
      code: tsx`
        import { useEffect } from "react";

        function Outer() {
          function Inner() {
            useEffect(() => {
              const observer = new ResizeObserver(() => {});
              observer.observe(document.body);
            }, []);

            return <div />;
          }

          return <Inner />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // A `disconnect` called right in the setup (no cleanup returned) does not satisfy the
      // check: only cleanup-phase disconnects count
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            observer.observe(document.body);
            observer.disconnect();
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // A `disconnect` inside a nested function of the setup body that is never returned as
      // the cleanup has phase "setup", so it does not satisfy the check
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            observer.observe(document.body);
            const cleanup = () => {
              observer.disconnect();
            };
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // An `unobserve` called right in the setup (no cleanup returned) does not pair with the
      // `observe`: only cleanup-phase unobserves count
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new ResizeObserver(() => {});
            observer.observe(document.body);
            observer.unobserve(document.body);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // A `ResizeObserver` instance held by a ref is observed in the effect but never
      // disconnected or unobserved in the cleanup
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
          useEffect(() => {
            observerRef.current.observe(document.body);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // Same as above, but accessed through a local alias of `ref.current`
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
          useEffect(() => {
            const observer = observerRef.current;
            observer.observe(document.body);
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // A ref-held instance whose only `disconnect` runs in the setup (no cleanup returned)
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
          useEffect(() => {
            observerRef.current.observe(document.body);
            observerRef.current.disconnect();
          }, []);

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // A `useRef(new ResizeObserver(...))` not assigned to a variable is a floating instance
      code: tsx`
        import { useRef } from "react";

        function Component() {
          useRef(new ResizeObserver(() => {}));

          return <div />;
        }
      `,
      errors: [
        {
          messageId: "unexpected-floating-instance",
        },
      ],
    },
  ],
  valid: [
    tsx`
      import { useEffect } from "react";

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
    tsx`
      import { useEffect } from "react";

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
    tsx`
      import React, { useEffect, useRef } from "react";

      function Example() {
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (!ref.current) return;
          const ro = new ResizeObserver(() => console.log("resize"));
          ro.observe(ref.current);
          return () => ro.disconnect();
        }, []);

        return <div ref={ref} />;
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body as HTMLElement);
          return () => {
            observer.unobserve(document.body);
          }
        }, []);

        return <div />;
      }
    `,
    tsx`
      import { useEffect } from "react";

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
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          observer.observe(document.querySelector(".selector")!);
          return () => {
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          observer.observe(document.querySelector(".selector")!);
          return () => {
            observer.unobserve(document.body);
            observer.unobserve(document.querySelector(".selector")!);
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {}) as ResizeObserver;
          observer.observe(document.body);
          return () => {
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    tsx`
      import { useEffect } from "react";

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
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          for (const element of document.querySelectorAll(".selector")) {
            observer.observe(element);
          }
          return () => {
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          Array.from(document.querySelectorAll(".selector")).forEach(element => {
            observer.observe(element);
          });
          return () => {
            observer.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    // A disconnect inside the observer's own callback with a disconnect in the cleanup function as a fallback
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
          if (!ref.current) return;
          const observer = new ResizeObserver(([entry]) => {
            console.log(entry.contentRect);
            observer.disconnect();
          });
          observer.observe(ref.current);
          return () => observer.disconnect(); // fallback: might be unmounted before the callback runs
        }, []);

        return <div ref={ref} />;
      }
    `,
    // The observed/unobserved element is derived from a CallExpression (`getEl()`).
    // Relies on `Compare.isEqual` supporting `CallExpression` so observe/unobserve
    // are matched.
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(getEl());
          return () => {
            observer.unobserve(getEl());
          };
        }, []);

        return <div />;
      }
    `,
    // `observe` nested in a plain function declared inside the setup pairs with a disconnect in the cleanup
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          function init() {
            observer.observe(document.body);
          }
          init();
          return () => {
            observer.disconnect();
          };
        }, []);

        return <div />;
      }
    `,
    // `observe` dynamically added in a `setTimeout` callback passes as long as a `disconnect`
    // exists: the disconnect check runs before (and short-circuits) the dynamic-observe check
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          setTimeout(() => {
            observer.observe(document.body);
          }, 100);
          return () => {
            observer.disconnect();
          };
        }, []);

        return <div />;
      }
    `,
    // A named function declaration returned as the cleanup is not recognized as a cleanup
    // callback by the predicates, but it is resolved from the returned identifier and its
    // `disconnect` counts as a cleanup-phase call
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          function cleanup() {
            observer.disconnect();
          }
          return cleanup;
        }, []);

        return <div />;
      }
    `,
    // Same as above, but with the cleanup assigned to a variable before being returned
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
          const cleanup = () => {
            observer.disconnect();
          };
          return cleanup;
        }, []);

        return <div />;
      }
    `,
    // Cross-effect pairing: entries are matched by identity across the whole component, so an
    // observer created in one effect's setup and disconnected in another effect's cleanup passes
    tsx`
      import { useEffect } from "react";

      function Component() {
        let observer: ResizeObserver;

        useEffect(() => {
          observer = new ResizeObserver(() => {});
          observer.observe(document.body);
        }, []);

        useEffect(() => {
          return () => observer.disconnect();
        }, []);

        return <div />;
      }
    `,
    // Setup passed as an identifier reference is not analyzed: the standalone function is not
    // the direct first argument of the effect call, so the leak is not detected
    tsx`
      import { useEffect } from "react";

      function Component() {
        const setup = () => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
        };
        useEffect(setup, []);

        return <div />;
      }
    `,
    // Setup wrapped in another call is not analyzed: the function is not the direct first
    // argument of the effect call, so the leak is not detected
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(identity(() => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
        }), []);

        return <div />;
      }
    `,
    // Instances created outside any effect callback (module top level, event handlers) are ignored
    tsx`
      const topLevel = new ResizeObserver(() => {});
      topLevel.observe(document.body);

      function Component() {
        const handleClick = () => {
          const observer = new ResizeObserver(() => {});
          observer.observe(document.body);
        };

        return <div onClick={handleClick} />;
      }
    `,
    // An instance created in the deps array (not inside any callback) is ignored
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {}, [new ResizeObserver(() => {})]);

        return <div />;
      }
    `,
    // A `ResizeObserver` instance held by a ref (`useRef(new ResizeObserver(...))`), accessed
    // through a local alias of `ref.current` inside the effect
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
        useEffect(() => {
          const observer = observerRef.current;
          if (!observer) return;
          observer.observe(document.body);
          observer.observe(document.querySelector(".selector")!);
          return () => {
            observer.unobserve(document.body);
            observer.unobserve(document.querySelector(".selector")!);
          }
        }, []);

        return <div />;
      }
    `,
    // Same as above, but accessing `ref.current` directly for each call
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
        useEffect(() => {
          observerRef.current.observe(document.body);
          observerRef.current.observe(document.querySelector(".selector")!);
          return () => {
            observerRef.current.unobserve(document.body);
            observerRef.current.unobserve(document.querySelector(".selector")!);
          }
        }, []);

        return <div />;
      }
    `,
    // A ref-held instance disconnected in the cleanup through `ref.current`
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef<ResizeObserver>(new ResizeObserver(() => {}));
        useEffect(() => {
          observerRef.current.observe(document.body);
          return () => {
            observerRef.current.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
  ],
});
