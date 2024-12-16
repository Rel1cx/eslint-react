import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-component-will-receive-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
          messageId: "noComponentWillReceiveProps",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillReceiveProps",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillReceiveProps",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillReceiveProps",
        },
      ],
      output: /* tsx */ `
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
    ...allValid,
    /* tsx */ `
      class Foo extends Bar {
        componentWillReceiveProps() {}
      }
    `,
    /* tsx */ `
      import React from "react";

      class Foo extends React.Component {

        UNSAFE_componentWillReceiveProps() {}

        render() {
          return <div />;
        }
      }
    `,
    /* tsx */ `
      import React from "react";

      class Foo extends React.PureComponent {

        UNSAFE_componentWillReceiveProps() {}

        render() {
          return <div />;
        }
      }
    `,
  ],
});
