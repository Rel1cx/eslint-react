import * as ast from "@eslint-react/ast";
import { IdGenerator, type RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { type ClassComponentSemanticNode, isClassComponent } from "./class-component";

// #region Component Collector Legacy

const idGen = new IdGenerator("class-component:");

/**
 * @deprecated Class components are legacy. This namespace exists only to support legacy rules.
 */
export declare namespace getClassComponentCollector {
  type ReturnType = {
    api: {
      getAllComponents: (node: TSESTree.Program) => ClassComponentSemanticNode[];
    };
    visitor: ESLintUtils.RuleListener;
  };
}

/**
 * @param context The rule context.
 * @deprecated Class components are legacy. This function exists only to support legacy rules.
 */
export function getClassComponentCollector(context: RuleContext): getClassComponentCollector.ReturnType {
  const components = new Map<string, ClassComponentSemanticNode>();

  const api = {
    getAllComponents(node: TSESTree.Program) {
      return [...components.values()];
    },
  } as const;

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const collect = (node: ast.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = ast.getClassId(node);
    const key = idGen.next();
    const name = id == null ? null : ast.getFullyQualifiedName(id, getText);
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
