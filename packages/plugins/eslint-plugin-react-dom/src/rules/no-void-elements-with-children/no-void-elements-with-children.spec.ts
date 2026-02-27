import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
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
  ],
});
