import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./ensure-use-memo-has-non-empty-deps";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
        import { useMemo } from "react";

        const Comp = () => {
          const style = useMemo((theme: MantineTheme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), []);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        import { useMemo } from "react";

        const deps = [];
        const Comp = () => {
          const style = useMemo((theme: MantineTheme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), deps);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        import { useMemo } from "react";

        const Comp = () => {
          const deps = [];
          const style = useMemo((theme: MantineTheme) => ({
            input: {
              fontFamily: theme.fontFamilyMonospace
            }
          }), deps);
          return <Button sx={style} />
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        import { useMemo } from "react";

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 2, 1].sort(), []);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        const { useMemo } = require("react");

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 2, 1].sort(), []);
          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        import React from "react";

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
    },
    {
      code: dedent`
        import React from "roact";

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "roact",
        },
      },
    },
    {
      code: dedent`
        import Roact from "roact";

        function App({ items }) {
          const memoizedValue = Roact.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "roact",
        },
      },
    },
    {
      code: dedent`
        import { useMemo } from "roact";

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "roact",
        },
      },
    },
    {
      code: dedent`
        import React from "@pika/react";

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: dedent`
        import Pika from "@pika/react";

        function App({ items }) {
          const memoizedValue = Pika.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: dedent`
        import { useMemo } from "@pika/react";

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: dedent`
        const React = require("roact");

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "roact",
        },
      },
    },
    {
      code: dedent`
        const Roact = require("roact");

        function App({ items }) {
          const memoizedValue = Roact.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "roact",
        },
      },
    },
    {
      code: dedent`
        const { useMemo } = require("roact");

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "roact",
        },
      },
    },
    {
      code: dedent`
        const React = require("@pika/react");

        function App({ items }) {
          const memoizedValue = React.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: dedent`
        const Pika = require("@pika/react");

        function App({ items }) {
          const memoizedValue = Pika.useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: dedent`
        const { useMemo } = require("@pika/react");

        function App({ items }) {
          const memoizedValue = useMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: dedent`
        import React from "react";

        function App({ items }) {
          const memoizedValue = useCustomMemo(() => [0, 1, 2].sort(), []);

          return <div>{count}</div>;
        }
      `,
      errors: [
        {
          messageId: "ENSURE_USE_MEMO_HAS_NON_EMPTY_DEPS",
        },
      ],
      settings: {
        reactOptions: {
          additionalHooks: {
            useMemo: ["useCustomMemo"],
          },
        },
      },
    },
  ],
  valid: [
    ...allValid,
    dedent`
      import { useState } from "react";

      const Comp = () => {
        const [state, setState] = useState(false);

        return <Button />;
      };
    `,
    dedent`
      const useData = (key) => {
          return useSWR(key);
      }
    `,
    dedent`
      function useData(key) {
          return useSWR(key);
      }
    `,
    dedent`
      function useData(key) {
          const data = useSWR(key);
          return data;
      }
    `,
    dedent`
      const useData = (key) => useSWR(key);
    `,
    dedent`
      const onClick = () => {
        console.log("clicked");
      };

      const Comp = () => {
        return <Button onClick={onClick} />;
      };
    `,
    dedent`
      import { useMemo } from "react";

      function App({ items }) {
        const memoizedValue = useMemo(() => [...items].sort(), [items]);
        return <div>{count}</div>;
      }
    `,
  ],
});
