import * as S from "@effect/schema/Schema";

export const ESLintReactSettings = S.Struct({
  additionalHooks: S.optional(
    S.Struct({
      use: S.optional(S.String),
      useCallback: S.optional(S.Array(S.String)),
      useContext: S.optional(S.Array(S.String)),
      useDebugValue: S.optional(S.Array(S.String)),
      useDeferredValue: S.optional(S.Array(S.String)),
      useEffect: S.optional(S.Array(S.String)),
      useId: S.optional(S.Array(S.String)),
      useImperativeHandle: S.optional(S.Array(S.String)),
      useInsertionEffect: S.optional(S.Array(S.String)),
      useLayoutEffect: S.optional(S.Array(S.String)),
      useMemo: S.optional(S.Array(S.String)),
      useOptimistic: S.optional(S.Array(S.String)),
      useReducer: S.optional(S.Array(S.String)),
      useRef: S.optional(S.Array(S.String)),
      useState: S.optional(S.Array(S.String)),
      useSyncExternalStore: S.optional(S.Array(S.String)),
      useTransition: S.optional(S.Array(S.String)),
    }),
  ),
  importSource: S.optional(S.String),
  jsxPragma: S.optional(S.String),
  jsxPragmaFrag: S.optional(S.String),
  strict: S.optional(S.Boolean),
  version: S.optional(S.String),
});

export type ESLintReactSettings = S.Schema.Type<typeof ESLintReactSettings>;

export const ESLintSettings = S.Struct({
  "react-x": S.optional(ESLintReactSettings),
  reactOptions: S.optional(ESLintReactSettings),
});

export type ESLintSettings = S.Schema.Type<typeof ESLintSettings>;
