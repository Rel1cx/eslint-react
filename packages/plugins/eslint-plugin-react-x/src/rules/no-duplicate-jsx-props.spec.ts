import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-duplicate-jsx-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<div a="1" a="2" />;`,
      errors: [{ messageId: "noDuplicateJsxProps" }],
    },
    {
      code: /* tsx */ `<div a="1" b="2" a="3" />;`,
      errors: [{ messageId: "noDuplicateJsxProps" }],
    },
    {
      code: /* tsx */ `<div a="1" {...b} a="2" />;`,
      errors: [{ messageId: "noDuplicateJsxProps" }],
    },
    {
      code: /* tsx */ `<div a="1" {...a} {...b} a="2" />;`,
      errors: [{ messageId: "noDuplicateJsxProps" }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `const a = <div a="1" aa="2" />;`,
    /* tsx */ `const a = <div a="1" aa="2"><span a="1" aa="2" /></div>;`,
    /* tsx */ `const a = <div a="1" b="2" />;`,
    /* tsx */ `const a = <div a="1" {...b} />;`,
    /* tsx */ `const a = <div {...a} {...b} />;`,
  ],
});
