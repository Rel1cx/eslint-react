import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-to-array";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { Children } from 'react';

        export default function ReversedList({ children }) {
          const result = Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenToArray",
      }],
    },
    {
      code: /* tsx */ `
        const { Children } = require('react');

        export default function ReversedList({ children }) {
          const result = Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenToArray",
      }],
    },
    {
      code: /* tsx */ `
        import React from 'react';

        export default function ReversedList({ children }) {
          const result = React.Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenToArray",
      }],
    },
    {
      code: /* tsx */ `
        import * as React from 'react';

        export default function ReversedList({ children }) {
          const result = React.Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenToArray",
      }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { Children } from 'react';

      function SeparatorList({ children }) {
        const result = [];
        Children.forEach(children, (child, index) => {
          result.push(child);
          result.push(<hr key={index} />);
        });
        // ...
      }
    `,
    /* tsx */ `
      import { Children } from 'react';

      function RowList({ children }) {
        return (
          <div className="RowList">
            {Children.map(children, child =>
              <div className="Row">
                {child}
              </div>
            )}
          </div>
        );
      }
    `,
    {
      code: /* tsx */ `
        const Children = {
          toArray: () => [],
        }

        export default function ReversedList({ children }) {
          const result = Children.toArray(children);
          result.reverse();
          // ...
        }
      `,
      settings: {
        "react-x": {
          skipImportCheck: false,
        },
      },
    },
  ],
});
