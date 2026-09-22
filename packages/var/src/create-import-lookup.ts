import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * A single local import binding, modeled after the specification's ImportEntry.
 *
 * Entries are the ground truth of the lookup: one is recorded per import
 * specifier (or pre-registered builtin namespace), and every query on
 * {@link ImportLookup} is answered from them.
 */
export interface ImportEntry {
  /**
   * The import form.
   *
   * `"named"` covers both named imports and default imports; a default import
   * is distinguished by its {@link ImportEntry.name} being `"default"`.
   */
  kind: "named" | "namespace";
  /**
   * The name of the imported export.
   *
   * `"default"` for default imports and `""` for namespace imports, which
   * bind the module as a whole rather than a single export.
   */
  name: string;
  /** The local name the import is bound to (the alias when one is used). */
  local: string;
  /** The module specifier as written in the source, e.g. `"react-dom/client"`. */
  specifier: string;
}

/**
 * A read-only index over the local import bindings of a program.
 *
 * All queries are O(1) or O(k) lookups over indexes built once at creation
 * time, and results preserve source order.
 */
export interface ImportLookup {
  /** Return every import entry, in source order. */
  all(): readonly ImportEntry[];
  /**
   * Look up the import entry a local name is bound to.
   *
   * @param local - The local binding name.
   * @returns The matching entry, or `undefined` if the name is not imported.
   */
  binding(local: string): ImportEntry | undefined;
  /**
   * Look up all local bindings of a given imported export name.
   *
   * @param name - The imported export name (`"default"` for default imports).
   * @returns The matching entries in source order, possibly empty.
   */
  bindingsOf(name: string): readonly ImportEntry[];
  /**
   * Check whether a local name is bound to a specific imported export.
   *
   * @param local - The local binding name.
   * @param name - The imported export name.
   */
  has(local: string, name: string): boolean;
  /**
   * Check whether a local name is a default or namespace binding, i.e. one
   * that refers to the module as a whole rather than to a single named export.
   *
   * @param local - The local binding name.
   */
  hasNamespace(local: string): boolean;
}

/** Options for {@link createImportLookup}. */
export interface ImportLookupOptions {
  /**
   * Local names to pre-register as namespace bindings without an import
   * statement, e.g. a `ReactDOM` global provided by the environment.
   */
  builtinNamespaces?: readonly string[];
  /**
   * The base import source to track, e.g. `"react-dom"`.
   *
   * Subpath imports are grouped under their base, so `"react-dom/client"`
   * matches a source of `"react-dom"`.
   */
  source: string;
}

/**
 * Create a lookup of local import bindings from a source by scanning the
 * top-level imports of a program.
 *
 * Entries are kept in source order, and both indexes (by local name and by
 * imported name) are built during the same scan, so every query works
 * immediately after creation. Aliases (`import { flushSync as fs }`) are
 * handled naturally: the alias is the entry's local name.
 *
 * @param program - The program whose top-level import declarations to scan.
 * @param options - The source to track and optional builtin namespaces.
 * @returns An {@link ImportLookup} over the matching import bindings.
 *
 * @example
 * ```typescript
 * const imports = createImportLookup(context.sourceCode.ast, { source: "react-dom" });
 * return {
 *   CallExpression(node) {
 *     const callee = Extract.unwrap(node.callee);
 *     if (Check.isIdentifier(callee) && imports.has(callee.name, "flushSync")) {
 *       // ...
 *     }
 *   },
 * };
 * ```
 */
export function createImportLookup(program: TSESTree.Program, options: ImportLookupOptions): ImportLookup {
  const { builtinNamespaces = [], source } = options;
  const entries: ImportEntry[] = [];
  const byLocal = new Map<string, ImportEntry>();
  const byName = new Map<string, ImportEntry[]>();
  const add = (entry: ImportEntry) => {
    entries.push(entry);
    byLocal.set(entry.local, entry);
    getOrInsertComputed(byName, entry.name, () => []).push(entry);
  };
  for (const local of builtinNamespaces) {
    add({ kind: "namespace", name: "", local, specifier: source });
  }
  for (const statement of program.body) {
    if (statement.type !== AST.ImportDeclaration) continue;
    const specifier = statement.source.value;
    const [baseSource = ""] = specifier.split("/");
    if (baseSource !== source) continue;
    for (const specifierNode of statement.specifiers) {
      switch (specifierNode.type) {
        case AST.ImportSpecifier: {
          const { imported, local } = specifierNode;
          if (imported.type !== AST.Identifier) continue;
          add({ kind: "named", name: imported.name, local: local.name, specifier });
          continue;
        }
        case AST.ImportDefaultSpecifier:
          add({ kind: "named", name: "default", local: specifierNode.local.name, specifier });
          continue;
        case AST.ImportNamespaceSpecifier:
          add({ kind: "namespace", name: "", local: specifierNode.local.name, specifier });
          continue;
      }
    }
  }
  return {
    all() {
      return entries;
    },
    binding(local) {
      return byLocal.get(local);
    },
    bindingsOf(name) {
      return byName.get(name) ?? [];
    },
    has(local, name) {
      return byLocal.get(local)?.name === name;
    },
    hasNamespace(local) {
      const entry = byLocal.get(local);
      return entry != null && (entry.kind === "namespace" || entry.name === "default");
    },
  };
}
