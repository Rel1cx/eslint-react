import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import { stringify } from "../../utils";
import rule, { RULE_NAME } from "./class-component";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        const ClassComponent = class extends React.Component {
            render() {
                return <div />;
            }
         };
      `,
      errors: [
        {
          data: { json: stringify({ name: "ClassComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          class UnstableNestedClassComponent extends React.Component {
            render() {
              return <div />;
            }
          };

          return (
            <div>
              <UnstableNestedClassComponent />
            </div>
          );
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "UnstableNestedClassComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            class UnstableNestedClassComponent extends React.Component {
              render() {
                return <div />;
              }
            };

            return (
              <div>
                <UnstableNestedClassComponent />
              </div>
            );
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
        {
          data: { json: stringify({ name: "UnstableNestedClassComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            class UnstableNestedClassComponent extends React.Component {
              render() {
                return React.createElement("div", null);
              }
            }

            return React.createElement(
              "div",
              null,
              React.createElement(UnstableNestedClassComponent, null)
            );
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
        {
          data: { json: stringify({ name: "UnstableNestedClassComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            function UnstableNestedFunctionComponent() {
              return <div />;
            }

            return (
              <div>
                <UnstableNestedFunctionComponent />
              </div>
            );
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            function UnstableNestedClassComponent() {
              return React.createElement("div", null);
            }

            return React.createElement(
              "div",
              null,
              React.createElement(UnstableNestedClassComponent, null)
            );
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            const UnstableNestedVariableComponent = () => {
              return <div />;
            }

            return (
              <div>
                <UnstableNestedVariableComponent />
              </div>
            );
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            const UnstableNestedClassComponent = () => {
              return React.createElement("div", null);
            }

            return React.createElement(
              "div",
              null,
              React.createElement(UnstableNestedClassComponent, null)
            );
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            const List = () => {
              return <ul>item</ul>;
            };

            return <List {...this.props} />;
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            const List = (props) => {
              const items = props.items
                .map((item) => (
                  <li key={item.key}>
                    <span>{item.name}</span>
                  </li>
                ));

              return <ul>{items}</ul>;
            };

            return <List {...this.props} />;
          }
        }
      `,
      errors: [
        {
          data: { json: stringify({ name: "ParentComponent" }) },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [],
});
