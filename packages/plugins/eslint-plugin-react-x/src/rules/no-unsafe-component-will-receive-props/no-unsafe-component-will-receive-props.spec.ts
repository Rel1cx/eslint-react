import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-component-will-receive-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
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
    tsx`
      class Foo extends Bar {
        componentWillReceiveProps() {}
      }
    `,
    tsx`
      import React from "react";

      class Foo extends React.Component {

        componentWillReceiveProps() {}

        render() {
          return <div />;
        }
      }
    `,
    tsx`
      import React from "react";

      class Foo extends React.PureComponent {

        componentWillReceiveProps() {}

        render() {
          return <div />;
        }
      }
    `,
  ],
});
