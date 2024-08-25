import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-prop";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<div children />;`, // not a valid use case but make sure we don't crash
      errors: [{ messageId: "noChildrenProp" }],
    },
    {
      code: '<div children="Children" />;',
      errors: [{ messageId: "noChildrenProp" }],
    },
    {
      code: /* tsx */ `<div children={<div />} />;`,
      errors: [{ messageId: "noChildrenProp" }],
    },
    {
      code: /* tsx */ `<div children={[<div />, <div />]} />;`,
      errors: [{ messageId: "noChildrenProp" }],
    },
    {
      code: '<div children="Children">Children</div>;',
      errors: [{ messageId: "noChildrenProp" }],
    },
    {
      code: '<MyComponent children="Children" />',
      errors: [{ messageId: "noChildrenProp" }],
    },
    {
      code: '<MyComponent className="class-name" children="Children" />;',
      errors: [{ messageId: "noChildrenProp" }],
    },
    {
      code: '<MyComponent {...props} children="Children" />;',
      errors: [{ messageId: "noChildrenProp" }],
    },
  ],
  valid: [
    ...allValid,
    "<div />;",
    "<div></div>;",
    '<div className="class-name"></div>;',
    "<div>Children</div>;",
    '<div className="class-name">Children</div>;',
    "<div><div /></div>;",
    "<div><div /><div /></div>;",
    "<MyComponent />",
    "<MyComponent>Children</MyComponent>;",
    '<MyComponent className="class-name"></MyComponent>;',
    '<MyComponent className="class-name">Children</MyComponent>;',
    '<MyComponent className="class-name" {...props} />;',
  ],
});
