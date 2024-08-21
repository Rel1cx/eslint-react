import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-complex-conditional-rendering";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        function Component({ hideShapes, debugSvg }) {
          return <div>{hideShapes ? null : debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />}</div>;
        }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
    {
      code: /* tsx */ `
        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
            return <div>{direction ? (direction === "down" ? "▼" : "▲") : ""}</div>
        }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
    {
      code: /* tsx */ `
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? null : <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
    {
      code: /* tsx */ `
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition && <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
    {
      code: /* tsx */ `
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? someCondition : <div />
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
    {
      code: /* tsx */ `
        const someCondition = 0;
        const SomeComponent = () => <div />;

        const App = () => {
          return (
            <>
              {!!someCondition
                ? (
                <SomeComponent
                  prop1={val1}
                  prop2={val2}
                />)
                : someCondition ? "aaa"
                : someCondition && someCondition
                ? <div />
                : null
              }
            </>
          )
        }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
          return (
              <>
              {0 && 1 || <Foo />}
              {NaN || 0 && <Foo />}
              </>
              )
          }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
    {
      code: /* tsx */ `
        const App = () => {
          return (
              <>
              {0 && 1 && 2 || <Foo />}
              {NaN || 1 || 0 && <Foo />}
              </>
              )
          }
      `,
      errors: [
        {
          messageId: "noComplexConditionalRendering",
        },
        {
          messageId: "noComplexConditionalRendering",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      function Component({ hideShapes, debugSvg }) {
        // Early return if nothing to render
        if (hideShapes) {
          return null;
        }

        return debugSvg ? <ShapesWithSVGs /> : <ShapesToDisplay />;
      }
    `,
    /* tsx */ `
        const foo = Math.random() > 0.5;
        const bar = "bar";

        const App = () => {
          return <div>{foo || bar}</div>
      }
    `,
    /* tsx */ `
        type AppProps = {
          foo: string;
        }

        const App = ({ foo }: AppProps) => {
          return <div>{foo}</div>
      }
    `,
    /* tsx */ `
        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>There are {items.length} elements</div>
      }
    `,
    /* tsx */ `
        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{!count && 'No results found'}</div>
      }
    `,
    /* tsx */ `
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{!!items.length && <List items={items}/>}</div>
      }
    `,
    /* tsx */ `
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{Boolean(items.length) && <List items={items}/>}</div>
      }
    `,
    /* tsx */ `
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{items.length > 0 && <List items={items}/>}</div>
      }
    `,
    /* tsx */ `
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
        }

        const App = ({ items }: AppProps) => {
          return <div>{items.length ? <List items={items}/> : null}</div>
      }
    `,
    /* tsx */ `
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{count ? <List items={items}/> : null}</div>
      }
    `,
    /* tsx */ `
        type ListProps = {
          items: string[];
        }

        const List = ({ items }: ListProps) => {
          return <div>{items.map(item => <div key={item}>{item}</div>)}</div>
        }

        type AppProps = {
          items: string[];
          count: number;
        }

        const App = ({ items, count }: AppProps) => {
          return <div>{!!count && <List items={items}/>}</div>
      }
    `,
    /* tsx */ `
      const App = () => {
        return (
            <>
            {0 ? <Foo /> : null}
            {'' && <Foo />}
            {NaN ? <Foo /> : null}
            </>
            )
        }
    `,
    /* tsx */ `
      const foo = Math.random() > 0.5;
      const bar = 0;
      function App() {
        return (
          <button
            type="button"
            disabled={foo && bar === 0}
            onClick={() => {}}
          />
        );
      }
    `,
    `
      const someCondition = JSON.parse("true") as boolean;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
      `,
    /* tsx */ `
      const someCondition = JSON.parse("") as any;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    /* tsx */ `
      const someCondition = JSON.parse("") as unknown;
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    /* tsx */ `
      const someCondition = 0
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    /* tsx */ `
      const someCondition = 1
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {!!someCondition && (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />
            )}
          </>
        )
      }
    `,
    /* tsx */ `
      const SomeComponent = () => <div />;
      const App = ({
        someCondition,
      }: {
        someCondition?: number | undefined;
      }) => {
        return (
          <>
            {someCondition
              ? someCondition
              : <SomeComponent />
            }
          </>
        )
      }
    `,
    /* tsx */ `
      const someCondition = true
      const SomeComponent = () => <div />;

      const App = () => {
        return (
          <>
            {someCondition
              ? (
              <SomeComponent
                prop1={val1}
                prop2={val2}
              />)
              : "else"
            }
          </>
        )
      }
    `,
    /* tsx */ `
      const SomeComponent = () => <div />;
      const someFunction = (input: unknown): 10 => 10

      const App = ({ someCondition }: { someCondition?: number | undefined }) => {
        return <>{someCondition ? someFunction(someCondition) : <SomeComponent />}</>;
      };
    `,
    /* tsx */ `
      const SomeComponent = () => <div />;

      const App = ({
        someCondition,
      }:{
        someCondition?: boolean | undefined;
      }) => {
        return (
          <>
            {someCondition && <SomeComponent />}
          </>
        )
      }
    `,
    /* tsx */ `
      type AppProps<T> = {
        someFunction: (data: T) => React.ReactNode;
      };

      function App<T>({ someFunction }: AppProps<T>) {
        return <>{!!someFunction && someFunction<number>(1)}</>;
      }
    `,
    /* tsx */ `
      const App = () => {
        return (
            <>
            {0 && <Foo />}
            {NaN && <Foo />}
            </>
            )
        }
    `,
    /* tsx */ `
      const App = () => {
        return (
            <>
            {0 && 1 && <Foo />}
            {NaN && 0 && <Foo />}
            </>
            )
        }
    `,
    /* tsx */ `
      const App = () => {
        return <div title={0 && 1 && 2 || 3 && 4 && 5}>Hello</div>
        }
    `,
    /* tsx */ `
      function Example({ condition1, condition2, condition3, condition4 }) {
        return (
          <div>
            {condition1 && condition2 && <div>1</div>}
            {condition3 && condition4 && <div>2</div>}
          </div>
        );
      }
    `,
    /* tsx */ `
      function Example({ condition1, condition2, condition3, condition4 }) {
        const shouldDisplay1 = condition1 && condition2;
        const shouldDisplay2 = condition3 && condition4;
        return <div>{shouldDisplay1 && <div>1</div>}{shouldDisplay2 && <div>2</div>}</div>;
      }
    `,
  ],
});
