import { type RuleContext, type RuleFeature, getSettingsFromContext } from "@eslint-react/shared";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { sep } from "node:path";
import { unionConstituents } from "ts-api-utils";
import type ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "no-implicit-key";

export const RULE_FEATURES = [
  "TSC",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents implicitly passing the 'key' prop to components.",
    },
    messages: {
      default:
        "This spread attribute implicitly passes the 'key' prop to a component, this could lead to unexpected behavior. If you intend to pass the 'key' prop, use 'key={value}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { importSource } = getSettingsFromContext(context);
  const services = ESLintUtils.getParserServices(context, false);
  return {
    JSXSpreadAttribute(node) {
      for (const type of unionConstituents(getConstrainedTypeAtLocation(services, node.argument))) {
        const key = type.getProperty("key");
        if (key == null) continue;
        // https://github.com/Rel1cx/eslint-react/issues/1472
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (key.getDeclarations()?.some((decl) => getPackageNameOfDeclaration(decl) === importSource)) continue;
        context.report({
          messageId: "default",
          node,
        });
        break;
      }
    },
  };
}

// TODO: Use a more robust method to determine the package name
function getPackageNameOfDeclaration(declaration: ts.Declaration) {
  return declaration
    .getSourceFile()
    .fileName
    .split(sep)
    .at(-2);
}
