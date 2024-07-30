import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-class-component";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
      errors: [
        {
          data: {
            name: "UnstableNestedClassComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
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
        data: {
          name: "UnstableNestedClassComponent",
        },
        messageId: "NO_CLASS_COMPONENT",
      }],
    },
    {
      code: /* tsx */ `
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
          data: {
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedClassComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          data: {
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
        {
          data: {
            name: "UnstableNestedClassComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
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
      errors: [
        {
          data: {
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
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
      errors: [
        {
          data: {
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
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
      errors: [
        {
          data: {
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
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
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
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
          data: {
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
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
          data: {
            name: "ParentComponent",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
    },
    {
      code: /* tsx */ `
        class ErrorBoundary extends React.Component {
          static componentDidCatch(error, info) {}
        }
      `,
      errors: [
        {
          data: {
            name: "ErrorBoundary",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
    },
    {
      code: /* tsx */ `
        class ErrorBoundary extends React.Component {
          getDerivedStateFromError(error) {}
        }
      `,
      errors: [
        {
          data: {
            name: "ErrorBoundary",
          },
          messageId: "NO_CLASS_COMPONENT",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      function ParentComponent() {
        return (
          <div>
            <OutsideDefinedFunctionComponent />
          </div>
        );
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        return React.createElement(
          "div",
          null,
          React.createElement(OutsideDefinedFunctionComponent, null)
        );
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        return (
          <SomeComponent
            footer={<OutsideDefinedComponent />}
            header={<div />}
            />
        );
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        return React.createElement(SomeComponent, {
          footer: React.createElement(OutsideDefinedComponent, null),
          header: React.createElement("div", null)
        });
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        const MemoizedNestedComponent = React.useCallback(() => <div />, []);

        return (
          <div>
            <MemoizedNestedComponent />
          </div>
        );
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      function ParentComponent() {
        function getComponent() {
          return React.createElement("div", null);
        }

        return React.createElement("div", null, getComponent());
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
      function ParentComponent() {
        return React.createElement(
            RenderPropComponent,
            null,
            () => React.createElement("div", null)
        );
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      function createTestComponent(props) {
        return (
          <div />
        );
      }
    `,
    /* tsx */ `
      function createTestComponent(props) {
        return React.createElement("div", null);
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      function ParentComponent() {
        return (
          <ComponentForProps renderFooter={() => <div />} />
        );
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        return React.createElement(ComponentForProps, {
          renderFooter: () => React.createElement("div", null)
        });
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        useEffect(() => {
          return () => null;
        });

        return <div />;
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        return (
          <SomeComponent renderers={{ Header: () => <div /> }} />
        )
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      function ParentComponent() {
        return <SomeComponent renderers={{ notComponent: () => null }} />;
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
      function ParentComponent() {
        const _renderHeader = () => <div />;
        return <div>{_renderHeader()}</div>;
      }
    `,
    /* tsx */ `
      const testCases = {
        basic: {
          render() {
            const Component = () => <div />;
            return <div />;
          }
        }
      }
    `,
    /* tsx */ `
      function App({ locale }: AppProps) {
          const route = Router.useRoute(["Home", "BotArea", "NotFound"]);

          return (
              <TypesafeI18n locale={locale}>
                  <MantineProvider theme={mantineTheme}>
                      <div className={css.root}>
                          <React.Suspense fallback={<RootLayout navHeader={<small className={css.loading} />} />}>
                              {React.useMemo(
                                  () => match(route)
                                          .with({ name: "Home" }, () => <Redirect to="/bots/ChatGPT" />)
                                          .with({ name: "BotArea" }, ({ params }) => <BotArea botName={params.botName} />)
                                          .otherwise(() => <NotFound />),
                                  [loaded, route],
                              )}
                          </React.Suspense>
                      </div>
                  </MantineProvider>
              </TypesafeI18n>
          );
      }
    `,
    /* tsx */ `
      function BotArea({ botName }: BotAreaProps) {
          const bot = useAtomValue(botsDb.item(botName));
          const route = Router.useRoute(["BotRoot", "BotChat", "BotNewChat", "BotSettings"]);
          const botList = useAtomValue(botListAtom);

          const contentView = React.useMemo(
              () =>
                  match(route)
                      .with({ name: "BotRoot" }, ({ params }) => <RedirectChat botName={params.botName} />)
                      .with({ name: "BotNewChat" }, ({ params }) => <RedirectChat botName={params.botName} />)
                      .with({ name: "BotSettings" }, ({ params }) => <BotSettings botName={params.botName} />)
                      .with({ name: "BotChat" }, ({ params }) => {
                          const { botName, chatID } = params;

                          if (!ID.isChatID(chatID)) {
                              return <Redirect to="/404" />;
                          }

                          return <ChatDetail botName={botName} chatID={chatID} />;
                      })
                      .otherwise(() => null),
              [route],
          );

          if (!bot) {
              return <Redirect to="/404" />;
          }

          return (
              <BotProvider botName={botName}>
                  <RootLayout nav={<BotList items={botList} selected={botName} />}>
                      <ErrorBoundary fallback={<p className="p-2">Failed to render bot area.</p>}>
                          <React.Suspense>{contentView}</React.Suspense>
                      </ErrorBoundary>
                  </RootLayout>
              </BotProvider>
          );
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      function ComponentWithProps(props) {
        return React.createElement("div", null);
      }

      function ParentComponent() {
        return React.createElement(ComponentWithProps, {
          footer: () => React.createElement("div", null)
        });
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
      function ComponentForProps(props) {
        return <div />;
      }

      function ParentComponent() {
        return (
          <ComponentForProps notPrefixedWithRender={() => <div />} />
        );
      }
    `,
    /* tsx */ `
      function ComponentForProps(props) {
        return React.createElement("div", null);
      }

      function ParentComponent() {
        return React.createElement(ComponentForProps, {
          notPrefixedWithRender: () => React.createElement("div", null)
        });
      }
    `,
    /* tsx */ `
      function ParentComponent() {
        return (
          <ComponentForProps someMap={{ Header: () => <div /> }} />
        );
      }
    `,
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
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
    /* tsx */ `
      class ErrorBoundary extends React.Component {
        componentDidCatch(error, info) {}
        render() {
          return this.props.children;
        }
      }
    `,
    /* tsx */ `
      class ErrorBoundary extends React.Component {
        static getDerivedStateFromError(error) {}
        render() {
          return this.props.children;
        }
      }
    `,
    /* tsx */ `
      class ErrorBoundary extends React.Component {
        static getDerivedStateFromError = () => {};
        render() {
          return this.props.children;
        }
      }
    `,
  ],
});
