import tsx from "dedent";

import { ruleTester } from "#/test";
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
    // 非 React 组件类中使用 createRef 不应被报告（类中无法使用 useRef hook）
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
  ],
});
