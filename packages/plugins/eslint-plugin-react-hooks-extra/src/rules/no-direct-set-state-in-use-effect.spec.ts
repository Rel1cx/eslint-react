import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-set-state-in-use-effect";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useLayoutEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useInsertionEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useInsertionEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useIsomorphicLayoutEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useLayoutEffect: ["useIsomorphicLayoutEffect"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useEffect(() => {
            data[1]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useEffect(() => {
            data.at(1)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useEffect(() => {
            data.at(index)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect } from "react";

        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useCustomEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useEffect: ["useCustomEffect"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useCustomEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useEffect: ["useCustomEffect"],
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useCustomEffect(() => {
            data.at(index)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useEffect: ["useCustomEffect"],
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            if (data === 0) {
              setData(1);
            }
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
          const onLoad = () => {
            setData();
          };
          onLoad();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data1, setData1] = useState();
          const [data2, setData2] = useState();
          const setAll = () => {
            setData1();
            setData2();
          }
          useEffect(() => {
            setAll();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect", data: { name: "setData1" } },
        { messageId: "noDirectSetStateInUseEffect", data: { name: "setData2" } },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data1, setData1] = useState();
          const [data2, setData2] = useState();
          const setAll = useCallback(() => {
            setData1();
            setData2();
          })
          useEffect(() => {
            setAll();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect", data: { name: "setData1" } },
        { messageId: "noDirectSetStateInUseEffect", data: { name: "setData2" } },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
              (() => { setData() })();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
            !(function onLoad() {
              setData()
            })();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => {
            const setAll = () => {
              setData();
            }
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useCallback(() => setData(), []);
          useEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useMemo(() => () => setData(), []);
          useEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useCallback(setData, []);
          useEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useMemo(() => setData, []);
          useEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useMemo(() => setData, []);
          useEffect(setAll, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useEffect(() => {
    //         return () => {
    //           setData();
    //         }
    //       }, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "noDirectSetStateInUseEffect" },
    //   ],
    // },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useEffect(() => {
    //         const cleanup = () => {
    //           setData();
    //         }
    //         return cleanup;
    //       }, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "noDirectSetStateInUseEffect" },
    //   ],
    // },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useEffect(() => setData, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "noDirectSetStateInUseEffect" },
    //   ],
    // },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => setData(), []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(setData, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setupFunction = () => {
            setData()
          }
          useEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          function setupFunction() {
            setData()
          }
          useEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(setupFunction, []);
          function setupFunction() {
            setData()
          }
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        const Component1 = () => {
          const [data, setData] = useState();
          const setupFunction = () => {
            setData()
          }
          useEffect(setupFunction, []);
          return null;
        }

        const Component2 = () => {
          const [data, setData] = useState();
          const setupFunction = () => {
            setData()
          }
          useEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useEffect, useState } from "react";

        function useCustomHook() {
          const [data, setData] = useState();
          const handlerWatcher = () => {
              setData()
          }
          useEffect(() => {
              const abortController = new AbortController()
              new MutationObserverWatcher(searchAvatarMetaSelector())
                  .addListener('onChange', handlerWatcher)
                  .startWatch(
                      {
                          childList: true,
                          subtree: true,
                          attributes: true,
                          attributeFilter: ['src'],
                      },
                      abortController.signal,
                  )
              handlerWatcher();
              return () => abortController.abort()
          }, [handlerWatcher])
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseEffect" },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useEffect, useState } from "react";

      function Component() {
        const [fn] = useState(() => () => "Function");
        // ...
        useEffect(() => {
          fn();
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useEffect(() => {
          const handler = () => setData(1);
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useEffect(() => {
          fetch().then(() => setData());
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const Component = () => {
        const [data, setData] = useState();
        useEffect(() => {
        const onLoad = () => {
          setData();
        };
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const index = 0;
      function Component() {
        const data = useState(() => 0);
        useEffect(() => {
          data.at(index)();
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const index = 0;
      function Component() {
        const [data, setData] = useState(() => 0);
        useEffect(() => {
          void async function () {
            const ret = await fetch("https://example.com");
            setData(ret);
          }()
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const Component = () => {
        const [data1, setData1] = useState();
        const [data2, setData2] = useState();
        const setAll = () => {
          setData1();
          setData2();
        }
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const Component = () => {
        const [data1, setData1] = useState();
        const [data2, setData2] = useState();
        const setAll = () => {
          setData1();
          setData2();
        }
        const handler = () => {
          setAll();
        }
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const Component = () => {
        const [data1, setData1] = useState();
        const [data2, setData2] = useState();
        function handler() {
          setAll();
        }
        function setAll() {
          setData1();
          setData2();
        }
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const Component1 = () => {
        const [data, setData] = useState();
        const setupFunction = () => {
          setData()
        }
        return null;
      }

      const Component2 = () => {
        const [data, setData] = useState();
        useEffect(setupFunction, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      const Component1 = () => {
        const [data, setData] = useState();
        const setAll = () => {
          setData();
        }
        return null;
      }

      const Component2 = () => {
        const [data, setData] = useState();
        useEffect(() => {
          setAll();
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useEffect, useState } from "react";

      function useCustomHook() {
        const [data, setData] = useState();
        const handlerWatcher = () => {
            setData()
        }
        useEffect(() => {
            const abortController = new AbortController()
            new MutationObserverWatcher(searchAvatarMetaSelector())
                .addListener('onChange', handlerWatcher)
                .startWatch(
                    {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['src'],
                    },
                    abortController.signal,
                )
            return () => abortController.abort()
        }, [handlerWatcher])
      }
    `,
  ],
});
