import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-component-will-mount";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
          messageId: "noComponentWillMount",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillMount",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillMount",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillMount",
        },
      ],
      output: /* tsx */ `
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          UNSAFE_componentWillMount() {}

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
        componentWillMount() {}
      }
    `,
    /* tsx */ `
      import React from "react";

      class Foo extends React.Component {

        UNSAFE_componentWillMount() {}

        render() {
          return <div />;
        }
      }
    `,
    /* tsx */ `
      import React from "react";

      class Foo extends React.PureComponent {

        UNSAFE_componentWillMount() {}

        render() {
          return <div />;
        }
      }
    `,
  ],
});
