import tsx from "dedent";

import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./no-implicit-key";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        const props = { key: "1" };

        const App = () => {
            return [
                    <div {...props}>1</div>,
                    <div {...props}>2</div>,
                    <div {...props}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`

        const App = () => {
        const props = { key: "1" };

        return [
                <div {...props}>1</div>,
                <div {...props}>2</div>,
                <div {...props}>3</div>,
              ]
          };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const App = () => {
            return [
                    <div {...{ key: "1" }}>1</div>,
                    <div {...{ key: "2" }}>2</div>,
                    <div {...{ key: "3" }}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const App = () => {
            return [
                    <div {...{...{ key: "1" }}}>1</div>,
                    <div {...{...{ key: "2" }}}>2</div>,
                    <div {...{...{ key: "3" }}}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const props1 = { key: "1" };
        const App = () => {
            const props2 = { key: "1" };

            return [
                    <div key="0">0</div>,
                    <div {...props1}>1</div>,
                    <div {...props2}>2</div>,
                    <div {...{...{...{ key: "3" }}}}>3</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      code: tsx`
        const props1 = { key: "1" };
        const props4 = { key: "4" };
        const App = () => {
            const props2 = { key: "1" };

            return [
                    <div key="0">0</div>,
                    <div {...props1}>1</div>,
                    <div {...props2}>2</div>,
                    <div {...{...{...{ key: "3" }}}}>3</div>,
                    <div {...{...{...props4}}}>4</div>,
                 ]
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Invalid: spreading props with key in a map callback
    {
      code: tsx`
        const items = [{ key: "1", value: "a" }];
        const App = () => {
          return items.map((item) => <div {...item}>{item.value}</div>);
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading object literal with key and other properties
    {
      code: tsx`
        const App = () => {
          return [
            <div {...{ key: "1", id: "a", className: "foo" }}>1</div>,
            <div {...{ key: "2", id: "b", className: "bar" }}>2</div>,
          ];
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Invalid: spreading props from function parameter with key property
    {
      code: tsx`
        function App({ items }: { items: Array<{ key: string; content: string }> }) {
          return items.map((item) => <div {...item}>{item.content}</div>);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading ReactElement-like object with key
    {
      code: tsx`
        const elementProps = { key: "unique", children: "Hello" };
        const App = () => {
          return <div {...elementProps} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading intersection type with key
    {
      code: tsx`
        type Props = { key: string; value: number };
        const App = () => {
          const props: Props = { key: "k", value: 42 };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from variable with optional key
    {
      code: tsx`
        const App = () => {
          const props: { key?: string; value: number } = { key: "k", value: 42 };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from a returned object
    {
      code: tsx`
        const getProps = () => ({ key: "unique", text: "Hello" });
        const App = () => {
          return <div {...getProps()} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading in nested component within array
    {
      code: tsx`
        const props = { key: "nested" };
        const App = () => {
          return [
            <div>
              <span {...props}>nested</span>
            </div>,
          ];
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: multiple spreads with key in one element
    {
      code: tsx`
        const props1 = { key: "1" };
        const props2 = { id: "test" };
        const App = () => {
          return [
            <div {...props1} {...props2}>1</div>,
          ];
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading computed property with key
    {
      code: tsx`
        const keyName = "key" as const;
        const App = () => {
          const props = { [keyName]: "1", id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from a conditional expression where both branches have key
    {
      code: tsx`
        const App = ({ flag }: { flag: boolean }) => {
          const propsA = { key: "a", id: "1" };
          const propsB = { key: "b", id: "2" };
          return <div {...(flag ? propsA : propsB)} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from class instance with key property
    {
      code: tsx`
        class ItemProps {
          key = "item-1";
          label = "Hello";
        }
        const App = () => {
          const props = new ItemProps();
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from generic function with key constraint
    {
      code: tsx`
        function withKey<T extends { key: string }>(props: T) {
          return <div {...props} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading union type where one member has key
    {
      code: tsx`
        type PropsA = { key: string; value: number };
        type PropsB = { key: string; label: string };
        const App = ({ props }: { props: PropsA | PropsB }) => {
          return <div {...props} />;
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Invalid: spreading on a custom component (not just intrinsic elements)
    {
      code: tsx`
        function MyComponent(props: { children: React.ReactNode }) {
          return <div>{props.children}</div>;
        }
        const App = () => {
          const props = { key: "1", children: "hello" };
          return <MyComponent {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from as-casted expression
    {
      code: tsx`
        const App = () => {
          const props = { id: "test" } as { key: string; id: string };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading in a Fragment children array
    {
      code: tsx`
        import React from "react";
        const App = () => {
          const props = { key: "1" };
          return (
            <React.Fragment>
              {[<div {...props}>1</div>]}
            </React.Fragment>
          );
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from interface that extends another with key
    {
      code: tsx`
        interface WithKey {
          key: string;
        }
        interface ItemProps extends WithKey {
          label: string;
        }
        const App = () => {
          const props: ItemProps = { key: "1", label: "hello" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading self-closing element with key in props
    {
      code: tsx`
        const App = () => {
          const props = { key: "img-1", src: "test.png", alt: "test" };
          return <img {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      const App = () => {
          return [<div key="1">1</div>]
      };
    `,
    tsx`
      const App = () => {
          return [
                  <div key="1">1</div>,
                  <div key="2">2</div>,
                  <div key="3">3</div>,
               ]
      };
    `,
    tsx`
      const App = () => {
          return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
      };
    `,
    // https://github.com/Rel1cx/eslint-react/issues/1472
    tsx`
      import * as React from "react";

      function PaginationItem({ ...props }: React.ComponentProps<"li">) {
          return <li data-slot="pagination-item" {...props} />;
      }
    `,
    tsx`
      import React from "react";

      function PaginationItem({ ...props }: React.ComponentProps<"li">) {
          return <li data-slot="pagination-item" {...props} />;
      }
    `,
    tsx`
      import type { ComponentProps } from "react";

      function PaginationItem({ ...props }: ComponentProps<"li">) {
          return <li data-slot="pagination-item" {...props} />;
      }
    `,
    tsx`
      import { type ComponentProps } from "react";

      function PaginationItem({ ...props }: ComponentProps<"li">) {
          return <li data-slot="pagination-item" {...props} />;
      }
    `,
    tsx`
      import { ComponentProps } from "react";

      function PaginationItem({ ...props }: ComponentProps<"li">) {
          return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // https://github.com/Rel1cx/eslint-react/issues/1476
    tsx`
      import { ComponentProps } from "react";

      function PaginationItem({ ...props }: Omit<React.ComponentProps<"li">, "value">) {
          return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: spreading props without key property
    tsx`
      const App = () => {
        const props = { id: "test", className: "foo" };
        return <div {...props}>content</div>;
      };
    `,
    // Valid: spreading props with 'id' but not 'key'
    tsx`
      const App = () => {
        const props = { id: "unique", name: "test" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading from a typed object without key
    tsx`
      type Props = { id: string; value: number };
      const App = () => {
        const props: Props = { id: "test", value: 42 };
        return <div {...props} />;
      };
    `,
    // Valid: spreading in a map callback where the item has no key
    tsx`
      const items = [{ id: "1", text: "a" }];
      const App = () => {
        return items.map((item) => <div key={item.id} {...item}>{item.text}</div>);
      };
    `,
    // Valid: spreading empty object
    tsx`
      const App = () => {
        const props = {};
        return <div {...props} />;
      };
    `,
    // Valid: spreading props with explicit key before spread
    tsx`
      const App = () => {
        const props = { id: "test" };
        return [
          <div key="1" {...props}>1</div>,
          <div key="2" {...props}>2</div>,
        ];
      };
    `,
    // Valid: spreading props with explicit key after spread (should still work)
    tsx`
      const App = () => {
        const props = { id: "test" };
        return [
          <div {...props} key="1">1</div>,
          <div {...props} key="2">2</div>,
        ];
      };
    `,
    // Valid: spreading from a function parameter without key
    tsx`
      function App({ items }: { items: Array<{ id: string; content: string }> }) {
        return items.map((item) => <div key={item.id} {...item}>{item.content}</div>);
      }
    `,
    // Valid: spreading JSX intrinsic attributes for button
    tsx`
      import type { ComponentProps } from "react";

      function MyButton({ ...props }: ComponentProps<"button">) {
        return <button type="button" {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for input
    tsx`
      import type { ComponentProps } from "react";

      function MyInput({ ...props }: ComponentProps<"input">) {
        return <input {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for anchor
    tsx`
      import type { ComponentProps } from "react";

      function MyLink({ ...props }: ComponentProps<"a">) {
        return <a {...props} />;
      }
    `,
    // Valid: spreading with Pick type (no key)
    tsx`
      import type { ComponentProps } from "react";

      function MyDiv({ ...props }: Pick<ComponentProps<"div">, "className" | "id">) {
        return <div {...props} />;
      }
    `,
    // Valid: custom component props without key
    tsx`
      interface MyProps {
        title: string;
        description?: string;
      }
      function MyComponent({ ...props }: MyProps) {
        return <div {...props}>{props.title}</div>;
      }
    `,
    // Valid: spreading from a variable with Record type (no key)
    tsx`
      const App = () => {
        const props: Record<string, string> = { a: "1", b: "2" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading intersection type without key
    tsx`
      type BaseProps = { id: string };
      type ExtendedProps = BaseProps & { className?: string };
      const App = () => {
        const props: ExtendedProps = { id: "test", className: "foo" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading object with symbol keys only
    tsx`
      const App = () => {
        const symbolKey = Symbol("test");
        const props = { [symbolKey]: "value", regularProp: "test" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading props from a destructured parameter without key
    tsx`
      const App = () => {
        const items = [{ id: "1", text: "hello" }];
        return items.map(({ id, ...rest }) => <div key={id} {...rest}>{rest.text}</div>);
      };
    `,
    // Valid: nested spread without key
    tsx`
      const App = () => {
        const inner = { className: "inner" };
        const outer = { ...inner, id: "outer" };
        return <div {...outer} />;
      };
    `,
    // Valid: spreading in conditional rendering without key in props
    tsx`
      const App = ({ show, props }: { show: boolean; props: { className: string } }) => {
        return show ? <div {...props}>visible</div> : null;
      };
    `,
    // Valid: spreading HTMLAttributes from React
    tsx`
      import type { HTMLAttributes } from "react";

      function MySpan({ ...props }: HTMLAttributes<HTMLSpanElement>) {
        return <span {...props} />;
      }
    `,
    // Valid: spreading SVGAttributes from React
    tsx`
      import type { SVGAttributes } from "react";

      function MySvg({ ...props }: SVGAttributes<SVGSVGElement>) {
        return <svg {...props} />;
      }
    `,
    // Valid: destructuring key out before spreading rest
    tsx`
      const App = () => {
        const items = [{ key: "1", text: "hello" }];
        return items.map(({ key, ...rest }) => <div key={key} {...rest}>{rest.text}</div>);
      };
    `,
    // Valid: spreading from Partial<> without key in base
    tsx`
      type BaseProps = { id: string; className: string };
      const App = () => {
        const props: Partial<BaseProps> = { id: "test" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading props from React.forwardRef
    tsx`
      import React from "react";

      const MyInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => {
        return <input ref={ref} {...props} />;
      });
    `,
    // Valid: spreading React.HTMLAttributes (internally defined key)
    tsx`
      import type { HTMLAttributes } from "react";

      function MyDiv({ ...props }: HTMLAttributes<HTMLDivElement>) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading React.ButtonHTMLAttributes
    tsx`
      import type { ButtonHTMLAttributes } from "react";

      function MyButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
        return <button {...props} />;
      }
    `,
    // Valid: spreading React.InputHTMLAttributes
    tsx`
      import type { InputHTMLAttributes } from "react";

      function MyInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
        return <input {...props} />;
      }
    `,
    // Valid: spreading React.AnchorHTMLAttributes
    tsx`
      import type { AnchorHTMLAttributes } from "react";

      function MyAnchor({ ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
        return <a {...props} />;
      }
    `,
    // Valid: spreading from React.PropsWithChildren (key is React-internal)
    tsx`
      import type { PropsWithChildren } from "react";

      function Wrapper({ ...props }: PropsWithChildren<{ className: string }>) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading from React.PropsWithRef
    tsx`
      import type { PropsWithRef } from "react";

      function MyInput({ ...props }: PropsWithRef<React.ComponentProps<"input">>) {
        return <input {...props} />;
      }
    `,
    // Valid: spreading after extracting key with explicit key attribute
    tsx`
      const App = () => {
        const props = { key: "1", id: "test" };
        const { key, ...rest } = props;
        return <div key={key} {...rest} />;
      };
    `,
    // Valid: spreading with Omit<> that removes key
    tsx`
      import type { ComponentProps } from "react";

      function MyDiv({ ...props }: Omit<ComponentProps<"div">, "key">) {
        return <div {...props} />;
      }
    `,
    // Valid: import type from a diffent source
    tsx`
      import type { Attributes } from "@rbxts/react";

      function MyDiv({ ...props }: Attributes) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading from Pick<> that doesn't include key
    tsx`
      type Props = { key: string; id: string; className: string };
      const App = () => {
        const props: Pick<Props, "id" | "className"> = { id: "test", className: "foo" };
        return <div {...props} />;
      };
    `,
    // Valid: multiple spreads, none containing key
    tsx`
      const App = () => {
        const style = { color: "red" };
        const attrs = { id: "test" };
        return <div {...style} {...attrs} />;
      };
    `,
    // Valid: spreading from React.FormHTMLAttributes
    tsx`
      import type { FormHTMLAttributes } from "react";

      function MyForm({ ...props }: FormHTMLAttributes<HTMLFormElement>) {
        return <form {...props} />;
      }
    `,
    // Valid: spreading from React.TableHTMLAttributes
    tsx`
      import type { TableHTMLAttributes } from "react";

      function MyTable({ ...props }: TableHTMLAttributes<HTMLTableElement>) {
        return <table {...props} />;
      }
    `,
    // Valid: spreading from React.TextareaHTMLAttributes
    tsx`
      import type { TextareaHTMLAttributes } from "react";

      function MyTextarea({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
        return <textarea {...props} />;
      }
    `,
    tsx`
      import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react-dom";

      export function PaginationItem1({ ...props }: ComponentPropsWithRef<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }

      export function PaginationItem2({ ...props }: ComponentPropsWithoutRef<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
  ],
});
