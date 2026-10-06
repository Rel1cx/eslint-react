import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-leaked-intersection-observer";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {}) as IntersectionObserver;
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
            const observer = new IntersectionObserver(() => {});
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
      code: tsx`
        import React, { useEffect, useRef } from "react";

        function Example() {
          const ref = useRef<HTMLDivElement>(null);

          useEffect(() => {
            if (!ref.current) return;
            const ro = new IntersectionObserver(() => console.log("intersection"));
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
            const observer = new IntersectionObserver(() => {});
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
      // The observe-once pattern (disconnect via the callback parameter) still needs a cleanup
      // fallback: the callback never runs if the component unmounts before the element intersects
      code: tsx`
        import { useEffect, useRef, useState } from "react";

        function LazySection() {
          const ref = useRef<HTMLDivElement>(null);
          const [visible, setVisible] = useState(false);

          useEffect(() => {
            if (!ref.current) return;
            const observer = new IntersectionObserver(([entry], obs) => {
              if (entry.isIntersecting) {
                setVisible(true);
                obs.disconnect(); // observe-once
              }
            });
            observer.observe(ref.current);
          }, []);

          return <div ref={ref}>{visible ? <p>Loaded</p> : null}</div>;
        }
      `,
      errors: [
        {
          messageId: "expected-disconnect-or-unobserve-in-cleanup",
        },
      ],
    },
    {
      // Same observe-once pattern, but disconnecting through the outer variable instead of the callback parameter
      code: tsx`
        import { useEffect, useRef, useState } from "react";

        function LazySection() {
          const ref = useRef<HTMLDivElement>(null);
          const [visible, setVisible] = useState(false);

          useEffect(() => {
            if (!ref.current) return;
            const observer = new IntersectionObserver(([entry]) => {
              if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect(); // observe-once
              }
            });
            observer.observe(ref.current);
          }, []);

          return <div ref={ref}>{visible ? <p>Loaded</p> : null}</div>;
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
            const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
              const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
              const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
            const observer = new IntersectionObserver(() => {});
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
      // An `IntersectionObserver` instance held by a ref is observed in the effect but never
      // disconnected or unobserved in the cleanup
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
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
          const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
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
          const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
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
      // A `useRef(new IntersectionObserver(...))` not assigned to a variable is a floating instance
      code: tsx`
        import { useRef } from "react";

        function Component() {
          useRef(new IntersectionObserver(() => {}));

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
      // An `unobserve` inside the observer's own callback does not pair with the `observe`,
      // for the same reason a `disconnect` there does not count: the callback may never run
      // if the component unmounts before the element intersects
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new IntersectionObserver(() => {
              observer.unobserve(document.body);
            });
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
      // A local helper whose `disconnect` is only invoked from the setup (never from the
      // cleanup) has phase "setup", so it does not satisfy the check
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          useEffect(() => {
            const observer = new IntersectionObserver(() => {});
            observer.observe(document.body);
            function stop() {
              observer.disconnect();
            }
            stop();
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
      // Two ref-held instances: only the second one is disconnected in the cleanup, so the
      // first one still leaks - entries are matched per instance, not per component
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRefA = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
          const observerRefB = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
          useEffect(() => {
            observerRefA.current.observe(document.body);
            observerRefB.current.observe(document.body);
            return () => {
              observerRefB.current.disconnect();
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
      // A ref-held instance whose cleanup `unobserve` targets a different element than the
      // `observe` does not pair - elements are matched by identity
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
          useEffect(() => {
            observerRef.current.observe(document.body);
            return () => {
              observerRef.current.unobserve(document.querySelector(".selector")!);
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
      // A `disconnect` that only runs inside the ref-held observer's own callback is not a
      // reliable cleanup: the callback may never run before the component unmounts
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRef = useRef<IntersectionObserver>(
            new IntersectionObserver(() => {
              observerRef.current.disconnect();
            }),
          );
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
      // A ref-held instance observed from a `setTimeout` callback is dynamically added and
      // requires a `disconnect` in the cleanup, which is missing here
      code: tsx`
        import { useEffect, useRef } from "react";

        function Component() {
          const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
          useEffect(() => {
            setTimeout(() => {
              observerRef.current.observe(document.body);
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
  ],
  valid: [
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
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
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {}) as IntersectionObserver;
          observer.observe(document.body);
          return () => {
            observer.disconnect();
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
          const ro = new IntersectionObserver(() => console.log("intersection"));
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
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
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
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
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
    // The observe-once pattern with a disconnect in the cleanup function as a fallback
    tsx`
      import { useEffect, useRef, useState } from "react";

      function LazySection() {
        const ref = useRef<HTMLDivElement>(null);
        const [visible, setVisible] = useState(false);

        useEffect(() => {
          if (!ref.current) return;
          const observer = new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
              setVisible(true);
              obs.disconnect(); // observe-once
            }
          });
          observer.observe(ref.current);
          return () => observer.disconnect(); // fallback: might be unmounted before the callback runs
        }, []);

        return <div ref={ref}>{visible ? <p>Loaded</p> : null}</div>;
      }
    `,
    // The observe-once pattern through the outer variable with a disconnect in the cleanup function as a fallback
    tsx`
      import { useEffect, useRef, useState } from "react";

      function LazySection() {
        const ref = useRef<HTMLDivElement>(null);
        const [visible, setVisible] = useState(false);

        useEffect(() => {
          if (!ref.current) return;
          const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect(); // observe-once
            }
          });
          observer.observe(ref.current);
          return () => observer.disconnect(); // fallback: might be unmounted before the callback runs
        }, []);

        return <div ref={ref}>{visible ? <p>Loaded</p> : null}</div>;
      }
    `,
    // The observed/unobserved element is derived from a CallExpression (`getEl()`).
    // Relies on `Compare.isEqual` supporting `CallExpression` so observe/unobserve
    // are matched.
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
          observer.observe(getEl());
          return () => {
            observer.unobserve(getEl());
          };
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

          const intersectionObserver = new IntersectionObserver(getAndSetScrollOffsets);
          intersectionObserver.observe(scrollRoot);

          return () => {
            intersectionObserver.unobserve(scrollRoot);
          };
        }, [elementRef, scrollRootRef]);

        return <div />;
      }
    `,
    // `observe` nested in a plain function declared inside the setup pairs with a disconnect in the cleanup
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
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
        let observer: IntersectionObserver;

        useEffect(() => {
          observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
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
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
        }), []);

        return <div />;
      }
    `,
    // Instances created outside any effect callback (module top level, event handlers) are ignored
    tsx`
      const topLevel = new IntersectionObserver(() => {});
      topLevel.observe(document.body);

      function Component() {
        const handleClick = () => {
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
        };

        return <div onClick={handleClick} />;
      }
    `,
    // An instance created in the deps array (not inside any callback) is ignored
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {}, [new IntersectionObserver(() => {})]);

        return <div />;
      }
    `,
    // An `IntersectionObserver` instance held by a ref (`useRef(new IntersectionObserver(...))`),
    // accessed through a local alias of `ref.current` inside the effect
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
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
        const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
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
        const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
        useEffect(() => {
          observerRef.current.observe(document.body);
          return () => {
            observerRef.current.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    // A `disconnect` delegated to a local function declared in the setup that the cleanup
    // calls (`return () => stop();`) runs in the cleanup phase
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
          function stop() {
            observer.disconnect();
          }
          return () => stop();
        }, []);

        return <div />;
      }
    `,
    // Same as above, but with the helper declared inside the cleanup callback itself
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
          return () => {
            function stop() {
              observer.disconnect();
            }
            stop();
          };
        }, []);

        return <div />;
      }
    `,
    // A conditional `disconnect` inside the cleanup callback still counts as cleanup-phase
    tsx`
      import { useEffect } from "react";

      function Component({ shouldDisconnect }: { shouldDisconnect: boolean }) {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
          return () => {
            if (shouldDisconnect) {
              observer.disconnect();
            }
          };
        }, []);

        return <div />;
      }
    `,
    // A function expression returned as the cleanup is recognized by the cleanup predicates
    tsx`
      import { useEffect } from "react";

      function Component() {
        useEffect(() => {
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
          return function cleanup() {
            observer.disconnect();
          };
        }, []);

        return <div />;
      }
    `,
    // `useLayoutEffect` matches the useEffect-like hook pattern and its cleanup counts
    tsx`
      import { useLayoutEffect } from "react";

      function Component() {
        useLayoutEffect(() => {
          const observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
          return () => {
            observer.disconnect();
          };
        }, []);

        return <div />;
      }
    `,
    // Cross-effect pairing: entries are matched by identity across the whole component, so an
    // observer created in one effect's setup and unobserved in another effect's cleanup passes
    tsx`
      import { useEffect } from "react";

      function Component() {
        let observer: IntersectionObserver;

        useEffect(() => {
          observer = new IntersectionObserver(() => {});
          observer.observe(document.body);
        }, []);

        useEffect(() => {
          return () => observer.unobserve(document.body);
        }, []);

        return <div />;
      }
    `,
    // A ref-held instance observed in one effect and disconnected in another effect's cleanup:
    // entries are matched by identity across the whole component
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));

        useEffect(() => {
          observerRef.current.observe(document.body);
        }, []);

        useEffect(() => {
          return () => observerRef.current.disconnect();
        }, []);

        return <div />;
      }
    `,
    // A ref-held instance created without a type argument on `useRef`
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef(new IntersectionObserver(() => {}));
        useEffect(() => {
          observerRef.current.observe(document.body);
          return () => {
            observerRef.current.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    // A ref-held instance created with observer options
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef(new IntersectionObserver(() => {}, { threshold: 0.5 }));
        useEffect(() => {
          observerRef.current.observe(document.body);
          return () => {
            observerRef.current.disconnect();
          }
        }, []);

        return <div />;
      }
    `,
    // Two ref-held instances, each with its own cleanup-phase `disconnect`
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRefA = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
        const observerRefB = useRef<IntersectionObserver>(new IntersectionObserver(() => {}));
        useEffect(() => {
          observerRefA.current.observe(document.body);
          observerRefB.current.observe(document.querySelector(".selector")!);
          return () => {
            observerRefA.current.disconnect();
            observerRefB.current.disconnect();
          };
        }, []);

        return <div />;
      }
    `,
    // TODO: Add support for instances assigned to a ref inside an effect
    // (`ref.current = new IntersectionObserver(...)`): the instance is tracked, but method calls on
    // `ref.current` are not recognized as observer calls when the `useRef` initializer does not
    // hold an observer, so the leak is not detected
    tsx`
      import { useEffect, useRef } from "react";

      function Component() {
        const observerRef = useRef<IntersectionObserver | null>(null);
        useEffect(() => {
          observerRef.current = new IntersectionObserver(() => {});
          observerRef.current.observe(document.body);
        }, []);

        return <div />;
      }
    `,
  ],
});
