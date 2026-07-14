import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import {
  type RefAccess,
  type Variable,
  createBindingResolver,
  getGuardDisposition,
  getRefAccess,
  getSynchronousCallbackIndexes,
  isAfterTerminatingNonNullGuard,
  isGuardTestAccess,
  isReachedThroughFunctions,
} from "./lib";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "readDuringRender"
  | "writeDuringRender"
  | "refPassedToFunction"
  | "duplicateRefInit";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates correct usage of refs by checking that 'ref.current' is not read or written during render.",
    },
    messages: {
      duplicateRefInit:
        "Ref is initialized more than once during render. Only a single 'if (ref.current == null)' initialization is allowed; move any additional initialization into an effect or event handler.",
      readDuringRender: "Cannot access refs during render",
      refPassedToFunction: "Passing a ref to a function may read its value during render",
      writeDuringRender: "Cannot update ref during render",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hc = core.getHookCollector(context);
  const fc = core.getFunctionComponentCollector(context);
  const {
    addFunctionBinding,
    addIdentifierBinding,
    addJsxRef,
    addMemberBinding,
    getNullBranch,
    getRefTarget,
    getVariable,
    resolveCallable,
    resolveRef,
  } = createBindingResolver(context);

  // Phase 1: collect binding identities and ref operations. Maps are keyed by ESLint variables,
  // not source names, so shadowed identifiers and separate components cannot contaminate each other.
  const calls: TSESTree.CallExpression[] = [];
  const refAccesses: RefAccess[] = [];

  return merge(
    hc.visitor,
    fc.visitor,
    {
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (node.operator !== "=") return;
        const left = Extract.unwrap(node.left);
        if (left.type === AST.Identifier) {
          addIdentifierBinding(left, node.right, node.range[0]);
          return;
        }
        if (left.type !== AST.MemberExpression || left.property.type !== AST.Identifier) return;
        const object = Extract.unwrap(left.object);
        if (object.type === AST.Identifier) {
          addMemberBinding(object, left.property.name, node.right, node.range[0]);
        }
      },
      CallExpression(node: TSESTree.CallExpression) {
        calls.push(node);
      },
      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        if (node.id != null) addFunctionBinding(node.id, node, -1);
      },
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (node.name.type !== AST.JSXIdentifier || node.name.name !== "ref" || node.value?.type !== AST.JSXExpressionContainer) return;
        const expression = Extract.unwrap(node.value.expression);
        if (expression.type !== AST.Identifier) return;
        addJsxRef(expression);
      },
      MemberExpression(node: TSESTree.MemberExpression) {
        if (node.property.type !== AST.Identifier || node.property.name !== "current") return;
        refAccesses.push(getRefAccess(node));
      },
      "Program:exit"(program) {
        const boundaries = new Set<TSESTreeFunction>([
          ...fc.api.getAllComponents(program).map((component) => component.node),
          ...hc.api.getAllHooks(program).map((hook) => hook.node),
        ]);
        const isBoundary = (node: TSESTree.Node): node is TSESTreeFunction => {
          return Check.isFunction(node) && boundaries.has(node);
        };

        // Phase 2: construct render-time invocation edges, then propagate reachability to a fixed
        // point. Direct calls, IIFEs, known synchronous callbacks, function declarations, aliases,
        // and simple object-property bindings all share the same identity-based resolver.
        const reachedByBoundary = new Map<TSESTreeFunction, Set<TSESTreeFunction>>();
        for (const boundary of boundaries) reachedByBoundary.set(boundary, new Set([boundary]));
        let changed = true;
        while (changed) {
          changed = false;
          for (const call of calls) {
            const boundary = Traverse.findParent(call, isBoundary);
            if (boundary == null) continue;
            const reached = reachedByBoundary.get(boundary);
            if (reached == null) continue;
            const host = Traverse.findParent(call, Check.isFunction) ?? boundary;
            if (!reached.has(host)) continue;
            const targets = [resolveCallable(call.callee, call.range[0])];
            for (const index of getSynchronousCallbackIndexes(call)) {
              const argument = call.arguments[index];
              if (argument == null || argument.type === AST.SpreadElement) continue;
              targets.push(resolveCallable(argument, call.range[0]));
            }
            for (const target of targets) {
              if (target == null || reached.has(target) || Traverse.findParent(target, isBoundary) !== boundary) continue;
              reached.add(target);
              changed = true;
            }
          }
        }

        function isReachedDuringRender(node: TSESTree.Node, boundary: TSESTreeFunction): boolean {
          const reached = reachedByBoundary.get(boundary);
          return reached != null && isReachedThroughFunctions(node, boundary, reached);
        }

        // Phase 3/4: validate reached accesses and track the one permitted initialization per ref.
        const initializedRefs = new Map<TSESTreeFunction, Set<Variable>>();
        for (const access of refAccesses.toSorted((a, b) => a.node.range[0] - b.node.range[0])) {
          const target = getRefTarget(access.node);
          if (target == null) continue;
          const boundary = Traverse.findParent(access.node, isBoundary);
          if (boundary == null || !isReachedDuringRender(access.node, boundary)) continue;

          let isLazyInitialization = false;
          if (target.identity != null) {
            const identity = target.identity;
            const getTargetNullBranch = (test: TSESTree.Expression) => getNullBranch(test, identity);
            if (isGuardTestAccess(access.node, getTargetNullBranch)) continue;
            const guard = getGuardDisposition(access.node, getTargetNullBranch);
            if (guard != null) {
              if (guard.inNullBranch && access.isInitializationWrite) {
                isLazyInitialization = true;
              } else if (!guard.inNullBranch && !access.isWrite) {
                continue;
              }
            } else if (access.isInitializationWrite && isAfterTerminatingNonNullGuard(access.node, getTargetNullBranch)) {
              isLazyInitialization = true;
            }
          }

          if (isLazyInitialization && target.identity != null) {
            const initialized = initializedRefs.get(boundary) ?? new Set<Variable>();
            initializedRefs.set(boundary, initialized);
            if (initialized.has(target.identity)) {
              context.report({ messageId: "duplicateRefInit", node: access.node });
            } else {
              initialized.add(target.identity);
            }
            continue;
          }

          context.report({
            messageId: access.isWrite ? "writeDuringRender" : "readDuringRender",
            node: access.node,
          });
        }

        // Passing a ref to an unknown function can expose its value during render. Hook callbacks,
        // mergeRefs, and the existing render-prop compatibility case remain exempt.
        for (const call of calls) {
          const boundary = Traverse.findParent(call, isBoundary);
          if (boundary == null || !isReachedDuringRender(call, boundary)) continue;
          const callee = Extract.unwrap(call.callee);
          const calleeName = Extract.getCalleeName(call);
          const callArguments = call.arguments;
          if (core.isHookCall(call) || calleeName === "mergeRefs" || (calleeName === "render" && callee.type === AST.MemberExpression)) continue;
          for (const argument of callArguments) {
            if (argument.type === AST.SpreadElement) continue;
            const value = Extract.unwrap(argument);
            if (value.type !== AST.Identifier) continue;
            const variable = getVariable(value);
            if (variable == null || resolveRef(variable, value.range[0]) == null) continue;
            context.report({ messageId: "refPassedToFunction", node: value });
          }
        }
      },
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.id.type !== AST.Identifier || node.init == null) return;
        addIdentifierBinding(node.id, node.init, node.range[0]);
      },
    },
  );
}
