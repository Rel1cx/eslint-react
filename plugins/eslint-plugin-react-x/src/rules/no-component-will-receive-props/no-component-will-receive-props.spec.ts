import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-component-will-receive-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "componentWillReceiveProps in class extending React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          componentWillReceiveProps() {}

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

          UNSAFE_componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillReceiveProps in class extending React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          componentWillReceiveProps() {}

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

          UNSAFE_componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillReceiveProps in class extending named Component import",
      code: tsx`
        import { Component } from "react";

        class Foo extends Component {

          componentWillReceiveProps() {}

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

          UNSAFE_componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillReceiveProps in class extending named PureComponent import",
      code: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          componentWillReceiveProps() {}

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

          UNSAFE_componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
  ],
  valid: [
    {
      name: "UNSAFE_componentWillReceiveProps in class extending React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          UNSAFE_componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "UNSAFE_componentWillReceiveProps in class extending React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          UNSAFE_componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillReceiveProps in class not extending React component",
      code: tsx`
        class Foo extends Bar {
          componentWillReceiveProps() {}
        }
      `,
    },
  ],
});
