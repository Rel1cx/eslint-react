import { JsxEmit } from "@eslint-react/core";
import { RuleTester } from "@typescript-eslint/rule-tester";
import tsx from "dedent";

import { allValid, defaultLanguageOptionsWithTypes, getProjectForJsxEmit, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-key-before-spread";

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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`

        const App = (props) => {
        return [
                <div key="1" {...props} key="2" {...props}>1</div>,
              ]
          };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      code: tsx`

        const App = (props) => {
        return [
                <div {...props} key="1" key="2" {...props}>1</div>,
              ]
          };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    ...allValid,
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
    tsx`
      /** @jsxRuntime automatic */
      const App = (props) => {
          return [
                  <div key="1" {...props}>1</div>,
                  <div key="2" {...props}>2</div>,
                  <div key="3" {...props}>3</div>,
               ]
      };
    `,
    tsx`
      const App = (props) => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
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

ruleTesterWithJsxClassicRuntime.run(RULE_NAME, rule, {
  invalid: [],
  valid: [
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

ruleTesterWithJsxAutomaticRuntime.run(RULE_NAME, rule, {
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
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
  ],
  valid: [],
});
