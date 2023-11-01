import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-duplicate-key";

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

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      const App = () => {
          return [<div key="1">1</div>]
      };
    `,
    dedent`
      const App = () => {
          return [
                  <div key="1">1</div>,
                  <div key="2">2</div>,
                  <div key="3">3</div>,
               ]
      };
    `,
    dedent`
      const App = () => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
  ],
  invalid: [
    {
      code: dedent`
        const App = () => {
            return [
                    <div key="1">1</div>,
                    <div key="1">2</div>,
                    <div key="1">3</div>,
                 ]
        };
      `,
      errors: [
        {
          messageId: "NO_DUPLICATE_KEY",
          data: {
            value: '"1"',
          },
        },
        {
          messageId: "NO_DUPLICATE_KEY",
          data: {
            value: '"1"',
          },
        },
        {
          messageId: "NO_DUPLICATE_KEY",
          data: {
            value: '"1"',
          },
        },
      ],
    },
    {
      code: dedent`
        const App = () => {
            return  (<div>
                        <div key="1">1</div>
                        <div key="1">2</div>
                        <div key="1">3</div>
                    </div>)
        };
      `,
      errors: [
        {
          messageId: "NO_DUPLICATE_KEY",
          data: {
            value: '"1"',
          },
        },
        {
          messageId: "NO_DUPLICATE_KEY",
          data: {
            value: '"1"',
          },
        },
        {
          messageId: "NO_DUPLICATE_KEY",
          data: {
            value: '"1"',
          },
        },
      ],
    },
    {
      code: dedent`
        const App = () => {
            return [1, 2, 3].map((item) => <div key="1">{item}</div>)
        };
      `,
      errors: [
        {
          messageId: "NO_DUPLICATE_KEY",
          data: {
            value: '"1"',
          },
        },
      ],
    },
  ],
});
