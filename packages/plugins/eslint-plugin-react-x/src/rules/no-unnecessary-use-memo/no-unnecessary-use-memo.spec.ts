import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-use-memo";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Component() {
          const bar = useMemo(() => "foo", []);
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useMemo } from "react";

        const Comp = () => {
          const style = useMemo((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useMemo } from "react";

        const deps = [];
        const Comp = () => {
          const style = useMemo((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), deps);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { useMemo } from "react";

        const Comp = () => {
          const deps = [];
          const style = useMemo((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), deps);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import {useMemo, useState, useEffect} from 'react';

        function veryHeavyCalculation(items) {
          console.log(items)
          return items
        }

        function App({ items }) {
          const [test, setTest] = useState(0);
          const heavyStuff = useMemo(() => veryHeavyCalculation(items), [items]);

          useEffect(() => {
            setTest(heavyStuff.length)
          }, [heavyStuff]);

          return <div>items</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemoInsideUseEffect",
        },
      ],
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        const { useMemo, useState, useEffect } = require("@pika/react");

        function App({ items }) {
          const [test, setTest] = useState(0);
          const heavyStuff = useMemo(() => veryHeavyCalculation(items), [items]);

          useEffect(() => {
            setTest(heavyStuff.length)
          }, [heavyStuff]);

          return <div>items</div>;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemoInsideUseEffect",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
  ],
  valid: [
    tsx`
      function Component() {
        const foo = "foo";
        const bar = useMemo(() => foo, [foo]);
      }
    `,
    tsx`
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    tsx`
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    tsx`
      function useData(key) {
          return useSWR(key);
      }
    `,
    tsx`
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    tsx`
      const useData = (key) => useSWR(key);
    `,
    tsx`
      const onClick = () => {
        console.log("clicked");
      };

      const Comp = () => {
        return <Button onClick={onClick} />;
      };
    `,
    tsx`
      import { useMemo } from "react";

      function App({ items }) {
        const memoizedValue = useMemo(() => [...items].sort(), [items]);
        return <div>{count}</div>;
      }
    `,
    tsx`
      import { useMemo } from "react";

      const Comp = () => {
      const [width, setWidth] = useState<undefined | number>(undefined)
              const [open, setOpen] = useState<boolean>(false)
              const [title, setTitle] = useState<string | undefined>(undefined)

              const refItem = useMemo(() => {
                  return {
                      setWidth,
                      setWrap: setOpen,
                      setWrapperName: setTitle,
                  }
              }, [])
      };
    `,
    tsx`
      import { useMemo } from "react";
      const deps = []
      const Comp = () => {
      const [width, setWidth] = useState<undefined | number>(undefined)
              const [open, setOpen] = useState<boolean>(false)
              const [title, setTitle] = useState<string | undefined>(undefined)
              const cb = () => {
                  return {
                      setWidth,
                      setWrap: setOpen,
                      setWrapperName: setTitle,
                  }
              }
              const refItem = useMemo(cb, deps)
      };
    `,
    tsx`
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => {
          return () => setShowSnapshot(true)
        }, []);

        return null;
      }
    `,
    tsx`
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => () => setShowSnapshot(true), []);

        return null;
      }
    `,
    tsx`
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => () => () => setShowSnapshot(true), []);

        return null;
      }
    `,
    tsx`
      import { useState, useMemo } from "react";

      function MyComponent() {
        const a = 1;
        const handleSnapshot = useMemo(() => () => () => console.log(a), []);

        return null;
      }
    `,
    tsx`
      import { useState, useMemo } from "react";

      function MyComponent() {
        const a = 1;
        const handleSnapshot = useMemo(() => Date.now(), []);

        return null;
      }
    `,
    tsx`
      import { useState, useMemo } from "react";

      function MyComponent() {
        const a = 1;
        const handleSnapshot = useMemo(() => new Date(), []);

        return null;
      }
    `,

    tsx`
      import { useMemo, useState, useEffect } from 'react';

      function App({ items }) {
        const [test, setTest] = useState(0);
        const heavyStuff = useMemo(() => veryHeavyCalculation(items), [items]);

        useEffect(() => {
          setTest(heavyStuff.length)
        }, [heavyStuff]);

        return <div>{heavyStuff.length}</div>;
      }
    `,
    tsx`
      import { useMemo, useState, useEffect } from 'react';

      function App({ items }) {
        const [test, setTest] = useState(0);
        const heavyStuff = useMemo(() => veryHeavyCalculation(items), [items]);

        useEffect(() => {
          setTest(heavyStuff.length)
        }, [heavyStuff]);

        useEffect(() => {
          console.log(heavyStuff)
        }, [heavyStuff]);

        return <div>{heavyStuff.length}</div>;
      }
    `,
    tsx`
      import { useMemo } from 'react';

      function App({ items }) {
        const heavyStuff = useMemo(() => veryHeavyCalculation(items), [items]);

        return <div>{heavyStuff.length}</div>;
      }
    `,
  ],
});
