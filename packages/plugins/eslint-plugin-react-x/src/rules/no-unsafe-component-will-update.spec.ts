import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_UPDATE",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_UPDATE",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_UPDATE",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_UPDATE",
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

        componentWillUpdate() {}

        render() {
          return <div />;
        }
      }
    `,
    /* tsx */ `
      import React from "react";

      class Foo extends React.PureComponent {

        componentWillUpdate() {}

        render() {
          return <div />;
        }
      }
    `,
  ],
});
