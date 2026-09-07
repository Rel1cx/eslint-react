/* eslint-disable perfectionist/sort-objects */
import type { RuleContext } from "@eslint-react/eslint";

export interface EnvConfig {
  customHooks: {
    [hookName: string]: {
      /**
       * Specifies whether hook arguments may be aliased by other arguments or by the
       * return value of the function. Defaults to false. When enabled, this allows the
       * compiler to avoid memoizing arguments.
       */
      noAlias: boolean;
      /**
       * Specifies whether the hook returns data that is composed of:
       * - undefined
       * - null
       * - boolean
       * - number
       * - string
       * - arrays whose items are also transitiveMixed
       * - objects whose values are also transitiveMixed
       */
      transitiveMixedData: boolean;
      /**
       * The kind of value returned by the hook. Allows indicating that a hook returns
       * a primitive or already-frozen value, which can allow more precise memoization
       * of callers.
       */
      valueKind: "maybefrozen" | "frozen" | "primitive" | "global" | "mutable" | "context";
    };
  };
  /**
   * If enabled, this will treat objects named as `ref` or if their names end with the substring `Ref`,
   * and contain a property named `current`, as React refs.
   *
   * ```
   * const ref = useMyRef();
   * const myRef = useMyRef2();
   * useEffect(() => {
   *   ref.current = ...;
   *   myRef.current = ...;
   * })
   * ```
   *
   * Here the variables `ref` and `myRef` will be typed as Refs.
   */
  enableTreatRefLikeIdentifiersAsRefs: boolean;
  /**
   * Treat identifiers as SetState type if both
   * - they are named with a "set-" prefix
   * - they are called somewhere
   */
  enableTreatSetIdentifiersAsStateSetters: boolean;
}

/**
 * Generates the environment config from the rule context.
 *
 * @todo Infer the config properties from the rule context.
 * @param _ The rule context.
 * @returns The environment config.
 */
export function getEnvConfig(_: RuleContext): EnvConfig {
  return {
    customHooks: {
      useFragment: {
        noAlias: true,
        transitiveMixedData: true,
        valueKind: "frozen",
      },
      useLazyLoadQuery: {
        noAlias: true,
        transitiveMixedData: true,
        valueKind: "frozen",
      },
      usePaginationFragment: {
        noAlias: true,
        transitiveMixedData: true,
        valueKind: "frozen",
      },
      usePreloadedQuery: {
        noAlias: true,
        transitiveMixedData: true,
        valueKind: "frozen",
      },
      useRefetchableFragment: {
        noAlias: true,
        transitiveMixedData: true,
        valueKind: "frozen",
      },
      useHistory: {
        noAlias: false,
        transitiveMixedData: false,
        valueKind: "mutable",
      },
      useNavigate: {
        noAlias: false,
        transitiveMixedData: false,
        valueKind: "mutable",
      },
      useNavigation: {
        noAlias: false,
        transitiveMixedData: false,
        valueKind: "mutable",
      },
      useRouter: {
        noAlias: false,
        transitiveMixedData: false,
        valueKind: "mutable",
      },
      useWorld: {
        noAlias: false,
        transitiveMixedData: false,
        valueKind: "mutable",
      },
    },
    enableTreatRefLikeIdentifiersAsRefs: true,
    enableTreatSetIdentifiersAsStateSetters: false,
  };
}
