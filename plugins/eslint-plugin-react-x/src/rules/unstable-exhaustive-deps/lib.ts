import { Extract } from "@eslint-react/ast";
import { DefinitionType, type ScopeVariable } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * An entry of the `hooks` option, based on the `hooks` option of Biome's `useExhaustiveDependencies` rule.
 *
 * Note: Biome's `string[]` form of `stableResult` (stable object properties) is not supported yet.
 */
export interface HookOption {
  /** The name of the Hook */
  name: string;
  /** The position of the closure, starting from zero (ex: `0` for `useEffect`) */
  closureIndex?: number;
  /** The position of the dependencies array, starting from zero (ex: `1` for `useEffect`) */
  dependenciesIndex?: number;
  /** `true` if the result is stable (ex: `useRef`), or the positions of the stable values in the returned array (ex: `1` or `[1]` for `useState`) */
  stableResult?: boolean | number | number[];
}

export interface HookConfigs {
  /** Hooks whose closure is checked against their dependencies array */
  readonly reactive: ReadonlyMap<string, { closureIndex: number; dependenciesIndex: number }>;
  /** Hooks whose whole result (`true`) or some positions of their returned array are stable */
  readonly stable: ReadonlyMap<string, true | ReadonlySet<number>>;
}

/**
 * Normalize the `hooks` option
 * @param hooks The `hooks` option
 * @returns The configured reactive and stable Hooks, keyed by name
 */
export function getHookConfigs(hooks: readonly HookOption[] = []): HookConfigs {
  const reactive = new Map<string, { closureIndex: number; dependenciesIndex: number }>();
  const stable = new Map<string, true | ReadonlySet<number>>();
  for (const { name, closureIndex, dependenciesIndex, stableResult } of hooks) {
    if (closureIndex != null && dependenciesIndex != null && closureIndex !== dependenciesIndex) {
      reactive.set(name, { closureIndex, dependenciesIndex });
    }
    if (stableResult === true) {
      stable.set(name, true);
    } else if (typeof stableResult === "number") {
      stable.set(name, new Set([stableResult]));
    } else if (Array.isArray(stableResult)) {
      stable.set(name, new Set(stableResult));
    }
  }
  return { reactive, stable };
}

/**
 * Get the configured reactive Hook that a call expression calls (ex: `useQuery(...)` or `lib.useQuery(...)`)
 * @param node The call expression
 * @param configs The configured Hooks
 * @returns The Hook name with its closure and dependencies positions, or `null` if the callee is not a configured reactive Hook
 */
export function getReactiveHookConfig(node: TSESTree.CallExpression, configs: HookConfigs) {
  if (configs.reactive.size === 0) return null;
  const name = Extract.getCalleeName(node);
  if (name == null) return null;
  const config = configs.reactive.get(name);
  if (config == null) return null;
  return { name, ...config };
}

/**
 * Check if a variable holds a stable value returned by a configured Hook,
 * ex: `dispatch` in `const dispatch = useDispatch()` with `stableResult: true`,
 * or `setValue` in `const [value, setValue] = useCustomState()` with `stableResult: [1]`
 * @param variable The variable to check
 * @param configs The configured Hooks
 * @returns `true` if the variable holds a stable value
 */
export function isConfiguredStableHookValue(variable: ScopeVariable, configs: HookConfigs): boolean {
  if (configs.stable.size === 0) return false;
  let matchedNode: TSESTree.VariableDeclarator | null = null;
  let stableResult: true | ReadonlySet<number> | null = null;
  let initializerCount = 0;
  for (const def of variable.defs) {
    if (def.type !== DefinitionType.Variable || def.node.init == null) continue;
    initializerCount++;
    const init = Extract.unwrap(def.node.init);
    if (init.type !== AST.CallExpression) continue;
    const name = Extract.getCalleeName(init);
    if (name == null) continue;
    const config = configs.stable.get(name);
    if (config == null) continue;
    // More than one configured Hook initializer makes the value ambiguous.
    if (matchedNode != null) return false;
    matchedNode = def.node;
    stableResult = config;
  }
  // A `var` redeclaration with multiple initializers is not a single stable binding.
  if (initializerCount !== 1) return false;
  if (matchedNode == null || stableResult == null) return false;
  // A write after initialization (a reassignment) makes the value unstable.
  // `init` is also true for default values, which are not reassignments.
  if (variable.references.some((reference) => reference.isWrite() && reference.init !== true)) return false;
  const { id } = matchedNode;
  if (stableResult === true) return id.type === AST.Identifier;
  if (id.type !== AST.ArrayPattern) return false;
  const index = id.elements.findIndex((element) => {
    if (element == null) return false;
    // Defaults (for example, `[value, setter = noop]`) wrap the binding in an AssignmentPattern.
    const binding = element.type === AST.AssignmentPattern ? element.left : element;
    return variable.identifiers.some((identifier) => identifier === binding);
  });
  return index !== -1 && stableResult.has(index);
}
