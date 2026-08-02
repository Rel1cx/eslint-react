import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-component-will-mount";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "componentWillMount in class extending React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          componentWillMount() {}

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

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillMount in class extending Component",
      code: tsx`
        import { Component } from "react";

        class Foo extends Component {

          componentWillMount() {}

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

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillMount in class extending React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          componentWillMount() {}

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

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillMount in class extending PureComponent",
      code: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          componentWillMount() {}

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

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillMount as arrow function class property",
      code: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          componentWillMount = () => {};

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

          UNSAFE_componentWillMount = () => {};

          render() {
            return <div />;
          }
        }
      `,
    },
  ],
  valid: [
    {
      name: "UNSAFE_componentWillMount in class extending React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "UNSAFE_componentWillMount in class extending React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          UNSAFE_componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillMount in class extending non-React class",
      code: tsx`
        class Foo extends Bar {
          componentWillMount() {}
        }
      `,
    },
  ],
});
