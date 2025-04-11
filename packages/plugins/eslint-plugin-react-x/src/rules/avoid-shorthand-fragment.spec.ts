import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./avoid-shorthand-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<><div /></>`,
      errors: [
        {
          messageId: "avoidShorthandFragment",
        },
      ],
    },
    {
      code: tsx`<><div /><div /></>`,
      errors: [
        {
          messageId: "avoidShorthandFragment",
        },
      ],
    },
    {
      code: tsx`
        /** @jsx createElement */
        /** @jsxFrag Fragment */

        const element = <><div /></>;
      `,
      errors: [
        {
          messageId: "avoidShorthandFragment",
          data: {
            jsxFragmentFactory: "Fragment",
          },
        },
      ],
    },
    {
      code: tsx`
        /** @jsx React.createElement */
        /** @jsxFrag React.Fragment */

        const element = <><div /></>;
      `,
      errors: [
        {
          messageId: "avoidShorthandFragment",
          data: {
            jsxFragmentFactory: "React.Fragment",
          },
        },
      ],
    },
    {
      code: tsx`
        /** @jsx h */
        /** @jsxFrag Fragment */

        const element = <><div /></>;
      `,
      errors: [
        {
          messageId: "avoidShorthandFragment",
          data: {
            jsxFragmentFactory: "Fragment",
          },
        },
      ],
    },
    {
      code: tsx`
        /** @jsx Preact.h */
        /** @jsxFrag Preact.Fragment */

        const element = <><div /></>;
      `,
      errors: [
        {
          messageId: "avoidShorthandFragment",
          data: {
            jsxFragmentFactory: "Preact.Fragment",
          },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    "<React.Fragment><Foo /><Bar /></React.Fragment>",
    "<Fragment>foo<div /></Fragment>",
  ],
});
