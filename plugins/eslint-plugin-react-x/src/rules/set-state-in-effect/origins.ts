import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, getText } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveOrigin } from "@eslint-react/var";
import { and, hasProperty } from "@local/eff";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import {
  getConditionalBranch,
  getIdentifiers,
  getParameterId,
  getRefSourceName,
  getReturnExpressions as findReturnExpressions,
  isRefLikeName,
  isTerminatingStatement,
  uniqueTargets,
} from "./helpers";

export type ValueTarget =
  | { kind: "function"; node: TSESTreeFunction }
  | { kind: "setter"; node: TSESTree.Node };

type Variable = NonNullable<ReturnType<typeof findVariable>>;
type RefParams = ReadonlySet<TSESTree.Node>;
type RefValueMode = "argument" | "initializer";
type RefInitializerCandidate = {
  branch: TSESTree.Node | null;
  position: number;
  previous?: TSESTree.Identifier | undefined;
  value: TSESTree.Node;
};

export function createSetStateResolver(context: RuleContext) {
  const { additionalRefHooks, additionalStateHooks } = getSettingsFromContext(context);
  const returnsByFunction = new WeakMap<TSESTreeFunction, readonly TSESTree.Node[]>();

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isUseRefCall(node: TSESTree.Node): boolean {
    return core.isUseRefLikeCall(node, additionalRefHooks);
  }

  function isSetStateId(id: TSESTree.Identifier) {
    const initNode = resolveOrigin(context, id);
    if (initNode?.type !== AST.CallExpression || !isUseStateCall(initNode)) return false;
    const initNodeParent = initNode.parent;
    if (!hasProperty(initNodeParent, "id")) return false;
    if (initNodeParent.id?.type !== AST.ArrayPattern) return false;
    return initNodeParent.id.elements.findIndex((element) => element != null && Check.isIdentifier(element, id.name)) === 1;
  }

  function isSetStateExpression(node: TSESTree.Node): boolean {
    const expression = Extract.unwrap(node);
    return Check.isIdentifier(expression) && isSetStateId(expression);
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    return isSetStateExpression(node.callee);
  }

  function getReturnExpressions(fn: TSESTreeFunction): readonly TSESTree.Node[] {
    const cached = returnsByFunction.get(fn);
    if (cached != null) return cached;
    const returns = findReturnExpressions(fn);
    returnsByFunction.set(fn, returns);
    return returns;
  }

  function resolveValues(node: TSESTree.Node, seen = new Set<Variable>()): ValueTarget[] {
    const expression = Extract.unwrap(node);
    if (isSetStateExpression(expression)) return [{ kind: "setter", node: expression }];
    if (Check.isFunction(expression)) return [{ kind: "function", node: expression }];
    switch (expression.type) {
      case AST.Identifier:
        return resolveIdentifierValues(expression, seen);
      case AST.ConditionalExpression:
        return uniqueTargets([
          ...resolveValues(expression.consequent, new Set(seen)),
          ...resolveValues(expression.alternate, new Set(seen)),
        ]);
      case AST.CallExpression:
        return resolveCallValues(expression, seen);
      default:
        return [];
    }
  }

  function resolveIdentifierValues(id: TSESTree.Identifier, seen: Set<Variable>): ValueTarget[] {
    const variable = findVariable(context.sourceCode.getScope(id), id);
    if (variable == null || seen.has(variable)) return [];
    const definition = variable.defs.length === 1 ? variable.defs[0] : null;
    if (definition == null || definition.type === DefinitionType.Parameter || definition.type === DefinitionType.ImportBinding) {
      return [];
    }
    if (definition.type === DefinitionType.FunctionName) {
      return Check.isFunction(definition.node) ? [{ kind: "function", node: definition.node }] : [];
    }
    if (definition.type !== DefinitionType.Variable) return [];
    if (definition.node.id !== definition.name || definition.node.init == null) return [];
    if (definition.node.parent.kind !== "const") return [];
    seen.add(variable);
    return resolveValues(definition.node.init, seen);
  }

  function resolveCallValues(call: TSESTree.CallExpression, seen: Set<Variable>): ValueTarget[] {
    const [argument] = call.arguments;
    if (argument == null || argument.type === AST.SpreadElement) return [];
    if (core.isUseCallbackCall(context, call) || Extract.getCalleeName(call) === "useEffectEvent") {
      return resolveValues(argument, seen);
    }
    if (!core.isUseMemoCall(context, call)) return [];
    const factories = resolveValues(argument, seen);
    const targets: ValueTarget[] = [];
    for (const factory of factories) {
      if (factory.kind !== "function" || factory.node.async) continue;
      for (const returnExpression of getReturnExpressions(factory.node)) {
        targets.push(...resolveValues(returnExpression, new Set(seen)));
      }
    }
    return uniqueTargets(targets);
  }

  function getSetterName(node: TSESTree.Node) {
    return Extract.getFullyQualifiedName(node, (part) => getText(context, part));
  }

  function getRefDerivedParams(call: TSESTree.CallExpression, fn: TSESTreeFunction, currentRefParams: RefParams = new Set()) {
    const refParams = new Set(currentRefParams);
    const parameterIds = fn.params.map(getParameterId);
    for (const id of parameterIds) {
      if (id != null) refParams.delete(id);
    }
    for (const [index, id] of parameterIds.entries()) {
      if (id == null) continue;
      const argument = call.arguments.at(index);
      if (argument == null || argument.type === AST.SpreadElement) continue;
      if (isArgumentUsingRefValue(argument, currentRefParams)) refParams.add(id);
    }
    return refParams;
  }

  function isInitializedFromRef(id: TSESTree.Identifier, refParams?: RefParams, seen = new Set<string>()): boolean {
    const variable = findVariable(context.sourceCode.getScope(id), id);
    if (variable == null) return false;
    const key = `${String(variable.identifiers.at(0)?.range[0] ?? variable.name)}:${String(id.range[0])}`;
    if (seen.has(key)) return false;
    seen.add(key);
    const candidates: RefInitializerCandidate[] = [];
    const addCandidate = (value: TSESTree.Node, previous?: TSESTree.Identifier) => {
      if (value.range[1] > id.range[0] || candidates.some((candidate) => candidate.value === value)) return;
      candidates.push({
        branch: getConditionalBranch(value),
        position: value.range[1],
        previous,
        value,
      });
    };
    for (const definition of variable.defs) {
      if (definition.type !== DefinitionType.Variable || definition.node.init == null) continue;
      addCandidate(definition.node.init);
    }
    for (const reference of variable.references) {
      if (!reference.isWrite() || reference.writeExpr == null) continue;
      // dprint-ignore
      if (reference.init === true && variable.defs.some((definition) => definition.type === DefinitionType.Parameter && refParams?.has(definition.name) === true)) {
        continue;
      }
      const writeExpr = reference.writeExpr;
      if (Traverse.hasParent(writeExpr, and(Check.isFunction, (fn) => !Traverse.hasParent(id, (node) => node === fn)))) {
        continue;
      }
      const parent = reference.identifier.parent;
      const previous = parent.type === AST.AssignmentExpression
          && parent.operator !== "="
          && Extract.unwrap(parent.left) === reference.identifier
        ? reference.identifier
        : undefined;
      addCandidate(writeExpr, previous);
    }
    const survivingCandidates: RefInitializerCandidate[] = [];
    for (const candidate of [...candidates].sort((a, b) => a.position - b.position)) {
      // An unconditional assignment invalidates all earlier branches
      if (candidate.branch == null) {
        survivingCandidates.length = 0;
      } else {
        const previousIndex = survivingCandidates.findIndex((other) => other.branch === candidate.branch);
        if (previousIndex >= 0) survivingCandidates.splice(previousIndex, 1);
      }
      survivingCandidates.push(candidate);
    }
    if (survivingCandidates.length > 0) {
      return survivingCandidates.some((candidate) =>
        (candidate.previous != null && isInitializedFromRef(candidate.previous, refParams, seen)) || isRefValue(candidate.value, refParams, seen, "initializer")
      );
    }
    // dprint-ignore
    return variable.defs.some((d) => d.type === DefinitionType.Parameter && (refParams?.has(d.name) === true || (d.name.type === AST.Identifier && isRefLikeName(d.name.name))));
  }

  function isRefValue(node: TSESTree.Node, refParams: RefParams | undefined, seen: Set<string>, mode: RefValueMode): boolean {
    const expression = Extract.unwrap(node);
    if (isUseRefCall(expression)) return true;
    switch (expression.type) {
      case AST.Identifier:
        return isInitializedFromRef(expression, refParams, seen);
      case AST.MemberExpression: {
        const property = Extract.unwrap(expression.property);
        const object = Extract.unwrap(expression.object);
        if (!expression.computed && Check.isIdentifier(property, "current") && object.type === AST.Identifier && isParameterId(object)) {
          return true;
        }
        if (mode === "initializer") {
          let current: TSESTree.Node = expression;
          while (current.type === AST.MemberExpression) {
            const currentProperty = Extract.unwrap(current.property);
            const currentObject: TSESTree.Node = Extract.unwrap(current.object);
            if (!current.computed && Check.isIdentifier(currentProperty, "current")) {
              const sourceName = getRefSourceName(currentObject);
              if (sourceName != null && isRefLikeName(sourceName)) return true;
              if (currentObject.type === AST.Identifier && isParameterId(currentObject)) return true;
            }
            current = currentObject;
          }
          if (Check.isIdentifier(current) && isRefLikeName(current.name)) return true;
        }
        return isRefValue(expression.object, refParams, seen, mode) || (expression.computed && isRefValue(expression.property, refParams, seen, mode));
      }
      case AST.CallExpression: {
        for (const target of resolveValues(expression.callee)) {
          if (target.kind !== "function" || target.node.async) continue;
          const key = `getter:${String(target.node.range[0])}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const childRefParams = getRefDerivedParams(expression, target.node, refParams);
          if (getReturnExpressions(target.node).some((returnExpression) => isRefValue(returnExpression, childRefParams, seen, mode))) {
            return true;
          }
        }
        return isRefValue(expression.callee, refParams, seen, mode) || expression.arguments.some((argument) => isRefValue(argument, refParams, seen, mode));
      }
      case AST.BinaryExpression:
      case AST.LogicalExpression:
        return isRefValue(expression.left, refParams, seen, mode) || isRefValue(expression.right, refParams, seen, mode);
      case AST.UnaryExpression:
      case AST.UpdateExpression:
        return isRefValue(expression.argument, refParams, seen, mode);
      case AST.ConditionalExpression:
        return (mode === "initializer" && isRefValue(expression.test, refParams, seen, mode))
          || isRefValue(expression.consequent, refParams, seen, mode)
          || isRefValue(expression.alternate, refParams, seen, mode);
      case AST.SequenceExpression:
        return expression.expressions.some((part) => isRefValue(part, refParams, seen, mode));
      case AST.TemplateLiteral:
        return expression.expressions.some((part) => isRefValue(part, refParams, seen, mode));
      case AST.TaggedTemplateExpression:
        return isRefValue(expression.tag, refParams, seen, mode) || isRefValue(expression.quasi, refParams, seen, mode);
      case AST.ObjectExpression:
        return expression.properties.some((part) => isRefValue(part, refParams, seen, mode));
      case AST.Property:
        return isRefValue(expression.value, refParams, seen, mode);
      case AST.ArrayExpression:
        return expression.elements.some((element) => element != null && isRefValue(element, refParams, seen, mode));
      case AST.SpreadElement:
      case AST.AssignmentExpression:
      case AST.AwaitExpression:
        return isRefValue(
          expression.type === AST.AssignmentExpression ? expression.right : expression.argument,
          refParams,
          seen,
          mode,
        );
      default:
        return false;
    }
  }

  function isArgumentUsingRefValue(node: TSESTree.CallExpressionArgument, refParams?: RefParams) {
    const seen = new Set<string>();
    if (isRefValue(node, refParams, seen, "argument")) return true;
    const expression = Extract.unwrap(node);
    return Check.isFunction(expression)
      && context.sourceCode.getScope(expression.body).references.some((reference) => isRefValue(reference.identifier, refParams, seen, "argument"));
  }

  function isRefInExpression(node: TSESTree.Node, refParams?: RefParams) {
    return getIdentifiers(node).some((id) => isInitializedFromRef(id, refParams));
  }

  function isRefGatedContext(node: TSESTree.Node, refParams?: RefParams): boolean {
    let child: TSESTree.Node = node;
    let current: TSESTree.Node | undefined = node.parent;
    while (current != null) {
      if (Check.isFunction(current)) break;
      switch (current.type) {
        case AST.IfStatement:
        case AST.ConditionalExpression:
          if ((child === current.consequent || child === current.alternate) && isRefInExpression(current.test, refParams)) {
            return true;
          }
          break;
        case AST.LogicalExpression:
          if (child === current.right && isRefInExpression(current.left, refParams)) return true;
          break;
        case AST.BlockStatement: {
          const index = current.body.findIndex((statement) => statement === child);
          for (const statement of current.body.slice(0, Math.max(0, index))) {
            if (statement.type !== AST.IfStatement) continue;
            if (!isRefInExpression(statement.test, refParams)) continue;
            if (isTerminatingStatement(statement.consequent)) return true;
          }
          break;
        }
      }
      child = current;
      current = current.parent;
    }
    return false;
  }

  function isParameterId(id: TSESTree.Identifier) {
    return findVariable(context.sourceCode.getScope(id), id)?.defs.some((d) => d.type === DefinitionType.Parameter) ?? false;
  }

  return {
    getRefDerivedParams,
    getSetterName,
    isArgumentUsingRefValue,
    isInitializedFromRef,
    isRefGatedContext,
    isSetStateCall,
    isSetStateId,
    isUseStateCall,
    resolveValues,
  } as const;
}

export function isInitializedFromRef(context: RuleContext, id: TSESTree.Identifier, refParams?: RefParams) {
  return createSetStateResolver(context).isInitializedFromRef(id, refParams);
}

export function isArgumentUsingRefValue(context: RuleContext, node: TSESTree.CallExpressionArgument, refParams?: RefParams) {
  return createSetStateResolver(context).isArgumentUsingRefValue(node, refParams);
}

export function isRefGatedContext(context: RuleContext, node: TSESTree.Node, refParams?: RefParams) {
  return createSetStateResolver(context).isRefGatedContext(node, refParams);
}
