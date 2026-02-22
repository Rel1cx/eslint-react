import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-children-for-each";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
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
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const { Children } = require('react');

        function SeparatorList({ children }) {
          const result = [];
          Children.forEach(children, (child, index) => {
            result.push(child);
            result.push(<hr key={index} />);
          });
          // ...
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import React from 'react';

        function SeparatorList({ children }) {
          const result = [];
          React.Children.forEach(children, (child, index) => {
            result.push(child);
            result.push(<hr key={index} />);
          });
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

        function SeparatorList({ children }) {
          const result = [];
          React.Children.forEach(children, (child, index) => {
            result.push(child);
            result.push(<hr key={index} />);
          });
          // ...
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
  ],
  valid: [
    ...allValid,
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
  ],
});
