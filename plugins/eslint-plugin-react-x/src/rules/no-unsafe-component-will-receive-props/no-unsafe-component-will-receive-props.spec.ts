import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-unsafe-component-will-receive-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "UNSAFE_componentWillReceiveProps in React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          UNSAFE_componentWillReceiveProps() {}

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
      name: "UNSAFE_componentWillReceiveProps in React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          UNSAFE_componentWillReceiveProps() {}

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
      name: "UNSAFE_componentWillReceiveProps in Component",
      code: tsx`
        import { Component } from "react";

        class Foo extends Component {

          UNSAFE_componentWillReceiveProps() {}

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
      name: "UNSAFE_componentWillReceiveProps in PureComponent",
      code: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          UNSAFE_componentWillReceiveProps() {}

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
      name: "componentWillReceiveProps in React.Component",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillReceiveProps in React.PureComponent",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          componentWillReceiveProps() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillReceiveProps in non-React class",
      code: tsx`
        class Foo extends Bar {
          componentWillReceiveProps() {}
        }
      `,
    },
  ],
});
