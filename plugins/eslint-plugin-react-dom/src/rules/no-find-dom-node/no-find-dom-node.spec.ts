import tsx from "dedent";

import { ruleTester } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-find-dom-node";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
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
    // Chained call
    {
      code: tsx`
        findDOMNode(this).focus();
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
        import ReactDOM from "react-dom";

        export const Component = () => {
          ReactDOM.findDOMNode();
        };
      `,
      errors: [
        { messageId: "default" },
      ],
    },
    // Ported from https://github.com/oxc-project/oxc/issues/22468
    // oxlint's react plugin rules only ran on JSX-capable files (.tsx), so this
    // .ts file was never checked; our rule has no file-type gating and reports
    // the violation regardless of the filename
    {
      code: tsx`
        import React from "react";
        import ReactDOM from "react-dom";

        class Demo extends React.Component {
          foo() {
            ReactDOM.findDOMNode(this);
          }
        }
      `,
      errors: [
        { messageId: "default" },
      ],
      filename: "demo.ts",
    },
  ],
  valid: [
    // Different identifier
    {
      code: tsx`
        myFindDOMNode(this);
      `,
    },
    // Computed property access is not statically resolved
    {
      code: tsx`
        const obj = { findDOMNode: () => {} };
        obj["findDOMNode"]();
      `,
    },
    // Variable named findDOMNode but not called
    {
      code: tsx`
        const findDOMNode = 1;
        console.log(findDOMNode);
      `,
    },
  ],
});
