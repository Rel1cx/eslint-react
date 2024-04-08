import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-create-ref";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});
ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
        import { createRef } from 'react';

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
    {
      code: dedent`
        import { createRef } from 'react';

        const Component = () => {
          const ref = createRef();

          return <div ref={ref} />;
        };
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
    {
      code: dedent`
        import { createRef } from 'react';

        function Component() {
          const ref = createRef();

          return null
        }
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
    {
      code: dedent`
        import React, { createRef } from 'react';

        function Component() {
          const ref = createRef();

          return null
        }
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
    {
      code: dedent`
        const { createRef } = require("react");

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
    {
      code: dedent`
        const createRef = require("react").createRef;

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
    {
      code: dedent`
        const React = require("react");
        const { createRef } = React;

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
    {
      code: dedent`
        const React = require("react");
        const createRef = React.createRef;

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "NO_CREATE_REF",
      }],
    },
  ],
  valid: [
    ...allValid,
    dedent`
      import { createRef } from 'react';

      const ref = createRef();
    `,
    dedent`
      import { createRef } from 'react';

      function notComponent() {
        const ref = createRef();
      }
    `,
    dedent`
      import { createRef } from 'react';

      function NotComponent() {
        const ref = createRef();
      }
    `,
    dedent`
      import { createRef } from 'react';

      function NotComponent() {
        return () => createRef();
      }
    `,
    dedent`
      import { createRef } from 'react';

      function Component() {
        const ref = useRef();

        return <div ref={ref} />;
      }
    `,
    dedent`
      import { createRef, Component } from 'react';

      class Input extends Component {
        inputRef = createRef();
      }
    `,
  ],
});
