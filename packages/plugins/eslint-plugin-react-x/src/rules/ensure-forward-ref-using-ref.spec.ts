import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./ensure-forward-ref-using-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef((props) => {
          return null;
        });
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef((props) => null);
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef(function (props) {
          return null;
        });
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        forwardRef(function Component(props) {
          return null;
        });
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef((props) => {
          return null;
        });
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef((props) => null);
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef(function (props) {
          return null;
        });
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        React.forwardRef(function Component(props) {
          return null;
        });
      `,
      errors: [{ messageId: "ENSURE_FORWARD_REF_USING_REF" }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      import { forwardRef } from 'react'
      forwardRef((props, ref) => {
        return null;
      });
    `,
    /* tsx */ `
      import { forwardRef } from 'react'
      forwardRef((props, ref) => null);
    `,
    /* tsx */ `
      import { forwardRef } from 'react'
      forwardRef(function (props, ref) {
        return null;
      });
    `,
    /* tsx */ `
      import { forwardRef } from 'react'
      forwardRef(function Component(props, ref) {
        return null;
      });
    `,
    /* tsx */ `
      import * as React from 'react'
      React.forwardRef((props, ref) => {
        return null;
      });
    `,
    /* tsx */ `
      import * as React from 'react'
      React.forwardRef((props, ref) => null);
    `,
    /* tsx */ `
      import * as React from 'react'
      React.forwardRef(function (props, ref) {
        return null;
      });
    `,
    /* tsx */ `
      import * as React from 'react'
      React.forwardRef(function Component(props, ref) {
        return null;
      });
    `,
    /* tsx */ `
      import * as React from 'react'
      function Component(props) {
        return null;
      };
    `,
  ],
});
