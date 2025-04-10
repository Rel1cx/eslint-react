import type { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Check if the given node is a member expression that accesses `process.env.NODE_ENV`
 * @param node The AST node
 * @returns True if the node is a member expression that accesses `process.env.NODE_ENV`, false otherwise
 */
export function isProcessEnvNodeEnv(node: TSESTree.Node | null | _): node is TSESTree.MemberExpression {
  return node != null
    && node.type === T.MemberExpression
    && node.object.type === T.MemberExpression
    && node.object.object.type === T.Identifier
    && node.object.object.name === "process"
    && node.object.property.type === T.Identifier
    && node.object.property.name === "env"
    && node.property.type === T.Identifier
    && node.property.name === "NODE_ENV";
}
