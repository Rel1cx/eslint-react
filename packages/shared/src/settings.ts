/* eslint-disable perfectionist/sort-objects */
import type { _ } from "@eslint-react/eff";
import type { ESLint, SharedConfigurationSettings } from "@typescript-eslint/utils/ts-eslint"; // eslint-disable-line @typescript-eslint/no-unused-vars
import type { PartialDeep } from "type-fest";
import { getOrElseUpdate, identity } from "@eslint-react/eff";
import { RegExp as RE, type RuleContext } from "@eslint-react/kit";

import { match, P } from "ts-pattern";
import * as z from "zod";

import { getReactVersion } from "./get-react-version";

export const CustomComponentPropSchema = z.object({
  /**
   * The name of the prop in the user-defined component.
   * @example
   * "to"
   */
  name: z.string(),
  /**
   * The name of the prop in the host component.
   * @example
   * "href"
   */
  as: z.optional(z.string()),
  /**
   * Whether the prop is controlled or not in the user-defined component.
   * @internal
   * @example
   * `true`
   */
  controlled: z.optional(z.boolean()),
  /**
   * The default value of the prop in the user-defined component.
   * @example
   * `"/"`
   */
  defaultValue: z.optional(z.string()),
});

/**
 * @description
 * This will provide some key information to the rule before checking for user-defined components.
 * For example:
 * Which prop is used as the `href` prop for the user-defined `Link` component that represents the built-in `a` element.
 */
export const CustomComponentSchema = z.object({
  /**
   * The name of the user-defined component.
   * @example
   * "Link"
   */
  name: z.string(),
  /**
   * The name of the host component that the user-defined component represents.
   * @example
   * "a"
   */
  as: z.optional(z.string()),
  /**
   * Attributes mapping between the user-defined component and the host component.
   * @example
   * `Link` component has a `to` attribute that represents the `href` attribute in the built-in `a` element with a default value of `"/"`.
   */
  attributes: z.optional(z.array(CustomComponentPropSchema)),
  /**
   * The ESQuery selector to select the component precisely.
   * @internal
   * @example
   * `JSXElement:has(JSXAttribute[name.name='component'][value.value='a'])`
   */
  selector: z.optional(z.string()),
});

export const CustomHooksSchema = z.object({
  use: z.optional(z.array(z.string())),
  useActionState: z.optional(z.array(z.string())),
  useCallback: z.optional(z.array(z.string())),
  useContext: z.optional(z.array(z.string())),
  useDebugValue: z.optional(z.array(z.string())),
  useDeferredValue: z.optional(z.array(z.string())),
  useEffect: z.optional(z.array(z.string())),
  useFormStatus: z.optional(z.array(z.string())),
  useId: z.optional(z.array(z.string())),
  useImperativeHandle: z.optional(z.array(z.string())),
  useInsertionEffect: z.optional(z.array(z.string())),
  useLayoutEffect: z.optional(z.array(z.string())),
  useMemo: z.optional(z.array(z.string())),
  useOptimistic: z.optional(z.array(z.string())),
  useReducer: z.optional(z.array(z.string())),
  useRef: z.optional(z.array(z.string())),
  useState: z.optional(z.array(z.string())),
  useSyncExternalStore: z.optional(z.array(z.string())),
  useTransition: z.optional(z.array(z.string())),
});

/**
 * @internal
 */
export const ESLintReactSettingsSchema = z.object({
  /**
   * The source where React is imported from.
   * @description This allows to specify a custom import location for React when not using the official distribution.
   * @default `"react"`
   * @example `"@pika/react"`
   */
  importSource: z.optional(z.string()),
  /**
   * The identifier that's used for JSX Element creation.
   * @default `"createElement"`
   * @deprecated
   */
  jsxPragma: z.optional(z.string()),
  /**
   * The identifier that's used for JSX fragment elements.
   * @description This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").
   * @default `"Fragment"`
   * @deprecated
   */
  jsxPragmaFrag: z.optional(z.string()),
  /**
   * The name of the prop that is used for polymorphic components.
   * @description This is used to determine the type of the component.
   * @example `"as"`
   */
  polymorphicPropName: z.optional(z.string()),
  /**
   * @default `true`
   * @internal
   */
  strict: z.optional(z.boolean()),
  /**
   * Check both the shape and the import to determine if an API is from React.
   * @default `true`
   * @internal
   */
  skipImportCheck: z.optional(z.boolean()),
  /**
   * React version to use, "detect" means auto detect React version from the project's dependencies.
   * If `importSource` is specified, an equivalent version of React should be provided here.
   * @example `"18.3.1"`
   * @default `"detect"`
   */
  version: z.optional(z.string()),
  /**
   * A object to define additional hooks that are equivalent to the built-in React Hooks.
   * @description ESLint React will recognize these aliases as equivalent to the built-in hooks in all its rules.
   * @example `{ useEffect: ["useIsomorphicLayoutEffect"] }`
   */
  additionalHooks: z.optional(CustomHooksSchema),
  /**
   * An array of user-defined components
   * @description This is used to inform the ESLint React plugins how to treat these components during checks.
   * @example `[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }, { name: "rel", defaultValue: "noopener noreferrer" }] }]`
   */
  additionalComponents: z.optional(z.array(CustomComponentSchema)),
});

/**
 * @internal
 */
export const ESLintSettingsSchema = z.optional(
  z.object({
    "react-x": z.optional(z.unknown()),
  }),
  {},
);

export type CustomComponent = z.infer<typeof CustomComponentSchema>;

export type CustomComponentProp = z.infer<typeof CustomComponentPropSchema>;

export type CustomHooks = z.infer<typeof CustomHooksSchema>;

export type ESLintSettings = z.infer<typeof ESLintSettingsSchema>;

export type ESLintReactSettings = z.infer<typeof ESLintReactSettingsSchema>;

export function isESLintSettings(settings: unknown): settings is ESLintSettings {
  return ESLintSettingsSchema.safeParse(settings).success;
}

export function isESLintReactSettings(settings: unknown): settings is ESLintReactSettings {
  return ESLintReactSettingsSchema.safeParse(settings).success;
}

/**
 * The default ESLint settings for "react-x".
 */
export const DEFAULT_ESLINT_REACT_SETTINGS = {
  version: "detect",
  importSource: "react",
  strict: true,
  skipImportCheck: true,
  polymorphicPropName: "as",
  additionalComponents: [],
  additionalHooks: {
    useEffect: ["useIsomorphicLayoutEffect"],
    useLayoutEffect: ["useIsomorphicLayoutEffect"],
  },
} as const satisfies ESLintReactSettings;

export const DEFAULT_ESLINT_SETTINGS = {
  "react-x": DEFAULT_ESLINT_REACT_SETTINGS,
} as const satisfies ESLintSettings;

export interface CustomComponentPropNormalized {
  name: string;
  as: string;
  // controlled?: boolean | _;
  defaultValue?: string | _;
}

export interface CustomComponentNormalized {
  name: string;
  as: string;
  attributes: CustomComponentPropNormalized[];
  re: { test(s: string): boolean };
  // selector?: string | _;
}

export interface ESLintReactSettingsNormalized {
  additionalHooks: CustomHooks;
  components: CustomComponentNormalized[];
  importSource: string;
  polymorphicPropName: string | _;
  skipImportCheck: boolean;
  strict: boolean;
  version: string;
}

export const coerceESLintSettings = (settings: unknown): PartialDeep<ESLintSettings> => {
  return settings as PartialDeep<ESLintSettings>;
};

export const decodeESLintSettings = (settings: unknown): ESLintSettings => {
  if (isESLintSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_SETTINGS;
};

export const coerceSettings = (settings: unknown): PartialDeep<ESLintReactSettings> => {
  return settings as PartialDeep<ESLintReactSettings>;
};

export const decodeSettings = (settings: unknown): ESLintReactSettings => {
  if (isESLintReactSettings(settings)) {
    return settings;
  }
  return DEFAULT_ESLINT_REACT_SETTINGS;
};

export const normalizeSettings = ({
  additionalComponents = [],
  additionalHooks = {},
  importSource = "react",
  polymorphicPropName = "as",
  skipImportCheck = true,
  strict = true,
  version,
  ...rest
}: ESLintReactSettings) => {
  return {
    ...rest,
    components: additionalComponents.map((component) => {
      const { name, as = name, attributes = [], ...rest } = component;
      const re = RE.toRegExp(name);
      return {
        ...rest,
        name,
        re,
        as,
        attributes: attributes.map(({ name, as = name, ...rest }) => ({
          ...rest,
          name,
          as,
        })),
      };
    }),
    additionalHooks,
    importSource,
    polymorphicPropName,
    skipImportCheck,
    strict,
    version: match(version)
      .with(P.union(P.nullish, "", "detect"), () => getReactVersion("19.1.0"))
      .otherwise(identity),
  } as const satisfies ESLintReactSettingsNormalized;
};

const cache = new Map<unknown, ESLintReactSettingsNormalized>();

export function getSettingsFromContext(context: RuleContext): ESLintReactSettingsNormalized {
  const settings = context.settings;
  return getOrElseUpdate(
    cache,
    settings["react-x"],
    () => normalizeSettings(decodeSettings(settings["react-x"])),
  );
}

/**
 * A helper function to define settings for "react-x" with type checking in JavaScript files.
 * @param settings The settings.
 * @returns The settings.
 */
export const defineSettings: (settings: ESLintReactSettings) => ESLintReactSettings = identity;

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    ["react-x"]?: Partial<ESLintReactSettings>;
  }
}
