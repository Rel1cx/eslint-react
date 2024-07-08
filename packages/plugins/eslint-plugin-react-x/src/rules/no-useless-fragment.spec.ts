import { NodeType } from "@eslint-react/ast";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<></>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: /* tsx */ `<p><>foo</></p>`,
      errors: [
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" },
      ],
    },
    {
      code: /* tsx */ `<p>moo<>foo</></p>`,
      errors: [
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" },
      ],
    },
    {
      code: /* tsx */ `<p><>{meow}</></p>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" }],
    },
    {
      code: /* tsx */ `<><div/></>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: /* tsx */ `
        <>
          <div/>
        </>
      `,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: /* tsx */ `<Fragment />`,
      errors: [{ type: NodeType.JSXElement, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: /* tsx */ `
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [{ type: NodeType.JSXElement, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: /* tsx */ `<Eeee><>foo</></Eeee>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: /* tsx */ `<div><>foo</></div>`,
      errors: [
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" },
      ],
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" }],
    },
    {
      code: /* tsx */ `
        <section>
          <Eeee />
          <Eeee />
          <>{"a"}{"b"}</>
        </section>
      `,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" }],
    },
    {
      code: '<div><Fragment>{"a"}{"b"}</Fragment></div>',
      errors: [{ type: NodeType.JSXElement, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" }],
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
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
      ],
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" }],
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
        { type: NodeType.JSXElement, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXElement, messageId: "NO_USELESS_FRAGMENT" },
      ],
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: /* tsx */ `<><Foo>{moo}</Foo></>`,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
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
