import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-namespace";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<ns:testcomponent />`,
      errors: [{
        data: {
          name: "ns:testcomponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: /* tsx */ `<ns:testComponent />`,
      errors: [{
        data: {
          name: "ns:testComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: /* tsx */ `<ns:test_component />`,
      errors: [{
        data: {
          name: "ns:test_component",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: /* tsx */ `<ns:TestComponent />`,
      errors: [{
        data: {
          name: "ns:TestComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: /* tsx */ `<Ns:testcomponent />`,
      errors: [{
        data: {
          name: "Ns:testcomponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: /* tsx */ `<Ns:testComponent />`,
      errors: [{
        data: {
          name: "Ns:testComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: /* tsx */ `<Ns:test_component />`,
      errors: [{
        data: {
          name: "Ns:test_component",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: /* tsx */ `<Ns:TestComponent />`,
      errors: [{
        data: {
          name: "Ns:TestComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
  ],

  valid: [
    ...allValid,
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
