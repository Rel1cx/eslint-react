import dedent from "dedent";

import { allValid, ruleTesterWithTypes } from "../../../../../test";
import rule, { RULE_NAME } from "./prefer-read-only-props";

ruleTesterWithTypes.run(RULE_NAME, rule, {
  invalid: [
    {
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
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
      code: dedent`
        import React from "react";

        export const App: React.FC<{ id: string; className: string } | { readonly id: string; readonly className: string }> = (props) => {
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
      code: dedent`
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
  ],
  valid: [
    ...allValid,
    dedent`
      import React from "react";

      type DeepReadonly<T> = Readonly<{[K in keyof T]: T[K] extends (number | string | symbol) ? Readonly<T[K]> : T[K] extends Array<infer A> ? Readonly<Array<DeepReadonly<A>>> : DeepReadonly<T[K]>;}>;

      export const App: React.FC<DeepReadonly<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    dedent`
      import React from "react";
      import { ReadonlyDeep } from "type-fest";

      export const App: React.FC<ReadonlyDeep<{ id: string; className: string }>> = (props) => {
        return <div className={props.className} id={props.id} />
      }
    `,
    dedent`
      const App = function ({ id, className }: { readonly id: string; readonly className: string }) {
          return <div id={id} className={className} />
      }
    `,
    dedent`
      import { FC } from "react";
      const App: FC<{ readonly id: string; readonly className: string }> = (props) => {
          return <div id={props.id} className={props.className} />
      }
    `,
    dedent`
      import { FC } from "react";
      const App: FC<{ readonly id: string; readonly className: string }> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    dedent`
      import { FC } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;

      function App({ id, className }: Props) {
          return <div id={id} className={className} />
      }
    `,
    dedent`
      import { FC } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      type Props = typeof defaultProps;
      const App: FC<Props> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    dedent`
      import { FC } from "react";

      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App: FC<typeof defaultProps> = ({ id, className }) => {
          return <div id={id} className={className} />
      }
    `,
    dedent`
      const defaultProps = { id: "default-id", className: "default-class" } as const;
      const App = ({ id, className }: typeof defaultProps) => {
          return <div id={id} className={className} />
      }
    `,
  ],
});
