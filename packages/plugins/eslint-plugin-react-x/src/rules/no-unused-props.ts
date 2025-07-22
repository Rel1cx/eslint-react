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

      for (const [, component] of components) {
        const [props] = component.node.params;
        if (props == null) continue;

        const usedPropKeys = collectUsedPropKeys(context, props);
        if (usedPropKeys == null) continue;

        const tsNode = services.esTreeNodeToTSNodeMap.get(props);
        const declaredProps = checker.getTypeAtLocation(tsNode).getProperties();

        for (const prop of declaredProps) {
          if (!usedPropKeys.has(prop.name)) {
            reportUnusedProp(context, services, prop);
          }
        }
      }
    },
  };
}

function collectUsedPropKeys(context: RuleContext<MessageID, []>, props: TSESTree.Parameter): Set<string> | null {
  switch (props.type) {
    case T.Identifier: {
      return collectUsedPropKeysOfIdentifier(context, props);
    }
    case T.ObjectPattern: {
      return collectUsedPropKeysOfObjectPattern(context, props);
    }
    default: {
      return null;
    }
  }
}

function collectUsedPropKeysOfObjectPattern(
  context: RuleContext<MessageID, []>,
  props: TSESTree.ObjectPattern,
): Set<string> | null {
  const usedKeys = new Set<string>();

  for (const prop of props.properties) {
    if (prop.type === T.Property) {
      if (prop.key.type === T.Identifier) {
        usedKeys.add(prop.key.name);
      } else if (prop.key.type === T.Literal && typeof prop.key.value === "string") {
        usedKeys.add(prop.key.value);
      }
    } else if (prop.argument.type === T.Identifier) {
      // TODO: handle rest props destructuring here
    }
  }

  return usedKeys;
}

function collectUsedPropKeysOfIdentifier(
  context: RuleContext<MessageID, []>,
  props: TSESTree.Identifier,
): Set<string> | null {
  const propsName = props.name;
  const scope = context.sourceCode.getScope(props);
  const variable = scope.variables.find((v) => v.name === propsName);

  if (variable == null) return null;

  const usedPropKeys = new Set<string>();
  for (const ref of variable.references) {
    const node = ref.identifier.parent;

    switch (node.type) {
      case T.MemberExpression: {
        if (
          node.object.type === T.Identifier
          && node.object.name === propsName
          && node.property.type === T.Identifier
        ) {
          usedPropKeys.add(node.property.name);
        }
        break;
      }
      case T.VariableDeclarator: {
        if (
          node.id.type === T.ObjectPattern
          && ref.identifier === node.init
        ) {
          for (const prop of node.id.properties) {
            if (
              prop.type === T.Property
              && prop.key.type === T.Identifier
            ) {
              usedPropKeys.add(prop.key.name);
            }
          }
        }
        break;
      }
    }
  }

  return usedPropKeys;
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
    const esNode = services.tsNodeToESTreeNodeMap.get(decl);
    context.report({
      messageId: "noUnusedProps",
      node: esNode,
      data: { name: prop.name },
    });
  }
}
