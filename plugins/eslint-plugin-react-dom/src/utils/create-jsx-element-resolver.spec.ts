import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import { createJsxElementResolver } from "./create-jsx-element-resolver";
import { createRule } from "./create-rule";

const RULE_NAME = "jsx-element-resolver-test";

function resolved(domElementType: string, jsxElementType: string) {
  return JSON.stringify({ domElementType, jsxElementType });
}

// A pass-through rule that reports the resolver output as JSON on every JSX element
const testRule = createRule<[], "default">({
  meta: {
    type: "problem",
    docs: {
      description: "Test rule that reports the resolved element types as JSON.",
    },
    messages: {
      default: "{{data}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const resolver = createJsxElementResolver(context);
    return {
      JSXElement(node) {
        context.report({
          data: { data: JSON.stringify(resolver.resolve(node)) },
          messageId: "default",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});

ruleTester.run(RULE_NAME, testRule, {
  invalid: [
    // Host element: lowercase identifier resolves to itself
    {
      code: "<div />;",
      errors: [{ data: { data: resolved("div", "div") }, messageId: "default" }],
    },
    // Host element with a hyphen (custom element)
    {
      code: "<custom-element />;",
      errors: [{ data: { data: resolved("custom-element", "custom-element") }, messageId: "default" }],
    },
    // Boundary: uppercase tag is a component per React semantics, not a host element
    {
      code: "<DIV />;",
      errors: [{ data: { data: resolved("DIV", "DIV") }, messageId: "default" }],
    },
    // Boundary: the polymorphic prop on a host element is ignored
    {
      code: '<div as="span" />;',
      errors: [{ data: { data: resolved("div", "div") }, messageId: "default" }],
    },
    // Member expression without a polymorphic prop keeps its full name
    {
      code: "<motion.iframe />;",
      errors: [{ data: { data: resolved("motion.iframe", "motion.iframe") }, messageId: "default" }],
    },
    // Member expression resolves via the polymorphic prop (ex: motion.div)
    {
      code: '<motion.div as="iframe" />;',
      errors: [{ data: { data: resolved("iframe", "motion.div") }, messageId: "default" }],
    },
    // Namespaced name is treated as a component
    {
      code: "<svg:rect />;",
      errors: [{ data: { data: resolved("svg:rect", "svg:rect") }, messageId: "default" }],
    },
    // Polymorphic component with a string value (default polymorphicPropName is 'as')
    {
      code: '<Box as="a" />;',
      errors: [{ data: { data: resolved("a", "Box") }, messageId: "default" }],
    },
    // Uppercase polymorphic prop value is normalized to lowercase
    {
      code: '<Box as="A" />;',
      errors: [{ data: { data: resolved("a", "Box") }, messageId: "default" }],
    },
    // Statically evaluable expression container
    {
      code: '<Box as={"a"} />;',
      errors: [{ data: { data: resolved("a", "Box") }, messageId: "default" }],
    },
    // Boolean polymorphic prop falls back to the element name
    {
      code: "<Box as />;",
      errors: [{ data: { data: resolved("Box", "Box") }, messageId: "default" }],
    },
    // Component reference cannot be resolved statically (documented limitation)
    {
      code: "<Box as={SomeComponent} />;",
      errors: [{ data: { data: resolved("Box", "Box") }, messageId: "default" }],
    },
    // Non-static expression falls back to the element name
    {
      code: '<Box as={condition ? "a" : "div"} />;',
      errors: [{ data: { data: resolved("Box", "Box") }, messageId: "default" }],
    },
    // Polymorphic prop in an inline spread object
    {
      code: '<Box {...{ as: "iframe" }} />;',
      errors: [{ data: { data: resolved("iframe", "Box") }, messageId: "default" }],
    },
    // Polymorphic prop in a spread variable
    {
      code: tsx`
        const props = { as: "button" };
        <Box {...props} />;
      `,
      errors: [{ data: { data: resolved("button", "Box") }, messageId: "default" }],
    },
    // Later props win: spread after an explicit attribute
    {
      code: '<Box as="div" {...{ as: "iframe" }} />;',
      errors: [{ data: { data: resolved("iframe", "Box") }, messageId: "default" }],
    },
    // Later props win: explicit attribute after a spread
    {
      code: '<Box {...{ as: "iframe" }} as="div" />;',
      errors: [{ data: { data: resolved("div", "Box") }, messageId: "default" }],
    },
    // Custom polymorphicPropName setting
    {
      code: '<Box component="span" />;',
      errors: [{ data: { data: resolved("span", "Box") }, messageId: "default" }],
      settings: {
        "react-x": {
          polymorphicPropName: "component",
        },
      },
    },
    // With a custom polymorphicPropName, 'as' is just an ordinary prop
    {
      code: '<Box as="a" />;',
      errors: [{ data: { data: resolved("Box", "Box") }, messageId: "default" }],
      settings: {
        "react-x": {
          polymorphicPropName: "component",
        },
      },
    },
  ],
  valid: [],
});
