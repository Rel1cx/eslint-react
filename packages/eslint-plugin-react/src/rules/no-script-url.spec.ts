import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { defaultParserOptions } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-script-url";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    '<a href="https://react.dev"></a>',
    '<a href="mailto:foo@bar.com"></a>',
    '<a href="#"></a>',
    '<a href=""></a>',
    '<a name="foo"></a>',
    "<a href />",
  ],
  invalid: [
    {
      code: '<a href={"javascript:"}></a>',
      errors: [{ messageId: "NO_SCRIPT_URL" }],
    },
    {
      code: '<Foo href="javascript:"></Foo>',
      errors: [{ messageId: "NO_SCRIPT_URL" }],
    },
    {
      code: '<a href="javascript:"></a>',
      errors: [{ messageId: "NO_SCRIPT_URL" }],
    },
    {
      code: '<a href="javascript:void(0)"></a>',
      errors: [{ messageId: "NO_SCRIPT_URL" }],
    },
    {
      code: '<a href="j\n\n\na\rv\tascript:"></a>',
      errors: [{ messageId: "NO_SCRIPT_URL" }],
    },
    {
      code: '<Foo to="javascript:"></Foo>',
      errors: [{ messageId: "NO_SCRIPT_URL" }],
    },
    {
      code: dedent`
        <div>
          <Foo href="javascript:"></Foo>
          <Bar link="javascript:"></Bar>
        </div>
      `,
      errors: [
        { messageId: "NO_SCRIPT_URL" },
        { messageId: "NO_SCRIPT_URL" },
      ],
    },
  ],
});
