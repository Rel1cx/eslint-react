import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<></>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: null,
    },
    {
      code: "<></>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      options: [{ allowEmptyFragment: false }],
      output: null,
    },
    {
      code: "<>{}</>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      options: [{ allowExpressions: false }],
      output: null,
    },
    {
      code: "<p>moo<>foo</></p>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: "<p>moofoo</p>",
    },
    {
      code: "<>{meow}</>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      options: [{ allowExpressions: false }],
      output: null,
    },
    {
      code: "<p><>{meow}</></p>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: "<p>{meow}</p>",
    },
    {
      code: "<><div/></>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: "<div/>",
    },
    {
      code: tsx`
        <>
          <div/>
        </>
      `,
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: tsx`
        <div/>
      `,
    },
    {
      code: "<Fragment />",
      errors: [
        {
          type: AST.JSXElement,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
    },
    {
      code: tsx`
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [
        {
          type: AST.JSXElement,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: tsx`
        <Foo />
      `,
    },
    {
      // Not safe to fix this case because `Eeee` might require child be ReactElement
      code: "<Eeee><>foo</></Eeee>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: null,
    },
    {
      code: "<div><>foo</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: "<div>foo</div>",
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: '<div>{"a"}{"b"}</div>',
    },
    {
      code: tsx`
        <section>
          <Eeee />
          <Eeee />
          <>{"a"}{"b"}</>
        </section>
      `,
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: tsx`
        <section>
          <Eeee />
          <Eeee />
          {"a"}{"b"}
        </section>
      `,
    },
    {
      code: '<div><Fragment>{"a"}{"b"}</Fragment></div>',
      errors: [
        {
          type: AST.JSXElement,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: '<div>{"a"}{"b"}</div>',
    },
    {
      // whitespace tricky case
      code: tsx`
        <section>
          git<>
            <b>hub</b>.
          </>

          git<> <b>hub</b></>
        </section>
      `,
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: tsx`
        <section>
          git<b>hub</b>.

          git <b>hub</b>
        </section>
      `,
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: '<div>a {""}{""} a</div>',
    },
    {
      code: tsx`
        const Comp = () => (
          <html>
            <React.Fragment />
          </html>
        );
      `,
      errors: [
        {
          type: AST.JSXElement,
          messageId: "default",
          data: { reason: "placed inside a host component" },
        },
        {
          type: AST.JSXElement,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      output: tsx`
        const Comp = () => (
          <html>
            ${/* the trailing whitespace here is intentional */ ""}
          </html>
        );
      `,
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: "<><Foo>{moo}</Foo></>",
      errors: [
        {
          type: AST.JSXFragment,
          messageId: "default",
          data: { reason: "contains less than two children" },
        },
      ],
      options: [
        {
          allowExpressions: true,
        },
      ],
      output: "<Foo>{moo}</Foo>",
    },
  ],
  valid: [
    {
      code: "<></>",
      options: [{ allowEmptyFragment: true }],
    },
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
    tsx`
      function Foo() {
      	return <>&nbsp;</>;
      }
    `,
    tsx`
      function Foo() {
      	return <>a&nbsp;b</>;
      }
    `,
    tsx`
      <>
        {moo}
      </>
    `,
    tsx`
      <>{children}</>
    `,
    tsx`
      <>{props.children}</>
    `,
    tsx`
      <>
        {children}
        {moo}
      </>
    `,
    tsx`
      <>
        {props.children}
        {moo}
      </>
    `,
    tsx`
      const element = (
       <>
         <SomeComponent />
         &nbsp;
       </>
      );
    `,
    tsx`<>{cloneElement(children, { ref: childrenRef })}</>`,
    {
      code: tsx`
        <SomeReact.SomeFragment>
          {<Foo />}
        </SomeReact.SomeFragment>
      `,
    },
    {
      code: tsx`{foo}`,
      options: [{ allowExpressions: false }],
    },
    {
      code: tsx`<Foo bar={<><Bar/><Baz/></>} />`,
      options: [{ allowExpressions: false }],
    },
  ],
});
