import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-string-refs";

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
      function App() {
          return <div ref={ref} />
      }
    `,
    dedent`
      function App() {
          return <div ref={() => {}} />;
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
        function App() {
            return <div ref="ref" />
        }
      `,
      errors: [{ messageId: "INVALID" }],
    },
  ],
});
