import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { ESLintUtils, type ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import type ts from "typescript";

import { createRule } from "../../utils";
import { collectUsedPropKeysOfParameter } from "./lib";

export const RULE_NAME = "no-unused-props";

export const RULE_FEATURES = ["TSC", "EXP"] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Warns about component props that are defined but never used.",
    },
    messages: {
      default: "Prop `{{name}}` is declared but never used",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const services = ESLintUtils.getParserServices(context, false);
  const checker = services.program.getTypeChecker();
  const { api, visitor } = core.getFunctionComponentCollector(context);

  return merge(visitor, {
    "Program:exit"(program) {
      // Keyed by declaration node to normalize across different ts.Symbol objects
      // that refer to the same property (ex: via Omit/Pick mapped types).
      const totalDeclaredProps = new Map<ts.Declaration, ts.Symbol>();
      const totalUsedDeclarations = new Set<ts.Declaration>();

      for (const component of api.getAllComponents(program)) {
        const [props] = component.node.params;
        if (props == null) continue;

        const usedPropKeys = new Set<string>();
        const couldFindAllUsedPropKeys = collectUsedPropKeysOfParameter(
          context,
          usedPropKeys,
          props,
        );
        // Unable to determine all used prop keys — bail out to avoid false positives
        if (!couldFindAllUsedPropKeys) continue;

        const tsNode = services.esTreeNodeToTSNodeMap.get(props);
        const declaredProps = checker.getTypeAtLocation(tsNode).getProperties();

        for (const declaredProp of declaredProps) {
          const declaration = declaredProp.getDeclarations()?.[0];
          if (declaration == null) continue;

          if (!totalDeclaredProps.has(declaration)) {
            totalDeclaredProps.set(declaration, declaredProp);
          }

          if (usedPropKeys.has(declaredProp.name)) {
            totalUsedDeclarations.add(declaration);
          }
        }
      }

      for (const [declaration, symbol] of totalDeclaredProps.entries()) {
        if (!totalUsedDeclarations.has(declaration)) {
          reportUnusedProp(context, services, symbol);
        }
      }
    },
  });
}

function reportUnusedProp(
  context: RuleContext<MessageID, []>,
  services: ParserServicesWithTypeInformation,
  prop: ts.Symbol,
) {
  const declaration = prop.getDeclarations()?.[0];
  if (declaration == null) return;

  const declarationNode = services.tsNodeToESTreeNodeMap.get(declaration);

  // tsl-ignore core/noUnnecessaryCondition
  if (declarationNode == null) return; // is undefined if declaration is in a different file

  const nodeToReport = declarationNode.type === AST.TSPropertySignature
    ? declarationNode.key
    : declarationNode;

  context.report({
    data: { name: prop.name },
    messageId: "default",
    node: nodeToReport,
  });
}
