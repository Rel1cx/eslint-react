import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-children-to-array";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React from 'react';

        export default function ReversedList({ children }) {
          const fact = React.Children.toArray(children);
          fact.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import { Children } from 'react';

        export default function ReversedList({ children }) {
          const fact = Children.toArray(children);
          fact.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import * as React from 'react';

        export default function ReversedList({ children }) {
          const fact = React.Children.toArray(children);
          fact.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const { Children } = require('react');

        export default function ReversedList({ children }) {
          const fact = Children.toArray(children);
          fact.reverse();
          // ...
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
  ],
  valid: [
    {
      code: tsx`
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
    },
    {
      code: tsx`
        import { Children } from 'react';

        function SeparatorList({ children }) {
          const fact = [];
          Children.forEach(children, (child, index) => {
            fact.push(child);
            fact.push(<hr key={index} />);
          });
          // ...
        }
      `,
    },
  ],
});
