import tsx from "dedent";
import { ruleTester } from "../../../../../test";
import rule, { RULE_NAME } from "./no-react-hook-member-access";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`React.useActionState();`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useActionState" } }],
    },
    {
      code: tsx`React.useCallback(() => {});`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useCallback" } }],
    },
    {
      code: tsx`React.useContext(MyContext);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useContext" } }],
    },
    {
      code: tsx`React.useDebugValue(value);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useDebugValue" } }],
    },
    {
      code: tsx`React.useDeferredValue(value);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useDeferredValue" } }],
    },
    {
      code: tsx`React.useEffect(() => {});`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useEffect" } }],
    },
    {
      code: tsx`React.useId();`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useId" } }],
    },
    {
      code: tsx`React.useImperativeHandle(ref, () => ({}));`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useImperativeHandle" } }],
    },
    {
      code: tsx`React.useInsertionEffect(() => {});`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useInsertionEffect" } }],
    },
    {
      code: tsx`React.useLayoutEffect(() => {});`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useLayoutEffect" } }],
    },
    {
      code: tsx`React.useMemo(() => 1, []);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useMemo" } }],
    },
    {
      code: tsx`React.useOptimistic(state, () => state);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useOptimistic" } }],
    },
    {
      code: tsx`React.useReducer(reducer, initialState);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useReducer" } }],
    },
    {
      code: tsx`React.useRef(null);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useRef" } }],
    },
    {
      code: tsx`React.useState(0);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useState" } }],
    },
    {
      code: tsx`React.useSyncExternalStore(subscribe, getSnapshot);`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useSyncExternalStore" } }],
    },
    {
      code: tsx`React.useTransition();`,
      errors: [{ messageId: "noReactHookMemberAccess", data: { member: "React.useTransition" } }],
    },
  ],

  valid: [
    tsx`
      import {
        useActionState,
        useCallback,
        useContext,
        useDebugValue,
        useDeferredValue,
        useEffect,
        useId,
        useImperativeHandle,
        useInsertionEffect,
        useLayoutEffect,
        useMemo,
        useOptimistic,
        useReducer,
        useRef,
        useState,
        useSyncExternalStore,
        useTransition,
      } from "react";

      useActionState();
      useCallback(() => {});
      useContext(MyContext);
      useDebugValue(value);
      useDeferredValue(value);
      useEffect(() => {});
      useId();
      useImperativeHandle(ref, () => ({}));
      useInsertionEffect(() => {});
      useLayoutEffect(() => {});
      useMemo(() => 1, []);
      useOptimistic(state, () => state);
      useReducer(reducer, initialState);
      useRef(null);
      useState(0);
      useSyncExternalStore(subscribe, getSnapshot);
      useTransition();
    `,

    tsx`
      React.memo(Component);
      React.forwardRef(() => {});
      class MyComponent extends React.Component {}
      const ctx = React.createContext({});
      React.cloneElement(<div />);
    `,

    tsx`
      const ReactLike = {
        useState() {},
        useEffect() {},
      };

      ReactLike.useState();
      ReactLike.useEffect();
    `,

    tsx`
      React["useState"]();
      React["useEffect"]();
    `,

    tsx`
      const obj = {
        useState() {},
      };

      obj.useState();
    `,

    tsx`
      const value = 123;
      console.log(value);
    `,
  ],
});
