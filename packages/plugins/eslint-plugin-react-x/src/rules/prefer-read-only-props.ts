import { useComponentCollector } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getConstrainedTypeAtLocation, isTypeReadonly } from "@typescript-eslint/type-utils";
import { ESLintUtils, type ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { getTypeImmutability, isImmutable, isReadonlyDeep, isReadonlyShallow, isUnknown } from "is-immutable-type";
import type { CamelCase } from "string-ts";
import { isPropertyReadonlyInType } from "ts-api-utils";
import type ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-read-only-props";

export const RULE_FEATURES = [
  "TSC",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces read-only props in components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      preferReadOnlyProps: "A function component's props should be read-only.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const services = ESLintUtils.getParserServices(context, false);
  const checker = services.program.getTypeChecker();
  const { ctx, listeners } = useComponentCollector(context);

  return {
    ...listeners,
    "Program:exit"(program) {
      const components = ctx.getAllComponents(program);
      for (const [, component] of components) {
        if (component.id == null) continue;
        if (component.name == null) continue;
        const [props] = component.node.params;
        if (props == null) {
          continue;
        }
        const propsType = getConstrainedTypeAtLocation(services, props);
        if (isTypeReadonly(services.program, propsType)) continue;
        // Handle edge case where isTypeReadonly cant detect some readonly or immutable types
        if (isTypeReadonlyLoose(services, propsType)) continue;
        // @see https://github.com/Rel1cx/eslint-react/issues/1326
        if (propsType.isClassOrInterface() && isClassOrInterfaceReadonlyLoose(checker, propsType)) continue;
        context.report({ messageId: "preferReadOnlyProps", node: props });
      }
    },
  };
}

function isTypeReadonlyLoose(services: ParserServicesWithTypeInformation, type: ts.Type): boolean {
  try {
    const im = getTypeImmutability(services.program, type);
    return isUnknown(im) || isImmutable(im) || isReadonlyShallow(im) || isReadonlyDeep(im);
  } catch {
    return true;
  }
}

// TODO: A comprehensive test is required to verify that it works as expected
// @see https://github.com/Rel1cx/eslint-react/issues/1326
function isClassOrInterfaceReadonlyLoose(checker: ts.TypeChecker, type: ts.Type) {
  const baseTypes = type.getBaseTypes() ?? [];
  const properties = type.getProperties();
  if (properties.length === 0) {
    return true;
  }
  if (baseTypes.length === 0) {
    return properties.every((property) => isPropertyReadonlyInType(type, property.getEscapedName(), checker));
  }
  for (const property of properties) {
    const propertyName = property.getEscapedName();
    if (isPropertyReadonlyInType(type, propertyName, checker)) continue;
    else if (baseTypes.length > 0) {
      return baseTypes.every((heritageType) => isPropertyReadonlyInType(heritageType, propertyName, checker));
    }
  }
  return true;
}
