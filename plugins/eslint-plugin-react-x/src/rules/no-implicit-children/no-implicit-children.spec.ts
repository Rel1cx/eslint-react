import tsx from "dedent";

import { ruleTesterWithTypes } from "#/test";
import rule, { RULE_NAME } from "./no-implicit-children";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    // Invalid: spreading object literal with children property
    {
      code: tsx`
        const props = { children: "hello" };
        const App = () => {
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading inline object literal with children
    {
      code: tsx`
        const App = () => {
          return <div {...{ children: "hello" }} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading props with children from a map callback
    {
      code: tsx`
        const items = [{ children: "a" }, { children: "b" }];
        const App = () => {
          return items.map((item) => <div {...item} />);
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading object with children and other properties
    {
      code: tsx`
        const App = () => {
          return <div {...{ children: "hello", id: "test" }} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading typed props with children
    {
      code: tsx`
        type Props = { children: string | number; id: string };
        const App = () => {
          const props: Props = { children: "hello", id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading interface with children
    {
      code: tsx`
        interface MyProps {
          children: string | number;
          className?: string;
        }
        const App = () => {
          const props: MyProps = { children: "hello" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from a function return value with children
    {
      code: tsx`
        const getProps = () => ({ children: "hello", id: "test" });
        const App = () => {
          return <div {...getProps()} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading on a custom component with children
    {
      code: tsx`
        function MyComponent(props: { id: string }) {
          return <div>{props.id}</div>;
        }
        const App = () => {
          const props = { children: "hello", id: "1" };
          return <MyComponent {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading intersection type with children
    {
      code: tsx`
        type WithChildren = { children: string | number };
        type WithId = { id: string };
        const App = () => {
          const props: WithChildren & WithId = { children: "hello", id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading union type where both members have children
    {
      code: tsx`
        type PropsA = { children: string | number; value: number };
        type PropsB = { children: string | number; label: string };
        const App = ({ props }: { props: PropsA | PropsB }) => {
          return <div {...props} />;
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Invalid: spreading from a variable with optional children
    {
      code: tsx`
        const App = () => {
          const props: { children?: string | number; id: string } = { id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading as-casted expression with children
    {
      code: tsx`
        const App = () => {
          const props = { id: "test" } as { children: string | number; id: string };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from interface that extends another with children
    {
      code: tsx`
        interface WithChildren {
          children: string | number;
        }
        interface ItemProps extends WithChildren {
          label: string;
        }
        const App = () => {
          const props: ItemProps = { children: "hello", label: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from generic function with children constraint
    {
      code: tsx`
        function withChildren<T extends { children: string | number }>(props: T) {
          return <div {...props} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: nested spread with children
    {
      code: tsx`
        const App = () => {
          return <div {...{ ...{ children: "hello" } }} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading declare variable with children
    {
      code: tsx`
        declare let someValues: { id: string; className: string; children: string };
        function MyComponent() {
          return <div {...someValues} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from function parameter typed with children
    {
      code: tsx`
        function App({ items }: { items: Array<{ children: string | number; id: string }> }) {
          return items.map((item) => <div key={item.id} {...item} />);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: multiple spreads where one contains children
    {
      code: tsx`
        const App = () => {
          const withChildren = { children: "hello" };
          const withId = { id: "test" };
          return <div {...withChildren} {...withId} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from class instance with children property
    {
      code: tsx`
        class CardProps {
          children = "hello";
          label = "World";
        }
        const App = () => {
          const props = new CardProps();
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from conditional expression where both branches have children
    {
      code: tsx`
        const App = ({ flag }: { flag: boolean }) => {
          const propsA = { children: "hello", id: "1" };
          const propsB = { children: "world", id: "2" };
          return <div {...(flag ? propsA : propsB)} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    // Valid: spreading props without children property
    tsx`
      const App = () => {
        const props = { id: "test", className: "foo" };
        return <div {...props}>content</div>;
      };
    `,
    // Valid: passing children explicitly via JSX, not via spread
    tsx`
      const App = () => {
        return <div id="test">hello</div>;
      };
    `,
    // Valid: spreading typed props without children
    tsx`
      type Props = { id: string; value: number };
      const App = () => {
        const props: Props = { id: "test", value: 42 };
        return <div {...props} />;
      };
    `,
    // Valid: React ComponentProps pass-through (React-defined children)
    tsx`
      import React from "react";

      function PaginationItem({ ...props }: React.ComponentProps<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: React.ComponentProps with import *
    tsx`
      import * as React from "react";

      function PaginationItem({ ...props }: React.ComponentProps<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: ComponentProps from named import
    tsx`
      import type { ComponentProps } from "react";

      function PaginationItem({ ...props }: ComponentProps<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: ComponentProps with inline type import
    tsx`
      import { type ComponentProps } from "react";

      function PaginationItem({ ...props }: ComponentProps<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: HTMLAttributes pass-through (React-defined children)
    tsx`
      import type { HTMLAttributes } from "react";

      function MyDiv({ ...props }: HTMLAttributes<HTMLDivElement>) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for button (React-defined children)
    tsx`
      import type { ComponentProps } from "react";

      function MyButton({ ...props }: ComponentProps<"button">) {
        return <button type="button" {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for input (React-defined children)
    tsx`
      import type { ComponentProps } from "react";

      function MyInput({ ...props }: ComponentProps<"input">) {
        return <input {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for anchor (React-defined children)
    tsx`
      import type { ComponentProps } from "react";

      function MyLink({ ...props }: ComponentProps<"a">) {
        return <a {...props} />;
      }
    `,
    // Valid: spreading PropsWithChildren (React-defined children)
    tsx`
      import type { PropsWithChildren } from "react";

      function Wrapper({ ...props }: PropsWithChildren<{ className: string }>) {
        return <div {...props} />;
      }
    `,
    // Valid: destructuring children out before spreading rest
    tsx`
      const App = () => {
        const props = { children: "hello", id: "test" };
        const { children, ...rest } = props;
        return <div {...rest}>{children}</div>;
      };
    `,
    // Valid: destructuring children from map item before spreading
    tsx`
      const App = () => {
        const items = [{ children: "hello", id: "1" }];
        return items.map(({ children, ...rest }) => <div key={rest.id} {...rest}>{children}</div>);
      };
    `,
    // Valid: spreading empty object
    tsx`
      const App = () => {
        const props = {};
        return <div {...props} />;
      };
    `,
    // Valid: spreading intersection type without children
    tsx`
      type BaseProps = { id: string };
      type ExtendedProps = BaseProps & { className?: string };
      const App = () => {
        const props: ExtendedProps = { id: "test", className: "foo" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading from function parameter without children
    tsx`
      function App({ items }: { items: Array<{ id: string; content: string }> }) {
        return items.map((item) => <div key={item.id} {...item}>{item.content}</div>);
      }
    `,
    // Valid: spreading Omit<> that removes children
    tsx`
      import type { ComponentProps } from "react";

      function MyDiv({ ...props }: Omit<ComponentProps<"div">, "children">) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading Pick type (no children)
    tsx`
      import type { ComponentProps } from "react";

      function MyDiv({ ...props }: Pick<ComponentProps<"div">, "className" | "id">) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading props with no children from a map callback
    tsx`
      const items = [{ id: "1", text: "a" }];
      const App = () => {
        return items.map((item) => <div key={item.id} {...item}>{item.text}</div>);
      };
    `,
    // Valid: custom component props without children (using JSX children)
    tsx`
      interface MyProps {
        title: string;
        description?: string;
      }
      function MyComponent({ ...props }: MyProps) {
        return <div>{props.title}</div>;
      }
    `,
    // Valid: spreading SVGAttributes from React (React-defined children)
    tsx`
      import type { SVGAttributes } from "react";

      function MySvg({ ...props }: SVGAttributes<SVGSVGElement>) {
        return <svg {...props} />;
      }
    `,
    // Valid: spreading React.ButtonHTMLAttributes (React-defined children)
    tsx`
      import type { ButtonHTMLAttributes } from "react";

      function MyButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
        return <button {...props} />;
      }
    `,
    // Valid: spreading React.InputHTMLAttributes (React-defined children)
    tsx`
      import type { InputHTMLAttributes } from "react";

      function MyInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
        return <input {...props} />;
      }
    `,
    // Valid: spreading React.AnchorHTMLAttributes (React-defined children)
    tsx`
      import type { AnchorHTMLAttributes } from "react";

      function MyAnchor({ ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
        return <a {...props} />;
      }
    `,
    // Valid: spreading React.FormHTMLAttributes (React-defined children)
    tsx`
      import type { FormHTMLAttributes } from "react";

      function MyForm({ ...props }: FormHTMLAttributes<HTMLFormElement>) {
        return <form {...props} />;
      }
    `,
    // Valid: spreading React.TextareaHTMLAttributes (React-defined children)
    tsx`
      import type { TextareaHTMLAttributes } from "react";

      function MyTextarea({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
        return <textarea {...props} />;
      }
    `,
    // Valid: spreading from React.forwardRef callback (React-defined children)
    tsx`
      import React from "react";

      const MyInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => {
        return <input ref={ref} {...props} />;
      });
    `,
    // Valid: spreading from ComponentPropsWithRef / ComponentPropsWithoutRef (react-dom)
    tsx`
      import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react-dom";

      export function PaginationItem1({ ...props }: ComponentPropsWithRef<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }

      export function PaginationItem2({ ...props }: ComponentPropsWithoutRef<"li">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: spreading Omit<ComponentProps> that does not remove children
    tsx`
      import { ComponentProps } from "react";

      function PaginationItem({ ...props }: Omit<React.ComponentProps<"li">, "value">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: multiple spreads, none containing children
    tsx`
      const App = () => {
        const style = { color: "red" };
        const attrs = { id: "test" };
        return <div {...style} {...attrs} />;
      };
    `,
    // Valid: spreading from Partial<> without children in base
    tsx`
      type BaseProps = { id: string; className: string };
      const App = () => {
        const props: Partial<BaseProps> = { id: "test" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading from a variable with Record type (no children)
    tsx`
      const App = () => {
        const props: Record<string, string> = { a: "1", b: "2" };
        return <div {...props} />;
      };
    `,
    // Valid: import type from a different source (non-React)
    tsx`
      import type { Attributes } from "@rbxts/react";

      function MyDiv({ ...props }: Attributes) {
        return <div {...props} />;
      }
    `,
    // Valid: children property typed as React.ReactNode (React-defined type alias)
    tsx`
      import React from "react";

      declare let someValues: { id: string; className: string; children: React.ReactNode };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: children property typed as ReactNode imported from react
    tsx`
      import type { ReactNode } from "react";

      declare let someValues: { id: string; className: string; children: ReactNode };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: children property typed as ReactElement imported from react
    tsx`
      import type { ReactElement } from "react";

      declare let someValues: { id: string; className: string; children: ReactElement };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: children property typed as JSX.Element
    tsx`
      declare let someValues: { id: string; className: string; children: JSX.Element };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: children property typed as React.ReactPortal
    tsx`
      import type { ReactPortal } from "react";

      declare let someValues: { id: string; className: string; children: ReactPortal };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
  ],
});
