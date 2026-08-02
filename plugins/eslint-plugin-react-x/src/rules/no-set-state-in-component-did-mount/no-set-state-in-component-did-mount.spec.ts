import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-set-state-in-component-did-mount";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "direct setState in componentDidMount",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "multiple setState calls in componentDidMount",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
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
      name: "setState with functional update form",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            this.setState((prevState) => ({ count: prevState.count + 1 }));
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "anonymous class expression",
      code: tsx`
        const Foo = class extends React.Component {
          componentDidMount() {
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
          componentDidMount() {
            console.log("mounted");
          }
        }
      `,
    },
    {
      name: "setState in componentDidUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentDidUpdate() {
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
      name: "setState in promise callback within componentDidMount",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            fetchData().then(() => {
              this.setState({ foo: "bar" });
            });
          }
        }
      `,
    },
    {
      name: "setState in async function within componentDidMount",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
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
      name: "setState in setTimeout callback",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            setTimeout(() => {
              this.setState({ foo: "bar" });
            }, 1000);
          }
        }
      `,
    },
    {
      name: "setState in promise chain",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            Promise.resolve()
              .then(() => {
                this.setState({ foo: "bar" });
              });
          }
        }
      `,
    },
    {
      name: "setState in event handler defined in componentDidMount",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            const handleClick = () => {
              this.setState({ clicked: true });
            };
            document.addEventListener("click", handleClick);
          }
        }
      `,
    },
    {
      name: "setState in nested function",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            function inner() {
              this.setState({ foo: "bar" });
            }
            inner.call(this);
          }
        }
      `,
    },
    {
      name: "setState in nested class component",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            class Bar extends Baz {
              componentDidMount() {
                this.setState({ foo: "bar" });
              }
            }
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
      name: "function component with no class",
      code: tsx`
        function Foo() {
          useEffect(() => {
            console.log("mounted");
          }, []);
          return <div />;
        }
      `,
    },
    {
      name: "arrow function in conditional",
      code: tsx`
        class Foo extends React.Component {
          componentDidMount() {
            const callback = this.props.onMount || (() => {});
            callback(() => {
              this.setState({ foo: "bar" });
            });
          }
        }
      `,
    },
  ],
});
