import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-render-return-value";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`var Hello = ReactDOM.render(<div />, document.body);`,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        var o = {
          inst: ReactDOM.render(<div />, document.body)
        };
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function render () {
          return ReactDOM.render(<div />, document.body)
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        var render = (a, b) => ReactDOM.render(a, b)
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        this.o = ReactDOM.render(<div />, document.body);
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        var v; v = ReactDOM.render(<div />, document.body);
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import { render } from "react-dom";
        const result = (render as any)(<div />, document.body);
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        import { render } from "react-dom";
        const result = (render(<div />, document.body) as any);
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    "ReactDOM.render(<div />, document.body);",
    tsx`
      let node;
      ReactDOM.render(<div ref={ref => node = ref}/>, document.body);
    `,
    "var foo = render(<div />, root)",
    "var foo = ReactDOM.renderder(<div />, root)",
    // Boundary: ReactDOM.render in non-banned parent contexts (isReturnValueUsed parent traversal)
    tsx`
      function Component() {
        ReactDOM.render(<div />, document.body);
      }
    `,
    tsx`
      function Component() {
        if (condition) {
          ReactDOM.render(<div />, document.body);
        }
      }
    `,
    tsx`
      function Component() {
        [ReactDOM.render(<div />, document.body)];
      }
    `,
    tsx`
      function Component() {
        const result = condition && ReactDOM.render(<div />, document.body);
      }
    `,
    // render as argument (return value not directly used by banned parent)
    tsx`
      import { render } from "react-dom";
      doSomething(render(<div />, document.body));
    `,
    // render in condition (return value not directly used by banned parent)
    tsx`
      import { render } from "react-dom";
      if (render(<div />, document.body) !== null) {}
    `,
    // render in await (return value not directly used by banned parent)
    tsx`
      import { render } from "react-dom";
      await render(<div />, document.body);
    `,
  ],
});
