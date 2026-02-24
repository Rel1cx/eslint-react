import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-clone-element";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
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
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import { cloneElement } from "react";

        function Component() {
          const element = <div />;

          return cloneElement(element, { isHighlighted: true });

          return null
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import React, { cloneElement } from 'react';

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const { cloneElement } = require("react");

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const cloneElement = require("react").cloneElement;

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const React = require("react");
        const { cloneElement } = React;

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const React = require("react");
        const cloneElement = React.cloneElement

        const element = <div />;
        const clonedElement = cloneElement(element);
      `,
      errors: [{
        messageId: "default",
      }],
    },
  ],
  valid: [],
});
