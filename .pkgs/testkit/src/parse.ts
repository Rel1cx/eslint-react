/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import type { TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
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
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath,
    ...(jsx == null ? {} : { jsx }),
    ...(sourceType == null ? {} : { sourceType }),
  });
}

export function collectNodes<T extends TSESTree.Node>(code: string, type: T["type"], options: ParseCodeOptions = {}): T[] {
  const nodes: T[] = [];
  const isTarget = (node: TSESTree.Node): node is T => node.type === type;
  simpleTraverse(
    parseCode(code, options).ast,
    {
      enter(node) {
        if (isTarget(node)) {
          nodes.push(node);
        }
      },
    },
    true,
  );
  return nodes;
}

export function getFirstNodeOfType<T extends TSESTree.Node>(code: string, type: T["type"], options: ParseCodeOptions = {}): T {
  const [node] = collectNodes<T>(code, type, options);
  if (node == null) {
    throw new Error(`No ${type} found in: ${code}`);
  }
  return node;
}
