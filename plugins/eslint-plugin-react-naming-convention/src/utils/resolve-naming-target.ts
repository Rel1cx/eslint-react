import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/** The naming target of a call: the node to report on and the statically-known name to check. */
export type NamingTarget = readonly [node: TSESTree.Node, name: string];

/**
 * Resolve the naming target of a call assigned to a variable, member, or object property.
 * Unlike `resolveEnclosingAssignmentTarget` from `@eslint-react/var`, an enclosing object
 * property key takes precedence over the outer assignment target (`{ theme: useId() }`
 * resolves to the key `theme`, not the variable holding the object). The search finds no
 * target when the call does not flow into a name: across function boundaries (an
 * expression-bodied arrow function like `() => useId()` matches the block-bodied version),
 * inside JSX expressions, in class static blocks, or when the call is a computed key.
 * @param node The starting node for the upward search.
 * @returns The naming target, or `null` when the name cannot be statically known.
 */
export function resolveNamingTarget(node: TSESTree.Node): NamingTarget | null {
  return resolveUpward(node, null);
}

function resolveUpward(node: TSESTree.Node, propertyTarget: NamingTarget | null): NamingTarget | null {
  const parent = node.parent;
  if (parent == null) return null;
  if (parent.type === AST.Property) {
    // The call is used as a computed key, not as a value, so it has no naming target
    if (parent.value !== node) return null;
    propertyTarget ??= getKeyTarget(parent.key, parent.computed);
  }
  switch (parent.type) {
    case AST.VariableDeclarator: {
      const idTarget = getIdentifierTarget(parent.id);
      return idTarget == null ? null : (propertyTarget ?? idTarget);
    }
    case AST.AssignmentExpression: {
      const leftTarget = getAssignmentTarget(parent.left);
      return leftTarget == null ? null : (propertyTarget ?? leftTarget);
    }
    case AST.PropertyDefinition: {
      const keyTarget = getKeyTarget(parent.key, parent.computed);
      return keyTarget == null ? null : (propertyTarget ?? keyTarget);
    }
    case AST.ArrowFunctionExpression:
    case AST.FunctionDeclaration:
    case AST.FunctionExpression:
    case AST.StaticBlock:
    case AST.JSXExpressionContainer:
    case AST.JSXSpreadAttribute:
    case AST.JSXSpreadChild:
    case AST.ExportDefaultDeclaration:
    case AST.BlockStatement:
    case AST.Program:
      return null;
    default:
      return resolveUpward(parent, propertyTarget);
  }
}

function getStaticName(key: TSESTree.Node, computed: boolean): string | null {
  if (!computed && key.type === AST.Identifier) return key.name;
  if (key.type === AST.Literal && typeof key.value === "string") return key.value;
  return null;
}

function getIdentifierTarget(node: TSESTree.Node): NamingTarget | null {
  return node.type === AST.Identifier ? [node, node.name] : null;
}

function getAssignmentTarget(left: TSESTree.Node): NamingTarget | null {
  if (left.type === AST.Identifier) return [left, left.name];
  if (left.type === AST.MemberExpression) return getKeyTarget(left.property, left.computed, left);
  return null;
}

function getKeyTarget(key: TSESTree.Node, computed: boolean, reportNode: TSESTree.Node = key): NamingTarget | null {
  const name = getStaticName(key, computed);
  return name == null ? null : [reportNode, name];
}
