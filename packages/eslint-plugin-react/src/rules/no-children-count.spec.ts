import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-children-count";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      // import { Children } from 'react';

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
  invalid: [
    {
      code: dedent`
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
        messageId: "NO_CHILDREN_COUNT",
      }],
    },
    {
      code: dedent`
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
        messageId: "NO_CHILDREN_COUNT",
      }],
    },
    {
      code: dedent`
        import React from 'react';

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
        messageId: "NO_CHILDREN_COUNT",
      }],
    },
    {
      code: dedent`
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
        messageId: "NO_CHILDREN_COUNT",
      }],
    },
  ],
});
