import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-duplicate-key";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        const App = () => {
            return [
                    <div key="1">1</div>,
                    <div key="1">2</div>,
                    <div key="1">3</div>,
                 ]
        };
      `,
      errors: [
        {
          data: {
            value: '"1"',
          },
          messageId: "NO_DUPLICATE_KEY",
        },
        {
          data: {
            value: '"1"',
          },
          messageId: "NO_DUPLICATE_KEY",
        },
        {
          data: {
            value: '"1"',
          },
          messageId: "NO_DUPLICATE_KEY",
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return  (<div>
                        <div key="1">1</div>
                        <div key="1">2</div>
                        <div key="1">3</div>
                    </div>)
        };
      `,
      errors: [
        {
          data: {
            value: '"1"',
          },
          messageId: "NO_DUPLICATE_KEY",
        },
        {
          data: {
            value: '"1"',
          },
          messageId: "NO_DUPLICATE_KEY",
        },
        {
          data: {
            value: '"1"',
          },
          messageId: "NO_DUPLICATE_KEY",
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
            return [1, 2, 3].map((item) => <div key="1">{item}</div>)
        };
      `,
      errors: [
        {
          data: {
            value: '"1"',
          },
          messageId: "NO_DUPLICATE_KEY",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      const App = () => {
          return [<div key="1">1</div>]
      };
    `,
    /* tsx */ `
      const App = () => {
          return [
                  <div key="1">1</div>,
                  <div key="2">2</div>,
                  <div key="3">3</div>,
               ]
      };
    `,
    /* tsx */ `
      const App = () => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
  ],
});
