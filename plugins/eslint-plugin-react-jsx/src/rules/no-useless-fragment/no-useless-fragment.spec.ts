import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-useless-fragment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: "<></>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    {
      code: "<></>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<p>moofoo</p>",
    },
    {
      code: "<>{meow}</>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<p>{meow}</p>",
    },
    {
      code: "<><div/></>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    {
      code: "<div><>foo</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div>foo</div>",
    },
    {
      code: '<div><>{"a"}{"b"}</></div>',
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
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
          data: { reason: "placed inside a host component" },
          messageId: "default",
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
          data: { reason: "placed inside a host component" },
          messageId: "default",
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
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
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
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: '<div>a {""}{""} a</div>',
    },
    {
      code: "<>{''}</>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    {
      code: "<div><>{''}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div>{''}</div>",
    },
    // Empty string expressions are treated as non-meaningful (PR #1805)
    {
      code: '<>{""}{""}</>',
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    {
      code: '<>{""} </>',
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    {
      code: tsx`
        <>
          {""}
        </>
      `,
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
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
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXElement,
          data: { reason: "contains less than two children" },
          messageId: "default",
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
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      options: [
        {
          allowExpressions: true,
        },
      ],
      output: "<Foo>{moo}</Foo>",
    },
    {
      code: "<React.Fragment></React.Fragment>",
      errors: [
        {
          type: AST.JSXElement,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    {
      code: "<div><>{value}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      options: [{ allowExpressions: false }],
      output: "<div>{value}</div>",
    },
    {
      code: "<span><>hello</></span>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<span>hello</span>",
    },
    {
      code: "<ul><><li /></></ul>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<ul><li /></ul>",
    },
    {
      code: "<Fragment><div /></Fragment>",
      errors: [
        {
          type: AST.JSXElement,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div />",
    },
    {
      code: "<Fragment {...props}><div /></Fragment>",
      errors: [
        {
          type: AST.JSXElement,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    {
      code: "<React.Fragment><Foo /></React.Fragment>",
      errors: [
        {
          type: AST.JSXElement,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<Foo />",
    },
    {
      code: "<Other.Fragment><Foo /></Other.Fragment>",
      errors: [
        {
          type: AST.JSXElement,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<Foo />",
    },
    {
      code: "<MyApp.Fragment><Foo /></MyApp.Fragment>",
      errors: [
        {
          type: AST.JSXElement,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<Foo />",
    },
    {
      code: "<div><> </></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div> </div>",
    },
    {
      code: "<main><><span /><span /></></main>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<main><span /><span /></main>",
    },
    // Multiline text is collapsed to a single space (collapseMultilineText)
    {
      code: "<div><>hello\nworld</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div>hello world</div>",
    },
    // Tabs are converted to spaces during cleanup
    {
      code: "<div><>a\n\tb</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div>a b</div>",
    },
    // JSXEmptyExpression is skipped by getChildren but preserved in fix
    {
      code: "<div><><span />{}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div><span />{}</div>",
    },
    // JSXEmptyExpression prevents auto-fix outside JSX context
    {
      code: "<><span />{}</>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    // Whitespace-only text with newline is fully trimmed by collapseMultilineText
    {
      code: tsx`
        <div>
          <>
          </>
        </div>
      `,
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: tsx`
        <div>

        </div>
      `,
    },
    // Single expression children inside host component are still redundant
    {
      code: "<div><>{undefined}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<div>{undefined}</div>",
    },
    {
      code: "<div><>{null}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<div>{null}</div>",
    },
    {
      code: "<div><>{0}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<div>{0}</div>",
    },
    {
      code: "<div><>{true}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<div>{true}</div>",
    },
    {
      code: "<div><>{false}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<div>{false}</div>",
    },
    {
      code: "<div><>{[]}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
      ],
      output: "<div>{[]}</div>",
    },
    // JSX comment is an empty expression → skipped by getChildren
    {
      code: "<>{/* comment */}</>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    // JSX comment inside host → both reasons
    {
      code: "<div><>{/* comment */}</></div>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "placed inside a host component" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<div>{/* comment */}</div>",
    },
    // Nested useless fragment (outer unwraps to inner because it is safe to fix)
    {
      code: "<><>nested</></>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<>nested</>",
    },
    // Custom component: content useless but not inside host → no auto-fix
    {
      code: '<Custom><>{""}</></Custom>',
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    // Single element child with allowExpressions: false
    {
      code: "<><span /></>",
      options: [{ allowExpressions: false }],
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: "<span />",
    },
    // Empty fragment (only empty expression) outside JSX
    {
      code: "<>{}</>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: null,
    },
    // Nested useless fragments collapse inward (fixer runs two passes)
    {
      code: "<><><span /></></>",
      errors: [
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
        {
          type: AST.JSXFragment,
          data: { reason: "contains less than two children" },
          messageId: "default",
        },
      ],
      output: ["<><span /></>", "<span />"],
    },
  ],
  valid: [
    {
      code: "<></>",
      options: [{ allowEmptyFragment: true }],
    },
    "<><Foo /><Bar /></>",
    {
      code: "<><Foo /><Bar /></>",
      options: [{ allowExpressions: false }],
    },
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
    {
      code: tsx`
        import { Fragment, useRef } from "react";

              export function Foo({ children }) {
                  const ref = useRef();
                  return (
                      <div>
                          {/* ... */}
                          <Fragment ref={ref}>
                              {children}
                          </Fragment>
                          {/* ... */}
                      </div>
                  );
              }
      `,
    },
    '<React.Fragment key="k"><Foo /><Bar /></React.Fragment>',
    "<>{a}{b}{c}</>",
    "<Custom><>one<span />two</></Custom>",
    {
      code: "<div attr={<><Foo /><Bar /></>} />",
      options: [{ allowExpressions: false }],
    },
    // Single expression children are allowed by default
    "<>{undefined}</>",
    "<>{null}</>",
    "<>{0}</>",
    "<>{true}</>",
    "<>{false}</>",
    "<>{[]}</>",
    // Single whitespace text outside JSX context is tolerated
    tsx`
      function Foo() {
        return <> </>;
      }
    `,
    // Two expression children
    '<>{"a"}{"b"}</>',
    // Two element children
    "<><span /><span /></>",
  ],
});
