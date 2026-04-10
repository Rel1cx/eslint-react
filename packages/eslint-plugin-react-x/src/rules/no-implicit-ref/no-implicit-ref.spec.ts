import tsx from "dedent";

import { ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./no-implicit-ref";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    // Invalid: spreading object literal with ref property
    {
      code: tsx`
        const props = { ref: null };
        const App = () => {
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading inline object literal with ref
    {
      code: tsx`
        const App = () => {
          return <div {...{ ref: null }} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading typed props with ref
    {
      code: tsx`
        type Props = { ref: { current: HTMLDivElement | null }; id: string };
        const App = () => {
          const props: Props = { ref: { current: null }, id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading interface with ref
    {
      code: tsx`
        interface MyProps {
          ref: { current: HTMLDivElement | null };
          className?: string;
        }
        const App = () => {
          const props: MyProps = { ref: { current: null } };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading object with ref and other properties
    {
      code: tsx`
        const App = () => {
          return <div {...{ ref: null, id: "test" }} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from a function return value with ref
    {
      code: tsx`
        const getProps = () => ({ ref: null, id: "test" });
        const App = () => {
          return <div {...getProps()} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading declare variable with ref
    {
      code: tsx`
        declare let someValues: { id: string; className: string; ref: null };
        function MyComponent() {
          return <div {...someValues} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading on a custom component with ref
    {
      code: tsx`
        function MyComponent(props: { id: string }) {
          return <div>{props.id}</div>;
        }
        const App = () => {
          const props = { ref: null, id: "1" };
          return <MyComponent {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading intersection type with ref
    {
      code: tsx`
        type WithRef = { ref: { current: HTMLDivElement | null } };
        type WithId = { id: string };
        const App = () => {
          const props: WithRef & WithId = { ref: { current: null }, id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading union type where both members have ref
    {
      code: tsx`
        type PropsA = { ref: { current: HTMLDivElement | null }; value: number };
        type PropsB = { ref: { current: HTMLSpanElement | null }; label: string };
        const App = ({ props }: { props: PropsA | PropsB }) => {
          return <div {...props} />;
        };
      `,
      errors: [
        { messageId: "default" },
        { messageId: "default" },
      ],
    },
    // Invalid: spreading from a variable with optional ref
    {
      code: tsx`
        const App = () => {
          const props: { ref?: ((el: HTMLDivElement | null) => void); id: string } = { id: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading as-casted expression with ref
    {
      code: tsx`
        const App = () => {
          const props = { id: "test" } as { ref: { current: HTMLDivElement | null }; id: string };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from interface that extends another with ref
    {
      code: tsx`
        interface WithRef {
          ref: { current: HTMLDivElement | null };
        }
        interface ItemProps extends WithRef {
          label: string;
        }
        const App = () => {
          const props: ItemProps = { ref: { current: null }, label: "test" };
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from generic function with ref constraint
    {
      code: tsx`
        function withRef<T extends { ref: { current: HTMLDivElement | null } }>(props: T) {
          return <div {...props} />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from function parameter typed with ref
    {
      code: tsx`
        function App({ items }: { items: Array<{ ref: { current: HTMLDivElement | null }; id: string }> }) {
          return items.map((item) => <div key={item.id} {...item} />);
        }
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: multiple spreads where one contains ref
    {
      code: tsx`
        const App = () => {
          const withRef = { ref: null };
          const withId = { id: "test" };
          return <div {...withRef} {...withId} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from class instance with ref property
    {
      code: tsx`
        class CardProps {
          ref = null;
          label = "World";
        }
        const App = () => {
          const props = new CardProps();
          return <div {...props} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading from conditional expression where both branches have ref
    {
      code: tsx`
        const App = ({ flag }: { flag: boolean }) => {
          const propsA = { ref: null, id: "1" };
          const propsB = { ref: null, id: "2" };
          return <div {...(flag ? propsA : propsB)} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: spreading map callback item with ref
    {
      code: tsx`
        const items = [{ ref: null, id: "a" }];
        const App = () => {
          return items.map((item) => <div key={item.id} {...item} />);
        };
      `,
      errors: [{ messageId: "default" }],
    },
    // Invalid: nested spread with ref
    {
      code: tsx`
        const App = () => {
          return <div {...{ ...{ ref: null } }} />;
        };
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    // Valid: spreading props without ref property
    tsx`
      const App = () => {
        const props = { id: "test", className: "foo" };
        return <div {...props}>content</div>;
      };
    `,
    // Valid: passing ref explicitly via attribute, not via spread
    tsx`
      import React from "react";
      const App = () => {
        const ref = React.useRef<HTMLDivElement>(null);
        return <div ref={ref} id="test" />;
      };
    `,
    // Valid: spreading typed props without ref
    tsx`
      type Props = { id: string; value: number };
      const App = () => {
        const props: Props = { id: "test", value: 42 };
        return <div {...props} />;
      };
    `,
    // Valid: React ComponentProps pass-through (React-defined ref)
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
    // Valid: HTMLAttributes pass-through (React-defined ref)
    tsx`
      import type { HTMLAttributes } from "react";

      function MyDiv({ ...props }: HTMLAttributes<HTMLDivElement>) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for button (React-defined ref)
    tsx`
      import type { ComponentProps } from "react";

      function MyButton({ ...props }: ComponentProps<"button">) {
        return <button type="button" {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for input (React-defined ref)
    tsx`
      import type { ComponentProps } from "react";

      function MyInput({ ...props }: ComponentProps<"input">) {
        return <input {...props} />;
      }
    `,
    // Valid: spreading JSX intrinsic attributes for anchor (React-defined ref)
    tsx`
      import type { ComponentProps } from "react";

      function MyLink({ ...props }: ComponentProps<"a">) {
        return <a {...props} />;
      }
    `,
    // Valid: destructuring ref out before spreading rest
    tsx`
      const App = () => {
        const props = { ref: null, id: "test" };
        const { ref, ...rest } = props;
        return <div ref={ref} {...rest} />;
      };
    `,
    // Valid: destructuring ref from map item before spreading
    tsx`
      const App = () => {
        const items = [{ ref: null, id: "1" }];
        return items.map(({ ref, ...rest }) => <div key={rest.id} ref={ref} {...rest} />);
      };
    `,
    // Valid: spreading empty object
    tsx`
      const App = () => {
        const props = {};
        return <div {...props} />;
      };
    `,
    // Valid: spreading intersection type without ref
    tsx`
      type BaseProps = { id: string };
      type ExtendedProps = BaseProps & { className?: string };
      const App = () => {
        const props: ExtendedProps = { id: "test", className: "foo" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading from function parameter without ref
    tsx`
      function App({ items }: { items: Array<{ id: string; content: string }> }) {
        return items.map((item) => <div key={item.id} {...item}>{item.content}</div>);
      }
    `,
    // Valid: spreading Omit<> that removes ref
    tsx`
      import type { ComponentProps } from "react";

      function MyDiv({ ...props }: Omit<ComponentProps<"div">, "ref">) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading Pick type (no ref)
    tsx`
      import type { ComponentProps } from "react";

      function MyDiv({ ...props }: Pick<ComponentProps<"div">, "className" | "id">) {
        return <div {...props} />;
      }
    `,
    // Valid: spreading props with no ref from a map callback
    tsx`
      const items = [{ id: "1", text: "a" }];
      const App = () => {
        return items.map((item) => <div key={item.id} {...item}>{item.text}</div>);
      };
    `,
    // Valid: spreading SVGAttributes from React (React-defined ref)
    tsx`
      import type { SVGAttributes } from "react";

      function MySvg({ ...props }: SVGAttributes<SVGSVGElement>) {
        return <svg {...props} />;
      }
    `,
    // Valid: spreading React.ButtonHTMLAttributes (React-defined ref)
    tsx`
      import type { ButtonHTMLAttributes } from "react";

      function MyButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
        return <button {...props} />;
      }
    `,
    // Valid: spreading React.InputHTMLAttributes (React-defined ref)
    tsx`
      import type { InputHTMLAttributes } from "react";

      function MyInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
        return <input {...props} />;
      }
    `,
    // Valid: spreading React.AnchorHTMLAttributes (React-defined ref)
    tsx`
      import type { AnchorHTMLAttributes } from "react";

      function MyAnchor({ ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
        return <a {...props} />;
      }
    `,
    // Valid: spreading React.FormHTMLAttributes (React-defined ref)
    tsx`
      import type { FormHTMLAttributes } from "react";

      function MyForm({ ...props }: FormHTMLAttributes<HTMLFormElement>) {
        return <form {...props} />;
      }
    `,
    // Valid: spreading React.TextareaHTMLAttributes (React-defined ref)
    tsx`
      import type { TextareaHTMLAttributes } from "react";

      function MyTextarea({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
        return <textarea {...props} />;
      }
    `,
    // Valid: spreading from React.forwardRef callback — ref passed separately (React-defined ref)
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
    // Valid: spreading Omit<ComponentProps> that does not strip ref but is React-defined
    tsx`
      import { ComponentProps } from "react";

      function PaginationItem({ ...props }: Omit<React.ComponentProps<"li">, "value">) {
        return <li data-slot="pagination-item" {...props} />;
      }
    `,
    // Valid: multiple spreads, none containing ref
    tsx`
      const App = () => {
        const style = { color: "red" };
        const attrs = { id: "test" };
        return <div {...style} {...attrs} />;
      };
    `,
    // Valid: spreading from Partial<> without ref in base
    tsx`
      type BaseProps = { id: string; className: string };
      const App = () => {
        const props: Partial<BaseProps> = { id: "test" };
        return <div {...props} />;
      };
    `,
    // Valid: spreading from a variable with Record type (no ref)
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
    // Valid: spreading custom component props without ref
    tsx`
      interface MyProps {
        title: string;
        description?: string;
      }
      function MyComponent({ ...props }: MyProps) {
        return <div>{props.title}</div>;
      }
    `,
    // Valid: spreading from PropsWithRef (React-defined ref)
    tsx`
      import type { PropsWithRef } from "react";

      function MyInput({ ...props }: PropsWithRef<React.ComponentProps<"input">>) {
        return <input {...props} />;
      }
    `,
    // Valid: ref property typed as React.Ref (React-defined type alias)
    tsx`
      import React from "react";

      declare let someValues: { id: string; className: string; ref: React.Ref<HTMLDivElement> };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: ref property typed as Ref imported from react
    tsx`
      import type { Ref } from "react";

      declare let someValues: { id: string; className: string; ref: Ref<HTMLDivElement> };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: ref property typed as RefObject imported from react
    tsx`
      import type { RefObject } from "react";

      declare let someValues: { id: string; className: string; ref: RefObject<HTMLDivElement> };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: ref property typed as LegacyRef imported from react
    tsx`
      import type { LegacyRef } from "react";

      declare let someValues: { id: string; className: string; ref: LegacyRef<HTMLDivElement> };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
    // Valid: ref property typed as RefCallback imported from react
    tsx`
      import type { RefCallback } from "react";

      declare let someValues: { id: string; className: string; ref: RefCallback<HTMLDivElement> };

      function MyComponent() {
        return <div {...someValues} data-slot="pagination-item" />;
      }
    `,
  ],
});
