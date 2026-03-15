import { JsxEmit } from "@eslint-react/core";
import { RuleTester } from "@typescript-eslint/rule-tester";
import tsx from "dedent";

import { defaultLanguageOptionsWithTypes, getProjectForJsxEmit, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./runtime";

// Default ruleTester tests (auto-detect runtime from tsconfig)
ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // no-namespace violations
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
    // deoptimization violations (default tsconfig likely uses automatic runtime)
    {
      code: tsx`
        const App = (props) => {
            return [
                    <div {...props} key="1">1</div>,
                    <div {...props} key="1">2</div>,
                    <div {...props} key="1">3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "noDeoptimization" },
        { messageId: "noDeoptimization" },
        { messageId: "noDeoptimization" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return <div {...props} key={props.id}>1</div>;
        };
      `,
      errors: [{ messageId: "noDeoptimization" }],
    },
    // Both violations in one case
    {
      code: tsx`
        const App = (props) => {
          return <ns:div {...props} key="1">1</ns:div>;
        };
      `,
      errors: [
        { messageId: "noNamespace" },
        { messageId: "noDeoptimization" },
      ],
    },
  ],
  valid: [
    // no namespace is valid
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
    // no deoptimization
    tsx`
      const App = (props) => {
          return [<div key="1">1</div>]
      };
    `,
    tsx`
      const App = (props) => {
          return [
                  <div key="1" {...props}>1</div>,
                  <div key="2" {...props}>2</div>,
                  <div key="3" {...props}>3</div>,
               ]
      };
    `,
    // classic runtime annotation — no deoptimization check
    tsx`
      /** @jsxRuntime classic */
      const App = (props) => {
          return [
                  <div {...props} key="1">1</div>,
                  <div {...props} key="1">2</div>,
                  <div {...props} key="1">3</div>,
               ]
      };
    `,
  ],
});

// Test with classic runtime (from tsconfig) - deoptimization should NOT apply
const ruleTesterWithJsxClassicRuntime = new RuleTester({
  languageOptions: {
    ...defaultLanguageOptionsWithTypes,
    parserOptions: {
      ...defaultLanguageOptionsWithTypes.parserOptions,
      project: getProjectForJsxEmit(JsxEmit.React),
      projectService: false,
    },
  },
});

ruleTesterWithJsxClassicRuntime.run(`${RULE_NAME} (classic runtime)`, rule, {
  invalid: [
    // no-namespace still applies in classic runtime
    {
      code: tsx`<ns:testcomponent />`,
      errors: [{
        data: { name: "ns:testcomponent" },
        messageId: "noNamespace",
      }],
    },
  ],
  valid: [
    // no deoptimization check in classic runtime
    tsx`
      const App = (props) => {
        return [
          <div {...props} key="1">1</div>,
          <div {...props} key="1">2</div>,
          <div {...props} key="1">3</div>,
        ]
      };
    `,
  ],
});

// Test with automatic runtime (from tsconfig) - deoptimization SHOULD apply
const ruleTesterWithJsxAutomaticRuntime = new RuleTester({
  languageOptions: {
    ...defaultLanguageOptionsWithTypes,
    parserOptions: {
      ...defaultLanguageOptionsWithTypes.parserOptions,
      project: getProjectForJsxEmit(JsxEmit.ReactJSX),
      projectService: false,
    },
  },
});

ruleTesterWithJsxAutomaticRuntime.run(`${RULE_NAME} (automatic runtime)`, rule, {
  invalid: [
    // no-namespace applies in automatic runtime too
    {
      code: tsx`<ns:testcomponent />`,
      errors: [{
        data: { name: "ns:testcomponent" },
        messageId: "noNamespace",
      }],
    },
    // deoptimization violations
    {
      code: tsx`
        const App = (props) => {
            return [
                    <div {...props} key="1">1</div>,
                    <div {...props} key="1">2</div>,
                    <div {...props} key="1">3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "noDeoptimization" },
        { messageId: "noDeoptimization" },
        { messageId: "noDeoptimization" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return <Component {...props} key="test" />;
        };
      `,
      errors: [{ messageId: "noDeoptimization" }],
    },
  ],
  valid: [
    // no namespace is valid
    "<testcomponent />",
    "<TestComponent />",
    "<object.TestComponent />",
    // no deoptimization
    tsx`
      const App = (props) => {
        return <Component key="test" {...props} />;
      };
    `,
    tsx`
      const App = (props) => {
        return items.map((item) => <div key={item.id} {...item} />);
      };
    `,
  ],
});
