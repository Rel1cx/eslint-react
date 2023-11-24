import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-children-in-void-dom-elements";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    "<div>Foo</div>;",
    '<div children="Foo" />;',

    '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;',

    'React.createElement("div", {}, "Foo");',

    'React.createElement("div", { children: "Foo" });',

    'React.createElement("div", { dangerouslySetInnerHTML: { __html: "Foo" } });',

    'document.createElement("img");',

    'React.createElement("img");',

    "React.createElement();",

    "document.createElement();",

    dedent`
      const props = {};
      React.createElement("img", props);
    `,

    dedent`
      import React, {createElement} from "react";
      createElement("div");
    `,

    dedent`
      import React, {createElement} from "react";
      createElement("img");
    `,

    dedent`
      import React, {createElement, PureComponent} from "react";
      class Button extends PureComponent {
        handleClick(ev) {
          ev.preventDefault();
        }
        render() {
          return <div onClick={this.handleClick}>Hello</div>;
        }
      }
    `,
  ],
  invalid: [
    {
      code: "<br>Foo</br>;",
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "br" },
        },
      ],
    },
    {
      code: '<br children="Foo" />;',
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "br" },
        },
      ],
    },
    {
      code: '<img {...props} children="Foo" />;',
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "img" },
        },
      ],
    },
    {
      code: '<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "br" },
        },
      ],
    },
    {
      code: 'React.createElement("br", {}, "Foo");',
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "br" },
        },
      ],
    },
    {
      code: 'React.createElement("br", { children: "Foo" });',
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "br" },
        },
      ],
    },
    {
      code: 'React.createElement("br", { dangerouslySetInnerHTML: { __html: "Foo" } });',
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "br" },
        },
      ],
    },
    {
      code: dedent`
        import React, {createElement} from "react";
        createElement("img", {}, "Foo");
      `,
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "img" },
        },
      ],
    },
    {
      code: dedent`
        import React, {createElement} from "react";
        createElement("img", { children: "Foo" });
      `,
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "img" },
        },
      ],
    },
    {
      code: dedent`
        import React, {createElement} from "react";
        createElement("img", { dangerouslySetInnerHTML: { __html: "Foo" } });
      `,
      errors: [
        {
          messageId: "NO_CHILDREN_IN_VOID_DOM_ELEMENTS",
          data: { element: "img" },
        },
      ],
    },
  ],
});
