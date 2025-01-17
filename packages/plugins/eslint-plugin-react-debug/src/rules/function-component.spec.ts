import { allFunctions, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./function-component";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function App({ foo }) {
            return <div>foo</div>
        }

        App.displayName = "TestDisplayName"
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "App",
          displayName: `"TestDisplayName"`,
          forwardRef: false,
          hookCalls: 0,
          memo: false,
          props: ["foo"],
        },
      }],
    },
    {
      code: /* tsx */ `
        interface Props {
          foo: string;
        }
        const App = (props: Props) => <div>foo</div>
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "App",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
          props: ["foo"],
        },
      }],
    },
    {
      code: /* tsx */ `
        const App = React.memo(() => <div>foo</div>)
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "App",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: true,
        },
      }],
    },
    {
      code: /* tsx */ `
        const App = React.memo(function App() {
            return <div>foo</div>
        })

        App.displayName = \`\${"TestDisplayName"}\`
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "App",
          displayName: '`${"TestDisplayName"}`',
          forwardRef: false,
          hookCalls: 0,
          memo: true,
        },
      }],
    },
    {
      code: /* tsx */ `
        const App = React.memo(function App() {
            const [state, setState] = useState(0);

            return <div>foo</div>
        })

        const displayName = "TestDisplayName"
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "App",
          displayName: "none",
          forwardRef: false,
          hookCalls: 1,
          memo: true,
        },
      }],
    },
    {
      code: /* tsx */ `
        const App = React.forwardRef(() => <div>foo</div>)
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "App",
          displayName: "none",
          forwardRef: true,
          hookCalls: 0,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
        import { memo } from "react";

        const MemoComponent = memo(() => <div></div>)
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "MemoComponent",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: true,
        },
      }],
    },
    {
      code: /* tsx */ `
        import { memo } from "react";

        const MemoComponent = memo(function Component() {
          if (1 > 0) return;
          return <div></div>;
        })
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "Component",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: true,
        },
      }],
    },
    {
      code: /* tsx */ `
        const ForwardRefComponent = React.forwardRef(() => <div></div>)
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "ForwardRefComponent",
          displayName: "none",
          forwardRef: true,
          hookCalls: 0,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
        import { memo, forwardRef } from "react";

        const MemoForwardRefComponent = memo(forwardRef(() => <div></div>))
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "MemoForwardRefComponent",
          displayName: "none",
          forwardRef: true,
          hookCalls: 0,
          memo: true,
        },
      }],
    },
    {
      code: /* tsx */ `
        const MemoForwardRefComponent = React.memo(React.forwardRef(() => <div></div>))
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "MemoForwardRefComponent",
          displayName: "none",
          forwardRef: true,
          hookCalls: 0,
          memo: true,
        },
      }],
    },
    {
      code: /* tsx */ `
        function ComponentWithHooks() {
          const [state, setState] = useState(0);

          return <div></div>;
        }
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "ComponentWithHooks",
          displayName: "none",
          forwardRef: false,
          hookCalls: 1,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
        const App = () => React.createElement('div', null, 'foo')
      `,
      errors: [{
        messageId: "functionComponent",
        data: {
          name: "App",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedVariableComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedVariableComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "anonymous",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "anonymous",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedVariableComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedVariableComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
        messageId: "functionComponent",
        data: {
          name: "ParentComponent",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
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
        messageId: "functionComponent",
        data: {
          name: "ParentComponent",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
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
        messageId: "functionComponent",
        data: {
          name: "UnstableNestedFunctionComponent",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
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
        messageId: "functionComponent",
        data: {
          name: "UnstableNestedClassComponent",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
        },
      }],
    },
    {
      code: /* tsx */ `
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
        messageId: "functionComponent",
        data: {
          name: "UnstableNestedVariableComponent",
          displayName: "none",
          forwardRef: false,
          hookCalls: 0,
          memo: false,
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
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedClassComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "NestedUnstableFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "NestedUnstableFunctionComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ComponentWithProps",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ComponentWithProps",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "SomeFooter",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ComponentWithProps",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ComponentWithProps",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ComponentForProps",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ComponentForProps",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        function ParentComponent() {
          return (
            <ComponentForProps someMap={{ Header: () => <div /> }} />
          );
        }
      `,
      errors: [
        {
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "Header",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "List",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "List",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "functionComponent",
          data: {
            name: "ParentComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "UnstableNestedComponent",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: true,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        const MyComponent1 = (() => null)!;
        const MyComponent2 = (() => null)!!;
        const MyComponent3 = (() => null)!!! as A;
        const MyComponent4 = (() => null)!!! satisfies A;
        const MyComponent5 = (() => null)!!! as A satisfies B;
      `,
      errors: [
        {
          messageId: "functionComponent",
          data: {
            name: "MyComponent1",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "MyComponent2",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "MyComponent3",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "MyComponent4",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
        {
          messageId: "functionComponent",
          data: {
            name: "MyComponent5",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
    {
      code: /* tsx */ `
        function App() {
          return createElement("div", null, <div></div>);
        }
      `,
      errors: [
        {
          messageId: "functionComponent",
          data: {
            name: "App",
            displayName: "none",
            forwardRef: false,
            hookCalls: 0,
            memo: false,
          },
        },
      ],
    },
  ],
  valid: [
    ...allFunctions,
    "const results = data.flatMap((x) => x?.name || []) || []",
    "const results = allSettled.map((x) => (x.status === 'fulfilled' ? <div /> : null))",
    "const results = allSettled.map((x) => (x.status === 'fulfilled' ? format(x.value) : null))",
    "const results = allSettled.mapLike((x) => (x.status === 'fulfilled' ? format(x.value) : null))",
    /* tsx */ `
      export const action = (() => {
        return null;
      });
    `,
    /* tsx */ `
      export const action = (() => {
        return null;
      }) as ActionFUnction;
    `,
    /* tsx */ `
      export const action = (() => {
        return null;
      }) satisfies ActionFUnction;
    `,
    /* tsx */ `
      export const action = (() => {
        return null;
      }) as ActionFUnction satisfies ActionFUnction;
    `,
  ],
});
