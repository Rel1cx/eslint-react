import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-void-elements-with-children";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<br>Foo</br>;`,
      errors: [
        {
          messageId: "noVoidElementsWithChildren",
          data: { element: "br" },
        },
      ],
    },
    {
      code: /* tsx */ `<br children="Foo" />;`,
      errors: [
        {
          messageId: "noVoidElementsWithChildren",
          data: { element: "br" },
        },
      ],
    },
    {
      code: /* tsx */ `<img {...props} children="Foo" />;`,
      errors: [
        {
          messageId: "noVoidElementsWithChildren",
          data: { element: "img" },
        },
      ],
    },
    {
      code: /* tsx */ `<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;`,
      errors: [
        {
          messageId: "noVoidElementsWithChildren",
          data: { element: "br" },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    "<div>Foo</div>;",
    '<div children="Foo" />;',
    '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
  ],
});
