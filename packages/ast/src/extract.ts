import { isString } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Check from "./check";
import type { TSESTreeTypeOrChainExpression } from "./tree";

/**
 * Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.
 * @param node The node to unwrap.
 * @returns The innermost non-wrapper node (`ChainExpression` and type expressions are stripped) — a reference into the original tree, never a copy.
 */
export function unwrap(node: TSESTreeTypeOrChainExpression): Exclude<TSESTree.Expression, TSESTreeTypeOrChainExpression>;
export function unwrap<T extends TSESTree.Node>(node: T): Exclude<T, TSESTreeTypeOrChainExpression>;
export function unwrap(node: TSESTree.Node): TSESTree.Node {
  if (Check.isTypeOrChainExpression(node)) {
    return unwrap(node.expression);
  }
  return node;
}

/**
 * Get the flattened name of a JSX identifier, namespaced name, or member expression.
 * @param node The JSX name node.
 * @returns The flattened JSX name (ex: `"Foo.Bar"`, `"xml:space"`).
 */
export function getJSXName(node: TSESTree.JSXIdentifier | TSESTree.JSXNamespacedName | TSESTree.JSXMemberExpression): string {
  switch (node.type) {
    case AST.JSXIdentifier:
      return node.name;
    case AST.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case AST.JSXMemberExpression:
      return `${getJSXName(node.object)}.${getJSXName(node.property)}`;
  }
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
      return expr.name;
    case AST.PrivateIdentifier:
      return `#${expr.name}`;
    case AST.JSXIdentifier:
    case AST.JSXMemberExpression:
    case AST.JSXNamespacedName:
      return getJSXName(expr);
    case AST.MemberExpression: {
      if (expr.computed) return getText(expr);
      return `${getFullyQualifiedName(expr.object, getText)}.${getFullyQualifiedName(expr.property, getText)}`;
    }
    case AST.JSXText:
      return expr.value;
    case AST.Literal:
      return expr.raw;
    default:
      return getText(expr);
  }
}

/**
 * Get the name of the callee of a call expression.
 * @param node The call expression to inspect.
 * @returns The callee name (ex: `"useState"`), or `null` for computed member expressions and other unsupported callee forms.
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
  const members: Exclude<TSESTree.Node, TSESTreeTypeOrChainExpression>[] = [];
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
 * Get the static name of an object property's key.
 * @param property The property to inspect.
 * @param effort `"min"` only matches plain identifiers; `"max"` also resolves string literals and simple template literals.
 * @returns The property name, or `null` when it cannot be statically determined.
 */
export function getPropertyName(property: TSESTree.Property, effort: "min" | "max" = "min"): string | null {
  const key = unwrap(property.key);
  if (Check.isIdentifier(key) && !property.computed) return key.name;
  if (effort === "min") return null;
  if (key.type === AST.Literal && isString(key.value)) return key.value;
  if (key.type === AST.TemplateLiteral && key.expressions.length === 0) {
    return key.quasis[0]?.value.cooked ?? key.quasis[0]?.value.raw ?? null;
  }
  return null;
}

/**
 * Find a property by name in a list of object literal properties, recursing into spread object expressions.
 *
 * Names are resolved with maximum effort: in addition to non-computed identifiers, string-literal keys
 * (computed or not) and template literals without expressions are matched.
 * @param properties The object literal properties to search.
 * @param name The property name to look for.
 * @returns The matching `Property` node, or `null` when not found.
 */
export function findProperty(properties: TSESTree.ObjectLiteralElement[], name: string): TSESTree.Property | null {
  for (const property of properties) {
    if (property.type === AST.Property && getPropertyName(property, "max") === name) {
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
 * Collect every write target of an assignment or loop target, expanding
 * destructuring patterns such as `[local, globalValue] = source` or
 * `({ a: obj.x } = source)`. Defaults (`{ a = source }`) are not targets;
 * their left side is.
 * @param node The assignment left side or for-in/of loop target to inspect. Declaration-form loop targets are not expanded and return an empty array.
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
