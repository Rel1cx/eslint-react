import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-read-only-props";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      code: /* tsx */ `
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
        import { FC } from "react";
        const App: FC<{ id: string; className: string }> = (props) => {
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
        import { FC } from "react";
        const App: FC<{ id: string; className: string }> = ({ id, className }) => {
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
        import React from "react";

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
        import React from "react";

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
        import { FC } from "react";

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
        import React, { memo } from "react";

        const App = memo(({ id, className }: { id: string; className: string }) => {
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
        import React, { memo } from "react";

        const defaultProps = { id: "default-id", className: "default-class" };
        type Props = typeof defaultProps;
        const App = memo(({ id, className }: Props) => {
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
        import React, { forwardRef } from "react";

        const App = forwardRef<HTMLDivElement, { id: string; className: string }>(({ id, className }, ref) => {
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
        import React, { forwardRef } from "react";

        const defaultProps = { id: "default-id", className: "default-class" };
        type Props = typeof defaultProps;
        const App = forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
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
        import React, { memo, forwardRef } from "react";

        const App = memo(forwardRef<HTMLDivElement, { id: string; className: string }>(({ id, className }, ref) => {
            return <div id={id} className={className} ref={ref} />
        }));
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
      import React from "react";

      type DeepReadonly<T> = Readonly<{[K in keyof T]: T[K] extends (number | string | symbol) ? Readonly<T[K]> : T[K] extends Array<infer A> ? Readonly<Array<DeepReadonly<A>>> : DeepReadonly<T[K]>;}>;

      export const App: React.FC<DeepReadonly<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    /* tsx */ `
      import React from "react";
      import { ReadonlyDeep } from "type-fest";

      export const App: React.FC<ReadonlyDeep<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    /* tsx */ `
      const App = function ({ id, className }: { readonly id: string; readonly className: string }) {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      import { FC } from "react";
      const App: FC<{ readonly id: string; readonly className: string }> = (props) => {
          return <div id={props.id} className={props.className} />
      }
    `,
    /* tsx */ `
      import { FC } from "react";
      const App: FC<{ readonly id: string; readonly className: string }> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      import { FC } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;

      function App({ id, className }: Props) {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      import { FC } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App: FC<Props> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      import { FC } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App: FC<typeof defaultProps> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App = ({ id, className }: typeof defaultProps) => {
          return <div id={id} className={className} />
      }
    `,
    /* tsx */ `
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
      import React, { memo } from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = memo<Props>(({ id, className }) => {
          return <div id={id} className={className} />
      });
    `,
    // memo with generic and default props
    /* tsx */ `
      import React, { memo } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App = memo<Props>(({ id, className }) => {
          return <div id={id} className={className} />
      });
    `,
    // forwardRef with generic
    /* tsx */ `
      import React, { forwardRef } from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      });
    `,
    // forwardRef with generic and default props
    /* tsx */ `
      import React, { forwardRef } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App = forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      });
    `,
    // memo and forwardRef with generic
    /* tsx */ `
      import React, { memo, forwardRef } from "react";

      type Props = { readonly id: string; readonly className: string };
      const App = memo(forwardRef<HTMLDivElement, Props>(({ id, className }, ref) => {
          return <div id={id} className={className} ref={ref} />
      }));
    `,
  ],
});
