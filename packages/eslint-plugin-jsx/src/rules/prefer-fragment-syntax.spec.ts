import { allValid } from "@eslint-react/shared";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./prefer-fragment-syntax";

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
    "<><Foo /><Bar /></>",
    "<>foo<div /></>",
    "<> <div /></>",
    '<>{"moo"} </>',
    "<NotFragment />",
    "<React.NotFragment />",
    "<NotReact.Fragment />",
    "<Foo><><div /><div /></></Foo>",
    '<div p={<>{"a"}{"b"}</>} />',
    "<Fragment key={item.id}>{item.value}</Fragment>",
    "<Fooo content={<>eeee ee eeeeeee eeeeeeee</>} />",
    "<>{foos.map(foo => foo)}</>",
  ],
  invalid: [
    {
      code: "<React.Fragment><div /></React.Fragment>",
      output: "<><div /></>",
      errors: [
        {
          messageId: "PREFER_FRAGMENT_SYNTAX",
          data: {
            reactPragma: "React",
            fragmentPragma: "Fragment",
          },
        },
      ],
    },
    {
      code: "<Fragment><div /></Fragment>",
      output: "<><div /></>",
      errors: [
        {
          messageId: "PREFER_FRAGMENT_SYNTAX",
          data: {
            reactPragma: "React",
            fragmentPragma: "Fragment",
          },
        },
      ],
    },
  ],
});
