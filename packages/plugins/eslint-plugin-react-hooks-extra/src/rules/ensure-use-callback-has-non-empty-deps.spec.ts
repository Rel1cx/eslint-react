import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./ensure-use-callback-has-non-empty-deps";

// TODO: add more tests
ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { useCallback } from "react";

        const Comp = () => {
            const onClick = useCallback(() => {
              console.log("clicked");
            }, []);

            return <Button onClick={onClick} />;
          };
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useCallback } from "react";

        const deps = [];
        const Comp = () => {
            const onClick = useCallback(() => {
              console.log("clicked");
            }, deps);

            return <Button onClick={onClick} />;
          };
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useCallback } from "react";

        const Comp = () => {
          const deps = [];
          const onClick = useCallback(() => {
              console.log("clicked");
            }, deps);

            return <Button onClick={onClick} />;
          };
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useCallback } from "react";

        const Comp = () => {
          const style = useCallback((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { useCallback } from "react";

        const Comp = () => {
          const style = useCallback((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }));
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        const { useCallback } = require("react");

        const Comp = () => {
          const style = useCallback((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        import React from "react";

        const Comp = () => {
          const style = React.useCallback((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        import React from "roact";

        function App({ items }) {
          const memoizedValue = React.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        import Roact from "roact";

        function App({ items }) {
          const memoizedValue = Roact.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        import { useCallback } from "roact";

        function App({ items }) {
          const memoizedValue = useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";

        function App({ items }) {
          const memoizedValue = React.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        import Pika from "@pika/react";

        function App({ items }) {
          const memoizedValue = Pika.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        import { useCallback } from "@pika/react";

        function App({ items }) {
          const memoizedValue = useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("roact");

        function App({ items }) {
          const memoizedValue = React.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        const Roact = require("roact");

        function App({ items }) {
          const memoizedValue = Roact.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        const { useCallback } = require("roact");

        function App({ items }) {
          const memoizedValue = useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");

        function App({ items }) {
          const memoizedValue = React.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        const Pika = require("@pika/react");

        function App({ items }) {
          const memoizedValue = Pika.useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        const { useCallback } = require("@pika/react");

        function App({ items }) {
          const memoizedValue = useCallback(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "react";

        const Comp = () => {
          const style = useCustomCallback((theme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_CALLBACK_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        "react-x": {
          additionalHooks: {
            useCallback: ["useCustomCallback"],
          },
        },
      },
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
      import { useCallback } from "react";

      const Comp = ({ theme }) => {
        const style = useCallback(() => ({
          input: {
            fontFamily: theme.fontFamilyMonospace
          }
        }), [theme.fontFamilyMonospace]);
        return <Button sx={style} />
      }
    `,
    /* tsx */ `
      import { useState, useCallback } from "react";

      function MyComponent() {
        const [showSnapshot, setShowSnapshot] = useState(false);
        const handleSnapshot = useCallback(() => setShowSnapshot(true), []);

        return null;
      }
    `,
    /* tsx */ `
      import { useCallback } from "react";

      const Comp = () => {
      const [width, setWidth] = useState<undefined | number>(undefined)
              const [open, setOpen] = useState<boolean>(false)
              const [title, setTitle] = useState<string | undefined>(undefined)

              const refItem = useCallback(() => {
                  return {
                      setWidth,
                      setWrap: setOpen,
                      setWrapperName: setTitle,
                  }
              }, [])
      };
    `,
    /* tsx */ `
      import { useCallback } from "react";
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
              const refItem = useCallback(cb, deps)
      };
    `,
  ],
});
