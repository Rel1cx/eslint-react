import { NodeType } from "@eslint-react/ast";
import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-useless-fragment";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
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
      code: "<>{}</>",
      options: [{ allowExpressions: false }],
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
      code: "<>{meow}</>",
      options: [{ allowExpressions: false }],
      errors: [{ messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: "<p><>{meow}</></p>",
      options: [{ allowExpressions: false }],
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
      code: `
        <SomeReact.SomeFragment>
          {foo}
        </SomeReact.SomeFragment>
      `,
      options: [{ allowExpressions: false }],
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXElement }],
      settings: {
        react: {
          pragma: "SomeReact",
          fragment: "SomeFragment",
        },
      },
    },
    {
      // Not safe to fix this case because `Eeee` might require child be ReactElement
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
      options: [{ allowExpressions: true }],
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: NodeType.JSXFragment }],
    },
  ],
});
