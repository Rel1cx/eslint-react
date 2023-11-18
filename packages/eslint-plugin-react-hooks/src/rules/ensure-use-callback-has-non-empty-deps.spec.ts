import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./ensure-use-callback-has-non-empty-deps";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
});

// TODO: add more tests
ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
  ],
  invalid: [
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
  ],
});
