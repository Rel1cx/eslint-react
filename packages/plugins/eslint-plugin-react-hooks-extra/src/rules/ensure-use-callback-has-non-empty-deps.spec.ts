import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./ensure-use-callback-has-non-empty-deps";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

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
        reactOptions: {
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
