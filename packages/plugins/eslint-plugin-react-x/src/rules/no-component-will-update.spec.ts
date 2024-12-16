import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
          messageId: "noComponentWillUpdate",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillUpdate",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillUpdate",
        },
      ],
      output: /* tsx */ `
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
      code: /* tsx */ `
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
          messageId: "noComponentWillUpdate",
        },
      ],
      output: /* tsx */ `
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
    ...allValid,
    /* tsx */ `
      class Foo extends Bar {
        componentWillUpdate() {}
      }
    `,
    /* tsx */ `
      import React from "react";

      class Foo extends React.Component {

        UNSAFE_componentWillUpdate() {}

        render() {
          return <div />;
        }
      }
    `,
    /* tsx */ `
      import React from "react";

      class Foo extends React.PureComponent {

        UNSAFE_componentWillUpdate() {}

        render() {
          return <div />;
        }
      }
    `,
  ],
});
