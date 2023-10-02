import dedent from "dedent";

import * as validFunction from "../../../test/common/valid/function";
import RuleTester, { getFixturesRootDir } from "../../../test/rule-tester";
import rule, { RULE_NAME } from "./no-leaked-conditional-rendering";
const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: rootDir,
    },
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        ...validFunction.all,
        dedent`
            const App = () => {
              return <div>{foo || bar}</div>
          }
        `,
        dedent`
            const App = ({ foo }) => {
              return <div>{foo}</div>
          }
        `,
        dedent`
            const App = ({ items }) => {
              return <div>There are {items.length} elements</div>
          }
        `,
        dedent`
            const App = ({ items, count }) => {
              return <div>{!count && 'No results found'}</div>
          }
        `,
        dedent`
            const App = ({ items }) => {
              return <div>{!!itesm.length && <List items={items}/>}</div>
          }
        `,
        dedent`
            const App = ({ items }) => {
              return <div>{Boolean(items.length) && <List items={items}/>}</div>
          }
        `,
        dedent`
          const App = ({ items }) => {
              return <div>{items.length > 0 && <List items={items}/>}</div>
          }
        `,
        dedent`
            const App = ({ items }) => {
              return <div>{items.length ? <List items={items}/> : null}</div>
          }
        `,
        dedent`
            const App = ({ items, count }) => {
              return <div>{count ? <List items={items}/> : null}</div>
          }
        `,
        dedent`
            const App = ({ items, count }) => {
              return <div>{!!count && <List items={items}/>}</div>
          }
        `,
        dedent`
          const App = ({ items, count }) => {
              return <div>{direction ? (direction === "down" ? "▼" : "▲") : ""}</div>
          }
        `,
        dedent`
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
    ],
    invalid: [
        {
            code: dedent`
              const App = () => {
                return (
                    <>
                    {0 && <Foo />}
                    {NaN && <Foo />}
                    </>
                    )
                }
            `,
            errors: [
                {
                    messageId: "INVALID",
                },
                {
                    messageId: "INVALID",
                },
            ],
        },
    ],
});
