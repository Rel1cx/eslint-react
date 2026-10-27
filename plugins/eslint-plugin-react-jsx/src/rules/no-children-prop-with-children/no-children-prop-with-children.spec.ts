import tsx from "dedent";

import { ruleTester } from "@local/testkit";
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
              messageId: "remove-children-prop",
              output: "<div>Children</div>;",
            },
            {
              messageId: "remove-children-content",
              output: '<div children="Children"></div>;',
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
              messageId: "remove-children-prop",
              output: "<MyComponent>Children</MyComponent>",
            },
            {
              messageId: "remove-children-content",
              output: '<MyComponent children="Children"></MyComponent>',
            },
          ],
        },
      ],
    },
    // JSX element as 'children' prop value with nested content
    {
      code: tsx`<div children={<span />}>existing</div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "remove-children-prop",
              output: tsx`<div>existing</div>;`,
            },
            {
              messageId: "remove-children-content",
              output: tsx`<div children={<span />}></div>;`,
            },
          ],
        },
      ],
    },
    // A comment-only container mixed with meaningful content is still a conflict
    {
      code: tsx`<div children="x">{/* comment */}text</div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "remove-children-prop",
              output: tsx`<div>{/* comment */}text</div>;`,
            },
            {
              messageId: "remove-children-content",
              output: tsx`<div children="x"></div>;`,
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
              messageId: "remove-children-prop",
              output: "<MyComponent>{children}</MyComponent>;",
            },
            {
              messageId: "remove-children-content",
              output: tsx`<MyComponent children={children}></MyComponent>;`,
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
              messageId: "remove-children-prop",
              output: '<MyComponent className="class-name">Children</MyComponent>;',
            },
            {
              messageId: "remove-children-content",
              output: '<MyComponent className="class-name" children="Children"></MyComponent>;',
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
              messageId: "remove-children-prop",
              output: '<MyComponent className="class-name">Children</MyComponent>;',
            },
            {
              messageId: "remove-children-content",
              output: '<MyComponent children="Children" className="class-name"></MyComponent>;',
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
              messageId: "remove-children-prop",
              output: tsx`<div>\n  <span />\n</div>;`,
            },
            {
              messageId: "remove-children-content",
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
              messageId: "remove-children-prop",
              output: tsx`<div>\n  <span />\n</div>;`,
            },
            {
              messageId: "remove-children-content",
              output: "<div children={[<div />, <div />]}></div>;",
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
              messageId: "remove-children-prop",
              output: "<div><span /></div>;",
            },
            {
              messageId: "remove-children-content",
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
              messageId: "remove-children-prop",
              output: "<div><a /><b /></div>;",
            },
            {
              messageId: "remove-children-content",
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
              messageId: "remove-children-prop",
              output: "<div>text<span />more</div>;",
            },
            {
              messageId: "remove-children-content",
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
              messageId: "remove-children-prop",
              output: "<Foo.Bar>content</Foo.Bar>;",
            },
            {
              messageId: "remove-children-content",
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
              messageId: "remove-children-prop",
              output: "<div>{content}</div>;",
            },
            {
              messageId: "remove-children-content",
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
              messageId: "remove-children-prop",
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
              messageId: "remove-children-content",
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
    // Boolean shorthand children prop
    {
      code: "<div children>text</div>;",
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "remove-children-prop", output: "<div>text</div>;" },
            { messageId: "remove-children-content", output: "<div children></div>;" },
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
            { messageId: "remove-children-prop", output: tsx`<div><span /></div>;` },
            { messageId: "remove-children-content", output: tsx`<div children={condition ? <A /> : <B />}></div>;` },
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
            { messageId: "remove-children-prop", output: "<div>content</div>;" },
            { messageId: "remove-children-content", output: '<div children=""></div>;' },
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
            { messageId: "remove-children-prop", output: "<div>content</div>;" },
            { messageId: "remove-children-content", output: '<div children=" "></div>;' },
          ],
        },
      ],
    },
    // createElement props with a statically resolvable computed key
    {
      code: 'const propName = "children"; React.createElement("div", { [propName]: "Children" }, "text");',
      errors: [{ messageId: "default" }],
    },
    // Statically evaluable computed keys are matched beyond identifiers
    {
      code: 'React.createElement("div", { ["chi" + "ldren"]: "Children" }, "text");',
      errors: [{ messageId: "default" }],
    },
    // A direct `children` property is inspected even when a spread is also present
    {
      code: 'React.createElement("div", { children: "Children", ...props }, "text");',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<div children="Children" {...props}>text</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "remove-children-prop", output: "<div {...props}>text</div>;" },
            { messageId: "remove-children-content", output: '<div children="Children" {...props}></div>;' },
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
              messageId: "remove-children-prop",
              output: '<div>{""}hello</div>;',
            },
            {
              messageId: "remove-children-content",
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
              messageId: "remove-children-prop",
              output: tsx`<div>{""}<span /></div>;`,
            },
            {
              messageId: "remove-children-content",
              output: '<div children="x"></div>;',
            },
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
            { messageId: "remove-children-prop", output: "<div><></></div>;" },
            { messageId: "remove-children-content", output: '<div children="x"></div>;' },
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
            { messageId: "remove-children-prop", output: '<div>{"  "}</div>;' },
            { messageId: "remove-children-content", output: '<div children="x"></div>;' },
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
            { messageId: "remove-children-prop", output: "<div>{``}</div>;" },
            { messageId: "remove-children-content", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    // Null, 0, false, and undefined are meaningful children
    {
      code: '<div children="x">{null}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "remove-children-prop", output: "<div>{null}</div>;" },
            { messageId: "remove-children-content", output: '<div children="x"></div>;' },
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
            { messageId: "remove-children-prop", output: "<div>{0}</div>;" },
            { messageId: "remove-children-content", output: '<div children="x"></div>;' },
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
            { messageId: "remove-children-prop", output: "<div>{false}</div>;" },
            { messageId: "remove-children-content", output: '<div children="x"></div>;' },
          ],
        },
      ],
    },
    // {undefined} is also a meaningful child
    {
      code: '<div children="x">{undefined}</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            { messageId: "remove-children-prop", output: "<div>{undefined}</div>;" },
            { messageId: "remove-children-content", output: '<div children="x"></div>;' },
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
    // Only nested children, no children prop
    "<div>Children</div>;",
    '<div className="class-name">Children</div>;',
    "<div><div /></div>;",
    "<div><div /><div /></div>;",
    "<MyComponent />",
    "<MyComponent>Children</MyComponent>;",
    '<MyComponent className="class-name"></MyComponent>;',
    '<MyComponent className="class-name">Children</MyComponent>;',
    // Member expression component with only children content (no prop)
    "<Foo.Bar>Children</Foo.Bar>;",
    // Element with only expression children (no prop)
    "<div>{children}</div>;",
    // Only children prop, no nested children
    '<div children="Children" />;',
    tsx`<div children={<div />} />;`,
    tsx`<div children={[<div />, <div />]} />;`,
    '<MyComponent children="Children" />',
    '<MyComponent className="class-name" children="Children" />;',
    // Boolean children shorthand with empty content
    "<div children></div>;",
    // Whitespace-only children is not considered as children content
    '<div children="Children">   </div>;',
    tsx`<div children="Children">   \n   </div>;`,
    // Whitespace-only tab characters
    tsx`<div children="x">\t\t</div>;`,
    // JSX empty fragment without children prop
    "<div><></></div>;",
    // JSX comment without children prop
    tsx`<div>{/* comment */}</div>;`,
    // Empty string expressions are not considered meaningful children (PR #1805)
    '<div children="x">{""}</div>;',
    "<div children=\"x\">{''}</div>;",
    tsx`<div children="x">
      {""}
    </div>;`,
    // Empty expression containers (comment-only or bare) are not considered meaningful children
    tsx`<div children="x">{/* comment */}</div>;`,
    '<div children="x">{}</div>;',
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
    // createElement with a non-static computed identifier key
    'function render(propName: string) { return React.createElement("div", { [propName]: "Children" }, "text"); }',
    // A computed key that statically resolves to a non-string is not a match
    'React.createElement("div", { [0]: "Children" }, "text");',
    // createElement with variable props (not ObjectExpression) – cannot inspect
    tsx`
      const props = { children: "x" };
      React.createElement("div", props, "text");
    `,
    // Spread props are not resolved
    '<div {...{ children: "x" }}>text</div>;',
    'React.createElement("div", { ...{ children: "x" } }, "text");',
    tsx`
      const props = { children: "x" };
      <div {...props}>text</div>;
    `,
  ],
});
