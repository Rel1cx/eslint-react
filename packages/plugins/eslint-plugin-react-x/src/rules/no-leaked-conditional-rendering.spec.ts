import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./no-leaked-conditional-rendering";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const a = <>{0 && <Foo />}</>;
        const b = <>{NaN && <Foo />}</>;
      `,
      errors: [
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const a = <>{(0) && <Foo />}</>;
        const b = <>{(NaN) && <Foo />}</>;
      `,
      errors: [
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const x = -1
        const y = -0
        const z = 0
        const w = 1
        const a = <>{x && <Foo />}</>;
        const b = <>{y && <Foo />}</>;
        const c = <>{z && <Foo />}</>;
        const d = <>{w && <Foo />}</>;
      `,
      errors: [
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const x = -1n
        const y = -0n
        const z = 0n
        const w = 1n
        const a = <>{x && <Foo />}</>;
        const b = <>{y && <Foo />}</>;
        const c = <>{z && <Foo />}</>;
        const d = <>{w && <Foo />}</>;
      `,
      errors: [
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
        { messageId: "NO_LEAKED_CONDITIONAL_RENDERING" },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const someCondition = JSON.parse("") as unknown;
        const SomeComponent = () => <div />;
        const a = <>{someCondition && <SomeComponent prop1={val1} prop2={val2} />}</>;
      `,
      errors: [{ messageId: "NO_LEAKED_CONDITIONAL_RENDERING" }],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const someCondition = 0;
        const SomeComponent = () => <div />;
        const a = <>{someCondition && <SomeComponent prop1={val1} prop2={val2} />}</>;
      `,
      errors: [{ messageId: "NO_LEAKED_CONDITIONAL_RENDERING" }],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const someCondition = -0;
        const SomeComponent = () => <div />;
        const a = <>{someCondition && <SomeComponent prop1={val1} prop2={val2} />}</>;
      `,
      errors: [{ messageId: "NO_LEAKED_CONDITIONAL_RENDERING" }],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const someCondition = 0;
        const SomeComponent = () => <div />;
        const a = <>{!!someCondition ? <SomeComponent prop1={val1} prop2={val2} /> : someCondition && <div />}</>;
      `,
      errors: [{ messageId: "NO_LEAKED_CONDITIONAL_RENDERING" }],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const App = ({
          someCondition,
        }: {
          someCondition: number | undefined;
        }) => {
          return (
            <>
              {someCondition && <Foo />}
            </>
          )
        }
      `,
      errors: [{ messageId: "NO_LEAKED_CONDITIONAL_RENDERING" }],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        const SomeComponent = () => <div />;

        const App = ({
          someCondition,
        }:{
          someCondition?: number | undefined;
        }) => {
          return (
            <>
              {someCondition && <SomeComponent />}
            </>
          )
        }
      `,
      errors: [{ messageId: "NO_LEAKED_CONDITIONAL_RENDERING" }],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      const a = <>{!(0) && <Foo />}</>;
      const b = <>{!(NaN) && <Foo />}</>;
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      const a = <>{!!(0) && <Foo />}</>;
      const b = <>{!!(NaN) && <Foo />}</>;
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      const a = <>{!!!(0) && <Foo />}</>;
      const b = <>{!!!(NaN) && <Foo />}</>;
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      let x: number | undefined;
      const a = <>{!x && <Foo />}</>;
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      let x: number | undefined;
      const y = 2;
      const a = <>{!x ? !x && <Foo /> : y && <Bar />}</>;
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      const x = -1
      const y = -0
      const z = 0
      const w = 1
      const a = <>{x && <Foo />}</>;
      const b = <>{!y && <Foo />}</>;
      const c = <>{!z && <Foo />}</>;
      const d = <>{w && <Foo />}</>;
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      const x = -1n
      const y = -0n
      const z = 0n
      const w = 1n
      const a = <>{x && <Foo />}</>;
      const b = <>{!y && <Foo />}</>;
      const c = <>{!z && <Foo />}</>;
      const d = <>{w && <Foo />}</>;
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      const foo = Math.random() > 0.5;
      const bar = "bar";
      const a = <div>{0 || bar}</div>
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      const foo = Math.random() > 0.5;
      const bar = "bar";
      const a = <div>{foo || bar}</div>
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

      type AppProps = { foo: string; }
      const App = ({ foo }: AppProps) => <div>{foo}</div>
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        type AppProps = {
          items: string[];
        }
        const App = ({ items }: AppProps) => {
          return <div>There are {items.length} elements</div>
      }
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        type AppProps = {
          items: string[];
          count: number;
        }
        const App = ({ items, count }: AppProps) => {
          return <div>{!count && 'No results found'}</div>
      }
    `,
    /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

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
        /// <reference types="react" />
        /// <reference types="react-dom" />

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
        /// <reference types="react" />
        /// <reference types="react-dom" />

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
        /// <reference types="react" />
        /// <reference types="react-dom" />

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
        /// <reference types="react" />
        /// <reference types="react-dom" />

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
        /// <reference types="react" />
        /// <reference types="react-dom" />

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
      /// <reference types="react" />
      /// <reference types="react-dom" />
      
      const alwaysTruthy = true;
      const alwaysFalsy = false;

      const App = () => {
          return (
            <div>
              {alwaysTruthy && <div />}
              {alwaysFalsy && <div />}
            </div>
          )
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      type AppProps = {
        items: string[];
        count: number;
      }
      const App = ({ items, count }: AppProps) => {
          return <div>{direction ? (direction === "down" ? "▼" : "▲") : ""}</div>
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const a = <>
                {0 ? <Foo /> : null}
                {'' && <Foo />}
                {NaN ? <Foo /> : null}
                </>
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

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
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const someCondition = JSON.parse("true") as boolean;
      const SomeComponent = () => <div />;
      const a = <>{!!someCondition && (<SomeComponent prop1={val1} prop2={val2} />)}</>
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const someCondition = JSON.parse("") as any;
      const SomeComponent = () => <div />;
      const a = <>{!!someCondition && (<SomeComponent prop1={val1} prop2={val2} />)}</>
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const someCondition = JSON.parse("") as unknown;
      const SomeComponent = () => <div />;
      const a = <>{!!someCondition && (<SomeComponent prop1={val1} prop2={val2} />)}</>
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const someCondition = 0
      const SomeComponent = () => <div />;
      const a = <>{!!someCondition && (<SomeComponent prop1={val1} prop2={val2} />)}</>
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const someCondition = 1
      const SomeComponent = () => <div />;
      const a = <>{!!someCondition && (<SomeComponent prop1={val1} prop2={val2} />)}</>
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const someCondition = 0;
      const SomeComponent = () => <div />;
      const a = <>{!!someCondition ? (<SomeComponent prop1={val1} prop2={val2} />) : someCondition ? null : <div />}</>
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

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
      /// <reference types="react" />
      /// <reference types="react-dom" />

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
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

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
      /// <reference types="react" />
      /// <reference types="react-dom" />

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
              : someCondition
              ? someCondition
              : <div />
            }
          </>
        )
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const SomeComponent = () => <div />;
      const someFunction = (input: unknown): 10 => 10
      const App = ({ someCondition }: { someCondition?: number | undefined }) => {
        return <>{someCondition ? someFunction(someCondition) : <SomeComponent />}</>;
      };
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const SomeComponent = () => <div />;
      const App = ({
        someCondition,
      }:{
        someCondition?: boolean | undefined;
      }) => {
        return <>{someCondition && <SomeComponent />}</>;
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      type AppProps<T> = {
        someFunction: (data: T) => React.ReactNode;
      };
      function App<T>({ someFunction }: AppProps<T>) {
        return <>{!!someFunction && someFunction<number>(1)}</>;
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      const someCondition = JSON.parse("") as any;
      const SomeComponent = () => <div />;
      const App = () => {
        return (
          <>
            {someCondition && (
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
      /// <reference types="react" />
      /// <reference types="react-dom" />

      function App() {
        const a = {} as {};
        const b = {} as {} | null;
        const b = {} as {} | undefined;
        return (
          <>
            <>{a && <div />}</>
            <>{b && <div />}</>
            <>{c && <div />}</>
          </>
        );
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      declare function getData(): { id: number; name: string }[] | undefined;
      function List({ items }: { items: string[] }) {
        return <div>{items.map(item => <div key={item}>{item}</div>)}</div>;
      }
      type Item = { id: number; name: string };
      function App() {
        let data: Item[] | undefined = getData();
        return (
          <div>
            {data && <List items={data} />}
          </div>
        );
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      export const MyComponent = ({ isVisible1 }: { isVisible1: boolean }) => {
        const isVisible2 = true;
        const isVisible3 = 1 > 2;
        return (
          <>
            {isVisible1 && <div />}
            {isVisible2 && <div />}
            {isVisible3 && <div />}
          </>
        );
      };
    `,
  ],
});
