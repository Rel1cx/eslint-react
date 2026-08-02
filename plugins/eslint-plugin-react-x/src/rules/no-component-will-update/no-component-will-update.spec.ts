import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "componentWillUpdate in class extending React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
      output: tsx`
        import React from "react";

        class Foo extends React.Component {

          UNSAFE_componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillUpdate in class extending Component",
      code: tsx`
        import { Component } from "react";

        class Foo extends Component {

          componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
      output: tsx`
        import { Component } from "react";

        class Foo extends Component {

          UNSAFE_componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillUpdate in class extending React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
      output: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          UNSAFE_componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillUpdate in class extending PureComponent",
      code: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          messageId: "default",
        },
      ],
      output: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          UNSAFE_componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
    },
  ],
  valid: [
    {
      name: "UNSAFE_componentWillUpdate in class extending React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          UNSAFE_componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "UNSAFE_componentWillUpdate in class extending React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          UNSAFE_componentWillUpdate() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillUpdate in class not extending a React component",
      code: tsx`
        class Foo extends Bar {
          componentWillUpdate() {}
        }
      `,
    },
  ],
});
