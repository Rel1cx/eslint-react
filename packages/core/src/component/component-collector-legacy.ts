import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

import { getId } from "../utils";
import type { ERClassComponent } from "./component";
import { ERClassComponentFlag } from "./component-flag";

/**
 * Check if a node is a React class component
 * @param node The AST node to check
 * @returns `true` if the node is a class component, `false` otherwise
 */
export function isClassComponent(node: TSESTree.Node): node is AST.TSESTreeClass {
  if (!("superClass" in node && node.superClass)) {
    return false;
  }
  const { superClass } = node;
  return match(superClass)
    .with({
      type: T.Identifier,
      name: P.string,
    }, ({ name }) => /^(?:Pure)?Component$/u.test(name))
    .with({
      type: T.MemberExpression,
      property: { name: P.string },
    }, ({ property }) => /^(?:Pure)?Component$/u.test(property.name))
    .otherwise(() => false);
}

/**
 * Check if a node is a React PureComponent
 * @param node The AST node to check
 * @returns `true` if the node is a pure component, `false` otherwise
 */
export function isPureComponent(node: TSESTree.Node) {
  if ("superClass" in node && node.superClass) {
    return match(node.superClass)
      .with({
        type: T.Identifier,
        name: P.string,
      }, ({ name }) => /^PureComponent$/u.test(name))
      .with({
        type: T.MemberExpression,
        property: { name: P.string },
      }, ({ property }) => /^PureComponent$/u.test(property.name))
      .otherwise(() => false);
  }
  return false;
}

export function isComponentDidMount(
  node: TSESTree.Node,
): node is TSESTree.MethodDefinition | TSESTree.PropertyDefinition {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentDidMount";
}

export function isComponentWillUnmount(
  node: TSESTree.Node,
): node is TSESTree.MethodDefinition | TSESTree.PropertyDefinition {
  return AST.isOneOf([T.MethodDefinition, T.PropertyDefinition])(node)
    && node.key.type === T.Identifier
    && node.key.name === "componentWillUnmount";
}

export function isComponentDidMountFunction(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentDidMount(node.parent)
    && node.parent.value === node;
}

export function isComponentWillUnmountFunction(node: TSESTree.Node) {
  return AST.isFunction(node)
    && isComponentWillUnmount(node.parent)
    && node.parent.value === node;
}

export function useComponentCollectorLegacy() {
  const components = new Map<string, ERClassComponent>();

  const ctx = {
    getAllComponents(_: TSESTree.Program): typeof components {
      return components;
    },
  } as const;

  const collect = (node: AST.TSESTreeClass) => {
    if (!isClassComponent(node)) {
      return;
    }
    const id = AST.getClassIdentifier(node);
    const key = getId();
    const flag = isPureComponent(node)
      ? ERClassComponentFlag.PureComponent
      : ERClassComponentFlag.None;
    components.set(
      key,
      {
        _: key,
        id,
        kind: "class",
        name: O.flatMapNullable(id, n => n.name),
        node,
        // TODO: Get displayName of class component
        displayName: O.none(),
        flag,
        hint: 0n,
        // TODO: Get methods of class component
        methods: [],
      },
    );
  };

  const listeners = {
    "ClassDeclaration[type]": collect,
    "ClassExpression[type]": collect,
  } as const satisfies ESLintUtils.RuleListener;

  return { ctx, listeners } as const;
}
