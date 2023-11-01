import { allValid } from "@eslint-react/shared";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

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
    {
      code: "<>{moo}</>",
      options: [{ allowExpressions: true }],
    },
    {
      code: `
        <>
          {moo}
        </>
      `,
      options: [{ allowExpressions: true }],
    },
  ],
  invalid: [
    {
      code: "<></>",
      output: null,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: "<>{}</>",
      output: null,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: "<p>moo<>foo</></p>",
      output: "<p>moofoo</p>",
      errors: [
        { messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment },
        { messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment },
      ],
    },
    {
      code: "<>{meow}</>",
      output: null,
      errors: [{ messageId: "NO_USELESS_FRAGMENT" }],
    },
    {
      code: "<p><>{meow}</></p>",
      output: "<p>{meow}</p>",
      errors: [
        { messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment },
        { messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment },
      ],
    },
    {
      code: "<><div/></>",
      output: "<div/>",
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: `
        <>
          <div/>
        </>
      `,
      output: `
        <div/>
      `,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: "<Fragment />",
      output: null,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXElement }],
    },
    {
      code: `
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      output: `
        <Foo />
      `,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXElement }],
    },
    {
      code: `
        <SomeReact.SomeFragment>
          {foo}
        </SomeReact.SomeFragment>
      `,
      output: null,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXElement }],
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
      output: null,
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: "<div><>foo</></div>",
      output: "<div>foo</div>",
      errors: [
        { messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment },
        { messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment },
      ],
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      output: '<div>{"a"}{"b"}</div>',
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: `
        <section>
          <Eeee />
          <Eeee />
          <>{"a"}{"b"}</>
        </section>`,
      output: `
        <section>
          <Eeee />
          <Eeee />
          {"a"}{"b"}
        </section>`,
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: '<div><Fragment>{"a"}{"b"}</Fragment></div>',
      output: '<div>{"a"}{"b"}</div>',
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXElement }],
    },
    {
      // whitepace tricky case
      code: `
        <section>
          git<>
            <b>hub</b>.
          </>

          git<> <b>hub</b></>
        </section>`,
      output: `
        <section>
          git<b>hub</b>.

          git <b>hub</b>
        </section>`,
      errors: [
        { messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment, line: 3 },
        { messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment, line: 7 },
      ],
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      output: '<div>a {""}{""} a</div>',
      errors: [{ messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXFragment }],
    },
    {
      code: `
        const Comp = () => (
          <html>
            <React.Fragment />
          </html>
        );
      `,
      output: `
        const Comp = () => (
          <html>
            ${/* dprint-ignore  the trailing whitespace here is intentional */ ""}
          </html>
        );
      `,
      errors: [
        { messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXElement, line: 4 },
        { messageId: "NO_USELESS_FRAGMENT_IN_HTML", type: AST_NODE_TYPES.JSXElement, line: 4 },
      ],
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: "<><Foo>{moo}</Foo></>",
      output: "<Foo>{moo}</Foo>",
      options: [{ allowExpressions: true }],
      errors: [{ messageId: "NO_USELESS_FRAGMENT", type: AST_NODE_TYPES.JSXFragment }],
    },
  ],
});
