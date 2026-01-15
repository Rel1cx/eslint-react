import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-direct-set-state-in-use-effect";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
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
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
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
          messageId: "noDirectSetStateInUseEffect",
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
          messageId: "noDirectSetStateInUseEffect",
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
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "data[1]",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "data.at(1)",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "data.at(index)",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "data[index]",
          },
        },
      ],
    },
    {
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
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: { name: "setData1" },
        },
        {
          messageId: "noDirectSetStateInUseEffect",
          data: { name: "setData2" },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: { name: "setData1" },
        },
        {
          messageId: "noDirectSetStateInUseEffect",
          data: { name: "setData2" },
        },
      ],
    },
    {
      code: tsx`
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
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
        import { useEffect, useState, useMemo } from "react";

        const Component = () => {
          const [data, setData] = useState();
          const setAll = useMemo(() => setData, []);
          useEffect(setAll, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "noDirectSetStateInUseEffect",
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
    //     { messageId: "noDirectSetStateInUseEffect" },
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
    //     { messageId: "noDirectSetStateInUseEffect" },
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
    //     { messageId: "noDirectSetStateInUseEffect" },
    //   ],
    // },
    {
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(() => setData(), []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
        import { useEffect, useState } from "react";

        const Component = () => {
          const [data, setData] = useState();
          useEffect(setData, []);
          return null;
        }
      `,
      errors: [
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    {
      code: tsx`
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
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
        {
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setData",
          },
        },
      ],
    },
    // https://github.com/Rel1cx/eslint-react/issues/1117
    {
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
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setFoo",
          },
        },
      ],
    },
    {
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
          messageId: "noDirectSetStateInUseEffect",
          data: {
            name: "setFoo",
          },
        },
      ],
    },
    {
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
          messageId: "noDirectSetStateInUseEffect",
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
          messageId: "noDirectSetStateInUseEffect",
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
          messageId: "noDirectSetStateInUseEffect",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
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
    tsx`
      import { useEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useEffect(() => {
          const handler = () => setData(1);
        }, []);
        return null;
      }
    `,
    tsx`
      import { useEffect, useState } from "react";

      function Component() {
        const [data, setData] = useState(0);
        useEffect(() => {
          fetch().then(() => setData());
        }, []);
        return null;
      }
    `,
    tsx`
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
    tsx`
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
    tsx`
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
    tsx`
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
    tsx`
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
    tsx`
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
    tsx`
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
    tsx`
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
    tsx`
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
    // https://github.com/Rel1cx/eslint-react/issues/967
    tsx`
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
    tsx`
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
  ],
});
