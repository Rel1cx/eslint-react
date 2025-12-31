import tsx from "dedent";
import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-react-member-access";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`const [state, setState] = React.useState(0);`,
      errors: [{ messageId: "noReactMemberAccess", data: { member: "React.useState" } }],
    },
    {
      code: tsx`const ref = React.useRef(null);`,
      errors: [{ messageId: "noReactMemberAccess", data: { member: "React.useRef" } }],
    },
    {
      code: tsx`
        function Foo() {
          const [count, setCount] = React.useState(10);
          const myRef = React.useRef(null);
        }
      `,
      errors: [
        { messageId: "noReactMemberAccess", data: { member: "React.useState" } },
        { messageId: "noReactMemberAccess", data: { member: "React.useRef" } },
      ],
    },
    {
      code: tsx`class MyComp extends React.Component {}`,
      errors: [{ messageId: "noReactMemberAccess", data: { member: "React.Component" } }],
    },
    {
      code: tsx`const ctx = React.createContext({});`,
      errors: [{ messageId: "noReactMemberAccess", data: { member: "React.createContext" } }],
    },
    {
      code: tsx`React.cloneElement(<div />);`,
      errors: [{ messageId: "noReactMemberAccess", data: { member: "React.cloneElement" } }],
    },
    {
      code: tsx`React.memo(MyComponent);`,
      errors: [{ messageId: "noReactMemberAccess", data: { member: "React.memo" } }],
    },
    {
      code: tsx`React.forwardRef(() => {});`,
      errors: [{ messageId: "noReactMemberAccess", data: { member: "React.forwardRef" } }],
    },
  ],
  valid: [
    tsx`
      import { useState, useRef, createContext, cloneElement, memo, forwardRef } from "react";
      const [state, setState] = useState(0);
      const ref = useRef(null);
      const ctx = createContext({});
      cloneElement(<div />);
      memo(MyComponent);
      forwardRef(() => {});
    `,
    tsx`
      const someValue = 123;
      console.log(someValue);
    `,
    tsx`
      const ReactLike = { useState: () => {} };
      ReactLike.useState();
    `,
    tsx`
      const obj = { foo: () => {} };
      obj.foo();
    `,
  ],
});
