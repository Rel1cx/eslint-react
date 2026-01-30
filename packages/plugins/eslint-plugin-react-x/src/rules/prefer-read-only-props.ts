import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
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
  const { ctx, visitor } = core.useComponentCollector(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const component of ctx.getAllComponents(program)) {
          const [props] = component.node.params;
          // Skip if the component is anonymous to reduce false positives
          if (component.id == null || component.name == null) continue;
          // Skip if no props
          if (props == null) continue;

          const propsType = getConstrainedTypeAtLocation(services, props);
          if (isTypeReadonly(services.program, propsType)) continue;
          // Handle edge case where isTypeReadonly cant detect some readonly or immutable types
          if (isTypeReadonlyLoose(services, propsType)) continue;
          // @see https://github.com/Rel1cx/eslint-react/issues/1326
          if (propsType.isClassOrInterface() && isClassOrInterfaceReadonlyLoose(checker, propsType)) continue;
          context.report({ messageId: "preferReadOnlyProps", node: props });
        }
      },
    },
  );
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
  const props = type.getProperties();
  const types = type.getBaseTypes() ?? [];
  // If there are no properties, consider it readonly
  if (props.length === 0) {
    return true;
  }
  // If there are no base types, check only the properties of the current type
  if (types.length === 0) {
    return props.every((p) => isPropertyReadonlyInType(type, p.getEscapedName(), checker));
  }
  // Check properties in the current type and all base types
  return props.every((p) => {
    if (isPropertyReadonlyInType(type, p.getEscapedName(), checker)) return true;
    return types.every((t) => isPropertyReadonlyInType(t, p.getEscapedName(), checker));
  });
}
