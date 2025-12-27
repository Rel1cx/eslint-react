import { useComponentCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { Reference } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { ESLintUtils, type ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import type ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-props";

export const RULE_FEATURES = ["TSC", "EXP"] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about component props that are defined but never used.",
    },
    messages: {
      noUnusedProps: "Prop `{{name}}` is declared but never used",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const services = ESLintUtils.getParserServices(context, false);
  const { ctx, listeners } = useComponentCollector(context);

  return {
    ...listeners,
    "Program:exit"(program) {
      const checker = services.program.getTypeChecker();
      const totalDeclaredProps = new Set<ts.Symbol>();
      const totalUsedProps = new Set<ts.Symbol>();

      for (const component of ctx.getAllComponents(program)) {
        const [props] = component.node.params;
        if (props == null) continue;

        const usedPropKeys = new Set<string>();
        const couldFindAllUsedPropKeys = collectUsedPropKeysOfParameter(context, usedPropKeys, props);
        if (!couldFindAllUsedPropKeys) {
          // unable to determine all used prop keys => bail out to avoid false positives
          continue;
        }

        const tsNode = services.esTreeNodeToTSNodeMap.get(props);
        const declaredProps = checker.getTypeAtLocation(tsNode).getProperties();

        for (const declaredProp of declaredProps) {
          totalDeclaredProps.add(declaredProp);

          if (usedPropKeys.has(declaredProp.name)) {
            totalUsedProps.add(declaredProp);
          }
        }
      }

      // TODO: Node 20 doesn't support Set.difference. Use it when minimum Node version is 22.
      const unusedProps = [...totalDeclaredProps].filter((x) => !totalUsedProps.has(x));

      for (const unusedProp of unusedProps) {
        reportUnusedProp(context, services, unusedProp);
      }
    },
  };
}

function collectUsedPropKeysOfParameter(
  context: RuleContext<MessageID, []>,
  usedPropKeys: Set<string>,
  parameter: TSESTree.Parameter,
): boolean {
  switch (parameter.type) {
    case T.Identifier: {
      return collectUsedPropKeysOfIdentifier(context, usedPropKeys, parameter);
    }
    case T.ObjectPattern: {
      return collectUsedPropKeysOfObjectPattern(context, usedPropKeys, parameter);
    }
    default: {
      return false;
    }
  }
}

function collectUsedPropKeysOfObjectPattern(
  context: RuleContext<MessageID, []>,
  usedPropKeys: Set<string>,
  objectPattern: TSESTree.ObjectPattern,
): boolean {
  for (const property of objectPattern.properties) {
    switch (property.type) {
      case T.Property: {
        const key = getKeyOfExpression(property.key);
        if (key == null) return false;
        usedPropKeys.add(key);
        break;
      }
      case T.RestElement: {
        if (!collectUsedPropsOfRestElement(context, usedPropKeys, property)) {
          return false;
        }
        break;
      }
    }
  }

  return true;
}

function collectUsedPropsOfRestElement(
  context: RuleContext<MessageID, []>,
  usedPropKeys: Set<string>,
  restElement: TSESTree.RestElement,
): boolean {
  switch (restElement.argument.type) {
    case T.Identifier: {
      return collectUsedPropKeysOfIdentifier(context, usedPropKeys, restElement.argument);
    }
    default: {
      return false;
    }
  }
}

function collectUsedPropKeysOfIdentifier(
  context: RuleContext<MessageID, []>,
  usedPropKeys: Set<string>,
  identifier: TSESTree.Identifier,
): boolean {
  const scope = context.sourceCode.getScope(identifier);
  const variable = scope.variables.find((v) => v.name === identifier.name);
  if (variable == null) return false;

  for (const ref of variable.references) {
    if (ref.identifier === identifier) {
      continue;
    }

    if (!collectUsedPropKeysOfReference(context, usedPropKeys, identifier, ref)) {
      return false;
    }
  }

  return true;
}

function collectUsedPropKeysOfReference(
  context: RuleContext<MessageID, []>,
  usedPropKeys: Set<string>,
  identifier: TSESTree.Identifier,
  ref: Reference,
): boolean {
  const { parent } = ref.identifier;

  switch (parent.type) {
    case T.MemberExpression: {
      if (
        parent.object.type === T.Identifier
        && parent.object.name === identifier.name
      ) {
        const key = getKeyOfExpression(parent.property);
        if (key == null) return false;
        usedPropKeys.add(key);
        return true;
      }
      break;
    }
    case T.VariableDeclarator: {
      if (
        parent.id.type === T.ObjectPattern
        && parent.init === ref.identifier
      ) {
        return collectUsedPropKeysOfObjectPattern(context, usedPropKeys, parent.id);
      }
      break;
    }
  }

  return false;
}

function getKeyOfExpression(
  expr: TSESTree.Expression | TSESTree.PrivateIdentifier,
): string | null {
  switch (expr.type) {
    case T.Identifier: {
      return expr.name;
    }
    case T.Literal: {
      if (typeof expr.value === "string") {
        return expr.value;
      }
    }
  }

  return null;
}

function reportUnusedProp(
  context: RuleContext<MessageID, []>,
  services: ParserServicesWithTypeInformation,
  prop: ts.Symbol,
) {
  const declaration = prop.getDeclarations()?.[0];
  if (declaration == null) return;

  const declarationNode = services.tsNodeToESTreeNodeMap.get(declaration);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (declarationNode == null) return; // is undefined if declaration is in a different file

  const nodeToReport = declarationNode.type === T.TSPropertySignature
    ? declarationNode.key
    : declarationNode;

  context.report({
    messageId: "noUnusedProps",
    node: nodeToReport,
    data: { name: prop.name },
  });
}
