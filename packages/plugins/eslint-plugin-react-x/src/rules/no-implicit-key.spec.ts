import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-implicit-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const props = { key: "1" };

        const App = () => {
            return [
                    <div {...props}>1</div>,
                    <div {...props}>2</div>,
                    <div {...props}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
      ],
    },
    {
      code: tsx`

        const App = () => {
        const props = { key: "1" };

        return [
                <div {...props}>1</div>,
                <div {...props}>2</div>,
                <div {...props}>3</div>,
              ]
          };
      `,
      errors: [
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
      ],
    },
    {
      code: tsx`
        const App = () => {
            return [
                    <div {...{ key: "1" }}>1</div>,
                    <div {...{ key: "2" }}>2</div>,
                    <div {...{ key: "3" }}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
      ],
    },
    {
      code: tsx`
        const App = () => {
            return [
                    <div {...{...{ key: "1" }}}>1</div>,
                    <div {...{...{ key: "2" }}}>2</div>,
                    <div {...{...{ key: "3" }}}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
      ],
    },
    {
      code: tsx`
        const props1 = { key: "1" };
        const App = () => {
            const props2 = { key: "1" };

            return [
                    <div key="0">0</div>,
                    <div {...props1}>1</div>,
                    <div {...props2}>2</div>,
                    <div {...{...{...{ key: "3" }}}}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
      ],
    },
    {
      code: tsx`
        const props1 = { key: "1" };
        const props4 = { key: "4" };
        const App = () => {
            const props2 = { key: "1" };

            return [
                    <div key="0">0</div>,
                    <div {...props1}>1</div>,
                    <div {...props2}>2</div>,
                    <div {...{...{...{ key: "3" }}}}>3</div>,
                    <div {...{...{...props4}}}>4</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
        { messageId: "noImplicitKey" },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      const App = () => {
          return [<div key="1">1</div>]
      };
    `,
    tsx`
      const App = () => {
          return [
                  <div key="1">1</div>,
                  <div key="2">2</div>,
                  <div key="3">3</div>,
               ]
      };
    `,
    tsx`
      const App = () => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
  ],
});
