import dedent from "dedent";

import { allFunctions, defaultParserOptions, RuleTester } from "../../../../test";
import rule, { RULE_NAME } from "./function-component";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: defaultParserOptions,
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

        App.displayName = "TestDisplayName"
      `,
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "App",
          memo: false,
          forwardRef: false,
        },
      }],
    },
    {
      code: "const App = () => <div>foo</div>",
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "App",
          memo: false,
          forwardRef: false,
        },
      }],
    },
    {
      code: "const App = React.memo(() => <div>foo</div>)",
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "App",
          memo: true,
          forwardRef: false,
        },
      }],
    },
    {
      code: dedent`
        const App = React.memo(function App() {
            return <div>foo</div>
        })

        App.displayName = \`\${"TestDisplayName"}\`
      `,
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "App",
          memo: true,
          forwardRef: false,
        },
      }],
    },
    {
      code: dedent`
        const App = React.memo(function App() {
            return <div>foo</div>
        })

        const displayName = "TestDisplayName"
      `,
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "App",
          memo: true,
          forwardRef: false,
        },
      }],
    },
    {
      code: "const App = React.forwardRef(() => <div>foo</div>)",
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "App",
          memo: false,
          forwardRef: true,
        },
      }],
    },
    {
      code: dedent`
        import { memo } from "react";

        const MemoComponent = memo(() => <div></div>)
      `,
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "MemoComponent",
          memo: true,
          forwardRef: false,
        },
      }],
    },
    {
      code: "const ForwardRefComponent = React.forwardRef(() => <div></div>)",
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "ForwardRefComponent",
          memo: false,
          forwardRef: true,
        },
      }],
    },
    {
      code: dedent`
        import { memo, forwardRef } from "react";

        const MemoForwardRefComponent = memo(forwardRef(() => <div></div>))
      `,
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "MemoForwardRefComponent",
          memo: true,
          forwardRef: true,
        },
      }],
    },
    {
      code: "const MemoForwardRefComponent = React.memo(React.forwardRef(() => <div></div>))",
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "MemoForwardRefComponent",
          memo: true,
          forwardRef: true,
        },
      }],
    },
    {
      code: "const App = () => React.createElement('div', null, 'foo')",
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "App",
          memo: false,
          forwardRef: false,
        },
      }],
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedVariableComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedVariableComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedVariableComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedVariableComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "ParentComponent",
          memo: false,
          forwardRef: false,
        },
      }],
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
      errors: [{
        messageId: "FUNCTION_COMPONENT",
        data: {
          name: "ParentComponent",
          memo: false,
          forwardRef: false,
        },
      }],
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
        data: {
          name: "UnstableNestedFunctionComponent",
          memo: false,
          forwardRef: false,
        },
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
        data: {
          name: "UnstableNestedClassComponent",
          memo: false,
          forwardRef: false,
        },
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
        data: {
          name: "UnstableNestedVariableComponent",
          memo: false,
          forwardRef: false,
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedClassComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "NestedUnstableFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "NestedUnstableFunctionComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ComponentWithProps",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ComponentWithProps",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ComponentWithProps",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ComponentWithProps",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedComponent",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ComponentForProps",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ComponentForProps",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "List",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "List",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "anonymous",
            memo: false,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedComponent",
            memo: true,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedComponent",
            memo: true,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedComponent",
            memo: true,
            forwardRef: false,
          },
        },
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
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "ParentComponent",
            memo: false,
            forwardRef: false,
          },
        },
        {
          messageId: "FUNCTION_COMPONENT",
          data: {
            name: "UnstableNestedComponent",
            memo: true,
            forwardRef: false,
          },
        },
      ],
    },
  ],
});
