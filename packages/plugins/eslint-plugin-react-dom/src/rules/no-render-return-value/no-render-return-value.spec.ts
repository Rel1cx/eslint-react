import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../../test";
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
  ],
  valid: [
    ...allValid,
    "ReactDOM.render(<div />, document.body);",
    tsx`
      let node;
      ReactDOM.render(<div ref={ref => node = ref}/>, document.body);
    `,
    "var foo = render(<div />, root)",
    "var foo = ReactDOM.renderder(<div />, root)",
  ],
});
