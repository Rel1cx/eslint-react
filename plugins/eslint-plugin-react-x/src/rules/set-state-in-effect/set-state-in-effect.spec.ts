import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
          data: {
            name: "setData",
          },
          messageId: "default",
        },
      ],
    },
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: { name: "setData1" },
          messageId: "default",
        },
        {
          data: { name: "setData2" },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: { name: "setData1" },
          messageId: "default",
        },
        {
          data: { name: "setData2" },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
        },
        {
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setFoo",
          },
          messageId: "default",
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
          data: {
            name: "setFoo",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
        },
      ],
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
          data: {
            name: "data[1]",
          },
          messageId: "default",
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
          data: {
            name: "data.at(1)",
          },
          messageId: "default",
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
          data: {
            name: "data.at(index)",
          },
          messageId: "default",
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
          data: {
            name: "data[index]",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
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
          data: {
            name: "setData",
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          additionalStateHooks: "/^(useSta1|useSta2)$/u",
        },
      },
    },
    // --- Cases covering newly traversed node types (non-ref, should report) ---
    {
      name: "setState with conditional expression (non-ref values)",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(flag ? valueA : valueB);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          data: {
            name: "setData",
          },
          messageId: "default",
        },
      ],
    },
    // This case was previously reported because the rule did not detect ref in conditional
    // expressions. Now it is correctly allowed since ref.current is used as an argument.
    // {
    //   name: "setState with ref.current inside conditional expression",
    //   ...
    // }
    {
      name: "setState with ref value inside computed member expression (rule does not detect ref in computed property)",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef("key");
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(lookup[ref.current]);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          data: {
            name: "setData",
          },
          messageId: "default",
        },
      ],
    },
    // --- Namespace import cases ---
    {
      name: "setState in React.useEffect with namespace import",
      code: tsx`
        import * as React from "react";

        function Component() {
          const [data, setData] = React.useState(0);
          React.useEffect(() => {
            setData(1);
          }, []);
          return null;
        }
      `,
      errors: [
        {
          data: { name: "setData" },
          messageId: "default",
        },
      ],
    },
    // --- useEffectEvent cases ---
    {
      name: "setState via useEffectEvent called in effect",
      code: tsx`
        import { useEffect, useState, useEffectEvent } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const handler = useEffectEvent(() => {
            setData(1);
          });
          useEffect(() => {
            handler();
          }, []);
          return null;
        }
      `,
      errors: [
        {
          data: { name: "setData" },
          messageId: "default",
        },
      ],
    },
    {
      name: "setState via useEffectEvent passed directly to useEffect",
      code: tsx`
        import { useEffect, useState, useEffectEvent } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const handler = useEffectEvent(() => {
            setData(1);
          });
          useEffect(handler, []);
          return null;
        }
      `,
      errors: [
        {
          data: { name: "setData" },
          messageId: "default",
        },
      ],
    },
    // --- Dependency array cases ---
    {
      name: "setState in effect deps should still report",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component({ prop }) {
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(prop);
          }, [prop, setData]);
          return null;
        }
      `,
      errors: [
        {
          data: { name: "setData" },
          messageId: "default",
        },
      ],
    },
    // --- Prop-gated conditional (should still report) ---
    {
      name: "setState inside prop-gated if statement should still report",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component({ prop }) {
          const [data, setData] = useState(0);
          useEffect(() => {
            if (prop !== data) {
              setData(prop);
            }
          }, []);
          return null;
        }
      `,
      errors: [
        {
          data: { name: "setData" },
          messageId: "default",
        },
      ],
    },
    // --- React Compiler fixtures: invalid ---
    {
      name: "setState in effect with NewExpression default param",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component({ value = new Number() }) {
          const [state, setState] = useState(0);
          useEffect(() => {
            setState(s => s + 1);
          });
          return state;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "conditional setState from props in effect (derived event pattern)",
      code: tsx`
        import { useState, useEffect } from "react";

        function VideoPlayer({ isPlaying }) {
          const [wasPlaying, setWasPlaying] = useState(isPlaying);
          useEffect(() => {
            if (isPlaying !== wasPlaying) {
              setWasPlaying(isPlaying);
            }
          }, [isPlaying, wasPlaying]);
          return <video />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const [count, setCount] = useState(0);
          useEffect(() => {
            (setCount as any)(1);
          }, []);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const state = useState(0);
          useEffect(() => {
            (state.at(1) as any)(1);
          }, []);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const [count, setCount] = (useState as any)(0);
          useEffect(() => {
            setCount(1);
          }, []);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        function Component() {
          const [count, setCount] = useState(0);
          const fn = () => setCount(1);
          useEffect(() => {
            (fn as any)();
          }, []);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // A local variable not derived from a ref is still reported
    {
      name: "setState with local variable derived from a non-ref member chain",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [width, setWidth] = useState(0);
          useEffect(() => {
            const innerWidth = window.document.documentElement.clientWidth;
            setWidth(innerWidth);
          }, []);
          return null;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // The member chain must be rooted at a ref-named identifier; `.current` alone is not enough
    {
      name: "setState with local variable derived from a non-ref root with .current in the chain",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [width, setWidth] = useState(0);
          useEffect(() => {
            const w = someObj.current.offsetWidth;
            setWidth(w);
          }, []);
          return null;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // The ref-derived value exemption does not extend to prop-derived values reached indirectly
    {
      name: "setState with prop-derived value inside a useCallback invoked from the effect",
      code: tsx`
        import { useCallback, useEffect, useState } from "react";

        function Component({ value }) {
          const [state, setState] = useState(0);
          const update = useCallback(() => {
            setState(value);
          }, [value]);
          useEffect(() => {
            update();
          }, [update]);
          return null;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // A literal argument is not ref-derived even when reached indirectly
    {
      name: "setState with literal value inside a function invoked from the effect",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component({ open }) {
          const [count, setCount] = useState(0);
          useEffect(() => {
            const reset = () => {
              setCount(0);
            };
            if (open) {
              reset();
            }
          }, [open]);
          return null;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // FIXME false positive: the setState arguments are parameters of a helper that the
    // setup only ever feeds with DOM measurements, but the rule cannot map call-site
    // arguments to parameter positions (and here some call sites also pass literals).
    // Should become valid once call-site-sensitive argument mapping is supported.
    // Distilled from facebook/astryx packages/core/src/Selector/hooks.ts (commitPosition).
    {
      name: "setState with measurement values passed through a helper's parameters",
      code: tsx`
        import { useCallback, useLayoutEffect, useRef, useState } from "react";

        function useSelectedItemOffset({ isOpen, listboxRef, anchorRef }) {
          const [offset, setOffset] = useState(0);
          const [isPositioned, setIsPositioned] = useState(false);

          const commitPosition = useCallback(
            (nextOffset, nextIsPositioned) => {
              setOffset(nextOffset);
              setIsPositioned(nextIsPositioned);
            },
            [],
          );

          useLayoutEffect(() => {
            if (!isOpen) {
              commitPosition(0, false);
              return;
            }
            if (!listboxRef.current || !anchorRef.current) {
              commitPosition(0, true);
              return;
            }
            const anchorRect = anchorRef.current.getBoundingClientRect();
            commitPosition(anchorRect.top, true);
          }, [isOpen, commitPosition]);

          return { offset, isPositioned };
        }
      `,
      // Reported once per call site in the setup, for each setState in the helper
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // FIXME false positive: same parameter-mediation limitation with a single call site.
    // Should become valid once call-site-sensitive argument mapping is supported.
    // Distilled from facebook/astryx packages/core/src/BottomSheet/useSheetGestures.ts
    // (recordSettledLayoutOffset).
    {
      name: "setState with a measurement value passed through a recording helper's parameter",
      code: tsx`
        import { useCallback, useEffect, useState } from "react";

        function useSheetGestures({ isOpen }) {
          const [settledLayoutOffset, setSettledLayoutOffset] = useState(0);
          const recordSettledLayoutOffset = useCallback((offset) => {
            const normalizedOffset = Math.max(0, offset);
            setSettledLayoutOffset(normalizedOffset);
          }, []);
          useEffect(() => {
            recordSettledLayoutOffset(42);
          }, [recordSettledLayoutOffset]);
          return settledLayoutOffset;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // FIXME false positive: the measured element is a DOM node held in state (written by a
    // callback ref), which the ref-name heuristic cannot recognize as a measurement source.
    // Should become valid once state-held DOM elements are treated like ref-derived sources.
    // Distilled from facebook/astryx packages/core/src/hooks/useScrollableArea.ts.
    {
      name: "setState with measurements of a DOM element held in state",
      code: tsx`
        import { useCallback, useLayoutEffect, useState } from "react";

        function useScrollableArea() {
          const [viewport, setViewport] = useState(null);
          const [measured, setMeasured] = useState(null);
          const viewportRef = useCallback((node) => {
            setViewport((current) => (current === node ? current : node));
          }, []);
          useLayoutEffect(() => {
            if (viewport == null) {
              return;
            }
            const measure = () => {
              const next = {
                inline: viewport.scrollWidth > viewport.clientWidth,
                block: viewport.scrollHeight > viewport.clientHeight,
              };
              setMeasured((current) => (current === next ? current : next));
            };
            measure();
          }, [viewport]);
          return measured;
        }
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
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
      name: "setState with variable derived from ref.current via nested member access",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          useEffect(() => {
            const offsetWidth = containerRef.current.offsetWidth;
            setWidth(offsetWidth);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with variable derived from ref.current via optional chaining",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const containerRef = useRef(null);
          const [width, setWidth] = useState(0);
          useEffect(() => {
            const w = containerRef.current?.offsetWidth;
            setWidth(w);
          }, []);
          return null;
        }
      `,
    },
    // --- Cases covering newly traversed node types (ref values, should NOT report) ---
    {
      name: "setState in async effect is treated as deferred (not reported)",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(async () => {
            setData(await somePromise);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref.current inside a nested call argument (conditional branch)",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef(null);
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(Number(flag ? ref.current : 0));
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref value via callee chain (ref.current method called as argument)",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef(null);
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(transform(ref.current.getValue()));
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
      name: "setState with variable derived from ref.current via call expression with member access in set function and return new value in function body",
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
      name: "setState with variable derived from ref.current via call expression with member access in set function and return new value in function body",
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
      name: "setState with variable derived from ref.current via call expression with member access in set function and return new value in function body",
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
    // --- Namespace import valid cases ---
    {
      name: "setState with ref via namespace import",
      code: tsx`
        import * as React from "react";

        function Component() {
          const [data, setData] = React.useState(0);
          const ref = React.useRef(0);
          React.useEffect(() => {
            setData(ref.current);
          }, []);
          return null;
        }
      `,
    },
    // --- Ref-gated conditional valid cases ---
    {
      name: "setState inside ref-gated if statement",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const prevRef = useRef(0);
          useEffect(() => {
            if (prevRef.current !== data) {
              setData(prevRef.current);
            }
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState inside ref-gated conditional expression",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const [data, setData] = useState(0);
          const flagRef = useRef(false);
          useEffect(() => {
            flagRef.current ? setData(1) : setData(0);
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with ref.current inside conditional expression",
      code: tsx`
        import { useEffect, useState, useRef } from "react";

        function Component() {
          const ref = useRef(0);
          const [data, setData] = useState(0);
          useEffect(() => {
            setData(flag ? ref.current : 0);
          }, []);
          return null;
        }
      `,
    },
    // --- React Compiler fixtures: valid ---
    {
      name: "setState with ref in useLayoutEffect",
      code: tsx`
        import { useState, useRef, useLayoutEffect } from "react";

        function Tooltip() {
          const ref = useRef(null);
          const [tooltipHeight, setTooltipHeight] = useState(0);
          useLayoutEffect(() => {
            const { height } = ref.current.getBoundingClientRect();
            setTooltipHeight(height);
          }, []);
          return tooltipHeight;
        }
      `,
    },
    {
      name: "setState with ref value via arithmetic",
      code: tsx`
        import { useState, useRef, useLayoutEffect } from "react";

        function Component() {
          const ref = useRef({ size: 5 });
          const [computedSize, setComputedSize] = useState(0);
          useLayoutEffect(() => {
            setComputedSize(ref.current.size * 10);
          }, []);
          return computedSize;
        }
      `,
    },
    {
      name: "setState with ref value via array index",
      code: tsx`
        import { useState, useRef, useEffect } from "react";

        function Component() {
          const ref = useRef([1, 2, 3, 4, 5]);
          const [value, setValue] = useState(0);
          useEffect(() => {
            const index = 2;
            setValue(ref.current[index]);
          }, []);
          return value;
        }
      `,
    },
    {
      name: "setState with ref value via function call",
      code: tsx`
        import { useState, useRef, useEffect } from "react";

        function Component() {
          const ref = useRef(null);
          const [width, setWidth] = useState(0);
          useEffect(() => {
            function getBoundingRect(ref) {
              if (ref.current) {
                return ref.current.getBoundingClientRect?.()?.width ?? 100;
              }
              return 100;
            }
            setWidth(getBoundingRect(ref));
          }, []);
          return width;
        }
      `,
    },
    {
      name: "setState in transitive listener via setTimeout",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [state, setState] = useState(0);
          useEffect(() => {
            const f = () => {
              setState();
            };
            setTimeout(() => f(), 10);
          });
          return state;
        }
      `,
    },
    {
      name: "setState controlled by ref value with external functions",
      code: tsx`
        import { useState, useRef, useEffect } from "react";

        function Component({ x, y }) {
          const previousXRef = useRef(null);
          const previousYRef = useRef(null);
          const [data, setData] = useState(null);

          useEffect(() => {
            const previousX = previousXRef.current;
            previousXRef.current = x;
            const previousY = previousYRef.current;
            previousYRef.current = y;
            if (!areEqual(x, previousX) || !areEqual(y, previousY)) {
              const data = load({ x, y });
              setData(data);
            }
          }, [x, y]);

          return data;
        }

        function areEqual(a, b) {
          return a === b;
        }

        function load({ x, y }) {
          return x * y;
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
    // useEffect with a plain function identifier (not setState) should not crash
    {
      name: "useEffect with plain function identifier",
      code: tsx`
        import { useEffect } from "react";

        function Component() {
          const fn = () => {};
          useEffect(fn, []);
          return null;
        }
      `,
    },
    // Setter identifier assigned to variable in effect (parent is VariableDeclarator, not CallExpression)
    {
      name: "setter identifier assigned to local variable in effect",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            const fn = setData;
          }, []);
          return null;
        }
      `,
    },
    // Setter identifier in conditional expression in effect (parent is ConditionalExpression)
    {
      name: "setter identifier in conditional expression in effect",
      code: tsx`
        import { useEffect, useState } from "react";

        function Component() {
          const [data, setData] = useState(0);
          useEffect(() => {
            const fn = condition ? setData : null;
          }, []);
          return null;
        }
      `,
    },
    // https://github.com/Rel1cx/eslint-react/issues/1944
    {
      name: "render-phase setState with an effect calling a prop function",
      code: tsx`
        import { useEffect, useState } from "react";

        export function One({ target, onDone }: { target: number; onDone: () => void }) {
          const [page, setPage] = useState(1);
          if (page !== target) setPage(target);
          useEffect(() => {
            onDone();
          }, [onDone, target]);
          return <div>{page}</div>;
        }
      `,
    },
    // https://github.com/Rel1cx/eslint-react/issues/1944
    {
      name: "render-phase setState with multiple effects calling a prop function",
      code: tsx`
        import { useEffect, useState } from "react";

        export function Two({ target, onDone }: { target: number; onDone: () => void }) {
          const [page, setPage] = useState(1);
          if (page !== target) setPage(target);
          useEffect(() => {
            onDone();
          }, [onDone, target]);
          useEffect(() => {
            onDone();
          }, [onDone]);
          return <div>{page}</div>;
        }
      `,
    },
    // https://github.com/Rel1cx/eslint-react/issues/1944
    {
      name: "render-phase setState with a prop function passed to useEffect as setup",
      code: tsx`
        import { useEffect, useState } from "react";

        export function Component({ target, onDone }: { target: number; onDone: () => void }) {
          const [page, setPage] = useState(1);
          if (page !== target) setPage(target);
          useEffect(onDone, [onDone, target]);
          return <div>{page}</div>;
        }
      `,
    },
    // Ported from https://github.com/oxc-project/oxc/issues/26007
    // setState behind an early-return guard derived from a ref read through a local
    // variable: react-hooks 7.1.1 and oxlint both allow this (the issue was closed
    // upstream as intended behavior). The ref read is traced through `dv`, and the
    // `if (dv === 0) return;` sibling guard exempts the following setState.
    {
      name: "setState behind an early-return guard derived from a ref read via local variable",
      code: tsx`
        import { useEffect, useRef, useState } from "react";

        export function Bar({ visible }) {
          const prevVisible = useRef(0);
          const [direction, setDirection] = useState(null);

          useEffect(() => {
            const dv = visible - prevVisible.current;
            if (dv === 0) return;
            setDirection("right");
          }, [visible]);

          return <p>{direction}</p>;
        }
      `,
    },
    // An early-return guard whose test reads a ref directly also gates the rest of the block.
    {
      name: "setState behind an early-return guard reading a ref directly",
      code: tsx`
        import { useEffect, useRef, useState } from "react";

        export function Bar({ visible }) {
          const prevVisible = useRef(0);
          const [direction, setDirection] = useState(null);

          useEffect(() => {
            if (prevVisible.current === visible) return;
            prevVisible.current = visible;
            setDirection("right");
          }, [visible]);

          return <p>{direction}</p>;
        }
      `,
    },
    // The ref-derived value exemption also applies to setState reached indirectly
    // (via a function or hook callback invoked from the setup)
    {
      name: "setState with ref-derived value inside a useCallback invoked from the effect",
      code: tsx`
        import { useCallback, useEffect, useRef, useState } from "react";

        function Component({ isOpen }) {
          const menuRef = useRef(null);
          const [hasOverflow, setHasOverflow] = useState(false);
          const measureOverflow = useCallback(() => {
            const menu = menuRef.current;
            if (menu == null) {
              return;
            }
            const nextHasOverflow = menu.scrollHeight > menu.clientHeight + 1;
            setHasOverflow((current) => (current === nextHasOverflow ? current : nextHasOverflow));
          }, []);
          useEffect(() => {
            if (!isOpen) {
              return;
            }
            measureOverflow();
          }, [isOpen, measureOverflow]);
          return null;
        }
      `,
    },
    {
      name: "setState with ref-derived value via a ref-rooted local inside a function invoked from the effect",
      code: tsx`
        import { useEffect, useRef, useState } from "react";

        function Component() {
          const scrollerRef = useRef(null);
          const [paneSize, setPaneSize] = useState(0);
          useEffect(() => {
            const measure = () => {
              const scroller = scrollerRef.current;
              if (scroller == null) {
                return;
              }
              const measured = scroller.clientWidth;
              if (measured > 0) {
                setPaneSize(measured);
              }
            };
            measure();
          }, []);
          return null;
        }
      `,
    },
    {
      name: "setState with value derived from a ref link nested in a member chain",
      code: tsx`
        import { useCallback, useEffect, useState } from "react";

        function Component({ popover }) {
          const [hasOverflow, setHasOverflow] = useState(false);
          const measureOverflow = useCallback(() => {
            const surface = popover.contentRef.current;
            if (surface == null) {
              return;
            }
            const nextHasOverflow = surface.scrollHeight > surface.clientHeight + 1
              || surface.scrollWidth > surface.clientWidth + 1;
            setHasOverflow((current) => (current === nextHasOverflow ? current : nextHasOverflow));
          }, [popover.contentRef]);
          useEffect(() => {
            measureOverflow();
          }, [measureOverflow]);
          return null;
        }
      `,
    },
    // A parameter named `ref`/`xxxRef` is a ref by the same naming heuristic used for locals
    {
      name: "setState with value derived from a ref received as a parameter",
      code: tsx`
        import { useEffect, useState } from "react";

        function useDetectedMode(ref, computeMode) {
          const [detected, setDetected] = useState(null);
          useEffect(() => {
            const surface = ref.current?.parentElement ?? null;
            if (surface === null) {
              return;
            }
            const next = computeMode(surface);
            setDetected((current) => (current === next ? current : next));
          });
          return detected;
        }
      `,
    },
  ],
});
