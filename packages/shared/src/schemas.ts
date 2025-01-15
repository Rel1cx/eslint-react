import type { InferOutput } from "valibot";
import { array, boolean, object, optional, parse, string } from "valibot";

/**
 * @internal
 */
export const CustomComponentPropSchema = object({
  /**
   * The name of the prop in the user-defined component.
   * @example
   * "to"
   */
  name: string(),
  /**
   * The name of the prop in the built-in component.
   * @example
   * "href"
   */
  as: optional(string()),
  /**
   * Whether the prop is controlled or not in the user-defined component.
   * @example
   * `true`
   */
  controlled: optional(boolean()),
  /**
   * The default value of the prop in the user-defined component.
   * @example
   * `"/"`
   */
  defaultValue: optional(string()),
});

/* eslint-disable perfectionist/sort-objects */
/**
 * @internal
 * @description
 * This will provide some key information to the rule before checking for user-defined components.
 * For example:
 * Which prop is used as the `href` prop for the user-defined `Link` component that represents the built-in `a` element.
 */
export const CustomComponentSchema = object({
  /**
   * The name of the user-defined component.
   * @example
   * "Link"
   */
  name: string(),
  /**
   * The ESQuery selector to select the component precisely.
   * @internal
   * @example
   * `JSXElement:has(JSXAttribute[name.name='component'][value.value='a'])`
   */
  selector: optional(string()),
  /**
   * The name of the built-in component that the user-defined component represents.
   * @example
   * "a"
   */
  as: optional(string()),
  /**
   * Props mapping between the user-defined component and the built-in component.
   * @example
   * `Link` component has a `to` attribute that represents the `href` attribute in the built-in `a` element with a default value of `"/"`.
   */
  props: optional(array(CustomComponentPropSchema)),
  /**
   * Attributes mapping between the user-defined component and the built-in component.
   * @example
   * `Link` component has a `to` attribute that represents the `href` attribute in the built-in `a` element with a default value of `"/"`.
   * @deprecated Use `props` instead
   */
  attributes: optional(array(CustomComponentPropSchema)),
});

export const CustomHooksSchema = object({
  use: optional(array(string())),
  useActionState: optional(array(string())),
  useCallback: optional(array(string())),
  useContext: optional(array(string())),
  useDebugValue: optional(array(string())),
  useDeferredValue: optional(array(string())),
  useEffect: optional(array(string())),
  useFormStatus: optional(array(string())),
  useId: optional(array(string())),
  useImperativeHandle: optional(array(string())),
  useInsertionEffect: optional(array(string())),
  useLayoutEffect: optional(array(string())),
  useMemo: optional(array(string())),
  useOptimistic: optional(array(string())),
  useReducer: optional(array(string())),
  useRef: optional(array(string())),
  useState: optional(array(string())),
  useSyncExternalStore: optional(array(string())),
  useTransition: optional(array(string())),
});

/**
 * @internal
 */
export const ESLintReactSettingsSchema = object({
  /**
   * The source where React is imported from.
   * @description This allows to specify a custom import location for React when not using the official distribution.
   * @default `"react"`
   * @example `"@pika/react"`
   */
  importSource: optional(string(), "react"),
  /**
   * The identifier that’s used for JSX Element creation.
   * @default `"createElement"`
   * @deprecated
   */
  jsxPragma: optional(string(), "createElement"),
  /**
   * The identifier that’s used for JSX fragment elements.
   * @description This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").
   * @default `"Fragment"`
   * @deprecated
   */
  jsxPragmaFrag: optional(string(), "Fragment"),
  /**
   * The name of the prop that is used for polymorphic components.
   * @description This is used to determine the type of the component.
   * @example `"as"`
   */
  polymorphicPropName: optional(string(), "as"),
  /**
   * @internal
   */
  strict: optional(boolean(), false),
  /**
   * @internal
   */
  strictImportCheck: optional(boolean(), false),
  /**
   * React version to use, "detect" means auto detect React version from the project’s dependencies.
   * If `importSource` is specified, an equivalent version of React should be provided here.
   * @example `"18.3.1"`
   * @default `"detect"`
   */
  version: optional(string(), "detect"),
  /**
   * An array of user-defined components
   * @description This is used to inform the ESLint React plugins how to treat these components during checks.
   * @example `[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }, { name: "rel", defaultValue: "noopener noreferrer" }] }]`
   */
  additionalComponents: optional(array(CustomComponentSchema)),
  /**
   * A object to define additional hooks that are equivalent to the built-in React Hooks.
   * @description ESLint React will recognize these aliases as equivalent to the built-in hooks in all its rules.
   * @example `{ useLayoutEffect: ["useIsomorphicLayoutEffect"] }`
   */
  additionalHooks: optional(CustomHooksSchema),
});
/* eslint-enable perfectionist/sort-objects */

/**
 * @internal
 */
export const ESLintSettingsSchema = optional(
  object({
    "react-x": optional(ESLintReactSettingsSchema),
    /** @deprecated Use `react-x` instead */
    reactOptions: optional(ESLintReactSettingsSchema),
  }),
  {},
);

export type CustomComponent = InferOutput<typeof CustomComponentSchema>;

export type CustomComponentProp = InferOutput<typeof CustomComponentPropSchema>;

export type CustomHooks = InferOutput<typeof CustomHooksSchema>;

export type ESLintReactSettings = InferOutput<typeof ESLintReactSettingsSchema>;

export type ESLintSettings = InferOutput<typeof ESLintSettingsSchema>;

/**
 * The default ESLint settings for "react-x".
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  ...parse(ESLintReactSettingsSchema, {}),
  additionalHooks: {
    useLayoutEffect: ["useIsomorphicLayoutEffect"],
  },
} as const satisfies ESLintReactSettings;

// #endregion
