import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-forward-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = forwardRef((props) => {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = ({ ref, ...props }) => {
          return null;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = forwardRef((props) => null);
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = ({ ref, ...props }) => null;
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = forwardRef(function (props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = function ({ ref, ...props }) {
          return null;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = forwardRef(function Component(props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import { forwardRef } from 'react'
        const Component = function Component({ ref, ...props }) {
          return null;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef((props) => {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = ({ ref, ...props }) => {
          return null;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef((props) => null);
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = ({ ref, ...props }) => null;
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef(function (props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = function ({ ref, ...props }) {
          return null;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef(function Component(props) {
          return null;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = function Component({ ref, ...props }) {
          return null;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef(function Component(props, ref) {
          return <div ref={ref} />;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = function Component({ ref, ...props }) {
          return <div ref={ref} />;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        interface ComponentProps {
          foo: string;
        }
        const Component = React.forwardRef<HTMLElement, ComponentProps>(function Component(props, ref) {
          return <div ref={ref} />;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        interface ComponentProps {
          foo: string;
        }
        const Component = function Component({ ref, ...props }: ComponentProps & { ref: React.RefObject<HTMLElement> }) {
          return <div ref={ref} />;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef<HTMLElement, { foo: string }>(function Component(props, ref) {
          return <div ref={ref}>{props.foo}</div>;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = function Component({ ref, ...props }: { foo: string } & { ref: React.RefObject<HTMLElement> }) {
          return <div ref={ref}>{props.foo}</div>;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef<HTMLElement, { foo: string }>(function Component({ foo }, ref) {
          return <div ref={ref}>{foo}</div>;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = function Component({ ref, foo }: { foo: string } & { ref: React.RefObject<HTMLElement> }) {
          return <div ref={ref}>{foo}</div>;
        };
      `,
      settings: {
        "react-x": {
          version: "19.0.0",
        },
      },
    },
    {
      code: /* tsx */ `
        import * as React from 'react'
        const Component = React.forwardRef<HTMLElement, { foo: string }>(function Component({ foo }, r) {
          return <div ref={r}>{foo}</div>;
        });
      `,
      errors: [{ messageId: "noForwardRef" }],
      output: /* tsx */ `
        import * as React from 'react'
        const Component = function Component({ ref: r, foo }: { foo: string } & { ref: React.RefObject<HTMLElement> }) {
          return <div ref={r}>{foo}</div>;
        };
      `,
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
