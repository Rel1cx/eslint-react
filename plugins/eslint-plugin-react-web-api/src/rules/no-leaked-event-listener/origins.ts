import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { isInitializedFromReactNative, resolve, resolveOrigin } from "@eslint-react/var";
import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { P, match } from "ts-pattern";
import type { NoLeakedEventListenerFacts } from "./collect";
import type { EventMethodKind, EventPhase } from "./helpers";

export type ResolvedEventEntry = {
  kind: EventMethodKind;
  type: TSESTree.Node;
  callee: TSESTree.Node;
  capture: boolean;
  effect: TSESTree.Node | null;
  enclosingFunction: TSESTreeFunction | null;
  listener: TSESTree.CallExpressionArgument;
  node: TSESTree.CallExpression;
  phase: EventPhase;
  signal: TSESTree.Node | null;
};

export type ListenerOptions = {
  capture: boolean;
  signal: TSESTree.Node | null;
};

export type ListenerArguments = {
  type: TSESTree.CallExpressionArgument;
  listener: TSESTree.CallExpressionArgument;
  options: ListenerOptions;
};

export type CleanupCallee =
  | { kind: "function"; node: TSESTreeFunction }
  | { kind: "name"; name: string };

export type CleanupCallees = {
  functions: Set<TSESTreeFunction>;
  names: Set<string>;
};

export type CleanupCalleeEntries = Map<TSESTree.Node, CleanupCallees>;

export type ResolvedEventListenerFacts = {
  cleanupCalleeEntries: CleanupCalleeEntries;
  entries: ResolvedEventEntry[];
};

type RuleNodeParams<Node extends TSESTree.Node> = {
  context: RuleContext;
  node: Node;
};

export function resolveCleanupCallee({ context, node }: RuleNodeParams<TSESTree.CallExpression>): CleanupCallee | null {
  const callee = Extract.unwrap(node.callee);
  if (callee.type === AST.Identifier) {
    const resolved = resolve(context, callee, { at: -1 });
    const fn = resolved == null ? null : Extract.unwrap(resolved);
    return fn != null && Check.isFunction(fn)
      ? { kind: "function", node: fn }
      : { kind: "name", name: callee.name };
  }
  if (callee.type !== AST.MemberExpression || callee.computed) return null;
  const object = Extract.unwrap(callee.object);
  const property = Extract.unwrap(callee.property);
  if (object.type !== AST.Identifier || property.type !== AST.Identifier) return null;
  const init = resolve(context, object, { at: -1 });
  const objectExpression = init == null ? null : Extract.unwrap(init);
  if (objectExpression?.type !== AST.ObjectExpression) return null;
  for (const prop of objectExpression.properties) {
    if (prop.type !== AST.Property || prop.computed) continue;
    const key = Extract.unwrap(prop.key);
    if (Check.isIdentifier(key) ? key.name !== property.name : key.value !== property.name) continue;
    const value = Extract.unwrap(prop.value);
    if (Check.isFunction(value)) {
      return { kind: "function", node: value };
    }
  }
  return null;
}

export const defaultListenerOptions: ListenerOptions = { capture: false, signal: null };

function isSignalPropertyBinding(context: RuleContext, node: TSESTree.Identifier): boolean {
  const variable = findVariable(context.sourceCode.getScope(node), node);
  const defNode = variable?.defs.at(-1)?.node;
  if (defNode?.type !== AST.VariableDeclarator || defNode.id.type !== AST.ObjectPattern) {
    return false;
  }
  for (const prop of defNode.id.properties) {
    if (prop.type !== AST.Property || prop.computed) continue;
    const key = Extract.unwrap(prop.key);
    if (key.type !== AST.Identifier || key.name !== "signal") continue;
    const value = Extract.unwrap(prop.value);
    return value.type === AST.Identifier && value.name === node.name;
  }
  return false;
}

export function getSignalValueExpression({ context, node }: { context: RuleContext; node: TSESTree.Node | null }): TSESTree.Node | null {
  const seen = new Set<TSESTree.Node>();
  function visit(node: TSESTree.Node | null): TSESTree.Node | null {
    if (node == null) return null;
    if (seen.has(node)) return null;
    seen.add(node);
    switch (node.type) {
      case AST.Identifier: {
        const resolved = resolveOrigin(context, node);
        const unwrapped = resolved == null ? null : Extract.unwrap(resolved);
        if (unwrapped != null && Check.isFunction(unwrapped)) {
          return node;
        }
        if (unwrapped != null && unwrapped.type === AST.NewExpression && isSignalPropertyBinding(context, node)) {
          const newCallee = Extract.unwrap(unwrapped.callee);
          if (newCallee.type === AST.Identifier && newCallee.name === "AbortController") {
            return node;
          }
        }
        return visit(unwrapped);
      }
      case AST.MemberExpression:
        return node;
      default:
        return null;
    }
  }
  return visit(node);
}

export function getListenerOptions({ context, node }: RuleNodeParams<TSESTree.CallExpressionArgument>): ListenerOptions {
  function visit(node: TSESTree.Node): ListenerOptions {
    switch (node.type) {
      case AST.Identifier: {
        const initNode = resolve(context, node);
        if (initNode?.type === AST.ObjectExpression) {
          return visit(initNode);
        }
        return defaultListenerOptions;
      }
      case AST.Literal: {
        return { ...defaultListenerOptions, capture: Boolean(node.value) };
      }
      case AST.ObjectExpression: {
        const findOption = (properties: TSESTree.ObjectLiteralElement[], name: string): TSESTree.Property | null => {
          for (const property of properties) {
            if (property.type === AST.Property) {
              const key = Extract.unwrap(property.key);
              const propertyName = !property.computed && Check.isIdentifier(key)
                ? key.name
                : key.type === AST.Literal && typeof key.value === "string"
                ? key.value
                : key.type === AST.TemplateLiteral && key.expressions.length === 0
                ? key.quasis[0]?.value.cooked ?? key.quasis[0]?.value.raw ?? null
                : null;
              if (propertyName === name) return property;
            }
            if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
              const found = findOption(property.argument.properties, name);
              if (found != null) return found;
            }
          }
          return null;
        };
        const pCapture = findOption(node.properties, "capture");
        const vCapture = match(pCapture)
          .with(P.nullish, () => false)
          .with({ type: AST.Property }, (prop) => {
            const value = prop.value;
            switch (value.type) {
              case AST.Literal:
                return Boolean(value.value);
              default:
                return Boolean(getStaticValue(value, context.sourceCode.getScope(node))?.value);
            }
          })
          .otherwise(() => false);
        const pSignal = findOption(node.properties, "signal");
        const vSignal = pSignal?.type === AST.Property
          ? getSignalValueExpression({ context, node: pSignal.value })
          : null;
        return { capture: vCapture, signal: vSignal };
      }
      default: {
        return defaultListenerOptions;
      }
    }
  }
  return visit(node);
}

export function getListenerArguments({ context, node }: RuleNodeParams<TSESTree.CallExpression>): ListenerArguments | null {
  const [type, listener, options] = node.arguments;
  if (type == null || listener == null) return null;
  return {
    type,
    listener,
    options: options == null ? defaultListenerOptions : getListenerOptions({ context, node: options }),
  };
}

function isReactNativeMemberExpression(context: RuleContext, node: TSESTree.Node) {
  return node.type === AST.MemberExpression
    && Check.isIdentifier(node.object)
    && isInitializedFromReactNative(node.object.name, context.sourceCode.getScope(node));
}

export function resolveEventListenerFacts(context: RuleContext, facts: NoLeakedEventListenerFacts): ResolvedEventListenerFacts {
  const entries: ResolvedEventEntry[] = [];
  const cleanupCalleeEntries: CleanupCalleeEntries = new Map();

  for (const fact of facts.calls) {
    const { callee, effect, enclosingFunction, kind, node, phase } = fact;

    if (kind === "other") {
      if (phase !== "cleanup" || effect == null) continue;
      const cleanupCallee = resolveCleanupCallee({ context, node });
      if (cleanupCallee == null) continue;
      const { functions, names } = getOrInsertComputed(
        cleanupCalleeEntries,
        effect,
        (): CleanupCallees => ({ functions: new Set(), names: new Set() }),
      );
      if (cleanupCallee.kind === "function") {
        functions.add(cleanupCallee.node);
      } else {
        names.add(cleanupCallee.name);
      }
      continue;
    }

    if (kind === "addEventListener" && isReactNativeMemberExpression(context, callee)) continue;
    const args = getListenerArguments({ context, node });
    if (args == null) continue;
    entries.push({
      type: args.type,
      callee,
      capture: args.options.capture,
      effect,
      enclosingFunction,
      kind,
      listener: args.listener,
      node,
      phase,
      signal: args.options.signal,
    });
  }

  return { entries, cleanupCalleeEntries };
}
