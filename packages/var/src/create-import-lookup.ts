import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * One entry per local import binding, mirroring the specification's ImportEntry model.
 *
 * Entries are the ground truth of the lookup; every query derives from them.
 */
export interface ImportEntry {
  /** The import form: `"named"` also covers default imports (whose `name` is `"default"`). */
  kind: "named" | "namespace";
  /** The imported export name; `"default"` for default imports, `""` for namespace imports. */
  name: string;
  /** The local binding name. */
  local: string;
  /** The decoded module specifier as written, e.g. `"react-dom/client"`. */
  specifier: string;
}

export interface ImportLookup {
  /** By local name: the import entry a local name is bound to, if any. */
  binding(local: string): ImportEntry | undefined;
  /** By imported name: all local bindings of the export `name`, in source order. */
  bindingsOf(name: string): readonly ImportEntry[];
  /** Every import entry, in source order. */
  all(): readonly ImportEntry[];
  /** Derived: `local` is bound to the named export `name`. */
  has(local: string, name: string): boolean;
  /** Derived: `local` is a default or namespace binding. */
  hasNamespace(local: string): boolean;
}

export interface ImportLookupOptions {
  /** The base import source to track, e.g. `"react-dom"` (`"react-dom/client"` is grouped under `"react-dom"`). */
  source: string;
  /** Local names to pre-register as namespace bindings (e.g. a `ReactDOM` global that needs no import). */
  builtinNamespaces?: readonly string[];
}

/**
 * Create a lookup of local import bindings from a source by scanning the
 * top-level imports of a program.
 *
 * Entries are kept in source order with both indexes (by local name, by imported
 * name) built during the scan, so every query works immediately. Aliases
 * (`import { flushSync as fs }`) are handled naturally.
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
  const { source, builtinNamespaces = [] } = options;
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
        // `import { flushSync } from 'react-dom'`
        case AST.ImportSpecifier: {
          const { imported, local } = specifierNode;
          if (imported.type !== AST.Identifier) continue;
          add({ kind: "named", name: imported.name, local: local.name, specifier });
          continue;
        }
        // `import ReactDOM from 'react-dom'`
        case AST.ImportDefaultSpecifier:
          add({ kind: "named", name: "default", local: specifierNode.local.name, specifier });
          continue;
        // `import * as ReactDOM from 'react-dom'`
        case AST.ImportNamespaceSpecifier:
          add({ kind: "namespace", name: "", local: specifierNode.local.name, specifier });
          continue;
      }
    }
  }
  return {
    binding(local) {
      return byLocal.get(local);
    },
    bindingsOf(name) {
      return byName.get(name) ?? [];
    },
    all() {
      return entries;
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
