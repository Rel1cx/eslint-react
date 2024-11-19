import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-children-count";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { Children } from 'react';

        function RowList({ children }) {
          return (
            <>
              <h1>Total rows: {Children.count(children)}</h1>
              ...
            </>
          );
        }
      `,
      errors: [{
        messageId: "noChildrenCount",
      }],
    },
    {
      code: /* tsx */ `
        const { Children } = require('react');

        function RowList({ children }) {
          return (
            <>
              <h1>Total rows: {Children.count(children)}</h1>
              ...
            </>
          );
        }
      `,
      errors: [{
        messageId: "noChildrenCount",
      }],
    },
    {
      code: /* tsx */ `
        import Roact from 'roact';

        function RowList({ children }) {
          return (
            <>
              <h1>Total rows: {Roact.Children.count(children)}</h1>
              ...
            </>
          );
        }
      `,
      errors: [{
        messageId: "noChildrenCount",
      }],
      settings: {
        "react-x": {
          importSource: "roact",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react';

        function RowList({ children }) {
          return (
            <>
              <h1>Total rows: {React.Children.count(children)}</h1>
              ...
            </>
          );
        }
      `,
      errors: [{
        messageId: "noChildrenCount",
      }],
    },
  ],
  valid: [
    ...allValid,
    {
      code: /* tsx */ `
        const Children = {
          count: () => 1,
        }

        function RowList({ children }) {
          return (
            <>
              <h1>Total rows: {Children.count(children)}</h1>
              ...
            </>
          );
        }
      `,
      settings: {
        "react-x": {
          strictImportCheck: true,
        },
      },
    },
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
