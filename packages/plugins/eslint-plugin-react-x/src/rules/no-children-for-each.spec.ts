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
        messageId: "noChildrenForEach",
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
        messageId: "noChildrenForEach",
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
        messageId: "noChildrenForEach",
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
        messageId: "noChildrenForEach",
      }],
    },
  ],
  valid: [
    ...allValid,

    {
      code: /* tsx */ `
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
      settings: {
        "react-x": {
          skipImportCheck: false,
        },
      },
    },
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
