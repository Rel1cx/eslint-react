import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { TSESLint } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import * as Check from "./check";
import type { TSESTreeTypeExpression } from "./types";

/**
 * Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.
 * @param node The node to unwrap.
 * @returns The innermost non-type-expression node.
 */
export function unwrap(node: TSESTree.Node): Exclude<TSESTree.Node, TSESTreeTypeExpression> {
  if (Check.isTypeExpression(node) || node.type === AST.ChainExpression) {
    return unwrap(node.expression);
  }
  return node;
}

/**
 * Find a property by name in a list of object literal properties, recursing into spread object expressions.
 * @param properties The object literal properties to search.
 * @param name The property name to look for.
 * @returns The matching `Property` node, or `null` when not found.
 */
export function findProperty(properties: TSESTree.ObjectLiteralElement[], name: string): TSESTree.Property | null {
  for (const property of properties) {
    if (property.type === AST.Property && getPropertyName(property) === name) {
      return property;
    }
    if (property.type === AST.SpreadElement && property.argument.type === AST.ObjectExpression) {
      const found = findProperty(property.argument.properties, name);
      if (found != null) return found;
    }
  }
  return null;
}

/**
 * Get the name of the callee of a call expression.
 * @param node The call expression to inspect.
 * @returns The callee name (ex: `"useState"`), or `null` when it cannot be statically determined.
 */
export function getCalleeName(node: TSESTree.CallExpression): string | null {
  const callee = unwrap(node.callee);
  if (Check.isIdentifier(callee)) {
    return callee.name;
  }
  if (callee.type === AST.MemberExpression && !callee.computed && Check.isIdentifier(callee.property)) {
    return callee.property.name;
  }
  return null;
}

/**
 * Get the member chain of an expression (ex: `[a, b, c]` for `a.b.c`), starting from the base object.
 * Type expressions and chain expressions are unwrapped along the way.
 * @param node The expression to inspect.
 * @returns The base node followed by each member property in access order.
 */
export function getMemberChain(node: TSESTree.Expression | TSESTree.PrivateIdentifier) {
  const members: Exclude<TSESTree.Node, TSESTreeTypeExpression>[] = [];
  let current: TSESTree.Node = unwrap(node);
  while (current.type === AST.MemberExpression) {
    const property = unwrap(current.property);
    members.unshift(property);
    current = unwrap(current.object);
  }
  members.unshift(current);
  return members;
}

/**
 * Collect every write target of an assignment or loop target, expanding
 * destructuring patterns such as `[local, globalValue] = source` or
 * `({ a: obj.x } = source)`. Defaults (`{ a = source }`) are not targets;
 * their left side is.
 * @param node The assignment left side or for-in/of loop target to inspect.
 * @returns The identifier and member expression targets being written.
 */
export function getAssignmentTargets(node: TSESTree.Node): (TSESTree.Identifier | TSESTree.MemberExpression)[] {
  const target = unwrap(node);
  switch (target.type) {
    case AST.Identifier:
    case AST.MemberExpression:
      return [target];
    case AST.ArrayPattern:
      return target.elements.flatMap((element) => element == null ? [] : getAssignmentTargets(element));
    case AST.AssignmentPattern:
      return getAssignmentTargets(target.left);
    case AST.ObjectPattern:
      return target.properties.flatMap((property) => {
        if (property.type === AST.RestElement) return getAssignmentTargets(property.argument);
        return getAssignmentTargets(property.value);
      });
    case AST.RestElement:
      return getAssignmentTargets(target.argument);
    default:
      return [];
  }
}

/**
 * Get the static name of an object property's key.
 *
 * Symbol keys and object/function key coercion are not supported by this string-name lookup.
 * @param property The property to inspect.
 * @param effort `"min"` only matches plain identifiers; `"std"` also resolves string literals and simple template literals;
 * `"max"` additionally evaluates computed keys and converts known primitive keys to strings.
 * @param initialScope The key's scope for `"max"` evaluation. Without it, scope-dependent keys cannot be resolved.
 * Ignored by `"min"` and `"std"`.
 * @returns The property name, or `null` when it cannot be statically determined.
 */
export function getPropertyName(
  property: TSESTree.Property,
  effort: "min" | "std" | "max" = "min",
  initialScope?: TSESLint.Scope.Scope,
): string | null {
  const key = unwrap(property.key);
  if (Check.isIdentifier(key) && !property.computed) return key.name;
  if (effort === "min") return null;
  if (key.type === AST.Literal && typeof key.value === "string") return key.value;
  if (key.type === AST.TemplateLiteral && key.expressions.length === 0) {
    return key.quasis[0]?.value.cooked ?? key.quasis[0]?.value.raw ?? null;
  }
  if (effort === "std") return null;
  const result = getStaticValue(key, initialScope);
  if (result == null) return null;
  const { value } = result;
  if (typeof value === "symbol" || typeof value === "function" || (typeof value === "object" && value !== null)) return null;
  return String(value);
}

/**
 * Get the fully qualified name of a node (ex: `React.useState`), falling back to source text when needed.
 * @param node The node to inspect.
 * @param getText A function returning the source text of a node.
 * @returns The fully qualified name.
 */
export function getFullyQualifiedName(node: TSESTree.Node, getText: (node: TSESTree.Node) => string): string {
  const expr = unwrap(node);
  switch (expr.type) {
    case AST.Identifier:
    case AST.JSXIdentifier:
    case AST.PrivateIdentifier:
      return expr.name;
    case AST.MemberExpression: {
      if (expr.computed) return getText(expr);
      return `${getFullyQualifiedName(expr.object, getText)}.${getFullyQualifiedName(expr.property, getText)}`;
    }
    case AST.JSXMemberExpression:
      return `${getFullyQualifiedName(expr.object, getText)}.${getFullyQualifiedName(expr.property, getText)}`;
    case AST.JSXNamespacedName:
      return `${expr.namespace.name}:${expr.name.name}`;
    case AST.JSXText:
      return expr.value;
    case AST.Literal:
      return expr.raw;
    default:
      return getText(expr);
  }
}
