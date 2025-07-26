import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import type ts from "typescript";
import * as ER from "@eslint-react/core";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { ESLintUtils, type ParserServicesWithTypeInformation } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-unused-props";

export const RULE_FEATURES = ["TSC", "EXP"] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about unused component prop declarations.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
  const { ctx, listeners } = ER.useComponentCollector(context);

  return {
    ...listeners,
    "Program:exit"(program) {
      const checker = services.program.getTypeChecker();
      const components = ctx.getAllComponents(program);

      const totalDeclaredProps = new Set<ts.Symbol>();
      const totalUsedProps = new Set<ts.Symbol>();

      for (const [, component] of components) {
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
        } else {
          return false;
        }
        break;
      }
      case T.VariableDeclarator: {
        if (
          parent.id.type === T.ObjectPattern
          && parent.init === ref.identifier
        ) {
          if (!collectUsedPropKeysOfObjectPattern(context, usedPropKeys, parent.id)) {
            return false;
          }
        } else {
          return false;
        }
        break;
      }
      default: {
        return false;
      }
    }
  }

  return true;
}

function getKeyOfExpression(
  expression: TSESTree.Expression | TSESTree.PrivateIdentifier,
): string | null {
  switch (expression.type) {
    case T.Identifier: {
      return expression.name;
    }
    case T.Literal: {
      if (typeof expression.value === "string") {
        return expression.value;
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
  const declarations = prop.getDeclarations();
  if (declarations != null) {
    const decl = declarations[0];
    if (decl == null) return;
    const node = services.tsNodeToESTreeNodeMap.get(decl);

    const nodeKey = node.type === T.TSPropertySignature
        || node.type === T.PropertyDefinition
        || node.type === T.Property
      ? node.key
      : node;

    context.report({
      messageId: "noUnusedProps",
      node: nodeKey,
      data: { name: prop.name },
    });
  }
}
