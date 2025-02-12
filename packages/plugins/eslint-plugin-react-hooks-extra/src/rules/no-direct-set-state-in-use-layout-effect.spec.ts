import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-set-state-in-use-layout-effect";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
        { messageId: "noDirectSetStateInUseLayoutEffect" },
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
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useEffect: ["useIsomorphicLayoutEffect"],
            useLayoutEffect: ["useIsomorphicLayoutEffect"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data[1]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data.at(1)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data.at(index)();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useLayoutEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect } from "react";

        const index = 1;
        function Component() {
          const data = useCustomState(0);
          useLayoutEffect(() => {
            data[index]();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
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
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useLayoutEffect: ["useCustomEffect"],
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
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useLayoutEffect: ["useCustomEffect"],
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
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useLayoutEffect: ["useCustomEffect"],
            useState: ["useCustomState"],
          },
        },
      },
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useLayoutEffect(() => {
            if (data === 0) {
              setData(1);
            }
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useLayoutEffect(() => {
          const onLoad = () => {
            setData();
          };
          onLoad();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data1, setData1] = useState();
          const [data2, setData2] = useState();
          const setAll = () => {
            setData1();
            setData2();
          }
          useLayoutEffect(() => {
            setAll();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect", data: { name: "setData1" } },
        { messageId: "noDirectSetStateInUseLayoutEffect", data: { name: "setData2" } },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data1, setData1] = useState();
          const [data2, setData2] = useState();
          const setAll = useCallback(() => {
            setData1();
            setData2();
          })
          useLayoutEffect(() => {
            setAll();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect", data: { name: "setData1" } },
        { messageId: "noDirectSetStateInUseLayoutEffect", data: { name: "setData2" } },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useLayoutEffect(() => {
              (() => { setData() })();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useLayoutEffect(() => {
            !(function onLoad() {
              setData()
            })();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useLayoutEffect(() => {
            const setAll = () => {
              setData();
            }
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useCallback(() => setData(), []);
          useLayoutEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useMemo(() => () => setData(), []);
          useLayoutEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useCallback(setData, []);
          useLayoutEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useMemo(() => setData, []);
          useLayoutEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useMemo(() => setData, []);
          useLayoutEffect(setAll, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useLayoutEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useLayoutEffect(() => {
    //         return () => {
    //           setData();
    //         }
    //       }, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "noDirectSetStateInUseLayoutEffect" },
    //   ],
    // },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useLayoutEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useLayoutEffect(() => {
    //         const cleanup = () => {
    //           setData();
    //         }
    //         return cleanup;
    //       }, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "noDirectSetStateInUseLayoutEffect" },
    //   ],
    // },
    // TODO: Add cleanup function check
    // {
    //   code: /* tsx */ `
    //     import { useLayoutEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useLayoutEffect(() => setData, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "noDirectSetStateInUseLayoutEffect" },
    //   ],
    // },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useLayoutEffect(() => setData(), []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useLayoutEffect(setData, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setupFunction = () => {
            setData()
          }
          useLayoutEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          function setupFunction() {
            setData()
          }
          useLayoutEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useLayoutEffect(setupFunction, []);
          function setupFunction() {
            setData()
          }
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        const Component1 = () => {
          const [data, setData] = useState();
          const setupFunction = () => {
            setData()
          }
          useLayoutEffect(setupFunction, []);
          return null;
        }

        const Component2 = () => {
          const [data, setData] = useState();
          const setupFunction = () => {
            setData()
          }
          useLayoutEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        { messageId: "noDirectSetStateInUseLayoutEffect" },
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
    {
      code: /* tsx */ `
        import { useLayoutEffect, useState } from "react";

        function useCustomHook() {
          const [data, setData] = useState();
          const handlerWatcher = () => {
              setData()
          }
          useLayoutEffect(() => {
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
        { messageId: "noDirectSetStateInUseLayoutEffect" },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      function Component() {
        const [fn] = useState(() => () => "Function");
        // ...
        useLayoutEffect(() => {
          fn();
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useLayoutEffect(() => {
          const handler = () => setData(1);
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useLayoutEffect(() => {
          fetch().then(() => setData());
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      const Component = () => {
        const [data, setData] = useState();
        useLayoutEffect(() => {
        const onLoad = () => {
          setData();
        };
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      const index = 0;
      function Component() {
        const data = useState(() => 0);
        useLayoutEffect(() => {
          data.at(index)();
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      const index = 0;
      function Component() {
        const [data, setData] = useState(() => 0);
        useLayoutEffect(() => {
          void async function () {
            const ret = await fetch("https://eslint-react.xyz");
            setData(ret);
          }()
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

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
      import { useLayoutEffect, useState } from "react";

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
      import { useLayoutEffect, useState } from "react";

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
      import { useLayoutEffect, useState } from "react";

      const Component1 = () => {
        const [data, setData] = useState();
        const setupFunction = () => {
          setData()
        }
        return null;
      }

      const Component2 = () => {
        const [data, setData] = useState();
        useLayoutEffect(setupFunction, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      const Component1 = () => {
        const [data, setData] = useState();
        const setAll = () => {
          setData();
        }
        return null;
      }

      const Component2 = () => {
        const [data, setData] = useState();
        useLayoutEffect(() => {
          setAll();
        }, []);
        return null;
      }
    `,
    /* tsx */ `
      import { useLayoutEffect, useState } from "react";

      function useCustomHook() {
        const [data, setData] = useState();
        const handlerWatcher = () => {
            setData()
        }
        useLayoutEffect(() => {
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
    /* tsx */ `
      import { useEffect, useState, useRef } from "react";

      function Tooltip() {
        const ref = useRef(null);
        const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet

        useEffect(() => {
          const { height } = ref.current.getBoundingClientRect();
          setTooltipHeight(height); // Re-render now that you know the real height
        }, []);

        // ...use tooltipHeight in the rendering logic below...
      }
    `,
  ],
});
