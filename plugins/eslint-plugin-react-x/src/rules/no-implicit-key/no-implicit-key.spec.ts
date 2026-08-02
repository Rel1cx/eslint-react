import tsx from "dedent";

import { ruleTesterWithTypes } from "#/testing/helpers";
import rule, { RULE_NAME } from "./no-implicit-key";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      name: "spreading props object with key in array elements",
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
      name: "spreading props with key declared inside component in array elements",
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
      name: "spreading object literals with key in array elements",
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
      name: "spreading props with key in a map callback",
      code: tsx`
        const items = [{ key: "1", value: "a" }];
        const App = () => {
          return items.map((item) => <div {...item}>{item.value}</div>);
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading object literal with key and other properties",
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
    {
      name: "spreading props from function parameter with key property",
      code: tsx`
        function App({ items }: { items: Array<{ key: string; content: string }> }) {
          return items.map((item) => <div {...item}>{item.content}</div>);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading self-closing element with key in props",
      code: tsx`
        const App = () => {
          const props = { key: "img-1", src: "test.png", alt: "test" };
          return <img {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading props with key on a custom component",
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
    {
      name: "multiple spreads with key in one element",
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
    {
      name: "two spreads in the same element each containing key report once per spread attribute",
      code: tsx`
        const App = () => {
          const a = { key: "a" };
          const b = { key: "b" };
          return <div {...a} {...b} />;
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    {
      name: "spreading ReactElement-like object with key",
      code: tsx`
        const elementProps = { key: "unique", children: "Hello" };
        const App = () => {
          return <div {...elementProps} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading from a returned object",
      code: tsx`
        const getProps = () => ({ key: "unique", text: "Hello" });
        const App = () => {
          return <div {...getProps()} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading in nested component within array",
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
    {
      name: "spreading in a Fragment children array",
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
    {
      name: "spreading type alias with key",
      code: tsx`
        type Props = { key: string; value: number };
        const App = () => {
          const props: Props = { key: "k", value: 42 };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading from variable with optional key",
      code: tsx`
        const App = () => {
          const props: { key?: string; value: number } = { key: "k", value: 42 };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading from a conditional expression where both branches have key",
      code: tsx`
        const App = ({ flag }: { flag: boolean }) => {
          const propsA = { key: "a", id: "1" };
          const propsB = { key: "b", id: "2" };
          return <div {...(flag ? propsA : propsB)} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading union type where both members have key",
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
    {
      name: "union type where only one member has key reports exactly once",
      code: tsx`
        type PropsA = { key: string; value: number };
        type PropsB = { id: string; label: string };
        const App = ({ props }: { props: PropsA | PropsB }) => {
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading from interface that extends another with key",
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
    {
      name: "spreading from class instance with key property",
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
    {
      name: "spreading from generic function with key constraint",
      code: tsx`
        function withKey<T extends { key: string }>(props: T) {
          return <div {...props} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading from as-casted expression",
      code: tsx`
        const App = () => {
          const props = { id: "test" } as { key: string; id: string };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading computed property with key",
      code: tsx`
        const keyName = "key" as const;
        const App = () => {
          const props = { [keyName]: "1", id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "locally defined 'Attributes' interface is not a React-internal pass-through",
      code: tsx`
        interface Attributes {
          key: string;
          id: string;
        }
        const App = () => {
          const props: Attributes = { key: "1", id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "intersection where both members declare key still reports exactly once",
      code: tsx`
        type A = { key: string };
        type B = { key: number };
        const App = ({ props }: { props: A & B }) => {
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    {
      name: "spreading nested object literals with key in array elements",
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
      name: "mixed explicit key and spread props in array elements",
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
      name: "mixed explicit key and nested spread props in array elements",
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
    {
      name: "report is placed on the JSX spread attribute itself",
      code: tsx`
        const props = { key: "1" };
        const App = () => <div {...props} />;
      `,
      errors: [
        {
          messageId: "default",
          line: 2,
          column: 24,
          endLine: 2,
          endColumn: 34,
        },
      ],
    },
  ],
  valid: [
    {
      name: "single keyed element in array",
      code: tsx`
        const App = () => {
            return [<div key="1">1</div>]
        };
      `,
    },
    {
      name: "multiple keyed elements in array",
      code: tsx`
        const App = () => {
            return [
                    <div key="1">1</div>,
                    <div key="2">2</div>,
                    <div key="3">3</div>,
                 ]
        };
      `,
    },
    {
      name: "map callback with explicit key",
      code: tsx`
        const App = () => {
            return [1, 2, 3].map((item) => <div key={Math.random()}>{item}</div>)
        };
      `,
    },
    {
      name: "spreading props without key property",
      code: tsx`
        const App = () => {
          const props = { id: "test", className: "foo" };
          return <div {...props}>content</div>;
        };
      `,
    },
    {
      name: "spreading props with 'id' but not 'key'",
      code: tsx`
        const App = () => {
          const props = { id: "unique", name: "test" };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading from a typed object without key",
      code: tsx`
        type Props = { id: string; value: number };
        const App = () => {
          const props: Props = { id: "test", value: 42 };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading empty object",
      code: tsx`
        const App = () => {
          const props = {};
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading props with explicit key before spread",
      code: tsx`
        const App = () => {
          const props = { id: "test" };
          return [
            <div key="1" {...props}>1</div>,
            <div key="2" {...props}>2</div>,
          ];
        };
      `,
    },
    {
      name: "spreading props with explicit key after spread",
      code: tsx`
        const App = () => {
          const props = { id: "test" };
          return [
            <div {...props} key="1">1</div>,
            <div {...props} key="2">2</div>,
          ];
        };
      `,
    },
    {
      name: "spreading in a map callback where the item has no key",
      code: tsx`
        const items = [{ id: "1", text: "a" }];
        const App = () => {
          return items.map((item) => <div key={item.id} {...item}>{item.text}</div>);
        };
      `,
    },
    {
      name: "spreading from a function parameter without key",
      code: tsx`
        function App({ items }: { items: Array<{ id: string; content: string }> }) {
          return items.map((item) => <div key={item.id} {...item}>{item.content}</div>);
        }
      `,
    },
    {
      name: "spreading props from a destructured parameter without key",
      code: tsx`
        const App = () => {
          const items = [{ id: "1", text: "hello" }];
          return items.map(({ id, ...rest }) => <div key={id} {...rest}>{rest.text}</div>);
        };
      `,
    },
    {
      name: "destructuring key out before spreading rest",
      code: tsx`
        const App = () => {
          const items = [{ key: "1", text: "hello" }];
          return items.map(({ key, ...rest }) => <div key={key} {...rest}>{rest.text}</div>);
        };
      `,
    },
    {
      name: "spreading after extracting key with explicit key attribute",
      code: tsx`
        const App = () => {
          const props = { key: "1", id: "test" };
          const { key, ...rest } = props;
          return <div key={key} {...rest} />;
        };
      `,
    },
    {
      name: "nested spread without key",
      code: tsx`
        const App = () => {
          const inner = { className: "inner" };
          const outer = { ...inner, id: "outer" };
          return <div {...outer} />;
        };
      `,
    },
    {
      name: "spreading in conditional rendering without key in props",
      code: tsx`
        const App = ({ show, props }: { show: boolean; props: { className: string } }) => {
          return show ? <div {...props}>visible</div> : null;
        };
      `,
    },
    {
      name: "multiple spreads, none containing key",
      code: tsx`
        const App = () => {
          const style = { color: "red" };
          const attrs = { id: "test" };
          return <div {...style} {...attrs} />;
        };
      `,
    },
    {
      name: "custom component props without key",
      code: tsx`
        interface MyProps {
          title: string;
          description?: string;
        }
        function MyComponent({ ...props }: MyProps) {
          return <div {...props}>{props.title}</div>;
        }
      `,
    },
    {
      name: "spreading from a variable with Record type",
      code: tsx`
        const App = () => {
          const props: Record<string, string> = { a: "1", b: "2" };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading intersection type without key",
      code: tsx`
        type BaseProps = { id: string };
        type ExtendedProps = BaseProps & { className?: string };
        const App = () => {
          const props: ExtendedProps = { id: "test", className: "foo" };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading object with symbol keys only",
      code: tsx`
        const App = () => {
          const symbolKey = Symbol("test");
          const props = { [symbolKey]: "value", regularProp: "test" };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading from Partial<> without key in base",
      code: tsx`
        type BaseProps = { id: string; className: string };
        const App = () => {
          const props: Partial<BaseProps> = { id: "test" };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading from Pick<> that doesn't include key",
      code: tsx`
        type Props = { key: string; id: string; className: string };
        const App = () => {
          const props: Pick<Props, "id" | "className"> = { id: "test", className: "foo" };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading with Omit<> that removes key",
      code: tsx`
        import type { ComponentProps } from "react";

        function MyDiv({ ...props }: Omit<ComponentProps<"div">, "key">) {
          return <div {...props} />;
        }
      `,
    },
    // https://github.com/Rel1cx/eslint-react/issues/1472
    {
      name: "ComponentProps<'li'> with namespace React import",
      code: tsx`
        import * as React from "react";

        function PaginationItem({ ...props }: React.ComponentProps<"li">) {
            return <li data-slot="pagination-item" {...props} />;
        }
      `,
    },
    {
      name: "ComponentProps<'li'> with default React import",
      code: tsx`
        import React from "react";

        function PaginationItem({ ...props }: React.ComponentProps<"li">) {
            return <li data-slot="pagination-item" {...props} />;
        }
      `,
    },
    {
      name: "ComponentProps<'li'> with type-only named import",
      code: tsx`
        import type { ComponentProps } from "react";

        function PaginationItem({ ...props }: ComponentProps<"li">) {
            return <li data-slot="pagination-item" {...props} />;
        }
      `,
    },
    {
      name: "ComponentProps<'li'> with inline type modifier import",
      code: tsx`
        import { type ComponentProps } from "react";

        function PaginationItem({ ...props }: ComponentProps<"li">) {
            return <li data-slot="pagination-item" {...props} />;
        }
      `,
    },
    {
      name: "ComponentProps<'li'> with value named import",
      code: tsx`
        import { ComponentProps } from "react";

        function PaginationItem({ ...props }: ComponentProps<"li">) {
            return <li data-slot="pagination-item" {...props} />;
        }
      `,
    },
    // https://github.com/Rel1cx/eslint-react/issues/1476
    {
      name: "Omit of ComponentProps<'li'> removing 'value'",
      code: tsx`
        import { ComponentProps } from "react";

        function PaginationItem({ ...props }: Omit<React.ComponentProps<"li">, "value">) {
            return <li data-slot="pagination-item" {...props} />;
        }
      `,
    },
    {
      name: "spreading JSX intrinsic attributes for button",
      code: tsx`
        import type { ComponentProps } from "react";

        function MyButton({ ...props }: ComponentProps<"button">) {
          return <button type="button" {...props} />;
        }
      `,
    },
    {
      name: "spreading JSX intrinsic attributes for input",
      code: tsx`
        import type { ComponentProps } from "react";

        function MyInput({ ...props }: ComponentProps<"input">) {
          return <input {...props} />;
        }
      `,
    },
    {
      name: "spreading JSX intrinsic attributes for anchor",
      code: tsx`
        import type { ComponentProps } from "react";

        function MyLink({ ...props }: ComponentProps<"a">) {
          return <a {...props} />;
        }
      `,
    },
    {
      name: "spreading with Pick type without key",
      code: tsx`
        import type { ComponentProps } from "react";

        function MyDiv({ ...props }: Pick<ComponentProps<"div">, "className" | "id">) {
          return <div {...props} />;
        }
      `,
    },
    {
      name: "spreading HTMLAttributes for span element",
      code: tsx`
        import type { HTMLAttributes } from "react";

        function MySpan({ ...props }: HTMLAttributes<HTMLSpanElement>) {
          return <span {...props} />;
        }
      `,
    },
    {
      name: "spreading SVGAttributes from React",
      code: tsx`
        import type { SVGAttributes } from "react";

        function MySvg({ ...props }: SVGAttributes<SVGSVGElement>) {
          return <svg {...props} />;
        }
      `,
    },
    {
      name: "spreading HTMLAttributes for div element",
      code: tsx`
        import type { HTMLAttributes } from "react";

        function MyDiv({ ...props }: HTMLAttributes<HTMLDivElement>) {
          return <div {...props} />;
        }
      `,
    },
    {
      name: "spreading ButtonHTMLAttributes from React",
      code: tsx`
        import type { ButtonHTMLAttributes } from "react";

        function MyButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
          return <button {...props} />;
        }
      `,
    },
    {
      name: "spreading InputHTMLAttributes from React",
      code: tsx`
        import type { InputHTMLAttributes } from "react";

        function MyInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
          return <input {...props} />;
        }
      `,
    },
    {
      name: "spreading AnchorHTMLAttributes from React",
      code: tsx`
        import type { AnchorHTMLAttributes } from "react";

        function MyAnchor({ ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
          return <a {...props} />;
        }
      `,
    },
    {
      name: "spreading FormHTMLAttributes from React",
      code: tsx`
        import type { FormHTMLAttributes } from "react";

        function MyForm({ ...props }: FormHTMLAttributes<HTMLFormElement>) {
          return <form {...props} />;
        }
      `,
    },
    {
      name: "spreading TableHTMLAttributes from React",
      code: tsx`
        import type { TableHTMLAttributes } from "react";

        function MyTable({ ...props }: TableHTMLAttributes<HTMLTableElement>) {
          return <table {...props} />;
        }
      `,
    },
    {
      name: "spreading TextareaHTMLAttributes from React",
      code: tsx`
        import type { TextareaHTMLAttributes } from "react";

        function MyTextarea({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
          return <textarea {...props} />;
        }
      `,
    },
    {
      name: "spreading from PropsWithChildren",
      code: tsx`
        import type { PropsWithChildren } from "react";

        function Wrapper({ ...props }: PropsWithChildren<{ className: string }>) {
          return <div {...props} />;
        }
      `,
    },
    {
      name: "spreading from PropsWithRef",
      code: tsx`
        import type { PropsWithRef } from "react";

        function MyInput({ ...props }: PropsWithRef<React.ComponentProps<"input">>) {
          return <input {...props} />;
        }
      `,
    },
    {
      name: "spreading props from React.forwardRef",
      code: tsx`
        import React from "react";

        const MyInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => {
          return <input ref={ref} {...props} />;
        });
      `,
    },
    {
      name: "ComponentPropsWithRef and ComponentPropsWithoutRef from react-dom",
      code: tsx`
        import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react-dom";

        export function PaginationItem1({ ...props }: ComponentPropsWithRef<"li">) {
          return <li data-slot="pagination-item" {...props} />;
        }

        export function PaginationItem2({ ...props }: ComponentPropsWithoutRef<"li">) {
          return <li data-slot="pagination-item" {...props} />;
        }
      `,
    },
    {
      name: "import type from a different source",
      code: tsx`
        import type { Attributes } from "@rbxts/react";

        function MyDiv({ ...props }: Attributes) {
          return <div {...props} />;
        }
      `,
    },
    {
      name: "key typed as React.Key in mutable variable",
      code: tsx`
        import React from "react";

        let someValues: { id: string; className: string; key: React.Key } = { id: "test", className: "foo", key: "1" };

        function MyComponent() {
          return <div {...someValues} data-slot="pagination-item" />;
        }
      `,
    },
    {
      name: "key property typed as React.Key",
      code: tsx`
        import React from "react";

        declare let someValues: { id: string; className: string; key: React.Key };

        function MyComponent() {
          return <div {...someValues} data-slot="pagination-item" />;
        }
      `,
    },
    {
      name: "key property typed as Key imported from react",
      code: tsx`
        import type { Key } from "react";

        declare let someValues: { id: string; className: string; key: Key };

        function MyComponent() {
          return <div {...someValues} data-slot="pagination-item" />;
        }
      `,
    },
    {
      name: "property name matching is exact and case-sensitive",
      code: tsx`
        const App = () => {
          const props = { Key: "1", id: "test" };
          return <div {...props} />;
        };
      `,
    },
    {
      name: "spreading an 'any'-typed value has no statically known key property",
      code: tsx`
        declare let props: any;
        const App = () => <div {...props} />;
      `,
    },
    {
      name: "spreading an 'unknown'-typed value has no statically known key property",
      code: tsx`
        declare let props: unknown;
        const App = () => <div {...props} />;
      `,
    },
    {
      name: "key inherited from React.Attributes is a React-internal pass-through",
      code: tsx`
        import type { Attributes } from "react";

        interface MyItemProps extends Attributes {
          id: string;
        }

        function MyItem({ ...props }: MyItemProps) {
          return <li {...props} />;
        }
      `,
    },
  ],
});
