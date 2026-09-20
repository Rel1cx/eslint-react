import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-missing-button-type";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
    // Member expression component with a polymorphic prop (ex: motion.div)
    {
      code: tsx`<motion.div as="button">Click me</motion.div>;`,
      errors: [
        {
          messageId: "missingTypeAttribute",
          suggestions: [
            {
              data: { type: "button" },
              messageId: "addTypeAttribute",
              output: tsx`<motion.div type="button" as="button">Click me</motion.div>;`,
            },
            {
              data: { type: "submit" },
              messageId: "addTypeAttribute",
              output: tsx`<motion.div type="submit" as="button">Click me</motion.div>;`,
            },
            {
              data: { type: "reset" },
              messageId: "addTypeAttribute",
              output: tsx`<motion.div type="reset" as="button">Click me</motion.div>;`,
            },
          ],
        },
      ],
    },
    // Uppercase polymorphic prop value is normalized to lowercase
    {
      code: tsx`<PolyComponent as="BUTTON">Click me</PolyComponent>;`,
      errors: [
        {
          messageId: "missingTypeAttribute",
          suggestions: [
            {
              data: { type: "button" },
              messageId: "addTypeAttribute",
              output: tsx`<PolyComponent type="button" as="BUTTON">Click me</PolyComponent>;`,
            },
            {
              data: { type: "submit" },
              messageId: "addTypeAttribute",
              output: tsx`<PolyComponent type="submit" as="BUTTON">Click me</PolyComponent>;`,
            },
            {
              data: { type: "reset" },
              messageId: "addTypeAttribute",
              output: tsx`<PolyComponent type="reset" as="BUTTON">Click me</PolyComponent>;`,
            },
          ],
        },
      ],
    },
  ],
  valid: [
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
      const props = {
        type: "button",
      };

      function App() {
          return <button {...props}>Click me</button>;
      }
    `,
    tsx`
      const buttonAttrs = { type: "button" };
      function App() {
          return <button {...buttonAttrs}>Click me</button>;
      }
    `,
    "<a />;",
    "<span />;",
    // Not a button element
    tsx`<input type="button" />;`,
    // Polymorphic as span
    tsx`
      function App() {
        return <PolyComponent as="span">Click me</PolyComponent>;
      }
    `,
    // Boundary: member expression without a polymorphic prop is not a button
    "<motion.button>Click me</motion.button>;",
    // Boundary: non-string polymorphic prop value falls back to the element name
    "<PolyComponent as={ButtonComponent}>Click me</PolyComponent>;",
    // Empty type attribute (attribute exists)
    tsx`<button type="">Click me</button>;`,
    // Boolean shorthand type (attribute exists)
    tsx`<button type>Click me</button>;`,
    // Expression type (attribute exists)
    tsx`<button type={undefined}>Click me</button>;`,
    // https://github.com/oxc-project/oxc/issues/20938
    // `document.createElement('button')` is a DOM API, not React createElement
    tsx`
      function App() {
        return document.createElement("button");
      }
    `,
    tsx`
      function App() {
        return Foo.createElement("button");
      }
    `,
  ],
});
