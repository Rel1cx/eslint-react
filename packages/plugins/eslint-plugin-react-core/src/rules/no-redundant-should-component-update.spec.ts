import dedent from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-redundant-should-component-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: `
        class Foo extends React.PureComponent {
          shouldComponentUpdate() {
            return true;
          }
        }
      `,
      errors: [
        {
          data: { componentName: "Foo" },
          messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
        },
      ],
    },
    {
      code: `
        class Foo extends PureComponent {
          shouldComponentUpdate() {
            return true;
          }
        }
      `,
      errors: [
        {
          data: { componentName: "Foo" },
          messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
        },
      ],
    },
    {
      code: `
        class Foo extends React.PureComponent {
          shouldComponentUpdate = () => {
            return true;
          }
        }
      `,
      errors: [
        {
          data: { componentName: "Foo" },
          messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
        },
      ],
    },
    {
      code: `
        function Foo() {
          return class Bar extends React.PureComponent {
            shouldComponentUpdate() {
              return true;
            }
          };
        }
      `,
      errors: [
        {
          data: { componentName: "Bar" },
          messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
        },
      ],
    },
    {
      code: `
        function Foo() {
          return class Bar extends PureComponent {
            shouldComponentUpdate() {
              return true;
            }
          };
        }
      `,
      errors: [
        {
          data: { componentName: "Bar" },
          messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
        },
      ],
    },
    {
      code: `
        var Foo = class extends PureComponent {
          shouldComponentUpdate() {
            return true;
          }
        }
      `,
      errors: [
        {
          data: { componentName: "Foo" },
          messageId: "NO_REDUNDANT_SHOULD_COMPONENT_UPDATE",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    dedent`
      class Foo extends React.Component {
        shouldComponentUpdate() {
          return true;
        }
      }
    `,
    dedent`
      class Foo extends React.Component {
        shouldComponentUpdate = () => {
          return true;
        }
      }
    `,
    dedent`
      function Foo() {
        return class Bar extends React.Component {
          shouldComponentUpdate() {
            return true;
          }
        };
      }
    `,
  ],
});
