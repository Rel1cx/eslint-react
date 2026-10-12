import tsx from "dedent";

import { ruleTesterWithTypes } from "@local/testkit";
import rule, { RULE_NAME } from "./no-unused-props";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      // interface type and direct destructuring
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component({ abc }: Props) {
          return null;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // interface type and later destructuring
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          const { abc } = props;
          return null;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // named type and direct destructuring
      code: tsx`
        type Props = {
          abc: string;
          hello: string;
        }

        function Component({ abc }: Props) {
          return null;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // named type and later destructuring
      code: tsx`
        type Props = {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          const { abc } = props;
          return null;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // computed member access with a string literal key counts as usage of that prop only
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          return <div>{props["abc"]}</div>;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // destructuring with a string literal key counts as usage of that prop only
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          const { "abc": abc } = props;
          return <div>{abc}</div>;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // inline type and direct destructuring
      code: tsx`
        function Component({ abc }: { abc: string; hello: string; }) {
          return null;
        }
      `,
      errors: [{
        column: 44,
        data: {
          name: "hello",
        },
        endColumn: 49,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // inline type and later destructuring
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          const { abc } = props;
          return null;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // multiple properties unused
      code: tsx`
        function Component({ }: { abc: string; hello: string; }) {
          return null;
        }
      `,
      errors: [{
        column: 27,
        data: {
          name: "abc",
        },
        endColumn: 30,
        endLine: 1,
        line: 1,
        messageId: "default",
      }, {
        column: 40,
        data: {
          name: "hello",
        },
        endColumn: 45,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // track assignment
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          const abc = props.abc;
          return <div>{abc}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // track computed member access
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          return <div>{props["abc"]}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // track uses of properties on rest element
      code: tsx`
        function Component({ ...rest }: { abc: string; hello: string; }) {
          return <div>{rest.abc}</div>;
        }
      `,
      errors: [{
        column: 48,
        data: {
          name: "hello",
        },
        endColumn: 53,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // track uses of properties on rest element
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          const { ...rest } = props;
          return <div>{rest.abc}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // prop used via type assertion should still detect unused prop
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          return <div>{(props as any).abc}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // access of sub property should mark property as used
      code: tsx`
        function Component({ hello: { subHello } }: { abc: string; hello: { abc: string; subHello: number | null }; }) {
          return null;
        }
      `,
      errors: [{
        column: 47,
        data: {
          name: "abc",
        },
        endColumn: 50,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // correct error span on complex prop type
      code: tsx`
        function Component({ abc }: { abc: string; hello: { abc: string; subHello: number | null }; }) {
          return null;
        }
      `,
      errors: [{
        column: 44,
        data: {
          name: "hello",
        },
        endColumn: 49,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // interface extends
      code: tsx`
        interface PropsBase {
          used1: string;
          abc: string;
        }

        interface Props extends PropsBase {
          used2: string;
          hello: string;
        }

        function Component({ used1, used2 }: Props) {
          return null;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "abc",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
        messageId: "default",
      }, {
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 8,
        line: 8,
        messageId: "default",
      }],
    },
    {
      // interface augmentation
      code: tsx`
        interface Props {
          used1: string;
          abc: string;
        }

        interface Props {
          used2: string;
          hello: string;
        }

        function Component({ used1, used2 }: Props) {
          return null;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "abc",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
        messageId: "default",
      }, {
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 8,
        line: 8,
        messageId: "default",
      }],
    },
    {
      // interface intersection
      code: tsx`
        interface Props1 {
          used1: string;
          abc: string;
        }

        interface Props2 {
          used2: string;
          hello: string;
        }

        function Component({ used1, used2 }: Props1 & Props2) {
          return null;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "abc",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
        messageId: "default",
      }, {
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 8,
        line: 8,
        messageId: "default",
      }],
    },
    {
      // expect no false negatives when using PropsWithChildren
      code: tsx`
        import { PropsWithChildren } from 'react';

        type ButtonProps = {
          backgroundColor : string;
          onClick: () => void;
        };

        const Button = ({ backgroundColor }: PropsWithChildren<ButtonProps>) => {
          return (
            <button style={{ backgroundColor: backgroundColor }} />
          );
        };
      `,
      errors: [{
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
        messageId: "default",
      }],
    },
    {
      // expect no false negatives when using PropsWithChildren
      code: tsx`
        import { PropsWithChildren } from 'react';

        type ButtonProps = PropsWithChildren<{
          backgroundColor : string;
          onClick: () => void;
        }>;

        const Button = ({ backgroundColor }: ButtonProps) => {
          return (
            <button style={{ backgroundColor: backgroundColor }} />
          );
        };
      `,
      errors: [{
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
        messageId: "default",
      }],
    },
    {
      // expect no false negatives when using PropsWithChildren
      code: tsx`
        import { PropsWithChildren } from 'react';

        type ButtonProps = {
          backgroundColor : string;
          onClick: () => void;
        };

        const Button = ({ backgroundColor }: ButtonProps & PropsWithChildren) => {
          return (
            <button style={{ backgroundColor: backgroundColor }} />
          );
        };
      `,
      errors: [{
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
        messageId: "default",
      }],
    },
    {
      // expect no false negatives when using PropsWithChildren
      code: tsx`
        import { PropsWithChildren } from 'react';

        type ButtonProps = {
          backgroundColor : string;
          onClick: () => void;
        } & PropsWithChildren;

        const Button = ({ backgroundColor }: ButtonProps) => {
          return (
            <button style={{ backgroundColor: backgroundColor }} />
          );
        };
      `,
      errors: [{
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
        messageId: "default",
      }],
    },
    {
      // expect no false negatives when using forwardRef
      code: tsx`
        import * as React from 'react'
        interface ComponentProps {
          foo: string;
        }
        const Component = React.forwardRef<HTMLElement, ComponentProps>(function Component(props, ref) {
          return <div ref={ref} />;
        });
      `,
      errors: [{
        column: 3,
        data: {
          name: "foo",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // Boundary: optional chaining member access marks the prop as used
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          return <div>{props?.abc}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // Boundary: non-null assertion wrapper is unwrapped, the prop access counts as usage
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          return <div>{props!.abc}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // Boundary: satisfies expression wrapper is unwrapped, the prop access counts as usage
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          return <div>{(props satisfies { abc: string; hello: string; }).abc}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // Boundary: destructuring with a default value still counts as usage of that prop
      code: tsx`
        function Component({ abc = "a" }: { abc: string; hello: string; }) {
          return <div>{abc}</div>;
        }
      `,
      errors: [{
        column: 50,
        data: {
          name: "hello",
        },
        endColumn: 55,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // Boundary: later destructuring through a type assertion on the props object
      code: tsx`
        interface Props {
          abc: string;
          hello: string;
        }

        function Component(props: Props) {
          const { abc } = props as Props;
          return <div>{abc}</div>;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // destructured parameter with a default value is unwrapped and tracked
      code: tsx`
        function Component({ abc }: { abc: string; hello: string; } = { abc: "", hello: "" }) {
          return null;
        }
      `,
      errors: [{
        data: {
          name: "hello",
        },
        messageId: "default",
      }],
    },
    {
      // props parameter with a default value is unwrapped and tracked
      code: tsx`
        function Component(props: { abc: string; hello: string; } = { abc: "", hello: "" }) {
          return <div>{props.abc}</div>;
        }
      `,
      errors: [{
        data: {
          name: "hello",
        },
        messageId: "default",
      }],
    },
    {
      // props aliased to another variable is tracked through the alias
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          const p = props;
          return <div>{p.abc}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // template literal without substitutions is a static key and counts as usage
      code: tsx`
        function Component(props: { abc: string; hello: string; }) {
          return <div>{props[\`abc\`]}</div>;
        }
      `,
      errors: [{
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    {
      // Boundary: two components sharing the same props declaration produce a single report
      // per unused prop (declarations are deduplicated by declaration node, not by symbol)
      code: tsx`
        interface Props {
          foo: string;
          hello: string;
        }

        function Component1({ foo }: Props) {
          return <div>{foo}</div>;
        }

        function Component2({ foo }: Props) {
          return <div>{foo}</div>;
        }
      `,
      errors: [{
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
        messageId: "default",
      }],
    },
    {
      // Boundary: a non-computed member property named like the parameter is not a
      // reference to it, so the parameter has no tracked uses and the prop is reported
      code: tsx`
        function Component(props: { foo: string }) {
          return <div>{wrapper.props}</div>;
        }
      `,
      errors: [{
        column: 29,
        data: {
          name: "foo",
        },
        endColumn: 32,
        endLine: 1,
        line: 1,
        messageId: "default",
      }],
    },
    // TODO: Should we report unused ref prop?
    // {
    //   // expect no false negatives when using ref as a prop
    //   code: tsx`
    //     import * as React from 'react'
    //     interface ComponentProps {
    //       foo: string;
    //     }
    //     const Component = function Component({ ref, ...props }: ComponentProps & { ref?: React.RefObject<HTMLElement | null> }) {
    //       return <div>{props.foo}</div>;
    //     };
    //   `,
    //   errors: [{
    //     messageId: "default",
    //     data: {
    //       name: "ref",
    //     },
    //   }],
    // },
  ],
  valid: [
    // all props are used
    tsx`
      interface Props {
        abc: string;
        hello: string;
      }

      function Component({ abc, hello }: Props) {
        return null;
      }
    `,
    // all props are used
    tsx`
      interface Props {
        abc: string;
        hello: string;
      }

      function Component(props: Props) {
        const { abc, hello } = props;
        return null;
      }
    `,
    // all props are used
    tsx`
      type Props = {
        abc: string;
        hello: string;
      }

      function Component({ abc, hello }: Props) {
        return null;
      }
    `,
    // all props are used
    tsx`
      type Props = {
        abc: string;
        hello: string;
      }

      function Component(props: Props) {
        const { abc, hello } = props;
        return null;
      }
    `,
    // all props are used
    tsx`
      function Component({ abc, hello }: { abc: string; hello: string; }) {
        return null;
      }
    `,
    // all props are used
    tsx`
      function Component(props: { abc: string; hello: string; }) {
        const { abc, hello } = props;
        return null;
      }
    `,
    // all props are used
    tsx`
      function Component({ abc: abc2, hello: hello2 }: { abc: string; hello: string; }) {
        return null;
      }
    `,
    // one value used in jsx, the other in effect
    tsx`
      import { useEffect } from "react";

      function Component({ abc, hello }: { abc: string; hello: string }) {
        useEffect(() => {
          console.log(hello);
        }, []);
        return <div>{abc}</div>;
      }
    `,
    // props used inside nested function
    tsx`
      function Component(props: { abc: string; hello: string }) {
        function inner() {
          return props.hello;
        }
        return props.abc;
      }
    `,
    // props used conditionally
    tsx`
      function Component(props: { abc: string; hello: string }) {
        if (Math.random() > 0.5) {
          return <div>{props.abc}</div>;
        }
        return <div>{props.hello}</div>;
      }
    `,
    // props are used by two components each accessing one prop
    tsx`
      interface Props {
        abc: string;
        hello: string;
      }

      function Component1({ abc }: Props) {
        return null;
      }

      function Component2({ hello }: Props) {
        return null;
      }
    `,
    // props are used by two components each accessing a different part of it
    tsx`
      interface Props {
        foo: string;
        bar: string;
        baz: string;
      }

      function Component1({ foo, bar }: Props) {
        return <div>{foo}</div>;
      }

      function Component2({ bar, baz }: Props) {
        return <div>{bar}</div>;
      }
    `,
    // props accessed via type assertion
    tsx`
      function Component(props: { abc: string; hello: string }) {
        return <div>{(props as any).abc}{(props as any).hello}</div>;
      }
    `,
    // we can't track what happens to the props object
    tsx`
      import { Component2 } from "./component2";

      interface Props {
        abc: string;
        hello: string;
      }

      function Component(props: Props) {
        return <Component2 {...props} />;
      }
    `,
    // we can't track what happens to the props object
    tsx`
      import { anyFunction } from "./anyFunction";

      interface Props {
        abc: string;
        hello: string;
      }

      function Component(props: Props) {
        anyFunction(props);

        return null;
      }
    `,
    // we can't track what happens to the props object
    tsx`
      import { anyFunction } from "./anyFunction";

      interface Props {
        abc: string;
        hello: string;
      }

      function Component(props: Props) {
        anyFunction({ props });

        return null;
      }
    `,
    // we can't track what happens to the rest object
    tsx`
      import { anyFunction } from "./anyFunction";

      function Component({ abc, ...rest }: { abc: string; hello: string }) {
        anyFunction(rest);
        return null;
      }
    `,
    // we can't track what happens to the rest object
    tsx`
      import { anyFunction } from "./anyFunction";

      function Component(props: { abc: string; hello: string; }) {
        const { abc, ...rest } = props;
        anyFunction(rest);
        return null;
      }
    `,
    // expect no false positives when using PropsWithChildren
    tsx`
      import { PropsWithChildren } from 'react';

      type ButtonProps = {
        backgroundColor : string;
        onClick: () => void;
      };

      const Button = ({ backgroundColor, onClick, children }: PropsWithChildren<ButtonProps>) => {
        return (
          <button style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            {children}
          </button>
        );
      };
    `,
    // expect no false positives when using PropsWithChildren
    tsx`
      import { PropsWithChildren } from 'react';

      type ButtonProps = PropsWithChildren<{
        backgroundColor : string;
        onClick: () => void;
      }>;

      const Button = ({ backgroundColor, onClick, children }: ButtonProps) => {
        return (
          <button style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            {children}
          </button>
        );
      };
    `,
    // TODO: Should we report unused children prop when using PropsWithChildren? currently we don't
    tsx`
      import { PropsWithChildren } from 'react';

      type ButtonProps = {
        backgroundColor : string;
        onClick: () => void;
      };

      const Button = ({ backgroundColor, onClick }: PropsWithChildren<ButtonProps>) => {
        return (
          <button style={{ backgroundColor: backgroundColor }} onClick={onClick} />
        );
      };
    `,
    // TODO: Should we report unused children prop when using PropsWithChildren? currently we don't
    tsx`
      import { PropsWithChildren } from 'react';

      type ButtonProps = PropsWithChildren<{
        backgroundColor : string;
        onClick: () => void;
      }>;

      const Button = ({ backgroundColor, onClick }: ButtonProps) => {
        return (
          <button style={{ backgroundColor: backgroundColor }} onClick={onClick} />
        );
      };
    `,
    // expect no false positives when using forwardRef
    tsx`
      import * as React from 'react'
      interface ComponentProps {
        foo: string;
      }
      const Component = React.forwardRef<HTMLElement, ComponentProps>(function Component(props, ref) {
        return <div ref={ref}>{props.foo}</div>;
      });
    `,
    // expect no false positives when using ref as a prop
    tsx`
      import * as React from 'react'
      interface ComponentProps {
        foo: string;
      }
      const Component = function Component({ ref, ...props }: ComponentProps & { ref?: React.RefObject<HTMLElement | null> }) {
        return <div ref={ref}>{props.foo}</div>;
      };
    `,
    // no false positive when inner component reuses outer Props via Omit (both components present)
    tsx`
      type Props = {
        used: string;
        alsoUsed: string;
      };

      type InnerProps = Omit<Props, 'alsoUsed'>;

      function Inner({ used }: InnerProps) {
        return <div>{used}</div>;
      }

      export default function Outer({ used, alsoUsed }: Props) {
        return (
          <>
            <Inner used={used} />
            <span>{alsoUsed}</span>
          </>
        );
      }
    `,
    // no false positive when inner component uses Omit of a union type and only accesses a subset
    tsx`
      type BaseProps = {
        foo: string;
        bar: string;
        baz: string;
      };

      type PropsA = BaseProps & { title: string };
      type PropsB = BaseProps & { title?: never };
      type Props = PropsA | PropsB;

      function Outer({ title, foo, bar, baz }: Props) {
        return <div title={title}>{foo}{bar}{baz}</div>;
      }

      type InnerProps = Omit<Props, 'title' | 'baz'>;

      function Inner({ foo }: InnerProps) {
        return <div>{foo}</div>;
      }
    `,
    // no false positive for anonymous callbacks with typed parameters passed to regular function calls.
    // Without the fix, such callbacks (which return null) are incorrectly treated as components,
    // causing all unaccessed properties of their parameter type to be flagged as unused.
    tsx`
      type BatchRun = {
        id: string;
        label: string;
        status: string;
      };

      function runAll(runs: BatchRun[], callback: (run: BatchRun) => null | undefined) {
        runs.forEach(r => callback(r));
      }

      function Component({ runs }: { runs: BatchRun[] }) {
        runAll(runs, run => {
          void run.id;
          return null;
        });
        return <div />;
      }
    `,
    // Boundary: props identifier in non-MemberExpression/VariableDeclarator parent
    // (collectUsedPropKeysOfReference returns false, rule bails out — should not crash)
    tsx`
      function Component(props: { foo: string }) {
        doSomething(props);
        return null;
      }
    `,
    tsx`
      function Component(props: { foo: string }) {
        return props;
      }
    `,
    tsx`
      function Component(props: { foo: string }) {
        const items = [props];
        return null;
      }
    `,
    tsx`
      function Component(props: { foo: string }) {
        const x = props || {};
        return null;
      }
    `,
    // Boundary: computed member access with a string literal key counts as usage
    tsx`
      function Component(props: { foo: string }) {
        return <div>{props["foo"]}</div>;
      }
    `,
    // Boundary: computed member access with a numeric literal key is not a known prop key
    // (getKeyOfExpression returns null, rule bails out — no report even though 'foo' is unused)
    tsx`
      function Component(props: { foo: string }) {
        return <div>{props[0]}</div>;
      }
    `,
    // Boundary: computed member access with an identifier key is dynamic
    // (getKeyOfExpression returns null, rule bails out — 'foo' is actually used here)
    tsx`
      function Component(props: { foo: string }) {
        const key = "foo";
        return <div>{props[key]}</div>;
      }
    `,
    // Boundary: computed destructuring key is dynamic, rule bails out
    tsx`
      function Component(props: { foo: string }) {
        const key = "foo";
        const { [key]: value } = props;
        return <div>{value}</div>;
      }
    `,
    // Boundary: props aliased to another variable is tracked through the alias,
    // so using the alias's property counts as usage of the prop
    tsx`
      function Component(props: { foo: string }) {
        const p = props;
        return <div>{p.foo}</div>;
      }
    `,
    // Boundary: props alias used in an untrackable way causes a conservative bailout
    // (collectUsedPropKeysOfReference on the alias's reference returns false)
    tsx`
      import { anyFunction } from "./anyFunction";

      function Component(props: { foo: string }) {
        const p = props;
        anyFunction(p);
        return null;
      }
    `,
    // Boundary: template literal without substitutions is a static key and counts as usage
    tsx`
      function Component(props: { foo: string }) {
        return <div>{props[\`foo\`]}</div>;
      }
    `,
    // Boundary: numeric literal destructuring key is not a known prop key
    // (getKeyOfExpression returns null, rule bails out)
    tsx`
      function Component(props: { foo: string }) {
        const { 0: zero } = props;
        return <div>{zero}</div>;
      }
    `,
    // Boundary: props referenced as a computed member key (not the object) of a member
    // expression (parent.object !== valueNode, rule bails out)
    tsx`
      function Component(props: { foo: string }) {
        return <div>{wrapper[props]}</div>;
      }
    `,
    // Boundary: parameter with a default value (AssignmentPattern) is unwrapped,
    // so member access on it counts as usage
    tsx`
      function Component(props: { foo: string } = { foo: "" }) {
        return <div>{props.foo}</div>;
      }
    `,
    // Boundary: array pattern parameter is not an Identifier or ObjectPattern,
    // rule bails out without crashing
    tsx`
      function Component([foo]: [string]) {
        return <div>{foo}</div>;
      }
    `,
    // Boundary: component without parameters has no props to check
    tsx`
      function Component() {
        return <div />;
      }
    `,
    // Boundary: a component whose used keys cannot be fully determined marks all of its
    // declared props as used (conservative bailout), so a declaration shared with a fully
    // analyzable component is not reported either
    tsx`
      import { anyFunction } from "./anyFunction";

      interface Props {
        foo: string;
        hello: string;
      }

      function Component1(props: Props) {
        anyFunction(props);
        return null;
      }

      function Component2(props: Props) {
        return <div>{props.foo}</div>;
      }
    `,
  ],
});
