import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * A single local import binding, modeled after the specification's ImportEntry.
 *
 * Entries are the ground truth of the lookup: one is recorded per import
 * specifier (or pre-registered builtin namespace), and every query on
 * {@link ImportLookup} is answered from them.
 */
export type ImportEntry =
  | {
    /** A named or default import; both are bound to a single export. */
    readonly kind: "named" | "default";
    /** The name of the imported export (`"default"` for default imports). */
    readonly name: string;
    /** The local name the import is bound to (the alias when one is used). */
    readonly local: string;
    /** The module specifier as written in the source, e.g. `"react-dom/client"`. */
    readonly specifier: string;
  }
  | {
    /** A namespace import, which binds the module as a whole. */
    readonly kind: "namespace";
    /** The local name the import is bound to. */
    readonly local: string;
    /** The module specifier as written in the source. */
    readonly specifier: string;
  };

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
   * @returns The matching entry, or `null` if the name is not imported.
   */
  binding(local: string): ImportEntry | null;
  /**
   * Look up all local bindings of a given imported export name.
   *
   * @param name - The imported export name (`"default"` for default imports,
   *   `""` for namespace imports).
   * @returns The matching entries in source order, possibly empty.
   */
  bindingsOf(name: string): readonly ImportEntry[];
  /**
   * Check whether a local name is bound to a specific imported export.
   *
   * `"default"` matches default imports; namespace imports never match because
   * they bind the module as a whole rather than a single export.
   *
   * @param local - The local binding name.
   * @param name - The imported export name.
   */
  has(local: string, name: string): boolean;
  /**
   * Check whether a local name is a default import.
   *
   * @param local - The local binding name.
   */
  hasDefault(local: string): boolean;
  /**
   * Check whether a local name refers to the module as a whole, i.e. it is a
   * default or namespace binding rather than a single named export.
   *
   * @param local - The local binding name.
   */
  isModuleBinding(local: string): boolean;
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
   * matches a source of `"react-dom"`. Scoped package names such as
   * `"@scope/pkg"` are matched as a whole.
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
 * Type-only imports are ignored because they never bind a runtime value.
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
    // Index namespaces under "" so that `bindingsOf` covers every import form.
    const name = entry.kind === "namespace" ? "" : entry.name;
    getOrInsertComputed(byName, name, () => []).push(entry);
  };
  for (const local of builtinNamespaces) {
    add({ kind: "namespace", local, specifier: source });
  }
  for (const statement of program.body) {
    if (statement.type !== AST.ImportDeclaration) continue;
    // `import type ...` imports are erased at compile time and bind no runtime value.
    if (statement.importKind === "type") continue;
    const specifier = statement.source.value;
    if (specifier !== source && !specifier.startsWith(`${source}/`)) continue;
    for (const specifierNode of statement.specifiers) {
      switch (specifierNode.type) {
        case AST.ImportSpecifier: {
          const { imported, local } = specifierNode;
          // Inline type specifiers (`import { type X, Y }`) are erased as well.
          if (specifierNode.importKind === "type") continue;
          if (imported.type !== AST.Identifier) continue;
          // `import { default as X }` binds the module's default export.
          if (imported.name === "default") {
            add({ kind: "default", name: "default", local: local.name, specifier });
            continue;
          }
          add({ kind: "named", name: imported.name, local: local.name, specifier });
          continue;
        }
        case AST.ImportDefaultSpecifier:
          add({ kind: "default", name: "default", local: specifierNode.local.name, specifier });
          continue;
        case AST.ImportNamespaceSpecifier:
          add({ kind: "namespace", local: specifierNode.local.name, specifier });
          continue;
      }
    }
  }
  return {
    all() {
      return entries;
    },
    binding(local) {
      return byLocal.get(local) ?? null;
    },
    bindingsOf(name) {
      return byName.get(name) ?? [];
    },
    has(local, name) {
      const entry = byLocal.get(local);
      if (entry == null) return false;
      return entry.kind === "namespace" ? false : entry.name === name;
    },
    hasDefault(local) {
      return byLocal.get(local)?.kind === "default";
    },
    isModuleBinding(local) {
      const entry = byLocal.get(local);
      return entry != null && entry.kind !== "named";
    },
  };
}
