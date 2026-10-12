import { Check } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { isString } from "@local/eff";
import type { Reference } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function collectUsedPropKeysOfParameter(context: RuleContext, usedPropKeys: Set<string>, parameter: TSESTree.Parameter): boolean {
  switch (parameter.type) {
    case AST.Identifier: {
      return collectUsedPropKeysOfIdentifier(context, usedPropKeys, parameter);
    }
    case AST.ObjectPattern: {
      return collectUsedPropKeysOfObjectPattern(
        context,
        usedPropKeys,
        parameter,
      );
    }
    case AST.AssignmentPattern: {
      // Unwrap default values (`props: Props = defaultProps`) and track the binding itself
      return collectUsedPropKeysOfParameter(context, usedPropKeys, parameter.left);
    }
    default: {
      return false;
    }
  }
}

export function collectUsedPropKeysOfObjectPattern(context: RuleContext, usedPropKeys: Set<string>, objectPattern: TSESTree.ObjectPattern): boolean {
  for (const property of objectPattern.properties) {
    switch (property.type) {
      case AST.Property: {
        const key = getKeyOfExpression(property.key, property.computed);
        if (key == null) return false;
        usedPropKeys.add(key);
        break;
      }
      case AST.RestElement: {
        if (!collectUsedPropsOfRestElement(context, usedPropKeys, property)) {
          return false;
        }
        break;
      }
    }
  }

  return true;
}

export function collectUsedPropsOfRestElement(context: RuleContext, usedPropKeys: Set<string>, restElement: TSESTree.RestElement): boolean {
  switch (restElement.argument.type) {
    case AST.Identifier: {
      return collectUsedPropKeysOfIdentifier(
        context,
        usedPropKeys,
        restElement.argument,
      );
    }
    default: {
      return false;
    }
  }
}

export function collectUsedPropKeysOfIdentifier(context: RuleContext, usedPropKeys: Set<string>, identifier: TSESTree.Identifier): boolean {
  const scope = context.sourceCode.getScope(identifier);
  const variable = scope.variables.find((v) => v.name === identifier.name);
  if (variable == null) return false;

  for (const ref of variable.references) {
    // Skip the declaration site itself
    if (ref.identifier === identifier) continue;

    if (!collectUsedPropKeysOfReference(context, usedPropKeys, ref)) {
      return false;
    }
  }

  return true;
}

export function collectUsedPropKeysOfReference(context: RuleContext, usedPropKeys: Set<string>, ref: Reference): boolean {
  // Walk upward through type-expression wrappers to find the outer value node
  let valueNode: TSESTree.Node = ref.identifier;
  while (Check.isTypeExpression(valueNode.parent) || valueNode.parent.type === AST.ChainExpression) {
    valueNode = valueNode.parent;
  }
  const parent = valueNode.parent;

  switch (parent.type) {
    case AST.MemberExpression: {
      // Handle `props.foo` or `props["foo"]` (including wrapped variants)
      if (parent.object === valueNode) {
        const key = getKeyOfExpression(parent.property, parent.computed);
        if (key == null) return false;
        usedPropKeys.add(key);
        return true;
      }
      break;
    }
    case AST.VariableDeclarator: {
      if (parent.init !== valueNode) break;
      // Handle `const { foo, bar } = props` (including wrapped variants)
      if (parent.id.type === AST.ObjectPattern) {
        return collectUsedPropKeysOfObjectPattern(
          context,
          usedPropKeys,
          parent.id,
        );
      }
      // Handle `const alias = props` by tracking how the alias is used; any
      // untrackable alias reference (ex: reassignment) still bails out
      if (parent.id.type === AST.Identifier) {
        return collectUsedPropKeysOfIdentifier(context, usedPropKeys, parent.id);
      }
      break;
    }
  }

  return false;
}

export function getKeyOfExpression(expr: TSESTree.Expression | TSESTree.PrivateIdentifier, computed = false): string | null {
  switch (expr.type) {
    case AST.Identifier: {
      // A computed identifier is a dynamic key (`props[key]`, `{ [key]: x }`), not a prop named after it
      return computed ? null : expr.name;
    }
    case AST.Literal: {
      if (isString(expr.value)) {
        return expr.value;
      }
      break;
    }
    case AST.TemplateLiteral: {
      // A template literal without substitutions is a static key (`props[`foo`]`)
      if (expr.expressions.length === 0 && expr.quasis.length === 1) {
        return expr.quasis[0]?.value.cooked ?? null;
      }
      break;
    }
  }

  return null;
}
