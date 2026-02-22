import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./set-state-in-effect";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "setState in useEffect",
      code: tsx`
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
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState with custom hook",
      code: tsx`
        function Component() {
          const [data, setData] = useSta(0);
          useEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
      settings: {
        "react-x": {
          additionalStateHooks: "useSta",
        },
      },
    },
    {
      name: "setState with regex-matched custom hook",
      code: tsx`
        function Component() {
          const [data, setData] = useSta1(0);
          useEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
      settings: {
        "react-x": {
          additionalStateHooks: "/^(useSta1|useSta2)$/",
        },
      },
    },
    {
      name: "setState via array index",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useEffect(() => {
            data[1](1);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "data[1]",
          },
        },
      ],
    },
    {
      name: "setState via .at() method",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const data = useState(0);
          useEffect(() => {
            data.at(1)(1);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "data.at(1)",
          },
        },
      ],
    },
    {
      name: "setState via .at() with variable",
      code: tsx`
        import { useEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useEffect(() => {
            data.at(index)(1);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "data.at(index)",
          },
        },
      ],
    },
    {
      name: "setState via bracket notation with variable",
      code: tsx`
        import { useEffect, useState } from "react";

        const index = 1;
        function Component() {
          const data = useState(0);
          useEffect(() => {
            data[index](1);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "data[index]",
          },
        },
      ],
    },
    {
      name: "conditional setState in effect",
      code: tsx`
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
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState in inner function",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          useEffect(() => {
          const onLoad = () => {
            setData(1);
          };
          onLoad();
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "multiple setState calls",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data1, setData1] = useState(0);
          const [data2, setData2] = useState(0);
          const setAll = () => {
            setData1(1);
            setData2(1);
          }
          useEffect(() => {
            setAll();
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: { name: "setData1" },
        },
        {
          messageId: "default",
          data: { name: "setData2" },
        },
      ],
    },
    {
      name: "setState via useCallback",
      code: tsx`
        import { useEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data1, setData1] = useState(0);
          const [data2, setData2] = useState(0);
          const setAll = useCallback(() => {
            setData1(1);
            setData2(1);
          })
          useEffect(() => {
            setAll();
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: { name: "setData1" },
        },
        {
          messageId: "default",
          data: { name: "setData2" },
        },
      ],
    },
    {
      name: "setState in IIFE",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          useEffect(() => {
              (() => { setData(1) })();
          }, []);
          return null;
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "setState in named IIFE",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          useEffect(() => {
            !(function onLoad() {
              setData(1)
            })();
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState in local function",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          useEffect(() => {
            const setAll = () => {
              setData(1);
            }
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState via useCallback passed to effect",
      code: tsx`
        import { useEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          const setAll = useCallback(() => setData(0), []);
          useEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState via useMemo function",
      code: tsx`
        import { useEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          const setAll = useMemo(() => () => setData(1), []);
          useEffect(() => {
            setAll()
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState directly passed to useCallback",
      code: tsx`
        import { useEffect, useState, useCallback } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          const setAll = useCallback(setData, []);
          useEffect(() => {
            setAll(1)
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState directly passed to useMemo",
      code: tsx`
        import { useEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          const setAll = useMemo(() => setData, []);
          useEffect(() => {
            setAll(1)
          }, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState callback directly passed to useEffect",
      code: tsx`
        import { useEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          const setAll = useMemo(() => setData, []);
          useEffect(setAll, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    // TODO: Add cleanup function check
    // {
    //   code: tsx`
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
    //     { messageId: "default" },
    //   ],
    // },
    // TODO: Add cleanup function check
    // {
    //   code: tsx`
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
    //     { messageId: "default" },
    //   ],
    // },
    // TODO: Add cleanup function check
    // {
    //   code: tsx`
    //     import { useEffect, useState } from "react";

    //     const Component = () => {
    //       const [data, setData] = useState();
    //       useEffect(() => setData, []);
    //       return null;
    //     }
    //   `,
    //   errors: [
    //     { messageId: "default" },
    //   ],
    // },
    {
      name: "setState in arrow function passed to useEffect",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          useEffect(() => setData(1), []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState function directly passed to useEffect",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          useEffect(setData, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState via external arrow function",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          const setupFunction = () => {
            setData(1)
          }
          useEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState via external function declaration",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          function setupFunction() {
            setData(1)
          }
          useEffect(setupFunction, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState via hoisted function",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState(0);
          useEffect(setupFunction, []);
          function setupFunction() {
            setData(1)
          }
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      name: "setState via external function in multiple components",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component1 = () => {
          const [data, setData] = useState(0);
          const setupFunction = () => {
            setData(1)
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
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    // https://github.com/Rel1cx/eslint-react/issues/1117
    {
      name: "setState from callback used in effect",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component1 = () => {
          const [foo, setFoo] = useState(null);
          const test = useCallback(() => {
            setFoo('') // warning (fine)
            fetch().then(() => { setFoo('') }); // warning (problem)
          }, [])
          useEffect(() => {
            test();
            fetch().then(() => { setFoo('') }); // no warning (fine)
          }, [test]);
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setFoo",
          },
        },
      ],
    },
    {
      name: "setState from regular function used in effect",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component1 = () => {
          const [foo, setFoo] = useState(null);
          const test = () => {
            setFoo('') // warning (fine)
            fetch().then(() => { setFoo('') }); // no warning (fine)
          }
          useEffect(() => {
            test();
            fetch().then(() => { setFoo('') }); // no warning (fine)
          }, [test]);
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "setFoo",
          },
        },
      ],
    },
    {
      name: "setState in custom hook effect",
      code: tsx`
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
        {
          messageId: "default",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      // React docs recommend to first update state in render instead of an effect.
      // But then continue on to say that usually you can avoid the sync entirely by
      // more wisely choosing your state. So we'll just always warn about chained state.
      name: "Syncing prop changes to internal state",
      code: tsx`
        function List({ items }) {
          const [selection, setSelection] = useState();

          useEffect(() => {
            setSelection(null);
          }, [items]);

          return (
            <div>
              {items.map((item) => (
                <div key={item.id} onClick={() => setSelection(item)}>
                  {item.name}
                </div>
              ))}
            </div>
          )
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      name: "Conditionally setting state from internal state",
      code: tsx`
        function Form() {
          const [error, setError] = useState();
          const [result, setResult] = useState();

          useEffect(() => {
            if (result.data) {
              setError(null);
            }
          }, [result]);
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    {
      name: "setState with no arguments in effect (invalid usage but not reported by this rule)",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            setData();
          }, []);
          return null;
        }
      `,
    },
    // setState with ref values should be allowed in effects
    {
      name: "setState with ref.current (direct member expression from useRef)",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const ref = useRef(0);
          useEffect(() => {
            setData(ref.current);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with variable derived from ref.current",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const scrollRef = useRef(null);
          const [data, setData] = useState(0);
          const val = scrollRef.current;
          useEffect(() => {
            setData(val);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref identifier directly from useRef",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef(0);
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(ref);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref value inside a function call argument",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef(0);
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(Number(ref.current));
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref value via updater function referencing ref in scope",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef(0);
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(() => ref.current);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref value via function expression referencing ref in scope",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const myRef = useRef(null);
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(function() { return myRef.current; });
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref.current in IIFE inside effect",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef(0);
          const [data, setData] = useState(0);
          useEffect(() => {
            (() => { setData(ref.current) })();
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref-like named variable (nameRef pattern)",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const scrollPositionRef = useRef(0);
          const [position, setPosition] = useState(0);
          useEffect(() => {
            setPosition(scrollPositionRef.current);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with variable derived from ref.current via member access",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          const el = containerRef.current;
          useEffect(() => {
            setWidth(el);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with variable derived from ref.current via call expression",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [rect, setRect] = useState({ width: 0, height: 0 });
          const el = containerRef.current;
          useEffect(() => {
            setWidth(el.getBoundingClientRect());
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with variable derived from ref.current via call expression with member access",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          const el = containerRef.current;
          useEffect(() => {
            setWidth(el.getBoundingClientRect().width);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with variable derived from ref.current via call expression with member access in set function",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          const el = containerRef.current;
          useEffect(() => {
            setWidth(() => el.getBoundingClientRect().width);
          }, []);
          return null;
        }
      `,
    },
    {
      name:
        "setState with variable derived from ref.current via call expression with member access in set function and return new value in function body",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          const el = containerRef.current;
          useEffect(() => {
            setWidth(() => {
              return el.getBoundingClientRect().width;
            });
          }, []);
          return null;
        }
      `,
    },
    {
      name:
        "setState with variable derived from ref.current via call expression with member access in set function and return new value in function body",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          const el = containerRef.current;
          useEffect(() => {
            setWidth(function() {
              return el.getBoundingClientRect().width;
            });
          }, []);
          return null;
        }
      `,
    },
    {
      name:
        "setState with variable derived from ref.current via call expression with member access in set function and return new value in function body",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          const el = containerRef.current;
          useEffect(() => {
            setWidth(function() {
            const rect = el.getBoundingClientRect();
            return rect.width;
            });
          }, []);
          return null;
        }
      `,
    },
    {
      name: "calling function from useState in effect",
      code: tsx`
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
    },
    {
      name: "setState in uninvoked handler",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            const handler = () => setData(1);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState in promise callback",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            fetch().then(() => setData());
          }, []);
          return null;
        }
      `,
    },
    {
      name: "uninvoked function in effect",
      code: tsx`
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
    },
    {
      name: "calling setter at index 0",
      code: tsx`
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
    },
    {
      name: "setState in async IIFE",
      code: tsx`
        import { useEffect, useState } from "react";

        const index = 0;
        function Component() {
          const [data, setData] = useState(() => 0);
          useEffect(() => {
            void async function () {
              const ret = await fetch("https://eslint-react.xyz");
              setData(ret);
            }()
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState in uninvoked function outside effect",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data1, setData1] = useState(0);
          const [data2, setData2] = useState(0);
          const setAll = () => {
            setData1(1);
            setData2(1);
          }
          return null;
        }
      `,
    },
    {
      name: "setState in nested uninvoked function",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data1, setData1] = useState(0);
          const [data2, setData2] = useState(0);
          const setAll = () => {
            setData1(1);
            setData2(1);
          }
          const handler = () => {
            setAll();
          }
          return null;
        }
      `,
    },
    {
      name: "setState in function declaration outside effect",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data1, setData1] = useState(0);
          const [data2, setData2] = useState(0);
          function handler() {
            setAll();
          }
          function setAll() {
            setData1(1);
            setData2(1);
          }
          return null;
        }
      `,
    },
    {
      name: "external function from different component scope",
      code: tsx`
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
    },
    {
      name: "function defined in different component not detected",
      code: tsx`
        import { useEffect, useState } from "react";

        const Component1 = () => {
          const [data, setData] = useState(0);
          const setAll = () => {
            setData(1);
          }
          return null;
        }

        const Component2 = () => {
          const [data, setData] = useState(0);
          useEffect(() => {
            setAll(1);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState in uninvoked callback in custom hook",
      code: tsx`
        import { useEffect, useState } from "react";

        function useCustomHook() {
          const [data, setData] = useState(0);
          const handlerWatcher = () => {
              setData(1)
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
    },
    // https://github.com/Rel1cx/eslint-react/issues/967
    {
      name: "setState in IIFE inside callback (not directly in effect)",
      code: tsx`
        import { useEffect, useState, useCallback } from "react";

        function useCustomHook() {
          const [something, setSomething] = useState('');

          const test = useCallback(() => {
            setSomething('') // doesn't trigger the rules

            ;(() => {
              setSomething('') // trigger the rules
            })()
          }, [])
        }
      `,
    },
    {
      name: "navigation.setOptions in useLayoutEffect",
      code: tsx`
        import { useEffect, useState, useCallback } from "react";

        function useCustomHook() {
            useLayoutEffect(() => {
            navigation.setOptions({
              headerLeft: () => <CloseButtonHeader disabled={submitting} onPress={onBack} />,
              headerRight: () => (
                <NewPostSaveButton
                  disabled={submitting || loading}
                  isEdit={!!post}
                  onPress={onPressSave}
                  title={
                    post
                      ? t({
                          message: 'Save',
                          context: 'action'
                        })
                      : t({
                          message: 'Post',
                          context: 'action'
                        })
                  }
                />
              )
            });
          }, [loading, navigation, onBack, onPressSave, post, submitting, t]);
        }
      `,
    },
  ],
});
