import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unnecessary-use-memo";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useState, useMemo } from "react";

        function MyComponent() {
          const handleSnapshot = useMemo(() => () => console.log(true), []);

          return null;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useState, useMemo } from "react";

        function MyComponent() {
          const handleSnapshot = useMemo(() => () => () => console.log(true), []);

          return null;
        }
      `,
      errors: [
        {
          messageId: "noUnnecessaryUseMemo",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    /* tsx */ `
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          return useSWR(key);
      }
    `,
    /* tsx */ `
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    /* tsx */ `
      const useData = (key) => useSWR(key);
    `,
    /* tsx */ `
      const onClick = () => {
        console.log("clicked");
      };

      const Comp = () => {
        return <Button onClick={onClick} />;
      };
    `,
    /* tsx */ `
      import { useMemo } from "react";

      function App({ items }) {
        const memoizedValue = useMemo(() => [...items].sort(), [items]);
        return <div>{count}</div>;
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => {
          return () => setShowSnapshot(true)
        }, []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => () => setShowSnapshot(true), []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useMemo(() => () => () => setShowSnapshot(true), []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const a = 1;
        const handleSnapshot = useMemo(() => () => () => console.log(a), []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const a = 1;
        const handleSnapshot = useMemo(() => Date.now(), []);

        return null;
      }
    `,
    /* tsx */ `
      import { useState, useMemo } from "react";

      function MyComponent() {
        const a = 1;
        const handleSnapshot = useMemo(() => new Date(), []);

        return null;
      }
    `,
  ],
});
