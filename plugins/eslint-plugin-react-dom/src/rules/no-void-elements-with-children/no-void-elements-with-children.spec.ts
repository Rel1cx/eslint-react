import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
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
      code: tsx`<img {...props} children="Foo" />;`,
      errors: [
        {
          data: { elementType: "img" },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`<PolyComponent as="img" {...props} children="Foo" />;`,
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
  ],
  valid: [
    "<div>Foo</div>;",
    '<div children="Foo" />;',
    {
      code: tsx`<PolyComponent as="div" children="Foo" />;`,
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
    // Void elements without children
    "<br />;",
    "<input />;",
    "<img />;",
    "<hr />;",
  ],
});
