import { Check } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Get all nested identifiers in a expression like node
 * @param node The node to get the nested identifiers from
 * @returns All nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  // Base case: the node itself is an Identifier
  if (node.type === AST.Identifier) {
    identifiers.push(node);
  }
  // CallExpression / NewExpression arguments: foo(a, b)
  if ("arguments" in node) {
    const chunk = node.arguments.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // ArrayExpression / ArrayPattern elements: [a, b, c]
  if ("elements" in node) {
    const chunk = node.elements
      .filter((x) => x != null)
      .flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // ObjectExpression / ObjectPattern properties: { a, b, c }
  if ("properties" in node) {
    const chunk = node.properties.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // SequenceExpression / TemplateLiteral expressions: (a, b) or `${a}${b}`
  if ("expressions" in node) {
    const chunk = node.expressions.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // BinaryExpression / LogicalExpression / AssignmentExpression left operand
  if ("left" in node) {
    const chunk = getNestedIdentifiers(node.left);
    identifiers.push(...chunk);
  }
  // BinaryExpression / LogicalExpression / AssignmentExpression right operand
  if ("right" in node) {
    const chunk = getNestedIdentifiers(node.right);
    identifiers.push(...chunk);
  }
  // Property value: { key: value }
  if (node.type === AST.Property) {
    const chunk = getNestedIdentifiers(node.value);
    identifiers.push(...chunk);
  }
  // SpreadElement argument: ...expr
  if (node.type === AST.SpreadElement) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  // MemberExpression: obj.prop or obj[expr]
  if (node.type === AST.MemberExpression) {
    identifiers.push(...getNestedIdentifiers(node.object));
    if (node.computed) {
      identifiers.push(...getNestedIdentifiers(node.property));
    }
  }
  // UnaryExpression: !expr, typeof expr, void expr, etc.
  if (node.type === AST.UnaryExpression) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  // ChainExpression: obj?.prop
  if (node.type === AST.ChainExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // TSNonNullExpression: expr!
  if (node.type === AST.TSNonNullExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // TSAsExpression: expr as Type
  if (node.type === AST.TSAsExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // TSSatisfiesExpression: expr satisfies Type
  if (node.type === AST.TSSatisfiesExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // ConditionalExpression: a ? b : c
  if (node.type === AST.ConditionalExpression) {
    identifiers.push(...getNestedIdentifiers(node.test));
    identifiers.push(...getNestedIdentifiers(node.consequent));
    identifiers.push(...getNestedIdentifiers(node.alternate));
  }
  // AwaitExpression: await expr
  if (node.type === AST.AwaitExpression) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }
  // YieldExpression: yield expr
  if (node.type === AST.YieldExpression && node.argument != null) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }
  // UpdateExpression: ++x, x--
  if (node.type === AST.UpdateExpression) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }
  // CallExpression / NewExpression: callee(args) / new callee(args)
  if (node.type === AST.CallExpression || node.type === AST.NewExpression) {
    identifiers.push(...getNestedIdentifiers(node.callee));
  }
  // TaggedTemplateExpression: tag`...${expr}...`
  if (node.type === AST.TaggedTemplateExpression) {
    identifiers.push(...getNestedIdentifiers(node.tag));
    identifiers.push(...getNestedIdentifiers(node.quasi));
  }
  // ImportExpression: import(source)
  if (node.type === AST.ImportExpression) {
    identifiers.push(...getNestedIdentifiers(node.source));
  }
  // TSTypeAssertion: <Type>expr
  if (node.type === AST.TSTypeAssertion) {
    identifiers.push(...getNestedIdentifiers(node.expression));
  }
  // TSInstantiationExpression: expr<T>
  if (node.type === AST.TSInstantiationExpression) {
    identifiers.push(...getNestedIdentifiers(node.expression));
  }
  return identifiers;
}

export function isHookDecl(node: TSESTree.Node): node is
  & TSESTree.VariableDeclarator
  & { init: TSESTree.CallExpression }
{
  if (node.type !== AST.VariableDeclarator) return false;
  if (node.id.type !== AST.Identifier) return false;
  const init = node.init;
  if (init == null || init.type !== AST.CallExpression) return false;
  switch (init.callee.type) {
    case AST.Identifier:
      return core.isHookName(init.callee.name);
    case AST.MemberExpression:
      return init.callee.property.type === AST.Identifier
        && core.isHookName(init.callee.property.name);
    default:
      return false;
  }
}

export function isInitializedFromRef(context: RuleContext, name: string, initialScope: Scope): boolean {
  for (const { node } of findVariable(initialScope, name)?.defs ?? []) {
    if (node.type !== AST.VariableDeclarator) continue;
    const init = node.init;
    if (init == null) continue;
    switch (true) {
      // const identifier = anotherRef.current;
      case init.type === AST.MemberExpression
        && init.object.type === AST.Identifier
        && (init.object.name === "ref" || init.object.name.endsWith("Ref")):
        return true;
      // const identifier = useRef();
      case init.type === AST.CallExpression
        && core.isUseRefCall(context, init):
        return true;
      // const { foo } = ref.current.getBoundingClientRect();
      case init.type === AST.CallExpression:
        return getNestedIdentifiers(init).some((id) =>
          isInitializedFromRef(context, id.name, context.sourceCode.getScope(id))
        );
    }
  }
  return false;
}

/**
 * Check if a setState call is inside a conditional block whose test expression
 * is derived from a ref value (e.g. `if (prevRef.current !== value) setState(...)`).
 * @param context The ESLint rule context
 * @param node The AST node to check
 * @returns `true` if the node is inside a ref-gated conditional block
 */
export function isRefGatedContext(
  context: RuleContext,
  node: TSESTree.Node,
): boolean {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null) {
    if (Check.isFunction(current)) break;
    if (current.type === AST.IfStatement) {
      if (isRefInExpression(context, current.test)) return true;
    }
    if (current.type === AST.ConditionalExpression) {
      if (isRefInExpression(context, current.test)) return true;
    }
    current = current.parent;
  }
  return false;
}

function isRefInExpression(context: RuleContext, node: TSESTree.Node): boolean {
  return getNestedIdentifiers(node).some((id) =>
    isInitializedFromRef(context, id.name, context.sourceCode.getScope(id))
  );
}

/**
 * Get the actual CallExpression node from a setState call reference.
 * When the node is an Identifier that is the callee of a CallExpression,
 * returns the parent CallExpression; otherwise returns the node itself.
 * @param node The setState call node (CallExpression or Identifier)
 * @returns The actual CallExpression node
 */
export function getSetStateCallExpression(
  node: TSESTree.CallExpression | TSESTree.Identifier,
): TSESTree.CallExpression | TSESTree.Identifier {
  return node.type === AST.Identifier && node.parent?.type === AST.CallExpression
    ? node.parent
    : node;
}
