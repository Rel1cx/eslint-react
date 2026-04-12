import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-set-state-in-component-will-update";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Basic case - direct setState in componentWillUpdate
    {
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
    // Anonymous class expression
    {
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
    // Multiple setState calls in componentWillUpdate
    {
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
    // setState with functional update form
    {
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
  ],
  valid: [
    // Nested class component (setState in inner class)
    tsx`
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
    // setState in callback within componentWillUpdate
    tsx`
      class Foo extends React.Component {
        componentWillUpdate() {
          fetchData().then(() => {
            this.setState({ foo: "bar" });
          });
        }
      }
    `,
    // setState in async function within componentWillUpdate
    tsx`
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
    // setState in nested function
    tsx`
      class Foo extends React.Component {
        componentWillUpdate() {
          function inner() {
            this.setState({ foo: "bar" });
          }
          inner.call(this);
        }
      }
    `,
    // setState in event handler defined in componentWillUpdate
    tsx`
      class Foo extends React.Component {
        componentWillUpdate() {
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
    // setState in other lifecycle method (componentDidUpdate)
    tsx`
      class Foo extends React.Component {
        componentDidUpdate() {
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
        componentWillUpdate() {
          console.log("will update");
        }
      }
    `,
    // Function component (no class)
    tsx`
      function Foo() {
        useEffect(() => {
          console.log("mounted");
        }, []);
        return <div />;
      }
    `,
    // setState in setTimeout callback
    tsx`
      class Foo extends React.Component {
        componentWillUpdate() {
          setTimeout(() => {
            this.setState({ foo: "bar" });
          }, 1000);
        }
      }
    `,
    // setState in setInterval callback
    tsx`
      class Foo extends React.Component {
        componentWillUpdate() {
          setInterval(() => {
            this.setState({ foo: "bar" });
          }, 1000);
        }
      }
    `,
    // setState in Promise chain
    tsx`
      class Foo extends React.Component {
        componentWillUpdate() {
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
        componentWillUpdate() {
          const callback = this.props.onUpdate || (() => {});
          callback(() => {
            this.setState({ foo: "bar" });
          });
        }
      }
    `,
  ],
});
