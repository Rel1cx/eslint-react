import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
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
        { messageId: "jsxKeyBeforeSpread" },
        { messageId: "jsxKeyBeforeSpread" },
        { messageId: "jsxKeyBeforeSpread" },
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
        { messageId: "jsxKeyBeforeSpread" },
        { messageId: "jsxKeyBeforeSpread" },
        { messageId: "jsxKeyBeforeSpread" },
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
        { messageId: "jsxKeyBeforeSpread" },
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
        { messageId: "jsxKeyBeforeSpread" },
        { messageId: "jsxKeyBeforeSpread" },
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
      const App = (props) => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
  ],
});
