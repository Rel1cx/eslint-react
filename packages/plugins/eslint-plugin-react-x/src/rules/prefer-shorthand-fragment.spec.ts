import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-shorthand-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<React.Fragment><div /></React.Fragment>`,
      errors: [
        {
          messageId: "preferShorthandFragment",
        },
      ],
    },
    {
      code: /* tsx */ `<Fragment><div /></Fragment>`,
      errors: [
        {
          messageId: "preferShorthandFragment",
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
    "<Foo><><div /><div /></></Foo>",
    '<div p={<>{"a"}{"b"}</>} />',
    "<Fragment key={item.id}>{item.value}</Fragment>",
    "<Fooo content={<>eeee ee eeeeeee eeeeeeee</>} />",
    "<>{foos.map(foo => foo)}</>",
    {
      code: /* tsx */ `<NotReact.Fragment />`,
      settings: {
        "react-x": {
          strictImportCheck: true,
        },
      },
    },
  ],
});
