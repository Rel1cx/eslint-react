import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<></>`,
      errors: [{
        type: T.JSXFragment,
        messageId: "uselessFragment",
        data: {
          reason: "contains less than two children",
        },
      }],
      output: null,
    },
    {
      code: tsx`<p><>foo</></p>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
        },
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: tsx`<p>foo</p>`,
    },
    {
      code: tsx`<p>moo<>foo</></p>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
        },
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: "<p>moofoo</p>",
    },
    {
      code: tsx`<p><>{meow}</></p>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
        },
      ],
      output: "<p>{meow}</p>",
    },
    {
      code: tsx`<><div/></>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: tsx`<div/>`,
    },
    {
      code: tsx`
        <>
          <div/>
        </>
      `,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: tsx`
        <div/>
      `,
    },
    {
      code: tsx`<Fragment />`,
      errors: [
        {
          type: T.JSXElement,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: null,
    },
    {
      code: tsx`
        <React.Fragment>
          <Foo />
        </React.Fragment>
      `,
      errors: [
        {
          type: T.JSXElement,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: tsx`
        <Foo />
      `,
    },
    {
      code: tsx`<Eeee><>foo</></Eeee>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: null,
    },
    {
      code: tsx`<div><>foo</></div>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
        },
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: "<div>foo</div>",
    },
    {
      code: tsx`<div><>{"a"}{"b"}</></div>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
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
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
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
      code: tsx`<div><Fragment>{"a"}{"b"}</Fragment></div>`,
      errors: [
        {
          type: T.JSXElement,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
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
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
        },
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
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
      code: tsx`<div>a <>{""}{""}</> a</div>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
        },
      ],
      output: '<div>a {""}{""} a</div>',
    },
    {
      code: tsx`const Comp = () => (<html><React.Fragment /></html>);`,
      errors: [
        {
          type: T.JSXElement,
          messageId: "uselessFragment",
          data: {
            reason: "placed inside a built-in component",
          },
        },
        {
          type: T.JSXElement,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: tsx`const Comp = () => (<html></html>);`,
    },
    // Ensure allowExpressions still catches expected violations
    {
      code: tsx`<><Foo>{moo}</Foo></>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      output: tsx`<Foo>{moo}</Foo>`,
    },
    {
      code: tsx`<>{moo}</>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      options: [{ allowExpressions: false }],
    },
    {
      code: tsx`<Foo><>{moo}</></Foo>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      options: [{ allowExpressions: false }],
    },
    {
      code: tsx`<React.Fragment><>{moo}</></React.Fragment>`,
      errors: [
        {
          type: T.JSXElement,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      options: [{ allowExpressions: false }],
      output: tsx`<>{moo}</>`,
    },
    {
      code: tsx`<Foo bar={<>baz</>}/>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
      options: [{ allowExpressions: false }],
    },
    {
      code: tsx`<Foo><><Bar/><Baz/></></Foo>`,
      errors: [
        {
          type: T.JSXFragment,
          messageId: "uselessFragment",
          data: {
            reason: "contains less than two children",
          },
        },
      ],
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
    tsx`<>{cloneElement(children, { ref: childrenRef })}</>`,
    {
      code: tsx`
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
      code: tsx`{foo}`,
      options: [{ allowExpressions: false }],
    },
    {
      code: tsx`<Foo bar={<><Bar/><Baz/></>} />`,
      options: [{ allowExpressions: false }],
    },
  ],
});
