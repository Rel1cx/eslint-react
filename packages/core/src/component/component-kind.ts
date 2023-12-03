import { NodeType, type TSESTreeClass, type TSESTreeFunction } from "@eslint-react/ast";
import { getPragmaFromContext } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/shared";
import { M, type O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { type TSESTree } from "@typescript-eslint/utils";

import type { ExRComponentCollectorHint } from "./component-collector-hint";
import type { ExRClassComponentFlag, ExRFunctionComponentFlag } from "./component-flag";
import type { ExRComponentInitPath } from "./component-init-path";

export type ExRComponentKind = "class" | "function";

export type ExRFunctionComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: "function";
  node: TSESTreeFunction;
  name: O.Option<string>;
  flag: ExRFunctionComponentFlag;
  hint: ExRComponentCollectorHint;
  initPath: O.Option<ExRComponentInitPath>;
  displayName: O.Option<TSESTree.Expression>;
};

export type ExRClassComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: TSESTreeClass;
  name: O.Option<string>;
  flag: ExRClassComponentFlag;
  displayName: O.Option<TSESTree.Expression>;
};

export type ExRComponent = ExRClassComponent | ExRFunctionComponent;

/**
 * Check if a node is a React class component
 * @param node The AST node to check
 * @param context The rule context
 */
export function isClassComponent(node: TSESTree.Node, context: RuleContext): node is TSESTreeClass {
  if (!("superClass" in node && node.superClass)) {
    return false;
  }
  const pragma = getPragmaFromContext(context);
  const { superClass } = node;

  return M.match(superClass)
    .with({ type: NodeType.Identifier, name: M.P.string }, ({ name }) => /^(Pure)?Component$/u.test(name))
    .with(
      {
        type: NodeType.MemberExpression,
        object: { name: pragma },
        property: { name: M.P.string },
      },
      ({ property }) => /^(Pure)?Component$/u.test(property.name),
    )
    .otherwise(() => false);
}

/**
 * Check if a node is a React PureComponent
 * @param node The AST node to check
 * @param context The rule context
 */
export function isPureComponent(node: TSESTree.Node, context: RuleContext) {
  const pragma = getPragmaFromContext(context);

  const sourceCode = context.getSourceCode();

  if ("superClass" in node && node.superClass) {
    const text = sourceCode.getText(node.superClass);

    // eslint-disable-next-line security/detect-non-literal-regexp
    return new RegExp(`^(${pragma}\\.)?PureComponent$`, "u").test(text);
  }

  return false;
}
