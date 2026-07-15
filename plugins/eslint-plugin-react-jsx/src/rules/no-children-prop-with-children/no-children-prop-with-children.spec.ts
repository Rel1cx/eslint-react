import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-children-prop-with-children";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: '<div children="Children">Children</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<div>Children</div>;",
            },
            {
              messageId: "removeChildrenContent",
              output: '<div children="Children"></div>;',
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={<div />}>\n  <span />\n</div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: tsx`<div>\n  <span />\n</div>;`,
            },
            {
              messageId: "removeChildrenContent",
              output: "<div children={<div />}></div>;",
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={[<div />, <div />]}>\n  <span />\n</div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: tsx`<div>\n  <span />\n</div>;`,
            },
            {
              messageId: "removeChildrenContent",
              output: "<div children={[<div />, <div />]}></div>;",
            },
          ],
        },
      ],
    },
    {
      code: '<MyComponent children="Children">Children</MyComponent>',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<MyComponent>Children</MyComponent>",
            },
            {
              messageId: "removeChildrenContent",
              output: '<MyComponent children="Children"></MyComponent>',
            },
          ],
        },
      ],
    },
    {
      code: '<MyComponent className="class-name" children="Children">Children</MyComponent>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: '<MyComponent className="class-name">Children</MyComponent>;',
            },
            {
              messageId: "removeChildrenContent",
              output: '<MyComponent className="class-name" children="Children"></MyComponent>;',
            },
          ],
        },
      ],
    },
    {
      code: tsx`<MyComponent children={children}>{children}</MyComponent>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<MyComponent>{children}</MyComponent>;",
            },
            {
              messageId: "removeChildrenContent",
              output: tsx`<MyComponent children={children}></MyComponent>;`,
            },
          ],
        },
      ],
    },
    {
      code: '<MyComponent children="Children" className="class-name">Children</MyComponent>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: '<MyComponent className="class-name">Children</MyComponent>;',
            },
            {
              messageId: "removeChildrenContent",
              output: '<MyComponent children="Children" className="class-name"></MyComponent>;',
            },
          ],
        },
      ],
    },
    // Expression children prop with JSX element children
    {
      code: "<div children={someVar}><span /></div>;",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<div><span /></div>;",
            },
            {
              messageId: "removeChildrenContent",
              output: "<div children={someVar}></div>;",
            },
          ],
        },
      ],
    },
    // Children prop with multiple nested children
    {
      code: '<div children="x"><a /><b /></div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<div><a /><b /></div>;",
            },
            {
              messageId: "removeChildrenContent",
              output: '<div children="x"></div>;',
            },
          ],
        },
      ],
    },
    // Mixed content nested children (text + elements)
    {
      code: '<div children="x">text<span />more</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<div>text<span />more</div>;",
            },
            {
              messageId: "removeChildrenContent",
              output: '<div children="x"></div>;',
            },
          ],
        },
      ],
    },
    // Member expression component
    {
      code: '<Foo.Bar children="x">content</Foo.Bar>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<Foo.Bar>content</Foo.Bar>;",
            },
            {
              messageId: "removeChildrenContent",
              output: '<Foo.Bar children="x"></Foo.Bar>;',
            },
          ],
        },
      ],
    },
    // Children prop with expression container children
    {
      code: '<div children="x">{content}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: "<div>{content}</div>;",
            },
            {
              messageId: "removeChildrenContent",
              output: '<div children="x"></div>;',
            },
          ],
        },
      ],
    },
    // Multiline with children prop and multiline children
    {
      code: tsx`
        <MyComponent
          className="test"
          children="Children"
        >
          <div />
          <span />
        </MyComponent>;
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: tsx`
                <MyComponent
                  className="test"
                >
                  <div />
                  <span />
                </MyComponent>;
              `,
            },
            {
              messageId: "removeChildrenContent",
              output: tsx`
                <MyComponent
                  className="test"
                  children="Children"
                ></MyComponent>;
              `,
            },
          ],
        },
      ],
    },
    // Empty string mixed with meaningful children still counts as having children (PR #1805)
    {
      code: '<div children="x">{""}hello</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: '<div>{""}hello</div>;',
            },
            {
              messageId: "removeChildrenContent",
              output: '<div children="x"></div>;',
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children="x">{""}<span /></div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "removeChildrenProp",
              output: tsx`<div>{""}<span /></div>;`,
            },
            {
              messageId: "removeChildrenContent",
              output: '<div children="x"></div>;',
            },
          ],
        },
      ],
    },
    // JSX spread attribute containing children (no safe auto-fix, only report)
    {
      code: '<div {...{ children: "x" }}>text</div>;',
      errors: [{ messageId: "default" }],
    },
    // JSX spread variable resolved to object containing children
    {
      code: tsx`
        const props = { children: "x" };
        <div {...props}>text</div>;
      `,
      errors: [{ messageId: "default" }],
    },
    // Boolean shorthand children prop
    {
      code: "<div children>text</div>;",
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>text</div>;" },
            { messageId: "removeChildrenContent", output: "<div children></div>;" },
          ],
        },
      ],
    },
    // JSX comment as child is treated as meaningful content
    {
      code: tsx`<div children="x">{/* comment */}</div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>{/* comment */}</div>;" },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    // Empty fragment as child is treated as meaningful content
    {
      code: '<div children="x"><></></div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div><></></div>;" },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    // Non-empty string literal expression (whitespace only) is meaningful
    {
      code: '<div children="x">{"  "}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: '<div>{"  "}</div>;' },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    // Empty template literal expression is meaningful
    {
      code: '<div children="x">{``}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>{``}</div>;" },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    // Null, 0, false, undefined, and empty expression container are meaningful
    {
      code: '<div children="x">{null}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>{null}</div>;" },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    {
      code: '<div children="x">{0}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>{0}</div>;" },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    {
      code: '<div children="x">{false}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>{false}</div>;" },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    {
      code: '<div children="x">{}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>{}</div>;" },
            { messageId: "removeChildrenContent", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    // Empty string children prop with nested content
    {
      code: '<div children="">content</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>content</div>;" },
            { messageId: "removeChildrenContent", output: '<div children=""></div>;' },
          ],
        },
      ],
    },
    // Whitespace string children prop with nested content
    {
      code: '<div children=" ">content</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: "<div>content</div>;" },
            { messageId: "removeChildrenContent", output: '<div children=" "></div>;' },
          ],
        },
      ],
    },
    // Conditional expression children prop with nested content
    {
      code: tsx`<div children={condition ? <A /> : <B />}><span /></div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "removeChildrenProp", output: tsx`<div><span /></div>;` },
            { messageId: "removeChildrenContent", output: tsx`<div children={condition ? <A /> : <B />}></div>;` },
          ],
        },
      ],
    },
    // createElement
    {
      code: 'React.createElement("div", { children: "Children" }, "Children");',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: "Children" } as Props, "Children");',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'createElement("div", { children: "Children" }, "Children");',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { className: "x", children: "Children" }, "Children");',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: <span /> }, <span />);',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: "Children" }, "a", "b");',
      errors: [{ messageId: "default" }],
    },
    // createElement with string literal key
    {
      code: 'React.createElement("div", { "children": "x" }, "text");',
      errors: [{ messageId: "default" }],
    },
    // createElement with computed property key
    {
      code: 'React.createElement("div", { ["children"]: "x" }, "text");',
      errors: [{ messageId: "default" }],
    },
    // createElement with template literal property key
    {
      code: 'React.createElement("div", { [`children`]: "x" }, "text");',
      errors: [{ messageId: "default" }],
    },
    // createElement with spread in arguments
    {
      code: 'React.createElement("div", { children: "x" }, ...["a", "b"]);',
      errors: [{ messageId: "default" }],
    },
    // createElement with null/undefined extra arguments
    {
      code: 'React.createElement("div", { children: "x" }, null);',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: "x" }, undefined);',
      errors: [{ messageId: "default" }],
    },
    // createElement children property after spread inside props
    {
      code: 'React.createElement("div", { ...{}, children: "x" }, "text");',
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    '<div className="class-name"></div>;',
    "<div>Children</div>;",
    '<div className="class-name">Children</div>;',
    "<div><div /></div>;",
    "<div><div /><div /></div>;",
    // Only children prop, no nested children
    '<div children="Children" />;',
    tsx`<div children={<div />} />;`,
    tsx`<div children={[<div />, <div />]} />;`,
    '<MyComponent children="Children" />',
    '<MyComponent className="class-name" children="Children" />;',
    // Only nested children, no children prop
    "<MyComponent />",
    "<MyComponent>Children</MyComponent>;",
    '<MyComponent className="class-name"></MyComponent>;',
    '<MyComponent className="class-name">Children</MyComponent>;',
    // Whitespace-only children is not considered as children content
    '<div children="Children">   </div>;',
    tsx`<div children="Children">   \n   </div>;`,
    // Member expression component with only children content (no prop)
    "<Foo.Bar>Children</Foo.Bar>;",
    // Element with only expression children (no prop)
    "<div>{children}</div>;",
    // Boolean children shorthand with empty content
    "<div children></div>;",
    // Whitespace-only tab characters
    tsx`<div children="x">\t\t</div>;`,
    // createElement with children as extra args only
    'React.createElement("div", null, "Children");',
    'React.createElement("div", { className: "x" }, "Children");',
    'createElement("div", null, "Children");',
    // createElement with children prop only
    'React.createElement("div", { children: "Children" });',
    'createElement("div", { children: "Children" });',
    // createElement with no props arg
    'React.createElement("div");',
    'createElement("div");',
    // createElement with computed identifier key is not a static children prop
    'const propName = "children"; React.createElement("div", { [propName]: "Children" }, "text");',
    // Empty string expressions are not considered meaningful children (PR #1805)
    '<div children="x">{""}</div>;',
    "<div children=\"x\">{''}</div>;",
    tsx`<div children="x">
      {""}
    </div>;`,
    // createElement with variable props (not ObjectExpression) – cannot inspect
    tsx`
      const props = { children: "x" };
      React.createElement("div", props, "text");
    `,
    // createElement with children hidden inside a spread in props
    'React.createElement("div", { ...{ children: "x" } }, "text");',
    // JSX empty fragment without children prop
    "<div><></></div>;",
    // JSX comment without children prop
    tsx`<div>{/* comment */}</div>;`,
  ],
});
