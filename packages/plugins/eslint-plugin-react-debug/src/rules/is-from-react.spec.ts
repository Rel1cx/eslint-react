import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./is-from-react";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        import React from "react";
        const identifier = React;
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "react" } },
        { messageId: "isFromReact", data: { name: "identifier", importSource: "react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "react" } },
      ],
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";
        const identifier = React;
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "identifier", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";
        const identifier = React.Children;
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "identifier", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";
        function Component() {
          const Fragment = React.Fragment;
          return null;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";
        function Component() {
          return <React.Fragment />;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";
        function Component() {
          const Fragment = React.Fragment;
          return <Fragment />;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        import React from "@pika/react";
        const Children = React.Children;
        function Component() {
          const toArr = Children.toArray;
          return null;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "toArr", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "toArray", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        import React, { Children } from "@pika/react";
        function Component() {
          const toArr = Children.toArray;
          return null;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "toArr", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "toArray", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");
        const identifier = React;
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "identifier", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");
        const identifier = React.Children;
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "identifier", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");
        function Component() {
          const Fragment = React.Fragment;
          return null;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");
        function Component() {
          return <React.Fragment />;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");
        function Component() {
          const Fragment = React.Fragment;
          return <Fragment />;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Fragment", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
    {
      code: /* tsx */ `
        const React = require("@pika/react");
        const Children = React.Children;
        function Component() {
          const toArr = Children.toArray;
          return null;
        }
      `,
      errors: [
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "React", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "toArr", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "Children", importSource: "@pika/react" } },
        { messageId: "isFromReact", data: { name: "toArray", importSource: "@pika/react" } },
      ],
      settings: {
        "react-x": {
          importSource: "@pika/react",
          skipImportCheck: false,
        },
      },
    },
  ],
  valid: [],
});
