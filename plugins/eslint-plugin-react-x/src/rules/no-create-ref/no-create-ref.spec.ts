import tsx from "dedent";

import { ruleTester } from "@local/testkit";
import rule, { RULE_NAME } from "./no-create-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { createRef } from 'react';

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import { createRef } from 'react';

        const Component = () => {
          const ref = createRef();

          return <div ref={ref} />;
        };
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import { createRef } from 'react';

        function Component() {
          const ref = createRef();

          return null
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        import React, { createRef } from 'react';

        function Component() {
          const ref = createRef();

          return null
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Namespace access via the default React import is also a `createRef` call
    {
      code: tsx`
        import React from 'react';

        function Component() {
          const ref = React.createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const { createRef } = require("react");

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const createRef = require("react").createRef;

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const React = require("react");
        const { createRef } = React;

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    {
      code: tsx`
        const React = require("react");
        const createRef = React.createRef;

        function Component() {
          const ref = createRef();

          return <div ref={ref} />;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Function-declared custom Hook
    {
      code: tsx`
        import { createRef } from 'react';

        function useCustomRef() {
          const ref = createRef();

          return ref;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Arrow-function custom Hook
    {
      code: tsx`
        import { createRef } from 'react';

        const useCustomRef = () => {
          const ref = createRef();

          return ref;
        };
      `,
      errors: [{
        messageId: "default",
      }],
    },
    // Each call in the same component gets its own report
    {
      code: tsx`
        import { createRef } from 'react';

        function Component() {
          const ref1 = createRef();
          const ref2 = createRef();

          return <div ref={ref1} data-ref={ref2} />;
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Call nested in a helper declared inside the component
    {
      code: tsx`
        import { createRef } from 'react';

        function Component() {
          function createRefs() {
            return createRef();
          }

          return <div ref={createRefs()} />;
        }
      `,
      errors: [{
        messageId: "default",
      }],
    },
  ],
  valid: [
    tsx`
      import { createRef } from 'react';

      function Component() {
        const ref = useRef();

        return <div ref={ref} />;
      }
    `,
    tsx`
      import { createRef, Component } from 'react';

      class Input extends Component {
        inputRef = createRef();
      }
    `,
    // Plain classes are neither function components nor Hooks
    tsx`
      import React from 'react';

      class DialogStore {
        constructor() {
          this.popupRef = React.createRef<HTMLElement>();
        }
      }
    `,
    tsx`
      import React from 'react';

      class PopoverStore extends ReactStore {
        constructor() {
          super();
          this.popupRef = React.createRef<HTMLElement>();
        }
      }
    `,
    tsx`
      import { createRef } from 'react';

      class TooltipStore {
        tooltipRef = createRef<HTMLElement>();
      }
    `,
    // Module top-level sits outside any component or Hook
    tsx`
      import { createRef } from 'react';

      const ref = createRef();
    `,
    // Namespace access at module top-level
    tsx`
      import React from 'react';

      const ref = React.createRef<HTMLElement>();
    `,
    // Lowercase utility function, not a Hook
    tsx`
      import { createRef } from 'react';

      function createRefHolder() {
        return createRef();
      }
    `,
    // Lowercase arrow utility, not a Hook
    tsx`
      import { createRef } from 'react';

      const createRefHolder = () => createRef();
    `,
  ],
});
