import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-missing-button-type";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<button />;`,
      errors: [
        {
          messageId: "noMissingButtonType",
          suggestions: [
            {
              messageId: "addButtonType",
              data: { type: "button" },
              output: tsx`<button type="button" />;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "submit" },
              output: tsx`<button type="submit" />;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "reset" },
              output: tsx`<button type="reset" />;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<button type />;`,
      errors: [
        {
          messageId: "noMissingButtonType",
          suggestions: [
            {
              messageId: "addButtonType",
              data: { type: "button" },
              output: tsx`<button type="button" />;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "submit" },
              output: tsx`<button type="submit" />;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "reset" },
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
              output: tsx`<PolyComponent type="button" as="button">Click me</PolyComponent>;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "submit" },
              output: tsx`<PolyComponent type="submit" as="button">Click me</PolyComponent>;`,
            },
            {
              messageId: "addButtonType",
              data: { type: "reset" },
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
  ],
});
