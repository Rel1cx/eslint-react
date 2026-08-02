import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-set-state-in-component-did-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "direct setState in componentDidUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "setState with functional update form",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            this.setState((prevState) => ({ count: prevState.count + 1 }));
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "multiple setState calls in componentDidUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            this.setState({ foo: "bar" });
            this.setState({ baz: "qux" });
          }
        }
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "anonymous class expression",
      code: tsx`
        const Foo = class extends React.Component {
          componentDidUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
  ],
  valid: [
    {
      name: "no setState call",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            console.log("updated");
          }
        }
      `,
    },
    {
      name: "function component",
      code: tsx`
        function Foo() {
          useEffect(() => {
            console.log("updated");
          }, []);
          return <div />;
        }
      `,
    },
    {
      name: "setState in componentDidMount",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            this.setState({ foo: "bar" });
          }
        }
      `,
    },
    {
      name: "setState in UNSAFE_componentWillMount",
      code: tsx`
        class Foo extends React.Component {
          UNSAFE_componentWillMount() {
            this.setState({ foo: "bar" });
          }
        }
      `,
    },
    {
      name: "setState in custom method",
      code: tsx`
        class Foo extends React.Component {
          handleClick() {
            this.setState({ clicked: true });
          }
        }
      `,
    },
    {
      name: "setState in callback within componentDidUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            fetchData().then(() => {
              this.setState({ foo: "bar" });
            });
          }
        }
      `,
    },
    {
      name: "setState in async function within componentDidUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            const loadData = async () => {
              await fetchData();
              this.setState({ foo: "bar" });
            };
            loadData();
          }
        }
      `,
    },
    {
      name: "setState in Promise chain",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            Promise.resolve()
              .then(() => {
                this.setState({ foo: "bar" });
              });
          }
        }
      `,
    },
    {
      name: "setState in event handler defined in componentDidUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            const handleClick = () => {
              this.setState({ clicked: true });
            };
            document.addEventListener("click", handleClick);
          }
        }
      `,
    },
    {
      name: "setState in setTimeout callback",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            setTimeout(() => {
              this.setState({ foo: "bar" });
            }, 1000);
          }
        }
      `,
    },
    {
      name: "setState in setInterval callback",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            setInterval(() => {
              this.setState({ foo: "bar" });
            }, 1000);
          }
        }
      `,
    },
    {
      name: "setState in nested function",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            function inner() {
              this.setState({ foo: "bar" });
            }
            inner.call(this);
          }
        }
      `,
    },
    {
      name: "arrow function in conditional",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            const callback = this.props.onUpdate || (() => {});
            callback(() => {
              this.setState({ foo: "bar" });
            });
          }
        }
      `,
    },
    {
      name: "setState in nested class component",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
            class Bar extends Baz {
              componentDidUpdate() {
                this.setState({ foo: "bar" });
              }
            }
          }
        }
      `,
    },
  ],
});
