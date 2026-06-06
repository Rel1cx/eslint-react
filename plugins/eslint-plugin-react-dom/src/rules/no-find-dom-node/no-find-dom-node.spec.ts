import tsx from "dedent";

import { ruleTester } from "#/test";
import rule, { RULE_NAME } from "./no-find-dom-node";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        import ReactDOM from "react-dom";

        export const Component = () => {
          ReactDOM.findDOMNode();
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        import { findDOMNode } from "react-dom";

        export const Component = () => {
          findDOMNode();
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },

    {
      code: tsx`
        var Hello = createReactClass({
          componentDidMount: function() {
            React.findDOMNode(this).scrollIntoView();
          },
          render: function() {
            return <div>Hello</div>;
          }
        });
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        var Hello = createReactClass({
          componentDidMount: function() {
            ReactDOM.findDOMNode(this).scrollIntoView();
          },
          render: function() {
            return <div>Hello</div>;
          }
        });
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        class Hello extends Component {
          componentDidMount() {
            findDOMNode(this).scrollIntoView();
          }
          render() {
            return <div>Hello</div>;
          }
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      code: tsx`
        class Hello extends Component {
          componentDidMount() {
            this.node = findDOMNode(this);
          }
          render() {
            return <div>Hello</div>;
          }
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // In conditional expression
    {
      code: tsx`
        const node = condition ? findDOMNode(this) : null;
      `,
      errors: [{ messageId: "default" }],
    },
    // In return statement
    {
      code: tsx`
        function getNode() {
          return findDOMNode(this);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Passed as argument
    {
      code: tsx`
        doSomething(findDOMNode(this));
      `,
      errors: [{ messageId: "default" }],
    },
    // Chained call
    {
      code: tsx`
        findDOMNode(this).focus();
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    // Variable named findDOMNode but not called
    {
      code: tsx`
        const findDOMNode = 1;
        console.log(findDOMNode);
      `,
    },
    // Different identifier
    {
      code: tsx`
        myFindDOMNode(this);
      `,
    },
    // String property access (not detected)
    {
      code: tsx`
        const obj = { findDOMNode: () => {} };
        obj["findDOMNode"]();
      `,
    },
  ],
});
