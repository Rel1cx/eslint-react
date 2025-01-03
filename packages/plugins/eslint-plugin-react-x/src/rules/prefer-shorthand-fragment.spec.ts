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
      output: "<><div /></>",
    },
    {
      code: /* tsx */ `<Fragment><div /></Fragment>`,
      errors: [
        {
          messageId: "preferShorthandFragment",
        },
      ],
      output: "<><div /></>",
    },
    {
      code: /* tsx */ `
        <React.Fragment>
            <div />
        </React.Fragment>
      `,
      errors: [
        {
          messageId: "preferShorthandFragment",
        },
      ],
      output: `
        <>
            <div />
        </>
      `,
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
  ],
});
