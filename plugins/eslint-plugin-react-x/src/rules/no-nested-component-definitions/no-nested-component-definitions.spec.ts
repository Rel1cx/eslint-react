import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-nested-component-definitions";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        // 🔴 Component defined inside component
        function Parent() {
          const ChildComponent = () => { // New component every render!
            const [count, setCount] = useState(0);
            return <button onClick={() => setCount(count + 1)}>{count}</button>;
          };

          return <ChildComponent />; // State resets every render
        }
      `,
      errors: [
        {
          data: {
            name: "ChildComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        // 🔴 Dynamic component creation
        function Parent({type}) {
          const Component = type === 'button'
            ? () => <button>Click</button>
            : () => <div>Text</div>;

          return <Component />;
        }
      `,
      errors: [
        {
          data: {
            name: "Component",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
        {
          data: {
            name: "Component",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
      errors: [{
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
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
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
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
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
      errors: [{
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
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
          data: {
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
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
          data: {
            name: "UnstableNestedClassComponent",
            suggestion: "Move it to the top level.",
          },
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
      errors: [{
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
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
      errors: [{
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
        function ParentComponent() {
          const ChildComponent = class extends React.Component {
            render() {
              return <div />;
            }
          };
          return <ChildComponent />;
        }
      `,
      errors: [{
        data: {
          name: "ChildComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
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
            name: "NestedUnstableFunctionComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "NestedUnstableFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
      errors: [{
        data: {
          name: "List",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
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
      errors: [{
        data: {
          name: "List",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
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
      errors: [{
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
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
      errors: [{
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
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
      errors: [{
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
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
      errors: [{
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
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
            name: "SomeFooter",
            suggestion: "Move it to the top level or pass it as a prop.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          return (
            <SomeComponent components={{ Header: () => <div /> }} />
          )
        }
      `,
      errors: [{
        data: {
          name: "Header",
          suggestion: "Move it to the top level or pass it as a prop.",
        },
        messageId: "default",
      }],
    },
    {
      code: tsx`
        function ParentComponent() {
          return (
            <ComponentForProps someMap={{ Header: () => <div /> }} />
          );
        }
      `,
      errors: [
        {
          data: {
            name: "Header",
            suggestion: "Move it to the top level or pass it as a prop.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
            name: "UnstableNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      // https://github.com/Rel1cx/eslint-react/issues/1927
      code: tsx`
        export const Parent = () => {
          const A = () => <div>a</div>;
          const B = memo(() => <div>b</div>);
          const C = useCallback(() => <div>c</div>, []);
          return <Consumer render={{ A, B, C }} />;
        };
      `,
      errors: [
        {
          data: {
            name: "A",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
        {
          data: {
            name: "B",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
        {
          data: {
            name: "C",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const MemoizedNestedComponent = React.useCallback(() => <div />, []);

          return <MemoizedNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "MemoizedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const MemoizedNestedComponent = useCallback(memo(() => <div />), []);

          return <MemoizedNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "MemoizedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const MemoizedNestedComponent = memo(React.useCallback(() => <div />, []));

          return <MemoizedNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "MemoizedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const ObservedNestedComponent = observer(() => <div />);

          return <ObservedNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "ObservedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const ConnectedNestedComponent = connect(null, { increment })((props) => <div />);

          return <ConnectedNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "ConnectedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const RoutedNestedComponent = withRouter((props) => <div />);

          return <RoutedNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "RoutedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const FormNestedComponent = withFormik({ mapPropsToValues: () => ({}) })((props) => <div />);

          return <FormNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "FormNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const FragmentNestedComponent = createFragmentContainer((props) => <div />);

          return <FragmentNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "FragmentNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      // Custom HOCs following the `with*` naming convention are also component wrappers
      code: tsx`
        function ParentComponent() {
          const AuthedNestedComponent = withAuth((props) => <div />);

          return <AuthedNestedComponent />;
        }
      `,
      errors: [
        {
          data: {
            name: "AuthedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function ParentComponent() {
          const CustomOption = useCallback(() => <div />, []);

          return <Select components={{ Option: CustomOption }} />;
        }
      `,
      errors: [
        {
          data: {
            name: "CustomOption",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            const MemoizedNestedComponent = useCallback(() => <div />, []);

            return <MemoizedNestedComponent />;
          }
        }
      `,
      errors: [
        {
          data: {
            name: "MemoizedNestedComponent",
            suggestion: "Move it to the top level.",
          },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    tsx`
      function ParentComponent() {
        return (
          <div>
            <OutsideDefinedFunctionComponent />
          </div>
        );
      }
    `,
    tsx`
      function ParentComponent() {
        return React.createElement(
          "div",
          null,
          React.createElement(OutsideDefinedFunctionComponent, null)
        );
      }
    `,
    tsx`
      function ParentComponent() {
        return (
          <SomeComponent
            footer={<OutsideDefinedComponent />}
            header={<div />}
            />
        );
      }
    `,
    tsx`
      function ParentComponent() {
        return React.createElement(SomeComponent, {
          footer: React.createElement(OutsideDefinedComponent, null),
          header: React.createElement("div", null)
        });
      }
    `,
    tsx`
      function ParentComponent(props) {
        return (
          <ul>
            {props.items.map(item => (
              <li key={item.id}>
                {item.name}
              </li>
            ))}
          </ul>
        );
      }
    `,
    tsx`
      function ParentComponent(props) {
        return React.createElement(
          "ul",
          null,
          props.items.map(() =>
            React.createElement(
              "li",
              { key: item.id },
              item.name
            )
          )
        )
      }
    `,
    tsx`
      function ParentComponent(props) {
        return (
          <ul>
            {props.items.map(function Item(item) {
              return (
                <li key={item.id}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        );
      }
    `,
    tsx`
      function ParentComponent(props) {
        return React.createElement(
          "ul",
          null,
          props.items.map(function Item() {
            return React.createElement(
              "li",
              { key: item.id },
              item.name
            );
          })
        );
      }
    `,
    tsx`
      function ParentComponent(props) {
        return (
          <List items={props.items.map(item => {
            return (
              <li key={item.id}>
                {item.name}
              </li>
            );
          })}
          />
        );
      }
    `,
    tsx`
      function ParentComponent(props) {
        // Should not interfere handler declarations
        function onClick(event) {
          props.onClick(event.target.value);
        }

        const onKeyPress = () => null;

        function getOnHover() {
          return function onHover(event) {
            props.onHover(event.target);
          }
        }

        return (
          <div>
            <button
              onClick={onClick}
              onKeyPress={onKeyPress}
              onHover={getOnHover()}

              // These should not be considered as components
              maybeComponentOrHandlerNull={() => null}
              maybeComponentOrHandlerUndefined={() => undefined}
              maybeComponentOrHandlerBlank={() => ''}
              maybeComponentOrHandlerString={() => 'hello-world'}
              maybeComponentOrHandlerNumber={() => 42}
              maybeComponentOrHandlerArray={() => []}
              maybeComponentOrHandlerObject={() => {}} />
          </div>
        );
      }
    `,
    tsx`
      function ParentComponent() {
        function getComponent() {
          return <div />;
        }

        return (
          <div>
            {getComponent()}
          </div>
        );
      }
    `,
    tsx`
      function ParentComponent() {
        function getComponent() {
          return React.createElement("div", null);
        }

        return React.createElement("div", null, getComponent());
      }
    `,
    tsx`
      function createTestComponent(props) {
        return (
          <div />
        );
      }
    `,
    tsx`
      function createTestComponent(props) {
        return React.createElement("div", null);
      }
    `,
    tsx`
      function ParentComponent() {
        return (
          <ComponentForProps renderFooter={() => <div />} />
        );
      }
    `,
    tsx`
      function ParentComponent() {
        return React.createElement(ComponentForProps, {
          renderFooter: () => React.createElement("div", null)
        });
      }
    `,
    tsx`
      function ParentComponent() {
        return (
          <SomeComponent>
            {
              thing.match({
                renderLoading: () => <div />,
                renderSuccess: () => <div />,
                renderFailure: () => <div />,
              })
            }
          </SomeComponent>
        )
      }
    `,
    tsx`
      function ParentComponent() {
        const thingElement = thing.match({
          renderLoading: () => <div />,
          renderSuccess: () => <div />,
          renderFailure: () => <div />,
        });
        return (
          <SomeComponent>
            {thingElement}
          </SomeComponent>
        )
      }
    `,
    tsx`
      function ParentComponent() {
        return (
          <ComplexRenderPropComponent
            listRenderer={data.map((items, index) => (
              <ul>
                {items[index].map((item) =>
                  <li>
                    {item}
                  </li>
                )}
              </ul>
            ))
            }
          />
        );
      }
    `,
    tsx`
      function ParentComponent() {
        return React.createElement(
            RenderPropComponent,
            null,
            () => React.createElement("div", null)
        );
      }
    `,
    tsx`
      function ParentComponent() {
        return (
          <SomeComponent renderMenu={() => (
            <RenderPropComponent>
              {items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </RenderPropComponent>
          )} />
        )
      }
    `,
    tsx`
      const ParentComponent = () => (
        <SomeComponent
          components={[
            <ul>
              {list.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>,
          ]}
        />
      );
    `,
    tsx`
      function ParentComponent() {
        const rows = [
          {
            name: 'A',
            render: (props) => <Row {...props} />
          },
        ];

        return <Table rows={rows} />;
      }
    `,
    tsx`
      function ParentComponent() {
        return <SomeComponent renderers={{ notComponent: () => null }} />;
      }
    `,
    tsx`
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
    tsx`
      function ComponentWithProps(props) {
        return <div />;
      }

      function ParentComponent() {
          return (
            <ComponentWithProps footer={() => <div />} />
          );
      }
    `,
    tsx`
      function ComponentForProps(props) {
        return <div />;
      }

      function ParentComponent() {
        return (
          <ComponentForProps notPrefixedWithRender={() => <div />} />
        );
      }
    `,
    tsx`
      function ParentComponent() {
        useEffect(() => {
          return () => null;
        });

        return <div />;
      }
    `,
    tsx`
      function ParentComponent() {
        const _renderHeader = () => <div />;
        return <div>{_renderHeader()}</div>;
      }
    `,
    tsx`
      const testCases = {
        basic: {
          render() {
            const Component = () => <div />;
            return <div />;
          }
        }
      }
    `,
    tsx`
      const ParentComponent = createReactClass({
        displayName: "ParentComponent",
        statics: {
          getSnapshotBeforeUpdate: function () {
            return null;
          },
        },
        render() {
          return <div />;
        },
      });
    `,
    tsx`
      /** @public */
      export class ErrorBoundary extends React.Component<
      	React.PropsWithRef<React.PropsWithChildren<TLErrorBoundaryProps>>,
      	{ error: Error | null }
      > {
      	static getDerivedStateFromError(error: Error) {
      		return { error }
      	}

      	override state = initialState

      	override componentDidCatch(error: unknown) {
      		this.props.onError?.(error)
      	}

      	override render() {
      		const { error } = this.state

      		if (error !== null) {
      			const { fallback: Fallback } = this.props
      			return <Fallback error={error} />
      		}

      		return this.props.children
      	}
      }
    `,
    // Component defined at the top level and wrapped in useCallback is fine
    // NOTE: This case calls `useCallback` at the top level, which violates the Rules of Hooks in real code; it is used as a test fixture only
    tsx`
      const MemoizedComponent = useCallback(() => <div />, []);

      function ParentComponent() {
        return <MemoizedComponent />;
      }
    `,
    // Lowercase names are not treated as components
    tsx`
      function ParentComponent() {
        const renderItem = useCallback(() => <div />, []);
        return <List renderItem={renderItem} />;
      }
    `,
    // Event handlers wrapped in useCallback are not components
    tsx`
      function ParentComponent() {
        const handleClick = useCallback(() => {
          console.log("click");
        }, []);
        return <button onClick={handleClick} />;
      }
    `,
    // List rendering patterns: array method callbacks are not component definitions
    tsx`
      function ParentComponent({ items }) {
        const List = items.map((item) => <li key={item.id} />);
        return <ul>{List}</ul>;
      }
    `,
    // Only well-known wrappers and `with*` HOCs are unwrapped for name resolution;
    // arbitrary factory calls are not
    tsx`
      function ParentComponent() {
        const Wrapped = register(() => <div />);
        return <Wrapped />;
      }
    `,
    // Loaders passed to `lazy`/`dynamic` are not render functions and are covered by
    // no-nested-lazy-component-declarations instead
    tsx`
      function ParentComponent() {
        const LazyComponent = lazy(() => import("./Foo"));
        return <LazyComponent />;
      }
    `,
    tsx`
      function ParentComponent({ items }) {
        const List = items.flatMap((item) => [<li key={item.id} />]);
        return <ul>{List}</ul>;
      }
    `,
    tsx`
      function ParentComponent({ items }) {
        const List = items.filter((item) => item.visible).map((item) => <li key={item.id} />);
        return <ul>{List}</ul>;
      }
    `,
    // Member calls on data objects are not component wrappers, so their callbacks are never
    // mistaken for wrapped components even when assigned to an uppercase variable
    tsx`
      function ParentComponent({ items }) {
        const List = Array.from(items, (item) => <li key={item.id} />);
        return <ul>{List}</ul>;
      }
    `,
    tsx`
      function ParentComponent({ items }) {
        const List = items.forEach((item) => <li key={item.id} />);
        return <ul>{List}</ul>;
      }
    `,
    tsx`
      function ParentComponent({ items }) {
        const List = items.reduce((acc, item) => <li key={item.id} />, null);
        return <ul>{List}</ul>;
      }
    `,
    tsx`
      function ParentComponent({ items }) {
        const List = items.filter((item) => <li key={item.id} />);
        return <ul>{List}</ul>;
      }
    `,
  ],
});
