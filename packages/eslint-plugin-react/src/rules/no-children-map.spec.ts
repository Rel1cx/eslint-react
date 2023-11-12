import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-children-map";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: rootDir,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      // import { Children } from 'react';

      const Children = {
        map: () => 1,
      }

      function RowList({ children }) {
        return (
          <div className="RowList">
            {Children.map(children, child => (
              <div className="Row">
                {child}
              </div>
            ))}
          </div>
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
  ],
  invalid: [
    {
      code: dedent`
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
      errors: [{
        messageId: "NO_CHILDREN_MAP",
      }],
    },
    {
      code: dedent`
        const { Children } = require('react');

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
      errors: [{
        messageId: "NO_CHILDREN_MAP",
      }],
    },
    {
      code: dedent`
        import React from 'react';

        function RowList({ children }) {
          return (
            <div className="RowList">
              {React.Children.map(children, child =>
                <div className="Row">
                  {child}
                </div>
              )}
            </div>
          );
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_MAP",
      }],
    },
    {
      code: dedent`
        import * as React from 'react';

        function RowList({ children }) {
          return (
            <div className="RowList">
              {React.Children.map(children, child =>
                <div className="Row">
                  {child}
                </div>
              )}
            </div>
          );
        }
      `,
      errors: [{
        messageId: "NO_CHILDREN_MAP",
      }],
    },
  ],
});
