import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
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
          messageId: "NO_COMPONENT_WILL_UPDATE",
        },
      ],
    },
    {
      code: dedent`
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
          messageId: "NO_COMPONENT_WILL_UPDATE",
        },
      ],
    },
    {
      code: dedent`
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
          messageId: "NO_COMPONENT_WILL_UPDATE",
        },
      ],
    },
    {
      code: dedent`
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
          messageId: "NO_COMPONENT_WILL_UPDATE",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    dedent`
      class Foo extends Bar {
        componentWillUpdate() {}
      }
    `,
    dedent`
      import React from "react";

      class Foo extends React.Component {

        UNSAFE_componentWillUpdate() {}

        render() {
          return <div />;
        }
      }
    `,
    dedent`
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
