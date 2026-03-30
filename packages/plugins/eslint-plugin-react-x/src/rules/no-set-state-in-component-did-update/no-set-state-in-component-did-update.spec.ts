import tsx from "dedent";

import { ruleTester } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-did-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Basic case - direct setState in componentDidUpdate
    {
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
    // Anonymous class expression
    {
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
    // Multiple setState calls in componentDidUpdate
    {
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
    // setState with functional update form
    {
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
  ],
  valid: [
    // Nested class component (setState in inner class)
    tsx`
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
    // setState in callback within componentDidUpdate
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          fetchData().then(() => {
            this.setState({ foo: "bar" });
          });
        }
      }
    `,
    // setState in async function within componentDidUpdate
    tsx`
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
    // setState in nested function
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          function inner() {
            this.setState({ foo: "bar" });
          }
          inner.call(this);
        }
      }
    `,
    // setState in event handler defined in componentDidUpdate
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          const handleClick = () => {
            this.setState({ clicked: true });
          };
          document.addEventListener("click", handleClick);
        }
      }
    `,
    // setState in other lifecycle method (componentDidMount)
    tsx`
      class Foo extends React.Component {
        componentDidMount() {
          this.setState({ foo: "bar" });
        }
      }
    `,
    // setState in other lifecycle method (componentWillMount)
    tsx`
      class Foo extends React.Component {
        UNSAFE_componentWillMount() {
          this.setState({ foo: "bar" });
        }
      }
    `,
    // setState in custom method (not lifecycle)
    tsx`
      class Foo extends React.Component {
        handleClick() {
          this.setState({ clicked: true });
        }
      }
    `,
    // No setState call
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          console.log("updated");
        }
      }
    `,
    // Function component (no class)
    tsx`
      function Foo() {
        useEffect(() => {
          console.log("updated");
        }, []);
        return <div />;
      }
    `,
    // setState in setTimeout callback
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          setTimeout(() => {
            this.setState({ foo: "bar" });
          }, 1000);
        }
      }
    `,
    // setState in setInterval callback
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          setInterval(() => {
            this.setState({ foo: "bar" });
          }, 1000);
        }
      }
    `,
    // setState in Promise chain
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          Promise.resolve()
            .then(() => {
              this.setState({ foo: "bar" });
            });
        }
      }
    `,
    // Arrow function in conditional
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
          const callback = this.props.onUpdate || (() => {});
          callback(() => {
            this.setState({ foo: "bar" });
          });
        }
      }
    `,
  ],
});
