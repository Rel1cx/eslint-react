import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./no-leaked-event-listener";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        class Example extends React.Component {
          componentDidMount() {
            window.addEventListener("resize", this.handleResize);
          }
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInLifecycle",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.addEventListener("resize", handleResize);
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize1 = () => {};
            const handleResize2 = () => {};
            window.addEventListener("resize", handleResize1);
            return () => {
              window.removeEventListener("resize", handleResize2);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.addEventListener("resize", () => {});
            return () => {
              window.removeEventListener("resize", () => {});
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerOfInlineFunction",
          data: { eventMethodKind: "addEventListener" },
        },
        {
          messageId: "noLeakedEventListenerInEffect",
          data: { effectMethodKind: "useEffect", eventMethodKind: "addEventListener" },
        },
        {
          messageId: "noLeakedEventListenerOfInlineFunction",
          data: { eventMethodKind: "removeEventListener" },
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.addEventListener("resize", () => {}, { once: true });
            return () => {
              window.removeEventListener("resize", () => {});
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerOfInlineFunction",
          data: { eventMethodKind: "addEventListener" },
        },
        {
          messageId: "noLeakedEventListenerInEffect",
          data: { effectMethodKind: "useEffect", eventMethodKind: "addEventListener" },
        },
        {
          messageId: "noLeakedEventListenerOfInlineFunction",
          data: { eventMethodKind: "removeEventListener" },
        },
      ],
    },
    { // Even if the event listener is added with an once, it may still be necessary to properly cancel untriggered listeners when the component is unmounted, so this case needs to be placed in invalid.
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize1 = () => {};
            window.addEventListener("resize", handleResize1, { once: true });
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            window.addEventListener("resize", () => {}, { once: true });

            return () => {
              window.removeEventListener("resize", () => {}, { once: true });
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerOfInlineFunction",
          data: { eventMethodKind: "addEventListener" },
        },
        {
          messageId: "noLeakedEventListenerInEffect",
          data: { effectMethodKind: "useEffect", eventMethodKind: "addEventListener" },
        },
        {
          messageId: "noLeakedEventListenerOfInlineFunction",
          data: { eventMethodKind: "removeEventListener" },
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, false);
            return () => {
              window.removeEventListener("resize", handleResize, true);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, true);
            return () => {
              window.removeEventListener("resize", handleResize, false);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize);
            return () => {
              window.removeEventListener("resize", handleResize, true);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize);
            return () => {
              window.removeEventListener("resize", handleResize, { capture: true });
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, true);
            return () => {
              window.removeEventListener("resize", handleResize, { capture: false });
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, { capture: true });
            return () => {
              window.removeEventListener("resize", handleResize, false);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, { capture: true });
            return () => {
              window.removeEventListener("resize", handleResize);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, { capture: true });
            return () => {
              window.removeEventListener("resize", handleResize, { capture: false });
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, { capture: true });
            window.addEventListener("resize", handleResize, { capture: false });
            return () => {
              window.removeEventListener("resize", handleResize, { capture: false });
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, { capture: true });
            window.addEventListener("resize", handleResize, { capture: false });
            window.addEventListener("resize", handleResize, { capture: false });
            return () => {
              window.removeEventListener("resize", handleResize, { capture: false });
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const options = { capture: true };
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, options);
            return () => {
              window.removeEventListener("resize", handleResize);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
    {
      code: /* tsx */ `
        function Example() {
          useEffect(() => {
            const options = { capture: true };
            const handleResize = () => {};
            window.addEventListener("resize", handleResize, { capture: options.capture });
            return () => {
              window.removeEventListener("resize", handleResize);
            };
          }, []);
        }
      `,
      errors: [
        {
          messageId: "noLeakedEventListenerInEffect",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      class Example extends React.Component {
        componentDidMount() {
          window.addEventListener("resize", this.handleResize);
        }
        componentWillUnmount() {
          window.removeEventListener("resize", this.handleResize);
        }
      }
    `,
    /* tsx */ `
      class Example extends React.Component {
        componentDidMount() {
          window.removeEventListener("resize", this.handleResize);
        }
        componentWillUnmount() {
          window.addEventListener("resize", this.handleResize);
        }
      }
    `,
    /* tsx */ `
      class Example extends React.Component {
        componentDidMount() {
          window.addEventListener("resize", this.handleResize);
          window.addEventListener("resize", this.handleResize);
        }
        componentWillUnmount() {
          window.removeEventListener("resize", this.handleResize);
        }
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize);
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, true);
          return () => {
            window.removeEventListener("resize", handleResize, true);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, false);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize, false);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, { capture: true });
          return () => {
            window.removeEventListener("resize", handleResize, { capture: true });
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, { capture: true });
          window.addEventListener("resize", handleResize, { capture: true });
          return () => {
            window.removeEventListener("resize", handleResize, { capture: true });
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const options = { capture: true };
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, options);
          return () => {
            window.removeEventListener("resize", handleResize, options);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const options = { capture: true };
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, { capture: options.capture });
          return () => {
            window.removeEventListener("resize", handleResize, { capture: options.capture });
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const options = { capture: true };
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, { capture: options.capture });
          return () => {
            window.removeEventListener("resize", handleResize, { capture: true });
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        useEffect(() => {
          const options = { capture: true };
          const handleResize = () => {};
          window.addEventListener("resize", handleResize, { capture: true });
          return () => {
            window.removeEventListener("resize", handleResize, { capture: options.capture });
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const handleResize = useCallback(() => {}, []);
        useEffect(() => {
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const handleResize = useMemo(() => () => {}, []);
        useEffect(() => {
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
        }, []);
        useEffect(() => {
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
        }, []);
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
        }, []);
        useLayoutEffect(() => {
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useLayoutEffect(() => {
          return () => {
            window.removeEventListener("resize", rHandleResize.current);
          };
        }, []);
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current);
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.removeEventListener("resize", rHandleResize.current);
          return () => {
            window.addEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.removeEventListener("resize", rHandleResize.current);
        }, []);
        useEffect(() => {
          return () => {
            window.addEventListener("resize", rHandleResize.current);
          };
        }, []);
      }
    `,
    /* tsx */ `
      function Example() {
        const rHandleResize = useRef(() => {});
        useLayoutEffect(() => {
          return () => {
            window.addEventListener("resize", rHandleResize.current);
          };
        }, []);
        useEffect(() => {
          window.removeEventListener("resize", rHandleResize.current);
        }, []);
      }
    `,
    /* tsx */ `
      const abortController = new AbortController();
      function Example() {
        const rHandleResize = useRef(() => {});
        useEffect(() => {
          window.addEventListener("resize", rHandleResize.current, { once: false, passive: true, capture: true, signal: abortController.signal });
          return () => {
            window.removeEventListener("resize", rHandleResize.current, { capture: true });
          };
        }, []);
      }
    `,
    // TODO: Add support for the AbortController signal.
    // /* tsx */ `
    //   const abortController = new AbortController();
    //   function Example() {
    //     const rHandleResize = useRef(() => {});
    //     useEffect(() => {
    //       window.addEventListener("focus", rHandleResize.current, { once: false, passive: true, capture: true, signal: abortController.signal });
    //       window.addEventListener("resize", rHandleResize.current, { once: false, passive: true, capture: true, signal: abortController.signal });
    //       return () => {
    //         abortController.abort();
    //       };
    //     }, []);
    //   }
    // `,
  ],
});
