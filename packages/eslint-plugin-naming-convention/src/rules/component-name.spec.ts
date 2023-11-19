import { allFunctions } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { defaultParserOptions } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./component-name";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});
ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allFunctions,
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
    "<FULLUPPERCASE />",
    {
      code: "<_TestComponent />",
      options: [{ rule: "PascalCase" }],
    },
    {
      code: "<_TEST_COMPONENT />",
      options: [{ rule: "CONSTANT_CASE" }],
    },
    dedent`
      function AppHome() {
          return <div>foo</div>
      }
    `,
    {
      code: dedent`
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
    },
    dedent`
      const AppHome = () => {
          return <div>foo</div>
      }
    `,
    {
      code: dedent`
        const APP_HOME = () => {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
    },
    {
      code: dedent`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "PascalCase" }],
    },
    {
      code: dedent`
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{
        rule: "CONSTANT_CASE",
        excepts: [
          "AppHome",
        ],
      }],
    },
  ],
  invalid: [
    {
      code: "<Test_component />",
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
    {
      code: "<TestComponent />",
      options: [{ rule: "CONSTANT_CASE" }],
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
    {
      code: dedent`
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
    {
      code: dedent`
        function AppHome() {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "CONSTANT_CASE" }],
      errors: [{ messageId: "COMPONENT_NAME" }],
    },
  ],
});
