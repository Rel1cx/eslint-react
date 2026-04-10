import tsx from "dedent";

import { ruleTester } from "../../../../../test";
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
  ],
});
