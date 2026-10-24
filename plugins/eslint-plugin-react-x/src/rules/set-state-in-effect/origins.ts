import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, getText } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveOrigin } from "@eslint-react/var";
import { and, hasProperty } from "@local/eff";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { getNestedIdentifiers, isTerminatingStatement } from "./helpers";

export type ValueTarget =
  | { kind: "function"; node: TSESTreeFunction }
  | { kind: "setter"; node: TSESTree.Node };

type Variable = NonNullable<ReturnType<typeof findVariable>>;
type RefParams = ReadonlySet<TSESTree.Node>;
type RefValueMode = "argument" | "initializer";

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
    if (fn.type === AST.ArrowFunctionExpression && fn.body.type !== AST.BlockStatement) {
      const returns = [fn.body] as const;
      returnsByFunction.set(fn, returns);
      return returns;
    }
    const returns: TSESTree.Node[] = [];
    const visitStatements = (statements: readonly TSESTree.Statement[]) => {
      for (const statement of statements) {
        switch (statement.type) {
          case AST.ReturnStatement:
            if (statement.argument != null) returns.push(statement.argument);
            break;
          case AST.BlockStatement:
            visitStatements(statement.body);
            break;
          case AST.IfStatement:
            visitStatements([statement.consequent]);
            if (statement.alternate != null) visitStatements([statement.alternate]);
            break;
          case AST.SwitchStatement:
            for (const switchCase of statement.cases) visitStatements(switchCase.consequent);
            break;
          case AST.TryStatement:
            visitStatements([statement.block]);
            if (statement.handler != null) visitStatements([statement.handler.body]);
            if (statement.finalizer != null) visitStatements([statement.finalizer]);
            break;
          case AST.DoWhileStatement:
          case AST.ForInStatement:
          case AST.ForOfStatement:
          case AST.ForStatement:
          case AST.LabeledStatement:
          case AST.WhileStatement:
          case AST.WithStatement:
            visitStatements([statement.body]);
            break;
          default:
            break;
        }
      }
    };
    if (fn.body.type !== AST.BlockStatement) return [];
    visitStatements(fn.body.body);
    returnsByFunction.set(fn, returns);
    return returns;
  }

  function resolveValues(node: TSESTree.Node, seen = new Set<Variable>()): ValueTarget[] {
    const expression = Extract.unwrap(node);
    if (isSetStateExpression(expression)) return [{ kind: "setter", node: expression }];
    if (Check.isFunction(expression)) return [{ kind: "function", node: expression }];
    if (Check.isIdentifier(expression)) {
      const variable = findVariable(context.sourceCode.getScope(expression), expression);
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
    if (expression.type === AST.ConditionalExpression) {
      return uniqueTargets([
        ...resolveValues(expression.consequent, new Set(seen)),
        ...resolveValues(expression.alternate, new Set(seen)),
      ]);
    }
    if (expression.type !== AST.CallExpression) return [];
    const [argument] = expression.arguments;
    if (argument == null || argument.type === AST.SpreadElement) return [];
    if (core.isUseCallbackCall(context, expression) || Extract.getCalleeName(expression) === "useEffectEvent") {
      return resolveValues(argument, seen);
    }
    if (!core.isUseMemoCall(context, expression)) return [];
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
    const parameterIds = fn.params.map((param) =>
      param.type === AST.Identifier
        ? param
        : param.type === AST.AssignmentPattern && param.left.type === AST.Identifier
        ? param.left
        : null
    );
    for (const id of parameterIds) {
      if (id != null) refParams.delete(id);
    }
    parameterIds.forEach((id, index) => {
      if (id == null) return;
      const argument = call.arguments.at(index);
      if (argument == null || argument.type === AST.SpreadElement) return;
      if (isArgumentUsingRefValue(argument, currentRefParams)) refParams.add(id);
    });
    return refParams;
  }

  function getConditionalBranch(node: TSESTree.Node): TSESTree.Node | null {
    let child: TSESTree.Node = node;
    let current: TSESTree.Node | undefined = node.parent;
    while (current != null && !Check.isFunction(current)) {
      if (current.type === AST.IfStatement && (child === current.consequent || child === current.alternate)) return child;
      if (current.type === AST.ConditionalExpression && (child === current.consequent || child === current.alternate)) return child;
      if (current.type === AST.LogicalExpression && child === current.right) return child;
      if (current.type === AST.SwitchCase) return current;
      if (Check.isLoopStatement(current) && child === current.body) {
        return child;
      }
      child = current;
      current = current.parent;
    }
    return null;
  }

  function isInitializedFromRef(id: TSESTree.Identifier, refParams?: RefParams, seen = new Set<string>()): boolean {
    const variable = findVariable(context.sourceCode.getScope(id), id);
    if (variable == null) return false;
    const key = `${String(variable.identifiers.at(0)?.range[0] ?? variable.name)}:${String(id.range[0])}`;
    if (seen.has(key)) return false;
    seen.add(key);
    const candidates: {
      branch: TSESTree.Node | null;
      position: number;
      previous?: TSESTree.Identifier | undefined;
      value: TSESTree.Node;
    }[] = [];
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
      if (
        reference.init === true
        && variable.defs.some((definition) => definition.type === DefinitionType.Parameter && refParams?.has(definition.name) === true)
      ) {
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
    const surviving: typeof candidates = [];
    for (const candidate of [...candidates].sort((a, b) => a.position - b.position)) {
      if (candidate.branch == null) {
        surviving.length = 0;
      } else {
        const previousIndex = surviving.findIndex((other) => other.branch === candidate.branch);
        if (previousIndex >= 0) surviving.splice(previousIndex, 1);
      }
      surviving.push(candidate);
    }
    if (surviving.length > 0) {
      return surviving
        .some((s) => (s.previous != null && isInitializedFromRef(s.previous, refParams, seen)) || isRefValue(s.value, refParams, seen, "initializer"));
    }
    return variable.defs
      .some((d) => d.type === DefinitionType.Parameter && (refParams?.has(d.name) === true || (d.name.type === AST.Identifier && isRefLikeName(d.name.name))));
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
        if (
          !expression.computed
          && Check.isIdentifier(property, "current")
          && object.type === AST.Identifier
          && isParameterId(object)
        ) {
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
    return getNestedIdentifiers(node).some((id) => isInitializedFromRef(id, refParams));
  }

  function isRefGatedContext(node: TSESTree.Node, refParams?: RefParams): boolean {
    let child: TSESTree.Node = node;
    let current: TSESTree.Node | undefined = node.parent;
    while (current != null) {
      if (Check.isFunction(current)) break;
      if (current.type === AST.IfStatement && (child === current.consequent || child === current.alternate) && isRefInExpression(current.test, refParams)) {
        return true;
      }
      if (
        current.type === AST.ConditionalExpression
        && (child === current.consequent || child === current.alternate)
        && isRefInExpression(current.test, refParams)
      ) {
        return true;
      }
      if (current.type === AST.LogicalExpression && child === current.right && isRefInExpression(current.left, refParams)) {
        return true;
      }
      if (current.type === AST.BlockStatement) {
        const index = current.body.findIndex((statement) => statement === child);
        for (const statement of current.body.slice(0, Math.max(0, index))) {
          if (statement.type !== AST.IfStatement) continue;
          if (!isRefInExpression(statement.test, refParams)) continue;
          if (isTerminatingStatement(statement.consequent)) return true;
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

function uniqueTargets(targets: readonly ValueTarget[]) {
  const seen = new Set<string>();
  return targets.filter((target) => {
    const key = `${target.kind}:${String(target.node.range[0])}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isRefLikeName(name: string) {
  return name === "ref" || name.endsWith("Ref");
}

function getRefSourceName(node: TSESTree.Node): string | null {
  switch (node.type) {
    case AST.Identifier:
      return node.name;
    case AST.MemberExpression: {
      const property = Extract.unwrap(node.property);
      return !node.computed && property.type === AST.Identifier ? property.name : null;
    }
    default:
      return null;
  }
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
