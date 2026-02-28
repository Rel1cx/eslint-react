import type { RuleContext } from "@eslint-react/shared";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

export function resolve(context: RuleContext, node: TSESTree.Identifier, at = 0) {
  const v = findVariable(context.sourceCode.getScope(node), node);
  if (v == null) return null;
  const def = v.defs.at(at);
  if (def == null) return null;
  switch (true) {
    case def.type === DefinitionType.FunctionName:
    case def.type === DefinitionType.ClassName:
      return def.node;
    case "init" in def.node && def.node.init != null && !("declarations" in def.node.init):
      return def.node.init;
  }
  return null;
}
