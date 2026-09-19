import { Extract, type TSESTreeClass } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { randomBytes } from "node:crypto";
import { getClassId } from "./class";
import { type ClassComponentSemanticNode, isClassComponent } from "./class-component";
import type { RichContext } from "./ctx";

// #region Component Collector Legacy

/**
 * @deprecated Class components are legacy. This namespace exists only to support legacy rules.
 */
export declare namespace getClassComponentCollector {
  /** The api and visitor pair returned by {@link getClassComponentCollector}. */
  type ReturnType = {
    api: {
      getAllComponents: (node: TSESTree.Program) => ClassComponentSemanticNode[];
    };
    visitor: ESLintUtils.RuleListener;
  };
}

/**
 * Get an api and visitor object for the rule to collect class components.
 * @param context The rich rule context.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function getClassComponentCollector(context: RichContext): getClassComponentCollector.ReturnType {
  const components = new Map<string, ClassComponentSemanticNode>();

  const api = {
    getAllComponents(_: TSESTree.Program) {
      return [...components.values()];
    },
  } as const;

  const getText = context.getText;
  const collect = (node: TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = getClassId(node);
    const key = randomBytes(8).toString("hex");
    const name = id == null ? null : Extract.getFullyQualifiedName(id, getText);
    components.set(
      key,
      {
        id,
        key,
        kind: "class-component",
        name,
        displayName: null,
        flag: 0n,
        hint: 0n,
        methods: [],
        node,
      },
    );
  };

  const visitor = {
    ClassDeclaration: collect,
    ClassExpression: collect,
  } as const satisfies ESLintUtils.RuleListener;

  return { api, visitor } as const;
}

// #endregion
