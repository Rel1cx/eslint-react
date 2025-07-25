import tsx from "dedent";

import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unused-props";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [{
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
  }],
  valid: [
    {
      // valid, because all props are used
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
      // valid, because all props are used
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
      // valid, because all props are used
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          const { abc, hello } = props;
          return null;
        }
      `,
    },
    {
      // valid, because all props are used
      code: tsx`
        function Component({ abc, hello }: { abc: string; hello: string; }) {
          return null;
        }
      `,
    },
    {
      // valid, because props are used by two components each accessing one prop
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
    ...allValid,
  ],
});
