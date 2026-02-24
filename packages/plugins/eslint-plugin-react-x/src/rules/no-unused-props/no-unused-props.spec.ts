import tsx from "dedent";

import { ruleTesterWithTypes } from "../../../../../../test";
import rule, { RULE_NAME } from "./no-unused-props";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
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
        messageId: "default",
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
      }],
    },
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
        messageId: "default",
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
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
        messageId: "default",
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
      }],
    },
    {
      // interface type and direct destructuring
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
        messageId: "default",
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 3,
        line: 3,
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
        messageId: "default",
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 44,
        data: {
          name: "hello",
        },
        endColumn: 49,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 27,
        data: {
          name: "abc",
        },
        endColumn: 30,
        endLine: 1,
        line: 1,
      }, {
        messageId: "default",
        column: 40,
        data: {
          name: "hello",
        },
        endColumn: 45,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 3,
        data: {
          name: "abc",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
      }, {
        messageId: "default",
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 8,
        line: 8,
      }],
    },
    {
      // interface union
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
        messageId: "default",
        column: 3,
        data: {
          name: "abc",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
      }, {
        messageId: "default",
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 8,
        line: 8,
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
        messageId: "default",
        column: 3,
        data: {
          name: "abc",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
      }, {
        messageId: "default",
        column: 3,
        data: {
          name: "hello",
        },
        endColumn: 8,
        endLine: 8,
        line: 8,
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
        messageId: "default",
        column: 48,
        data: {
          name: "hello",
        },
        endColumn: 53,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 42,
        data: {
          name: "hello",
        },
        endColumn: 47,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 44,
        data: {
          name: "hello",
        },
        endColumn: 49,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 47,
        data: {
          name: "abc",
        },
        endColumn: 50,
        endLine: 1,
        line: 1,
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
        messageId: "default",
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
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
        messageId: "default",
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
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
        messageId: "default",
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
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
        messageId: "default",
        column: 3,
        data: {
          name: "onClick",
        },
        endColumn: 10,
        endLine: 5,
        line: 5,
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
        messageId: "default",
        column: 3,
        data: {
          name: "foo",
        },
        endColumn: 6,
        endLine: 3,
        line: 3,
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

      function Component(props: Props) {
        const { abc, hello } = props;
        return null;
      }
    `,
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
      function Component(props: { abc: string; hello: string; }) {
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
      function Component({ abc: abc2, hello: hello2 }: { abc: string; hello: string; }) {
        return null;
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
  ],
});
