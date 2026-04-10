import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-nested-lazy-component-declarations";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import { lazy } from "react";

        function Editor() {
          // 🔴 Bad: This will cause all state to be reset on re-renders
          const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
          //    ^^^^^^^^^^^^^^^
          //    - Do not declare lazy components inside other components. Instead, always declare them at the top level of your module.
          // ...

          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // In class component
    {
      code: tsx`
        import { lazy } from "react";
        import React from "react";

        class Editor extends React.Component {
          render() {
            const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
            return <MarkdownPreview />;
          }
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // In hook
    {
      code: tsx`
        import { lazy, useState } from "react";

        function useEditor() {
          const [show, setShow] = useState(false);
          const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

          return { show, setShow, MarkdownPreview };
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // In JSX context (inside JSX element)
    {
      code: tsx`
        import { lazy } from "react";

        function Editor() {
          return (
            <div>
              {(() => {
                const InlinePreview = lazy(() => import("./InlinePreview.js"));
                return <InlinePreview />;
              })()}
            </div>
          );
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // In arrow function component
    {
      code: tsx`
        import { lazy } from "react";

        const Editor = () => {
          const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
          return <MarkdownPreview />;
        };
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // Multiple lazy declarations in same component
    {
      code: tsx`
        import { lazy } from "react";

        function Editor() {
          const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
          const CodeBlock = lazy(() => import("./CodeBlock.js"));
          return <MarkdownPreview><CodeBlock /></MarkdownPreview>;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    // In nested function component
    {
      code: tsx`
        import { lazy } from "react";

        function Outer() {
          function Inner() {
            const LazyComp = lazy(() => import("./LazyComp.js"));
            return <LazyComp />;
          }
          return <Inner />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // In render prop
    {
      code: tsx`
        import { lazy } from "react";

        function Editor() {
          return (
            <DataProvider render={() => {
              const LazyWidget = lazy(() => import("./Widget.js"));
              return <LazyWidget />;
            }} />
          );
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // Lazy with React.lazy explicit call
    {
      code: tsx`
        import React from "react";

        function Editor() {
          const MarkdownPreview = React.lazy(() => import("./MarkdownPreview.js"));
          return <MarkdownPreview />;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    // Conditional lazy declaration (inside if statement in component)
    {
      code: tsx`
        import { lazy } from "react";

        function Editor({ useAdvanced }) {
          if (useAdvanced) {
            const AdvancedPreview = lazy(() => import("./AdvancedPreview.js"));
            return <AdvancedPreview />;
          }
          return null;
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    // Top-level declaration (original valid case)
    tsx`
      import { lazy } from "react";

      // ✅ Good: Declare lazy components outside of your components
      const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));

      function Editor() {
        // ...
      }
    `,
    // Multiple top-level declarations
    tsx`
      import { lazy } from "react";

      const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
      const CodeBlock = lazy(() => import("./CodeBlock.js"));
      const InlineImage = lazy(() => import("./InlineImage.js"));

      function Editor() {
        return (
          <MarkdownPreview>
            <CodeBlock />
            <InlineImage />
          </MarkdownPreview>
        );
      }
    `,
    // Non-component function (starts with lowercase, not a component)
    tsx`
      import { lazy } from "react";

      function loadComponent() {
        // This is a utility function, not a component
        return lazy(() => import("./DynamicComponent.js"));
      }
    `,
    // Regular function (not a component)
    tsx`
      import { lazy } from "react";

      function loadComponent() {
        // This is not a component, so it's valid
        return lazy(() => import("./DynamicComponent.js"));
      }
    `,
    // Arrow function returning lazy (not a component)
    tsx`
      import { lazy } from "react";

      const createLazyComponent = () => {
        return lazy(() => import("./DynamicComponent.js"));
      };
    `,
    // Top-level with React.lazy
    tsx`
      import React from "react";

      const MarkdownPreview = React.lazy(() => import("./MarkdownPreview.js"));

      function Editor() {
        return <MarkdownPreview />;
      }
    `,
    // In a utility function (starts with lowercase)
    tsx`
      import { lazy } from "react";

      function getLazyComponent() {
        return lazy(() => import("./Component.js"));
      }
    `,
    // Regular import (not dynamic)
    tsx`
      import { useState } from "react";
      import StaticComponent from "./StaticComponent";

      function Editor() {
        const [state, setState] = useState(0);
        return <StaticComponent />;
      }
    `,
  ],
});
