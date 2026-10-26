import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import type { ResolveOptions } from "./resolve-binding";
import { resolveOrigin } from "./resolve-origin";

/** The default maximum number of alias hops followed before giving up. */
const DEFAULT_MAX_DEPTH = 32;

/** Options for {@link resolveOriginChain}. */
export interface ResolveOriginChainOptions extends ResolveOptions {
  /** Maximum number of resolution steps before giving up (default: `32`). */
  maxDepth?: number;
}

/**
 * Follow an identifier through an alias chain to the node its value ultimately
 * originates from.
 *
 * Each step uses {@link resolveOrigin} and unwraps TypeScript type and chain
 * expressions, so `const a = b as T` continues through `b`. Resolution stops
 * when a step yields a non-identifier node, a `null` origin, a repeated node
 * (cycle), or after `maxDepth` steps.
 *
 * Use this instead of calling {@link resolveOrigin} in a loop: it provides
 * cycle protection and a bounded traversal.
 *
 * @param context The ESLint rule context.
 * @param node The identifier to start from.
 * @param options Optional chain-resolution settings; see {@link ResolveOriginChainOptions}.
 * @returns The first non-identifier origin node, or `null` when the chain cannot be resolved.
 */
export function resolveOriginChain(context: RuleContext, node: TSESTree.Identifier, options?: ResolveOriginChainOptions): TSESTree.Node | null {
  const { at = 0, localOnly = false, maxDepth = DEFAULT_MAX_DEPTH } = options ?? {};
  const seen = new Set<TSESTree.Node>();
  let current: TSESTree.Node = node;
  for (let depth = 0; depth < maxDepth; depth++) {
    if (!Check.isIdentifier(current)) return current;
    // Guard against cyclic alias chains (e.g. `const a = b; const b = a;`).
    if (seen.has(current)) return null;
    seen.add(current);
    const origin = resolveOrigin(context, current, { at, localOnly });
    if (origin == null) return null;
    current = Extract.unwrap(origin);
  }
  // The last step may have produced a non-identifier origin exactly at the
  // depth limit; an identifier still waiting to be resolved means we gave up.
  return Check.isIdentifier(current) ? null : current;
}
