import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-create-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
      code: /* tsx */ `
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
      code: /* tsx */ `
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
      code: /* tsx */ `
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
      code: /* tsx */ `
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
      code: /* tsx */ `
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
      code: /* tsx */ `
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
      code: /* tsx */ `
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
    /* tsx */ `
      import { createRef } from 'react';

      const ref = createRef();
    `,
    /* tsx */ `
      import { createRef } from 'react';

      function notComponent() {
        const ref = createRef();
      }
    `,
    /* tsx */ `
      import { createRef } from 'react';

      function NotComponent() {
        const ref = createRef();
      }
    `,
    /* tsx */ `
      import { createRef } from 'react';

      function NotComponent() {
        return () => createRef();
      }
    `,
    /* tsx */ `
      import { createRef } from 'react';

      function Component() {
        const ref = useRef();

        return <div ref={ref} />;
      }
    `,
    /* tsx */ `
      import { createRef, Component } from 'react';

      class Input extends Component {
        inputRef = createRef();
      }
    `,
  ],
});
