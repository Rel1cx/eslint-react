import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-namespace";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<ns:testcomponent />`,
      errors: [{
        data: { name: "ns:testcomponent" },
        messageId: "noNamespace",
      }],
    },
    {
      code: tsx`<ns:testComponent />`,
      errors: [{
        data: { name: "ns:testComponent" },
        messageId: "noNamespace",
      }],
    },
    {
      code: tsx`<Ns:TestComponent />`,
      errors: [{
        data: { name: "Ns:TestComponent" },
        messageId: "noNamespace",
      }],
    },
    {
      code: tsx`<svg:circle cx="50" cy="50" r="40" />`,
      errors: [{
        data: { name: "svg:circle" },
        messageId: "noNamespace",
      }],
    },
  ],
  valid: [
    "<testcomponent />",
    "<testComponent />",
    "<test_component />",
    "<TestComponent />",
    "<object.testcomponent />",
    "<object.testComponent />",
    "<object.test_component />",
    "<object.TestComponent />",
    "<Object.testcomponent />",
    "<Object.testComponent />",
    "<Object.test_component />",
    "<Object.TestComponent />",
  ],
});
