import { JsxEmit } from "@eslint-react/jsx";
import { RuleTester } from "@typescript-eslint/rule-tester";
import tsx from "dedent";

import { defaultLanguageOptionsWithTypes, getProjectForJsxEmit, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-deoptimization";

// Default ruleTester tests (auto-detect runtime from tsconfig)
ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
        { messageId: "noKeyAfterSpread" },
        { messageId: "noKeyAfterSpread" },
        { messageId: "noKeyAfterSpread" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return <div {...props} key={props.id}>1</div>;
        };
      `,
      errors: [{ messageId: "noKeyAfterSpread" }],
    },
  ],
  valid: [
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
  invalid: [],
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
        { messageId: "noKeyAfterSpread" },
        { messageId: "noKeyAfterSpread" },
        { messageId: "noKeyAfterSpread" },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          return <Component {...props} key="test" />;
        };
      `,
      errors: [{ messageId: "noKeyAfterSpread" }],
    },
  ],
  valid: [
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
    // Namespace attributes should not cause runtime errors
    tsx`
      const App = (props) => {
        return <div xml:space="preserve" {...props} />;
      };
    `,
    // xml:key after spread should NOT be reported (it's not the React key)
    tsx`
      const App = (props) => {
        return <div {...props} xml:key="test" />;
      };
    `,
    // xmlns:x after spread should NOT be reported
    tsx`
      const App = (props) => {
        return <svg {...props} xmlns:x="http://example.com" />;
      };
    `,
  ],
});
