import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-destructuring-assignment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        const App = (props) => {
            const { h, i } = hi
            return <div id={props.id} className={props.className} />
          }
      `,
      errors: [
        {
          messageId: "preferDestructuringAssignment",
        },
        {
          messageId: "preferDestructuringAssignment",
        },
      ],
    },
    {
      code: /* tsx */ `
        function App(props) {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferDestructuringAssignment",
        },
        {
          messageId: "preferDestructuringAssignment",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { forwardRef } from "react";

        interface Props {
            day: string;
        }

        // Code to expect error
        export const App = forwardRef<HTMLDivElement, Props>(
            function App(props, ref) {
              return <div ref={ref}>{props.day}</div>;
            }
        );
      `,
      errors: [
        {
          messageId: "preferDestructuringAssignment",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { memo } from "react";

        interface Props {
            day: string;
        }

        // Code to expect error
        export const App = memo(
            function App(props: Props) {
                return <div ref={ref}>{props.day}</div>;
            }
        );
      `,
      errors: [
        {
          messageId: "preferDestructuringAssignment",
        },
      ],
    },
    {
      code: /* tsx */ `
        import { memo, forwardRef } from "react";

        interface Props {
            day: string;
        }

        // Code to expect error
        export const App = memo(
            forwardRef<HTMLDivElement, Props>(
                function App(props, ref) {
                    return <div ref={ref}>{props.day}</div>;
                }
            )
        );
      `,
      errors: [
        {
          messageId: "preferDestructuringAssignment",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
        export function hof(namespace) {
          const initialState = {
              bounds: null,
              search: false
          }
          return ({ x, y }) => {
              if (y) {
                  return <span>{y}</span>;
              }
              return <span>{x}</span>
          }
      }
    `,
    /* tsx */ `
      export function hof(namespace) {
          const initialState = {
              bounds: null,
              search: false
          }
          return (state = initialState, action) => {
              if (action.type === 'ABC') {
                  return {...state, bounds: stuff ? action.x : null}
              }
              if (action.namespace !== namespace) {
                  return state
              }
              return null
          }
      }
    `,
    "const App = ({ id, className }) => (<div id={id} className={className} />)",
    /* tsx */ `
      const App = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      const App = ({ id, className }) => {
      return <div id={id} className={className} /> }
    `,
    "const App = (props) => (<div id={id} props={props} />)",
    "const Component = (props) => (<div id={id} props={props} />)",
    "const App = (props, { color }) => (<div id={id} props={props} color={color} />)",
    "const Component = (props, { color }) => (<div id={id} props={props} color={color} />)",
    /* tsx */ `
      const div = styled.div\`
      & .button {
          border-radius: \${props => props.borderRadius}px;
      }
      \`
    `,
    /* tsx */ `
      export default (context: $Context) => ({
          foo: context.bar
      })
    `,
    /* tsx */ `
      function App({ context }) {
          const d = context.describe()
          return <div>{d}</div>
      }
    `,
    /* tsx */ `
      const obj = {
          foo(arg) {
              const a = arg.func()
              return null
          }
      }
    `,
    /* tsx */ `
      const columns = [
          {
              render: (val) => {
                  if (val.url) {
                      return (
                          <a href={val.url}>
                          {val.test}
                          </a>
                          )
                      }
                      return null
                  }
              }
          ]
    `,
    /* tsx */ `
      const columns = [
          {
              render: val => <span>{val}</span>
          },
          {
              someRenderFunc: function(val) {
                  if (val.url) {
                      return (
                          <a href={val.url}>
                          {val.test}
                          </a>
                          )
                      }
                      return null
                  }
              }
          ]
    `,
    /* tsx */ `
      export default (fileName) => {
          const match = fileName.match(/some expression/)
          if (match) {
              return fn
          }
          return null
      }
    `,
    /* tsx */ `
      import { useContext } from 'react'
      const App = (props) => {
          const {foo} = useContext(aContext)
          return <div>{foo}</div>
      }
    `,
    /* tsx */ `
      import { useContext } from 'react'
      const App = (props) => {
          const foo = useContext(aContext)
          return <div>{foo.test}</div>
      }
    `,
    /* tsx */ `
      import { forwardRef } from "react";

      interface Props {
          day: string;
      }

      // Correct code
      export const App = forwardRef<HTMLDivElement, Props>(
          function App({ day }, ref) {
            return <div ref={ref}>{day}</div>;
          }
      );
    `,
    /* tsx */ `
      import { memo } from "react";

      interface Props {
          day: string;
      }

      // Correct code
      export const App = memo(
          function App({ day }) {
            return <div ref={ref}>{day}</div>;
          }
      );
    `,
    /* tsx */ `
      import { memo, forwardRef } from "react";

      interface Props {
          day: string;
      }

      // Correct code
      export const App = memo(
          forwardRef<HTMLDivElement, Props>(
              function App({ day }, ref) {
                  return <div ref={ref}>{day}</div>;
              }
          )
      );
    `,
    /* tsx */ `
      import { useContext } from "react"
      const App = (props) => {
          const foo = useContext(aContext)
          return <div>{foo.test}</div>
      }
    `,
  ],
});
