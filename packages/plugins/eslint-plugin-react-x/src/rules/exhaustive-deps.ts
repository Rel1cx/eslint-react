import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { findVariable } from "@eslint-react/var";
import {
  DefinitionType,
  type Reference as TSReference,
  type Scope as TSScope,
  type Variable,
} from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "exhaustive-deps";

export const RULE_FEATURES = [
  "CFG",
  "FIX",
] as const satisfies RuleFeature[];

type MessageID =
  | "missingDeps"
  | "unnecessaryDeps"
  | "nonLiteralDeps";

type Options = [{
  additionalHooks?: string;
}];

/**
 * Built-in hooks that accept dependency arrays.
 * Maps hook name to the index of the callback argument.
 */
const HOOKS_WITH_DEPS: Record<string, number> = {
  useCallback: 0,
  useEffect: 0,
  useImperativeHandle: 1,
  useInsertionEffect: 0,
  useLayoutEffect: 0,
  useMemo: 0,
};

/**
 * Hooks whose return values (at specific destructuring indices) are stable.
 */
const STABLE_HOOK_PATTERNS: Record<string, "all" | number> = {
  useReducer: 1,
  useRef: "all",
  useState: 1,
  useTransition: 1,
};

/**
 * Collected data for a hook call with a dependency array.
 */
export interface CollectedHookCall {
  /** The hook call expression node */
  node: TSESTree.CallExpression;
  /** The callback/factory function node */
  callback: TSESTree.Node;
  /** The raw dependency argument node (may be non-array) */
  depsArgNode: TSESTree.Node | null;
  /** The dependency array node, or null if non-literal */
  depsNode: TSESTree.ArrayExpression | null;
  /** The hook name (e.g., "useEffect") */
  hookName: string;
}

/**
 * Get the name of a hook from a call expression.
 * @param node - the call expression node
 */
function getHookName(node: TSESTree.CallExpression): string | null {
  if (node.callee.type === AST.Identifier) {
    return node.callee.name;
  }
  if (node.callee.type === AST.MemberExpression && node.callee.property.type === AST.Identifier) {
    return node.callee.property.name;
  }
  return null;
}

/**
 * Check if a hook name is one of the built-in hooks with dependency arrays.
 * @param name - the hook name to check
 */
function isBuiltInHookWithDeps(name: string): boolean {
  return name in HOOKS_WITH_DEPS;
}

/**
 * Get the callback argument index for a given hook.
 * @param hookName - the hook name to look up
 */
function getCallbackIndex(hookName: string): number {
  return HOOKS_WITH_DEPS[hookName] ?? 0;
}

/**
 * Get the text representation of a member expression chain.
 * Handles both regular (obj.prop) and optional (obj?.prop) member expressions.
 * @param node - the member expression node
 */
function getMemberExpressionText(node: TSESTree.MemberExpression): string | null {
  const parts: string[] = [];
  let current: TSESTree.Node = node;

  while (current.type === AST.MemberExpression) {
    const memberExpr = current as TSESTree.MemberExpression;
    if (memberExpr.computed) return null;
    if (memberExpr.property.type !== AST.Identifier) return null;
    const sep = memberExpr.optional ? "?." : ".";
    parts.unshift(`${sep}${memberExpr.property.name}`);
    current = memberExpr.object;
  }

  if (current.type !== AST.Identifier) return null;
  parts.unshift(current.name);
  return parts.join("");
}

/**
 * Check if a variable is defined at module level (outside any function).
 * @param variable - the variable to check
 */
function isModuleLevelVariable(variable: Variable): boolean {
  for (const def of variable.defs) {
    const defScope = def.name.parent;
    // Walk up to find the scope — check if the definition is inside a function
    let node: TSESTree.Node | undefined = defScope;
    while (node != null) {
      if (ast.isFunction(node)) return false;
      node = node.parent;
    }
  }
  return true;
}

/**
 * Check if a variable is an import.
 * @param variable - the variable to check
 */
function isImportVariable(variable: Variable): boolean {
  return variable.defs.length > 0
    && variable.defs.every((def) => def.type === DefinitionType.ImportBinding);
}

/**
 * Check if a variable is a stable value from a known React hook pattern.
 * E.g., setState from useState, dispatch from useReducer, ref from useRef,
 * startTransition from useTransition.
 * @param variable - the variable to check
 */
function isStableHookValue(variable: Variable): boolean {
  if (variable.defs.length === 0) return false;
  const def = variable.defs[0];
  if (def == null) return false;

  // Must be a variable definition
  if (def.type !== DefinitionType.Variable) return false;

  // Get the init expression from the variable declarator
  const defNode = def.node;
  const init = defNode.init;
  if (init == null || init.type !== AST.CallExpression) return false;

  // Get the hook name from the call
  const hookName = getHookName(init);
  if (hookName == null) return false;

  const stablePattern = STABLE_HOOK_PATTERNS[hookName];
  if (stablePattern == null) return false;

  // useRef: the entire return value is stable
  if (stablePattern === "all") return true;

  // For hooks that return arrays (useState, useReducer, useTransition):
  // Check if the variable is destructured at the stable index
  const id = defNode.id;
  if (id.type !== AST.ArrayPattern) return false;

  const stableIndex = stablePattern;
  const element = id.elements[stableIndex];
  if (element == null || element.type !== AST.Identifier) return false;

  return element.name === variable.name;
}

/**
 * Check if a variable is stable (should not be required in dependency arrays).
 * @param variable - the variable to check
 */
function isStableVariable(variable: Variable): boolean {
  return isModuleLevelVariable(variable)
    || isImportVariable(variable)
    || isStableHookValue(variable);
}

/**
 * Find the enclosing component or hook function for a node.
 * @param node - the node to start searching from
 */
function findComponentOrHookScope(node: TSESTree.Node): ast.TSESTreeFunction | null {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null) {
    if (ast.isFunction(current)) {
      const id = ast.getFunctionId(current);
      if (id != null && id.type === AST.Identifier) {
        if (core.isHookName(id.name) || /^[A-Z]/.test(id.name)) {
          return current;
        }
      }
      if (id != null && id.type === AST.MemberExpression && id.property.type === AST.Identifier) {
        if (core.isHookName(id.property.name) || /^[A-Z]/.test(id.property.name)) {
          return current;
        }
      }
    }
    current = current.parent;
  }
  return null;
}

/**
 * Check if a variable is defined within the given function scope (reactive).
 * @param variable - the variable to check
 * @param scopeNode - the function scope to check against
 */
function isDefinedInScope(variable: Variable, scopeNode: ast.TSESTreeFunction): boolean {
  for (const def of variable.defs) {
    let node: TSESTree.Node = def.name;
    for (;;) {
      if (node === scopeNode) return true;
      if (node.parent == null) break;
      node = node.parent;
    }
    // Also check if it's a function parameter
    if (def.type === DefinitionType.Parameter) {
      let paramNode: TSESTree.Node = def.node;
      for (;;) {
        if (paramNode === scopeNode) return true;
        if (paramNode.parent == null) break;
        paramNode = paramNode.parent;
      }
    }
  }
  return false;
}

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that React hook dependency arrays contain all reactive values used in the callback.",
    },
    fixable: "code",
    messages: {
      missingDeps:
        "React Hook '{{hookName}}' has missing dependencies: {{deps}}. Either include them or remove the dependency array.",
      nonLiteralDeps:
        "React Hook '{{hookName}}' was passed a dependency list that is not an array literal. This means we can't statically verify whether you've passed the correct dependencies.",
      unnecessaryDeps:
        "React Hook '{{hookName}}' has unnecessary dependencies: {{deps}}. Either exclude them or remove the dependency array.",
    },
    schema: [
      {
        type: "object",
        additionalProperties: false,
        properties: {
          additionalHooks: {
            type: "string",
          },
        },
      },
    ],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [{}],
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- options[0] may be undefined at runtime when defaultOptions is not applied
  const additionalHooks = context.options[0]?.additionalHooks;
  const additionalHooksRegex = additionalHooks != null && additionalHooks.length > 0
    ? new RegExp(additionalHooks)
    : null;

  /** Collected hook calls for later analysis. */
  const collectedHookCalls: CollectedHookCall[] = [];

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);

  /**
   * Check if a hook name matches the additionalHooks regex option.
   * @param name - the hook name to check
   */
  function isAdditionalHook(name: string): boolean {
    return additionalHooksRegex != null && additionalHooksRegex.test(name);
  }

  /**
   * Check if a call expression is a hook call that we should check for deps.
   * @param node - the call expression to check
   */
  function isHookWithDeps(node: TSESTree.CallExpression): boolean {
    const name = getHookName(node);
    if (name == null) return false;
    return isBuiltInHookWithDeps(name) || isAdditionalHook(name);
  }

  /**
   * Extract the callback and dependency array from a hook call.
   * @param node - the hook call expression
   * @param hookName - the resolved hook name
   */
  function extractCallbackAndDeps(
    node: TSESTree.CallExpression,
    hookName: string,
  ): { callback: TSESTree.Node; depsArgNode: TSESTree.Node | null; depsNode: TSESTree.ArrayExpression | null } | null {
    const args = node.arguments;
    if (args.length === 0) return null;

    const callbackIndex = getCallbackIndex(hookName);
    const callback = args[callbackIndex];
    if (callback == null) return null;

    const depsArgIndex = callbackIndex + 1;
    if (args.length <= depsArgIndex) return null;

    const depsArg = args[args.length - 1];
    if (depsArg == null) return null;

    if (depsArg.type === AST.ArrayExpression) {
      return { callback, depsArgNode: depsArg, depsNode: depsArg };
    }

    return { callback, depsArgNode: depsArg, depsNode: null };
  }

  /**
   * Collect all reactive dependency candidates from a callback node.
   * Walks the callback body, finds all identifier references and member expressions,
   * resolves them via scope analysis, and classifies them as reactive or stable.
   * @param callbackNode - the callback argument node
   * @param componentScope - the enclosing component or hook function
   */
  function collectReactiveDeps(
    callbackNode: TSESTree.Node,
    componentScope: ast.TSESTreeFunction,
  ): Set<string> {
    const reactiveDeps = new Set<string>();
    const callbackScope = context.sourceCode.getScope(callbackNode);

    // Collect all references from the callback's scope and nested scopes
    const references = collectScopeReferences(callbackScope);

    for (const ref of references) {
      const identifier = ref.identifier;

      // Skip JSX identifiers
      if (identifier.type !== AST.Identifier) continue;

      // Check if this identifier is part of a member expression
      const memberExprText = getEnclosingMemberExpressionText(identifier);
      if (memberExprText != null) {
        // For member expressions, resolve the root variable
        const variable = findVariable(identifier.name, callbackScope);
        if (variable == null) continue;
        if (isStableVariable(variable)) continue;
        if (!isDefinedInScope(variable, componentScope)) continue;
        reactiveDeps.add(memberExprText);
        continue;
      }

      // Plain identifier reference
      const variable = findVariable(identifier.name, callbackScope);
      if (variable == null) continue;
      if (isStableVariable(variable)) continue;
      if (!isDefinedInScope(variable, componentScope)) continue;
      reactiveDeps.add(identifier.name);
    }

    return reactiveDeps;
  }

  /**
   * Recursively collect all references from a scope and its child scopes,
   * but stop at function boundaries that are not the callback itself.
   * @param scope - the scope to collect references from
   */
  function collectScopeReferences(scope: TSScope): TSReference[] {
    const refs: TSReference[] = [];
    for (const ref of scope.references) {
      // Skip write-only references (assignments)
      if (ref.isWriteOnly()) continue;
      refs.push(ref);
    }
    for (const childScope of scope.childScopes) {
      refs.push(...collectScopeReferences(childScope));
    }
    return refs;
  }

  /**
   * If an identifier is the root of a member expression chain,
   * return the full text of that member expression.
   * @param identifier - the identifier node to check
   */
  function getEnclosingMemberExpressionText(identifier: TSESTree.Identifier): string | null {
    const { parent } = identifier;
    if (parent.type !== AST.MemberExpression) return null;
    if (parent.object !== identifier) return null;

    // Walk up to find the outermost member expression that is used as a dependency candidate
    let outermost: TSESTree.MemberExpression = parent;
    let current: TSESTree.Node = parent;
    while (
      current.parent.type === AST.MemberExpression
      && current.parent.object === current
      && !current.parent.computed
    ) {
      outermost = current.parent;
      current = current.parent;
    }

    return getMemberExpressionText(outermost);
  }

  /**
   * Get the set of declared dependencies from a dependency array node.
   * @param depsNode - the array expression node
   */
  function getDeclaredDeps(depsNode: TSESTree.ArrayExpression): Set<string> {
    const deps = new Set<string>();
    for (const element of depsNode.elements) {
      if (element == null) continue;
      if (element.type === AST.SpreadElement) continue;
      deps.add(getText(element));
    }
    return deps;
  }

  /**
   * Generate a fix that produces a corrected dependency array.
   * Removes unnecessary deps, adds missing deps, and sorts all alphabetically.
   * @param depsNode - the dependency array node
   * @param missing - set of missing dependency names
   * @param unnecessary - set of unnecessary dependency names
   */
  function generateFix(
    depsNode: TSESTree.ArrayExpression,
    missing: Set<string>,
    unnecessary: Set<string>,
  ): (fixer: RuleFixer) => RuleFix {
    return (fixer: RuleFixer) => {
      const existingDeps = depsNode.elements
        .filter((el): el is TSESTree.Expression => el != null && el.type !== AST.SpreadElement)
        .map((el) => getText(el))
        .filter((text) => !unnecessary.has(text));
      const allDeps = [...existingDeps, ...missing].toSorted();
      return fixer.replaceText(depsNode, `[${allDeps.join(", ")}]`);
    };
  }

  /**
   * Analyze a collected hook call and report missing/unnecessary dependencies.
   * @param hookCall - the collected hook call to analyze
   */
  function analyzeHookCall(hookCall: CollectedHookCall): void {
    const { node, callback, depsNode, hookName } = hookCall;
    if (depsNode == null) return;

    // Find the enclosing component or hook
    const componentScope = findComponentOrHookScope(node);
    if (componentScope == null) return;

    // Collect reactive values referenced in the callback
    const reactiveDeps = collectReactiveDeps(callback, componentScope);

    // Get declared dependencies
    const declaredDeps = getDeclaredDeps(depsNode);

    // Find missing dependencies (reactive but not declared)
    const missingDeps = new Set<string>();
    for (const dep of reactiveDeps) {
      if (!declaredDeps.has(dep)) {
        missingDeps.add(dep);
      }
    }

    // Find unnecessary dependencies (declared but not reactive)
    const unnecessaryDeps = new Set<string>();
    for (const dep of declaredDeps) {
      if (!reactiveDeps.has(dep)) {
        unnecessaryDeps.add(dep);
      }
    }

    const hasMissing = missingDeps.size > 0;
    const hasUnnecessary = unnecessaryDeps.size > 0;

    if (!hasMissing && !hasUnnecessary) return;

    // Generate a single combined fix for both missing and unnecessary deps
    const fix = generateFix(depsNode, missingDeps, unnecessaryDeps);

    // Report missing dependencies (attach fix to first report only)
    if (hasMissing) {
      const depsList = [...missingDeps].toSorted().map((d) => `'${d}'`).join(", ");
      context.report({
        messageId: "missingDeps",
        node: depsNode,
        data: { deps: depsList, hookName },
        fix,
      });
    }

    // Report unnecessary dependencies (attach fix only if no missing deps report)
    if (hasUnnecessary) {
      const depsList = [...unnecessaryDeps].toSorted().map((d) => `'${d}'`).join(", ");
      context.report({
        messageId: "unnecessaryDeps",
        node: depsNode,
        data: { deps: depsList, hookName },
        ...(!hasMissing ? { fix } : {}),
      });
    }
  }

  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!isHookWithDeps(node)) return;

      const hookName = getHookName(node);
      if (hookName == null) return;

      const result = extractCallbackAndDeps(node, hookName);
      if (result == null) return;

      const { callback, depsArgNode, depsNode } = result;

      // 4.5: If the dependency argument is not an array literal, report and skip
      if (depsNode == null && depsArgNode != null) {
        context.report({
          messageId: "nonLiteralDeps",
          node: depsArgNode,
          data: { hookName },
        });
        return;
      }

      // Collect for analysis
      collectedHookCalls.push({
        node,
        callback,
        depsArgNode,
        depsNode,
        hookName,
      });
    },
    "Program:exit"() {
      // Analyze all collected hook calls
      for (const hookCall of collectedHookCalls) {
        analyzeHookCall(hookCall);
      }
    },
  };
}
