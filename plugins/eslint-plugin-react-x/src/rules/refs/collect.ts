import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import type { RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { type RefAccess, getRefAccess } from "./lib";

export type BindingFact =
  | { id: TSESTree.Identifier; kind: "function"; node: TSESTreeFunction; position: number }
  | { id: TSESTree.Identifier; kind: "identifier"; position: number; value: TSESTree.Node }
  | { kind: "member"; object: TSESTree.Identifier; position: number; property: string; value: TSESTree.Node };

export type CallEdgeFact = {
  caller: TSESTreeFunction;
  node: TSESTree.CallExpression;
};

/**
 * A call-like site whose arguments may expose a ref during render: plain calls,
 * constructor calls, and tagged templates. Unlike call edges, these sites are
 * not used for render reachability — a constructor or tag function body is not
 * resolved into the render call graph.
 */
export type PassSiteFact = {
  caller: TSESTreeFunction;
  node: TSESTree.CallExpression | TSESTree.NewExpression | TSESTree.TaggedTemplateExpression;
};

export type RefAccessFact = RefAccess & {
  enclosingFunction: TSESTreeFunction;
};

export type RefsFacts = {
  bindings: BindingFact[];
  callEdges: CallEdgeFact[];
  jsxRefs: TSESTree.Identifier[];
  passSites: PassSiteFact[];
  refAccesses: RefAccessFact[];
};

/**
 * Collect the raw facts the refs rule reasons about: identifier/member/function
 * bindings with their source positions, JSX `ref` attribute targets, call
 * expressions, ref pass sites (calls, constructor calls, tagged templates), and
 * every `.current` member access. Facts outside any function are never
 * reachable during render and are not collected. All inference is deferred to
 * `Program:exit`.
 */
export function createFactCollector() {
  const facts: RefsFacts = {
    bindings: [],
    callEdges: [],
    jsxRefs: [],
    passSites: [],
    refAccesses: [],
  };

  const visitor: RuleListener = {
    AssignmentExpression(node: TSESTree.AssignmentExpression) {
      if (node.operator !== "=") return;
      const left = Extract.unwrap(node.left);
      if (Check.isIdentifier(left)) {
        facts.bindings.push({ id: left, kind: "identifier", position: node.range[0], value: node.right });
        return;
      }
      if (left.type !== AST.MemberExpression || !Check.isIdentifier(left.property)) return;
      const object = Extract.unwrap(left.object);
      if (Check.isIdentifier(object)) {
        facts.bindings.push({ kind: "member", object, position: node.range[0], property: left.property.name, value: node.right });
      }
    },
    CallExpression(node: TSESTree.CallExpression) {
      const caller = Traverse.findParent(node, Check.isFunction);
      if (caller == null) return;
      facts.callEdges.push({ caller, node });
      facts.passSites.push({ caller, node });
    },
    FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
      if (node.id != null) facts.bindings.push({ id: node.id, kind: "function", node, position: -1 });
    },
    JSXAttribute(node: TSESTree.JSXAttribute) {
      if (node.name.type !== AST.JSXIdentifier || node.name.name !== "ref" || node.value?.type !== AST.JSXExpressionContainer) return;
      const expression = Extract.unwrap(node.value.expression);
      if (!Check.isIdentifier(expression)) return;
      facts.jsxRefs.push(expression);
    },
    MemberExpression(node: TSESTree.MemberExpression) {
      if (!Check.isIdentifier(node.property, "current")) return;
      const enclosingFunction = Traverse.findParent(node, Check.isFunction);
      if (enclosingFunction == null) return;
      facts.refAccesses.push({ ...getRefAccess(node), enclosingFunction });
    },
    NewExpression(node: TSESTree.NewExpression) {
      const caller = Traverse.findParent(node, Check.isFunction);
      if (caller == null) return;
      facts.passSites.push({ caller, node });
    },
    TaggedTemplateExpression(node: TSESTree.TaggedTemplateExpression) {
      const caller = Traverse.findParent(node, Check.isFunction);
      if (caller == null) return;
      facts.passSites.push({ caller, node });
    },
    VariableDeclarator(node: TSESTree.VariableDeclarator) {
      if (!Check.isIdentifier(node.id) || node.init == null) return;
      facts.bindings.push({ id: node.id, kind: "identifier", position: node.range[0], value: node.init });
    },
  };

  return { facts, visitor } as const;
}
