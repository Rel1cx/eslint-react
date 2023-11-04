import { allValid } from "@eslint-react/shared";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./enforce-component-name-pascal-case";

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
    // The rule must not warn on components that start with a lowercase
    // because they are interpreted as HTML elements by React
    "<testcomponent />",
    "<testComponent />",
    "<test_component />",
    "<TestComponent />",
    "<CSSTransitionGroup />",
    "<BetterThanCSS />",
    "<TestComponent><div /></TestComponent>",
    "<Test1Component />",
    "<TestComponent1 />",
    "<T3StComp0Nent />",
    "<Éurströmming />",
    "<Año />",
    "<Søknad />",
    "<T />",
    "<Modal.Header />",
    "<qualification.T3StComp0Nent />",
    "<Modal:Header />",
    "<H1>Hello!</H1>",
    "<Typography.P />",
    "<motion.div />",
  ],
  invalid: [
    {
      code: "<YMCA />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<TEST_COMPONENT />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<$ />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<_ />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<Styled.h1 />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<_TEST_COMPONENT />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<_TestComponent />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<Test_component />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<TEST-COMPONENT />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<__ />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<_div />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<$a />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<Foo_DEPRECATED />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<$Typography.P />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
    {
      code: "<STYLED.h1 />",
      errors: [
        {
          messageId: "ENFORCE_COMPONENT_NAME_PASCAL_CASE",
        },
      ],
    },
  ],
});
