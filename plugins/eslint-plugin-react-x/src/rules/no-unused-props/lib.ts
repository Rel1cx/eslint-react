import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import type { Reference } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ESLintUtils, type ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import type ts from "typescript";

export function collectUsedPropKeysOfParameter(
  context: RuleContext,
  usedPropKeys: Set<string>,
  parameter: TSESTree.Parameter,
): boolean {
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
    default: {
      return false;
    }
  }
}

export function collectUsedPropKeysOfObjectPattern(
  context: RuleContext,
  usedPropKeys: Set<string>,
  objectPattern: TSESTree.ObjectPattern,
): boolean {
  for (const property of objectPattern.properties) {
    switch (property.type) {
      case AST.Property: {
        const key = getKeyOfExpression(property.key);
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

export function collectUsedPropsOfRestElement(
  context: RuleContext,
  usedPropKeys: Set<string>,
  restElement: TSESTree.RestElement,
): boolean {
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

export function collectUsedPropKeysOfIdentifier(
  context: RuleContext,
  usedPropKeys: Set<string>,
  identifier: TSESTree.Identifier,
): boolean {
  const scope = context.sourceCode.getScope(identifier);
  const variable = scope.variables.find((v) => v.name === identifier.name);
  if (variable == null) return false;

  for (const ref of variable.references) {
    // Skip the declaration site itself
    if (ref.identifier === identifier) continue;

    if (
      !collectUsedPropKeysOfReference(context, usedPropKeys, identifier, ref)
    ) {
      return false;
    }
  }

  return true;
}

export function collectUsedPropKeysOfReference(
  context: RuleContext,
  usedPropKeys: Set<string>,
  identifier: TSESTree.Identifier,
  ref: Reference,
): boolean {
  const { parent } = ref.identifier;

  switch (parent.type) {
    case AST.MemberExpression: {
      // Handle `props.foo` or `props["foo"]`
      if (
        parent.object.type === AST.Identifier
        && parent.object.name === identifier.name
      ) {
        const key = getKeyOfExpression(parent.property);
        if (key == null) return false;
        usedPropKeys.add(key);
        return true;
      }
      break;
    }
    case AST.VariableDeclarator: {
      // Handle `const { foo, bar } = props`
      if (
        parent.id.type === AST.ObjectPattern
        && parent.init === ref.identifier
      ) {
        return collectUsedPropKeysOfObjectPattern(
          context,
          usedPropKeys,
          parent.id,
        );
      }
      break;
    }
  }

  return false;
}

export function getKeyOfExpression(expr: TSESTree.Expression | TSESTree.PrivateIdentifier): string | null {
  switch (expr.type) {
    case AST.Identifier: {
      return expr.name;
    }
    case AST.Literal: {
      if (typeof expr.value === "string") {
        return expr.value;
      }
      break;
    }
  }

  return null;
}
