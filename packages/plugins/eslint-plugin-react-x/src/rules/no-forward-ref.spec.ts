import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-forward-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef((props) => {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef((props) => null);
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef(function (props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef(function Component(props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef((props) => {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef((props) => null);
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef(function (props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef(function Component(props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
  ],
  valid: [
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef(function Component(props) {
          return null;
        });
      `,
      settings: {
        "react-x": {
          version: "18.3.1",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'

        const Component = React.forwardRef((props, ref) => {
          return null;
        });
      `,
      settings: {
        "react-x": {
          version: "18.3.1",
        },
      },
    },
    /* tsx */ `
      import * as React from 'react'

      const Component = ({ ref }) => {
        return null;
      };
    `,
    /* tsx */ `
      import * as React from 'react'

      const Component = ({ ref, ...props }) => {
        return null;
      };
    `,
  ],
});
