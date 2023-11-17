import { allFunctions } from "@eslint-react/shared";
import dedent from "dedent";

import RuleTester, { getFixturesRootDir } from "../../../../test/rule-tester";
import rule, { RULE_NAME } from "./function-component";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: rootDir,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    ...allFunctions,
  ],
  invalid: [
    {
      code: dedent`
        function App() {
            return <div>foo</div>
        }

        App.displayName = "TestDisplayName";
      `,
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App", displayName: "TestDisplayName" } }],
    },
    {
      code: "const App = () => <div>foo</div>",
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App", displayName: "none" } }],
    },
    {
      code: "const App = React.memo(() => <div>foo</div>)",
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } }],
    },
    {
      code: dedent`
        const App = React.memo(function App() {
            return <div>foo</div>
        })

        App.displayName = \`\${"TestDisplayName"}\`;
      `,
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App", displayName: "TestDisplayName" } }],
    },
    {
      code: dedent`
        const App = React.memo(function App() {
            return <div>foo</div>
        })

        const displayName = "TestDisplayName";

        App.displayName = displayName;
      `,
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App", displayName: "TestDisplayName" } }],
    },
    {
      code: "const App = React.forwardRef(() => <div>foo</div>)",
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } }],
    },
    {
      code: "const App = () => React.createElement('div', null, 'foo')",
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "App", displayName: "none" } }],
    },
    {
      code: dedent`
        function ParentComponent() {
          function UnstableNestedFunctionComponent() {
            return <div />;
          }

          return (
            <div>
              <UnstableNestedFunctionComponent />
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          function UnstableNestedFunctionComponent() {
            return React.createElement("div", null);
          }

          return React.createElement(
            "div",
            null,
            React.createElement(UnstableNestedFunctionComponent, null)
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const UnstableNestedVariableComponent = () => {
            return <div />;
          }

          return (
            <div>
              <UnstableNestedVariableComponent />
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedVariableComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const UnstableNestedVariableComponent = () => {
            return React.createElement("div", null);
          }

          return React.createElement(
            "div",
            null,
            React.createElement(UnstableNestedVariableComponent, null)
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedVariableComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        const ParentComponent = () => {
          function UnstableNestedFunctionComponent() {
            return <div />;
          }

          return (
            <div>
              <UnstableNestedFunctionComponent />
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        const ParentComponent = () => {
          function UnstableNestedFunctionComponent() {
            return React.createElement("div", null);
          }

          return React.createElement(
            "div",
            null,
            React.createElement(UnstableNestedFunctionComponent, null)
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        export default () => {
          function UnstableNestedFunctionComponent() {
            return <div />;
          }

          return (
            <div>
              <UnstableNestedFunctionComponent />
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        export default () => {
          function UnstableNestedFunctionComponent() {
            return React.createElement("div", null);
          }

          return React.createElement(
            "div",
            null,
            React.createElement(UnstableNestedFunctionComponent, null)
          );
        };
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        const ParentComponent = () => {
          const UnstableNestedVariableComponent = () => {
            return <div />;
          }

          return (
            <div>
              <UnstableNestedVariableComponent />
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedVariableComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        const ParentComponent = () => {
          const UnstableNestedVariableComponent = () => {
            return React.createElement("div", null);
          }

          return React.createElement(
            "div",
            null,
            React.createElement(UnstableNestedVariableComponent, null)
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedVariableComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
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
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } }],
    },
    {
      code: dedent`
        function ParentComponent() {
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
      `,
      errors: [{ messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } }],
    },
    {
      code: dedent`
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
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: { name: "UnstableNestedFunctionComponent", displayName: "none" },
      }],
    },
    {
      code: dedent`
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
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: { name: "UnstableNestedClassComponent", displayName: "none" },
      }],
    },
    {
      code: dedent`
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
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: { name: "UnstableNestedVariableComponent", displayName: "none" },
      }],
    },
    {
      code: `
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
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedClassComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          function getComponent() {
            function NestedUnstableFunctionComponent() {
              return <div />;
            };

            return <NestedUnstableFunctionComponent />;
          }

          return (
            <div>
              {getComponent()}
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "NestedUnstableFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          function getComponent() {
            function NestedUnstableFunctionComponent() {
              return React.createElement("div", null);
            }

            return React.createElement(NestedUnstableFunctionComponent, null);
          }

          return React.createElement("div", null, getComponent());
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "NestedUnstableFunctionComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ComponentWithProps(props) {
          return <div />;
        }

        function ParentComponent() {
          return (
            <ComponentWithProps
              footer={
                function SomeFooter() {
                  return <div />;
                }
              } />
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ComponentWithProps", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "SomeFooter", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ComponentWithProps(props) {
          return React.createElement("div", null);
        }

        function ParentComponent() {
          return React.createElement(ComponentWithProps, {
            footer: function SomeFooter() {
              return React.createElement("div", null);
            }
          });
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ComponentWithProps", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "SomeFooter", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ComponentWithProps(props) {
          return <div />;
        }

        function ParentComponent() {
            return (
              <ComponentWithProps footer={() => <div />} />
            );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ComponentWithProps", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ComponentWithProps(props) {
          return React.createElement("div", null);
        }

        function ParentComponent() {
          return React.createElement(ComponentWithProps, {
            footer: () => React.createElement("div", null)
          });
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ComponentWithProps", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function RenderPropComponent(props) {
          return props.render({});
        }

        function ParentComponent() {
          return React.createElement(
            RenderPropComponent,
            null,
            () => {
              function UnstableNestedComponent() {
                return React.createElement("div", null);
              }

              return React.createElement(
                "div",
                null,
                React.createElement(UnstableNestedComponent, null)
              );
            }
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "UnstableNestedComponent", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ComponentForProps(props) {
          return <div />;
        }

        function ParentComponent() {
          return (
            <ComponentForProps notPrefixedWithRender={() => <div />} />
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ComponentForProps", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ComponentForProps(props) {
          return React.createElement("div", null);
        }

        function ParentComponent() {
          return React.createElement(ComponentForProps, {
            notPrefixedWithRender: () => React.createElement("div", null)
          });
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ComponentForProps", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          return (
            <ComponentForProps someMap={{ Header: () => <div /> }} />
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
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
        { messageId: "FUNCTION_COMPONENT", data: { name: "List", displayName: "none" } },
      ],
    },
    {
      code: dedent`
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
        { messageId: "FUNCTION_COMPONENT", data: { name: "List", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          return (
            <SomeComponent>
              {
                thing.match({
                  loading: () => <div />,
                  success: () => <div />,
                  failure: () => <div />,
                })
              }
            </SomeComponent>
          )
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const thingElement = thing.match({
            loading: () => <div />,
            success: () => <div />,
            failure: () => <div />,
          });
          return (
            <SomeComponent>
              {thingElement}
            </SomeComponent>
          )
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const rows = [
            {
              name: 'A',
              notPrefixedWithRender: (props) => <Row {...props} />
            },
          ];

          return <Table rows={rows} />;
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const UnstableNestedComponent = React.memo(() => {
            return <div />;
          });

          return (
            <div>
              <UnstableNestedComponent />
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const UnstableNestedComponent = React.memo(
            () => React.createElement("div", null),
          );

          return React.createElement(
            "div",
            null,
            React.createElement(UnstableNestedComponent, null)
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const UnstableNestedComponent = React.memo(
            function () {
              return <div />;
            }
          );

          return (
            <div>
              <UnstableNestedComponent />
            </div>
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
    {
      code: dedent`
        function ParentComponent() {
          const UnstableNestedComponent = React.memo(
            function () {
              return React.createElement("div", null);
            }
          );

          return React.createElement(
            "div",
            null,
            React.createElement(UnstableNestedComponent, null)
          );
        }
      `,
      errors: [
        { messageId: "FUNCTION_COMPONENT", data: { name: "ParentComponent", displayName: "none" } },
        { messageId: "FUNCTION_COMPONENT", data: { name: "anonymous", displayName: "none" } },
      ],
    },
  ],
});
