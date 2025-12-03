import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<></>",
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
      output: null,
    },
    {
      code: "<></>",
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
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
          type: T.JSXFragment,
          messageId: "noUselessFragment",
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
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
        },
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
      output: "<p>moofoo</p>",
    },
    {
      code: "<>{meow}</>",
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
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
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: "<p>{meow}</p>",
    },
    {
      code: "<><div/></>",
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
      output: "<div/>",
    },
    {
      code: `
        <>
          <div/>
        </>
      `,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
      output: `
        <div/>
      `,
    },
    {
      code: "<Fragment />",
      errors: [
        {
          type: T.JSXElement,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
    },
    {
      code: `
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [
        {
          type: T.JSXElement,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
      output: `
        <Foo />
      `,
    },
    {
      // Not safe to fix this case because `Eeee` might require child be ReactElement
      code: "<Eeee><>foo</></Eeee>",
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
      output: null,
    },
    {
      code: "<div><>foo</></div>",
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
        },
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
        },
      ],
      output: "<div>foo</div>",
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: '<div>{"a"}{"b"}</div>',
    },
    {
      code: `
        <section>
          <Eeee />
          <Eeee />
          <>{"a"}{"b"}</>
        </section>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: `
        <section>
          <Eeee />
          <Eeee />
          {"a"}{"b"}
        </section>`,
    },
    {
      code: '<div><Fragment>{"a"}{"b"}</Fragment></div>',
      errors: [
        {
          type: T.JSXElement,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: '<div>{"a"}{"b"}</div>',
    },
    {
      // whitespace tricky case
      code: `
        <section>
          git<>
            <b>hub</b>.
          </>

          git<> <b>hub</b></>
        </section>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
          line: 3,
        },
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
          line: 7,
        },
      ],
      output: `
        <section>
          git<b>hub</b>.

          git <b>hub</b>
        </section>`,
    },
    {
      code: '<div>a <>{""}{""}</> a</div>',
      errors: [
        {
          type: T.JSXFragment,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
        },
      ],
      output: '<div>a {""}{""} a</div>',
    },
    {
      code: `
        const Comp = () => (
          <html>
            <React.Fragment />
          </html>
        );
      `,
      errors: [
        {
          type: T.JSXElement,
          messageId: "noUselessFragment",
          data: { reason: "placed inside a host component" },
          line: 4,
        },
        {
          type: T.JSXElement,
          messageId: "noUselessFragment",
          data: { reason: "contains less than two children" },
          line: 4,
        },
      ],
      output: `
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
          type: T.JSXFragment,
          messageId: "noUselessFragment",
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
    ...allValid,
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
