import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-shorthand-fragment";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<React.Fragment><div /></React.Fragment>",
      errors: [
        {
          data: {
            fragmentPragma: "Fragment",
            reactPragma: "React",
          },
          messageId: "PREFER_SHORTHAND_FRAGMENT",
        },
      ],
    },
    {
      code: "<Fragment><div /></Fragment>",
      errors: [
        {
          data: {
            fragmentPragma: "Fragment",
            reactPragma: "React",
          },
          messageId: "PREFER_SHORTHAND_FRAGMENT",
        },
      ],
    },
  ],
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
});
