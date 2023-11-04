import { allFunctions } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./component-name";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: rootDir,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allFunctions,
    dedent`
      function AppHome() {
          return <div>foo</div>
      }
    `,
    {
      code: dedent`
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
    },
    dedent`
      const AppHome = () => {
          return <div>foo</div>
      }
    `,
    {
      code: dedent`
        const APP_HOME = () => {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
    },
    {
      code: dedent`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "PascalCase" }],
    },
    {
      code: dedent`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{
        rule: "CONSTANT_CASE",
        excepts: [
          "AppHome",
        ],
      }],
    },
  ],
  invalid: [
    {
      code: dedent`
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
    {
      code: dedent`
        function AppHome() {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
  ],
});
