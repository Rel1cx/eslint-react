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
    // 命名空间调用 React.createRef() 在函数组件内也应被报告
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
    // 自定义 hook 内使用 createRef 应被报告
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
    // 箭头函数定义的自定义 hook 内使用 createRef 应被报告
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
    // 同一个组件内多次调用 createRef 应分别报告
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
    // 组件内嵌套的辅助函数中使用 createRef 仍应被报告(位于组件作用域内)
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
    // 模块顶层使用 createRef 不应被报告(不在函数组件或 hook 内)
    tsx`
      import { createRef } from 'react';

      const ref = createRef();
    `,
    // 普通工具函数(非组件、非 hook)中使用 createRef 不应被报告
    tsx`
      import { createRef } from 'react';

      function createRefHolder() {
        return createRef();
      }
    `,
    // 箭头函数形式的普通工具函数中使用 createRef 不应被报告
    tsx`
      import { createRef } from 'react';

      const createRefHolder = () => createRef();
    `,
    // 命名空间调用 React.createRef() 在模块顶层不应被报告
    tsx`
      import React from 'react';

      const ref = React.createRef<HTMLElement>();
    `,
  ],
});
