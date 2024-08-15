import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-in-void-dom-elements";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<br>Foo</br>;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "br" },
        },
      ],
    },
    {
      code: /* tsx */ `<br children="Foo" />;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "br" },
        },
      ],
    },
    {
      code: /* tsx */ `<img {...props} children="Foo" />;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "img" },
        },
      ],
    },
    {
      code: /* tsx */ `<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "br" },
        },
      ],
    },
    {
      code: /* tsx */ `<PolyComponent as="br">Foo</PolyComponent>;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "br" },
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: /* tsx */ `<PolyComponent as="br" children="Foo" />;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "br" },
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: /* tsx */ `<PolyComponent as="img" {...props} children="Foo" />;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "img" },
        },
      ],
      settings: {
        "react-x": {
          polymorphicPropName: "as",
        },
      },
    },
    {
      code: /* tsx */ `<PolyComponent as="br" dangerouslySetInnerHTML={{ __html: "Foo" }} />;`,
      errors: [
        {
          messageId: "noChildrenInVoidDomElements",
          data: { element: "br" },
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
    "<div>Foo</div>;",
    '<div children="Foo" />;',
    '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
  ],
});
