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
