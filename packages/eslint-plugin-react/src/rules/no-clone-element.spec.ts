import { allValid } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-clone-element";

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
  ],
  invalid: [
    {
      code: dedent`
        import { cloneElement } from "react";

        // ...
        const clonedElement = cloneElement(
          <Row title="Cabbage">
            Hello
          </Row>,
          { isHighlighted: true },
          "Goodbye",
        );
        // ...
      `,
      errors: [{
        messageId: "NO_CLONE_ELEMENT",
      }],
    },
    {
      code: dedent`
        import { cloneElement } from "react";

        function Component() {
          const element = <div />;

          return cloneElement(element, { isHighlighted: true });

          return null
        }
      `,
      errors: [{
        messageId: "NO_CLONE_ELEMENT",
      }],
    },
    {
      code: dedent`
        import React, { cloneElement } from 'react';

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "NO_CLONE_ELEMENT",
      }],
    },
    {
      code: dedent`
        const { cloneElement } = require("react");

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "NO_CLONE_ELEMENT",
      }],
    },
    {
      code: dedent`
        const cloneElement = require("react").cloneElement;

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "NO_CLONE_ELEMENT",
      }],
    },
    {
      code: dedent`
        const React = require("react");
        const { cloneElement } = React;

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "NO_CLONE_ELEMENT",
      }],
    },
    {
      code: dedent`
        const React = require("react");
        const cloneElement = React.cloneElement

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "NO_CLONE_ELEMENT",
      }],
    },
  ],
});
