import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
    // Casing variant
    {
      code: tsx`<ns:testComponent />`,
      errors: [{
        data: { name: "ns:testComponent" },
        messageId: "noNamespace",
      }],
    },
    // With attributes
    {
      code: tsx`<ns:Component className="x" />`,
      errors: [{
        data: { name: "ns:Component" },
        messageId: "noNamespace",
      }],
    },
    // With closing tag
    {
      code: tsx`<ns:Component></ns:Component>`,
      errors: [{
        data: { name: "ns:Component" },
        messageId: "noNamespace",
      }],
    },
    // Self-closing with nested member expression is not possible in JSX namespace syntax
  ],
  valid: [
    "<TestComponent />",
    // Plain lowercase element
    "<div />",
    "<testcomponent />",
    "<testComponent />",
    "<test_component />",
    // React Fragment (no colon)
    "<React.Fragment />",
    // Member expressions (no colon)
    "<object.TestComponent />",
    "<Object.TestComponent />",
    "<object.testComponent />",
    "<Object.testComponent />",
    "<object.testcomponent />",
    "<Object.testcomponent />",
    "<object.test_component />",
    "<Object.test_component />",
    // Namespaced attribute names are allowed (rule only checks element names)
    '<div xml:space="preserve" />',
    '<svg xmlns:xlink="http://www.w3.org/1999/xlink" />',
  ],
});
