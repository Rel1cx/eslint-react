import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-children-prop";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`<div children />;`, // not a valid use case but make sure we don't crash
      errors: [{ messageId: "default" }],
    },
    {
      code: '<div children="Children" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>Children</div>;",
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={<div />} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div><div /></div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={[<div />, <div />]} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{[<div />, <div />]}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={someVariable} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{someVariable}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={<><span /><span /></>} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div><><span /><span /></></div>;`,
            },
          ],
        },
      ],
    },
    {
      code: '<div children="Children">Children</div>;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>ChildrenChildren</div>;",
            },
          ],
        },
      ],
    },
    {
      code: '<MyComponent children="Children" />',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<MyComponent>Children</MyComponent>",
            },
          ],
        },
      ],
    },
    {
      code: '<MyComponent className="class-name" children="Children" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: '<MyComponent className="class-name">Children</MyComponent>;',
            },
          ],
        },
      ],
    },
    {
      code: '<MyComponent {...props} children="Children" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<MyComponent {...props}>Children</MyComponent>;",
            },
          ],
        },
      ],
    },
    {
      code: '<div children="Children" className="x" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: '<div className="x">Children</div>;',
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={condition ? <A /> : <B />} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{condition ? <A /> : <B />}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={getChildren()} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{getChildren()}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: '<Foo.Bar children="Children" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<Foo.Bar>Children</Foo.Bar>;",
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={<span />}>existing</div>;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>existing<span /></div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={42} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{42}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: "<div children={`hello world`} />;",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>{`hello world`}</div>;",
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={show && <span />} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{show && <span />}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`
        <MyComponent
          id="test"
          children="Children"
          className="x"
        />
      `,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`
                <MyComponent
                  id="test"
                  className="x">Children</MyComponent>
              `,
            },
          ],
        },
      ],
    },
    {
      code: '<div children="" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div></div>;",
            },
          ],
        },
      ],
    },
    {
      code: '<div children=" " />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div> </div>;",
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={""} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{""}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={"&nbsp;"} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{"&nbsp;"}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={<>fragment</>} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div><>fragment</></div>;`,
            },
          ],
        },
      ],
    },
    // JSX edge cases
    {
      code: tsx`<div children={} />;`,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`<div children={null} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{null}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={undefined} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{undefined}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={true} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{true}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={false} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{false}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={0} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{0}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={{ a: 1 }} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div>{{ a: 1 }}</div>;`,
            },
          ],
        },
      ],
    },
    {
      code: "<div children='Children' />;",
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>Children</div>;",
            },
          ],
        },
      ],
    },
    {
      code: '<div children="&lt;span&gt;" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>&lt;span&gt;</div>;",
            },
          ],
        },
      ],
    },
    {
      code: '<div children="{expr}" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>&#123;expr&#125;</div>;",
            },
          ],
        },
      ],
    },
    {
      code: '<div children="A &amp; B" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>A &amp; B</div>;",
            },
          ],
        },
      ],
    },
    {
      code: 'React.createElement("div", { [`children`]: "Children" });',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<div {...{ children: "Children" }} />;',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'const props = { children: "Children" }; <div {...props} />;',
      errors: [{ messageId: "default" }],
    },
    {
      code: '<my:div children="Children" />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<my:div>Children</my:div>;",
            },
          ],
        },
      ],
    },
    {
      code: tsx`<div children={/* comment */ <span />} />;`,
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: tsx`<div><span /></div>;`,
            },
          ],
        },
      ],
    },
    {
      code: '<div children="Children"  />;',
      errors: [
        {
          messageId: "default",
          suggestions: [
            {
              messageId: "moveChildrenToContent",
              output: "<div>Children</div>;",
            },
          ],
        },
      ],
    },
    // createElement
    {
      code: 'React.createElement("div", { children: "Children" });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: "Children" } as Props);',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'createElement("div", { children: "Children" });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { className: "x", children: "Children" });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: <span /> });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: "Children" }, "extra");',
      errors: [{ messageId: "default" }],
    },
    // createElement edge cases
    {
      code: 'React.createElement("div", { ...props, children: "Children" });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { ["children"]: "Children" });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement(MyComponent, { children: "Children" });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: React.createElement("span") });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: null });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: undefined });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: true });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: {} });',
      errors: [{ messageId: "default" }],
    },
    {
      code: 'React.createElement("div", { children: [] });',
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    "<div />;",
    "<div></div>;",
    '<div className="class-name"></div>;',
    "<div>Children</div>;",
    '<div className="class-name">Children</div>;',
    "<div><div /></div>;",
    "<div><div /><div /></div>;",
    "<MyComponent />",
    "<MyComponent>Children</MyComponent>;",
    '<MyComponent className="class-name"></MyComponent>;',
    '<MyComponent className="class-name">Children</MyComponent>;',
    '<MyComponent className="class-name" {...props} />;',
    "<Foo.Bar>Children</Foo.Bar>;",
    '<div id="a" className="b" />;',
    "<xml:svg></xml:svg>;",
    'React.createElement("div", null, "Children");',
    'React.createElement("div", { className: "x" }, "Children");',
    'createElement("div", null, "Children");',
    // edge cases
    'React.createElement("div", getProps());',
    'React.createElement("div");',
    'const propName = "children"; React.createElement("div", { [propName]: "Children" });',
    '<div {...{ className: "x" }} />;',
    'const props = { className: "x" }; <div {...props} />;',
    'import { props } from "props"; <div {...props} />;',
    '<div x:children="Children" />;',
  ],
});
