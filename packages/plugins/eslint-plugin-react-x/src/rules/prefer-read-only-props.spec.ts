import tsx from "dedent";

import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-read-only-props";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = (props: { id: string; className: string }) => {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        function App(props: { id: string; className: string }) {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = function (props: { id: string; className: string }) {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = function ({ id, className }: { id: string; className: string }) {
            return <div id={id} className={className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = function ({ id, className }: { readonly id: string; className: string }) {
            return <div id={id} className={className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App: React.FC<{ id: string; className: string }> = (props) => {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App: React.FC<{ id: string; className: string }> = ({ id, className }) => {
            return <div id={id} className={className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        export const App: React.FC<{ id: string; className: string }> = (props) => {
          return <div className={props.className} id={props.id} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        export const App: React.FC<{ readonly id: string; readonly className: string } | { id: string; className: string }> = (props) => {
          return <div className={props.className} id={props.id} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const defaultProps = { id: "default-id", className: "default-class" };
        type Props = typeof defaultProps;

        function App({ id, className }: Props) {
            return <div id={id} className={className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        interface HSV {
          h: number;
          s: number;
          v: number;
        }
        interface ValuePickerProps {
          Disabled: boolean;
          readonly Hsv: HSV
          readonly onChange: () => void;
        }
        export function ValuePicker({ Disabled, Hsv, onChange }: ValuePickerProps) {
          return <div />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        interface HSV {
          h: number;
          s: number;
          v: number;
        }
        interface ValuePickerProps {
          readonly Disabled: boolean;
          Hsv: HSV
          onChange: () => void;
        }
        export function ValuePicker({ Disabled, Hsv, onChange }: ValuePickerProps) {
          return <div />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    { // memo with generic
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = React.memo(({ id, className }: { id: string; className: string }) => {
            return <div id={id} className={className} />
        });
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    { // memo with generic and default props
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const defaultProps = { id: "default-id", className: "default-class" };
        type Props = typeof defaultProps;
        const App = React.memo(({ id, className }: Props) => {
            return <div id={id} className={className} />
        });
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    { // forwardRef with generic
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = React.forwardRef<HTMLDivElement, { id: string; className: string }>(({ id, className }, ref) => {
            return <div id={id} className={className} ref={ref} />
        });
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    { // forwardRef with generic and default props
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const defaultProps = { id: "default-id", className: "default-class" };
        type Props = typeof defaultProps;
        const App = React.forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
            return <div id={id} className={className} ref={ref} />
        });
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    { // memo and forwardRef with generic
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = React.memo(React.forwardRef<HTMLDivElement, { id: string; className: string }>(({ id, className }, ref) => {
            return <div id={id} className={className} ref={ref} />
        }));
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    // union type with readonly and non-readonly variants
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        type ReadonlyProps = { readonly id: string; readonly className: string };
        type WritableProps = { id: string, className: string };
        type Props = ReadonlyProps | WritableProps;
        const App: React.FC<Props> = (props) => {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    // union type with readonly and non-readonly variants
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        type ReadonlyProps = { readonly id: string; readonly className: string };
        type WritableProps = { title: string, description: string };
        type Props = ReadonlyProps | WritableProps;
        const App: React.FC<Props> = (props) => {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    // intersection type with readonly and non-readonly variants
    {
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        type ReadonlyProps = { readonly id: string; readonly className: string };
        type WritableProps = { title: string, description: string };
        type Props = ReadonlyProps & WritableProps;
        const App: React.FC<Props> = (props) => {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
    {
      // types inside namespace
      code: tsx`
        /// <reference types="react" />
        /// <reference types="react-dom" />

        namespace ItemsListElementSkeleton {
          export interface Props {
           withArtists?: boolean
           withPlayedAt?: boolean
           position?: number
           positionSize?: ItemPosition.Props['size']
           positionClassName?: string
           withPlaysOrPlayTime?: boolean
          }
        }

        function ItemsListElementSkeleton({
          position,
          positionSize,
          positionClassName,
          withArtists,
          withPlayedAt,
          withPlaysOrPlayTime,
        }: ItemsListElementSkeleton.Props) {
          // ...
          return null;
        }

        export { ItemsListElementSkeleton }
      `,
      errors: [
        {
          messageId: "preferReadOnlyProps",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type DeepReadonly<T> = Readonly<{[K in keyof T]: T[K] extends (number | string | symbol) ? Readonly<T[K]> : T[K] extends Array<infer A> ? Readonly<Array<DeepReadonly<A>>> : DeepReadonly<T[K]>;}>;

      export const App: React.FC<DeepReadonly<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";
      import { ReadonlyDeep } from "type-fest";

      export const App: React.FC<ReadonlyDeep<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const App = function ({ id, className }: { readonly id: string; readonly className: string }) {
          return <div id={id} className={className} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const App: React.FC<{ readonly id: string; readonly className: string }> = (props) => {
          return <div id={props.id} className={props.className} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const App: React.FC<{ readonly id: string; readonly className: string }> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;

      function App({ id, className }: Props) {
          return <div id={id} className={className} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App: React.FC<Props> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App: React.FC<typeof defaultProps> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App = ({ id, className }: typeof defaultProps) => {
          return <div id={id} className={className} />
      }
    `,
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      interface HSV {
        readonly h: number;
        readonly s: number;
        readonly v: number;
      }
      interface ValuePickerProps {
        readonly Disabled: boolean;
        readonly Hsv: HSV
        readonly onChange: () => void;
      }
      export function ValuePicker({ Disabled, Hsv, onChange }: ValuePickerProps) {
        return <div />
      }
    `,
    // memo with generic
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = React.memo<Props>(({ id, className }) => {
          return <div id={id} className={className} />
      });
    `,
    // memo with generic and default props
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App = React.memo<Props>(({ id, className }) => {
          return <div id={id} className={className} />
      });
    `,
    // forwardRef with generic
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = React.forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      });
    `,
    // forwardRef with generic and default props
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App = React.forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      });
    `,
    // memo and forwardRef with generic
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = React.memo(React.forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      }));
    `, // union type with readonly and non-readonly variants
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type ReadonlyProps1 = { readonly id: string; readonly className: string };
      type ReadonlyProps2 = { readonly title: string; readonly description: string };
      type Props = ReadonlyProps1 | ReadonlyProps2;
      const App: React.FC<Props> = (props) => {
          return <div id={props.id} className={props.className} />
      }
    `,
    // intersection type with readonly and non-readonly variants
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type ReadonlyProps1 = { readonly id: string; readonly className: string };
      type ReadonlyProps2 = { readonly title: string; readonly description: string };
      type Props = ReadonlyProps1 & ReadonlyProps2;
      const App: React.FC<Props> = (props) => {
          return <div id={props.id} className={props.className} />
      }
    `,
    // types inside namespace
    tsx`
      /// <reference types="react" />
      /// <reference types="react-dom" />

      namespace ItemsListElementSkeleton {
        export interface Props {
         readonly withArtists?: boolean
         readonly withPlayedAt?: boolean
         readonly position?: number
         readonly positionSize?: ItemPosition.Props['size']
         readonly positionClassName?: string
         readonly withPlaysOrPlayTime?: boolean
        }
      }

      function ItemsListElementSkeleton({
        position,
        positionSize,
        positionClassName,
        withArtists,
        withPlayedAt,
        withPlaysOrPlayTime,
      }: ItemsListElementSkeleton.Props) {
        // ...
        return null;
      }

      export { ItemsListElementSkeleton }
    `,
  ],
});
