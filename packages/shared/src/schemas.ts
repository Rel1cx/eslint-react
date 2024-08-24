import type { InferOutput } from "valibot";
import { array, boolean, instance, object, optional, string } from "valibot";

/**
 * @internal
 * @description
 * This allows the rule to know some key information before checking for user-defined hooks.
 * For example, the position of the `deps` argument for the user-defined `useCustomEffect` hook that represents the built-in `useEffect` hook.
 */
export const CustomHookSchema = object({
  // TODO: Define the schema for custom hooks
});

/**
 * @internal
 */
export const CustomAttributeSchema = object({
  /**
   * The name of the attribute in the user-defined component.
   * @example
   * "to"
   */
  name: string(),
  /**
   * The name of the attribute in the built-in component.
   * @example
   * "href"
   */
  as: optional(string()),
  /**
   * Whether the attribute is controlled or not in the user-defined component.
   * @example
   * `true`
   */
  controlled: optional(boolean()),
  /**
   * The default value of the attribute in the user-defined component.
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
 * Which attribute is used as the `href` prop for the user-defined `Link` component that represents the built-in `a` element.
 * Which attributes are used as `children` props for a user-defined `Button` component to receive children of that component.
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
   * Pre-defined attributes that are used in the user-defined component.
   * @example
   * `Link` component has a `to` attribute that represents the `href` attribute in the built-in `a` element with a default value of `"/"`.
   */
  attributes: optional(array(CustomAttributeSchema), []),
});
/* eslint-enable perfectionist/sort-objects */

export const CustomComponentNormalizedSchema = object({
  name: string(),
  as: optional(string()),
  attributes: optional(array(CustomAttributeSchema), []),
  re: instance(RegExp),
  selector: optional(string()),
});

/* eslint-disable perfectionist/sort-objects */
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
  importSource: optional(string()),
  /**
   * The identifier that’s used for JSX Element creation.
   * @default `"createElement"`
   */
  jsxPragma: optional(string()),
  /**
   * The identifier that’s used for JSX fragment elements.
   * @description This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").
   * @default `"Fragment"`
   */
  jsxPragmaFrag: optional(string()),
  /**
   * The name of the prop that is used for polymorphic components.
   * @description This is used to determine the type of the component.
   * @example `"as"`
   */
  polymorphicPropName: optional(string()),
  /**
   * @internal
   */
  strict: optional(boolean()),
  /**
   * @internal
   */
  skipImportCheck: optional(boolean(), true),
  /**
   * React version to use, "detect" means auto detect React version from the project’s dependencies.
   * If `importSource` is specified, an equivalent version of React should be provided here.
   * @example `"18.3.1"`
   * @default `"detect"`
   */
  version: optional(string()),
  /**
   * An array of user-defined components
   * @description This is used to inform the ESLint React plugins how to treat these components during checks.
   * @example `[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }, { name: "rel", defaultValue: "noopener noreferrer" }] }]`
   */
  additionalComponents: optional(array(CustomComponentSchema)),
  /**
   * A object of aliases for React built-in hooks.
   * @description ESLint React will recognize these aliases as equivalent to the built-in hooks in all its rules.
   * @example `{ useLayoutEffect: ["useIsomorphicLayoutEffect"] }`
   */
  additionalHooks: optional(object({
    use: optional(array(string())),
    useActionState: optional(array(string())),
    useCallback: optional(array(string())),
    useContext: optional(array(string())),
    useDebugValue: optional(array(string())),
    useDeferredValue: optional(array(string())),
    useEffect: optional(array(string())),
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
  })),
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

export type CustomHook = InferOutput<typeof CustomHookSchema>;

export type CustomAttribute = InferOutput<typeof CustomAttributeSchema>;

export type CustomComponent = InferOutput<typeof CustomComponentSchema>;

export type CustomComponentNormalized = InferOutput<typeof CustomComponentNormalizedSchema>;

export type ESLintReactSettings = InferOutput<typeof ESLintReactSettingsSchema>;

export type ESLintSettings = InferOutput<typeof ESLintSettingsSchema>;

/**
 * This is an expanded version of `ESLintReactSettings` with all shorthand properties expanded.
 * @internal
 */
export interface ESLintReactSettingsNormalized extends ESLintReactSettings {
  additionalComponents: CustomComponentNormalized[];
  components: Map<string, string>;
}
