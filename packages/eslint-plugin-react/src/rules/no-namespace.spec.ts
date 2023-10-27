import { allValid } from "@eslint-react/shared";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-namespace";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
});

ruleTester.run(RULE_NAME, rule, {
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

  invalid: [
    {
      code: "<ns:testcomponent />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:testcomponent",
        },
      }],
    },
    {
      code: 'React.createElement("ns:testcomponent")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:testcomponent",
        },
      }],
    },
    {
      code: "<ns:testComponent />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:testComponent",
        },
      }],
    },
    {
      code: 'React.createElement("ns:testComponent")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:testComponent",
        },
      }],
    },
    {
      code: "<ns:test_component />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:test_component",
        },
      }],
    },
    {
      code: 'React.createElement("ns:test_component")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:test_component",
        },
      }],
    },
    {
      code: "<ns:TestComponent />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:TestComponent",
        },
      }],
    },
    {
      code: 'React.createElement("ns:TestComponent")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "ns:TestComponent",
        },
      }],
    },
    {
      code: "<Ns:testcomponent />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:testcomponent",
        },
      }],
    },
    {
      code: 'React.createElement("Ns:testcomponent")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:testcomponent",
        },
      }],
    },
    {
      code: "<Ns:testComponent />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:testComponent",
        },
      }],
    },
    {
      code: 'React.createElement("Ns:testComponent")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:testComponent",
        },
      }],
    },
    {
      code: "<Ns:test_component />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:test_component",
        },
      }],
    },
    {
      code: 'React.createElement("Ns:test_component")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:test_component",
        },
      }],
    },
    {
      code: "<Ns:TestComponent />",
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:TestComponent",
        },
      }],
    },
    {
      code: 'React.createElement("Ns:TestComponent")',
      errors: [{
        messageId: "NO_NAMESPACE",
        data: {
          name: "Ns:TestComponent",
        },
      }],
    },
  ],
});
