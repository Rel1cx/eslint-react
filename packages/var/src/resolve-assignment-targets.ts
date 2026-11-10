import { Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Resolve every write target of an assignment or loop target, expanding
 * destructuring patterns such as `[local, globalValue] = source` or
 * `({ a: obj.x } = source)`. Defaults (`{ a = source }`) are not targets;
 * their left side is.
 * @param node The assignment left side or for-in/of loop target to inspect. Declaration-form loop targets are not expanded and return an empty array.
 * @returns The identifier and member expression targets being written.
 */
export function resolveAssignmentTargets(node: TSESTree.Node): (TSESTree.Identifier | TSESTree.MemberExpression)[] {
  const target = Extract.unwrap(node);
  switch (target.type) {
    case AST.Identifier:
    case AST.MemberExpression:
      return [target];
    case AST.ArrayPattern:
      return target.elements.flatMap((element) => element == null ? [] : resolveAssignmentTargets(element));
    case AST.AssignmentPattern:
      return resolveAssignmentTargets(target.left);
    case AST.ObjectPattern:
      return target.properties.flatMap((property) => {
        if (property.type === AST.RestElement) return resolveAssignmentTargets(property.argument);
        return resolveAssignmentTargets(property.value);
      });
    case AST.RestElement:
      return resolveAssignmentTargets(target.argument);
    default:
      return [];
  }
}
