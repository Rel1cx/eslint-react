import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-only";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
        import { Children } from 'react';

        function Box({ children }) {
          const element = Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_ONLY",
      }],
    },
    {
      code: dedent`
        const { Children } = require('react');

        function Box({ children }) {
          const element = Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_ONLY",
      }],
    },
    {
      code: dedent`
        import React from 'react';

        function Box({ children }) {
          const element = React.Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_ONLY",
      }],
    },
    {
      code: dedent`
        import * as React from 'react';

        function Box({ children }) {
          const element = React.Children.only(children);
          // ...
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_ONLY",
      }],
    },
  ],
  valid: [
    ...allValid,
    dedent`
      // import { Children } from 'react';

      const Children = {
        only: () => [],
      }

      function Box({ children }) {
        const element = Children.only(children);
        // ...
      }
    `,
    dedent`
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
    dedent`
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
