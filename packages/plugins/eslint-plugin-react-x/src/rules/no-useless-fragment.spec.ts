import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<></>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<p><>foo</></p>`,
      errors: [
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" },
      ],
    },
    {
      code: /* tsx */ `<p>moo<>foo</></p>`,
      errors: [
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" },
      ],
    },
    {
      code: /* tsx */ `<p><>{meow}</></p>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      code: /* tsx */ `<><div/></>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `
        <>
          <div/>
        </>
      `,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<Fragment />`,
      errors: [{ type: AST_NODE_TYPES.JSXElement, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [{ type: AST_NODE_TYPES.JSXElement, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<Eeee><>foo</></Eeee>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<div><>foo</></div>`,
      errors: [
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" },
      ],
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      code: /* tsx */ `
        <section>
          <Eeee />
          <Eeee />
          <>{"a"}{"b"}</>
        </section>
      `,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      code: '<div><Fragment>{"a"}{"b"}</Fragment></div>',
      errors: [{ type: AST_NODE_TYPES.JSXElement, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      // whitespace tricky case
      code: /* tsx */ `
        <section>
          git<>
            <b>hub</b>.
          </>

          git<> <b>hub</b></>
        </section>
      `,
      errors: [
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
      ],
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      code: /* tsx */ `
        const Comp = () => (
          <html>
            <React.Fragment />
          </html>
        );
      `,
      errors: [
        { type: AST_NODE_TYPES.JSXElement, messageId: "noUselessFragmentInBuiltIn" },
        { type: AST_NODE_TYPES.JSXElement, messageId: "noUselessFragment" },
      ],
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: /* tsx */ `<><Foo>{moo}</Foo></>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<>{moo}</>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
      options: [{ allowExpressions: false }],
    },
    {
      code: /* tsx */ `<Foo><>{moo}</></Foo>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
      options: [{ allowExpressions: false }],
    },
    {
      code: /* tsx */ `<React.Fragment><>{moo}</></React.Fragment>`,
      errors: [{ type: AST_NODE_TYPES.JSXElement, messageId: "noUselessFragment" }, {
        type: AST_NODE_TYPES.JSXFragment,
        messageId: "noUselessFragment",
      }],
      options: [{ allowExpressions: false }],
    },
    {
      code: /* tsx */ `<Foo bar={<>baz</>}/>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
      options: [{ allowExpressions: false }],
    },
    {
      code: /* tsx */ `<Foo><><Bar/><Baz/></></Foo>`,
      errors: [{ type: AST_NODE_TYPES.JSXFragment, messageId: "noUselessFragment" }],
      options: [{ allowExpressions: false }],
    },
  ],
  valid: [
    ...allValid,
    "<><Foo /><Bar /></>",
    "<>foo<div /></>",
    "<> <div /></>",
    '<>{"moo"} </>',
    "<NotFragment />",
    "<React.NotFragment />",
    "<Foo><><div /><div /></></Foo>",
    '<div p={<>{"a"}{"b"}</>} />',
    "<Fragment key={item.id}>{item.value}</Fragment>",
    "<Fooo content={<>eeee ee eeeeeee eeeeeeee</>} />",
    "<>{foos.map(foo => foo)}</>",
    "<>{moo}</>",
    /* tsx */ `
      function Foo() {
      	return <>&nbsp;</>;
      }
    `,
    /* tsx */ `
      function Foo() {
      	return <>a&nbsp;b</>;
      }
    `,
    /* tsx */ `
      <>
        {moo}
      </>
    `,
    /* tsx */ `
      <>{children}</>
    `,
    /* tsx */ `
      <>{props.children}</>
    `,
    /* tsx */ `
      <>
        {children}
        {moo}
      </>
    `,
    /* tsx */ `
      <>
        {props.children}
        {moo}
      </>
    `,
    /* tsx */ `<>{cloneElement(children, { ref: childrenRef })}</>`,
    {
      code: /* tsx */ `
        <SomeReact.SomeFragment>
          {<Foo />}
        </SomeReact.SomeFragment>
      `,
      settings: {
        "react-x": {
          jsxPragma: "SomeReact",
          jsxPragmaFrag: "SomeFragment",
        },
      },
    },
    {
      code: /* tsx */ `{foo}`,
      options: [{ allowExpressions: false }],
    },
    {
      code: /* tsx */ `<Foo bar={<><Bar/><Baz/></>} />`,
      options: [{ allowExpressions: false }],
    },
  ],
});
