import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-class-component";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "class component with nested function component",
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
            name: "ParentComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "class component with nested function component in createElement",
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
          data: {
            name: "ParentComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "class component with nested variable component",
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
            name: "ParentComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "class component with nested variable component in createElement",
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
            name: "ParentComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "class component rendering nested list component",
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
          data: {
            name: "ParentComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "class component rendering nested list component with items",
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
          data: {
            name: "ParentComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "nested class component in function component",
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
          data: {
            name: "UnstableNestedClassComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "nested class component in function component with createElement",
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
        },
        messageId: "default",
      }],
    },
    {
      name: "nested class component in class component",
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
          data: {
            name: "ParentComponent",
          },
          messageId: "default",
        },
        {
          data: {
            name: "UnstableNestedClassComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "nested class component in class component with createElement",
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
          data: {
            name: "ParentComponent",
          },
          messageId: "default",
        },
        {
          data: {
            name: "UnstableNestedClassComponent",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "class component reported on the class name only",
      code: tsx`
        class ParentComponent extends React.Component {
          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          column: 7,
          data: {
            name: "ParentComponent",
          },
          endColumn: 22,
          endLine: 1,
          line: 1,
          messageId: "default",
        },
      ],
    },
    {
      name: "class component assigned to a variable reported on the variable name",
      code: tsx`
        const ParentComponent = class extends React.Component {
          render() {
            return <div />;
          }
        };
      `,
      errors: [
        {
          column: 7,
          data: {
            name: "ParentComponent",
          },
          endColumn: 22,
          endLine: 1,
          line: 1,
          messageId: "default",
        },
      ],
    },
    {
      name: "anonymous class component reported on the class keyword",
      code: tsx`
        export default class extends React.Component {
          render() {
            return <div />;
          }
        }
      `,
      errors: [
        {
          column: 16,
          endColumn: 21,
          endLine: 1,
          line: 1,
          messageId: "default",
        },
      ],
    },
    {
      name: "error boundary with static componentDidCatch",
      code: tsx`
        class ErrorBoundary extends React.Component {
          static componentDidCatch(error, info) {}
        }
      `,
      errors: [
        {
          data: {
            name: "ErrorBoundary",
          },
          messageId: "default",
        },
      ],
    },
    {
      name: "error boundary with getDerivedStateFromError without render",
      code: tsx`
        class ErrorBoundary extends React.Component {
          getDerivedStateFromError(error) {}
        }
      `,
      errors: [
        {
          data: {
            name: "ErrorBoundary",
          },
          messageId: "default",
        },
      ],
    },
  ],
  valid: [
    {
      name: "outside defined component in JSX",
      code: tsx`
      function ParentComponent() {
        return (
          <div>
            <OutsideDefinedFunctionComponent />
          </div>
        );
      }
    `,
    },
    {
      name: "outside defined component in createElement",
      code: tsx`
      function ParentComponent() {
        return React.createElement(
          "div",
          null,
          React.createElement(OutsideDefinedFunctionComponent, null)
        );
      }
    `,
    },
    {
      name: "components passed as props in JSX",
      code: tsx`
      function ParentComponent() {
        return (
          <SomeComponent
            footer={<OutsideDefinedComponent />}
            header={<div />}
            />
        );
      }
    `,
    },
    {
      name: "components passed as props in createElement",
      code: tsx`
      function ParentComponent() {
        return React.createElement(SomeComponent, {
          footer: React.createElement(OutsideDefinedComponent, null),
          header: React.createElement("div", null)
        });
      }
    `,
    },
    {
      name: "nested function component in function component",
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
    },
    {
      name: "nested function component in function component with createElement",
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
    },
    {
      name: "nested function component in arrow function component",
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
    },
    {
      name: "nested function component in arrow function component with createElement",
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
    },
    {
      name: "nested function component in default export component",
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
    },
    {
      name: "nested function component in default export component with createElement",
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
    },
    {
      name: "nested variable component in function component",
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
    },
    {
      name: "nested variable component in function component with createElement",
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
    },
    {
      name: "nested variable component in arrow function component",
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
    },
    {
      name: "nested variable component in arrow function component with createElement",
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
    },
    {
      name: "nested component wrapped in useCallback",
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
    },
    {
      name: "nested component wrapped in useCallback with createElement",
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
    },
    {
      name: "nested function component wrapped in useCallback",
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
    },
    {
      name: "nested function component wrapped in useCallback with createElement",
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
    },
    {
      name: "useEffect cleanup returning null",
      code: tsx`
      function ParentComponent() {
        useEffect(() => {
          return () => null;
        });

        return <div />;
      }
    `,
    },
    {
      name: "nested component wrapped in memo",
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
    },
    {
      name: "nested component wrapped in memo with createElement",
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
    },
    {
      name: "nested function component wrapped in memo",
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
    },
    {
      name: "nested function component wrapped in memo with createElement",
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
    },
    {
      name: "render prop in JSX",
      code: tsx`
      function ParentComponent() {
        return (
          <ComponentForProps renderFooter={() => <div />} />
        );
      }
    `,
    },
    {
      name: "render prop in createElement",
      code: tsx`
      function ParentComponent() {
        return React.createElement(ComponentForProps, {
          renderFooter: () => React.createElement("div", null)
        });
      }
    `,
    },
    {
      name: "named function expression as prop in JSX",
      code: tsx`
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
    },
    {
      name: "named function expression as prop in createElement",
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
    },
    {
      name: "arrow function as prop in createElement",
      code: tsx`
      function ComponentWithProps(props) {
        return React.createElement("div", null);
      }

      function ParentComponent() {
        return React.createElement(ComponentWithProps, {
          footer: () => React.createElement("div", null)
        });
      }
    `,
    },
    {
      name: "renderers object prop with component value",
      code: tsx`
      function ParentComponent() {
        return (
          <SomeComponent renderers={{ Header: () => <div /> }} />
        )
      }
    `,
    },
    {
      name: "render menu prop with nested elements",
      code: tsx`
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
    },
    {
      name: "components array prop",
      code: tsx`
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
    },
    {
      name: "render function in rows object",
      code: tsx`
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
    },
    {
      name: "list renderer prop with mapped items",
      code: tsx`
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
    },
    {
      name: "render function as child in createElement",
      code: tsx`
      function ParentComponent() {
        return React.createElement(
            RenderPropComponent,
            null,
            () => React.createElement("div", null)
        );
      }
    `,
    },
    {
      name: "nested component inside render prop function",
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
    },
    {
      name: "mapped items in JSX",
      code: tsx`
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
    },
    {
      name: "mapped items passed as prop",
      code: tsx`
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
    },
    {
      name: "mapped items in createElement",
      code: tsx`
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
    },
    {
      name: "mapped items with named function in JSX",
      code: tsx`
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
    },
    {
      name: "mapped items with named function in createElement",
      code: tsx`
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
    },
    {
      name: "match call with render properties as child",
      code: tsx`
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
    },
    {
      name: "match call with render properties assigned to variable",
      code: tsx`
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
    },
    {
      name: "match call with plain properties as child",
      code: tsx`
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
    },
    {
      name: "match call with plain properties assigned to variable",
      code: tsx`
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
    },
    {
      name: "helper function returning element",
      code: tsx`
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
    },
    {
      name: "helper function returning element with createElement",
      code: tsx`
      function ParentComponent() {
        function getComponent() {
          return React.createElement("div", null);
        }

        return React.createElement("div", null, getComponent());
      }
    `,
    },
    {
      name: "nested component inside helper function",
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
    },
    {
      name: "nested component inside helper function with createElement",
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
    },
    {
      name: "factory function returning element",
      code: tsx`
      function createTestComponent(props) {
        return (
          <div />
        );
      }
    `,
    },
    {
      name: "factory function returning element with createElement",
      code: tsx`
      function createTestComponent(props) {
        return React.createElement("div", null);
      }
    `,
    },
    {
      name: "render prefixed helper invoked directly",
      code: tsx`
      function ParentComponent() {
        const _renderHeader = () => <div />;
        return <div>{_renderHeader()}</div>;
      }
    `,
    },
    {
      name: "renderers prop with non-component value",
      code: tsx`
      function ParentComponent() {
        return <SomeComponent renderers={{ notComponent: () => null }} />;
      }
    `,
    },
    {
      name: "function prop without render prefix in JSX",
      code: tsx`
      function ComponentForProps(props) {
        return <div />;
      }

      function ParentComponent() {
        return (
          <ComponentForProps notPrefixedWithRender={() => <div />} />
        );
      }
    `,
    },
    {
      name: "function prop without render prefix in createElement",
      code: tsx`
      function ComponentForProps(props) {
        return React.createElement("div", null);
      }

      function ParentComponent() {
        return React.createElement(ComponentForProps, {
          notPrefixedWithRender: () => React.createElement("div", null)
        });
      }
    `,
    },
    {
      name: "map prop with component value",
      code: tsx`
      function ParentComponent() {
        return (
          <ComponentForProps someMap={{ Header: () => <div /> }} />
        );
      }
    `,
    },
    {
      name: "rows with non-render function property",
      code: tsx`
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
    },
    {
      name: "component defined inside test case object",
      code: tsx`
      const testCases = {
        basic: {
          render() {
            const Component = () => <div />;
            return <div />;
          }
        }
      }
    `,
    },
    {
      name: "route matching inside useMemo",
      code: tsx`
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
    },
    {
      name: "memoized content view with route matching",
      code: tsx`
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
    },
    {
      name: "event handlers and non-component function props",
      code: tsx`
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
    },
    {
      name: "error boundary with componentDidCatch",
      code: tsx`
      class ErrorBoundary extends React.Component {
        componentDidCatch(error, info) {}
        render() {
          return this.props.children;
        }
      }
    `,
    },
    {
      name: "error boundary with static getDerivedStateFromError",
      code: tsx`
      class ErrorBoundary extends React.Component {
        static getDerivedStateFromError(error) {}
        render() {
          return this.props.children;
        }
      }
    `,
    },
    {
      name: "error boundary with getDerivedStateFromError class property",
      code: tsx`
      class ErrorBoundary extends React.Component {
        static getDerivedStateFromError = () => {};
        render() {
          return this.props.children;
        }
      }
    `,
    },
    {
      name: "component created with createReactClass",
      code: tsx`
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
    },
  ],
});
