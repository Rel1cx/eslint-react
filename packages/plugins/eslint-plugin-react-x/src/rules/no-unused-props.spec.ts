import tsx from "dedent";

import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unused-props";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [{
    // interface type and later destructuring
    code: tsx`
      interface Props {
        abc: string;
        hello: string;
      }

      function Component(props: Props) {
        const { abc } = props;
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 8,
      endLine: 3,
      line: 3,
    }],
  }, {
    // interface type and direct destructuring
    code: tsx`
      interface Props {
        abc: string;
        hello: string;
      }

      function Component({ abc }: Props) {
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 8,
      endLine: 3,
      line: 3,
    }],
  }, {
    // named type and later destructuring
    code: tsx`
      type Props = {
        abc: string;
        hello: string;
      }

      function Component(props: Props) {
        const { abc } = props;
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 8,
      endLine: 3,
      line: 3,
    }],
  }, {
    // interface type and direct destructuring
    code: tsx`
      type Props = {
        abc: string;
        hello: string;
      }

      function Component({ abc }: Props) {
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 8,
      endLine: 3,
      line: 3,
    }],
  }, {
    // inline type and later destructuring
    code: tsx`
      function Component(props: { abc: string; hello: string; }) {
        const { abc } = props;
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 42,
      data: {
        name: "hello",
      },
      endColumn: 47,
      endLine: 1,
      line: 1,
    }],
  }, {
    // inline type and direct destructuring
    code: tsx`
      function Component({ abc }: { abc: string; hello: string; }) {
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 44,
      data: {
        name: "hello",
      },
      endColumn: 49,
      endLine: 1,
      line: 1,
    }],
  }, {
    // multiple properties unused
    code: tsx`
      function Component({ }: { abc: string; hello: string; }) {
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 27,
      data: {
        name: "abc",
      },
      endColumn: 30,
      endLine: 1,
      line: 1,
    }, {
      messageId: "noUnusedProps",
      column: 40,
      data: {
        name: "hello",
      },
      endColumn: 45,
      endLine: 1,
      line: 1,
    }],
  }, {
    // interface augmentation
    code: tsx`
      interface Props {
        used1: string;
        abc: string;
      }

      interface Props {
        used2: string;
        hello: string;
      }

      function Component({ used1, used2 }: Props) {
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "abc",
      },
      endColumn: 6,
      endLine: 3,
      line: 3,
    }, {
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 8,
      endLine: 8,
      line: 8,
    }],
  }, {
    // interface union
    code: tsx`
      interface Props1 {
        used1: string;
        abc: string;
      }

      interface Props2 {
        used2: string;
        hello: string;
      }

      function Component({ used1, used2 }: Props1 & Props2) {
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "abc",
      },
      endColumn: 6,
      endLine: 3,
      line: 3,
    }, {
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 8,
      endLine: 8,
      line: 8,
    }],
  }, {
    // interface extends
    code: tsx`
      interface PropsBase {
        used1: string;
        abc: string;
      }

      interface Props extends PropsBase {
        used2: string;
        hello: string;
      }

      function Component({ used1, used2 }: Props) {
        return null;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "abc",
      },
      endColumn: 6,
      endLine: 3,
      line: 3,
    }, {
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 8,
      endLine: 8,
      line: 8,
    }],
  }, {
    // track uses of properties on rest element
    code: tsx`
      function Component({ ...rest }: { abc: string; hello: string; }) {
        return <div>{rest.abc}</div>;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 48,
      data: {
        name: "hello",
      },
      endColumn: 53,
      endLine: 1,
      line: 1,
    }],
  }],
  valid: [
    {
      // all props are used
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          const { abc, hello } = props;
          return null;
        }
      `,
    },
    {
      // all props are used
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component({ abc, hello }: Props) {
          return null;
        }
      `,
    },
    {
      // all props are used
      code: tsx`
        type Props = {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          const { abc, hello } = props;
          return null;
        }
      `,
    },
    {
      // all props are used
      code: tsx`
        type Props = {
          abc: string;
          hello: string;
        }

        function Component({ abc, hello }: Props) {
          return null;
        }
      `,
    },
    {
      // all props are used
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          const { abc, hello } = props;
          return null;
        }
      `,
    },
    {
      // all props are used
      code: tsx`
        function Component({ abc, hello }: { abc: string; hello: string; }) {
          return null;
        }
      `,
    },
    {
      // all props are used
      code: tsx`
        function Component({ abc: abc2, hello: hello2 }: { abc: string; hello: string; }) {
          return null;
        }
      `,
    },
    {
      // props are used by two components each accessing one prop
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component({ abc }: Props) {
          return null;
        }

        function Component2({ hello }: Props) {
          return null;
        }
      `,
    },
    {
      // we can't track what happens to the props object
      code: tsx`
        import { Component2 } from "./component2";
      
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          return <Component2 {...props} />;
        }
      `,
    },
    {
      // we can't track what happens to the props object
      code: tsx`
        import { anyFunction } from "./anyFunction";
      
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          anyFunction(props);

          return null;
        }
      `,
    },
    {
      // we can't track what happens to the props object
      code: tsx`
        import { anyFunction } from "./anyFunction";
      
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          anyFunction({ props });

          return null;
        }
      `,
    },
    {
      // one value used in jsx, the other in effect
      code: tsx`
        import { useEffect } from "react";
      
        function Component({ abc, hello }: { abc: string; hello: string }) {
          useEffect(() => {
            console.log(hello);
          }, []);
          return <div>{abc}</div>;
        }
      `,
    },
    {
      // we can't track what happens to the rest object
      code: tsx`
        import { anyFunction } from "./anyFunction";

        function Component({ abc, ...rest }: { abc: string; hello: string }) {
          anyFunction(rest);
          return null;
        }
      `,
    },
    {
      // props used inside nested function
      code: tsx`
        function Component(props: { abc: string; hello: string }) {
          function inner() {
            return props.hello;
          }
          return props.abc;
        }
      `,
    },
    {
      // props used conditionally
      code: tsx`
        function Component(props: { abc: string; hello: string }) {
          if (Math.random() > 0.5) {
            return <div>{props.abc}</div>;
          }
          return <div>{props.hello}</div>;
        }
      `,
    },
    ...allValid,
  ],
});
