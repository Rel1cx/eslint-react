import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-in-void-dom-elements";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<br>Foo</br>;`,
      errors: [
        {
          data: { element: "br" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
        },
      ],
    },
    {
      code: /* tsx */ `<br children="Foo" />;`,
      errors: [
        {
          data: { element: "br" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
        },
      ],
    },
    {
      code: /* tsx */ `<img {...props} children="Foo" />;`,
      errors: [
        {
          data: { element: "img" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
        },
      ],
    },
    {
      code: /* tsx */ `<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;`,
      errors: [
        {
          data: { element: "br" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
        },
      ],
    },
    {
      code: /* tsx */ `<PolyComponent as="br">Foo</PolyComponent>;`,
      errors: [
        {
          data: { element: "br" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
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
          data: { element: "br" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
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
          data: { element: "img" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
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
          data: { element: "br" },
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
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
