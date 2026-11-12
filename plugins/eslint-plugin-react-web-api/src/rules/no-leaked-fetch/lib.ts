import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/eslint";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Resolve a node to an object expression, following an identifier to its initializer
 * @param context The rule context object
 * @param node The node to resolve
 * @returns The resolved ObjectExpression, or `null` when the node does not resolve to one
 */
export function resolveToObjectExpression(context: RuleContext, node: TSESTree.Node): TSESTree.ObjectExpression | null {
  node = Extract.unwrap(node);
  switch (node.type) {
    case AST.ObjectExpression:
      return node;
    case AST.Identifier: {
      let resolved = resolve(context, node);
      resolved = resolved == null ? null : Extract.unwrap(resolved);
      if (resolved?.type === AST.ObjectExpression) {
        return resolved;
      }
      return null;
    }
    default:
      return null;
  }
}

/**
 * Check whether a node is a known global object identifier
 * @param node The node to check
 * @returns True when the node is `window`, `globalThis`, or `self`
 */
export function isGlobalObject(node: TSESTree.Node): boolean {
  return Check.isIdentifier(node) && (node.name === "window" || node.name === "globalThis" || node.name === "self");
}

/**
 * Check whether a scope-creating node binds the given name
 * @param name The identifier name to look up
 * @param node The scope boundary node to inspect
 * @returns True when the scope declares the name
 */
export function isNameBoundInScope(name: string, node: TSESTree.Node): boolean {
  switch (node.type) {
    case AST.FunctionDeclaration:
    case AST.ArrowFunctionExpression:
      return node.params.some((param) => isNameBoundInPattern(name, param));
    case AST.FunctionExpression:
      return node.id?.name === name || node.params.some((param) => isNameBoundInPattern(name, param));
    case AST.CatchClause:
      return node.param != null && isNameBoundInPattern(name, node.param);
    case AST.BlockStatement:
    case AST.Program:
    case AST.StaticBlock:
      return node.body.some((statement) => isNameBoundInStatement(name, statement));
    case AST.ForStatement:
      return node.init?.type === AST.VariableDeclaration && isNameBoundInStatement(name, node.init);
    case AST.ForInStatement:
    case AST.ForOfStatement:
      return node.left.type === AST.VariableDeclaration && isNameBoundInStatement(name, node.left);
    default:
      return false;
  }
}

/**
 * Check whether a statement declares a binding for the given name
 * @param name The identifier name to look up
 * @param statement The statement to inspect
 * @returns True when the statement binds the name
 */
function isNameBoundInStatement(name: string, statement: TSESTree.Node): boolean {
  switch (statement.type) {
    case AST.FunctionDeclaration:
    case AST.ClassDeclaration:
      return statement.id?.name === name;
    case AST.VariableDeclaration:
      return statement.declarations.some((declarator) => isNameBoundInPattern(name, declarator.id));
    case AST.ImportDeclaration:
      return statement.specifiers.some((specifier) => specifier.local.name === name);
    case AST.ExportNamedDeclaration:
      return statement.declaration != null && isNameBoundInStatement(name, statement.declaration);
    case AST.ExportDefaultDeclaration:
      return (statement.declaration.type === AST.FunctionDeclaration || statement.declaration.type === AST.ClassDeclaration)
        && statement.declaration.id?.name === name;
    case AST.TSImportEqualsDeclaration:
    case AST.TSEnumDeclaration:
      return statement.id.name === name;
    case AST.TSModuleDeclaration:
      return statement.id.type === AST.Identifier && statement.id.name === name;
    default:
      return false;
  }
}

/**
 * Check whether a binding pattern binds the given name
 * @param name The identifier name to look up
 * @param pattern The binding pattern to inspect
 * @returns True when the pattern binds the name
 */
function isNameBoundInPattern(name: string, pattern: TSESTree.Node): boolean {
  switch (pattern.type) {
    case AST.Identifier:
      return pattern.name === name;
    case AST.ArrayPattern:
      return pattern.elements.some((element) => element != null && isNameBoundInPattern(name, element));
    case AST.ObjectPattern:
      return pattern.properties.some((property) =>
        property.type === AST.RestElement
          ? isNameBoundInPattern(name, property.argument)
          : isNameBoundInPattern(name, property.value)
      );
    case AST.AssignmentPattern:
      return isNameBoundInPattern(name, pattern.left);
    case AST.RestElement:
      return isNameBoundInPattern(name, pattern.argument);
    case AST.TSParameterProperty:
      return isNameBoundInPattern(name, pattern.parameter);
    default:
      return false;
  }
}
