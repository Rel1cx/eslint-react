import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./jsx-no-undef";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const element = <Foo />;
      `,
      errors: [
        {
          messageId: "default",
          data: { name: "Foo" },
        },
      ],
    },
    {
      code: tsx`
        const element = <Foo />;
        const element = <Bar />;
      `,
      errors: [
        {
          messageId: "default",
          data: { name: "Foo" },
        },
        {
          messageId: "default",
          data: { name: "Bar" },
        },
      ],
    },
    {
      code: tsx`
        function Foo() {
          return <Bar />;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: { name: "Bar" },
        },
      ],
    },
  ],
  valid: [
    {
      code: tsx`
        function Foo() {
          return <div />;
        }
        function Bar() {
          return <Foo />;
        }
      `,
    },
    {
      code: tsx`
        import { Foo } from "./Foo";
        import { Bar } from "./Bar";

        function App() {
          return (
            <div>
              <Foo />
              <Bar />
            </div>
          );
        }
      `,
    },
  ],
});
