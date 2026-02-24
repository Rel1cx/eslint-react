import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-nested-component-definitions";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        // ❌ Component defined inside component
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
          messageId: "default",
          data: {
            name: "ChildComponent",
            suggestion: "Move it to the top level.",
          },
        },
      ],
    },
    {
      code: tsx`
        // ❌ Dynamic component creation
        function Parent({type}) {
          const Component = type === 'button'
            ? () => <button>Click</button>
            : () => <div>Text</div>;

          return <Component />;
        }
      `,
      errors: [
        {
          messageId: "default",
          data: {
            name: "Component",
            suggestion: "Move it to the top level.",
          },
        },
        {
          messageId: "default",
          data: {
            name: "Component",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
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
        messageId: "default",
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
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
        messageId: "default",
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
      }],
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
        messageId: "default",
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
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
        messageId: "default",
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
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
          messageId: "default",
          data: {
            name: "UnstableNestedFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
        messageId: "default",
        data: {
          name: "UnstableNestedClassComponent",
          suggestion: "Move it to the top level.",
        },
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
          messageId: "default",
          data: {
            name: "UnstableNestedVariableComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedClassComponent",
            suggestion: "Move it to the top level.",
          },
        },
      ],
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
          messageId: "default",
          data: {
            name: "NestedUnstableFunctionComponent",
            suggestion: "Move it to the top level.",
          },
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
          messageId: "default",
          data: {
            name: "NestedUnstableFunctionComponent",
            suggestion: "Move it to the top level.",
          },
        },
      ],
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
          messageId: "default",
          data: {
            name: "SomeFooter",
            suggestion: "Move it to the top level or pass it as a prop.",
          },
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
          messageId: "default",
          data: {
            name: "UnstableNestedComponent",
            suggestion: "Move it to the top level.",
          },
        },
      ],
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
          messageId: "default",
          data: {
            name: "Header",
            suggestion: "Move it to the top level or pass it as a prop.",
          },
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
        messageId: "default",
        data: {
          name: "List",
          suggestion: "Move it to the top level.",
        },
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
        messageId: "default",
        data: {
          name: "List",
          suggestion: "Move it to the top level.",
        },
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
        messageId: "default",
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
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
        messageId: "default",
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
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
        messageId: "default",
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
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
        messageId: "default",
        data: {
          name: "UnstableNestedComponent",
          suggestion: "Move it to the top level.",
        },
      }],
    },
    {
      code: tsx`
        function ParentComponent() {
          const MemoizedNestedComponent = React.useCallback(() => <div />, []);

          return (
            <div>
              <MemoizedNestedComponent />
            </div>
          );
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "MemoizedNestedComponent", suggestion: "Move it to the top level." },
      }],
    },
    {
      code: tsx`
        function ParentComponent() {
          const MemoizedNestedComponent = React.useCallback(
            () => React.createElement("div", null),
            []
          );

          return React.createElement(
            "div",
            null,
            React.createElement(MemoizedNestedComponent, null)
          );
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "MemoizedNestedComponent", suggestion: "Move it to the top level." },
      }],
    },
    {
      code: tsx`
        function ParentComponent() {
          const MemoizedNestedFunctionComponent = React.useCallback(
            function () {
              return <div />;
            },
            []
          );

          return (
            <div>
              <MemoizedNestedFunctionComponent />
            </div>
          );
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "MemoizedNestedFunctionComponent", suggestion: "Move it to the top level." },
      }],
    },
    {
      code: tsx`
        function ParentComponent() {
          const MemoizedNestedFunctionComponent = React.useCallback(
            function () {
              return React.createElement("div", null);
            },
            []
          );

          return React.createElement(
            "div",
            null,
            React.createElement(MemoizedNestedFunctionComponent, null)
          );
        }
      `,
      errors: [{
        messageId: "default",
        data: { name: "MemoizedNestedFunctionComponent", suggestion: "Move it to the top level." },
      }],
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
        messageId: "default",
        data: {
          name: "Header",
          suggestion: "Move it to the top level or pass it as a prop.",
        },
      }],
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
        useEffect(() => {
          return () => null;
        });

        return <div />;
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
  ],
});
