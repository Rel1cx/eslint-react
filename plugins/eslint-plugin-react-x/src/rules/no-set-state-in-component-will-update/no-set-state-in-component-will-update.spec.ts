import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-set-state-in-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "direct setState in componentWillUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
            this.setState({ foo: "bar" });
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "multiple setState calls in componentWillUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
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
          componentWillUpdate() {
            this.setState((prevState) => ({ count: prevState.count + 1 }));
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      name: "setState in anonymous class expression",
      code: tsx`
        const Foo = class extends React.Component {
          componentWillUpdate() {
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
      name: "no setState call in componentWillUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
            console.log("will update");
          }
        }
      `,
    },
    {
      name: "function component without class",
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
      name: "setState in callback within componentWillUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
            fetchData().then(() => {
              this.setState({ foo: "bar" });
            });
          }
        }
      `,
    },
    {
      name: "setState in async function within componentWillUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
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
      name: "setState in promise chain",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
            Promise.resolve()
              .then(() => {
                this.setState({ foo: "bar" });
              });
          }
        }
      `,
    },
    {
      name: "setState in setTimeout callback",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
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
          componentWillUpdate() {
            setInterval(() => {
              this.setState({ foo: "bar" });
            }, 1000);
          }
        }
      `,
    },
    {
      name: "setState in event handler defined in componentWillUpdate",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
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
          componentWillUpdate() {
            function inner() {
              this.setState({ foo: "bar" });
            }
            inner.call(this);
          }
        }
      `,
    },
    {
      name: "setState in componentWillUpdate of nested class",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
            class Bar extends Baz {
              componentWillUpdate() {
                this.setState({ foo: "bar" });
              }
            }
          }
        }
      `,
    },
    {
      name: "setState in arrow function passed to conditional callback",
      code: tsx`
        class Foo extends React.Component {
          componentWillUpdate() {
            const callback = this.props.onUpdate || (() => {});
            callback(() => {
              this.setState({ foo: "bar" });
            });
          }
        }
      `,
    },
  ],
});
