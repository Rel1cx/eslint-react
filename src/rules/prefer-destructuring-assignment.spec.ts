import RuleTester, { getFixturesRootDir } from "../../test/rule-tester";
import rule, { RULE_NAME } from "./prefer-destructuring-assignment";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        project: "./tsconfig.json",
        sourceType: "module",
        tsconfigRootDir: rootDir,
    },
});

ruleTester.run(RULE_NAME, rule, {
    valid: [
        `export function hof(namespace) {
          const initialState = {
            bounds: null,
            search: false
          };
          return (props) => {
            const {x, y} = props
            if (y) {
              return <span>{y}</span>;
            }
            return <span>{x}</span>
          };
        }`,
        `export function hof(namespace) {
          const initialState = {
            bounds: null,
            search: false,
          };

          return (state = initialState, action) => {
            if (action.type === 'ABC') {
              return {...state, bounds: stuff ? action.x : null};
            }

            if (action.namespace !== namespace) {
              return state;
            }

            return null
          };
        }`,
        `const App = ({ id, className }) => (<div id={id} className={className} />)`,
        {
            code: `const App = ({ id, className }) => (<div id={id} className={className} />)`,
            options: ["always"],
        },
        `const App = (props) => {
         const { id, className } = props
         return <div id={id} className={className} />
    }`,
        {
            code: `const App = (props) => {
                   const { id, className } = props;
                   return <div id={id} className={className} /> }`,
            options: ["always"],
        },
        `const App = (props) => (<div id={id} props={props} />)`,
        {
            code: `const Component = (props) => (<div id={id} props={props} />)`,
            options: ["always"],
        },
        `const App = (props, { color }) => (<div id={id} props={props} color={color} />)`,
        {
            code: `const Component = (props, { color }) => (<div id={id} props={props} color={color} />)`,
            options: ["always"],
        },
        {
            code: `const App = (props) => {
                   const { h, i } = hi;
                   return <div id={props.id} className={props.className} />}`,
            options: ["never"],
        },
        `const div = styled.div\`
          & .button {
            border-radius: \${props => props.borderRadius}px;
          }
        \``,
        `export default (context: $Context) => ({
          foo: context.bar
        })`,
        {
            code: `function App({ context }) {
                const d = context.describe()

                return <div>{d}</div>
            }`,
            options: ["always"],
        },
        `const obj = {
          foo(arg) {
            const a = arg.func()

            return null
          },
        }`,
        `const columns = [
          {
            render: (val) => {
              if (val.url) {
                return (
                  <a href={val.url}>
                    {val.test}
                  </a>
                );
              }

              return null
            }
          }
        ]`,
        `const columns = [
          {
            render: val => <span>{val}</span>,
          },
          {
            someRenderFunc: function(val) {
              if (val.url) {
                return (
                  <a href={val.url}>
                    {val.test}
                  </a>
                );
              }

              return null
            }
          }
        ]`,
        `export default (fileName) => {
          const match = fileName.match(/some expression/);
          if (match) {
            return fn
          }

          return null
        }`,
        {
            code: `import { useContext } from 'react'
        const App = (props) => {
          const {foo} = useContext(aContext)
          return <div>{foo}</div>
        }`,
            options: ["always"],
        },
        {
            code: `import { useContext } from 'react'
        const App = (props) => {
          const foo = useContext(aContext)

          return <div>{foo.test}</div>
        }`,
            options: ["never"],
        },
        {
            code: `
        import { useContext } from 'react'

        const App = (props) => {
          const foo = useContext(aContext)

          return <div>{foo.test}</div>
        }
      `,
            options: ["always"],
        },
        `
        import { useContext } from 'react'

        const App = (props) => {
          const foo = useContext(aContext)

          return <div>{foo?.test}</div>
        }
      `,
    ],
    invalid: [
        // TODO: Add option to control destructuring assignments in function body
        // {
        //     code: `const App = (props) => {
        //         const { id, className } = props
        //         return <div id={id} className={className} />
        //       }`,
        //     errors: [
        //         {
        //             messageId: "USE_DESTRUCTURING_ASSIGNMENT",
        //         },
        //         {
        //             messageId: "USE_DESTRUCTURING_ASSIGNMENT",
        //         },
        //     ],
        // },
        {
            code: `function App(props) {
          return <div id={props.id} className={props.className} />
        }`,
            errors: [
                {
                    messageId: "USE_DESTRUCTURING_ASSIGNMENT",
                },
                {
                    messageId: "USE_DESTRUCTURING_ASSIGNMENT",
                },
            ],
        },
    ],
});
