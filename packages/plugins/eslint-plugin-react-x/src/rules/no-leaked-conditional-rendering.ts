import * as AST from "@eslint-react/ast";
import { flow, unit } from "@eslint-react/eff";
import { report, type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { getSettingsFromContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";
import { unionConstituents } from "ts-api-utils";
import { match, P } from "ts-pattern";

import { createRule, getTypeVariants, type TypeVariant } from "../utils";

export const RULE_NAME = "no-leaked-conditional-rendering";

export const RULE_FEATURES = [
  "TSC",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents problematic leaked values from being rendered.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noLeakedConditionalRendering:
        "Potential leaked value {{value}} that might cause unintentionally rendered values or rendering crashes.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("&&")) return {};
  const { version } = getSettingsFromContext(context);

  // Allowed left node type variants
  const allowedVariants = [
    "any",
    "boolean",
    "nullish",
    "object",
    "falsy boolean",
    "truthy bigint",
    "truthy boolean",
    "truthy number",
    "truthy string",
    ...compare(version, "18.0.0", "<")
      ? []
      : ["string", "falsy string"] as const,
  ] as const satisfies TypeVariant[];

  const services = ESLintUtils.getParserServices(context, false);
  function getReportDescriptor(
    node:
      | unit
      | TSESTree.Expression
      | TSESTree.JSXExpressionContainer
      | TSESTree.JSXExpressionContainer["expression"],
  ): ReportDescriptor<MessageID> | unit {
    if (node == null) return unit;
    if (AST.is(T.JSXExpressionContainer)(node)) return getReportDescriptor(node.expression);
    if (AST.isJSX(node)) return unit;
    if (AST.isTypeExpression(node)) return getReportDescriptor(node.expression);
    return match<typeof node, ReportDescriptor<MessageID> | unit>(node)
      .with({ type: T.LogicalExpression, operator: "&&" }, ({ left, right }) => {
        const isLeftUnaryNot = left.type === T.UnaryExpression && left.operator === "!";
        if (isLeftUnaryNot) {
          return getReportDescriptor(right);
        }
        const initialScope = context.sourceCode.getScope(left);
        const isLeftNan = (left.type === T.Identifier && left.name === "NaN")
          || getStaticValue(left, initialScope)?.value === "NaN";
        if (isLeftNan) {
          return {
            messageId: "noLeakedConditionalRendering",
            node: left,
            data: { value: context.sourceCode.getText(left) },
          } as const;
        }
        const leftType = getConstrainedTypeAtLocation(services, left);
        const leftTypeVariants = getTypeVariants(unionConstituents(leftType));
        const isLeftValid = Array
          .from(leftTypeVariants.values())
          .every((type) => allowedVariants.some((allowed) => allowed === type));
        if (isLeftValid) {
          return getReportDescriptor(right);
        }
        return {
          messageId: "noLeakedConditionalRendering",
          node: left,
          data: { value: context.sourceCode.getText(left) },
        } as const;
      })
      .with({ type: T.ConditionalExpression }, ({ alternate, consequent }) => {
        return getReportDescriptor(consequent) ?? getReportDescriptor(alternate);
      })
      .with({ type: T.Identifier }, (n) => {
        const variable = VAR.findVariable(n.name, context.sourceCode.getScope(n));
        const variableDefNode = variable?.defs.at(0)?.node;
        return match(variableDefNode)
          .with({ init: P.select({ type: P.not(T.VariableDeclaration) }) }, getReportDescriptor)
          .otherwise(() => unit);
      })
      .otherwise(() => unit);
  }
  return {
    JSXExpressionContainer: flow(getReportDescriptor, report(context)),
  };
}
