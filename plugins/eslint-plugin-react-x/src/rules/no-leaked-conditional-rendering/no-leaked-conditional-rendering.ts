/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import { Check } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { findVariable, getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import { unionConstituents } from "ts-api-utils";
import { P, match } from "ts-pattern";

export const RULE_NAME = "no-leaked-conditional-rendering";

export const RULE_FEATURES = [
  "TSC",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents problematic leaked values from being rendered.",
    },
    messages: {
      default: "Potential leaked value {{value}} that might cause unintentionally rendered values or rendering crashes.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

// TODO: Evaluate whether it's possible to directly inspect type variants of `node.expression` within a JSX expression container to improve coverage.
// This is currently not implemented to reduce false positives.
export function create(context: RichContext<MessageID, []>): RuleListener {
  // Fast path: if the file does not contain '&&', there is no need to run this rule
  if (!context.hasText("&&")) return {};

  const { version } = context.settings;

  // Defines the type variants that are safe to use on the left side of a '&&' expression
  // These types do not render unwanted values (like 0, NaN, or '')
  const allowedTypeVariants = [
    "any",
    "boolean",
    "nullish",
    "object",
    "enum",
    "falsy boolean",
    "truthy bigint",
    "truthy boolean",
    "truthy number",
    "truthy string",
    // Before React 18, empty strings were rendered, which was often unintentional
    // React 18 and later do not render empty strings, so they are considered safe
    ...compare(version, "18.0.0", "<")
      ? []
      : ["string", "falsy string"] as const,
  ] as const satisfies core.TypeVariant[];

  const services = ESLintUtils.getParserServices(context._, false);

  /**
   * Recursively inspects a node to find potential leaked conditional rendering
   * @param node The AST node to inspect
   * @param seen A set of visited identifier names to prevent infinite recursion.
   * @returns A report descriptor if a problem is found, otherwise `null`
   */
  function visit(
    node:
      | null
      | TSESTree.JSXExpressionContainer
      | TSESTree.JSXExpressionContainer["expression"],
    seen = new Set<string>(),
  ): ReportDescriptor<MessageID> | null {
    // Base cases for recursion: null or irrelevant nodes
    if (node == null) return null;
    if (Check.is(AST.JSXExpressionContainer)(node)) return visit(node.expression, seen);
    if (Check.isJSX(node)) return null;
    if (Check.isTypeExpression(node)) return visit(node.expression, seen);
    const src = context.src;

    // Pattern match on the node type to apply specific logic
    return match<typeof node, ReportDescriptor<MessageID> | null>(node)
      // Handle logical '&&' expressions
      .with({ type: AST.LogicalExpression, operator: "&&" }, ({ left, right }) => {
        // If the left side is a negation, it's always a boolean, which is safe
        // Recursively check the right side
        if (left.type === AST.UnaryExpression && left.operator === "!") {
          return visit(right, seen);
        }

        const initialScope = src.getScope(left);
        // Specifically check for 'NaN', which is a falsy value that gets rendered
        if (Check.isIdentifier(left, "NaN") || getStaticValue(left, initialScope)?.value === "NaN") {
          return {
            data: { value: src.getText(left) },
            messageId: "default",
            node: left,
          } as const;
        }

        // Get the type of the left-hand side operand
        const leftType = getConstrainedTypeAtLocation(services, left);
        const leftTypeVariants = core.getTypeVariants(unionConstituents(leftType));
        // Check if all possible types of the left operand are in the allowed list
        const isLeftValid = Array
          .from(leftTypeVariants.values())
          .every((t) => allowedTypeVariants.some((a) => a === t));

        // If the left side is valid, the expression is safe. Recursively check the right side
        if (isLeftValid) {
          return visit(right, seen);
        }

        // If the left side is not valid, report an error
        return {
          data: { value: src.getText(left) },
          messageId: "default",
          node: left,
        } as const;
      })
      // Handle ternary expressions. Recursively check both branches
      .with({ type: AST.ConditionalExpression }, ({ alternate, consequent }) => {
        return visit(consequent, seen) ?? visit(alternate, seen);
      })
      // Handle identifiers. Try to find their definition and check the initial value
      .with({ type: AST.Identifier }, (n) => {
        if (seen.has(n.name)) return null;
        seen.add(n.name);
        const variable = findVariable(src.getScope(n), n.name);
        const variableDefNode = variable?.defs.at(0)?.node;
        return match(variableDefNode)
          .with(
            { init: P.select({ type: P.not(AST.VariableDeclaration) }) },
            (init) => visit(init, seen),
          )
          .otherwise(() => null);
      })
      // For all other node types, assume they are safe
      .otherwise(() => null);
  }
  return {
    JSXExpressionContainer(node) {
      context.report(visit(node));
    },
  };
}
