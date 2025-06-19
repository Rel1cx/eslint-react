import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-button-type";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<button>Click me</button>;`,
      errors: [
        {
          messageId: "noMissingButtonType",
          suggestions: [
            {
              messageId: "addButtonType",
              data: { type: "button" },
              output: tsx`<button type="button">Click me</button>;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "submit" },
              output: tsx`<button type="submit">Click me</button>;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "reset" },
              output: tsx`<button type="reset">Click me</button>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<PolyComponent as="button">Click me</PolyComponent>;`,
      errors: [
        {
          messageId: "noMissingButtonType",
          suggestions: [
            {
              messageId: "addButtonType",
              data: { type: "button" },
              output: tsx`<PolyComponent as="button" type="button">Click me</PolyComponent>;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "submit" },
              output: tsx`<PolyComponent as="button" type="submit">Click me</PolyComponent>;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "reset" },
              output: tsx`<PolyComponent as="button" type="reset">Click me</PolyComponent>;`,
            },
          ],
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
    tsx`
      function App() {
          return <button type="button">Click me</button>;
      }
    `,
    tsx`
      function App() {
          return <button type={ true ? "button" : "submit" }>Click me</button>;
      }
    `,
    tsx`
      const props = {
        type: "button",
      };

      function App() {
          return <button {...props}>Click me</button>;
      }
    `,
    {
      code: tsx`
        function App() {
            return <Button>Click me</Button>;
        }
      `,
      settings: {
        "react-x": {
          additionalComponents: [
            {
              name: "Button",
              as: "button",
              attributes: [
                {
                  name: "type",
                  as: "type",
                  defaultValue: "button",
                },
              ],
            },
          ],
        },
      },
    },
  ],
});
