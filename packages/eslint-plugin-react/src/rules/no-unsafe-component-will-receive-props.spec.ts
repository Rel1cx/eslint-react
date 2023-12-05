import dedent from "dedent";

import { allValid, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./no-unsafe-component-will-receive-props";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allValid,
    dedent`
      class Foo extends Bar {
        componentWillReceiveProps() {}
      }
    `,
    dedent`
      import React from "react";

      class Foo extends React.Component {

        componentWillReceiveProps() {}

        render() {
          return <div />;
        }
      }
    `,
    dedent`
      import React from "react";

      class Foo extends React.PureComponent {

        componentWillReceiveProps() {}

        render() {
          return <div />;
        }
      }
    `,
  ],
  invalid: [
    {
      code: dedent`
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_RECEIVE_PROPS",
        },
      ],
    },
    {
      code: dedent`
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_RECEIVE_PROPS",
        },
      ],
    },
    {
      code: dedent`
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_RECEIVE_PROPS",
        },
      ],
    },
    {
      code: dedent`
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
          messageId: "NO_UNSAFE_COMPONENT_WILL_RECEIVE_PROPS",
        },
      ],
    },
  ],
});
