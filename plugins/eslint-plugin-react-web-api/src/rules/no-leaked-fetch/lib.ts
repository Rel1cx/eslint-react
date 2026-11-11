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
 * Check whether any enclosing scope binds the given name. This is a syntactic scope-chain walk
 * (no scope manager involved), so a shadowed global (e.g. a local `function fetch() {}`) is never
 * mistaken for the web API
 * @param name The identifier name to look up
 * @param node The node whose enclosing scopes are checked
 * @returns True when an enclosing scope declares the name
 */
export function isNameBoundInEnclosingScopes(name: string, node: TSESTree.Node): boolean {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null) {
    if (scopeBindsName(current, name)) return true;
    current = current.parent;
  }
  return false;
}

/**
 * Check whether a scope-creating node binds the given name
 * @param node The scope boundary node to inspect
 * @param name The identifier name to look up
 * @returns True when the scope declares the name
 */
function scopeBindsName(node: TSESTree.Node, name: string): boolean {
  switch (node.type) {
    case AST.FunctionDeclaration:
    case AST.ArrowFunctionExpression:
      return node.params.some((param) => patternBindsName(param, name));
    case AST.FunctionExpression:
      return node.id?.name === name || node.params.some((param) => patternBindsName(param, name));
    case AST.CatchClause:
      return node.param != null && patternBindsName(node.param, name);
    case AST.BlockStatement:
    case AST.Program:
    case AST.StaticBlock:
      return node.body.some((statement) => statementBindsName(statement, name));
    case AST.ForStatement:
      return node.init?.type === AST.VariableDeclaration && statementBindsName(node.init, name);
    case AST.ForInStatement:
    case AST.ForOfStatement:
      return node.left.type === AST.VariableDeclaration && statementBindsName(node.left, name);
    default:
      return false;
  }
}

/**
 * Check whether a statement declares a binding for the given name
 * @param statement The statement to inspect
 * @param name The identifier name to look up
 * @returns True when the statement binds the name
 */
function statementBindsName(statement: TSESTree.Node, name: string): boolean {
  switch (statement.type) {
    case AST.FunctionDeclaration:
    case AST.ClassDeclaration:
      return statement.id?.name === name;
    case AST.VariableDeclaration:
      return statement.declarations.some((declarator) => patternBindsName(declarator.id, name));
    case AST.ImportDeclaration:
      return statement.specifiers.some((specifier) => specifier.local.name === name);
    case AST.ExportNamedDeclaration:
      return statement.declaration != null && statementBindsName(statement.declaration, name);
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
 * @param pattern The binding pattern to inspect
 * @param name The identifier name to look up
 * @returns True when the pattern binds the name
 */
function patternBindsName(pattern: TSESTree.Node, name: string): boolean {
  switch (pattern.type) {
    case AST.Identifier:
      return pattern.name === name;
    case AST.ArrayPattern:
      return pattern.elements.some((element) => element != null && patternBindsName(element, name));
    case AST.ObjectPattern:
      return pattern.properties.some((property) =>
        property.type === AST.RestElement
          ? patternBindsName(property.argument, name)
          : patternBindsName(property.value, name)
      );
    case AST.AssignmentPattern:
      return patternBindsName(pattern.left, name);
    case AST.RestElement:
      return patternBindsName(pattern.argument, name);
    case AST.TSParameterProperty:
      return patternBindsName(pattern.parameter, name);
    default:
      return false;
  }
}
