import { ruleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-shadowing-underscore";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* ts */ `
        const _ = 1;
      `,
      errors: [{ messageId: "noShadowingUnderscore" }],
    },
    {
      code: /* ts */ `
        const [_, foo] = [1, 2];
      `,
      errors: [{ messageId: "noShadowingUnderscore" }],
    },
    {
      code: /* ts */ `
        const { name: _, ...rest } = { name: "foo", age: 20 };
      `,
      errors: [{ messageId: "noShadowingUnderscore" }],
    },
  ],
  valid: [
    /* ts */ `
      const __ = 1;
    `,
    /* ts */ `
      const [__, foo] = [1, 2];
    `,
    /* ts */ `
      const { name: __, ...rest } = { name: "foo", age: 20 };
    `,
    /* ts */ `
      import { _ } from "@eslint-react/eff";
    `,
    /* ts */ `
      import { _ } from "@eslint-react/eff";

      const value = _;
    `,
    /* ts */ `
      import { _ } from "@eslint-react/eff";

      function foo() {
        return _;
      }
    `,
  ],
});
