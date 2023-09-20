import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule from "./no-leaked-jsx-conditional-rendering";
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

const RULE_NAME = "no-leaked-jsx-conditional-rendering";

ruleTester.run(RULE_NAME, rule, {
    valid: [
        `const Component = () => {
          return <div>{customTitle || defaultTitle}</div>
        }`,
        `const Component = ({ elements }) => {
          return <div>{elements}</div>
        }`,
        `const Component = ({ elements }) => {
          return <div>There are {elements.length} elements</div>
        }`,
        `const Component = ({ elements, count }) => {
          return <div>{!count && 'No results found'}</div>
        }`,
        `const Component = ({ elements }) => {
          return <div>{!!elements.length && <List elements={elements}/>}</div>
        }`,
        `const Component = ({ elements }) => {
          return <div>{Boolean(elements.length) && <List elements={elements}/>}</div>
        }`,
        `const Component = ({ elements }) => {
          return <div>{elements.length > 0 && <List elements={elements}/>}</div>
        }`,
        `const Component = ({ elements }) => {
          return <div>{elements.length ? <List elements={elements}/> : null}</div>
        }`,
        `const Component = ({ elements, count }) => {
          return <div>{count ? <List elements={elements}/> : null}</div>
        }`,
        `const Component = ({ elements, count }) => {
          return <div>{!!count && <List elements={elements}/>}</div>
        }`,
        `const Component = ({ elements, count }) => {
          return <div>{direction ? (direction === "down" ? "▼" : "▲") : ""}</div>
        }`,
        `const Example = () => {
          return (
            <>
              {0 ? <Something/> : null}
              {'' && <Something/>}
              {NaN ? <Something/> : null}
            </>
          )
        }`,
    ],
    invalid: [{
        code: `const Example = () => {
          return (
            <>
              {0 && <Something/>}
              {NaN && <Something/>}
            </>
          )
        }`,
        errors: [
            {
                messageId: "POTENTIAL_LEAKED_CONDITIONAL_RENDERING",
            },
            {
                messageId: "POTENTIAL_LEAKED_CONDITIONAL_RENDERING",
            },
        ],
    }],
});
