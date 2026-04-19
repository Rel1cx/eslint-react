import tsx from "dedent";

import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./component-name";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function myComponent() {
          return <div />;
        }
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
    {
      code: tsx`
        function mycomponent() {
          return <div />;
        }
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
    {
      code: tsx`
        const myComponent = () => <div />;
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
    {
      code: tsx`
        const myComponent = () => {
          return <div />;
        };
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
    {
      code: tsx`
        const myComponent = function () {
          return <div />;
        };
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
    {
      code: tsx`
        const myComponent = function myComponent() {
          return <div />;
        };
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
    {
      code: tsx`
        function myComponent() {
          return (
            <div>
              <span />
            </div>
          );
        }
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
    {
      code: tsx`
        const myComponent = () => <></>;
      `,
      errors: [{ messageId: "invalidComponentName" }],
    },
  ],
  valid: [
    tsx`
      function MyComponent() {
        return <div />;
      }
    `,
    tsx`
      const MyComponent = () => <div />;
    `,
    tsx`
      const MyComponent = () => {
        return <div />;
      };
    `,
    tsx`
      const MyComponent = function () {
        return <div />;
      };
    `,
    tsx`
      const MyComponent = () => <></>;
    `,
    tsx`
      const useMyHook = () => <div />;
    `,
    tsx`
      function useMyHook() {
        return <div />;
      }
    `,
    tsx`
      function helper() {
        return "string";
      }
    `,
    tsx`
      const helper = () => 42;
    `,
    tsx`
      export default function () {
        return <div />;
      }
    `,
  ],
});
