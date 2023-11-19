import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { defaultParserOptions } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-spreading-key";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      const App = () => {
          return [<div key="1">1</div>]
      };
    `,
    dedent`
      const App = () => {
          return [
                  <div key="1">1</div>,
                  <div key="2">2</div>,
                  <div key="3">3</div>,
               ]
      };
    `,
    dedent`
      const App = () => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
  ],
  invalid: [
    {
      code: dedent`
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
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
      ],
    },
    {
      code: dedent`

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
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
      ],
    },
    {
      code: dedent`
        const App = () => {
            return [
                    <div {...{ key: "1" }}>1</div>,
                    <div {...{ key: "2" }}>2</div>,
                    <div {...{ key: "3" }}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
      ],
    },
    {
      code: dedent`
        const App = () => {
            return [
                    <div {...{...{ key: "1" }}}>1</div>,
                    <div {...{...{ key: "2" }}}>2</div>,
                    <div {...{...{ key: "3" }}}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
      ],
    },
    {
      code: dedent`
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
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
      ],
    },
    {
      code: dedent`
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
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
        { messageId: "NO_SPREADING_KEY" },
      ],
    },
  ],
});
