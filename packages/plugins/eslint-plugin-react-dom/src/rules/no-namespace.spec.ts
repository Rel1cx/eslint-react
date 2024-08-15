import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-namespace";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<ns:testcomponent />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "ns:testcomponent",
        },
      }],
    },
    {
      code: /* tsx */ `<ns:testComponent />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "ns:testComponent",
        },
      }],
    },
    {
      code: /* tsx */ `<ns:test_component />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "ns:test_component",
        },
      }],
    },
    {
      code: /* tsx */ `<ns:TestComponent />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "ns:TestComponent",
        },
      }],
    },
    {
      code: /* tsx */ `<Ns:testcomponent />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "Ns:testcomponent",
        },
      }],
    },
    {
      code: /* tsx */ `<Ns:testComponent />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "Ns:testComponent",
        },
      }],
    },
    {
      code: /* tsx */ `<Ns:test_component />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "Ns:test_component",
        },
      }],
    },
    {
      code: /* tsx */ `<Ns:TestComponent />`,
      errors: [{
        messageId: "noNamespace",
        data: {
          name: "Ns:TestComponent",
        },
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
