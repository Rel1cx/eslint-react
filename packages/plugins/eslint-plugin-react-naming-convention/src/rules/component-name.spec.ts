import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./component-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<Test_component />`,
      errors: [{ messageId: "componentName" }],
    },
    {
      code: /* tsx */ `<TestComponent />`,
      errors: [{ messageId: "componentName" }],
      options: [{ rule: "CONSTANT_CASE" }],
    },
    {
      code: /* tsx */ `<TestComponent />`,
      errors: [{ messageId: "componentName" }],
      options: ["CONSTANT_CASE"],
    },
    {
      code: /* tsx */ `<FULLUPPERCASE />`,
      errors: [{ messageId: "componentName" }],
      options: [{ allowAllCaps: false, rule: "PascalCase" }],
    },
    {
      code: /* tsx */ `
        function AppHome() {
            return <div>foo</div>
        }
      `,
      errors: [{ messageId: "componentName" }],
      options: [{ rule: "CONSTANT_CASE" }],
    },
  ],
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
    // TODO: Add normalization for these strings before validating
    // "<Søknad />",
    "<Modal.Header />",
    "<qualification.T3StComp0Nent />",
    "<H1>Hello!</H1>",
    "<motion.div />",
    {
      code: "<T />",
      options: [{ rule: "PascalCase" }],
    },
    {
      code: "<Typography.P />",
      options: [{ rule: "PascalCase" }],
    },
    {
      code: "<FULLUPPERCASE />",
      options: [{ allowAllCaps: true, rule: "PascalCase" }],
    },
    {
      code: "<Modal:Header />",
      options: [{ allowNamespace: true, rule: "PascalCase" }],
    },
    /* tsx */ `
      function AppHome() {
          return <div>foo</div>
      }
    `,
    {
      code: /* tsx */ `
        function APP_HOME() {
            return <div>foo</div>
        }
      `,
      options: [{ allowLeadingUnderscore: true, rule: "CONSTANT_CASE" }],
    },
    /* tsx */ `
      const AppHome = () => {
          return <div>foo</div>
      }
    `,
    {
      code: /* tsx */ `
        const APP_HOME = () => {
            return <div>foo</div>
        }
      `,
      options: [{ allowAllCaps: true, allowLeadingUnderscore: true, rule: "CONSTANT_CASE" }],
    },
    {
      code: /* tsx */ `
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{ rule: "PascalCase" }],
    },
    {
      code: /* tsx */ `
        const AppHome = function () {
            return <div>foo</div>
        }
      `,
      options: [{
        excepts: [
          "AppHome",
        ],
        rule: "CONSTANT_CASE",
      }],
    },
  ],
});
