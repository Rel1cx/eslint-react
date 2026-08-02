import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-unsafe-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      name: "UNSAFE_componentWillUpdate in class extending Component",
      code: tsx`
        import { Component } from "react";

        class Foo extends Component {

          UNSAFE_componentWillUpdate() {}

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
      errors: [
        {
          messageId: "default",
        },
      ],
    },
    {
      name: "UNSAFE_componentWillUpdate in class extending PureComponent",
      code: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          UNSAFE_componentWillUpdate() {}

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
    },
  ],
  valid: [
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
    },
    {
      name: "componentWillUpdate in class extending unrelated class",
      code: tsx`
        class Foo extends Bar {
          componentWillUpdate() {}
        }
      `,
    },
  ],
});
