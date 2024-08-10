import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-redundant-should-component-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        class Foo extends React.PureComponent {
          shouldComponentUpdate() {
            return true;
          }
        }
      `,
      errors: [
        {
          messageId: "noRedundantShouldComponentUpdate",
          data: { componentName: "Foo" },
        },
      ],
    },
    {
      code: /* tsx */ `
        class Foo extends PureComponent {
          shouldComponentUpdate() {
            return true;
          }
        }
      `,
      errors: [
        {
          messageId: "noRedundantShouldComponentUpdate",
          data: { componentName: "Foo" },
        },
      ],
    },
    {
      code: /* tsx */ `
        class Foo extends React.PureComponent {
          shouldComponentUpdate = () => {
            return true;
          }
        }
      `,
      errors: [
        {
          messageId: "noRedundantShouldComponentUpdate",
          data: { componentName: "Foo" },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noRedundantShouldComponentUpdate",
          data: { componentName: "Bar" },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "noRedundantShouldComponentUpdate",
          data: { componentName: "Bar" },
        },
      ],
    },
    {
      code: /* tsx */ `
        var Foo = class extends PureComponent {
          shouldComponentUpdate() {
            return true;
          }
        }
      `,
      errors: [
        {
          messageId: "noRedundantShouldComponentUpdate",
          data: { componentName: "Foo" },
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      class Foo extends React.Component {
        shouldComponentUpdate() {
          return true;
        }
      }
    `,
    /* tsx */ `
      class Foo extends React.Component {
        shouldComponentUpdate = () => {
          return true;
        }
      }
    `,
    /* tsx */ `
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
