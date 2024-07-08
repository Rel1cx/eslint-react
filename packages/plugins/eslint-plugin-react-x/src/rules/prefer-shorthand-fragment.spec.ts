import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-shorthand-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<React.Fragment><div /></React.Fragment>`,
      errors: [
        {
          messageId: "PREFER_SHORTHAND_FRAGMENT",
        },
      ],
    },
    {
      code: /* tsx */ `<Fragment><div /></Fragment>`,
      errors: [
        {
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
