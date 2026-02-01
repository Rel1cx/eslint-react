import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-destructuring-assignment";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const App = (props) => {
            const { h, i } = hi
            return <div id={props.id} className={props.className} />
          }
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
            const { h, i } = props
            return <div id={props.id} className={props.className} />
          }
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        function App(props) {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "default",
        },
        {
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
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
          messageId: "default",
        },
      ],
    },
    {
      code: tsx`
        const App = (props) => {
          const { h, i } = props
          return (
            <div>
              <span>{props.name}</span>
              <span>{props.age}</span>
              <button onClick={() => console.log(props.id)}>Click</button>
            </div>
          )
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const NestedComponent = (props) => {
          const data = props.data || {}
          return (
            <div>
              <span>{data?.user?.name}</span>
              <span>{data?.user?.email}</span>
            </div>
          )
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
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
    tsx`
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
    tsx`
      const App = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    tsx`
      const App = ({ id, className }) => {
      return <div id={id} className={className} /> }
    `,
    tsx`
      const App = (props) => {
        const { id, className } = props
          return <div id={id} className={className} />
      }
    `,
    "const App = (props) => (<div id={id} props={props} />)",
    "const Component = (props) => (<div id={id} props={props} />)",
    "const App = (props, { color }) => (<div id={id} props={props} color={color} />)",
    "const Component = (props, { color }) => (<div id={id} props={props} color={color} />)",
    tsx`
      const div = styled.div\`
      & .button {
          border-radius: \${props => props.borderRadius}px;
      }
      \`
    `,
    tsx`
      export default (context: $Context) => ({
          foo: context.bar
      })
    `,
    tsx`
      function App({ context }) {
          const d = context.describe()
          return <div>{d}</div>
      }
    `,
    tsx`
      const obj = {
          foo(arg) {
              const a = arg.func()
              return null
          }
      }
    `,
    tsx`
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
    tsx`
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
    tsx`
      export default (fileName) => {
          const match = fileName.match(/some expression/)
          if (match) {
              return fn
          }
          return null
      }
    `,
    tsx`
      import { useContext } from 'react'
      const App = (props) => {
          const {foo} = useContext(aContext)
          return <div>{foo}</div>
      }
    `,
    tsx`
      import { useContext } from 'react'
      const App = (props) => {
          const foo = useContext(aContext)
          return <div>{foo.test}</div>
      }
    `,
    tsx`
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
    tsx`
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
    tsx`
      import { memo, forwardRef } from "react";

      interface Props {
          day: string;
      }

      // Correct code
      export const App = memo(
          forwardRef<HTMLDivElement, Props>(
              function App({ day }, ref) {
                  const onClick = () => { console.log(ref.current) };
                  return <div ref={ref}>{day}</div>;
              }
          )
      );
    `,
    tsx`
      import { useContext } from "react"
      const App = (props) => {
          const foo = useContext(aContext)
          return <div>{foo.test}</div>
      }
    `,
    // https://github.com/Rel1cx/eslint-react/issues/1416
    tsx`
      type DeliveryNoteCheck = (data: { supplierCompany: string | null }) => string | null;

      const deliveryNoteChecks: DeliveryNoteCheck[] = [
        (data) => {
          if (!data.supplierCompany) return null;
          return "Check for supplier company passed.";
        },
      ];
    `,
    tsx`
      const App = ({ title, description, meta }) => {
        return (
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <span>{meta.tags.join(', ')}</span>
          </div>
        )
      }
    `,
    tsx`
      const UserProfile = ({ user }) => {
        const { avatar, name, bio } = user
        return (
          <div>
            <img src={avatar} alt={name} />
            <h2>{name}</h2>
            <p>{bio}</p>
          </div>
        )
      }
    `,
    tsx`
      const ProductCard = ({ product }) => {
        const { name, description, price, discountRate } = product
        const discount = price * discountRate
        return (
          <div>
            <h3>{name}</h3>
            <p>{description}</p>
            <span>\${price - discount}</span>
          </div>
        )
      }
    `,
    tsx`
      const Component = ({ data = {} }) => {
        const { user = {} } = data
        return (
          <div>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        )
      }
    `,
    tsx`
      const Form = ({ onSubmit, values }) => {
        const { username, password } = values
        return (
          <form onSubmit={() => onSubmit(values)}>
            <input value={username} onChange={() => {}} />
            <input value={password} onChange={() => {}} />
          </form>
        )
      }
    `,
    tsx`
      const List = ({ items }) => {
        return (
          <ul>
            {items.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        )
      }
    `,
    tsx`
      const Modal = (props) => {
        const { isOpen, onClose, children } = props
        if (!isOpen) return null
        return (
          <div className="modal">
            <button onClick={onClose}>Close</button>
            {children}
          </div>
        )
      }
    `,
    tsx`
      const Table = (props) => {
        const { data, columns } = props
        return (
          <table>
            <thead>
              <tr>
                {columns.map(({ key, title }) => <th key={key}>{title}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>
                  {columns.map(({ key }) => <td key={key}>{row[key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    `,
    tsx`
      const Component = (props) => {
        const { className, ...restProps } = props
        return <div className={className} {...restProps} />
      }
    `,
    tsx`
      const Component = ({ data: { user, settings } }) => {
        return (
          <div>
            <span>{user.name}</span>
            <span>{settings.theme}</span>
          </div>
        )
      }
    `,
    tsx`
      const Component = ({ user = { name: 'Anonymous' } }) => {
        return <div>Hello, {user.name}</div>
      }
    `,
    tsx`
      const Component = ({ isLoading, data }) => {
        if (isLoading) return <div>Loading...</div>
        return <div>{data.result}</div>
      }
    `,
    tsx`
      const Component = ({ onClick, item }) => {
        return (
          <button onClick={() => onClick(item.id)}>
            {item.label}
          </button>
        )
      }
    `,
    tsx`
      interface Props<T> {
        data: T[]
        renderItem: (item: T) => React.ReactNode
      }

      const GenericList = <T,>({ data, renderItem }: Props<T>) => {
        return (
          <div>
            {data.map((item, index) => (
              <div key={index}>{renderItem(item)}</div>
            ))}
          </div>
        )
      }
    `,
    tsx`
      const Component = ({ items, filter }) => {
        const filteredItems = useMemo(() => {
          return items.filter(item => item.category === filter)
        }, [items, filter])

        return (
          <div>
            {filteredItems.map(item => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        )
      }
    `,
    tsx`
      const Component = ({ userId }) => {
        const { user, setUser } = useContext(UserContext)
        const isCurrentUser = user.id === userId

        return (
          <div>
            <span>{isCurrentUser ? 'You' : 'Other user'}</span>
          </div>
        )
      }
    `,
    tsx`
      const Component = (props) => {
        const { type } = props
        if (type === 'admin') {
          const { adminOnlyProp } = props
          return <div>Admin: {adminOnlyProp}</div>
        }
        return <div>Regular user</div>
      }
    `,
    tsx`
      const Component = (props, context) => {
        const { theme } = context
        const { title, content } = props
        return (
          <div className={theme}>
            <h1>{title}</h1>
            <p>{content}</p>
          </div>
        )
      }
    `,
    tsx`
      const useUserData = (userId) => {
        const [user, setUser] = useState(null)
        // ... logic
        return { user, setUser }
      }

      const Component = ({ userId }) => {
        const { user } = useUserData(userId)
        return user ? <div>{user.name}</div> : null
      }
    `,
  ],
});
