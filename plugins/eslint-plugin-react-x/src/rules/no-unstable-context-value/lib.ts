import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { delimiterCase, toLowerCase } from "string-ts";

export function isContextName(name: string, isReact18OrBelow: boolean): boolean {
  if (name === "Provider") return true;
  if (!isReact18OrBelow) {
    return name.endsWith("Context") || name.endsWith("CONTEXT");
  }
  return false;
}

export function getHumanReadableKind(node: TSESTree.Node) {
  if (node.type === AST.Literal) {
    if ("regex" in node) return "regexp literal" as const;
    // tsl-ignore dx/nullish
    if (node.value === null) return "null literal" as const;
    return `${typeof node.value} literal` as const;
  }
  return toLowerCase(delimiterCase(node.type, " "));
}
