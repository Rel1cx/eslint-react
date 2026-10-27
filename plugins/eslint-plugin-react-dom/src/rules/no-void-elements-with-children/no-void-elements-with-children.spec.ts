import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-void-elements-with-children";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<br>Foo</br>;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`<br children="Foo" />;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
    // Void element with text child
    {
      code: tsx`<input>text</input>;`,
      errors: [
        {
          data: { elementType: "input" },
          messageId: "default",
        },
      ],
    },
    // Void element with expression child
    {
      code: tsx`<br>{value}</br>;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
    // Void element with children prop
    {
      code: tsx`<hr children="Foo" />;`,
      errors: [
        {
          data: { elementType: "hr" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`<img children="Foo" />;`,
      errors: [
        {
          data: { elementType: "img" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`<PolyComponent as="img" children="Foo" />;`,
      errors: [
        {
          data: { elementType: "img" },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Void element with whitespace child
    {
      code: tsx`<area> </area>;`,
      errors: [
        {
          data: { elementType: "area" },
          messageId: "default",
        },
      ],
    },
    // Member expression component with a polymorphic prop (ex: motion.div)
    {
      code: tsx`<motion.div as="br">Foo</motion.div>;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
    // Uppercase polymorphic prop value is normalized to lowercase
    {
      code: tsx`<PolyComponent as="IMG" children="Foo" />;`,
      errors: [
        {
          data: { elementType: "img" },
          messageId: "default",
        },
      ],
    },
    // Empty string expressions still produce a children value at runtime
    {
      code: tsx`<br>{""}</br>;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
    // Any non-empty expression container counts as a child, even when it renders nothing
    {
      code: tsx`<br>{null}</br>;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
    // Same-line JSX whitespace is not padding, even next to an empty container
    {
      code: tsx`<br> {} </br>;`,
      errors: [
        {
          data: { elementType: "br" },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    "<div>Foo</div>;",
    '<div children="Foo" />;',
    '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
    // Void elements without children
    "<br />;",
    "<input />;",
    "<img />;",
    "<hr />;",
    // Formatting whitespace and empty expression containers are omitted by the JSX transform
    tsx`<br>{/* comment */}</br>;`,
    tsx`<br>{}</br>;`,
    tsx`<br>
    </br>;`,
    // Only direct `children`/`dangerouslySetInnerHTML` attributes are inspected;
    // spreads may provide them
    tsx`<img {...props} />;`,
    tsx`<img {...{ children: "Foo" }} />;`,
    tsx`<img {...{ dangerouslySetInnerHTML: { __html: "Foo" } }} />;`,
    {
      code: tsx`<PolyComponent as="div" children="Foo" />;`,
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    // Boundary: member expression without a polymorphic prop is not a void element
    "<motion.br>Foo</motion.br>;",
  ],
});
