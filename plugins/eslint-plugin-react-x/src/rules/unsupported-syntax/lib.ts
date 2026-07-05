import { Check, Extract } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export function isEvalCall(node: TSESTree.CallExpression) {
  const callee = Extract.unwrap(node.callee);
  switch (callee.type) {
    case AST.Identifier:
      return callee.name === "eval";
    case AST.MemberExpression: {
      if (!Check.isIdentifier(Extract.unwrap(callee.object), "globalThis")) return false;
      // In `globalThis[eval]` the property is the runtime value of `eval`, not the static name "eval"
      return Extract.getPropertyName(callee.property, (n) => callee.computed ? null : n.name) === "eval";
    }
    default:
      return false;
  }
}
