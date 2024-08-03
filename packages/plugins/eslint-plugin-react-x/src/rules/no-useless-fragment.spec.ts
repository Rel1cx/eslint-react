import { NodeType } from "@eslint-react/ast";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<></>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<p><>foo</></p>`,
      errors: [
        { type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: NodeType.JSXFragment, messageId: "noUselessFragment" },
      ],
    },
    {
      code: /* tsx */ `<p>moo<>foo</></p>`,
      errors: [
        { type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: NodeType.JSXFragment, messageId: "noUselessFragment" },
      ],
    },
    {
      code: /* tsx */ `<p><>{meow}</></p>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      code: /* tsx */ `<><div/></>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `
        <>
          <div/>
        </>
      `,
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<Fragment />`,
      errors: [{ type: NodeType.JSXElement, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [{ type: NodeType.JSXElement, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<Eeee><>foo</></Eeee>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragment" }],
    },
    {
      code: /* tsx */ `<div><>foo</></div>`,
      errors: [
        { type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: NodeType.JSXFragment, messageId: "noUselessFragment" },
      ],
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      code: /* tsx */ `
        <section>
          <Eeee />
          <Eeee />
          <>{"a"}{"b"}</>
        </section>
      `,
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      code: '<div><Fragment>{"a"}{"b"}</Fragment></div>',
      errors: [{ type: NodeType.JSXElement, messageId: "noUselessFragmentInBuiltIn" }],
    },
    {
      // whitepace tricky case
      code: /* tsx */ `
        <section>
          git<>
            <b>hub</b>.
          </>

          git<> <b>hub</b></>
        </section>
      `,
      errors: [
        { type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
        { type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" },
      ],
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragmentInBuiltIn" }],
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
        { type: NodeType.JSXElement, messageId: "noUselessFragmentInBuiltIn" },
        { type: NodeType.JSXElement, messageId: "noUselessFragment" },
      ],
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: /* tsx */ `<><Foo>{moo}</Foo></>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "noUselessFragment" }],
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
    "<NotReact.Fragment />",
    "<Foo><><div /><div /></></Foo>",
    '<div p={<>{"a"}{"b"}</>} />',
    "<Fragment key={item.id}>{item.value}</Fragment>",
    "<Fooo content={<>eeee ee eeeeeee eeeeeeee</>} />",
    "<>{foos.map(foo => foo)}</>",
    "<>{moo}</>",
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
        <React.SomeFragment>
          {<Foo />}
        </React.SomeFragment>
      `,
      settings: {
        "react-x": {
          jsxPragma: "SomeReact",
          jsxPragmaFrag: "SomeFragment",
        },
      },
    },
  ],
});
