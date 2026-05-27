import tsx from "dedent";

import { ruleTester } from "#/test";
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
    // createElement
    {
      code: 'React.createElement("div", { children: "Children" }, "Children");',
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
  ],
  valid: [
    "<div />;",
    "<div></div>;",
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
    // Empty string expressions are not considered meaningful children (PR #1805)
    '<div children="x">{""}</div>;',
    "<div children=\"x\">{''}</div>;",
    tsx`<div children="x">
      {""}
    </div>;`,
  ],
});
