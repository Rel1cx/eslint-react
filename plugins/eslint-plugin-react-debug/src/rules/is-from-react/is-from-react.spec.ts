import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import { stringify } from "@/utils/stringify";
import rule, { RULE_NAME } from "./is-from-react";

function reactError(name: string, importSource = "react") {
  return {
    data: {
      json: stringify({ name, importSource }),
    },
    messageId: "default" as const,
  };
}

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import React from "react";
        const identifier = React;
      `,
      errors: [
        {
          data: {
            json: stringify({
              name: "React",
              importSource: "react",
            }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({
              name: "identifier",
              importSource: "react",
            }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({
              name: "React",
              importSource: "react",
            }),
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        import React from "@pika/react";
        const identifier = React;
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "identifier", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        import React from "@pika/react";
        const identifier = React.Children;
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "identifier", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        import React from "@pika/react";
        function Component() {
          const Fragment = React.Fragment;
          return null;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        import React from "@pika/react";
        function Component() {
          return <React.Fragment />;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        import React from "@pika/react";
        function Component() {
          const Fragment = React.Fragment;
          return <Fragment />;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        import React from "@pika/react";
        const Children = React.Children;
        function Component() {
          const toArr = Children.toArray;
          return null;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "toArr", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "toArray", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        import React, { Children } from "@pika/react";
        function Component() {
          const toArr = Children.toArray;
          return null;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "toArr", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "toArray", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        const React = require("@pika/react");
        const identifier = React;
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "identifier", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        const React = require("@pika/react");
        const identifier = React.Children;
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "identifier", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        const React = require("@pika/react");
        function Component() {
          const Fragment = React.Fragment;
          return null;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        const React = require("@pika/react");
        function Component() {
          return <React.Fragment />;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        const React = require("@pika/react");
        function Component() {
          const Fragment = React.Fragment;
          return <Fragment />;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Fragment", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        const React = require("@pika/react");
        const Children = React.Children;
        function Component() {
          const toArr = Children.toArray;
          return null;
        }
        function Component2() {
          const Children = {
            toArray: () => {},
          }
          const toArr = Children.toArray;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "React", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "toArr", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "Children", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
        {
          data: {
            json: stringify({ name: "toArray", importSource: "@pika/react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
        },
      },
    },
    {
      code: tsx`
        import { Children } from "react";
        function Component() {
          const Children = {
            toArray: () => {},
          }
          const arr = Children.toArray;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "Children", importSource: "react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        import { Children as ReactChildren } from "react";
        function Component() {
          const Children = {
            toArray: () => {},
          }
          const arr = Children.toArray;
        }
      `,
      errors: [
        {
          data: {
            json: stringify({ name: "ReactChildren", importSource: "react" }),
          },
          messageId: "default",
        },
      ],
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        import ReactDOM from "react-dom";
      `,
      errors: [reactError("ReactDOM")],
    },
    {
      code: tsx`
        import type { ReactNode } from "react";

        type Props = { children: ReactNode };
      `,
      errors: [
        reactError("ReactNode"),
        reactError("ReactNode"),
      ],
    },
    {
      code: tsx`
        import * as React from "react";

        const { Children: ReactChildren } = React;
      `,
      errors: [
        reactError("React"),
        reactError("ReactChildren"),
        reactError("React"),
      ],
    },
    {
      code: tsx`
        import React from "react";

        const Children = React["Children"];
      `,
      errors: [
        reactError("React"),
        reactError("Children"),
        reactError("React"),
      ],
    },
    {
      code: tsx`
        import React from "react";

        const only = React.Children.only;
      `,
      errors: [
        reactError("React"),
        reactError("React"),
        reactError("Children"),
      ],
    },
    {
      code: tsx`
        import { Component } from "react";

        let Alias;
        Alias = Component;
        const Copy = Alias;
      `,
      errors: [
        reactError("Component"),
        reactError("Component"),
      ],
    },
    {
      code: tsx`
        const React = {};
        React.Children;
      `,
      errors: [
        reactError("React"),
        reactError("React"),
        reactError("Children"),
      ],
    },
    {
      code: tsx`
        import { memo } from "react";

        const wrapped = memo as unknown;
      `,
      errors: [
        reactError("memo"),
        reactError("wrapped"),
        reactError("memo"),
      ],
    },
  ],
  valid: [
    {
      code: tsx`
        import notReact from "not-react";
        const identifier = notReact;
      `,
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        import { Component } from "not-react";
        const identifier = Component;
      `,
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        import { Children } from "not-react";
        const identifier = Children;
      `,
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        import { Children } from "not-react";
        const identifier = Children.toArray;
      `,
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        const Children = {
          toArray: () => {},
        }
        const identifier = Children.toArray;
      `,
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    {
      code: tsx`
        const Children = {
          toArray: () => {},
        }
        function Component() {
          const arr = Children.toArray;
        }
      `,
      settings: {
        "react-x": {
          importSource: "react",
        },
      },
    },
    tsx`
      export { memo } from "react";
    `,
    tsx`
      const library = require(source);
      const Children = library.Children;
    `,
    tsx`
      const Reactish = {};
      const value = Reactish.Children;
    `,
  ],
});
