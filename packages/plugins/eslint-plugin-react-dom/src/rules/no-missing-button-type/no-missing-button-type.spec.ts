import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-missing-button-type";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<button />;`,
      errors: [
        {
          messageId: "missingTypeAttribute",
          suggestions: [
            {
              data: { type: "button" },
              messageId: "addTypeAttribute",
              output: tsx`<button type="button" />;`,
            },
            {
              data: { type: "submit" },
              messageId: "addTypeAttribute",
              output: tsx`<button type="submit" />;`,
            },
            {
              data: { type: "reset" },
              messageId: "addTypeAttribute",
              output: tsx`<button type="reset" />;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<button>Click me</button>;`,
      errors: [
        {
          messageId: "missingTypeAttribute",
          suggestions: [
            {
              data: { type: "button" },
              messageId: "addTypeAttribute",
              output: tsx`<button type="button">Click me</button>;`,
            },
            {
              data: { type: "submit" },
              messageId: "addTypeAttribute",
              output: tsx`<button type="submit">Click me</button>;`,
            },
            {
              data: { type: "reset" },
              messageId: "addTypeAttribute",
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
          messageId: "missingTypeAttribute",
          suggestions: [
            {
              data: { type: "button" },
              messageId: "addTypeAttribute",
              output: tsx`<PolyComponent type="button" as="button">Click me</PolyComponent>;`,
            },
            {
              data: { type: "submit" },
              messageId: "addTypeAttribute",
              output: tsx`<PolyComponent type="submit" as="button">Click me</PolyComponent>;`,
            },
            {
              data: { type: "reset" },
              messageId: "addTypeAttribute",
              output: tsx`<PolyComponent type="reset" as="button">Click me</PolyComponent>;`,
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
    tsx`
      const type = "button";

      function App() {
          return <button type={type}>Click me</button>;
      }
    `,
    tsx`
      function App({ type }: { type: string }) {
          return <button type={type}>Click me</button>;
      }
    `,
    tsx`
      const defaultProps = { type: "button" };
      function App(props = defaultProps) {
          return <button type={props.type}>Click me</button>;
      }
    `,
    tsx`
      const buttonAttrs = { type: "button" };
      function App() {
          return <button {...buttonAttrs}>Click me</button>;
      }
    `,
  ],
});
