import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-only";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { Children } from 'react';

        function Box({ children }) {
          const element = Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenOnly",
      }],
    },
    {
      code: /* tsx */ `
        const { Children } = require('react');

        function Box({ children }) {
          const element = Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenOnly",
      }],
    },
    {
      code: /* tsx */ `
        import React from 'react';

        function Box({ children }) {
          const element = React.Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenOnly",
      }],
    },
    {
      code: /* tsx */ `
        import * as React from 'react';

        function Box({ children }) {
          const element = React.Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "noChildrenOnly",
      }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `


      const Children = {
        only: () => [],
      }

      function Box({ children }) {
        const element = Children.only(children);
        // ...
      }
    `,
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
  ],
});
