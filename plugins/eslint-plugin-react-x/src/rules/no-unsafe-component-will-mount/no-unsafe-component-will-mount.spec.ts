import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-unsafe-component-will-mount";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "UNSAFE_componentWillMount in React.Component class",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          UNSAFE_componentWillMount() {}

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
      name: "UNSAFE_componentWillMount in React.PureComponent class",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          UNSAFE_componentWillMount() {}

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
      name: "UNSAFE_componentWillMount in Component class with named import",
      code: tsx`
        import { Component } from "react";

        class Foo extends Component {

          UNSAFE_componentWillMount() {}

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
      name: "UNSAFE_componentWillMount in PureComponent class with named import",
      code: tsx`
        import { PureComponent } from "react";

        class Foo extends PureComponent {

          UNSAFE_componentWillMount() {}

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
      name: "componentWillMount in React.Component class",
      code: tsx`
        import React from "react";

        class Foo extends React.Component {

          componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillMount in React.PureComponent class",
      code: tsx`
        import React from "react";

        class Foo extends React.PureComponent {

          componentWillMount() {}

          render() {
            return <div />;
          }
        }
      `,
    },
    {
      name: "componentWillMount in non-React class",
      code: tsx`
        class Foo extends Bar {
          componentWillMount() {}
        }
      `,
    },
  ],
});
