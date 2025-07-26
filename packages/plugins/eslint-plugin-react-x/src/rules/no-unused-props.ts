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

        const usedPropKeys = collectUsedPropKeys(context, props);
        if (usedPropKeys == null) {
          // unable to determine prop keys, bail out to avoid false positives
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

function collectUsedPropKeys(context: RuleContext<MessageID, []>, props: TSESTree.Parameter): Set<string> | null {
  switch (props.type) {
    case T.Identifier: {
      return collectUsedPropKeysOfIdentifier(context, props);
    }
    case T.ObjectPattern: {
      return collectUsedPropKeysOfObjectPattern(context, props);
    }
    default: {
      // unable to determine prop keys, bail out to avoid false positives
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
      // Property
      if (prop.key.type === T.Identifier) {
        usedKeys.add(prop.key.name);
      } else if (prop.key.type === T.Literal && typeof prop.key.value === "string") {
        usedKeys.add(prop.key.value);
      }
    } else if (prop.argument.type === T.Identifier) {
      // RestElement
      const usedKeysOnRestElement = collectUsedPropKeysOfIdentifier(context, prop.argument);
      if (usedKeysOnRestElement == null) {
        // unable to determine prop keys, bail out to avoid false positives
        return null;
      }

      for (const usedKeyOnRestElement of usedKeysOnRestElement) {
        usedKeys.add(usedKeyOnRestElement);
      }
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
    const { parent } = ref.identifier;

    switch (parent.type) {
      case T.MemberExpression: {
        if (
          parent.object.type === T.Identifier
          && parent.object.name === propsName
          && parent.property.type === T.Identifier
        ) {
          usedPropKeys.add(parent.property.name);
        }
        break;
      }
      case T.VariableDeclarator: {
        if (
          parent.id.type === T.ObjectPattern
          && ref.identifier === parent.init
        ) {
          for (const prop of parent.id.properties) {
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
      default: {
        // the whole props object is referenced in some way we probably can't track
        // => unable to determine prop keys, bail out to avoid false positives
        return null;
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
