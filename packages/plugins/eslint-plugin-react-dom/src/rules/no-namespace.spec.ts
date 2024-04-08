import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-namespace";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<ns:testcomponent />",
      errors: [{
        data: {
          name: "ns:testcomponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("ns:testcomponent")',
      errors: [{
        data: {
          name: "ns:testcomponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: "<ns:testComponent />",
      errors: [{
        data: {
          name: "ns:testComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("ns:testComponent")',
      errors: [{
        data: {
          name: "ns:testComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: "<ns:test_component />",
      errors: [{
        data: {
          name: "ns:test_component",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("ns:test_component")',
      errors: [{
        data: {
          name: "ns:test_component",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: "<ns:TestComponent />",
      errors: [{
        data: {
          name: "ns:TestComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("ns:TestComponent")',
      errors: [{
        data: {
          name: "ns:TestComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: "<Ns:testcomponent />",
      errors: [{
        data: {
          name: "Ns:testcomponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("Ns:testcomponent")',
      errors: [{
        data: {
          name: "Ns:testcomponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: "<Ns:testComponent />",
      errors: [{
        data: {
          name: "Ns:testComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("Ns:testComponent")',
      errors: [{
        data: {
          name: "Ns:testComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: "<Ns:test_component />",
      errors: [{
        data: {
          name: "Ns:test_component",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("Ns:test_component")',
      errors: [{
        data: {
          name: "Ns:test_component",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: "<Ns:TestComponent />",
      errors: [{
        data: {
          name: "Ns:TestComponent",
        },
        messageId: "NO_NAMESPACE",
      }],
    },
    {
      code: 'React.createElement("Ns:TestComponent")',
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
    'React.createElement("testcomponent")',
    "<testComponent />",
    'React.createElement("testComponent")',
    "<test_component />",
    'React.createElement("test_component")',
    "<TestComponent />",
    'React.createElement("TestComponent")',
    "<object.testcomponent />",
    'React.createElement("object.testcomponent")',
    "<object.testComponent />",
    'React.createElement("object.testComponent")',
    "<object.test_component />",
    'React.createElement("object.test_component")',
    "<object.TestComponent />",
    'React.createElement("object.TestComponent")',
    "<Object.testcomponent />",
    'React.createElement("Object.testcomponent")',
    "<Object.testComponent />",
    'React.createElement("Object.testComponent")',
    "<Object.test_component />",
    'React.createElement("Object.test_component")',
    "<Object.TestComponent />",
    'React.createElement("Object.TestComponent")',
    "React.createElement(null)",
    "React.createElement(true)",
    "React.createElement({})",
  ],
});
