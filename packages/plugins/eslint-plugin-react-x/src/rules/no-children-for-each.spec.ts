import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-for-each";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
    {
      code: /* tsx */ `
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
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
    {
      code: /* tsx */ `
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
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
    {
      code: /* tsx */ `
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
        messageId: "NO_CHILDREN_FOR_EACH",
      }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      // import { Children } from 'react';

      const Children = {
        forEach: () => undefined,
      }

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
  ],
});
