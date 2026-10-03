/// <reference types="node" />

import { isString } from "@local/eff";
import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { isFunction } from "@typescript-eslint/utils/ast-utils";
import path from "node:path";

import { getFixturesRootDir } from "./fixtures";

export interface ParseCodeOptions {
  /**
   * Anchor file path used for parser inference (a `.tsx` path enables JSX).
   * Defaults to the `estree.tsx` fixture.
   */
  filePath?: string;
  /**
   * Passed through to the parser; when omitted, JSX support is inferred from `filePath`.
   */
  jsx?: boolean;
  sourceType?: "commonjs" | "module" | "script";
}

export function parseCode(code: string, options: ParseCodeOptions = {}): ReturnType<typeof parseForESLint> {
  const { filePath = path.join(getFixturesRootDir(), "estree.tsx"), jsx, sourceType } = options;
  const parsed = parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    ecmaVersion: "latest",
    filePath,
    sourceType: "module",
    tokens: true,
    ...(jsx == null ? {} : { jsx }),
    ...(sourceType == null ? {} : { sourceType }),
  });
  // Attach parent pointers so parsed ASTs behave like the ones ESLint hands to rules
  simpleTraverse(parsed.ast, { enter() {} }, true);
  return parsed;
}

/**
 * Collects every node of the given `type` under `input`.
 * When `input` is a string it is parsed with `parseCode` (`options` apply);
 * when it is a node its subtree is traversed as-is (`options` are ignored)
 * and existing parent pointers are left untouched.
 * @param input Source code or an AST node to search.
 * @param type The node type to collect.
 * @param options Parser options, only used when `input` is a string.
 * @returns The matching nodes in traversal order.
 */
export function collectNodes<T extends TSESTree.Node>(input: string | TSESTree.Node, type: T["type"], options: ParseCodeOptions = {}): T[] {
  const nodes: T[] = [];
  const isTarget = (node: TSESTree.Node): node is T => node.type === type;
  const root = isString(input) ? parseCode(input, options).ast : input;
  simpleTraverse(
    root,
    {
      enter(node) {
        if (isTarget(node)) {
          nodes.push(node);
        }
      },
    },
  );
  return nodes;
}

/**
 * Returns the first node of the given `type` under `input`.
 * @param input Source code or an AST node to search.
 * @param type The node type to find.
 * @param options Parser options, only used when `input` is a string.
 * @returns The first matching node in traversal order.
 */
export function getFirstNodeOfType<T extends TSESTree.Node>(input: string | TSESTree.Node, type: T["type"], options: ParseCodeOptions = {}): T {
  const [node] = collectNodes<T>(input, type, options);
  if (node == null) {
    const hint = isString(input) ? ` in: ${input}` : " in the given subtree";
    throw new Error(`No ${type} found${hint}`);
  }
  return node;
}

/**
 * Finds every Identifier named `name` that is a reference rather than a
 * declaration. Excluded declaration sites are: variable declarator ids,
 * function/class declaration ids, import specifier bindings, enum/member/
 * module/type-alias declaration ids, function parameters, and non-computed
 * property keys. Requires parent pointers (as attached by `parseCode`) when
 * `input` is a node.
 * @param input Source code or an AST node to search.
 * @param name The identifier name to look for.
 * @param options Parser options, only used when `input` is a string.
 * @returns The referencing Identifier nodes in traversal order.
 */
export function findIdentifierReferences(input: string | TSESTree.Node, name: string, options: ParseCodeOptions = {}): TSESTree.Identifier[] {
  const refs: TSESTree.Identifier[] = [];
  const root = isString(input) ? parseCode(input, options).ast : input;
  simpleTraverse(root, {
    enter(node) {
      if (node.type !== AST.Identifier || node.name !== name) return;
      const parent: TSESTree.Node | undefined = node.parent;
      if (parent.type === AST.ClassDeclaration && parent.id === node) return;
      if (parent.type === AST.FunctionDeclaration && parent.id === node) return;
      if (parent.type === AST.ImportDefaultSpecifier) return;
      if (parent.type === AST.ImportSpecifier) return;
      if (parent.type === AST.Property && parent.key === node && !parent.computed) return;
      if (parent.type === AST.TSEnumDeclaration && parent.id === node) return;
      if (parent.type === AST.TSEnumMember && parent.id === node) return;
      if (parent.type === AST.TSModuleDeclaration && parent.id === node) return;
      if (parent.type === AST.TSTypeAliasDeclaration && parent.id === node) return;
      if (parent.type === AST.VariableDeclarator && parent.id === node) return;
      if (isFunction(parent) && parent.params.some((p) => p === node)) return;
      refs.push(node);
    },
  });
  return refs;
}

/**
 * Parses `code` and returns the expression of the first top-level
 * ExpressionStatement.
 * @param code Source code whose first statement is an expression statement.
 * @param options Parser options passed to `parseCode`.
 * @returns The expression of the first top-level ExpressionStatement.
 */
export function getFirstExpression(code: string, options: ParseCodeOptions = {}): TSESTree.Expression {
  const stmt = parseCode(code, options).ast.body[0];
  if (stmt?.type !== AST.ExpressionStatement) {
    throw new Error(`Expected an expression statement, got: ${code}`);
  }
  return stmt.expression;
}

/**
 * Parses `code` and returns the expression of the last top-level
 * ExpressionStatement.
 * @param code Source code whose last statement is an expression statement.
 * @param options Parser options passed to `parseCode`.
 * @returns The expression of the last top-level ExpressionStatement.
 */
export function getLastExpression(code: string, options: ParseCodeOptions = {}): TSESTree.Expression {
  const stmt = parseCode(code, options).ast.body.at(-1);
  if (stmt?.type !== AST.ExpressionStatement) {
    throw new Error(`Expected last statement to be an ExpressionStatement, got ${stmt?.type ?? "unknown"}`);
  }
  return stmt.expression;
}

/**
 * Returns the source text covered by `node`'s range.
 * @param code The source text `node` was parsed from.
 * @param node The node whose text to read.
 * @returns The slice of `code` covered by `node`.
 */
export function getTextOf(code: string, node: TSESTree.Node): string {
  return code.slice(node.range[0], node.range[1]);
}
