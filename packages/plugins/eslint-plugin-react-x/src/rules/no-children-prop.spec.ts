import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-prop";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `<div children />;`, // not a valid use case but make sure we don't crash
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: '<div children="Children" />;',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: /* tsx */ `<div children={<div />} />;`,
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: /* tsx */ `<div children={[<div />, <div />]} />;`,
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: '<div children="Children">Children</div>;',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: 'React.createElement("div", {children: "Children"});',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: 'React.createElement("div", {children: "Children"}, "Children");',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: 'React.createElement("div", {children: React.createElement("div")});',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: 'React.createElement("div", {children: [React.createElement("div"), React.createElement("div")]});',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: '<MyComponent children="Children" />',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: 'React.createElement(MyComponent, {children: "Children"});',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: '<MyComponent className="class-name" children="Children" />;',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: 'React.createElement(MyComponent, {children: "Children", className: "class-name"});',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: '<MyComponent {...props} children="Children" />;',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
    {
      code: 'React.createElement(MyComponent, {...props, children: "Children"})',
      errors: [{ messageId: "NO_CHILDREN_PROP" }],
    },
  ],
  valid: [
    ...allValid,
    "<div />;",
    "<div></div>;",
    'React.createElement("div", {});',
    'React.createElement("div", undefined);',
    '<div className="class-name"></div>;',
    'React.createElement("div", {className: "class-name"});',
    "<div>Children</div>;",
    'React.createElement("div", "Children");',
    'React.createElement("div", {}, "Children");',
    'React.createElement("div", undefined, "Children");',
    '<div className="class-name">Children</div>;',
    'React.createElement("div", {className: "class-name"}, "Children");',
    "<div><div /></div>;",
    'React.createElement("div", React.createElement("div"));',
    'React.createElement("div", {}, React.createElement("div"));',
    'React.createElement("div", undefined, React.createElement("div"));',
    "<div><div /><div /></div>;",
    'React.createElement("div", React.createElement("div"), React.createElement("div"));',
    'React.createElement("div", {}, React.createElement("div"), React.createElement("div"));',
    'React.createElement("div", undefined, React.createElement("div"), React.createElement("div"));',
    'React.createElement("div", [React.createElement("div"), React.createElement("div")]);',
    'React.createElement("div", {}, [React.createElement("div"), React.createElement("div")]);',
    'React.createElement("div", undefined, [React.createElement("div"), React.createElement("div")]);',
    "<MyComponent />",
    "React.createElement(MyComponent);",
    "React.createElement(MyComponent, {});",
    "React.createElement(MyComponent, undefined);",
    "<MyComponent>Children</MyComponent>;",
    'React.createElement(MyComponent, "Children");',
    'React.createElement(MyComponent, {}, "Children");',
    'React.createElement(MyComponent, undefined, "Children");',
    '<MyComponent className="class-name"></MyComponent>;',
    'React.createElement(MyComponent, {className: "class-name"});',
    '<MyComponent className="class-name">Children</MyComponent>;',
    'React.createElement(MyComponent, {className: "class-name"}, "Children");',
    '<MyComponent className="class-name" {...props} />;',
    'React.createElement(MyComponent, {className: "class-name", ...props});',
  ],
});
