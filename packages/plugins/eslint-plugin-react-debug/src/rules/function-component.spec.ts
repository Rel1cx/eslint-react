import dedent from "dedent";

import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./function-component";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
        function App() {
            return <div>foo</div>
        }

        App.displayName = "TestDisplayName"
      `,
      errors: [{
        data: {
          name: "App",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: "const App = () => <div>foo</div>",
      errors: [{
        data: {
          name: "App",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: "const App = React.memo(() => <div>foo</div>)",
      errors: [{
        data: {
          name: "App",
          forwardRef: false,
          hookCalls: 0,
          memo: true,
        },
        messageId: "FUNCTION_COMPONENT",
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
        data: {
          name: "App",
          forwardRef: false,
          hookCalls: 0,
          memo: true,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: dedent`
        const App = React.memo(function App() {
            const [state, setState] = useState(0);

            return <div>foo</div>
        })

        const displayName = "TestDisplayName"
      `,
      errors: [{
        data: {
          name: "App",
          forwardRef: false,
          hookCalls: 1,
          memo: true,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: "const App = React.forwardRef(() => <div>foo</div>)",
      errors: [{
        data: {
          name: "App",
          forwardRef: true,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: dedent`
        import { memo } from "react";

        const MemoComponent = memo(() => <div></div>)
      `,
      errors: [{
        data: {
          name: "MemoComponent",
          forwardRef: false,
          hookCalls: 0,
          memo: true,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: "const ForwardRefComponent = React.forwardRef(() => <div></div>)",
      errors: [{
        data: {
          name: "ForwardRefComponent",
          forwardRef: true,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: dedent`
        import { memo, forwardRef } from "react";

        const MemoForwardRefComponent = memo(forwardRef(() => <div></div>))
      `,
      errors: [{
        data: {
          name: "MemoForwardRefComponent",
          forwardRef: true,
          hookCalls: 0,
          memo: true,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: "const MemoForwardRefComponent = React.memo(React.forwardRef(() => <div></div>))",
      errors: [{
        data: {
          name: "MemoForwardRefComponent",
          forwardRef: true,
          hookCalls: 0,
          memo: true,
        },
        messageId: "FUNCTION_COMPONENT",
      }],
    },
    {
      code: "const App = () => React.createElement('div', null, 'foo')",
      errors: [{
        data: {
          name: "App",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedVariableComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedVariableComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "anonymous",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "anonymous",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedVariableComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedVariableComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
        data: {
          name: "ParentComponent",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
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
        data: {
          name: "ParentComponent",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
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
        data: {
          name: "UnstableNestedFunctionComponent",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
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
        data: {
          name: "UnstableNestedClassComponent",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
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
        data: {
          name: "UnstableNestedVariableComponent",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
        messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "UnstableNestedClassComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "NestedUnstableFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "NestedUnstableFunctionComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ComponentWithProps",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ComponentWithProps",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "SomeFooter",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ComponentWithProps",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ComponentWithProps",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ComponentForProps",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ComponentForProps",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "Header",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "List",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "List",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "anonymous",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
          messageId: "FUNCTION_COMPONENT",
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
          data: {
            name: "ParentComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
          messageId: "FUNCTION_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedComponent",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
          messageId: "FUNCTION_COMPONENT",
        },
      ],
    },
  ],
  valid: [
    ...allFunctions,
    dedent`
      export const DeleteRangeUndoMutationFactory = (
          accessor: IAccessor,
          params: IDeleteRangeMutationParams
      ): Nullable<IInsertRangeMutationParams> => {
          const univerInstanceService = accessor.get(IUniverInstanceService);
          const target = getSheetMutationTarget(univerInstanceService, params);
          if (!target) return null;

          const { worksheet } = target;
          const cellMatrix = worksheet.getCellMatrix();
          const undoData = new ObjectMatrix<ICellData>();
          const lastEndRow = worksheet.getConfig().rowCount;
          const lastEndColumn = worksheet.getConfig().columnCount;

          const { startRow, endRow, startColumn, endColumn } = params.range;
          if (params.shiftDimension === Dimension.ROWS) {
              // build new data
              for (let r = startRow; r <= lastEndRow; r++) {
                  for (let c = startColumn; c <= endColumn; c++) {
                      // store old value
                      if (r <= endRow) {
                          const cell: Nullable<ICellData> = cellMatrix.getValue(r, c);
                          undoData.setValue(r, c, cell as ICellData);
                      }
                  }
              }
          } else if (params.shiftDimension === Dimension.COLUMNS) {
              // build new data
              for (let r = startRow; r <= endRow; r++) {
                  for (let c = startColumn; c <= lastEndColumn; c++) {
                      // store old value
                      if (c <= endColumn) {
                          const cell: Nullable<ICellData> = cellMatrix.getValue(r, c);
                          undoData.setValue(r, c, cell as ICellData);
                      } else {
                          for (let i = 0; i <= endColumn; i++) {
                              const cell: Nullable<ICellData> = cellMatrix.getValue(r, c);
                              undoData.setValue(r, c + i, cell as ICellData);
                          }
                      }
                  }
              }
          }

          return {
              ...Tools.deepClone(params),
              cellValue: undoData.getData(),
          };
      };
    `,
  ],
});
