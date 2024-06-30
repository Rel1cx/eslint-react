import { NodeType } from "@eslint-react/ast";
import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<></>",
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: "<p><>foo</></p>",
      errors: [
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" },
      ],
    },
    {
      code: "<p>moo<>foo</></p>",
      errors: [
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" },
      ],
    },
    {
      code: "<p><>{meow}</></p>",
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" }],
    },
    {
      code: "<><div/></>",
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: dedent`
        <>
          <div/>
        </>
      `,
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: "<Fragment />",
      errors: [{ type: NodeType.JSXElement, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: `
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [{ type: NodeType.JSXElement, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: "<Eeee><>foo</></Eeee>",
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: "<div><>foo</></div>",
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
      code: dedent`
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
      code: dedent`
        <section>
          git<>
            <b>hub</b>.
          </>

          git<> <b>hub</b></>
        </section>
      `,
      errors: [
        { type: NodeType.JSXFragment, line: 2, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXFragment, line: 6, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
      ],
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      errors: [{ type: NodeType.JSXFragment, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" }],
    },
    {
      code: dedent`
        const Comp = () => (
          <html>
            <React.Fragment />
          </html>
        );
      `,
      errors: [
        { type: NodeType.JSXElement, line: 3, messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN" },
        { type: NodeType.JSXElement, line: 3, messageId: "NO_USELESS_FRAGMENT" },
      ],
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: "<><Foo>{moo}</Foo></>",
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
    dedent`
      <>
        {moo}
      </>
    `,
    dedent`
      <>{children}</>
    `,
    dedent`
      <>{props.children}</>
    `,
    dedent`
      <>
        {children}
        {moo}
      </>
    `,
    dedent`
      <>
        {props.children}
        {moo}
      </>
    `,
    dedent`<>{cloneElement(children, { ref: childrenRef })}</>`,
    {
      code: dedent`
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
