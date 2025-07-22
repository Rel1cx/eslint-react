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
        const {abc} = props;

        return <p>{abc}</p>;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 17,
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
        const {abc} = props;

        return <p>{abc}</p>;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 3,
      data: {
        name: "hello",
      },
      endColumn: 17,
      endLine: 3,
      line: 3,
    }],
  }, {
    code: tsx`
      function Component(props: { abc: string; hello: string; }) {
        const {abc} = props;

        return <p>{abc}</p>;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 42,
      data: {
        name: "hello",
      },
      endColumn: 56,
      endLine: 1,
      line: 1,
    }],
  }, {
    code: tsx`
      function Component({ abc }: { abc: string; hello: string; }) {
        return <p>{abc}</p>;
      }
    `,
    errors: [{
      messageId: "noUnusedProps",
      column: 44,
      data: {
        name: "hello",
      },
      endColumn: 58,
      endLine: 1,
      line: 1,
    }],
  }],
  valid: [
    ...allValid,
  ],
});
