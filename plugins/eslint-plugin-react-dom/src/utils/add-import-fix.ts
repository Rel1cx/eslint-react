import { Check } from "@eslint-react/ast";
import type { RuleContext, RuleFix, RuleFixer } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, AST_TOKEN_TYPES, type TSESTree } from "@typescript-eslint/types";

/**
 * Build a fix that makes `name` importable from `source`, reusing the file's
 * existing structure instead of blindly prepending to the program:
 *
 * - returns `null` when `name` is already imported from `source` under the
 *   same local name, or when the local name is already bound by any other
 *   top-level value import (adding another binding would be a duplicate
 *   declaration);
 * - merges `name` into an existing value import declaration from `source`
 *   when it has named specifiers;
 * - otherwise inserts a new import statement after the last existing import,
 *   after the directive prologue (e.g. `"use client"`), or after the file's
 *   leading comments (e.g. a license header), whichever applies.
 *
 * @param context The rule context.
 * @param fixer The rule fixer.
 * @param name The named export to import.
 * @param source The module specifier to import from.
 * @returns A single fix, or `null` when the import already exists.
 */
export function addImportFix(context: RuleContext, fixer: RuleFixer, name: string, source: string): RuleFix | null {
  const { ast } = context.sourceCode;
  let lastImport: TSESTree.ImportDeclaration | null = null;
  let lastDirective: TSESTree.Statement | null = null;
  let sameSourceImport: TSESTree.ImportDeclaration | null = null;
  for (const statement of ast.body) {
    if (Check.isDirective(statement)) {
      lastDirective = statement;
      continue;
    }
    if (statement.type !== AST.ImportDeclaration) continue;
    lastImport = statement;
    // `import type ...` is erased at compile time: it binds no runtime value
    // and does not block adding one.
    if (statement.importKind === "type") continue;
    for (const specifier of statement.specifiers) {
      if (specifier.type === AST.ImportSpecifier && specifier.importKind === "type") continue;
      if (specifier.local.name !== name) continue;
      // The local name is already bound by a top-level value import: either it
      // is the exact import being added, or adding another binding for it would
      // produce a duplicate declaration. Both cases need no import fix here.
      return null;
    }
    if (statement.source.value !== source) continue;
    sameSourceImport ??= statement;
  }
  // Merge into the existing import from the same source, e.g.
  // `import { createRoot } from "react-dom/client"` becomes
  // `import { createRoot, hydrateRoot } from "react-dom/client"`.
  const namedSpecifiers = sameSourceImport?.specifiers.filter((s) => s.type === AST.ImportSpecifier) ?? [];
  const lastNamedSpecifier = namedSpecifiers.at(-1);
  if (lastNamedSpecifier != null) {
    return fixer.insertTextAfter(lastNamedSpecifier, `, ${name}`);
  }
  const text = `import { ${name} } from "${source}";`;
  // Match the file's existing line endings so CRLF files stay CRLF.
  const eol = context.sourceCode.text.includes("\r\n") ? "\r\n" : "\n";
  if (lastImport != null) {
    return fixer.insertTextAfterRange(getLineEndAnchor(context, lastImport), `${eol}${text}`);
  }
  if (lastDirective != null) {
    return fixer.insertTextAfterRange(getLineEndAnchor(context, lastDirective), `${eol}${text}`);
  }
  // Keep leading comments (license headers, etc.) at the very top of the file.
  const comments = ast.body[0] == null
    ? ast.comments
    : context.sourceCode.getCommentsBefore(ast.body[0]);
  const lastComment = comments.at(-1);
  if (lastComment != null) {
    return fixer.insertTextAfter(lastComment, `${eol}${text}`);
  }
  return fixer.insertTextBefore(ast, `${text}${eol}`);
}

/**
 * Advance past any comments on the same line as `node`, so that a trailing
 * comment stays on its own line instead of drifting onto the inserted one.
 *
 * @param context The rule context.
 * @param node The statement whose line end to find.
 * @returns `node` itself, or the last consecutive same-line comment after it.
 */
function getLineEndAnchor(context: RuleContext, node: TSESTree.Node): readonly [number, number] {
  let anchor: TSESTree.Node | TSESTree.Comment = node;
  for (;;) {
    const next: TSESTree.Token | null = context.sourceCode.getTokenAfter(anchor, { includeComments: true });
    if (next == null || (next.type !== AST_TOKEN_TYPES.Line && next.type !== AST_TOKEN_TYPES.Block)) break;
    if (next.loc.start.line !== anchor.loc.end.line) break;
    anchor = next;
  }
  return anchor.range;
}
