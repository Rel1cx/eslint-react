import tsx from "dedent";

import { allValid, ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-forbidden-props";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    // Default behavior - snake_case props are forbidden
    {
      code: tsx`
        <div snake_case="value" />
      `,
      errors: [{ messageId: "default", data: { name: "snake_case" } }],
    },
    {
      code: tsx`
        <Component user_name="test" />
      `,
      errors: [{ messageId: "default", data: { name: "user_name" } }],
    },
    // String-based forbidden props
    {
      code: tsx`
        <div className="test" />
      `,
      errors: [{ messageId: "default", data: { name: "className" } }],
      options: [{ forbid: ["className"] }],
    },
    // Regex-based forbidden props
    {
      code: tsx`
        <div data-testid="test" />
      `,
      errors: [{ messageId: "default", data: { name: "data-testid" } }],
      options: [{ forbid: [{ prop: "/^data-/" }] }],
    },
    // Node-specific exclusions - should still fail for non-excluded nodes
    {
      code: tsx`
        <div snake_case="value" />
      `,
      errors: [{ messageId: "default", data: { name: "snake_case" } }],
      options: [{
        forbid: [{
          excludedNodes: ["Button"],
          prop: "/_/",
        }],
      }],
    },
    // Node-specific inclusions
    {
      code: tsx`
        <Button snake_case="value" />
      `,
      errors: [{ messageId: "default", data: { name: "snake_case" } }],
      options: [{
        forbid: [{
          includedNodes: ["Button"],
          prop: "/_/",
        }],
      }],
    },
    // Multiple forbidden props
    {
      code: tsx`
        <div className="test" style={{}} />
      `,
      errors: [
        { messageId: "default", data: { name: "className" } },
        { messageId: "default", data: { name: "style" } },
      ],
      options: [{ forbid: ["className", "style"] }],
    },
    // Mixed string and object configurations
    {
      code: tsx`
        <div className="test" data-testid="test" />
      `,
      errors: [
        { messageId: "default", data: { name: "className" } },
        { messageId: "default", data: { name: "data-testid" } },
      ],
      options: [{
        forbid: [
          "className",
          { excludedNodes: ["Button"], prop: "/^data-/" },
        ],
      }],
    },
    // Namespaced JSX elements
    {
      code: tsx`
        <ns:Element snake_case="value" />
      `,
      errors: [{ messageId: "default", data: { name: "snake_case" } }],
    },
    // JSXMemberExpression - should still be checked for forbidden props
    {
      code: tsx`
        <React.Component snake_case="value" />
      `,
      errors: [{ messageId: "default", data: { name: "snake_case" } }],
    },
  ],
  valid: [
    ...allValid,
    // Default behavior - camelCase props are allowed
    tsx`
      <div camelCase="value" />
    `,
    tsx`
      <Component userName="test" />
    `,
    // String-based forbidden props - other props allowed
    {
      code: tsx`
        <div id="test" />
      `,
      options: [{ forbid: ["className"] }],
    },
    {
      code: tsx`
        <Component id="test" />
      `,
      options: [{ forbid: ["style"] }],
    },
    // Regex-based forbidden props - non-matching props allowed
    {
      code: tsx`
        <div id="test" />
      `,
      options: [{ forbid: [{ prop: "/^data-/" }] }],
    },
    {
      code: tsx`
        <div className="test" />
      `,
      options: [{ forbid: [{ prop: "/^aria-/" }] }],
    },
    // Node-specific exclusions - excluded nodes should be allowed
    {
      code: tsx`
        <Button snake_case="value" />
      `,
      options: [{
        forbid: [{
          excludedNodes: ["Button"],
          prop: "/_/",
        }],
      }],
    },
    // Node-specific inclusions - other nodes allowed
    {
      code: tsx`
        <div snake_case="value" />
      `,
      options: [{
        forbid: [{
          includedNodes: ["Button"],
          prop: "/_/",
        }],
      }],
    },

    // Complex nested structures
    {
      code: tsx`
        <div>
          <span className="test" />
        </div>
      `,
      options: [{ forbid: ["style"] }],
    },
  ],
});
