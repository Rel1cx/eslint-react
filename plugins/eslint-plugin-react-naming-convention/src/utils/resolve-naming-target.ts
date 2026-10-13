import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/** The naming target of a call: the node to report on and the statically-known name to check. */
export type NamingTarget = readonly [node: TSESTree.Node, name: string];

/**
 * Resolve the naming target of a call assigned to a variable, member, or object property.
 * Unlike `resolveEnclosingAssignmentTarget` from `@eslint-react/var`, an enclosing object
 * property key takes precedence over the outer assignment target (`{ theme: useId() }`
 * resolves to the key `theme`, not the variable holding the object).
 * The search only crosses expressions that pass the call's value through unchanged
 * (conditional, logical, sequence-last, await, TS type wrappers, call/new arguments, and
 * object literals reached via a property value). It finds no target when the name is not
 * statically knowable: across function boundaries, inside JSX expressions, in class static
 * blocks, when the call is a computed key, when a property key cannot be resolved, or when
 * the call's value flows into a container or derived value (array literals, spreads,
 * template literals, member access, operators, yields, ...).
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
    // An unresolvable property key means the name is not statically known
    const keyTarget = getKeyTarget(parent.key, parent.computed);
    if (keyTarget == null) return null;
    propertyTarget ??= keyTarget;
    return resolveUpward(parent, propertyTarget);
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
    // Expressions that pass the call's value through unchanged
    case AST.ConditionalExpression:
    case AST.LogicalExpression:
    case AST.AwaitExpression:
    case AST.ChainExpression:
    case AST.TSAsExpression:
    case AST.TSTypeAssertion:
    case AST.TSNonNullExpression:
    case AST.TSSatisfiesExpression:
    case AST.TSInstantiationExpression:
    case AST.ObjectExpression:
      return resolveUpward(parent, propertyTarget);
    case AST.SequenceExpression:
      // Only the last expression's value flows out of a sequence
      return parent.expressions[parent.expressions.length - 1] === node ? resolveUpward(parent, propertyTarget) : null;
    case AST.CallExpression:
    case AST.NewExpression:
      // The call's result flows into the enclosing call's arguments, not its callee
      return parent.arguments.some((argument) => argument === node) ? resolveUpward(parent, propertyTarget) : null;
    default:
      // Anything else means the name of the value is not statically knowable
      return null;
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
