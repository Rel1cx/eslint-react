import { isCI } from "std-env";

import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-read-only-props";

// FIXME: This can not be tested on GitHub Actions due to types from `@types/react` and `@types/react-dom` failing to resolve when running tests on CI environments.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
!isCI && ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = (props: { id: string; className: string }) => {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        function App(props: { id: string; className: string }) {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = function (props: { id: string; className: string }) {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = function ({ id, className }: { id: string; className: string }) {
            return <div id={id} className={className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = function ({ id, className }: { readonly id: string; className: string }) {
            return <div id={id} className={className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App: React.FC<{ id: string; className: string }> = (props) => {
            return <div id={props.id} className={props.className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App: React.FC<{ id: string; className: string }> = ({ id, className }) => {
            return <div id={id} className={className} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        export const App: React.FC<{ id: string; className: string }> = (props) => {
          return <div className={props.className} id={props.id} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        export const App: React.FC<{ readonly id: string; readonly className: string } | { id: string; className: string }> = (props) => {
          return <div className={props.className} id={props.id} />
        }
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    { // memo with generic
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = React.memo(({ id, className }: { id: string; className: string }) => {
            return <div id={id} className={className} />
        });
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    { // memo with generic and default props
      code: /* tsx */ `
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
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    { // forwardRef with generic
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = React.forwardRef<HTMLDivElement, { id: string; className: string }>(({ id, className }, ref) => {
            return <div id={id} className={className} ref={ref} />
        });
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    { // forwardRef with generic and default props
      code: /* tsx */ `
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
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    { // memo and forwardRef with generic
      code: /* tsx */ `
        /// <reference types="react" />
        /// <reference types="react-dom" />

        import * as React from "react";

        const App = React.memo(React.forwardRef<HTMLDivElement, { id: string; className: string }>(({ id, className }, ref) => {
            return <div id={id} className={className} ref={ref} />
        }));
      `,
      errors: [
        {
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
    {
      code: /* tsx */ `
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
          messageId: "PREFER_READ_ONLY_PROPS",
        },
      ],
    },
  ],
  valid: [
    ...allValid,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type DeepReadonly<T> = Readonly<{[K in keyof T]: T[K] extends (number | string | symbol) ? Readonly<T[K]> : T[K] extends Array<infer A> ? Readonly<Array<DeepReadonly<A>>> : DeepReadonly<T[K]>;}>;

      export const App: React.FC<DeepReadonly<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";
      import { ReadonlyDeep } from "type-fest";

      export const App: React.FC<ReadonlyDeep<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const App = function ({ id, className }: { readonly id: string; readonly className: string }) {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const App: React.FC<{ readonly id: string; readonly className: string }> = (props) => {
          return <div id={props.id} className={props.className} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const App: React.FC<{ readonly id: string; readonly className: string }> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;

      function App({ id, className }: Props) {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App: React.FC<Props> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App: React.FC<typeof defaultProps> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App = ({ id, className }: typeof defaultProps) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
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
        readonly Hsv: HSV
        readonly onChange: () => void;
      }
      export function ValuePicker({ Disabled, Hsv, onChange }: ValuePickerProps) {
        return <div />
      }
    `,
    /* tsx */ `
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
        readonly Hsv: HSV
        // TODO: Support checking if function is readonly
        onChange: () => void;
      }
      export function ValuePicker({ Disabled, Hsv, onChange }: ValuePickerProps) {
        return <div />
      }
    `,
    // memo with generic
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = React.memo<Props>(({ id, className }) => {
          return <div id={id} className={className} />
      });
    `,
    // memo with generic and default props
    /* tsx */ `
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
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = React.forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      });
    `,
    // forwardRef with generic and default props
    /* tsx */ `
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
    /* tsx */ `
      /// <reference types="react" />
      /// <reference types="react-dom" />

      import * as React from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = React.memo(React.forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      }));
    `,
    /* tsx */ `
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
