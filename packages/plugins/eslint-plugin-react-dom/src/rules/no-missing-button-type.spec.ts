import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-button-type";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<button>Click me</button>;`,
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
    },
    {
      code: /* tsx */ `<PolyComponent as="button">Click me</PolyComponent>;`,
      errors: [
        {
          messageId: "NO_MISSING_BUTTON_TYPE",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
  ],
  valid: [
    ...allValid,
    "<a />;",
    "<span />;",
    '<button type="button">Click me</button>;',
    'const Button = () => <button type="button">Click me</button>;',
    /* tsx */ `
      function App() {
          return <button type="button">Click me</button>;
      }
    `,
    /* tsx */ `
      function App() {
          return <button type={ true ? "button" : "submit" }>Click me</button>;
      }
    `,
    /* tsx */ `
      const props = {
        type: "button",
      };

      function App() {
          return <button {...props}>Click me</button>;
      }
    `,
    // TODO: implement this
    // {
    //   code: /* tsx */ `
    //     function App() {
    //         return <Button>Click me</Button>;
    //     }
    //   `,
    //   settings: {
    //     "react-x": {
    //       additionalComponents: [
    //         {
    //           name: "Button",
    //           as: "button",
    //           attributes: [
    //             {
    //               name: "type",
    //               as: "type",
    //               defaultValue: "button",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
  ],
});
