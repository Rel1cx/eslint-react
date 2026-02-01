import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-script-url";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<a href={"javascript:"}></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<Foo href="javascript:"></Foo>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="javascript:"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="javascript:void(0)"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<a href="j\n\n\na\rv\tascript:"></a>',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<Foo to="javascript:"></Foo>',
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        <div>
          <Foo href="javascript:"></Foo>
          <Bar link="javascript:"></Bar>
        </div>
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    ...allValid,
    '<a href="https://react.dev"></a>',
    '<a href="mailto:foo@bar.com"></a>',
    '<a href="#"></a>',
    '<a href=""></a>',
    '<a name="foo"></a>',
    "<a href />",
  ],
});
