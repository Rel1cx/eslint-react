import { ruleTester } from "../../../../test";
import rule, { RULE_NAME } from "./avoid-multiline-template-expression";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: [
        "const foo = `foo",
        "bar`;",
      ].join("\n"),
      errors: [{ messageId: "avoidMultilineTemplateExpression" }],
    },
  ],
  valid: [
    "const foo = `foo`;",
    "const foo = `foo${bar}`;",
    "const foo = `foo${bar}baz\\n`;",
  ],
});
