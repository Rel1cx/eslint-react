import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-shorthand-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<React.Fragment><div /></React.Fragment>`,
      errors: [
        {
          messageId: "jsxShorthandFragment",
        },
      ],
      output: tsx`<><div /></>`,
    },
    {
      code: tsx`<Fragment><div /></Fragment>`,
      errors: [
        {
          messageId: "jsxShorthandFragment",
        },
      ],
      output: tsx`<><div /></>`,
    },
    {
      code: tsx`
        <React.Fragment>
            <div />
        </React.Fragment>
      `,
      errors: [
        {
          messageId: "jsxShorthandFragment",
        },
      ],
      output: tsx`
        <>
            <div />
        </>
      `,
    },
  ],
  valid: [
    ...allValid,
    tsx`<><Foo /><Bar /></>`,
    tsx`<>foo<div /></>`,
    tsx`<> <div /></>`,
    tsx`<>{"moo"} </>`,
    tsx`<NotFragment />`,
    tsx`<React.NotFragment />`,
    tsx`<Foo><><div /><div /></></Foo>`,
    tsx`<div p={<>{"a"}{"b"}</>} />`,
    tsx`<Fragment key={item.id}>{item.value}</Fragment>`,
    tsx`<Fooo content={<>eeee ee eeeeeee eeeeeeee</>} />`,
    tsx`<>{foos.map(foo => foo)}</>`,
  ],
});
