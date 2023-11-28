import { NodeType } from "@eslint-react/ast";
import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
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
    "<>{}</>",
    "<>{meow}</>",
    "<p><>{meow}</></p>",
    dedent`
      <SomeReact.SomeFragment>
        {foo}
      </SomeReact.SomeFragment>
    `,
    dedent`
      <>
        {moo}
      </>
    `,
  ],
  invalid: [
    {
      code: "<></>",
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment }],
    },
    {
      code: "<p>moo<>foo</></p>",
      errors: [
        { messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment },
        { messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXFragment },
      ],
    },
    {
      code: "<><div/></>",
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment }],
    },
    {
      code: dedent`
        <>
          <div/>
        </>
      `,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment }],
    },
    {
      code: "<Fragment />",
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXElement }],
    },
    {
      code: `
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXElement }],
    },
    {
      code: "<Eeee><>foo</></Eeee>",
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment }],
    },
    {
      code: "<div><>foo</></div>",
      errors: [
        { messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment },
        { messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXFragment },
      ],
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXFragment }],
    },
    {
      code: dedent`
        <section>
          <Eeee />
          <Eeee />
          <>{"a"}{"b"}</>
        </section>
      `,
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXFragment }],
    },
    {
      code: '<div><Fragment>{"a"}{"b"}</Fragment></div>',
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXElement }],
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
        { messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXFragment, line: 2 },
        { messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXFragment, line: 6 },
      ],
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXFragment }],
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
        { messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXElement, line: 3 },
        { messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", type: NodeType.JSXElement, line: 3 },
      ],
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: "<><Foo>{moo}</Foo></>",
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment }],
    },
  ],
});
