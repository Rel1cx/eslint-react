import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./ensure-use-callback-has-non-empty-deps";

// TODO: add more tests
ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
        import { useCallback } from "react";

        const Comp = () => {
          const style = useCallback((theme: MantineTheme) => ({
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
      code: dedent`
        import { useCallback } from "react";

        const Comp = () => {
          const style = useCallback((theme: MantineTheme) => ({
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
      code: dedent`
        const { useCallback } = require("react");

        const Comp = () => {
          const style = useCallback((theme: MantineTheme) => ({
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
      code: dedent`
        import React from "react";

        const Comp = () => {
          const style = React.useCallback((theme: MantineTheme) => ({
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
        import React from "react";

        const Comp = () => {
          const style = useCustomCallback((theme: MantineTheme) => ({
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
  ],
});
